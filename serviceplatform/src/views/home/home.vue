<template>
    <div class="home">
        <div class="fun mt">
            <div v-for="FType in FTypes" :key="FType.id">
                <div class="base_font mlt">{{FType.Name}}</div>
                <hr class="hr">
                <div class="fun-list" v-for="FItem in FType.FItems" :key="FItem.id" @click='openFun(FItem)'>
         <span class="fun-item">
        <img :src="FItem.FIconUrl||require('../../assets/images/defaulticon.png')" alt="">
        </span>
                    <div class="base-font font14 mlt">{{FItem.FName}}</div>
                </div>
            </div>
        </div>
                <linker></linker>
    </div>
</template>
<style lang='less'>
    @import url(./home.less);
</style>
<script>
    import axios from "axios";
    import util from '../../lib/util';
    import linker from '../../components/linker/linker';

    export default {
        name: "home",
        data() {
            return {
                baseUrl: '@/assets/images/defaulticon.png',
                isLoginMsg: false,
                url: "",
                FTypes: []
            };
        },
        components: {linker},
        methods: {
            getConfig() {
                axios
                    .post(
                        "/api/appsrv/interface",
                        JSON.stringify({
                            Router: "/app/client/config",
                            Method: "POST",
                            Body: JSON.stringify({
                                DEVICETYPE: "Web",
                                DEVICEID: 'Web',
                                VERSION: '1.1'
                            })
                        })
                    )
                    .then(res => {
                        //console.log('config', res);
                    });
            },
            getFunMore() {
                axios
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
                    });
            },
            dealFunc(FTypes = [], fidItems = []) {
                this.FTypes.forEach(fType => {
                    fType.FItems = [];
                    fidItems.forEach(item => {
                        fType.FIDS.forEach(fid => {
                            if (item.FID == fid) {
                                fType.FItems.push(item)
                            }
                        })
                    })
                })


            },
            openFun(item) {
                let config = JSON.parse(localStorage.getItem('config'));
                // console.log(util.getH5Url(config,item.URI))
                //  window.open(util.getH5Url(config,item.URI))
                window.open(`${window.location.protocol}//${window.location.host}/webport/#/main/view?title=${item.FName}&path=${item.URI}`);
                //this.$router.push({ path: 'view', query: { path: item.URI }});
            }
        },
        mounted() {
            this.getFunMore();
        }
    };
</script>
