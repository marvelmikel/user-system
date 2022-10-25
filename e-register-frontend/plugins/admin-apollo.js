export default (context) => {
  return {
    httpEndpoint: process.env.DEVELOPMENT_BASE_URL,
    httpLinkOptions: {
      credentials: 'same-origin'
    },
    /*
     * For permanent authentication provide `getAuth` function.
     * The string returned will be used in all requests as authorization header
     */
    getAuth: () => `Bearer ${context.$cookies.get("ADMIN-TOKEN")}`,
  };
}
