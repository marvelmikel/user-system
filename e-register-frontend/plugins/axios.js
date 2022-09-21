export default ({ $axios, redirect, $cookies }) => {
  $axios.onRequest((config) => {
    // set token
    $axios.setToken($cookies.get("ERF-TOKEN"), "Bearer");
  });
  // catch error
  $axios.onError((error) => {
    const code = parseInt(error.response.status);
    if (code === 401) {
      $cookies.removeAll();
      redirect("/login");
    }
    return Promise.reject(error.response);
  });
};
