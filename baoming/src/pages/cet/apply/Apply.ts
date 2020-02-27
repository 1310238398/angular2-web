import { Component } from "@angular/core";
import { HelpUtils } from "../../../app/utils/HelpUtils";
import { HttpService } from "../../../http/http.Service";
import { NavParams, NavController } from 'ionic-angular';
import { ServelUrl } from "../../../app/ServelUrl";
import { CetDetail } from "../detail/CetDetail";
/**
 * Created by hanzhendong on 2017/2/28.
 */
@Component({
    selector: 'page-Apply',
    templateUrl: './Apply.html'
})
export class Apply {
    private CetApply;
    private UserInfo;
    private imgsrc;
    private loadingPop;

    constructor(private http: HttpService, private HelpUtils: HelpUtils, private params: NavParams, private navCtrl: NavController) {
        this.CetApply = this.params.get('CetApply');
        this.http.postJSON({
            Router: ServelUrl.Url.querystudentcetmessage,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.UserInfo = comments.Data;
                }
            });
        let reader = new FileReader();
        reader.onload = () => {
            this.imgsrc = reader.result;
        };
        reader.readAsDataURL(this.CetApply.file);
    }

    ionViewDidEnter() {
        antlinker.configTitle({
            type: "label",
            title: '信息确认',
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

    /*   ionViewWillLeave() {
     localStorage.setItem('CetApply', JSON.stringify(this.CetApply));
     }*/

    onInfoEorr() {
       /* this.HelpUtils.presentAlert({
            subTitle: `闫红桥  <a href="tel:0531－89655070">0531－89655070</a>（济南）<br>李  丹  <a href="tel:0633－8779117">0633－8779117</a>（日照）`,
            buttons: [{
                text: '我知道了', role: 'cancel'
            }]
        });*/
           this.http.postJSON({
         Router: ServelUrl.Url.querycetcontactteacherbycampus,
         Method: 'POST',
         Body: {}
         }).then(
         comments => {
         if (!comments.FeedbackCode) {
         this.HelpUtils.presentAlert({
         subTitle: `请联系${comments.Data.Name || ''}老师（<a>${comments.Data.Phone || ''}</a>）<br>`,
         buttons: [{
         text: '拨打电话', role: 'cancel', handler: () => {
         this.HelpUtils.callUp(comments.Data)
         },

         },{
         text: '我知道了', role: 'cancel'
         }]
         })
         }
         });

    }


    onSign() {
        this.loadingPop = this.HelpUtils.loadingPop('报名正在提交。。。。。');
        var formData = new FormData();
        formData.append('file', this.CetApply.file, this.CetApply.file.name);
        formData.append('router', ServelUrl.Url.dostudentcetsignup);
        formData.append('Body', JSON.stringify({ExamSubject: this.CetApply.ExamSubject.Code}));
        this.http.postFormData(formData, (comments) => {
            this.loadingPop.dismiss();
            if (!comments.FeedbackCode) {
                this.HelpUtils.presentAlert({
                    subTitle: '您的报名申请已提交，请等<br/>待审批。',
                    buttons: [{
                        text: '确定', role: 'cancel', handler: () => {
                            this.navCtrl.push(CetDetail, {CetStatus: 0});
                        }
                    }]
                });
            } else {
                this.HelpUtils.toastPop(`${comments.FeedbackText}`);
            }
        })
    }

}
