<template>
    <div class="p-ab bg">
        <div class="layer">
            <h3 class="t-center yellow pt">加入战队</h3>
            <div class="t-center zi">(仅限本校学生，填写信息务必真实有效)</div>
            <input type="text" v-model="dy.InvitationCode" autofocus placeholder="邀请码">
            <input type="text" v-model="dy.Name" autofocus placeholder="姓名">
            <input type="text" v-model="dy.Phone" autofocus placeholder="手机号">
            <button type="button" class="t-center block m-auto btn dy" v-on:click="next">加入战队</button>
        </div>
    </div>
</template>
<style scoped>

    .bg {
        background: url("../assets/img/back6.jpg") no-repeat center;
        background-size: cover;
    }

    .layer {
        position: absolute;
        border-radius: 5px;
        top: 50%;
        margin-top: -150px;
        width: 92%;
        left: 4%;
        height: 300px;
        background-color: #20305F;
        opacity: 0.85;
    }

    .pt {
        padding-top: 16px;
        margin: 8px 0;
    }

    .zi {
        color: #ffffff;
        margin-bottom: 16px;
        font-size: 14px;
    }

    .btn {
        width: 140px;
        margin-top: 15px;
        border: 1px;
        font-size: 18px;
        height: 45px;
        border-radius: 20px;
        letter-spacing: 2px;
    }

    .dy {
        background-color: #F7CF35;
    }
</style>
<script>
    import util from '../util'
    export default {
        data(){
            return {
                dy: {}
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
        },
        methods: {
            next(){
                var vm =this;
                if (!vm.dy.InvitationCode) {
                    util.toast('邀请码不能为空！');
                    return
                }
                if (!vm.dy.Name) {
                    util.toast('姓名不能为空！');
                    return
                }
                if (!vm.dy.Phone) {
                    util.toast('手机号不能为空！');
                    return
                }
                util.postJson({
                    Router: '/api/sport/mumber',
                    Method: 'PUT',
                    body: vm.dy
                }).then(res => {
                    if (res.code) {
                        util.toast(res.message)
                    } else {
                        this.$router.replace('mdetail');
                    }
                });
            }
        }
    }
</script>