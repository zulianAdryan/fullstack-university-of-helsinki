const User = require("../models/user");
const Book = require("../models/book");
const Author = require("../models/author");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const { ObjectId } = require("mongoose").Types;

const pubsub = new PubSub();

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
      // console.log("ARGS", args);
      const filter = {};
      if (args.author) {
        try {
          filter.author = new ObjectId(args.author);
        } catch (error) {
          console.error("Invalid authorId format");
          return [];
        }
      }
      if (args.genre) {
        if (Array.isArray(args.genre)) {
          filter.genres = { $in: args.genre };
        } else if (typeof args.genre === "string") {
          filter.genres = args.genre;
        }
      }

      // console.log("++++++FILTER", filter);

      // const books = await Book.find(filter).populate("author");
      const books = await Book.aggregate([
        {
          $lookup: {
            from: "authors",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $group: {
            _id: "$author._id",
            authorId: { $first: "$author._id" },
            authorName: { $first: "$author.name" },
            authorBorn: { $first: "$author.born" },
            bookCount: { $sum: 1 },
            books: { $push: "$$ROOT" },
          },
        },
        {
          $unwind: "$books",
        },
        {
          $project: {
            _id: 0,
            id: "$books._id",
            title: "$books.title",
            published: "$books.published",
            genres: "$books.genres",
            author: {
              id: "$authorId",
              name: "$authorName",
              born: "$authorBorn",
              bookCount: "$bookCount",
            },
          },
        },
      ]);

      // console.log("HERE books final", books);
      // console.log("book length", books?.length);

      return books;
    },
    allAuthors: async (root, args) => {
      const authors = await Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "books",
          },
        },
        {
          $addFields: {
            bookCount: { $size: "$books" },
          },
        },
        {
          $project: {
            id: "$_id",
            name: 1,
            born: 1,
            bookCount: 1,
          },
        },
      ]);
      //   console.log("authors", authors[0]);
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

        pubsub.publish("BOOK_ADDED", { bookAdded: returnedBook });

        return returnedBook;
      } catch (error) {
        throw new GraphQLError("Add book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            // invalidArgs: args.name,
            error,
          },
        });
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
