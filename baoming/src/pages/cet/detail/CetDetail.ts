import { Component } from "@angular/core";
import { HelpUtils } from "../../../app/utils/HelpUtils";
import { HttpService } from "../../../http/http.Service";
import { NavParams, NavController } from 'ionic-angular';
import { ServelUrl } from "../../../app/ServelUrl";
import { CetApply } from "../CetApply";
/**
 * Created by hanzhendong on 2017/2/28.
 */
@Component({
    selector: 'page-CetDetail',
    templateUrl: './CetDetail.html'
})
export class CetDetail {
    private UserInfo;
    private loadingPop;
    private ApproveStatus;

    constructor(private http: HttpService, private HelpUtils: HelpUtils, private params: NavParams, private navCtrl: NavController) {
        this.ApproveStatus = this.params.get('CetStatus');
        if (this.ApproveStatus != 3) {
            this.http.postJSON({
                Router: ServelUrl.Url.querystudentcetmessage,
                Method: 'POST',
                Body: {}
            }).then(
                comments => {
                  antlinker.configTitleButton({
                    type: 'back',
                    text: '关闭',
                    fail: function () {

                    },
                    success: function () {
                    },
                    trigger: function () {
                    }

                  });
                    if (!comments.FeedbackCode) {
                        this.UserInfo = comments.Data;
                    }
                });
        }

    }

    ionViewDidEnter() {
        antlinker.configTitle({
            type: "label",
            title: '报名',
            fail: function () {

            },
            success: function () {
            }
        });
        antlinker.configTitleButton({
            type: 'close',
            text: '关闭',
            fail: function () {

            },
            success: function () {
            },
            trigger: function () {
            }

        });
    }

    uploadFile(event): void {
        let file =event.target.files[0];
        if (!file) {
            this.HelpUtils.toastPop('请上传头像！');
            return;
        }
        if (file.type != 'image/jpeg') {
            this.HelpUtils.toastPop('照片需为.jpg格式！');
            return;
        }
        if (file.size / 1024 >= 500) {
            this.HelpUtils.toastPop('照片不大于500K！');
            return;
        }
        this.loadingPop = this.HelpUtils.loadingPop('照片正在提交。。。。。');
        var formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('router', ServelUrl.Url.dostudentcetsignup);
        formData.append('Body', '');
        this.http.postFormData(formData, (comments) => {
            this.loadingPop.dismiss();
            if (!comments.FeedbackCode) {
                this.HelpUtils.presentAlert({
                    subTitle: '照片上传成功',
                    buttons: [{
                        text: '确定', role: 'cancel', handler: () => {
                            let reader = new FileReader();
                            reader.onload = () => {
                                this.UserInfo.URL = reader.result;
                                this.ApproveStatus = 0;
                            };
                            reader.readAsDataURL(file);
                        }
                    }]
                });
            } else {
                this.HelpUtils.toastPop(`${comments.FeedbackText}`);
            }
        })
    }

    doRefresh(refresher) {
        //this.getCount();
        this.http.postJSON({
            Router: ServelUrl.Url.checkstudentcetsignupstatus,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    if (comments.Data == 3) {
                        this.navCtrl.push(CetApply);
                        return;
                    }
                    this.ApproveStatus = comments.Data;
                    refresher.complete();
                }
            });
    }
}
