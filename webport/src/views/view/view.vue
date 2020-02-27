<template>
    <div class="view">
        <iframe ref='iframe' height="100%" width="100%" frameborder="0" :src="url"></iframe>
    </div>
</template>
<style lang="less">
    html {
        overflow: hidden;
    }

    iframe {
        overflow: auto;
    }
</style>
<script>
    import axios from "axios";
    import auth from "../../lib/auth";
    import util from '../../lib/util';

    export default {
        name: "index",
        data() {
            return {
                Interval: '',
                url: '',
            };
        },
        components: {},
        methods: {
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
                if (this.$refs.iframe) {
                    this.$refs.iframe.contentWindow.postMessage(
                        localStorage.getItem("AppWebkey"),
                        this.url
                    );
                }
            }
        },
        beforeMount() {
            if (localStorage.getItem("AppWebkey")) {
                this.postMsg();
            }
        },
        mounted() {
            document.title=this.$route.query.title||'应用中心';
            this.url = `${util.getH5Url(JSON.parse(localStorage.getItem('config')), this.$route.query.path)}`;
            const oIframe = this.$refs.iframe;
            const deviceWidth = document.documentElement.clientWidth;
            const deviceHeight = document.documentElement.clientHeight-30;
            // oIframe.style.width = deviceWidth + "px";
            oIframe.style.height = deviceHeight + "px";
            var num = 0;
            let IntervalTemp = setInterval(() => {
                //console.log('实时监测:',num)
                num=num+1;
                if (this.$refs.iframe.contentWindow) {
                    this.postMsg();
                }
                if (num > 10) {
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
