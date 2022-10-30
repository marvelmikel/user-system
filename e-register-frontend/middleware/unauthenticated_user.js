export default function ({ app, store, redirect }) {
  if (
    app.$cookies.get("USER-TOKEN") === undefined ||
    app.$cookies.get("USER-LOGIN-STATE") === undefined
  ) {
    app.$cookies.remove("USER-TOKEN");
    app.$cookies.remove("USER-LOGIN-STATE");
    redirect("/signin");
  } else if (
    app.$cookies.get("USER-EMAIL-VERIFY") == undefined ||
    !JSON.parse(app.$cookies.get("USER-EMAIL-VERIFY"))
  ) {
    redirect("/resend-verification-email");
  }
}
