/*
 * create by lizan 2017/02/28
 * */
import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../app/ServelUrl";
import { HttpService } from "../http/http.Service";
import { ListPage } from "./vote/List";

@Component({
    selector: 'page-index',
    templateUrl: './Index.html'
})
export class IndexPage {
    constructor(private navCtrl: NavController, private http: HttpService) {
        antlinker.configTitle({
            type: "label",
            title: "创业大赛投票",
            fail: function () {

            },
            success: function () {
            }
        });

    }
    toUrl(){
       this.navCtrl.push(ListPage);
    }
    ionViewWillEnter() {
        var optionstr = ["weshare"];
        //设置右上角按钮
        antlinker.configTitleButton({
            type: "share",
            option: optionstr, // 这是一组最大值，原生可以根据用户的不同减小这一组值
            shareContent: {
                title: '创业大赛投票', // 分享标题
                desc: '创业大赛投票', // 分享描述
                link: '', // 分享链接
                id: 'default', // id
                type: 'cydsvote', // 分享类型,music、video或link，不填默认为link
                dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
            },
            success: function () {//设置右上角按钮成功
            },
            fail: function () {//设置右上角按钮失败
            }
        });
    }

}
