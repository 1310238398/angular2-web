
import { Component } from '@angular/core';
import { NavController,NavParams,AlertController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { OptData } from "../../../app/service/OptData";
import { ListPage } from "../List";
@Component({
    selector: 'page-OptPage',
    templateUrl: 'OptPage.html'
})
export class OptPage {
    item = {IntelUserCode:'',Name:''}
    xlist: Array<any> = [];

    constructor(public navCtrl: NavController,private params: NavParams, private http: HttpService,private optdata :OptData,private alertCtrl: AlertController ) {

        this.item = JSON.parse(params.get('id'));
        var name = this.item.Name;
        antlinker.configTitle({
            type: "label",
            title: name,
            fail: function () {

            },
            success: function () {
            }
        });



        this.xlist = optdata.getsubData();

    }
    Toxh(x,i){
        i=i+1;
        x.score = i;
        for(var j = 0;j<x.option.length;j++) {
            x.option[j].isOn = false;
            if(i>=x.option[j].xh) {
                x.option[j].isOn = true;
            }
        }

    }
    SubBtn(){//提交分数
        var arr = [];
        var flag = true;
        for(var i = 0;i<this.xlist.length;i++){
            var value = this.xlist[i];
            if(value.score>0) {
                var obj = {DetailID: value.id, Result: value.score};
                arr.push(obj);
            }else{
                this.alertCtrl.create({
                    title: '提示',
                    subTitle: "请为第"+value.id+"题打分",
                    buttons: ['确定']
                }).present();
                flag = false;
                break;
            }
        }
        if(flag) {
            this.http.postJSON({
                Router: ServelUrl.Url.saveinstructor,
                Method: 'POST',
                Body: {IntelUserCode:this.item.IntelUserCode,Survey: "COUNSELOR_EVALUATION", EvaluationResult: arr}
            }).then(
                comments => {
                    if (!comments.FeedbackCode) {
                        this.alertCtrl.create({
                            title: '提示',
                            subTitle: "您已评分完成",
                            buttons: ['确定']
                        }).present();
                        this.navCtrl.push(ListPage);
                    }else if(comments.FeedbackCode == "2"){
                        this.alertCtrl.create({
                            title: '提示',
                            subTitle: "该辅导员已经测评完毕,请勿重新提交",
                            buttons: ['确定']
                        }).present();
                        this.navCtrl.push(ListPage);
                    }
                });
        }
    }
}