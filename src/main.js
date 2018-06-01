import Vue from 'vue'
import App from './App.vue'
import { AppSyncProvider } from '@/appsync'
import router from './router'

Vue.config.productionTip = false

new Vue({
	router: router,
	provide: AppSyncProvider.provide(),
	render: h => h(App)
}).$mount('#app')

