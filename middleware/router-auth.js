export default function({ store, redirect, route }) {
  store.state.user != null && route.path === '/' ? redirect('/transcribe') : ''
  store.state.user == null && route.path === '/transcribe' ? redirect('/') : ''
}

// function isAdminRoute(route) {
//   if (route.matched.some(record => record.path === '/admin')) {
//     return true
//   }
// }
