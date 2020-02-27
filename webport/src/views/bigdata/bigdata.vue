<template>
    <div class="index">
        <!--   <div style="background:#eee;padding:8px">
               <div class="inline_block title_card">
                   <Card class='person'>
                       <img class="icon" src="@/assets/images/default.png" alt="">
                       <div class="right inline_block">
                           <div>姓名：李某某</div>
                           <div>工号：201812345678</div>
                           <div>部门：学生处</div>
                           <div>职务：科长</div>
                           <div>
                               <Button class="pr">信息修改</Button>
                               <Button class="pr">密码修改</Button>
                           </div>
                       </div>

                   </Card>
               </div>
               <div class="inline_block">
                   <Card class="card">
                       <div>今日2019年3月9日共有2个未读提醒共有2个待办事项</div>
                       <Button class="pr" @click="verify">验证令牌</Button>
                   </Card>
               </div>
           </div>-->
        <iframe ref='iframe' id="iframe" height="100%" width="100%" frameborder="0" :src="url"></iframe>
        <!--  <Modal v-model="isLoginMsg" width="360">
              <p slot="header" style="text-align:center">
                  <Icon type="ios-alert-outline" style="color:#ed4014"/>
                  <span style="color:#ed4014">温馨提示</span>
              </p>
              <div style="text-align:center">
                  <h3>系统检测到登录异常!</h3>
                  <h4>准备重新登录吗?</h4>
              </div>
              <div slot="footer">
                  <Button type="warning" size="large" long @click="goLogin">确定</Button>
              </div>
          </Modal>-->
    </div>
</template>
<style lang='less'>
    @import url(./bigdata.less);
</style>
<script>
    import axios from "axios";
    import auth from "../../lib/auth";
    import util from '../../lib/util';

    export default {
        name: "index",
        data() {
            return {
                isLoginMsg: false,
                Interval: '',
                url: '',
                news: [
                    {name: '1、关于2018年中秋节、国庆节放假及有关工作安排的通知'},
                    {name: '2、科学健身与健康中国同行——智慧康体促进国际高峰论坛征文通知'},
                    {name: '3、李某某老师，刘某某给你发来一个请假申请，快去审批吧，TA很着急~'},
                ]
            };
        },
        components: {},
        methods: {
            goLogin() {
                this.$router.push("/");
                //this.isLoginMsg = false;
            },
            verify() {
                axios
                    .get("/auth/oauth2/verify", {
                        params: {
                            access_token: localStorage.getItem('AppWebkey') || ""
                        }
                    }, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    })
                    .then(res => {
                        console.log(res);
                        if (res.status == '401') {
                            console.info('令牌失效');
                            this.refreshToken();
                        }
                        if (res.data['expires_in'] > 0) {
                            // console.info('有效的令牌,还剩:', res.data.expires_in);
                            this.postMsg();
                        }
                    });
            },
            refreshToken() {
                let _form = new FormData();
                _form.append("grant_type", "refresh_token");
                _form.append("refresh_token", localStorage.getItem('refresh_token'));
                auth.basicAxios
                    .post("/auth/oauth2/token", _form, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    })
                    .then(res => {
                        if (res.data) {
                            console.info('获取刷新令牌:', res.data);
                            localStorage.setItem('AppWebkey', res.data.access_token);
                            this.postMsg();
                        }
                    });
            },
            postMsg() {
                if (this.$refs.iframe.contentWindow) {
                    //alert('ddd');
                    this.$refs.iframe.contentWindow.postMessage(
                        localStorage.getItem("AppWebkey"),
                        this.url
                    );
                }
            }
        },
        beforeMount() {

        },
        mounted() {
            this.url = `${util.getH5Url(JSON.parse(localStorage.getItem('config')), '', true)}/bigdata/`;
            const oIframe = this.$refs.iframe;
            const deviceWidth = document.documentElement.clientWidth;
            const deviceHeight = document.documentElement.clientHeight - 16;
            // alert(this.url)
            // alert(this.$refs.iframe)
            // oIframe.style.width = deviceWidth + "px";
            oIframe.style.height = deviceHeight + "px";
            var num = 0;
            let IntervalTemp = setInterval(() => {
                //console.log('监测内容',num)
                num=num+1;
                if (this.$refs.iframe.contentWindow) {
                    this.postMsg();
                }
                if (num > 5) {
                    clearInterval(IntervalTemp)
                }

            }, 500);

            this.Interval = setInterval(() => {
                if (localStorage.getItem("AppWebkey")) {
                    this.verify();
                }
            }, 60000);
        },
        destroyed() {
            clearInterval(this.Interval)
        }
    };
</script>
