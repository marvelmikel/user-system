export default function ({ app, redirect }) {
  if (
      app.$cookies.get('ADMIN-TOKEN') === undefined ||
      app.$cookies.get('ADMIN-LOGIN-STATE') === undefined
  ) {
      app.$cookies.removeAll()
      redirect('/admin/signin')
  }
}
