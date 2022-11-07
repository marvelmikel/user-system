import { onError } from 'apollo-link-error'

export default (context) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    let errors = graphQLErrors ? [...graphQLErrors] : [];

    if (errors.length > 0) {
      errors.forEach(error => {
          if (error.message == 'Invalid token') {

            let path = context.route.path
            let regex = new RegExp('/admin', "i");
            console.log(regex.test(path) ? `admin: ${path} route` : `user: ${path} route`);

            if (regex.test(path)) {
              context.app.store.commit("ADMIN_LOGOUT");
              context.app.router.push("/admin/signin");
              context.$toast.error("Expired Token");
            }else{
              context.app.store.commit("LOGOUT");
              context.app.router.push("/signin");
              context.$toast.error("Expired Token");
            }
          }
      });
    }
    console.log('graphQLErrors', errors);
    console.log('networkError', networkError);
  })

  return {
    httpEndpoint: process.env.DEVELOPMENT_BASE_URL,
    httpLinkOptions: {
      credentials: 'same-origin'
    },
    /*
     * For permanent authentication provide `getAuth` function.
     * The string returned will be used in all requests as authorization header
     */
    getAuth: () => `Bearer ${context.$cookies.get("USER-TOKEN")}`,

    link: errorLink,
  };
}
