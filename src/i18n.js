import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}

  locales.keys().forEach(key => {
    const lang = key.match(/([a-z0-9]+)\//i)
    const file = key.match(/([a-z0-9]+)\./i)
    if (lang && lang.length > 1 && file && file.length > 1) {
      const locale = lang[1]
      const mod = file[1]
      if (messages[locale] === undefined) {
        messages[locale] = {}
      }
      messages[locale][mod] = locales(key)
    }
  })
  return messages
}

console.log(loadLocaleMessages())

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
