<template>
    <router-view></router-view>
</template>

<style>

    .p-ab {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    html {
        font-family: sans-serif;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
    }

    body {
        margin: 0;
    }

    a {
        background-color: transparent;
        text-decoration: none;
    }

    a:active,
    a:hover {
        outline: 0;
    }

    img {
        border: 0;
    }

    input {
        display: block;
        border-color: #ffffff;
        border-width: 1.5px;
        text-indent: 10px;
        border-radius: 5px;
        width: 92%;
        margin: 10px auto;
        background-color: transparent;
        font-size: inherit;
        color: #fff;
        height: 2.2em;
        line-height: 2.2em;
    }

    ::-webkit-input-placeholder {
        color: #ffffff;
    }

    .t-center {
        text-align: center;
    }

    .yellow {
        color: #F7F23F;
    }

    .block {
        display: block;
    }

    .m-auto {
        margin-left: auto;
        margin-right: auto;
    }

    .toast {
        position: fixed;
        visibility: hidden;
        min-width: 250px;
        margin-left: -125px;
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        text-align: center;
        -webkit-border-radius: 0.65rem;
        -moz-border-radius: 0.65rem;
        border-radius: 0.65rem;
        padding: 12px;
        z-index: 10;
        left: 50%;
        bottom: 30%;
    }

    .show {
        visibility: visible;
    }


    @keyframes flash {
        from, 50%, to {
            opacity: 1;
        }

        25%, 75% {
            opacity: 0;
        }
    }

</style>
<script>
    import util from './util'
    export default {
        name: 'app',
        created () {
            /**
             * 调用jssdk
             * 标题
             */
            antlinker.configTitle({
                type: "label",
                title: '电子竞技',
                fail: function () {

                },
                success: function () {
                }
            });
            antlinker.configTitleButton({
                type: 'close',
                text: '关闭',
                fail: function () {

                },
                success: function () {
                },
                trigger: function () {
                }

            });

            util.postJson({
                Router: '/api/user/check/sport',
                Method: 'GET'
            }).then(res => {
                if (!res.User) {
                    this.$router.replace('error');
                } else {
                    util.postJson({
                        Router: '/api/sport/check',
                        Method: 'GET'
                    }).then(res => {
                      /*  alert("检查"+JSON.stringify(res));*/
                        if (!res.Leader && !res.Mumber) {
                            util.postJson({
                                Router: '/api/sport/status',
                                Method: 'GET'
                            }).then(res => {
                              /*  alert(JSON.stringify(res));*/
                                if (res.Status) {
                                    this.$router.replace('destory');
                                } else {
                                    this.$router.replace('index');
                                }
                            });
                        } else if (res.Leader && !res.Mumber) {
                                    util.postJson({
                                        Router: '/api/sport/team',
                                        Method: 'GET'
                                    }).then(res => {
                                        if (res.Status) {
                                            this.$router.replace({path: "detail", query: {dz: true}});
                                        }else {
                                            this.$router.replace('success');
                                        }
                                    });

                        } else if (res.Mumber && !res.Leader) {
                            util.postJson({
                                Router: '/api/sport/team',
                                Method: 'GET'
                            }).then(res => {
                                if (res.Status) {
                                    this.$router.replace({path: "detail", query: {dz: false}});
                                } else {
                                    console.log('应该进入队员页面 但先判断是被解散了队伍');
                                    util.postJson({
                                        Router: '/api/sport/status',
                                        Method: 'GET'
                                    }).then(res => {
                                        if (res.Status) {
                                            //如果 status：1 证明队伍被解散 进入 destory
                                            this.$router.replace('destory');
                                        }else {
                                            this.$router.replace('mdetail');
                                        }
                                    });
                                }
                            });

                        } else {
                            util.toast('未知错误')
                        }
                    });
                }
            });
        }
    }
</script>