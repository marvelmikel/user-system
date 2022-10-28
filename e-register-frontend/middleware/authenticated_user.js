export default function ({ app, redirect }) {
  if (
      app.$cookies.get('USER-TOKEN') &&
      app.$cookies.get('USER-LOGIN-STATE')
  ) {

      redirect('/')
  }
}
