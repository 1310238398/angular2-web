/*
 * create by hanzhendong 2016/11/27
 * */
import {Component} from '@angular/core';
import {ToastController, NavParams} from 'ionic-angular';
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {NavController} from "ionic-angular";
import {HttpService} from "../../../http/http.Service";
import {InformationfillingPage} from '../Informationfilling';


@Component({
    selector: 'page-successfull',
    templateUrl: 'successfull.html'
})
export class SuccessfullPage {
    

    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
                 public navCtrl: NavController, private http: HttpService) {

        
        // this.InformationFilling = this.params.get('InformationFilling');

        /*、
         * 调用jssdk
         *
         * */
        antlinker.configTitle({
            type: "label",
            title: '学籍信息采集',
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
            // trigger: function () {
            // }

        });
    }




    onDetailPage() {   
                this.navCtrl.push(InformationfillingPage);
    }
}
