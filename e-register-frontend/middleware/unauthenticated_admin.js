export default function ({ app, redirect }) {
  if (
      app.$cookies.get('ADMIN-TOKEN') === undefined ||
      app.$cookies.get('ADMIN-LOGIN-STATE') === undefined
  ) {
      app.$cookies.remove('ADMIN-TOKEN')
      app.$cookies.remove('ADMIN-LOGIN-STATE')
      redirect('/admin/signin')
  }
}
