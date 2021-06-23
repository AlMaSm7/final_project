import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import UUID from "vue-uuid";
import AsyncComputed from 'vue-async-computed'
import Vuex from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faThumbsUp)

Vue.component('font-awesome-icon', FontAwesomeIcon)

library
FontAwesomeIcon

//Vue.component(FontAwesomeIcon)


Vue.use(Vuex)

Vue.use(AsyncComputed)


Vue.use(UUID);

Vue.use(VueCookies)

Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
