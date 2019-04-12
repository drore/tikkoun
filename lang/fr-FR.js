export default () => {
  return new Promise(function(resolve) {
    const translations = {
      dir: 'ltr',
      'main.site_name': 'Tikkoun Sofrim',
      'banner.encourgement.line_1': `Contribuez à l'étude des manuscrits hébraïques anciens !`,
      'banner.encourgement.line_2': `Mettez vos talents à l'épreuve de la transcription`,
      'nav.about': `À propos`,
      'nav.project': 'Le Projet',
      'nav.htr': "Qu'est-ce que l'HTR ?",
      'nav.midrash': 'Midrash Tanhouma',
      'nav.team': "L'équipe",
      'nav.logout': 'Se déconnecter',
      'nav.profile': 'Profile',
      'nav.start': 'Je participe !',
      'nav.conversation': ``,
      'lang.en': 'English',
      'lang.he': 'Hebrew',
      'lang.fr': 'French',
      'login.center.welcome': 'Bienvenue sur Tikkoun Sofrim',
      'login.center.Intro_line_1':
        'Notre projet: développer un programme capable de transcrire automatiquement les manuscrits hébreux médiévaux.',
      'login.center.Intro_line_2':
        'Nous avons besoin de vous pour corriger les erreurs de la lecture automatique.',
      'login.login_area.username': 'Nom d&#39;utilisateur',
      'login.login_area.password': 'Mot de passe',
      'Login.login_area.login': 'Se connecter',
      'login.login_area.register': `S'enregistrer`,
      'login.login_area.geust': 'Entrer sans compte',
      'login.login_area.invalid': 'Identifiants incorrects !',
      'main.data_area.page': 'Page',
      'main.data_area.alphabet': 'Alphabet',
      'main.data_area.issues': 'Caract\u00E8res sp\u00E9ciaux',
      'main.data_area.editing': 'marquage \u00E9ditorial',
      'main.data_area.help': 'Aide',
      'main.data_area.conversation': 'Conversation',
      'main.work_area.video': 'https://www.youtube.com/watch?v=Gwb751U6MVk',
      'main.work_area.video_hover': 'Tutoriel vid\u00E9o',
      'main.work_area.video_text': 'Pour un tutoriel voir &#127910; ',
      'main.work_area.intro_line_1': `Voici une transcription automatique. Veuillez corriger toute erreur que vous pourriez identifier dans l'encadré du texte. `,
      'main.work_area.intro_line_2': `Merci de corriger des lettres erronnées, manquantes ou mal lues, ainsi que les espaces superflus ou manquants.`,
      'main.work_area.button_1': '(-)',
      'main.work_area.button_2': '[+]',
      'main.work_area.button_3': '</>',
      'main.work_area.button_4': '{?}',
      'main.work_area.button_5': '↺',
      manuscripts:'Manuscript',
      'main.work_area.finish_line_1': `Après avoir corrigé toutes les erreurs, ou si la transcription n'en comportait aucune, cliquez sur "Terminé".`,
      wrong_creds: 'identifiant ou mot de passe incorrect',
      'main.work_area.finish_line_2': `Si vous souhaitez passer cette ligne sans la corriger, cliquez sur "Passer".`,
      'main.work_area.finish_button_1': 'Termin\u00E9',
      'main.work_area.finish_button_2': 'Passer',
      'reset_password':'Réinitialiser un mot de passe',
      'main.work_area.Good_bye_Message1': 'Merci de votre aide ! ',
      'version_text':'You are using a new version of Tikkoun-Sofrim. If you encounter problems please e-mail us.',
      'support':'Support',
      'main.work_area.Good_bye_Message2':
        'Les nombre the lignes que vous avez corrig\u00E9:',
      'main.work_area.hovers.over_reset':
        'Revenir \u00E0 la transcription automatique.',
      'main.work_area.hovers.over_additions': `Signaler un ajout. Besoin d'aide ? Référez-vous à l'onglet "Marquage éditorial" sur la gauche.`,
      'main.work_area.hovers.over_deletions': `Signaler une suppression. Besoin d'aide ? Référez-vous à l'onglet "Marquage éditorial" sur la gauche.`,
      'main.work_area.hovers.over_uncertain': `Signaler comme incertain. Besoin d'aide ? Référez-vous à l'onglet "Marquage éditorial" sur la gauche.`,
      'main.work_area.hovers.over_damaged': `Signaler un texte endommagé. Besoin d'aide ? Référez-vous à l'onglet "Marquage éditorial" sur la gauche.`,
      'main.work_area.hovers.over_ligature': `Signaler une ligature Aleph-Lamed. Besoin d'aide ? Référez-vous à l'onglet "Caractères spéciaux" sur la gauche.`,
      'main.work_area.hovers.over_upper': `Signaler un point supérieur à la fin d'une phrase. Besoin d'aide ? Référez-vous à l'onglet "Caractères spéciaux" sur la gauche.`,
      'main.work_area.hovers.over_line_fillers': `Signaler un remplisseur de ligne. Besoin d'aide ? Référez-vous à l'onglet "Caractères spéciaux" sur la gauche.`,
      'main.work_area.hovers.over_alef_plus': `Agrandir la taille de la police.`,
      'main.work_area.hovers.over_alef_minus': `Réduire la taille de la police.`,
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
      'register_screen.hebrew': 'Connaissance de l&#39;h\u00E9breu',
      'register_screen.none_hebrew': 'aucune',
      'register_screen.knowledgable_hebrew': 'tr\u00E8s bonne ma\u00EEtrise',
      'register_screen.midrash': 'Connaissance du Midrash',
      'register_screen.none_midrash': 'aucune',
      'register_screen.knowledgable_midrash': 'tr\u00E8s bonne connaissance',
      'register_screen.invalid':
        'Identifiant existe d\u00E9j\u00E0 dans le syst\u00E8me. S&#39;il vous pla\u00EEt essayer un autre',
      'register_screen.contact':
        'Est-ce que vous nous autorisez de vous contacter par e-mail?',
      'register_screen.show_extra_details': 'Additional details'
    }
    translations.content = {}
    // TEAM
    translations.content.team = {}
    translations.content.team.partners = `<div class="partners">
    <div class="header">
      <strong>Partenaires - Institutions</strong>
    </div>
    <div>
    <p><strong>L'EPHE</strong></p>
    <p>
  L’École pratique des hautes études (<a href="https://www.ephe.fr">EPHE</a>), créée en Sorbonne en 1868 et reconnue comme l'un des 
  grands établissements français, compte trois sections (Sciences de la Vie et de la Terre, Histoire et Philologie, Études religieuses)
  et environ 260 professeurs. Déjà en 1955, elle a fondé une chaire en sciences humaines computationnelles, l'une des premières au monde.
  Aujourd'hui, l'EPHE fait partie de l'Université PSL (Paris Sciences et Lettres) où elle travaille main dans la main avec d'autres 
  établissements prestigieux. De nombreux scientifiques et chercheurs de renommée mondiale ont enseigné à l'EPHE ou ont travaillé dans
  ses laboratoires : Émile Benveniste, Israël Lévi (qui a également été Grand Rabbin de France et a participé à l'inauguration de 
  l'Université hébraïque de Jérusalem), Claude Lévi-Strauss, Sylvain Lévi, Marcel Mauss, Ferdinand de Saussure. 
    </p>
    </div>
    <div>
    <p>
    <strong>Elijah Lab</strong></p>
    <p>
    <a
      href="http://elijahlab.haifa.ac.il/index.php/en/" target="_blank">L'eLijah-
  Lab</a> de l'Université de Haïfa est un laboratoire de crowdsourcing: son objetif est de faire participer le public aux recherches 
  menées par le département
  d'histoire juive de l'Université de Haïfa. Le Laboratoire développe activement une série d'outils qui incite le grand public à
  participer aux efforts d'études et de recherche, menées par le département, dans les domaines du judaïsme et de la culture et de 
  l'histoire israéliennes.
    </p>
    </div>
    <div>
    <p>
    <strong>La bibliothèque nationale d'Israël</strong>
    </p>
    <p>
    Fondée à Jérusalem en 1892, la <a href="http://web.nli.org.il/sites/nlis/en">Bibliothèque nationale d'Israël</a> 
    est la mémoire collective du peuple juif du monde entier et des Israéliens de tous les horizons et de toutes les confessions. 
    Tout en continuant de servir de bibliothèque de recherche prééminente pour Israël, la Bibliothèque nationale d'Israël 
    a récemment entrepris un processus ambitieux de renouvellement afin d'encourager des publics divers, en Israël 
    et dans le monde entier, à explorer ses trésors de manière nouvelle. Cela se traduit par diverses initiatives pédagogiques, 
    culturelles et numériques innovantes telles que le projet <a href="http://web.nli.org.il/sites/nlis/en/manuscript">KTIV</a>, une
    collection d'images numériques de haute qualité de tous 
    les manuscrits rédigés en caractères hébraïques du monde entier. Cela s'exprime également par l'édification d'un nouveau bâtiment 
    : actuellement en construction à proximité de la Knesset, ce nouveau campus devrait être achevé en 2021.
    </p>
    </div>
    <div>
    <p>
    <strong>L’Université PSL</strong></p>
    <p>
  Fondée en 2011, la <a href="https://fr.wikipedia.org/wiki/Communaut%C3%A9_d%27universit%C3%A9s_et_%C3%A9tablissements"> COMUe</a> <a href="https://www.psl.eu">l'Université PSL</a> comprend 
  un large éventail d'écoles et d'institutions 
  prestigieuses couvrant les arts, les sciences, l'ingénierie, les sciences humaines et les sciences 
  sociales. Parmi ces institutions figurent l'EPHE, l'ENS, Mines ParisTech et Paris-Dauphine. Le Collège 
  de France et l'EHESS en sont membres associés. Avec 4 500 chercheurs et 17 000 étudiants, classés 
  41e au classement <a href="https://www.timeshighereducation.com/world-university-rankings/paris-sciences-et-lettres-psl-research-university-paris">Times Literary Supplement</a> en 2018,
  les ressources de PSL sont comparables à celles des meilleures universités du monde, avec des 
  cursus innovants (dont le master en sciences humaines numériques et informatiques), créant des startups (40 en moyenne par an). 
  Dans le cadre de ses initiatives fédératives, PSL a lancé le projet Scripta-PSL. 
  </p>
  </div>
  <div><p>
  <strong>Scripta-PSL</strong>
  </p>
  <p>
  <a href="https://scripta.psl.eu">Scripta-PSL</a>  est un projet fédérant une centaine de chercheurs de l'Université PSL qui travaillent 
  sur des objets inscrits de toutes cultures, époques et types, des tablettes cunéiformes et inscriptions hiéroglyphiques aux manuscrits médiévaux. Il est dirigé par Andreas Stauder.
  Dans le cadre de sa composante numérique, nous développons eScriptorium, une infrastructure open-source combinant des outils numériques pour l'annotation visuelle et textuelle, 
  l’apprentissage profond pour la transcription automatique (HTR) et la paléographie, ainsi que le traitement du langage naturel (NLP). 
  </p>
  </div>
  <div><p>
  <strong>CHArt</strong>
  </p>
  <p>
  Le Laboratoire de <a href="http://www.cognition-usages.org">Cognition humaine et artificielle</a> (EA 4004), fondé en 2007, regroupe une centaine 
  de chercheurs de l'EPHE et des Universités de Paris 8, 10 et 12 travaillant par des moyens expérimentaux et informatiques sur la cognition naturelle et artificielle.
  </p>
  </div>
  </div>
  © 2019 GitHub, Inc.`
    translations.content.team.team = `<div class="team">
    <div class="header">
      <strong>L'équipe</strong>
      <div>
        <strong>(par ordre alphabétique)</strong>
      </div>
    </div>
  
  
    <div class="members">
    <div class="member">Dror Elovits est développeur en chef à l'eLijah-Lab à l’Université de Haïfa.</div>
      <div class="member">Kaan Eraslan est développeur et doctorant en démotique et humanités numériques à l’EPHE, PSL.</div>
      <div class="member">Pawel Jablonski est étudiant master en études juives à l’EPHE, PSL.</div> 
      <div class="member">Ben Kiessling est ingénieur en Vision par Ordinateur et Intelligence Artificielle à l’université PSL, et doctorant à l’EPHE et à l’université de Leipzig.
  </div>
      <div class="member">Pr. Tsvi Kuflik enseigne au département de Systèmes d’information et est co-directeur du programme de licence d’Humanités numériques (Digital Humanities) de l’université de Haïfa.
  </div>
        <div class="member">Dr. Moshe Lavee enseigne au département d’histoire juive. Il est le fondateur et directeur de eLijah-Lab et 
  co-directeur du programme de licence d’Humanités numériques de l’université de Haïfa.
  </div>
      <div class="member">Elena Lolli est doctorante en cotutelle à l'Université de Bologne et à l'EPHE, PSL.</div>
      <div class="member">Dr. Avigail Ohali est post-doc à l’EPHE, PSL. Sa thèse (Paris 3) traite l’humour dans la Mishna et la Tosefta.
  </div>
  
      <div class="member">Dr. Vered Raziel Kretzmer est post-doc à eLijah-Lab à l’université de Haïfa, elle étudie la liturgie et les midrash dans les documents de la Géniza du Caire.
  </div>
  
      <div class="member">M. Uri Schor est doctorant à l’université de Haïfa. Il a une licence en informatique et un master en études talmudiques.
  </div>
  
      <div class="member">Dr. Tsafra Siew est le directeur des projets sur les manuscrits hébreux à la Bibliothèque nationale d'Israël.</div>
  
      <div class="member">Lily Signoret est étudiante en master à l’université de Strasbourg.</div>
  
      <div class="member">Pr. Daniel Stökl Ben Ezra est directeur d’études d’hébreu et d’araméen anciens à la section des sciences historiques et philologiques à l’EPHE, PSL et directeur du volet numérique du projet Scripta-PSL qui construit l'eScriptorium.
  </div>
  
      <div class="member">
  Peter Stokes est directeur d’études en humanités numériques et computationnelles appliquées aux écrits anciens et le directeur du programme en humanités numériques à l’EPHE, PSL.</div>
  
      <div class="member">Dr. Alan Wecker est le développeur principal auprès du projet Tikkoun Sofrim. Il est docteur en informatique.
  </div>
  
    </div>
  </div>`
    translations.content.team.thanks = `<div class="thanks">
    <div class="header">
      <strong>Remerciements</strong>
    </div>
    <div>
      <p>Nous remercions Robin Tissot, Pr. Marc Bui, Dr. Shimon
        Fogel, Pr. Hayim Lapin, Pr. Elena Pierazzo, Einat Tamir et Anna Scius-Bertrand pour leurs contributions.</p>
      <p>Un grand merci aux collègues qui ont fourni leurs transcriptions afin d'entraîner Kraken: Pr. Hananel
        Mack, Dr. Tamar Kadari, Pr. Rivka Ulmer.</p>
      <p>Les institutions suivantes ont fourni les images pour ce projet et nous les en remercions tout particulièrement
      : La Bibliothèque de Genève, la Biblioteca
        Apostolica Vaticana, la Biblioteca Palatina de Parme. Tous les droits aux images appartiennent à ces institutions.</p>
  
    </div>
  </div>`
    translations.content.htr = `<div class="tabContentTitle">
  Qu’est-ce que l’HTR ?
  </div>
  <p>	La reconnaissance automatique des textes (HTR - Handwritten Text Recognition)
    est une opération tenant du domaine de la Vision par Ordinateur, qui vise à 
    transformer automatiquement des images en texte. Cette transformation permet 
    entre autres choses d’explorer le texte et de l’intégrer à des articles, des 
    monographies ou des sites Internet. Nous utilisons à la fois les techniques 
    les plus récentes d’apprentissage automatique, et des méthodes traditionnelles
    optimisées manuellement.
    </p>
    <p>
    La première étape est d'analyser automatiquement la mise en page afin 
    de définir des colonnes de texte, ainsi que des zones d’annotations marginales.
  </p>
    <p>
  Dans une second temps, ces régions sont segmentées en images de lignes.
  Nous procédons encore actuellement avec des méthodes traditionnelles, mais le passage à une approche complètement automatisée par CNN est en cours. 
  </p>
    <p>
  Lors de la troisième étape, nous entraînons l’ordinateur à déchiffrer le texte qui figure dans les images 
  des lignes. Le principe de base est le suivant: montrer à l’ordinateur un grand nombre d’images 
  de lignes de manuscrits, ainsi que leurs transcriptions correspondantes sous forme de texte. L’ordinateur
  apprend au fur et à mesure comment produire du texte avec des images comme données d’entrée. 
  À force d’entraînement, il devient capable de le faire également pour des images qu’il n’a jamais vues.
  Notre système principal est Kraken, développé par Benjamin Kiessling.
  Tikkoun Sofrim est le deuxième projet d’HTR à l’EPHE à côté de Sofer Mahir, un projet qui vise 
  à la transcription automatique des principaux manuscrits de la littérature tannaïtique.
  </p>
    <p>
  À l’université PSL, dans le cadre du projet Scripta-PSL, nous travaillons à la construction de
  eScriptorium, une infrastructure en open source qui permettra la transcription automatique de 
  manuscrits et de leur annotation profonde (philologique, historique, linguistique).
  
  </p>
  
  <div class="tabContentTitle mt-5">
  Crowdsourcing et sciences participatives
  </div>
  <p>
    
  Ces dernières années, initiatives impliquant le grand public dans 
  la recherche universitaire sont en plein essor. On les appelle souvent 
  “sciences citoyennes”. Ces initiatives invitent
  le grand public à participer à des tâches dans 
  divers domaines de recherche, qui vont de la catégorisation 
  des galaxies à la classification des espèces 
  animales en voie d’extinction.
  </p>
    <p>
  Les initiatives de sciences participatives
  ont un intérêt mutuel : elles visent, d’une part,
  à exposer la recherche scientifique au grand 
  public d’une façon compréhensible, qui lui permette
  de participer aux tâches inhérentes à la recherche
  scientifique ; d’autre part, elles forcent les 
  scientifiques et les chercheurs à descendre de leur
  tour d’ivoire afin de développer les relations entre
  la société et la recherche.
  </p>
    <p>
  Tikkoun Sofrim est la deuxième initiative de sciences
  citoyennes de l’eLijah-Lab de l’université de Haifa,
  prenant la suite du projet Scribes of the Cairo Genizah.
  </p>`
    translations.content.project = `<p>
	<strong>Tikkoun Sofrim</strong> est un projet collaboratif
	franco-israélien développé dans le cadre du PHC Maimonide. Son objectif est de
	rendre les manuscrits hébraïques médiévaux accessibles à tous.
	Le projet associe la reconnaissance automatique des textes manuscrits
	(HTR) à la production participative (Crowdsourcing).

</p>
<p>Lors de la première phase, nous analysons automatiquement la
	structure de la page manuscrite, ce qui permet d’entraîner Kraken, un
	système d’apprentissage profond (deep learning) de lecture automatique.
	Les capacités de lecture de Kraken sont très bonnes, avec un taux
	d’erreur inférieur à 10%, voire inférieur à 5%.</p>
<p>Mais ce n’est pas encore suffisant.</p>

<p>Afin d’améliorer les capacités de lecture automatique de Kraken
	et d’obtenir une transcription impeccable des textes, nous avons besoin
	du regard humain.</p>
<p>C’est là l’objectif de notre site : vous donner l’opportunité de
	contribuer à la recherche en vérifiant la lecture automatique de
	Kraken, et en la corrigeant si besoin.</p>
<p>Lors de la deuxième phase, vos corrections seront utilisées d’une
	part pour améliorer la lecture automatique, et d’autre part pour
	l’élaboration d’éditions critiques numériques permettant la recherche
	textuelle dans les manuscrits et leur visualisation en ligne.</p>

<p>Tikkoun Sofrim est un projet collaboratif franco-israélien
	développé par l’EPHE, PSL, à Paris, eLijah-Lab de l’université de
	Haïfa, et la Bibliothèque Nationale d’Israël. Le projet est financé
	dans le cadre du PHC “Maïmonide” du Ministère français de l’éducation
	supérieure et de la recherche, par le Ministère français des affaires
	étrangères et par le Ministère israélien des Sciences. Le laboratoire
	eLijah-Lab est soutenu par l’ONG Hekhal Eliyahu.</p>
<div>
	Pour toute questions, des suggestions ou toute autre remarque, n'hésitez
	pas à nous <a href="mailto:tikkoun.sofrim@gmail.com">contacter</a>,
	s'il vous plaît!
</div>`
    resolve(translations)
  })
}
