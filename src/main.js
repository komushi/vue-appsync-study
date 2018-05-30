import Vue from 'vue'
import App from './App.vue'
// import { appSyncProvider } from './vue-appsync'
import router from './router'

import Amplify, { Auth, Logger } from 'aws-amplify'
import aws_exports from './aws-exports'

Amplify.configure(aws_exports)


Vue.config.productionTip = false

// new Vue({
// 	router: router,
// 	// provide: appSyncProvider.provide(),
//   	render: h => h(App)
// }).$mount('#app')

new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
