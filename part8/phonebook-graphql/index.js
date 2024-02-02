require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("./utils/config");
const User = require("./models/user");
const typeDefs = require("./services/schema");
const resolvers = require("./services/resolvers");

const http = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const express = require("express");

const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.error("error connecting to mongodb", error));
mongoose.set("debug", true);

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
          const currentUser = await User.findById(decodedToken.id).populate(
            "friends"
          );
          // console.log("currentUser", currentUser);
          return { currentUser };
        }
      },
    })
  );

  const PORT = 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT}`)
  );
};

start();
