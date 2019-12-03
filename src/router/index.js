import Vue from 'vue'
import Router from 'vue-router'

Vue.component('home',()=>import('../views/home/home.vue'));

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/console',
      name: 'base',
      component: () => import(/* webpackChunkName: "base" */ '../Base.vue')
    },
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
    }
  ]
})
