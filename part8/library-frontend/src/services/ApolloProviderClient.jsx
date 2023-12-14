import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useStorage } from "../hooks";

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

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    // uri: "http://localhost:4000",
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloProviderClient;
