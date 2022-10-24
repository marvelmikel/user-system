export default (context, inject) => {
  const throwError = (err) => {
    err?.message
      ? context.$toast.error(err.message)
      : context.$toast.error(err?.data?.message ?? "An error occurred");
  };
  const apollo = console.log(context);

  inject("throwError", throwError);
  // inject("apollo", apollo);
};
