<template>
<div class="linker_Box">
    <div class="linker mt">
        <div class="linker_list" v-for="linker in linkers" :key="linker.id" @click='onLinker(linker)'>
            <span class="linker_item">
        <img :src="linker.iconUrl||require('../../assets/images/defaulticon.png')" alt="">
        </span>
            <div class="base-font font16 mlt">{{linker.lName}}</div>
            <div class="base-font font16">入口</div>
        </div>
    </div>
</div>
</template>

<style lang="less">
@import url(./linker.less);
</style>

<script>
import axios from "axios";
import util from "../../lib/util";

export default {
  name: "home",
  data() {
    return {
      baseUrl: "@/assets/images/defaulticon.png",
      isLoginMsg: false,
      url: "",
      linkers: [
        {
          lName: "学工系统",
          iconUrl: require("../../assets/images/sys/xuegong.png"),
          url: "http://dev.xiaoyuanjijiehao.com:8088"
        },
        {
          lName: "教务系统",
          iconUrl: require("../../assets/images/sys/jiaowu.png"),
          url: "http://dev.xiaoyuanjijiehao.com:8088/index.html"
        },
        {
          lName: "财务系统",
          iconUrl: require("../../assets/images/sys/caiwu.png"),
          url: "http://dev.xiaoyuanjijiehao.com:8088/index.html"
        },
        {
          lName: "办公系统",
          iconUrl: require("../../assets/images/sys/bangong.png"),
          url: "http://dev.xiaoyuanjijiehao.com:8088/index.html"
        },
        {
          lName: "图书馆系统",
          iconUrl: require("../../assets/images/sys/tushuguan.png"),
          url: "http://dev.xiaoyuanjijiehao.com:8088/index.html"
        },
        {
          lName: "一卡通系统",
          iconUrl: require("../../assets/images/sys/yikatong.png"),
          url: "http://dev.xiaoyuanjijiehao.com:8088/index.html"
        },
        {
          lName: "公寓系统",
          iconUrl: require("../../assets/images/sys/gongyu.png"),
          url: "http://dev.xiaoyuanjijiehao.com:8088/index.html"
        },
        {
          lName: "后勤系统",
          iconUrl: require("../../assets/images/sys/houqin.png"),
          url: "http://dev.xiaoyuanjijiehao.com:8088/index.html"
        },
        {
          lName: "诊断改进",
          iconUrl: require("../../assets/images/sys/zhenduangaishan.png"),
          url: "http://dev.xiaoyuanjijiehao.com:8088/index.html"
        }
      ]
    };
  },
  components: {},
  methods: {
    getLinkers() {
      /*     axios
                                .post(
                                    "/api/appsrv/interface",
                                    JSON.stringify({
                                        Router: "/app/campusfunc/more",
                                        Method: "POST",
                                        Body: JSON.stringify({
                                            ChannelGroup: "B"
                                        })
                                    })
                                )
                                .then(res => {
                                    //console.log(res);
                                    if (!res.data.RE) {
                                        this.FTypes = res.data.Data.FTypes || [];
                                        let FItems = res.data.Data.FItems;
                                        //处理数据结构
                                        this.dealFunc(this.FTypes, FItems);
                                    } else {
                                        this.$Message.error('系统提示:获取功能列表失败了!');
                                    }
                                }); */
    },

    onLinker(item) {
      if (item.lName == "学工系统") {
        if (localStorage.getItem("AppWebkey")) {
          let env = process.env;
          window.open(
            `${
              env.VUE_APP_Web_Staff
            }web/user/thirdpartylogin?IdKey=_ACKEY_${localStorage.getItem("AppWebkey")}`
          );
        }else{
            localStorage.clear();
        }
      } else {
        this.$Message.warning(`${item.lName}尚未完成对接,暂时无法一键登录!`);
      }
      //let config = JSON.parse(localStorage.getItem('config'));
      // console.log(util.getH5Url(config,item.URI))
      //  window.open(util.getH5Url(config,item.URI))
      // window.open(`${window.location.protocol}//${window.location.host}/webport/#/main/view?title=${item.FName}&path=${item.URI}`);
      //this.$router.push({ path: 'view', query: { path: item.URI }});
    }
  },
  mounted() {
    // this.getFunMore();
  }
};
</script>
