import { StoreDB } from '~/plugins/firebase.js'
export default () => {
  return new Promise(function(resolve) {
    const translations = {
      'dir':'ltr',
      'main.site_name': 'Tikkoun Sofrim',
      'banner.encourgement.line_1':
        'Help make Ancient Hebrew manuscripts available!',
      'banner.encourgement.line_2': 'Try your skills at deciphering them!',
      'nav.about': 'About',
      'nav.project': 'The Project',
      'nav.htr': 'What is HTR?',
      'nav.midrash': 'Midrash Tanhuma',
      'nav.team': 'The Team',
      'nav.logout': 'Logout',
      'nav.conversation': 'Conversation',
      'nav.start': 'Start correcting!',
      'lang.en':'English',
      'lang.he':'Hebrew',
      'lang.fr':'French',
      'login.center.welcome': 'Welcome to Tikkoun Sofrim',
      'login.center.Intro_line_1':
        'The project aims to train computer algorithms to recognize handwritten text of Hebrew manuscripts.',
      'login.center.Intro_line_2':
        'We need your help in correcting errors in the initial automatic reading.',
      'login.login_area.username': 'Username',
      'login.login_area.password': 'Password',
      'Login.login_area.login': 'Login',
      'login.login_area.register': 'Register',
      'login.login_area.geust': 'Enter as guest',
      'login.login_area.invalid': 'Invalid Credentials!',
      'main.data_area.page': 'Page',
      'main.data_area.alphabet': 'Alphabet',
      'main.data_area.issues': 'Special Characters',
      'main.data_area.editing': 'Editing symbols',
      'main.data_area.help': 'Help',
      'main.data_area.conversation': 'Comments',
      'main.work_area.video': 'https://www.youtube.com/watch?v=Gwb751U6MVk',
      'main.work_area.video_hover': 'Video Tutorial',
      'main.work_area.video_text': 'For a tutorial see &#127910; ',
      'main.work_area.intro_line_1':
        'Below is an automatic transcription. Please correct all error in the text box.',
      'main.work_area.intro_line_2':
        'This includes correcting misread or missing letters, and redundant or missing spaces.',
      'main.work_area.button_1': '(-)',
      'main.work_area.button_2': '[+]',
      'main.work_area.button_3': '</>',
      'main.work_area.button_4': '{?}',
      'main.work_area.button_5': '↺',
      'main.work_area.finish_line_1':
        'If all errors are corrected, or if no errors found, press Done',
      'main.work_area.finish_line_2':
        'If you wish to skip this line without correcting, press Skip',
      'main.work_area.finish_button_1': 'Done',
      'main.work_area.finish_button_2': 'Skip',
      'main.work_area.Good_bye_Message1':
        'Thank you! for helping us to decipher ancient Hebrew manuscripts',
      'main.work_area.Good_bye_Message2': 'Number of lines you corrected:',
      'main.work_area.hovers.over_reset':
        'Reset to original auto-transcribed line',
      'main.work_area.hovers.over_additions':
        'Mark an addition. For guidance see the editing symbols tab on the right.',
      'main.work_area.hovers.over_deletions':
        'Mark a deletion. For guidance see the editing symbols tab on the right.',
      'main.work_area.hovers.over_uncertain':
        'Mark when uncertain. For guidance see the editing symbols tab on the right.',
      'main.work_area.hovers.over_damaged':
        'Mark when the text is damaged. For guidance see the editing symbols tab on the right.',
      'main.work_area.hovers.over_ligature':
        'Insert an alef-lamed ligature. For guidance see the special characters tab on the right.',
      'main.work_area.hovers.over_upper':
        'Insert a high point ligature. For guidance see the special characters tab on the right',
      'main.work_area.hovers.over_line_fillers':
        'Insert a line filler. For guidance see the special characters tab on the right.',
      'main.work_area.hovers.over_alef_plus': 'Increase size of text',
      'main.work_area.hovers.over_alef_minus': 'Reduce size of text',
      'register_screen.title': 'Register',
      'register_screen.subtitle': 'Already Registered?',
      'register_screen.userid': 'userid',
      'register_screen.email': 'e-mail',
      'register_screen.password': 'password',
      'register_screen.confirm': 'confirm password',
      'register_screen.require': 'required',
      'register_screen.demographics': 'Demographics (Optional)',
      'register_screen.DoB': 'Date of Birth',
      'register_screen.Hebrew': 'Knowledge of Hebrew',
      'register_screen.none_Hebrew': 'None',
      'register_screen.knowledgable_Hebrew': 'Very knowledgable',
      'register_screen.Midrash': 'Knowledge of Midrashim',
      'register_screen.none_Midrash': 'None',
      'register_screen.knowledgable_Midrash': 'Very knowledgable',
      'register_screen.invalid':
        'User name already exists in the system. Please try another one',
      'register_screen.contact': 'Contact you via e-mail'
    }

    resolve(translations)
  })
}
