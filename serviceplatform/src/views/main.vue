<template>
<div class="main">
    <div class="top">
        <img class="logo" src="@/assets/images/logo.png" alt="">
        <div class="title">
            <!--    <span>校园集结号</span>-->
            <div class="box">
                <div :class="{select_box:bigdata}" @click="nav('bigdata')">数据中心</div>
                <div :class="{select_box:applationCenter}" @click="nav('applationCenter')">应用中心</div>
                <div :class="{select_box:quickLink}" @click="nav('quickLink')">校园门户</div>
            </div>

        </div>

    </div>
    <!-- <tagsPageOpened></tagsPageOpened>-->
    <!--        <quick-menu :menu-count=count :icon-class=icons :background-color=backgroundColor :color=color
                            :menu-url-list=list :position="position" @process=print></quick-menu>-->
    <!--   <div class="fixedBar">
               <img v-if="expand_f" src="../assets/images/shouqi.png" @click="expand()" alt="">
               <img v-if="!expand_f" src="../assets/images/zhankai.png" @click="expand()" alt="">
           </div>
           <div class="fixedMenu" v-if="expand_f">
               <div class="menu">
                   <div :class="{'check': item.checked}" class='item' style="font-size: 12px" v-for=" item in menus">
                       <img :src="item.url" alt="">
                       <a class="white" @click="changeMenu(item)">{{item.name}}</a>
                   </div>

               </div>
           </div>-->
    <router-view></router-view>
    <Modal v-model="isLoginMsg" width="360">
        <p slot="header" style="text-align:center">
            <Icon type="ios-alert-outline" style="color:#ed4014" />
            <span style="color:#ed4014">温馨提示</span>
        </p>
        <div style="text-align:center">
            <h3>系统检测到登录异常!</h3>
            <h4>准备重新登录吗?</h4>
        </div>
        <div slot="footer">
            <Button type="warning" size="large" long @click="goLogin">确定</Button>
        </div>
    </Modal>
</div>
</template>

<style lang="less">
.Linker {
  position: fixed;
  width: 360px;
  margin: auto;
  left: 50%;
  margin-left: -180px;
  bottom: 5px;
}

.top {
  position: relative;
  background: #eceff7;
  height: 40px;

  .logo {
    position: absolute;
    left: 20px;
    top: 5px;
    height: 28px;
  }

  .title {
    position: absolute;
    left: 50px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 40px;
    color: #4a4a4a;
    letter-spacing: 0.09px;

    .box {
      display: inline-block;
      margin-left: 140px;

      div {
        display: inline-block;
        margin: auto 8px;
        padding-right: 10px;
        padding-left: 8px;
      }
    }
  }
}

.select_box {
  background: #5b80f1;
  color: #ffffff;
  letter-spacing: 0;
}

.quick-menu {
  z-index: 100;
}

.fixedBar {
  position: fixed;
  width: 69px;
  text-align: center;
  top: 152px;
  right: 10px;
  padding-top: 4px;
  background-color: #8762b7;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  /*    top: 416px;
           left: 611px; */
}

.fixedMenu {
  position: fixed;
  top: 175px;
  z-index: 1;
  right: 10px;
}

.menu {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-image: linear-gradient(45deg, #4d84fb 0%, #8762b7 100%);
  background-color: #ffffff;

  .item {
    padding: 2px;

    img {
      width: 12px;
      margin-right: 4px;
      margin-bottom: 2px;
    }
  }
}

.check {
  background: #513d8c;
  box-shadow: 0 0 4px 0 #9176d6, inset 0 0 3px 0 #392671;

  a {
    color: #ffffff !important;
  }
}
</style>

<script>
import quickMenu from "vue-quick-menu";
import tagsPageOpened from "../components/tabs/tags-page-opened";
import axios from "axios";

export default {
  name: "main",
  components: {
    tagsPageOpened,
    quickMenu
  },
  data() {
    return {
      isLoginMsg: false,
      expand_f: false,
      bigdata: false,
      applationCenter: false,
      quickLink: false,
      staffURL: `${
        process.env.VUE_APP_Web_Staff
      }web/user/thirdpartylogin?IdKey=_ACKEY_${localStorage.getItem(
        "AppWebkey"
      )}`,
      count: 2,
      icons: ["ivu-icon ivu-icon-ios-home", "ivu-icon ivu-icon-logo-buffer"],
      backgroundColor: "#FFC000",
      color: "#ffffff",
      position: "bottom-right",
      list: [
        {
          isLink: false,
          url: "home"
        },
        {
          isLink: false,
          url: "bigdata"
        }
      ],
      menus: [
        {
          name: "数据中心",
          checked: false,
          url: require("../assets/images/zhengzhi@2x.png"),
          code: "bigdata"
        },
        {
          name: "应用中心",
          checked: false,
          url: require("../assets/images/zonghekaoping@2x.png"),
          code: "applationCenter"
        }
      ]
    };
  },
  methods: {
    onLinker() {
      this.$Message.warning(`一卡通系统尚未完成对接,暂时无法一键登录!`);
    },
    expand() {
      this.expand_f = !this.expand_f;
    },
    /**
     * 切换菜单
     * @param item
     */
    changeMenu(item) {
      if (item.code == "bigdata") {
        this.$router.push("bigdata");
      }
      if (item.code == "applationCenter") {
        this.$router.push("home");
      }
    },
    nav(code) {
      if (code == "bigdata") {
        this.bigdata = true;
        this.quickLink = false;
        this.applationCenter = false;
        document.title = "数据中心";
        this.$router.push("bigdata");
      }
      if (code == "applationCenter") {
        this.bigdata = false;
        this.quickLink = false;
        this.applationCenter = true;
        document.title = "应用中心";
        this.$router.push("home");
      }
      if (code == "quickLink") {
        this.bigdata = false;
        this.applationCenter = false;
        this.quickLink = true;
        document.title = "校园门户";
        this.$router.push("quickLinker");
      }
    },
    goLogin() {
      this.$router.push("/");
      this.isLoginMsg = false;
    },
    print(index) {
      if (index == 1) {
        this.$router.push("bigdata");
      }
      if (index == 0) {
        this.$router.push("home");
      }
    }
  },
  mounted() {
    //alert(this.$route.path)
    if (this.$route.path.includes("/bigdata")) {
      this.bigdata = true;
    }
    if (this.$route.path.includes("/home")) {
      this.applationCenter = true;
    }
    if (this.$route.path.includes("/quickLinker")) {
      this.quickLink = true;
    }
    this.Interval = setInterval(() => {
      if (localStorage.getItem("AppWebkey")) {
      } else {
        this.isLoginMsg = true;
      }
    }, 1000);
  },
  destroyed() {
    clearInterval(this.Interval);
  }
};
</script>
