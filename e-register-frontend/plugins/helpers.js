export default (context, inject) => {
  const throwError = (err) => {
    if (err) {
      let errors = err.graphQLErrors ? [...err.graphQLErrors] : [];
      //   const { networkError, message, gqlError, graphqlErrors } = graphqlError;
      // console.log(err);
      if (errors.length > 0) {
        errors.forEach(error => {
            if (error.message == 'Invalid token' || error.message == 'jwt expired') {

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

      errors.length
        ? context.$toast.error(errors[0].message)
        : context.$toast.error("An error occurred");
    }
  };
  const apollo = context.app.apolloProvider.defaultClient;
  inject("throwError", throwError);
  inject("apollo", apollo);
};
