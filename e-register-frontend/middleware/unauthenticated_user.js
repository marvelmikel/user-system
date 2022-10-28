export default function ({ app, redirect }) {
  if (
      app.$cookies.get('USER-TOKEN') === undefined ||
      app.$cookies.get('USER-LOGIN-STATE') === undefined
  ) {
      app.$cookies.remove('USER-TOKEN')
      app.$cookies.remove('USER-LOGIN-STATE')
      redirect('/signin')
  }
}
