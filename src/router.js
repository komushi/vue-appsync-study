import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import { AppSyncRouter } from '@/appsync'
import { AuthRouter, AuthFilter } from '@/amplify'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    AppSyncRouter,
    AuthRouter
  ]
})

router.beforeEach(AuthFilter);

export default router
