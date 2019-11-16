import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "index" */ './views/Index.vue')
    },
    {
      path: '/demo01',
      name: 'demo01',
      component: () => import( /* webpackChunkName: "about" */ './views/demo01.vue')
    },
    {
      path: '/demo02',
      name: 'demo02',
      component: () => import( /* webpackChunkName: "about" */ './views/demo02.vue')
    },
    {
      path: '/demo03',
      name: 'demo03',
      component: () => import( /* webpackChunkName: "about" */ './views/demo03.vue')
    },
    {
      path: '/demo04',
      name: 'demo04',
      component: () => import( /* webpackChunkName: "about" */ './views/demo04.vue')
    },
    {
      path: '/demo05',
      name: 'demo05',
      component: () => import( /* webpackChunkName: "about" */ './views/demo05.vue')
    },
    {
      path: '/demo06',
      name: 'demo06',
      component: () => import( /* webpackChunkName: "about" */ './views/demo06.vue')
    },
  ]
})
