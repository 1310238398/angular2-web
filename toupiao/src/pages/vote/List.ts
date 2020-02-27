/*
 * create by lizan 2017/02/28
 * */
import { Component,AfterViewInit } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { ViewPage } from "./View";
@Component({
    selector: 'list-page',
    templateUrl: './List.html'
})

export class ListPage implements AfterViewInit{
    dataString = "";
    deadline = 0;//结束时间时间戳
    views;//访问量
    total;//总投票数量
    list;//投票信息列表

    constructor(private navCtrl: NavController, private http: HttpService) {


    }

    ngAfterViewInit() {
        setInterval(() => {
            var datestart = new Date();  //开始时间
            var date = this.deadline - datestart.getTime();
            if(date>=0){
                var days = Math.floor(date / (24 * 3600 * 1000));//天数
                //小时数
                var leave1 = date % (24 * 3600 * 1000)
                var hours = Math.floor(leave1 / (3600 * 1000))
                //分钟数量
                var leave2 = leave1 % (3600 * 1000)
                var minutes = Math.floor(leave2 / (60 * 1000))
                //秒数
                var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
                var seconds = Math.round(leave3 / 1000)
                this.dataString = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
            }else{
                this.dataString = "0天0小时0分0秒";
            }


        }, 1000);
    }


    toUrl(item){
       /*this.navCtrl.push(EditLessonPage);*/

    }

  ionViewWillEnter() {
        //更新访问记录
        this.http.postJSON({
            Router: '/api/vote',
            Method: 'POST',
            Body: {}
        }).then();

        //获得投票列表
        this.http.postJSON({
            Router: '/api/vote',
            Method: 'GET',
            Body: {}
        }).then(
            comments => {
                this.total = comments.total;
                this.list = comments.data;
            });
        //获取倒计时和访问量
        this.http.postJSON({
            Router: '/api/vote/param',
            Method: 'GET',
            Body: {}
        }).then(
            comments => {
                this.deadline = comments.Deadline;//倒计时
                this.views = comments.Views;//访问量
            });
    }
    toView(item){
        this.navCtrl.push(ViewPage, {vid: item.ID});
    }
}
