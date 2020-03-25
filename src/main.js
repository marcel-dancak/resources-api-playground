import Vue from 'vue'
import App from './App.vue'
import service, { resourceData } from '@/service'

Vue.config.productionTip = false

Vue.prototype.$service = service
Vue.prototype.$resource = resourceData

new Vue({
  render: h => h(App),
}).$mount('#app')
