<template class="index">
    <div class="p-ab bg">
        <img src="../assets/img/1.png" class="img-top">
        <!-- <div class="bimg"></div>-->
        <router-link to="rule" replace><img src="../assets/img/down.png" class="img-fix">
        </router-link>

    </div>
</template>
<style scoped>
    .bg {
        background: url("../assets/img/back1.jpg") no-repeat center;
        background-size: cover;
    }

    .img-top {
        position: fixed;
        z-index: 10000;
        padding-top: 30px;
    }

    .img-fix {
        position: fixed;
        left: 50%;
        margin-left: -21px;
        width: 42px;
        bottom: 20px;
    }
    p-ab {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
<script>

    export default{
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
        }
    }
</script>