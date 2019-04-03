export default () => {
  return new Promise(function(resolve) {
    const translations = {
      'dir':'rtl',
      'main.site_name': 'תיקון סופרים',
      'banner.encourgement.line_1': 'עזרו לנו להנגיש את כתבי יד עבריים!',
      'banner.encourgement.line_2': 'בואו להתנסות בקריאתם ופענוחם!',
      'nav.about': 'אודות',
      'nav.project': 'אודות הפרויקט',
      'nav.htr': 'HTR',
      'nav.midrash': 'מדרש תנחומא',
      'nav.team': 'מי אנחנו',
      'nav.logout': 'יציאה',
      'nav.conversation': 'שיחה',
      'nav.start': 'צאו לדרך!',
      'lang.en': 'אנגלית',
      'lang.he': 'עברית',
      'lang.fr': 'צרפתית',
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
      'register_screen.Hebrew': 'רמת ידע עברית',
      'register_screen.none_Hebrew': 'אינני דובר/ת עברית כלל',
      'register_screen.knowledgable_Hebrew': 'דובר/ת עברית רהוטה',
      'register_screen.Midrash': 'ידע במדרש',
      'register_screen.none_Midrash': 'ללא היכרות מוקדמת',
      'register_screen.knowledgable_Midrash': 'בקיאות רבע במדרש',
      'register_screen.invalid':
        'User name already exists in the system. Please try another one',
      'register_screen.contact': 'אישור יצירת קשר באימייל'
    }

    resolve(translations)
  })
}
