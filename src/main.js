import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'G-N0100G5C8J'
})
