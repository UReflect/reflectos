import Vue from 'vue'
import Router from 'vue-router'
import Loading from './views/Loading'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'loading',
      component: Loading
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import('./views/Setup')
    },
    {
      path: '/home',
      name: 'dash',
      component: () => import('./views/dashboard')
    },
    {
      path: '/profiles',
      name: 'profiles',
      component: () => import('./views/user/Profiles')
    },
    {
      path: '/profiles/lock',
      name: 'lock',
      component: () => import('./views/user/Lock')
    },
    {
      path: '*',
      redirect: {
        name: 'loading'
      }
    }
  ]
})
