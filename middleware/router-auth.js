export default function({ store, redirect, route }) {
  store.state.auth.user == null && isProtectedRoute(route) ? redirect('/') : ''
  store.state.auth.user != null && isLoginScreen(route) ? redirect('/transcribe') : ''
}

function isProtectedRoute(route) {
  const name = route.name && route.name.split('__')[0];
  switch(name){
    case 'transcribe':
    case 'transcribe-manuscript-page-line':
    case 'admin':
    return true
  }
  return false
}

function isLoginScreen(route) {
  const name = route.name && route.name.split('__')[0];
  switch(name){
    case 'index':
    return true
  }
  return false
}