import Vue from 'vue'
import App from './App.vue'
import { appSyncProvider } from './vue-appsync'

Vue.config.productionTip = false

new Vue({
	provide: appSyncProvider.provide(),
  render: h => h(App)
}).$mount('#app')
