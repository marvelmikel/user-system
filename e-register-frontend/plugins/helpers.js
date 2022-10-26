export default (context, inject) => {
  const throwError = (err) => {
    if (err) {
      let errors = err.graphQLErrors ? [...err.graphQLErrors] : [];
      //   const { networkError, message, gqlError, graphqlErrors } = graphqlError;

      // if (errors.length) {
      //   if (errors[0].message === 'jwt expired') {
      //     context.app.store.commit("ADMIN_LOGOUT");
      //     context.app.router.push("/admin/signin");
      //     context.$toast.error("Expired Token");
      //   }
      // }

      errors.length
        ? context.$toast.error(errors[0].message)
        : context.$toast.error("An error occurred");
    }
  };
  const apollo = context.app.apolloProvider.defaultClient;
  inject("throwError", throwError);
  inject("apollo", apollo);
};
