<style lang="less">
    @import "login.less";
</style>
<template>

    <!--<div class="login">
        <div id="nav">
          <router-link to="/">简易版web门户</router-link>
    &lt;!&ndash;        |
          <router-link to="/about">关于</router-link> &ndash;&gt;
        </div>
        <div><input type="text" v-model="form.name" placeholder="用户名" name="name"></div>
            <div><input type="text" v-model="form.pwd" placeholder="密码" name="password"></div>
                <br>
                <button @click="login">提交</button>
        <Button type="primary">Primary</Button>

    </div>-->


    <div class="login">
        <div class="login-school">
            <img class="logo" src="@/assets/images/logo-login.png" alt="">
            <!--<div class="name">校园集结号</div>-->
            <!--  <div class="name">{{schoolName}}</div>
              <div class="sys">集结号Web应用中心</div>-->
        </div>
        <div class="login-con">
            <Card icon="log-in" :bordered="false">
                <div class="form-con">
                    <div class="login-title">登录</div>
                    <div ref="loginForm" :model="form">
                        <div class="m_field">
                          <!--  <div class="field">用户名</div>-->
                            <Input v-model="form.name" placeholder="用户名" name="name">
                            </Input>
                        </div>
                        <div class="m_field">
                           <!-- <div class="field">密码</div>-->
                            <Input type="password" v-model="form.pwd" @keydown.enter.native="login" placeholder="密码"
                                   name="password">
                            </Input>
                        </div>
                        <div>
                            <Button class="btn" @click="login" type="primary" long>登录</Button>
                        </div>
                    </div>
                    <!--              <a class="login-tip" style="float:left"><span style="color: #c3c3c3;">没有账号? </span>立即注册</a>
                                  <a class="login-tip" style="float:right">忘记密码</a>-->
                </div>
            </Card>
            <div class="here_download">在这里，下载校园集结号</div>
            <div class="app">
                <div class="app_item" :class="{hover_pc:PC}">
                    <a href="http://www.antlinker.com/down.html">
                        <img :src="pc_url" @mouseover="hoverPC" @mouseout="hoverPC" alt="">
                        <div v-if="!PC" style="color: #A9BFFF;">PC</div>
                        <div class="download_pc" v-if="PC">点击下载PC端</div>
                    </a>
                </div>
                <div class="hover_div" :class="{show:showImg,hide:hideImg,iOS:iOS}">
                    <img src="@/assets/images/download.png" alt="">
                    <div class="code_m">扫描二维码安装应用</div>
                </div>
                <div class="app_item" :class="{hover_pc:Android}">
                    <img src="@/assets/images/Android.png" @mouseover="overShow('Android')" @mouseout="overShow" alt="">
                    <div>Android</div>
                </div>
                <div class="app_item" :class="{hover_pc:iOS}">
                    <img src="@/assets/images/iphone.png" @mouseover="overShow('iOS')" @mouseout="overShow" alt="">
                    <div>iOS</div>
                </div>
            </div>
        </div>

        <div class="fix_bottom">
            <div class="box">版权所有©山东蚁动网络科技有限公司</div>
            <div class="box" style="color: red" v-if="!Chrome">Web端校园集结号建议使用谷歌浏览器 <a :href="download_Url"
                                                                                     target="_blank">点击下载</a>
            </div>
        </div>
    </div>

</template>

<script>
    import auth from "../../lib/auth";
    import md5 from "md5";
    import {Base64} from "js-base64";
    import axios from 'axios';

    export default {
        name: "login",
        components: {},
        data() {
            return {
                Chrome: false,
                schoolName: '',
                logo: '',
                showImg: false,
                hideImg: true,
                PC: false,
                Android: false,
                iOS: false,
                pc_url: require('../../assets/images/pc.png'),
                download_Url: 'https://www.google.com/chrome',
                form: {
                    grant_type: "password",
                    name: "",
                    pwd: ""
                }
            };
        },
        mounted() {
            //this.getSchoolParams()
            //alert(JSON.stringify(platform.os));
            localStorage.clear();
            if (navigator.userAgent.toLowerCase().includes("chrome")) {
                this.Chrome = true;
            } else {
                this.Chrome = false;
                let famlily = platform.os.family;
                if (famlily.includes('OS X')) {
                    this.download_Url = '/webport/pkg/mac_chrome.dmg';
                }
                if (famlily.includes('Windows')) {
                    if (platform.os.architecture == 32) {
                        this.download_Url = '/webport/pkg/window_Chrome_32.exe';
                    } else {
                        this.download_Url = '/webport/pkg/window_chrome_64.exe';
                    }
                }
            }

        },
        methods: {
            overShow(index) {
                if (index == 'iOS') {
                    this.iOS = true
                } else {
                    this.iOS = false
                }
                if (index == 'Android') {
                    this.Android = true
                } else {
                    this.Android = false
                }
                this.showImg = !this.showImg;
                this.hideImg = !this.hideImg
            },
            hoverPC() {
                this.PC = !this.PC;
                if (this.PC) {
                    this.pc_url = require('../../assets/images/pc-on.png');
                } else {
                    this.pc_url = require('../../assets/images/pc.png');
                }
            },
            getConfig() {
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
                        localStorage.setItem('config', JSON.stringify(res.data.Data.Params));
                        // this.funs = res.data.Data || [];
                    });
            },
            getSchoolParams() {
                axios
                    .post(
                        "/web/system/parameter/sysparameterauto",
                        JSON.stringify({parameter: ['Logo', "Campus"]})
                    )
                    .then(res => {
                        if (!res.data.FeedbackCode) {
                            this.logo = res.data.Data[0].Value;
                            this.schoolName = res.data.Data[1].Value;
                        }
                        // localStorage.setItem('config', JSON.stringify(res.data.Data.Params));
                        // this.funs = res.data.Data || [];
                    });
            },
            login() {
                if (!this.form.name || !this.form.pwd) {
                    this.$Message.error('用户名或密码不能为空!');
                    return;
                }
                let _form = new FormData();
                _form.append("grant_type", "password");
                _form.append("password", md5(this.form.pwd));
                _form.append(
                    "username",
                    Base64.encode(
                        JSON.stringify({
                            LoginModel: 1,
                            UserName: this.form.name
                        })
                    )
                );
                auth.basicAxios
                    .post("/auth/oauth2/token", _form, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    })
                    .then(res => {
                        if (res.status == '200') {
                            localStorage.setItem('AppWebkey', res.data.access_token);
                            localStorage.setItem('refresh_token', res.data.refresh_token);
                            window["__AppWebkey"] = res.data.access_token || "";
                            this.$router.push("/main/bigdata");
                            //Object.prototype.setProperty(navigator, 'userAgent':() =>{return 'antlinker_pc';});//新写法
                            // window.navigator.userAgent='antlinker_pc'
                        } else {
                            this.$Message.error('用户名或密码错误!');
                        }
                    });
            }
        }
    };
</script>
