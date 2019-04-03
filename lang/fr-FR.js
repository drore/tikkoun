import { StoreDB } from '~/plugins/firebase.js'
export default () => {
  return new Promise(function(resolve) {
    const translations = {
      'dir':'ltr',
      'main.site_name': 'Tikkoun Sofrim',
      'banner.encourgement.line_1':
        'Contribuez \u00E0 l&#39;\u00E9tude des manuscrits h\u00E9bra\u00EFques anciens !',
      'banner.encourgement.line_2':
        'Mettez vos talents \u00E0 l&#39;\u00E9preuve de la transcription!',
      'Toolbar.about': '\u00C0 propos',
      'Toolbar.left.Project': 'Le Projet',
      'Toolbar.left.HTR': 'Qu&#39;est-ce que l&#39;HTR ?',
      'toolbar.left.Midrash': 'Midrash Tanhouma',
      'toolbar.left.Team': 'L&#39;\u00E9quipe',
      'toolbar.right.logout': 'Se d\u00E9connecter',
      'toolbar.right.start': 'Je participe !',
      'lang.en':'English',
      'lang.he':'Hebrew',
      'lang.fr':'French',
      'login.center.welcome': 'Bienvenue sur Tikkoun Sofrim',
      'login.center.Intro_line_1':
        'Notre projet: d\u00E9velopper un programme capable de transcrire automatiquement les manuscrits h\u00E9breux m\u00E9di\u00E9vaux.',
      'login.center.Intro_line_2':
        'Nous avons besoin de vous pour corriger les erreurs de la lecture automatique.',
      'login.login_area.username': 'Nom d&#39;utilisateur',
      'login.login_area.password': 'Mot de passe',
      'Login.login_area.login': 'Se connecter',
      'login.login_area.register': 'S&#39;enregistrer',
      'login.login_area.geust': 'Entrer sans compte',
      'login.login_area.invalid': 'Identifiants incorrects !',
      'main.data_area.page': 'Page',
      'main.data_area.Alphabet': 'Alphabet',
      'main.data_area.Issues': 'Caract\u00E8res sp\u00E9ciaux',
      'main.data_area.editing': 'marquage \u00E9ditorial',
      'main.data_area.help': 'Aide',
      'main.data_area.conversation': 'Conversation',
      'main.work_area.video': 'https://www.youtube.com/watch?v=Gwb751U6MVk',
      'main.work_area.video_hover': 'Tutoriel vid\u00E9o',
      'main.work_area.video_text': 'Pour un tutoriel voir &#127910; ',
      'main.work_area.intro_line_1':
        'Voici une transcription automatique. Veuillez corriger toute erreur que vous pourriez identifier dans l&#39;encadr\u00E9 du texte.',
      'main.work_area.intro_line_2':
        'Merci de corriger des lettres erronn\u00E9es, manquantes ou mal lues, ainsi que les espaces superflus ou manquants.',
      'main.work_area.button_1': '(-)',
      'main.work_area.button_2': '[+]',
      'main.work_area.button_3': '&lt;&#42823;&gt;',
      'main.work_area.button_4': '{?}',
      'main.work_area.button_5': '&#8634;',
      'main.work_area.finish_line_1':
        'Apr\u00E8s avoir corrig\u00E9 toutes les erreurs, ou si la transcription n&#39;en comportait aucune, cliquez sur &#34;Termin\u00E9&#34;.',
      'main.work_area.finish_line_2':
        'Si vous souhaitez passer cette ligne sans la corriger, cliquez sur &#34;Passer&#34;.',
      'main.work_area.finish_button_1': 'Termin\u00E9',
      'main.work_area.finish_button_2': 'Passer',
      'main.work_area.Good_bye_Message1': 'Merci de votre aide ! ',
      'main.work_area.Good_bye_Message2':
        'Les nombre the lignes que vous avez corrig\u00E9:',
      'main.work_area.hovers.over_reset':
        'Revenir \u00E0 la transcription automatique.',
      'main.work_area.hovers.over_additions':
        'Signaler un ajout. Besoin d&#39;aide ? R\u00E9f\u00E9rez-vous \u00E0 l&#39;onglet &#34;Marquage \u00E9ditorial&#34; sur la gauche.',
      'main.work_area.hovers.over_deletions':
        'Signaler une suppression. Besoin d&#39;aide ? R\u00E9f\u00E9rez-vous \u00E0 l&#39;onglet &#34;Marquage \u00E9ditorial&#34; sur la gauche.',
      'main.work_area.hovers.over_uncertain':
        'Signaler comme incertain. Besoin d&#39;aide ? R\u00E9f\u00E9rez-vous \u00E0 l&#39;onglet &#34;Marquage \u00E9ditorial&#34; sur la gauche.',
      'main.work_area.hovers.over_damaged':
        'Signaler un texte endommag\u00E9. Besoin d&#39;aide ? R\u00E9f\u00E9rez-vous \u00E0 l&#39;onglet &#34;Marquage \u00E9ditorial&#34; sur la gauche.',
      'main.work_area.hovers.over_ligature':
        'Signaler une ligature Aleph-Lamed. Besoin d&#39;aide ? R\u00E9f\u00E9rez-vous \u00E0 l&#39;onglet &#34;Caract\u00E8res sp\u00E9ciaux&#34; sur la gauche.',
      'main.work_area.hovers.over_upper':
        'Signaler un point sup\u00E9rieur \u00E0 la fin d&#39;une phrase. Besoin d&#39;aide ? R\u00E9f\u00E9rez-vous \u00E0 l&#39;onglet &#34;Caract\u00E8res sp\u00E9ciaux&#34; sur la gauche.',
      'main.work_area.hovers.over_line_fillers':
        'Signaler un remplisseur de ligne. Besoin d&#39;aide ? R\u00E9f\u00E9rez-vous \u00E0 l&#39;onglet &#34;Caract\u00E8res sp\u00E9ciaux&#34; sur la gauche.',
      'main.work_area.hovers.over_alef_plus':
        'Agrandir la taille de la police.',
      'main.work_area.hovers.over_alef_minus':
        'R\u00E9duire la taille de la police.',
      'register_screen.title': 'S&#39;inscrire',
      'register_screen.subtitle': 'D\u00E9j\u00E0 inscrit?',
      'register_screen.userid': 'Identifiant',
      'register_screen.email': 'e-mail',
      'register_screen.password': 'Mot de passe',
      'register_screen.confirm': 'Confirmez le mot de passe',
      'register_screen.require': 'Information indispensable',
      'register_screen.demographics':
        'Informations suppl\u00E9mentaires (optionnel)',
      'register_screen.DoB': '\u00E2ge',
      'register_screen.Hebrew': 'Connaissance de l&#39;h\u00E9breu',
      'register_screen.none_Hebrew': 'aucune',
      'register_screen.knowledgable_Hebrew': 'tr\u00E8s bonne ma\u00EEtrise',
      'register_screen.Midrash': 'Connaissance du Midrash',
      'register_screen.none_Midrash': 'aucune',
      'register_screen.knowledgable_Midrash': 'tr\u00E8s bonne connaissance',
      'register_screen.invalid':
        'Identifiant existe d\u00E9j\u00E0 dans le syst\u00E8me. S&#39;il vous pla\u00EEt essayer un autre',
      'register_screen.contact':
        'Est-ce que vous nous autorisez de vous contacter par e-mail?'
    }
    resolve(translations)
  })
}
