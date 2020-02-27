import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { InstructorPage } from "./InstructorPage";
import { ListPage } from "../List";
declare var antlinker;
@Component({
    selector: 'page-OptPage',
    templateUrl: 'OptPage.html'
})
export class OptPage {
    item = { IntelUserCode: '', Name: '' }
    xlist: Array<any> = [];

    constructor(public navCtrl: NavController, private params: NavParams, private http: HttpService, private alertCtrl: AlertController) {
        this.item = JSON.parse(params.get('id'));
        var name = this.item.Name;
        antlinker.configTitle({
            type: "label",
            title: name,
            fail: function () { },
            success: function () { }
        });

        this.getQuestion();
    }

    getQuestion() {
        this.http.postJSON({
            Router: ServelUrl.Url.getquestionnaire,
            Method: 'POST',
            Body: {}
        }).then(comments => {
            if (!comments.FeedbackCode) {
                this.xlist = comments.data
                for (var i = 0; i < this.xlist.length; i++) {
                    this.xlist[i]['score'] = 0;
                    this.xlist[i]['option'] = [{xh:1,isOn:false},{xh:2,isOn:false},{xh:3,isOn:false},{xh:4,isOn:false},{xh:5,isOn:false},{xh:6,isOn:false},{xh:7,isOn:false},{xh:8,isOn:false},{xh:9,isOn:false},{xh:10,isOn:false}]
                }
            }
        });
    }

    //计算得分
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
                Body: { IntelUserCode: this.item.IntelUserCode, Survey: "COUNSELOR_EVALUATION", EvaluationResult: arr }
            }).then(comments => {
                if (!comments.FeedbackCode) {
                    this.alertCtrl.create({
                        title: '提示',
                        subTitle: "您已评分完成",
                        buttons: ['确定']
                    }).present();
                    // this.navCtrl.push(ListPage);
                    location.href = 'wc/index.html'
                } else if (comments.FeedbackCode == "2") {
                    this.alertCtrl.create({
                        title: '提示',
                        subTitle: "该辅导员已经测评完毕,请勿重新提交",
                        buttons: ['确定']
                    }).present();
                    //this.navCtrl.push(ListPage);
                    location.href = 'wc/index.html'
                }
            });
        }
    }

    //测评提示
    ionViewDidEnter() {
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
        const that = this;
        antlinker.configTitleButton({
            showClose: true,
            type: "label",
            text: "测评说明",
            success: function () {
            },
            fail: function () {
            },
            trigger: function () {
                that.navCtrl.push(InstructorPage);
            }
        });
    }
    //离开页面取消遮罩
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

    ionViewDidLeave() {
        antlinker.configTitleButton({
            showClose: false,
            type: "label",
            text: "",
            success: function () { },
            fail: function () { },
            trigger: function () { }
        });
    }
}