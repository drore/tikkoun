export default () => {
  return new Promise(function(resolve) {
    resolve({
      error: {
        page_not_found: 'Page not found'
      },
      nav: {
        start: 'Start',
        team: 'Team',
        about: 'About',
        htr: 'HTR',
        project: 'Project',
        conversation: 'Conversation',
        logout: 'Logout'
      },
      lang: {
        en: 'English',
        he: 'Hebrew',
        fr: 'French'
      },
      login: 'Login',
      register: 'Register'
    })
  })
}
