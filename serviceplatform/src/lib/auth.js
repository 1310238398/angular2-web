import axios from 'axios';
// 创建实例时设置配置的默认值
let basicAxios = axios.create();
let env = process.env;
//alert(JSON.stringify(env));
basicAxios.defaults.auth = {
    username: env.VUE_APP_Web_UserName,
    password: env.VUE_APP_Web_Password
};
// 添加响应拦截器
basicAxios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    return response;
}, function(error) {
    // 对响应错误做点什么
    const res = error.response.data;
    console.log(`status:${res.status}->${res.text}`);
    if (error.response.status != '401') {
        return Promise.reject(error);
    } else {
        return Promise.resolve(error.response);
    }
});
let auth = {
    basicAxios: basicAxios
}
export default auth;