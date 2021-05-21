import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './Model/store'
import router from './router'

Vue.config.productionTip = false;

//Globale Variable (Zugriff über this.$http)
Vue.prototype.$http = axios;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')




/* 
Programm to server:
git clone https://github.com/MaximilianWoop/cookbook.git
docker build -t my-app:dev .
docker run -v ${PWD}:/app -v /app/node_modules -p 8082:8080 --rm my-app:dev
*/

