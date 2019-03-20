export default () => {
  return new Promise(function(resolve) {
    resolve({
      nav: {
        start: 'Start'
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
