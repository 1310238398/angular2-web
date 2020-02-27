/**
 * Created by hanzhendong on 2016/11/29.
 */
import { Component } from '@angular/core';
import { HttpService } from "../../../../../http/http.Service";
import { ToastController, NavParams } from 'ionic-angular';
import { HelpUtils } from "../../../../../app/utils/HelpUtils";
import { NavController } from "ionic-angular";
import { AppService } from "../../../../../app/app.serve";
import { ServelUrl } from "../../../../../app/ServelUrl";
import { PersoninfoPage } from "../../../professionalregist/classregist/everyclass/personinfo/Personinfo";
import { SeachPersonPage } from "../../../seachperson/Seachperson";
@Component({
    selector: 'page-eveyclass',
    templateUrl: 'everyclass.html'
})
export class EveryclassPage {
   
    listitems: any = [];
    items: any = [];
    class={
        CheckInNum:'',
        Class:'',
        UnCheckInNum:'',
    };
 pet: string = "puppies";
    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
        private http: HttpService, public navCtrl: NavController,private appServe:AppService) {
        appServe.getClassnoe(appServe.getCurrentClassone()).then(
            comments=> {
                if(comments.Data){
                    this.listitems = comments.Data.Info || [];
                     this.class =comments.Data;
                }
                   
                }
        )
            appServe.getClassone(appServe.getCurrentClassone()).then(
            comments=> {
                if(comments.Data){
                    this.items = comments.Data.Info || [];
                     this.class =comments.Data;
                }
                    
                    // this.items = comments.Data.Info || [];
                }
        )
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
          this.appServe.setCurrentPerson(chat.UserID);
          this.navCtrl.push(PersoninfoPage);
          
        // this.navCtrl.push(PersoninfoPage,{'his':chat});
    }
   /*
* 查询页面跳转查询
* */
    navToSearch() {
         
        this.navCtrl.push(SeachPersonPage);
          localStorage.removeItem('searchQuery');
    }

}
