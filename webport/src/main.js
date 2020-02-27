import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import request from './lib/request'
import sdk from './lib/sdk'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'

Vue.config.productionTip = false;
Vue.use(iView);
new Vue({
    router,
    store,
    request,
    render: h => h(App),
    mounted() {
        console.log(sdk);
        sdk.configure();
    }
}).$mount('#app');
router.beforeEach((to, from, next) => {
    if (to.path == '/main/bigdata') {
        //alert(localStorage.getItem('AppWebkey'));
        axios.defaults.headers.common['AccessToken'] = localStorage.getItem('AppWebkey');
        axios
            .post(
                "/api/appsrv/interface",
                JSON.stringify({
                    Router: "/app/client/config",
                    Method: "POST",
                    Body: JSON.stringify({
                        DEVICETYPE: "Web",
                        DEVICEID: 'Web',
                        VERSION: '1.1'
                    })
                })
            )
            .then(res => {
                if(res.data.Data){
                    localStorage.setItem('config', JSON.stringify(res.data.Data.Params));
                    if (localStorage.getItem('config')) {
                        next();
                    } else {
                        this.$Message.warning('系统初始化有误,建议刷新页面重试一下!');
                    }
                }else {
                    //alert('系统提示:获取初始化参数失败!');
                    this.$router.push('/')
                }

            })
    } else {
        next()
    }
})
