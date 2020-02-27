/**
 * Created by lizan on 17/2/10.
 */
import { Component } from '@angular/core';
import { NavController, AlertController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { ColData } from "../../../app/service/ColData";
import { ExplainPage } from "./ExplainPage";
import { ListPage } from "../List";
declare var antlinker;
@Component({
    selector: 'page-collegegage',
    templateUrl: 'CollegePage.html'
})
export class CollegePage {
    xlist: Array<any> = [];

    constructor(public navCtrl: NavController, private http: HttpService, private coldata: ColData, private alertCtrl: AlertController) {
        this.xlist = coldata.getsubData();
        this.http.postJSON({
            Router: ServelUrl.Url.queryacademy,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    antlinker.configTitle({//设置app标题栏
                        type: "label",
                        title: comments.Data[0].AcademyName,
                        fail: function () {

                        },
                        success: function () {
                        }
                    });
                }
            });

    }
    ngOnInit() {
        /**
        * 获取学院名称
        */



        let confirm = this.alertCtrl.create({
            title: '提示',
            message: '测评业务均为匿名操作，学校会对每个学生的测评结果严格保密。<br><br>请同学们认真、公正、客观的填写。',
            buttons: [
                {
                    text: '我知道了',
                    handler: () => {

                    }
                },
            ]
        });
        confirm.present();
        // 右上角按钮
        var that = this;
        antlinker.configTitleButton({
            showClose: true,
            type: "label",
            text: "测评说明",
            success: function () {
            },
            fail: function () {

            },
            trigger: function () {
                that.navCtrl.push(ExplainPage);
            }
        });


    }
    Toxh(x, i) {
        i = i + 1;
        x.score = i;
        for (var j = 0; j < x.option.length; j++) {
            x.option[j].isOn = false;
            if (i >= x.option[j].xh) {
                x.option[j].isOn = true;
            }
        }

    }

    SubBtn() {//提交分数
        var arr = [];
        var flag = true;
        for (var i = 0; i < this.xlist.length; i++) {
            var value = this.xlist[i];
            if (value.score > 0) {
                var obj = { DetailID: value.id, Result: value.score };
                arr.push(obj);
            } else {
                this.alertCtrl.create({
                    title: '提示',
                    subTitle: "请为第" + value.id + "题打分",
                    buttons: ['确定']
                }).present();
                flag = false;
                break;
            }
        }
        if (flag) {
            this.http.postJSON({
                Router: ServelUrl.Url.saveinstructor,
                Method: 'POST',
                Body: { IntelUserCode: "", Survey: "ACADEMY_EVALUATION", EvaluationResult: arr }
            }).then(
                comments => {
                    if (!comments.FeedbackCode) {
                        this.alertCtrl.create({
                            title: '提示',
                            subTitle: "您已评分完成",
                            buttons: ['确定']
                        }).present();
                        this.navCtrl.push(ListPage);
                    } else if (comments.FeedbackCode == "2") {
                        this.alertCtrl.create({
                            title: '提示',
                            subTitle: "该学院已经测评完毕,请勿重新提交",
                            buttons: ['确定']
                        }).present();
                        this.navCtrl.push(ListPage);
                    }
                });
        }
    }
    ionViewWillLeave() {
        var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        var d = document.querySelector('ion-backdrop');
        if (d) {
            d.dispatchEvent(event)
        }

    }

}