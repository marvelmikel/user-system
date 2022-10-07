import gql from 'graphql-tag';

export default (context, inject) => {
  const throwError = (err) => {
    err?.message
      ? context.$toast.error(err.message)
      : context.$toast.error(err?.data?.message ?? "An error occurred");
  };

  inject('gql', gql);
  inject("throwError", throwError);
};
