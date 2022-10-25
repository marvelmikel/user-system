export default (context, inject) => {
  const throwError = (err) => {
    if (err) {
      let errors = err.graphQLErrors ? [...err.graphQLErrors] : [];
      //   const { networkError, message, gqlError, graphqlErrors } = graphqlError;
      errors.length
        ? context.$toast.error(errors[0].message)
        : context.$toast.error("An error occurred");
    }
  };
  const apollo = context.app.apolloProvider.defaultClient;
  inject("throwError", throwError);
  inject("apollo", apollo);
};
