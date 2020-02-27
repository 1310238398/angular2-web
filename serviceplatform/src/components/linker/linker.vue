<style lang="less">
.linker_c {
    position: fixed;
    width: 360px;
    margin: auto;
    left: 50%;
    margin-left: -180px;
    bottom: 5px;
}
</style>
<template>
<div class="linker_c">
    <Breadcrumb>
        <BreadcrumbItem>
            <a :href="staffURL" target="_blank">
                <Icon type="ios-home-outline"></Icon> 学工系统
            </a>
        </BreadcrumbItem>
        <BreadcrumbItem>
            <a href="http://www.sdpei.edu.cn/" target="_blank">
                 <Icon type="logo-buffer"></Icon> 学校官网
                </a>
        </BreadcrumbItem>
        <BreadcrumbItem>
            <a @click="onLinker">
                <Icon type="ios-cafe"></Icon> 一卡通系统
                </a>
        </BreadcrumbItem>
    </Breadcrumb>
</div>
</template>

<script>
export default {
    name: "linker",
    data() {
        return {
            staffURL: `${
      process.env.VUE_APP_Web_Staff
    }web/user/thirdpartylogin?IdKey=_ACKEY_${localStorage.getItem(
      "AppWebkey"
    )}`
        }

    },
    methods: {
        onLinker() {
            this.$Message.warning(`一卡通系统尚未完成对接,暂时无法一键登录!`);
        }
    }
};
</script>
