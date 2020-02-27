import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import index from './index/index.vue';
import VueResource from 'vue-resource'
import rule from './rule/rule.vue'
import identity from './identity/identity.vue'
import create from './create/create.vue'
import success from './success/success.vue'
import join from './join/join.vue'
import mdetail from './mdetail/mdetail.vue'
import destory from './destory/destory.vue'
import detail from './detail/detail.vue'
import error from './error.vue'
Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [{
    path: '/error',
    component: error
}, {
    path: '/index',
    component: index
}, {
    path: '/rule',
    component: rule
}, {
    path: '/iden',
    component: identity
}, {
    path: '/create',
    component: create
}, {
    path: '/success',
    component: success
}, {
    path: '/join',
    component: join
}, {
    path: '/mdetail',
    component: mdetail
}, {
    path: '/destory',
    component: destory
}, {
    path: '/detail',
    component: detail
}];

const router = new VueRouter({
    routes
});
Vue.http.interceptors.push(function (request, next) {

    request.method = 'POST';

    request.headers.set('AccessToken', window["__AppWebkey"]);

    next();
});
const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});