
import { Component } from '@angular/core';
import { HttpService } from "../../../../http/http.Service";
import { ToastController, NavParams } from 'ionic-angular';
import { HelpUtils } from "../../../../app/utils/HelpUtils";
import { NavController } from "ionic-angular";
import { AppService } from "../../../../app/app.serve";
import { ServelUrl } from "../../../../app/ServelUrl";
import { EveryclassPage } from "../../professionalregist/classregist/everyclass/Everyclass";
import { SeachPersonPage } from "../../seachperson/Seachperson";
@Component({
    selector: 'page-classregist',
    templateUrl: 'classregist.html'
})
export class ClassregistPage {
    item: any;
    listitems: any = [];
    campus = {
        CampusLogo: '',
        CheckinStatus: '',
        MajorName: '',
        RecruitNum: '',
        ReportedNum: '',
        ReportedRate: ''
    }
    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
        private http: HttpService, public navCtrl: NavController,private appService:AppService) {
        // this.item = params.data.chat;
        appService.getClassInfo(appService.getCurrentMajot()).then(
                comments => {
                    this.campus = comments.Data || [];
                }
            );
            appService.getClassQuery(appService.getCurrentMajot()).then(
                comments => {
                    this.listitems = comments.Data || [];
                }
            );
        
            //定时任务
            const intval = setInterval(() => {
                appService.getClassInfo(appService.getCurrentMajot()).then(
                    comments => {
                        this.campus = comments.Data || [];
                    }
                );
                appService.getClassQuery(appService.getCurrentMajot()).then(
                    comments => {
                        this.listitems = comments.Data || [];
                    }
                );
                if (this.campus.CheckinStatus == "2") {
                    clearInterval(intval);
                    appService.getClassInfo(appService.getCurrentMajot()).then(
                        comments => {
                            this.campus = comments.Data || [];
                        }
                    );
                    appService.getClassQuery(appService.getCurrentMajot()).then(
                        comments => {
                            this.listitems = comments.Data || [];
                        }
                    );

                }
            }, 5000);
        /*、
         * 调用jssdk
         *
         * */
        antlinker.configTitle({
            type: "label",
            title: '报到实时情况',
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

    NavigationTo(chat){
        this.appService.setCurrentClassnoe(chat.ClassCode);
        this.navCtrl.push(EveryclassPage);
         
    }

    /*
* 查询页面跳转查询
* */
    navToSearch() {
        this.navCtrl.push(SeachPersonPage);
         localStorage.removeItem('searchQuery');
    }

}
