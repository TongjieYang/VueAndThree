import Vue from 'vue'

import Router from 'vue-router'

import pages from '@/views/pages' // 页面文件目录


Vue.use(Router)


let routes = [];

Object.keys(pages).forEach(item => {

    routes.push({

        path: `/${pages[item].name}`,

        name: pages[item].name,

        component: pages[item]

    })

})
console.log('打印路由',routes);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...routes,

        {

            path: '*',

            redirect: '/Index'

        }
    ]
})