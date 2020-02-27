<template>
    <div class="p-ab bg">
        <div class="layer">
            <div class="t-center yellow mr pt">战队创建成功</div>
            <div class="t-center yellow mr">请将邀请码分享给你要邀请的队员</div>
            <div class="t-center code" id="code">{{team.code}}</div>
            <div class="btn-t" data-clipboard-target="#code">
                复制
            </div>
            <div class="br">
                <div>战队名：{{team.Team}}</div>
                <div>队长名：{{team.Leader}}</div>
                <div>电话：{{team.LeaderPhone}}</div>
            </div>
            <div class="t-center yellow mr pt">已加入的队员</div>
            <div class="br" v-if="Mumbers.length >0">
                <div v-for="(item, index) in Mumbers">队员{{index + 1}}：{{item.Name}}</div>
            </div>
            <div v-else class="t-center wi">暂无队员加入</div>
            <button type="button" class="t-center block m-auto btn dy" v-on:click="dissolve">解散队伍</button>
        </div>
    </div>
</template>
<style scoped>
    .bg {
        background: url("../assets/img/back5.jpg") no-repeat center;
        background-size: cover;
    }

    .btn-t {
        width: 100%;
        color: #fff;
        text-align: center;
        text-decoration: underline;
    }

    .wi {
        color: #fff;
    }

    .layer {
        margin: 30% auto 0 auto;
        border-radius: 5px;
        width: 92%;
        height: 70%;
        background-color: #20305F;
        opacity: 0.85;
    }

    .pt {
        padding-top: 8px;
    }

    .mr {
        margin: 2px 0;
    }

    .br {
        border-style: double;
        border-color: #536B9B;
        border-width: 1px;
        margin: 8px auto;
        padding: 8px;
        width: 60%;
        font-size: 14px;
        color: #ffffff;
        text-indent: 12px;
    }

    .br > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .code {
        color: #ffffff;
        margin-bottom: 16px;
        font-size: 24px;
    }

    .btn {
        width: 140px;
        margin-top: 25px;
        border: 1px;
        font-size: 18px;
        height: 45px;
        border-radius: 20px;
        letter-spacing: 2px;
    }

    .dy {
        background-color: #F77A71;
    }
</style>
<script>
    import util from '../util'
    export default {
        data(){
            return {
                team: {},
                Mumbers: []
            }
        },
        created () {
            new Clipboard('.btn-t');
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
        },
        methods: {
            dissolve(){
                var name = window.confirm("是否解散队伍");
                if (name) {
                    util.postJson({
                        Router: '/api/sport/' + this.team.TeamID,
                        Method: 'DELETE'
                    }).then(res => {
                        util.toast(res.Message);
                        this.$router.replace('rule')
                    });
                }

            }
        }
    }
</script>