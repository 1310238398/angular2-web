<template>
  <div>
  <div id="weixin-tip" v-bind:class="{ none: none }"  v-on:click="none=true">
        <p><img src="../assets/images/cell.png"  alt="滑动打开" style="height: 100%;width: 100%" />
        </p>
    </div>
    <div class="swiper-container" id="swiper-container">
      <div class="swiper-wrapper" id="swiper-wrapper">

        <!-- <div class="swiper-slide header clearfix" v-for="item in skins" :key="item">
             <div class="hd-c">
                 <div class="banner">
                     <div class="pic">
                         <img :src="item" class="png-24" alt="banner">&lt;!&ndash;背景图&ndash;&gt;
                     </div>
                     <div class="frame">
                         <img class="changing-over" :src="icon">&lt;!&ndash;悬浮图&ndash;&gt;
                     </div>
                 </div>
             </div>
         </div>-->
        <div class="swiper-slide header clearfix">
          <div class="hd-c">
            <div class="banner">
              <div class="pic">
                <img src="../assets/images/skin/02.jpg" class="png-24" alt="banner"><!--背景图-->
              </div>
              <div class="frame po2">
                <img class="changing-over boxs" :src="icon"><!--悬浮图-->
              </div>
              <div class="ab-font ab2-name">{{fname}}</div>
              <div class="ab-font ab2-school">{{fschool}}</div>
            </div>
          </div>
        </div>

        <div class="swiper-slide header clearfix">
          <div class="hd-c">
            <div class="banner">
              <div class="pic">
                <img src="../assets/images/skin/03.jpg" class="png-24" alt="banner"><!--背景图-->
              </div>
              <div class="frame po3">
                <img class="changing-over boxs" :src="icon"><!--悬浮图-->
              </div>
              <div class="ab-font ab3-name">{{fname}}</div>
              <div class="ab-font ab3-school">{{fschool}}</div>
            </div>
          </div>
        </div>

        <div class="swiper-slide header clearfix">
          <div class="hd-c">
            <div class="banner">
              <div class="pic">
                <img src="../assets/images/skin/04.png" class="png-24" alt="banner"><!--背景图-->
              </div>
              <div class="frame po4">
                <img class="changing-over boxs" :src="icon"><!--悬浮图-->
              </div>
              <div class="ab-font ab4-name">{{fname}}</div>
              <div class="ab-font ab4-school">{{fschool}}</div>
            </div>
          </div>
        </div>

        <div class="swiper-slide header clearfix">
          <div class="hd-c">
            <div class="banner">
              <div class="pic">
                <img src="../assets/images/skin/05.png" class="png-24" alt="banner"><!--背景图-->
              </div>
              <div class="frame po5">
                <img class="changing-over boxs" :src="icon"><!--悬浮图-->
              </div>
              <div class="ab-font ab5-name">{{fschool}}</div>
              <div class="ab-font ab5-school">{{fname}}</div>
            </div>
          </div>
        </div>

        <div class="swiper-slide header clearfix">
          <div class="hd-c">
            <div class="banner">
              <div class="pic">
                <img src="../assets/images/skin/06.png" class="png-24" alt="banner"><!--背景图-->
              </div>
              <div class="frame po6">
                <img class="changing-over boxs" :src="icon"><!--悬浮图-->
              </div>
              <div class="ab-font ab6-name">{{fname}}</div>
              <div class="ab-font ab6-school">{{fschool}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-b">
      <!--<button class="btn" v-on:click="save()">保存到相册</button>-->
      <button class="btn" v-on:click="share()">邀请好友一起来玩</button>
    </div>
  </div>
</template>

<script>
  import '../../node_modules/swiper/dist/css/swiper.min.css';
  import Swiper from 'swiper';
  import html2canvas from 'html2canvas';

  export default {
    name: "display",
    data: function () {
      return {
        none:false,
        icon: localStorage.getItem('icon') || "",
        fname: localStorage.getItem('fname') || "蚁动科技",
        fschool: localStorage.getItem('fschool') || "蚁动大学",
        antFlag:false
      }
    },
    mounted: function () {
      var that=this;
      antlinker.getAppVersion({
        success: function () {
          that.antFlag = true;
        },
        fail: function () {
          that.antFlag = false;
        }
      });
      this.icon = localStorage.getItem('icon');
      new Swiper('.bg-swiper', {
        //边缘后禁止抵抗无效resistanceRatio: 0,
        effect: 'fade',
        fadeEffect: {
          crossFade: false,
        }
      });
      new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }
      });

    },
    methods: {
      save() {
        var school = this.fschool || "";
        var fname = this.fname || "";
        html2canvas(document.getElementById('swiper-wrapper')).then(function (canvas) {
          console.log(canvas)
          var dataUrl = canvas.toDataURL();
          const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
          save_link.href = dataUrl;
          save_link.download = `${school}-${fname}.jpg`;

          const event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          save_link.dispatchEvent(event);
        });
      },
      share() {
        if (this.antFlag) {
          antlinker.sharePlatform({
            option: ['wechat','weshare','weibo','qq', 'qzone'],
            shareContent: {
              title: '通知书大变装…', // 分享标题
              desc: '通知书大变装…', // 分享描述
              link: '', // 分享链接
              id: 'default', // id
              type: 'cet46score', // 分享类型,music、video或link，不填默认为link
              dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
            },
            success: function () {
            },
            fail: function () {
              //window.location.href = 'http://www.antlinker.com/download/index.html'
            }
          })
        } else {
          window.location.href = 'http://www.antlinker.com/download/index.html'
        }
      }
    }
  }
</script>

<style scoped>
.none{
  display:none!important;
}
        #weixin-tip {
            display: block;
            position: fixed;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.8);
            filter: alpha(opacity=80);
            width: 100%;
            height: 100%;
            z-index: 100;
        }

        #weixin-tip p {
            text-align: center;
            margin-top: 50%;
            padding: 0 5%;
            position: relative;
        }
  .btn-b {
    bottom: 20px;
    margin: 10px auto;
    text-align: center;
  }

  .btn {
    background: #fdee21;
    border: none;
    width: 170px;
    height: 40px;
    margin: 6px;
    font-size: 16px;
    color: #f5a623;
  }

  .clearfix {
    float: none;
    clear: both;
  }

  .header {
    position: relative;
    width: 100%;
    height: auto;
  }

  .hd-c {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: auto;
    -moz-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -ms-background-size: 100% 100%;
  }

  .hd-c .banner {
    width: 100%;
    height: auto;
    position: relative;
    margin: 0 auto;
  }

  .banner .frame {
    position: absolute;
    top: 44.5%;
    left: 14.5%;
    width: 110px;
    z-index: 2;

  }

  .ab-font {
    position: absolute;
    font-size: 16px;
    color: #ffffff;
  }

  .ab2-name {
    font-size: 12px;
    top: 49%;
    left: 78%;
  }

  .ab2-school {
    top: 56.2%;
    left: 58%
  }

  .ab3-name {
    font-size: 20px;
    top: 9.5%;
    left: 25%;
    color: black;
  }

  .ab3-school {
    color: black;
    font-size: 20px;
    top: 15.5%;
    left: 53%;
  }

  .ab4-name {
    font-size: 18px;
    top: 35.5%;
    left: 44%;
    color: #74635B;
  }

  .ab4-school {
    font-size: 20px;
    top: 51.2%;
    left: 45%;
    color: #74635B;
  }

  .ab5-name {
    font-size: 20px;
    top: 24.3%;
    left: 46%;
    color: #5967B7;
  }

  .ab5-school {
    font-size: 20px;
    top: 28.3%;
    left: 42%;
    color: #5967B7;
  }

  .ab6-name {
    font-size: 12px;
    top: 49.5%;
    left: 16.7%;
    color: #F5E74F;
  }

  .ab6-school {
    font-size: 12px;
    top: 49.5%;
    left: 44.3%;
    color: #F5E74F;
  }

  .po2 .changing-over {
    width: 90px !important;
  }

  .po3 {
    top: 43.6% !important;
    left: 16.9%!important;
  }

  .po4 {
    top: 62px !important;
    left: 62% !important;
  }

  .po5 {
    top: 25.2% !important;
    left: 9% !important;
  }

  .po6 {
    top: 24.4% !important;
    left: 13.5%!important;
  }

  .banner .pic {
    position: relative;
    width: 100%;
    height: auto;
    text-align: center;
  }

  .banner .png-24 {
    _display: none;
    width: 100%;
    height: auto;
    margin: 0 auto;
  }

  .banner .frame .changing-over {
    float: left;
    margin: 1px 0 1px 1px;
     width: 90px;
    height: 125px;
    text-align: center
  }

  .box > img {
    width: 100px;
    position: absolute;
    top: 100px;
    left: 50px;
  }
</style>
