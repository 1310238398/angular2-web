<template>
    <div class="p-ab bg">
        <div class="layer">
            <h3 class="t-center yellow pt">创建战队</h3>
            <div class="t-center zi">(仅限本校学生，填写信息务必真实有效)</div>
            <input type="text" v-model="dz.Name" autofocus placeholder="战队名">
            <input type="text" v-model="dz.Leader" autofocus placeholder="队长名">
            <input type="text" v-model="dz.Phone" autofocus placeholder="手机号">
            <button type="button" class="t-center block m-auto btn dy" v-on:click="next">下一步</button>
        </div>
    </div>
</template>
<style scoped>
    .p-ab {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .bg {
        background: url("../assets/img/back4.jpg") no-repeat;
        background-size: cover;
    }

    .layer {
        position: absolute;
        top: 50%;
        margin-top: -150px;
       /* margin: 200px auto 0 auto;*/
        border-radius: 5px;
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
        background-color: #F77A71;
    }
</style>
<script>
    import util from '../util'
    export default {
        data(){
            return {
                dz: {}
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
                if (!vm.dz.Leader) {
                    util.toast('队长名不能为空！');
                    return
                }
                if (!vm.dz.Name) {
                    util.toast('战队名不能为空！');
                    return
                }
                if (!vm.dz.Phone) {
                    util.toast('手机号不能为空！');
                    return
                }
                util.postJson({
                    Router: '/api/sport/team',
                    Method: 'PUT',
                    body: vm.dz
                }).then(res => {
                    if (res.code) {
                        util.toast(res.message);
                        // this.$router.push('rule');
                    } else {
                        this.$router.replace('success');
                    }
                });
            }
        }
    }
</script>