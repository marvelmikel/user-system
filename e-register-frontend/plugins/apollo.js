export default (context) => {
  return {
    httpEndpoint: process.env.DEVELOPMENT_BASE_URL,

    /*
     * For permanent authentication provide `getAuth` function.
     * The string returned will be used in all requests as authorization header
     */
    getAuth: () => 'Bearer my-static-token',
  }
}
