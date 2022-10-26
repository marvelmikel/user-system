import { onError } from 'apollo-link-error'

export default function(ctx) {
  console.log(ctx);
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log('graphQLErrors: '+graphQLErrors);
    console.log('networkError: '+networkError);
  })
  return {
    link: errorLink,

    // required
    httpEndpoint: ctx.app.$env.GRAPHQL_URL,

    httpLinkOptions: {
      credentials: 'same-origin'
    },
  }
}
