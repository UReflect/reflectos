import '@babel/polyfill'
import Vue from 'vue'
import '@/plugins/vuetify'
import '@/services'
import '@/components'
import Reflectos from '@/Reflectos.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(Reflectos)
}).$mount('#reflectos')
