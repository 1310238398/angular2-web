/**
 * Created by hanzhendong on 2016/11/29.
 */
import { Component } from '@angular/core';
import { HttpService } from "../../../http/http.Service";
import { ToastController, NavParams } from 'ionic-angular';
import { HelpUtils } from "../../../app/utils/HelpUtils";
import { NavController } from "ionic-angular";
import { AppService } from "../../../app/app.serve";
import { ClassregistPage } from "../professionalregist/classregist/Classregist";
import { ServelUrl } from "../../../app/ServelUrl";
import { SeachPersonPage } from "../seachperson/Seachperson";
@Component({
    selector: 'page-professionalregist',
    templateUrl: 'professionalregist.html'
})
export class ProfessionalrePage {
    item: any;
    listitems: any = [];
    campus = {
        CampusLogo: '',
        CheckinStatus: '',
        AcademyName: '',
        RecruitNum: '',
        ReportedNum: '',
        ReportedRate: ''
    }
    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
        private http: HttpService, public navCtrl: NavController, private appService:AppService) {
            appService.getMajorInfo(appService.getCurrentAcademy()).then(
                comments => {
                    this.campus = comments.Data || [];
                }
            );
            appService.getMajorQuery(appService.getCurrentAcademy()).then(
                comments => {
                    this.listitems = comments.Data || [];
                }
            );
        
            //定时任务
            const interval = setInterval(() => {
                appService.getMajorInfo(appService.getCurrentAcademy()).then(
                    comments => {
                        this.campus = comments.Data || [];
                    }
                );
                appService.getMajorQuery(appService.getCurrentAcademy()).then(
                    comments => {
                        this.listitems = comments.Data || [];
                    }
                );
                if (this.campus.CheckinStatus == '2') {
                    clearInterval(interval);
                    appService.getMajorInfo(appService.getCurrentAcademy()).then(
                        comments => {
                            this.campus = comments.Data || [];
                        }
                    );
                    appService.getMajorQuery(appService.getCurrentAcademy()).then(
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
    /*
   * 查询页面跳转班级
   * */
    NavigationTo(chat){
        this.appService.setCurrentMarjor(chat.MajorCode);
        this.navCtrl.push(ClassregistPage);
        
    }
    /*
* 查询页面跳转查询
* */
    navToSearch() {
        this.navCtrl.push(SeachPersonPage);
          localStorage.removeItem('searchQuery');
    }

}
