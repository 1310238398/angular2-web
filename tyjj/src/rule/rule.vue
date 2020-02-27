<template>
    <div class="p-ab bg">
        <img src="../assets/img/2.png" style="width: 100%">
        <div class="layer">
            <h3 class="t-center yellow h31">报名规则</h3>
            <div class="font">A.选手必须为山东体育学院在校生</div>
            <div class="font">B.自由组队，每只队伍有五名选手组成</div>
            <div class="font">C.每人只能参加一支队伍</div>
            <h3 class="t-center yellow h32">比赛规则</h3>
            <div class="font">A.所有比赛均为5V5王者峡谷征召模式；</div>
            <div class="font">B.比赛胜负由系统判定胜负为准；</div>
            <div class="font">C.海选赛至8进4阶段采用BO1赛事，4进2及<br>总决赛决赛采用BO3赛制</div>
            <div class="font h31">报名时间：<span class="yellow">5月9日12:00-5月14日18:00</span></div>
        </div>
        <img src="../assets/img/down.png" class="img-fix animated infinite flash" v-on:click="next">
    </div>
</template>
<style scoped>
    .bg {
        background: url("../assets/img/back2.jpg") no-repeat center;
        background-size: cover;
    }

    .font {
        font-size: 14px;
        margin-left: 50px;
        color: #ffffff;
    }
    .p-ab {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .img-fix {
        position: fixed;
        left: 50%;
        margin-left: -21px;
        width: 42px;
        bottom: 20px;
    }
    .layer {
        margin: 40px auto 0 auto;
        border-radius: 5px;
        width: 92%;
        height: 45%;
        background-color: #20305F;
        opacity: 0.85;
    }

    .h31 {
        padding-top: 8px;
        margin-bottom: 8px;
    }

    .h32 {
        margin: 8px 0;
    }
</style>
<script>
    import util from '../util'
    export default {
        created(){
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
        },
        methods: {
            next() {
                util.postJson({
                    Router: '/api/sport/check',
                    Method: 'GET'
                }).then(res => {
                    if (!res.Leader && !res.Mumber) {
                        this.$router.replace('iden');
                    } else if (res.Leader && !res.Mumber) {
                        this.$router.replace('success');

                    } else if (res.Mumber && !res.Leader) {
                        this.$router.replace('mdetail');

                    } else {
                        util.toast('未知错误')
                    }
                });
            }
        }
    }
</script>