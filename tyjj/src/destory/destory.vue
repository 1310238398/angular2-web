<template class="iden">
    <div class="p-ab bg">
        <div class="layer">
            <div class="t-center"><img class="img" src="tan.png"></div>
            <h3 class="t-center yellow">您加入的队伍已被队长解散</h3>
            <router-link to="iden" replace>
            <button type="button" class="t-center block m-auto btn dy">加入新战队或者创建自己的战队</button>
            </router-link>
        </div>
    </div>
</template>
<style scoped>
    .bg {
        background: url("../assets/img/back7.jpg") no-repeat center;
        background-size: cover;
    }
.img{
    width: 80px;
    padding-top: 50px;
}
    .layer {
        margin: 70% auto 0 auto;
        border-radius: 5px;
        width: 92%;
        height: 50%;
        background-color: #20305F;
        opacity: 0.85;
    }


    .btn {
        width: 280px;
        margin-top: 40px;
        border: 1px;
        color: #721D86;
        font-size: 16px;
        height: 45px;
        border-radius: 3px;
        letter-spacing: 2px;
    }

    .dz {
        background-color: #FDCB3D;
    }

    .dy {
        background-color: #FB777A;
    }
</style>
<script>
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
</script>