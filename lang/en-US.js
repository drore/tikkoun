export default () => {
  return new Promise(function(resolve) {
    const translations = {
      dir: 'ltr',
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
      'profile.general':'General',
      'profile.stats':'Statistics',
      'lines_made':'Transcribed lines',
      'maintenance':`Tikkoun Sofrim system is out for maintenance, we'll be back at 14:00`,
      'nav.conversation': 'Conversation',
      'conversation.by':'By',
      'conversation.reply':'Reply',
      'conversation.comments':'Comments',
      anonymous: 'Guest',
      'nav.profile': 'Profile',
      'nav.start': 'Start correcting!',
      'lang.en': 'English',
      'lang.he': 'עברית',
      'lang.fr': 'Français',
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
      manuscripts:'Manuscript',
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
      'help':"Help",
      'main.work_area.over_ligature': 'ﭏ',
      'main.work_area.over_upper': '˙',
      'stats.leader_board':'Leaderboard',
      'stats.personal_stats':'Personal statistics',
      'conversation.disclaimer':'Welcome to Tikkoun Sofrim conversation! Please note that all messages and sender names are shown to all users by default.',
      'nav.stats':'Statistics',
      'nav.research_questionnaire':'Personal Questionnaire',
      'conversation.new':"+ New topic",
      'wrong_creds':'Wrong credentials',
      'reset_password':'Reset Password',
      'version_text':'You are using a new version of Tikkoun-Sofrim. If you encounter problems please e-mail us.',
      'support':'Support',
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
      'register_screen.hebrew': 'Knowledge of Hebrew',
      'register_screen.none_hebrew': 'None',
      'register_screen.knowledgable_hebrew': 'Very knowledgable',
      'register_screen.midrash': 'Knowledge of Midrashim',
      'register_screen.none_midrash': 'None',
      'register_screen.knowledgable_midrash': 'Very knowledgable',
      'register_screen.invalid':
        'User name already exists in the system. Please try another one',
      'register_screen.contact': 'Contact you via e-mail',
      'register_screen.show_extra_details':'Additional details'
    }
    translations.content = {}
    // TEAM
    translations.content.team = {}
    translations.content.team.partners = `<div class="partners">
    <div class="header">
      <strong>Partners - Institutions</strong>
    </div>
    <div>
      <p>
        <strong>EPHE</strong>
      </p>
      <p>
        The <a href="https://www.ephe.fr/en" target="_blank"> École
          Pratique des Hautes Études (EPHE)</a>, established in the Sorbonne in
        1868 and acknowledged as one of France’s ‘grands établissements’, has
        three faculties (Life and Earth sciences, History and Philology,
        Religious Studies) with ca. 260 faculty members. Already in 1955, it
        founded a chair in computational humanities, one of the first
        worldwide. Today, the EPHE is part of PSL (Paris Sciences et Lettres)
        University where it works hand-in-hand with other prestigious
        establishments. Many world-renowned scientists and scholars have
        taught at the EPHE or have worked in its laboratories, i.e. Émile
        Benveniste, Israël Lévi (who was also Chief Rabbi of France and
        participated in the inauguration of the Hebrew University of
        Jerusalem), Claude Lévi-Strauss, Sylvain Lévi, Marcel Mauss,
        Ferdinand de Saussure.
      </p>
    </div>
    <div>
      <p>
        <strong>eLijah-Lab</strong>
      </p>
      <p>
        The <a href="http://elijahlab.haifa.ac.il/index.php/en/"
          target="_blank"> eLijah-Lab at the University of Haifa</a> is a
        crowdsourcing lab for engaging the public with the research conducted
        by the department of Jewish History at the University of Haifa. The
        Lab is actively developing a variety of tools that engage the general
        public to participate in the study and research efforts, conducted by
        the department, in the fields of Judaism and Israeli culture and
        history
      </p>
    </div>
    <div>
      <p>
        <strong>The National Library of Israel</strong>
      </p>
      <p>
        Founded in Jerusalem in 1892, the <a
          href="http://web.nli.org.il/sites/nlis/en">National Library of
          Israel</a> (NLI) serves as the collective memory of the Jewish people
        worldwide and Israelis of all backgrounds and faiths. While
        continuing to serve as Israel's pre-eminent research library, NLI has
        recently embarked upon an ambitious journey of renewal to encourage
        diverse audiences in Israel and around the globe to engage with its
        treasures in new and meaningful ways. This is taking place through a
        range of innovative educational, cultural and digital initiatives, as
        well as through the construction of a new landmark complex designed
        by Herzog and de Meuron. The new NLI campus, currently under
        construction adjacent to the Knesset (Israeli Parliament) in
        Jerusalem, is scheduled to be completed in 2021.
      </p>
    </div>
    <div>
      <p>
        <strong>PSL-Université</strong>
      </p>
      <p>
        The French government has asked institutions of higher education in
        France to regroup in COMUes (university clusters). Created in 2011, <a
          href="https://www.psl.eu/en" target="_blank"> PSL</a> encompasses a
        rich array of prestigious schools and institutions covering the arts,
        sciences, engineering, the humanities and social science. Among these
        institutions are the EPHE, the ENS, Mines ParisTech and
        Paris-Dauphine. The Collège de France and the EHESS are associated
        members. With 4,500 researchers and 17,000 students, ranked 41st on
        the TLS ranking in 2018, PSL’s strengths are comparable to those of
        the world’s top universities with innovative curricula (among which
        is the master in digital and computational humanities), creating
        startups (40 on average per year). As part of its federative
        initiatives, PSL has launched the Scripta-PSL project.
      </p>
    </div>
    <div>
      <p>
        <strong>Scripta-PSL</strong>
      </p>
      <p>
        <a href="https://scripta.psl.eu/en/" target="_blank">
          Scripta-PSL</a> is a project federating around 100 researchers at PSL
        University that work on inscribed objects from all cultures, periods
        and types, i.e from cuneiform tablets and hieroglyphic Temple
        inscriptions, to Medieval manuscripts. It is directed by Andreas
        Stauder. In its digital component, we are constructing eScriptorium,
        an open source infrastructure combining digital tools for deep visual
        and textual annotation with computational means for automatic
        transcription (HTR) and computer palaeography as well as natural
        language processing (NLP).
      </p>
    </div>
    <p>
      <strong>CHArt</strong>
    </p>
    The laboratory for Human and Artificial Cognition (EA 4004), founded in
    2007, groups around 100 researchers from from the EPHE and the
    Universities of Paris 8, 10 and 12 working with experimental and
    informatic means on natural and artificial cognition. Daniel Stökl Ben
    Ezra is an associated member of <a
      href="http://www.cognition-usages.org/chart2/" target="_blank">
      CHArt</a>.
      </div>
  `
    translations.content.team.team = `<div class="team">
    <div class="header">
      <strong>Team</strong>
      <div>
        <strong>(Alphabetical order)</strong>
      </div>
    </div>
  
    <div class="members">
      <div class="member">Dror Elovits is the Technology Manager at the eLijah-Lab, University of Haifa.</div>
      <div class="member">Kaan Eraslan is a Ph.D. candidate in Demotic
        and Digital Humanities at the EPHE, PSL.</div>
      <div class="member">Pawel Jablonski  is an M.A. student in Jewish Studies at the EPHE, PSL.</div>	
      <div class="member">Ben Kiessling is Artificial Intelligence and
        Computer Vision Engineer at PSL and a Ph.D. student at the EPHE and
        Leipzig University.</div>
      <div class="member">Prof. Tsvi Kuflik is a faculty member at the Information
        Systems department and is a co-chair of the Digital Humanities B.Sc.
        program at the University of Haifa.</div>
        <div class="member">Dr. Moshe Lavee is a faculty member at the Jewish
        History department. He is the founder and head of the eLijah-Lab and
        a co-chair of the Digital Humanities B.Sc. program at the University
        of Haifa.</div>
      <div class="member">Elena Lolli is a Ph.D. student at the
        University of Bologna and EPHE</div>
      <div class="member">Dr. Avigail Ohali is a post-doctoral fellow
        at the EPHE. Her Ph.D. thesis dealt with Humor in the Mishnah and the
        Tosefta.</div>
  
      <div class="member">Dr. Vered Raziel Kretzmer is a post doctoral
        fellow at the eLijah-Lab, University of Haifa. Her Ph.D. thesis dealt
        with Palestinian liturgy from the Cairo genizah.</div>
  
      <div class="member">Uri Schor is a Ph.D. candidate at Haifa
        University. He has a B.Sc. in Computer Science and M.A. in Talmud.</div>
  
      <div class="member">Dr. Tsafra Siew is the Hebrew Manuscripts project
        manager at the National Library of Israel</div>
  
      <div class="member">Lily Signoret is an M.A. student at the
        University of Strasbourg.</div>
  
      <div class="member">Prof. Daniel Stoekl Ben Ezra is a research
        professor for Ancient Hebrew and Aramaic in the Faculty for History
        and Philology at the EPHE, PSL and director of the digital part of Scripta-PSL 
        constructing eScriptorium .</div>
  
      <div class="member">Prof. Peter Stokes is a research professor
        for digital and computational humanities applied to ancient writing
        and director of the digital humanities programme at the EPHE, PSL.</div>
  
      <div class="member">Dr. Alan J. Wecker is chief developer in the
        Tikkoun Sofrim project. Alan has a Ph.D. in Information Systems.</div>
  
    </div>
  </div>`
    translations.content.team.thanks = `<div class="thanks">
    <div class="header">
      <strong>Special Thanks</strong>
    </div>
    <div>
      <p>We would like to thank Prof. Marc Bui, Dr. Shimon
        Fogel, Prof. Hayim Lapin, Prof. Elena Pierazzo,  and Anna Scius-Bertrand, Einat Tamir and Robin Tissot for their
        contributions.</p>
      <p>Special thanks to the scholars who donated Manuscript
        transcriptions used for the initial training of Kraken: Prof. Hananel
        Mack, Dr. Tamar Kadari, Prof. Rivka Ulmer.</p>
      <p>Additionally, thank you to the following institutions for
        providing images for this project: Bibliothèque de Genève, Biblioteca
        Apostolica Vaticana, Biblioteca Palatina in Parma. All rights of the
        manuscript images reserved to these institutions.</p>
  
    </div>
  </div>`
    // PROJECT
    translations.content.project = `<p>
    <strong>Tikkoun Sofrim</strong> is a joint French Israeli project aimed
    at making Medieval Hebrew manuscripts openly and freely available as
    texts.The project is combining automatic Handwritten Text-Recognition
    (HTR) and Crowdsourcing.
  </p>
  <p>
    In the first stage we analyse the manuscript layout and train <strong>Kraken</strong>,
    a deep learning engine for automatic reading. Kraken is transcribing
    quite well, with an error rate of less than 10% and often even less
    than 5% at the letter level.
  </p>
  <p>However this is not quite good enough.</p>
  <p>
    In order to further improve Kraken’s automatic reading and provide
    accurate editions of the texts, we need the <strong>human eye</strong>.
    The tool in this website is aimed at achieving this goal.
  </p>
  <p>At this website you can help us by checking the automatic reading
    and correcting mistakes. In the next stage your corrections will be
    used for improving the automatic reading as well as creating digital
    critical editions and enabling textual search of manuscripts in library
    viewers.</p>
  <p>Tikkoun Sofrim is a joined French-Israeli project, developed by
    the EPHE, PSL, in Paris, the eLijah-Lab at the University of Haifa and
    the National Library, Israel. The project is supported by the
    Maimonides grant funded by the French Ministry of Higher Education and
    Research, the French Ministry of Foreign Affairs and the Israeli
    Ministry of Science. eLijah-Lab is supported by Hekhal Eliyahu NGO.</p>
  <div>
    For questions, suggestions or any other remark, feel free to <a
      href="mailto:tikkoun.sofrim@gmail.com">contact us</a>
  </div>`
    // HTR
    translations.content.htr = `<div class="tabContentTitle">
    What is HTR?
    </div>
    <p>
    HTR – (automatic) Handwritten Text Recognition is a task in the field of Computer Vision 
    that deals with the process of automatically transforming document images to text so that the text can be searched and integrated into websites,
    books or articles. We use a combination of cutting edge neural machine learning techniques and 
    traditional hand-optimized methods based on filtering  and morphology.
    In the first step the layout of the manuscript is analyzed automatically in order to extract column and annotation regions. 
    In the second step these regions are segmented into line images. 
    While segmentation is currently done with with a manually constructed algorithm, 
    we are in the process of switching to a fully trainable convolutional approach.
    In the third step the computer is trained to decipher the text in the line images. 
    The basic principle is that we show the computer a great number of images of manuscript lines and their corresponding text transcriptions.
    The computer learns the principle how to get from the image to the text. Eventually, it can do this also for images it has never seen.
    Our primary transcription engine is Kraken by Benjamin Kiessling. 
    </p>
    <p>
    Tikkoun Sofrim is the second HTR project at the EPHE next to Sofer Mahir, 
    a project dealing with automatic transcription of major manuscripts of Tannaitic literature.
    At PSL, in the framework of the Scripta-PSL project, we are currently constructing the eScriptorium, 
    an open source infrastructure that will permit the automatic transcription and deep annotation of handwritten material.
     </p>
    
    <div class="tabContentTitle mt-5">
    Crowdsourcing and citizen science
    </div>
    <p>
      In recent years numerous initiatives involving the general public in
      academic research have been developed. In general, they are called
      “citizen science”. In these initiatives the general public is invited
      to help in labor intensive tasks in a variety of domains, from
      categorizing galaxies to mapping extinct animals and even in the
      humanities. Crowdsourcing initiatives are bidirectional, they are
      intended not only to expose scientific research to the general public
      in an understandable manner and to engage the public in performing
      scientific research but also to get scientists and scholars out of
      their ivory tower and to deepen the connection and collaboration
      between society and academia. Tikkoun Sofrim is the second
      crowdsourcing initiative of <a
        href="http://elijahlab.haifa.ac.il/index.php/en/" target="_blank">elijah
        lab at the University of Haifa</a> and follows its predecessor <a
        href="https://www.zooniverse.org/projects/judaicadh/scribes-of-the-cairo-geniza/"
        target="_blank">scribes of the Cairo Geniza</a>
    </p>`
    resolve(translations)
  })
}
