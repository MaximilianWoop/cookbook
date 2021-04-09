import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './Model/store'
import router from './router'

import '@/assets/css/mainViewCss.scss'
import '@/assets/css/cookbook.scss'
import '@/assets/css/button.scss'
import '@/assets/css/font.scss'
import '@/assets/css/signIn.scss'
import '@/assets/css/navigation.scss'
import '@/assets/css/color.scss'
import '@/assets/css/addRecipe.scss'

Vue.config.productionTip = false
Vue.config.debug = false;
Vue.config.silent = true;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
