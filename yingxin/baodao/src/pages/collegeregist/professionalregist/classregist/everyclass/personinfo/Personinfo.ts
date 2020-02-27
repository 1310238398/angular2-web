/**
 * Created by hanzhendong on 2016/11/29.
 */
import { Component } from '@angular/core';
import { HttpService } from "../../../../../../http/http.Service";
import { ToastController, NavParams } from 'ionic-angular';
import { HelpUtils } from "../../../../../../app/utils/HelpUtils";
import { NavController } from "ionic-angular";
import { AppService } from "../../../../../../app/app.serve";
import { ServelUrl } from "../../../../../../app/ServelUrl";

@Component({
    selector: 'page-personinfo',
    templateUrl: 'personinfo.html'
})
export class PersoninfoPage {
   
    item: any = [];
    searchQuery:any;
    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
        private http: HttpService, public navCtrl: NavController,private appService:AppService) {
        //  this.item = params.data.his;
        // console.log(this.item);
        appService.getpersonQuery(appService.getCurrentPerson()).then(
                comments => {
                    this.item = comments.Data || [];
                   
                }
            );
        /*、
         * 调用jssdk
         *
         * */
        // let title: string = '';
        // if (this.item.Name === '') {
        //     err => console.log(err);
        // } else  {
        //     title = this.item.Name;
        // } 
        antlinker.configTitle({
            type: "label",
            title: '个人资料',
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
     
}
