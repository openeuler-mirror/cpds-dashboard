import { createI18n } from 'vue-i18n'

import CN from '/@/i18n/lang/zh-cn'
import EN from '/@/i18n/lang/en'
import TW from '/@/i18n/lang/zh-tw'

const messages = {
  zh: {
    ...CN
  },
  en: {
    ...EN
  },
  tw: {
    ...TW
  }
}

// set language following the browser
const getDefaultLang = () => {
  if (navigator.language == 'en') {
    return 'en'
  } else if (navigator.language == 'zh-CN') {
    return 'zh'
  } else if (navigator.language == 'zh-TW') {
    return 'tw'
  } else {
    return 'en'
  }
}

// create and export I18n
export const i18n = createI18n({
  legacy: false,
  silentTranslationWarn: true,
  missingWarn: false,
  silentFallbackWarn: true,
  fallbackWarn: false,
  locale: getDefaultLang(),
  fallbackLocale: 'en',
  messages: messages
})
