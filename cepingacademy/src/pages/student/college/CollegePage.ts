import { Component } from '@angular/core';
import { NavController, AlertController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { ColData } from "../../../app/service/ColData";
import { HelpUtils } from "../../../app/utils/HelpUtils";

declare var antlinker;

@Component({
    selector: 'page-collegegage',
    templateUrl: 'CollegePage.html'
})
export class CollegePage {

    iscol = ''
    xlist: Array<any> = [];

    constructor(public navCtrl: NavController, private http: HttpService, private coldata: ColData, private alertCtrl: AlertController, private HelpUtils: HelpUtils) { }

    ionViewWillEnter() {
        antlinker.configTitleButton({
            type: 'close',
            text: '关闭',
            fail: function () { },
            success: function () { },
            trigger: function () { }
        });
        
    }

    ionViewDidEnter(){
        this.academyIsDo()
    }

    // 是否做了学院测评
    academyIsDo() {
        this.http.postJSON({
            Router: ServelUrl.Url.checkacademy,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.iscol = '0';
                this.getAcademyName();
                this.getQuestion();
                //this.alertMessage();
            } else {
                this.iscol = '1';
                this.HelpUtils.toastPopTop('测评已完成');
                const that = this;
                setTimeout(function () {
                    antlinker.closeView({
                        success: function () { },
                        fail: function () { }
                    });
                }, 1200);
            }
        });
    }

    //提示信息
    alertMessage() {
        let confirm = this.alertCtrl.create({
            title: '提示',
            message: '测评业务均为匿名操作，学校会对每个学生的测评情况严格保密。<br><br>请同学们认真、公正、客观的填写。',
            buttons: [
                {
                    text: '我知道了',
                    handler: () => {}
                },
            ]
        });
        confirm.present();
    }

    // 获取学院名称
    getAcademyName() {
        this.http.postJSON({
            Router: ServelUrl.Url.queryacademy,
            Method: 'POST',
            Body: {}
        }).then(comments => {
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

    //获取问题列表
    getQuestion() {
        this.http.postJSON({
            Router: ServelUrl.Url.getquestionnaire,
            Method: 'POST',
            Body: {
                type: 'ACADEMY_EVALUATION'
            }
        }).then(comments => {
            if (!comments.FeedbackCode) {
                this.xlist = comments.data
                for (var i = 0; i < this.xlist.length; i++) {
                    this.xlist[i]['score'] = 0;
                    this.xlist[i]['option'] = [{ xh: 1, isOn: false }, { xh: 2, isOn: false }, { xh: 3, isOn: false }, { xh: 4, isOn: false }, { xh: 5, isOn: false }]
                }
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

    //提交分数
    SubBtn() {
        var arr = [];
        var flag = true;
        for (var i = 0; i < this.xlist.length; i++) {
            var value = this.xlist[i];
            if (value.score > 0) {
                var obj = { DetailID: value.id, Result: value.score * value.weight };
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
                        this.HelpUtils.toastPopTop('测评已完成');
                        const that = this;
                        setTimeout(function () {
                            antlinker.closeView({
                                success: function () { },
                                fail: function () { }
                            });
                        }, 1200);
                    } else if (comments.FeedbackCode == "2") {
                        this.alertCtrl.create({
                            title: '提示',
                            subTitle: "该学院已经测评完毕,请勿重新提交",
                            buttons: ['确定']
                        }).present();
                        antlinker.closeView({
                            success: function () { },
                            fail: function () { }
                        });
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