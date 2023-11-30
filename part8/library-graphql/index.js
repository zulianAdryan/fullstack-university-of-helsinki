require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const config = require("./utils/config");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql");
const User = require("./models/user");

mongoose.set("strictQuery", false);
mongoose.set("debug", true);
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.error("error connecting to mongodb", error));

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "mock", // birthyear not known
    id: "afa5b6z9-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
        author: String
        genre: [String!]
    ): [Book!]!
    allAuthors: [Author!]!
    me: User!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      id: String!
      name: String!
      born: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const getBookCountByAuthor = async (author) => {
  const booksByAuthor = await Book.find({ author });
  const bookCount = booksByAuthor.length;
  // console.log("bookCount: ", bookCount);
  return bookCount;
};

const getCurrentUserFromContext = async (context) => {
  const currentUser = await context.currentUser;
  if (!currentUser) {
    throw new GraphQLError("not authenticated", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }
  return currentUser;
};

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => {
      return await Author.collection.countDocuments();
    },
    allBooks: async (root, args) => {
      const filter = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        filter.author = author;
      }
      if (args.genre) {
        if (Array.isArray(args.genre)) {
          filter.genres = { $in: args.genre };
        } else if (typeof args.genre === "string") {
          filter.genres = args.genre;
        }
      }
      // console.log("filter:", filter);
      let books = await Book.find(filter).populate("author");
      // console.log("books 1", books);

      for (const book of books) {
        const bookCount = await getBookCountByAuthor(book.author);
        // console.log("loop", bookCount);
        book.author.bookCount = bookCount;
      }
      // console.log("books final", books[0]);
      return books;
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({});
      for (const author of authors) {
        const bookCount = await getBookCountByAuthor(author);
        author.bookCount = bookCount;
      }
      return authors;
    },
    me: async (root, args, context) => {
      return await getCurrentUserFromContext(context);
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      try {
        const currentUser = await getCurrentUserFromContext(context);
        let author = await Author.findOne({ name: args.author });
        // console.log("isAuthorExist", isAuthorExist);
        if (!author) {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
          author = newAuthor;
          // console.log("new author", id);
        }
        // console.log("ID", id);
        const book = new Book({ ...args, author: author._id });
        await book.save();
        // console.log("new book", book);
        const returnedBook = await Book.findById(book._id).populate("author", {
          name: 1,
          born: 1,
        });
        returnedBook.author.bookCount = await getBookCountByAuthor(author);
        // console.log("returned book", returnedBook);
        return returnedBook;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    editAuthor: async (root, args, context) => {
      try {
        const currentUser = await getCurrentUserFromContext(context);
        const author = await Author.findByIdAndUpdate(
          args.id,
          { ...args },
          { new: true, runValidators: true }
        );
        author.bookCount = await getBookCountByAuthor(author);
        return author;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    createUser: async (root, args) => {
      try {
        const newUser = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username });
        if (!user || args.password !== "secret") {
          throw new GraphQLError("wrong credentials", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }
        const tokenForUser = {
          username: args.username,
          favoriteGenre: user.favoriteGenre,
          id: user._id,
        };
        return {
          value: jwt.sign(tokenForUser, config.JWT_SECRET, {
            expiresIn: "24h",
          }),
        };
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      // console.log("decodedToken", auth);
      const decodedToken = jwt.verify(auth.split(" ")[1], config.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
