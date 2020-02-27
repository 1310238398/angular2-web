import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login/login.vue'
import Main from './views/main.vue';

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/main',
            name: 'main',
            component: Main,
            children: [
                { path: 'bigdata', title: '大数据', name: 'bigdata', component: () =>
                        import ('./views/bigdata/bigdata.vue') },
                { path: 'home', title: '主页', name: 'home', component: () =>
                        import ('./views/home/home.vue') },
                { path: 'quickLinker', title: '快速链接', name: 'quickLinker', component: () =>
                        import ('./views/linker/linker.vue') },
                { path: 'view', title: '视图', name: 'view', component: () =>
                        import ('./views/view/view.vue') },
            ]
        },
        /* {
             path: '/index',
             name: 'index',
             // route level code-splitting
             // this generates a separate chunk (about.[hash].js) for this route
             // which is lazy-loaded when the route is visited.
             component: () =>
                 import ( /!* webpackChunkName: "about" *!/ './views/bigdata/index.vue')
         },*/
        {
            path: '/home',
            name: 'home',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/home/home.vue')
        }
    ],

})