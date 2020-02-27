<template>
    <div class="p-ab bg">
        <div class="layer">
            <h3 class="t-center yellow pt">组队成功</h3>
            <div class="t-center re"><img class="img" src="bottom.png">
                <div class="br ab">

                    <div>战队名：{{team.Team}}</div>
                    <div>队长名：{{team.Leader}}</div>
                    <div>电话：{{team.LeaderPhone}}</div>
                    <div class="br" v-if="Mumbers.length >0">
                        <div v-for="(item, index) in Mumbers">队员{{index + 1}}：{{item.Name}}</div>
                    </div>
                </div>
            </div>

            <div class="fo tt">更多关于比赛的安排及规则，
                <span v-on:click="next" class="sp"
                      style="text-decoration: underline; position: absolute;z-index: 10000">点击查看</span>
            </div>

        </div>
    </div>
</template>
<style scoped>
    .bg {
        background: url("../assets/img/back9.jpg") no-repeat center;
        background-size: cover;
    }

    .img {
        width: 100%;
    }

    .re {
        position: relative;
    }

    .ab {
        position: absolute;
        top: 20%;
        left: 24%;
        font-size: 14px;
        color: #124B92;
    }

    .sri {
        text-align: right;
    }

    .sle {
        text-align: left;
    }

    .tt {
       margin-left: 32px;
    }

    .fo {
        margin-top: -40px;
        font-size: 14px;
        color: #ffffff;
    }

    .sp {
        text-decoration: underline;
        color: #F7F23F;
    }

    .pt {
        padding-top: 20px;
        margin: 0;
    }

    .layer {
        margin: 70% auto 0 auto;
        border-radius: 5px;
        width: 92%;
        height: 60%;
        background-color: #20305F;
        opacity: 0.85;
    }
</style>
<script>
    function nav() {
        alert('gggg')
    }
    import util from '../util';
    export default {
        data(){
            return {
                team: {},
                Mumbers: []
            }
        },
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
            var vm = this;
            if (vm.$route.query.dz) {
                util.postJson({
                    Router: '/api/sport/leader',
                    Method: 'GET'
                }).then(res => {
                    vm.$data.team = {
                        Team: res.Team,
                        Leader: res.Leader,
                        LeaderPhone: res.LeaderPhone,
                        code: res.InvitationCode,
                        TeamID: res.TeamID,
                    };
                    vm.$data.Mumbers = res.Mumbers || [];
                });
            } else {
                util.postJson({
                    Router: '/api/sport/mumber',
                    Method: 'GET'
                }).then(res => {
                    vm.$data.team = {
                        Team: res.Team,
                        Leader: res.Leader,
                        LeaderPhone: res.LeaderPhone,
                        code: res.InvitationCode,
                        TeamID: res.TeamID,
                    };
                    vm.$data.Mumbers = res.Mumbers || [];
                });
            }
        },
        methods: {
            next(){
                location.replace('https://app.antservercampus.link:8803/static/notice/100000000453/100000000453.html');
            }
        }
    }
</script>