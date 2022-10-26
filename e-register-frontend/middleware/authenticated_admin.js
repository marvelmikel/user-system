export default function ({ app, redirect }) {
  if (
      app.$cookies.get('ADMIN-TOKEN') &&
      app.$cookies.get('ADMIN-LOGIN-STATE')
  ) {

      redirect('/admin')
  }
}
