const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Person = require("../models/person");
const User = require("../models/user");
const { PubSub } = require("graphql-subscriptions");

const pubSub = new PubSub();

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args, context) => {
      if (!args.phone) {
        return Person.find({}).populate("friendOf");
      }

      return Person.find({ phone: { $exists: args.phone === "YES" } }).populate(
        "friendOf"
      );
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Person: {
    address: (root) => ({
      street: root.street,
      city: root.city,
    }),
    // friendOf: async (root) => {
    //   const friends = await User.find({
    //     friends: {
    //       $in: [root._id],
    //     },
    //   });

    //   return friends;
    // },
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new GraphQLError("Saving user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      pubSub.publish("PERSON_ADDED", { personAdded: person });

      return person;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;

      try {
        await person.save();
      } catch (error) {
        throw new GraphQLError("Editing number failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      return person;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Failed creating new user", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const tokenForUser = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(tokenForUser, process.env.JWT_SECRET, {
          expiresIn: "24h",
        }),
      };
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = (person) => {
        currentUser.friends
          .map((friend) => friend?._id.toString())
          ?.includes(person?._id.toString());
      };

      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const person = await Person.findOne({ name: args.name });
      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      return await currentUser.save();
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubSub.asyncIterator("PERSON_ADDED"),
    },
  },
};

module.exports = resolvers;
