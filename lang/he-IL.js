export default () => {
  return new Promise(function(resolve) {
    const translations = {
      dir: 'rtl',
      'main.site_name': 'תיקון סופרים',
      'banner.encourgement.line_1': 'עזרו לנו להנגיש את כתבי יד עבריים!',
      'banner.encourgement.line_2': 'בואו להתנסות בקריאתם ופענוחם!',
      'nav.about': 'אודות',
      'nav.project': 'אודות הפרויקט',
      'nav.htr': 'HTR',
      'maintenance':'מערכת תיקון סופרים יצאה להפסקת תחזוקה קלה, תשוב בשעה 14:00',
      'lines_made':'שורות שתועתקו',
      'nav.midrash': 'מדרש תנחומא',
      'nav.team': 'מי אנחנו',
      'nav.logout': 'יציאה',
      'nav.conversation': 'שיחה',
      'nav.start': 'צאו לדרך!',
      'nav.profile': 'פרופיל',
      'profile.general':'כללי',
      'profile.stats':'סטטיסטיקה',
      'conversation.by':'על ידי',
      'conversation.reply':'השב',
      'conversation.comments':'תגובות',
      'conversation.new':'+ הודעה חדשה',
      anonymous: 'אורח/ת',
      loading: 'טוען...',
      manuscripts:'כתב יד',
      'lang.en': 'English',
      'lang.he': 'עברית',
      'lang.fr': 'Français',
      'wrong_creds':'פרטי גישה שגויים',
      'version_text':'זוהי גרסא חדשה של תיקון סופרים - לטיפול בבעיות ניתן לפנות במייל',
      'support':'תמיכה',
      'reset_password':'אפס סיסמא',
      'login.center.welcome': 'ברוכים הבאים לתיקון סופרים',
      'login.center.Intro_line_1':
        'תיקון סופרים מפתח תעתוק אוטומטי של כתבי יד עבריים.',
      'login.center.Intro_line_2':
        'עזרו לנו לאמן את המחשב על ידי תיקון הקריאה האוטומטית.',
      'login.login_area.username': 'שם משתמש',
      'login.login_area.password': 'סיסמא',
      'Login.login_area.login': 'כניסה',
      'login.login_area.register': 'הרשמה',
      'login.login_area.geust': 'הכנס כאורח/ת',
      'login.login_area.invalid': 'פרטי גישה שגויים',
      'main.data_area.page': 'עמוד',
      'main.data_area.alphabet': 'א-ב',
      'main.data_area.issues': 'תווים מיוחדים',
      'main.data_area.editing': 'סימני עריכה',
      'main.data_area.help': 'עזרה',
      'main.data_area.conversation': 'הערות',
      'main.work_area.video': 'https://www.youtube.com/watch?v=Gwb751U6MVk',
      'main.work_area.video_hover': 'סרטון הדרכה',
      'main.work_area.video_text': 'סרטון הדרכה',
      'main.work_area.intro_line_1':
        'לפניכם התעתוק האוטומטי, אנא בדקו ותקנו אותו בתיבת הטקסט.',
      'main.work_area.intro_line_2':
        'אנא תקנו אותיות שגויות, חסרות או מיותרות, וכן רווחים מיותרים או חסרים.',
      'main.work_area.button_1': '(-)',
      'main.work_area.button_2': '[+]',
      'main.work_area.button_3': '</>',
      'main.work_area.button_4': '{?}',
      'main.work_area.button_5': '↺',
      'main.work_area.over_ligature': 'ﭏ',
      'main.work_area.over_upper': '˙',
      'main.work_area.finish_line_1':
        "לאחר שתיקנתם את כל השגיאות, או אם לא מצאתם שגיאות כלל, לחצו 'סיימתי'.",
      'main.work_area.finish_line_2':
        "אם אתם מעדיפים לדלג על השורה הזו מבלי לתקן אותה, לחצו 'דלג'.",
      'main.work_area.finish_button_1': 'סיימתי',
      'main.work_area.finish_button_2': 'דלג',
      'main.work_area.hovers.over_reset':
        'החזר את שורת התעתוק האוטומטי המקורית',
      'main.work_area.hovers.over_additions':
        'סמנו כתוספת. להדרכה ראו את לשונית סימני העריכה בצד שמאל.',
      'main.work_area.hovers.over_deletions':
        'סמנו כמחיקה. להדרכה ראו את לשונית סימני העריכה בצד שמאל.',
      'main.work_area.hovers.over_uncertain':
        'סמנו במקרה של ספק. להדרכה ראו את לשונית סימני העריכה בצד שמאל.',
      'main.work_area.hovers.over_damaged':
        'סמנו טקסט פגום. להדרכה ראו את לשונית סימני העריכה בצד שמאל.',
      'main.work_area.hovers.over_ligature':
        'סמנו אותיות א-ל מצורפות. להדרכה ראו את לשונית סימני העריכה בצד שמאל.',
      'main.work_area.hovers.over_upper':
        'סמנו נקודה עילית בסוף משפט. להדרכה ראו את לשונית סימני העריכה בצד שמאל.',
      'main.work_area.hovers.over_line_fillers':
        'סמנו סימני מילוי שורה. להדרכה ראו את לשונית סימני העריכה בצד שמאל.',
      'main.work_area.hovers.over_alef_plus': 'הגדל את הפונט של שורת התעתיק',
      'main.work_area.hovers.over_alef_minus': 'הקטן את הפונט של שורת התעתיק',
      'register_screen.title': 'הרשמה',
      'register_screen.subtitle': 'כבר רשומים?',
      'register_screen.userid': 'שם משתמש',
      'register_screen.email': 'דוא"ל',
      'register_screen.password': 'סיסמא',
      'register_screen.confirm': 'אימות סיסמא',
      'register_screen.require': 'דרוש',
      'register_screen.demographics': 'Demographics (Optional)',
      'register_screen.DoB': 'תאריך לידה',
      'register_screen.hebrew': 'רמת ידע עברית',
      'register_screen.none_hebrew': 'אינני דובר/ת כלל',
      'register_screen.knowledgable_hebrew': 'דובר/ת עברית רהוטה',
      'register_screen.midrash': 'ידע במדרש',
      'register_screen.none_midrash': 'ללא היכרות מוקדמת',
      'register_screen.knowledgable_midrash': 'בקיאות רבה',
      'register_screen.invalid':
        'User name already exists in the system. Please try another one',
      'register_screen.contact': 'אישור יצירת קשר באימייל',
      'register_screen.show_extra_details':'פרטים נוספים (רשות)'
    }

    translations.content = {}
    // TEAM
    translations.content.team = {}
    translations.content.team.partners = `<div class="partners">
    <div class="tabContentTitle">שותפים - מוסדות</div>
    <div>
      <p>
        <strong>מעבדת אליהו (eLijah-Lab)</strong>
      </p>
  
      <p>
        <a href="http://elijahlab.haifa.ac.il/index.php/he/" target="_blank">מעבדת
          אליהו</a> היא מעבדה למיזמי שיתוף הציבור במחקרים בחוג לתולדות ישראל
        באוניברסיטת חיפה. המעבדה מפתחת מגוון כלים המזמינים את הציבור הרחב
        לקחת חלק במאמץ הלימודי והמחקרי בתחומי חקר היהדות, התרבות וההיסטוריה
        הישראלית.
      </p>
    </div>
    <div>
      <p>
        <strong>EPHE</strong>
      </p>
      <p>
        המכון ללימודים מתקדמים (<a href="https://www.ephe.fr/en"
          target="_blank">EPHE</a>), נוסד בסורבון ב-1868 ונחשב לאחד מהמוסדות
        החשובים של צרפת. יש בו שלוש פקולטאות (מדעי החיים והארץ, היסטוריה
        ופילולוגיה, מדע הדתות) עם בסך הכל כ-260 קתדראות. כבר ב-1955 נוסדה בו
        קתדרא למדעי הרוח הממוחשבים, מחלוצי התחום בעולם. היום ה-EPHE חבר
        באוניברסיטת PSL יחד עם מספר מוסדות יוקרתיים אחרים. בין החוקרים
        המפורסמים ביותר בתולדות ה-EPHE ישנם: אמיל בנבניסט, ישראל לוי (שגם
        כיהן בתור רב ראשי של צרפת ולקח חלק בחנוכת האוניברסיטה העברית) ,קלוד
        לוי-שטראוס, מרסל מוס, ופרדיננד דה סוסיר.
      </p>
    </div>
    
    <div>
      <p>
        <strong>הספרייה הלאומית</strong>
      </p>
      <p>הספרייה הלאומית שנוסדה בירושלים בשנת 1892 היא מרכז תרבותי-לאומי
        מעורר השראה של אוצרות התרבות, המורשת וההיסטוריה של העם היהודי
        לדורותיו והחברה הישראלית על רבדיה השונים. בשנים האחרונות נמצאת
        הספרייה בתהליך התחדשות, הכולל התרחבות, התפתחות והפיכתה לספרייה עדכנית
        של המאה ה-21. הספרייה בונה בהתמדה אוספים פיזיים ודיגיטליים של התרבות
        היהודית והישראלית, מספקת שירותים לציבור הרחב ולחוקרים בארץ ובעולם
        וממלאת תפקיד מרכזי, פעיל ורלוונטי בחיי הרוח והתרבות של המדינה על כל
        אזרחיה ושל העם היהודי כולו. משאבים רבים מושקעים בהנגשת אוצרות הספרייה
        לקהל הרחב ובכך לאפשר גישה פתוחה – בכל עת, בכל מקום ולכל המשתמשים –
        לתכנים שלא היו נגישים בעבר, ביניהם מיזם "כתיב", המשותף לספרייה הלאומית
        ולאגודת FJMS של אלברט ד' וננסי פרידברג. מיזם זה נועד להפוך את אוסף
        תצלומי כתבי היד העבריים לנגישים לכל אדם מכל מקום בעולם, ואשר אליו
        יתממשק פרוייקט תיקון סופרים. כחלק מתהליך ההתחדשות והנגשת האוצרות
        מתוכנן לספרייה הלאומית מבנה חדש, במרחק צעדים אחדים מן הכנסת. המשכן
        החדש אמור לעמוד על כנו בשנת 2021, והמעבר אליו יאפשר לספרייה לממש את
        ייעודה.</p>
    </div>
  
    
    <div>
      <p>
        <strong>אוניברסיטת PSL</strong>
      </p>
  
      <p>
        ממשלת צרפת מארגנת מוסדות השכלה גבוהה בתאגידים. ה-EPHE הוא חבר ב <a
          href="https://www.psl.eu/en" target="_blank">PSL</a> שנוסד ב-2011 עם
        מספר מוסדות יוקרתיים אחרים כגון ה-ENS, Mines ParisTech,
        ו-Paris-Dauphine. הקולג' דה פראנס והמכון ללימודים מתקדמים בסוציולוגיה
        (EHESS) קשורים אף הם ל-PSL. ל-PSL יש כ-4500 חוקרים וכ-17000 תלמידים.
        בדירוג האחרון של ה-TLS אוניברסיטת PSL דורגה במקום ה-41. אנשי PSL
        יוזמים כ-40 סטארט-אפים בכל שנה. בין מסלולי המחקר יש מאסטר במדעי הרוח
        הדיגיטליים. אחד מיוזמות PSL הוא הפרויקט Scripta-PSL.
      </p>
  
    </div>
    <div>
      <p>
        <strong>Scripta-PSL</strong>
      </p>
      <p>
        הפרויקט <a href="https://scripta.psl.eu/en/" target="_blank">Scripta-PSL</a>
        בהנהלתו של אנדריאס שטאודר באוניברסיטת PSL מאגד כמאה חוקרים שעובדים על
        ממצאים כתובים (לוחות, כתובות, כתבי יד) ממגוון גדול של תרבויות. המערכת
        החכמה eScriptorium הנבנית במסגרת הפרויקט מכילה כלים דיגיטליים להעשרת
        תמונות וטקסטים, אמצעי בינה מלאכותית לקריאה אוטומטית של כתבי היד
        (HTR), ניתוח כתב ועיצוב הדף, לצד כלי עיבוד של שפה טבעית (NLP).
      </p>
    </div>
    <p>
      <strong>CHArt</strong>
    </p>
  
    <p>
      מעבדת <a href="http://www.cognition-usages.org/chart2/"
        target="_blank">CHArt</a> לחקר קוגניציה אנושית ומלאכותית נוסדה ב-2007
      ומאגדת כ-100 חוקרים מה-EPHE ומאוניברסיטאות פאריס 8, 10 ו-12 שחוקרים
      קוגניציה טבעית ומלאכותית באמצעיים ניסויים וממוחשבים.
    </p>
  </div>
  `
    translations.content.team.team = `<div class="team">
    <h3 class="header">
      <strong>צוות</strong>
      </h3>
      <h4>
      <strong>(על פי סדר הא-ב)</strong>
      </h4>
        
      
    </div>
  
    <div class="members">
    
      <div class="member">ד"ר אביגיל אהלי - פוסט-דוקטורנטית ב EPHE SPL, עוסקת בתלמוד.</div>
      
      <div class="member">דרור אלוביץ - מנהל תחום טכנולוגיה במעבדת אליהו, אוניברסיטת חיפה.</div>
      
      <div class="member">קאן ארסלן  - דוקטורנט ב EPHE,  בלימודים דמוטיים ובמדעי הרוח הדיגיטליים.</div>
      
      <div class="member">ד"ר אלן ווקר – פוסט-דוקטורנט באוניברסיטת חיפה. ד"ר למערכות מידע.</div>
      
      <div class="member">ד"ר צפרה זיו - מנהלת פרויקט כתבי היד העבריים בספריה הלאומית.</div>
      
      <div class="member">ד"ר משה לביא – מרצה לתלמוד ומדרש בחוג לתולדות ישראל, מקים וראש מעבדת אליהו 
      וראש שותף של התוכנית למדעי הרוח הדיגיטליים באוניברסיטת חיפה.</div>
  
      <div class="member">אלנה לולי - דוקטורנטית באוניברסיטת בולוניה וב-EPHE</div>
            
  
      <div class="member">לילי סיניורה – תלמידת מ.א באוניברסיטת שטרסבורג.</div>
  
      <div class="member">פרופ' פיטר סטוקס - פרופסור למדעי הרוח הדיגיטליים ומומחה לכתבי יד 
      עתיקים והמנהל של התוכנית למדעי הרוח הדיגיטיים, EPHE, PSL.</div>
  
      <div class="member">פרופ' צבי קופליק – פרופסור בחוג למערכות מידע וראש שותף של התוכנית 
      למדעי הרוח הדיגיטליים באוניברסיטת חיפה.</div>
  
      <div class="member">בן קיסלינג – מהנדס בינה מלאכותית וראייה ממוחשבת ב PSL 
      ודוקטורנט ב EPHE ובאוניברסיטת לייפציג.</div>
  
      <div class="member">ד"ר ורד רזיאל קרצ'מר –  פוסט-דוקטורנטית במעבדת אליהו באוניברסיטת חיפה, 
      עוסקת בליטורגיה ומדרש מגניזת קהיר.</div>
  
      <div class="member">פרופ' דניאל שטקל  בן עזרא-  מרצה לעברית וארמית בפקולטה להיסטוריה 
      ופילולוגיה ב EPHE, PSL, מקים התוכנית למדעי הרוח הדיגיטיים והמנהל לחלק הדיגיטלי של הפרויקט Scripat-PSL.</div>
      
      <div class="member">אורי שור – דוקטורנט באוניברסיטת חיפה. בעל תואר ראשון במדעי המחשב 
      ותואר שני בתלמוד.</div>
  
  
    </div>`
    translations.content.team.thanks = `<div class="thanks">
    <div class="tabContentTitle">
      תודות
    </div>
    <div>
      <p>תודתנו שלוחה לרובין טיסו, פרופ' מארק בואי, פרופ' חיים לפין, ד"ר שמעון פוגל, פרופ' אלנה פיירצו, 
      עינת טמיר, פאבל יבלונסקי ואנה סיו-ברטרן על תרומתם לפרויקט.</p>
      
      
      <p>תודה מיוחדת לחוקרים הבאים שתרמו העתקות כתבי יד לשם האימון הראשוני 
      של קראקן: פרופ' חננאל מאק, דר' תמר קדרי, פרופ' רבקה אולמר.</p>
      
      <p>תודה גם למוסדות ולספריות שאיפשרו לנו גישה לסריקות כתבי היד:
      ספריית אוניברסיטת ז'נבה, ספריית הוטיקן, ספרית הפלטינה, פארמה.
      כל הזכויות על סריקות כתבי היד שמורות למוסדות אלו.</p>
  
    </div>
  </div>`
    // PROJECT
    translations.content.project = `<div class="tabContentTitle">תיקון סופרים</div>

    <p>'תיקון סופרים' הוא פרויקט ישראלי-צרפתי משותף לשם הנגשת כתבי יד
      עבריים. הפרויקט מבוסס על שילוב בין טכנולוגיית למידה עמוקה המאפשרת קריאה
      אוטומטית של כתבי יד (HTR) ושיתוף הציבור בקריאת כתבי יד עבריים מימי
      הביניים.</p>
    <p>
      בשלב הראשון של הפרויקט בוצעה קריאה ממוחשבת אוטומטית של כתבי יד באמצעות
      כלי שפיתחנו ונקרא <strong>קראקן</strong>. קראקן קורא לא רע. הוא מצליח
      לקרוא לפחות 90 אחוז מן האותיות, ולפעמים אפילו למעלה מ 95 אחוז מהן!
    </p>
    <p>אבל זה עדיין לא מספיק.</p>
    <p>כדי לשפר את יכולת הקריאה של קראקן, וכדי להעמיד מהדורות טובות של
      הטקסטים אנחנו עדיין צריכים את העין האנושית. האתר הזה נועד לשם כך.</p>
    
    <p>כאן אתם יכולים לבדוק את הקריאה של המחשב ולתקן אותה. בשלב הבא
      ישמשו התיקונים שלכם הן לשיפור היכולות של קראקן והן להעמדת מהדורות
      דיגיטליות וצפיינים בספריות שיאפשרו חיפוש מילולי בכתבי היד.</p>
    
    <p>תיקון סופרים הוא מיזם ישראלי-צרפתי משותף, בפיתוח מעבדת אליהו
      באוניברסיטת חיפה ו EPHE PARIS. הפרויקט נתמך על ידי קרן מיימונידס
      המשותפת למשרד המדע הישראלי ומשרדי ההשכלה הגבוהה והחוץ הצרפתיים. מעבדת
      אליהו נתמכת על ידי עמותת היכל אליהו.</p>
    <div>
      לשאלות, הצעות או הערות, הרגישו חופשי <a
        href="mailto:tikkoun.sofrim@gmail.com">ליצור עמנו קשר</a>
    </div>`
    // HTR
    translations.content.htr = `<div class="tabContentTitle">
    אודות HTR
  </div>
  <p>HTR – זיהוי ממוחשב של כתבי יד ( HTR – Handwritten Text Recognition) הוא טכנולוגיה העוסקת בפענוח אוטומטי של מסמכים הכתובים בכתב יד, ומאפשרת הפיכת תמונות לקבצי טקסט דיגיטליים כדי לאפשר חיפוש בהם, או את הטמעתם באתר אינטרנט, מאמר או ספר. HTR הוא תחום משנה של ראייה מוחשבת (Computer Vision).
  </p>
  
  <p>
  בפרויקט 'תיקון סופרים' אנו משתמשים בשילוב של למידה עמוקה (Deep Learning) ורשתות נוירונים מלאכותיות (biLSTM, CNN), יחד עם שיטות קלאסיות כגון מגוון סוגי טרנספורמציה מורפולוגית, השלכה (projection) וסינון (filtering). 
  </p>
  
  <p>
  אנו משתמשים במערכת קראקן שפותחה על ידי בנימין קיסלינג.
  </p>
  
  <p>
  השלב הראשון בתהליך הוא ניתוח הדף: המחשב מנתח את עיצוב הדף, מזהה את האזור הכתוב, ומפריד אותו מאזורים אחרים בדף (הערות, שרטוטים וכדומה).
  </p>
  
  <p>
  השלב השני הוא סגמנטציה, בה מחלקים את האזורים הכתובים לשורות. כרגע אנו משתמשים בשיטות קלאסיות למשימה זו אך אנו באמצע מעבר לשימוש ברשתות נוירונים. 
  </p>
  
  <p>
  בשלב השלישי מאמנים את קראקן לפענח את הכתב בתמונות של שורות. לשם כך מציגים למחשב תמונות רבות מאוד של שורות מכתב היד, לצד התעתיק שלהן. קראקן מוצא בעצמו את הנוסחא המתמטית המובילה מהנתונים הויזואלים (תמונת שורה) לטקסט. כך, מפתח קראקן את היכולת לפענח גם את הטקסט של שורות בכתב היד שאת תעתיקם לא הראינו לו. 
  </p>
  
  <p>
  תיקון סופרים הוא פרויקט שני בתעתיק אוטומטי ב-EPHE. הראשון, סופר מהיר, עוסק בכתבי יד של החיבורים הראשיים של הספרות התנאית. במסגרת הפרויקט SCRIPTA-PSL ב-PSL בפאריס, אנו בונים כרגע מערכת בשם eScriptorium אשר תאפשר העתקה אוטמטית של כתבי יד והעשרתן העמוקה בהערות מכל סוג, באמצעות הוספת שכבות מטא-דאטה.
  </p>
  
  
  <div class="tabContentTitle mt-5">
    שיתוף המונים ומדע אזרחי
  </div>
  <p>
    בשנים האחרונות מפותחים מגוון מיזמים של שיתוף הציבור במאמץ המחקרי, או כפי שהם נקראים בנוסף 'מדע אזרחי' (citizen science). במסגרת מיזמי מדע אזרחי מוזמן הציבור הרחב לסייע במשימות עתירות עבודה במגוון תחומים, מסיווג גלקסיות ועד מיפוי בעלי חיים נכחדים, ואף בתחומי מדעי הרוח.
  <p/>
  
  <p>
  מיזמי שיתוף המונים הם דו כיווניים, הם נועדו לא רק לשתף את הציבור הרחב בפעילות המדעית ולגייס את עזרתו לטובת המאמץ המחקרי, אלא גם להוציא את האקדמיה ממגדל השן, לחשוף את הציבור למחקרים ולגופי ידע, ולהעמיק את הקשר ושיתוף הפעולה בין האקדמיה לבין החברה.
  <p/>
  <p>
  פרוייקט תיקון סופרים הוא מיזם שיתוף ההמונים השני של <a
      href="http://elijahlab.haifa.ac.il/index.php/en/" target="_blank">מעבדת אליהו באוניברסיטת חיפה</a> והוא מצטרף לאחיו הבכור <a
      href="https://www.zooniverse.org/projects/judaicadh/scribes-of-the-cairo-geniza/"
      target="_blank">סופרי הגניזה הקהירית</a>
  </p>`

    resolve(translations)
  })
}
