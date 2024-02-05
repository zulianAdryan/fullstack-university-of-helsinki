import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useStorage } from "../hooks";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const ApolloProviderClient = (props) => {
  const { storageGetItem } = useStorage();

  const authLink = setContext((_, { headers }) => {
    const token = storageGetItem("_t");
    console.log("token authlink", token);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  });

  const httpLink = createHttpLink({
    uri: "http://localhost:4000",
  });

  const wsLink = new GraphQLWsLink(
    createClient({ url: "ws://localhost:4000" })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
    // uri: "http://localhost:4000",
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloProviderClient;
