import { onError } from 'apollo-link-error'

export default function (ctx) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {

    // console.log('graphQLErrors', graphQLErrors);
    // console.log('networkError', networkError);
  });
  // return {
  //   link: errorLink,

  //   // required
  //   httpEndpoint: process.env.DEVELOPMENT_BASE_URL,

  //   httpLinkOptions: {
  //     credentials: "same-origin",
  //   },
  // };
}
