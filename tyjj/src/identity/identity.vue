<template class="iden">
    <div class="p-ab bg">
        <div class="layer">
            <h3 class="t-center yellow pt">请选择身份</h3>
            <router-link to="create" replace>
                <button type="button" class="t-center block m-auto btn dz">我是队长</button>
            </router-link>
            <router-link to="join" replace>
            <button type="button" class="t-center block m-auto btn dy">我是队员</button>
            </router-link>
        </div>
    </div>
</template>
<style scoped>
    .bg {
        background: url("../assets/img/back3.jpg") no-repeat center;
        background-size: cover;
    }

    .layer {
        margin: 70% auto 0 auto;
        border-radius: 5px;
        width: 92%;
        height: 44%;
        background-color: #20305F;
        opacity: 0.85;
    }

    .pt {
        padding-top: 25px;
    }

    .btn {
        width: 270px;
        margin-top: 40px;
        border: 1px;
        font-size: 18px;
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