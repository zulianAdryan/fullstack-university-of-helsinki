import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const ApolloProviderClient = (props) => {
  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloProviderClient;
