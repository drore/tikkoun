export default function({ store, redirect, route }) {
  store.state.user == null && isAdminRoute(route) ? redirect('/') : ''
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path == '/admin')) {
    return true
  }
}