import { createI18n } from 'vue-i18n'

import en_US from './locales/en_US.json'
import zh_CN from './locales/zh_CN.json'
export default createI18n({
  legacy: false,
  locale: 'en_US',
  fallbackLocale: 'en_US',
  messages: {
    en_US: en_US,
    zh_CN: zh_CN
  }
})
