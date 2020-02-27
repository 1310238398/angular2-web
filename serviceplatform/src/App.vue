<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="less">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .ivu-card-bordered {
        box-shadow: 0 5px 4px 0 rgba(216, 216, 216, 0.3) !important;
    }

    body {
        font-family: PingFangSC-Regular;
        color: #666666;
        background: #ECEFF7;
        letter-spacing: 0.17px;
    }

    .base_font {
        font-family: PingFangSC-Regular;
        color: #666666;
        letter-spacing: 0.17px;
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
