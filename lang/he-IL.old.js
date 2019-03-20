export default () => {
  return new Promise(function(resolve) {
    resolve({
      error: {
        page_not_found: 'העמוד לא קיים'
      },
      nav: {
        start: 'התחל',
        team: 'צוות',
        about: 'אודות',
        htr: 'HTR',
        project: 'הפרוייקט',
        conversation: 'שיחה',
        logout: 'יציאה'
      },
      lang: {
        en: 'אנגלית',
        he: 'עברית',
        fr: 'צרפתית'
      },
      login: 'כניסה',
      register: 'הרשמה'
    })
  })
}
