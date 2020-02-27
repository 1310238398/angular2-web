<template>
    <div class="p-ab bg">
        <div class="layer">
            <div class="t-center yellow mr pt">您成功加入战队</div>
            <div class="br">
                <div>战队名：{{team.Team}}</div>
                <div>队长名：{{team.Leader}}</div>
                <div>电话：{{team.LeaderPhone}}</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .bg {
        background: url("../assets/img/back7.jpg") no-repeat center;
        background-size: cover;
    }

    .layer {
        margin: 70% auto 0 auto;
        border-radius: 5px;
        width: 92%;
        height: 38%;
        background-color: #20305F;
        opacity: 0.85;
    }

    .pt {
        padding-top: 32px;
    }
    .mr {
        margin: 32px 0;
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

</style>
<script>
    import util from '../util'
    export default {
        data(){
            return {
                team:{},
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
            var vm =this;
            util.postJson({
                Router: '/api/sport/mumber',
                Method: 'GET'
            }).then(res => {
                if (res.code) {
                    util.toast(res.message)
                } else {
                    vm.$data.team = {
                        Team: res.Team,
                        Leader: res.Leader,
                        LeaderPhone: res.LeaderPhone,
                    };
                }
            });
        }
    }
</script>