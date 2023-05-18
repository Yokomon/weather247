import { ApolloClient, InMemoryCache } from "@apollo/client";

export const getClient = () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_APOLLO_URI,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_APIKEY}`,
    },
  });

  return client;
};
