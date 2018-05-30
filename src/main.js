import Vue from 'vue'
import App from './App.vue'
import { appSyncProvider } from './vue-appsync'
import router from './router'

Vue.config.productionTip = false

new Vue({
	router: router,
	provide: appSyncProvider.provide(),
  	render: h => h(App)
}).$mount('#app')
