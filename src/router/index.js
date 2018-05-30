import Vue from 'vue'
import Router from 'vue-router'
import { AppSyncExample, HelloWorld } from '@/components'

// import { AuthRouter, AuthFilter } from '../amplify'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/appsync',
      name: 'AppSyncExample',
      component: AppSyncExample
    },
    // AuthRouter
  ]
})

// router.beforeEach(AuthFilter);

export default router
