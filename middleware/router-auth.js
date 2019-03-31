export default function({ store, redirect, route }) {
  store.state.user == null && isProtectedRoute(route) ? redirect('/') : ''
  store.state.user != null && isLoginScreen(route) ? redirect('/transcribe') : ''
}

function isProtectedRoute(route) {
  const name = route.name.split('__)')[0];
  switch(name){
    case 'transcribe':
    case 'admin':
    return true
  }
  return false
}

function isLoginScreen(route) {
  if (route.matched.some(record => record.path == '/')) {
    return true
  }
}