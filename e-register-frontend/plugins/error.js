import { onError } from 'apollo-link-error'

export default function (ctx) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {});
  return {
    link: errorLink,

    // required
    httpEndpoint: ctx.app.$env.GRAPHQL_URL,

    httpLinkOptions: {
      credentials: "same-origin",
    },
  };
}
