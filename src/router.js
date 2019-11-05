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
      path: '/unit1',
      name: 'unit1',
      component: () => import( /* webpackChunkName: "about" */ './views/unit1.vue')
    },
    
  ]
})
