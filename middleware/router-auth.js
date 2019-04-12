export default function({ store, redirect, route }) {
  if (store.state.auth.user) {
    if (isAdminRoute(route) && !userIsAdmin(store.state.auth.user)) {
      redirect('/')
    } else {
      if (isLoginScreen(route)) {
        redirect('/transcribe')
      }
    }
  } else {
    if (isProtectedRoute(route)) {
      redirect('/')
    }
  }
}

function isProtectedRoute(route) {
  const name = route.name && route.name.split('__')[0]
  switch (name) {
    case 'transcribe':
    case 'transcribe-manuscript-page-line':
    case 'admin':
      return true
  }
  return false
}

function userIsAdmin(user){
  return user && user.role && user.role === 'admin'
}

function isAdminRoute(route) {
  const name = route.name && route.name.split('__')[0]
  switch (name) {
    case 'admin':
      return true
  }
  return false
}

function isLoginScreen(route) {
  const name = route.name && route.name.split('__')[0]
  switch (name) {
    case 'index':
      return true
  }
  return false
}
