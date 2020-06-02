import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueLodash from 'vue-lodash'
import shuffle from 'lodash/shuffle'
import store from './store'

Vue.use(VueLodash, {lodash: { shuffle } })

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
