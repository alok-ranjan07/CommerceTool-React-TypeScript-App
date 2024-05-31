import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  defaultDataIdFromObject,
  from,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import fetch from "./auth";

const apiURL = process.env.REACT_APP_DEV_API_URL;
const projectKey = process.env.REACT_APP_DEV_PROJECT_KEY;

export const cache = new InMemoryCache({
  //getting default id is broken
  dataIdFromObject(responseObject) {
    // if (responseObject?.scopedPrice?.country) {
    //   console.log('variable:', responseObject.scopedPrice);
    //   console.log(
    //     'key:',
    //     defaultDataIdFromObject(responseObject)
    //   );
    //   // return `${defaultDataIdFromObject(
    //   //   responseObject
    //   // )}:${JSON.stringify(responseObject.scopedPrice)}`;
    // }
    if (responseObject.__typename === "Me") {
      //both orders and active cart are identified as "Me" this breaks
      //  apollo cache
      return "activeCart" in responseObject ? "activeCart" : "orders";
    }
    return defaultDataIdFromObject(responseObject);
  },
});

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const httpLink = from([
  errorLink,
  createHttpLink({
    uri: `${apiURL}/${projectKey}/graphql`,
    fetch,
  }),
]);

export const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
});
