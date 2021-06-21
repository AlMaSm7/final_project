import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import UUID from "vue-uuid";
import AsyncComputed from 'vue-async-computed'
import Vuex from 'vuex'


Vue.use(Vuex)

Vue.use(AsyncComputed)


Vue.use(UUID);

Vue.use(VueCookies)

Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
