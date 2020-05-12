export default function({ store, redirect, route }) {
  if (route && route.query.from_demo) {
    localStorage.removeItem('new_interface')
  }

  if (store.state.auth.user) {
    if (isAdminRoute(route) && !userIsAdmin(store.state.auth.user)) {
      redirect(`/${store.state.i18n.locale}`)
    } else {
      if (isLoginScreen(route)) {
        redirect(`/${store.state.i18n.locale}/transcribe`)
      }
    }
  } else {
    if (isProtectedRoute(route)) {
      redirect(`/${store.state.i18n.locale}`)
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

function userIsAdmin(user) {
  return true
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
