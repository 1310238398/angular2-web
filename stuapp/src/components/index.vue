<template>
  <div>
    <img class="index-bg" src="../assets/images/shouye.png">
    <div class="index">

      <div v-if="haveFile" class="header-bg">
        <img class="boxs" :src="fileUrl">
          <input type="file" name="file" @change="fileChange" accept="image/*">
      </div>
      <div v-if="!haveFile" class="icon">
        <a class="a-upload">
          <input type="file" name="file" @change="fileChange" accept="image/*">
        </a>
      </div>
      <div v-if="!haveFile" class="text-center des">请点击+上传照片</div>
      <div v-if="!haveFile" class="text-center des">建议上传免冠照片</div>
      <div class="input" style="margin-top: 10px">
        <input class="name"  v-model="fname" name="fname" maxLength='10' placeholder="请输入你的名字">
      </div>
      <div class="input">
        <input class="name" v-model="fschool" name="school" maxLength='10' placeholder="请输入你的大学">
      </div>

      <div class="go" v-on:click="generate()" v-bind:class="{ active: fileUrl&&fname&&fschool}">
        <div class="btn">马上生成</div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    name: 'index',
    data: function () {
      return {
        haveFile: false,
        fileUrl: '',
        fname: '',
        fschool: ''
      }
    },
    components: {},
    mounted: function () {
    },
    methods: {
      fileChange(event) {
        if (event) {
          this.haveFile = true;
          this.fileUrl = URL.createObjectURL(event.target.files[0]);
        }
      },
      generate() {
        localStorage.setItem('icon', this.fileUrl);
        localStorage.setItem('fname', this.fname);
        localStorage.setItem('fschool', this.fschool);
        if (this.fileUrl && this.fname && this.fschool) {
          this.$router.push('/display')
        }

      }
    }
  }
</script>

<style>
  .index-bg {
    width: 100%;
  }

  .text-center {
    text-align: center;
  }

  .des {
    margin-top: 6px;
    font-size: 16px;
    color:#7A7A7A;
  }

  .icon {
    text-align: center;
    left: 50%;
  }

  .icon img {
    width: 60px;
  }

  .header-bg {
    background: #faaf3b;
    position:relative;
    width: 90px;
    height: 125px;
    margin: auto;
  }

  .header-bg img {
    text-align: center;
    height: 125px;
    width: 90px;
  }
  .header-bg input{
    position:absolute;
    height: 125px;
    width: 90px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }

  .active {
    background: #fdee21 !important;
  }

  .active .btn {
    color: #f5a623 !important;
  }

  .input {
    margin-top: 16px;
    text-align: center;
  }
  .input:first-child{
    margin-top: 10px!important;
  }

  .input input {
    height: 25px;
    width: 170px;
    font-size: 15px;
    color: #feb949;
    letter-spacing: 0.61px;
    text-align: center;
  }

  /*a  upload */
  .a-upload {
    height: 50px;
    width: 50px;
    position: relative;
    background-image: url("../assets/images/add.png");
    overflow: hidden;
    display: inline-block;
  }

  .a-upload input {
    position: absolute;
    font-size: 100px;
    width: 100%;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }

  .go {
    margin: 20px auto;
    background: #d9d9d9;
    width: 250px;
    height: 40px;
    text-align: center;
  }

  .go .btn {
    font-size: 18px;
    line-height: 40px;
    color: #ffffff;
    letter-spacing: 0.74px;
  }
</style>
