export default (context, inject) => {
  const throwError = (err) => {
    err?.message
      ? context.$toast.error(err.message)
      : context.$toast.error(err?.data?.message ?? "An error occurred");
  };

  inject("throwError", throwError);
};
