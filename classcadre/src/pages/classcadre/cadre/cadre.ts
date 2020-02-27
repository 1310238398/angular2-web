import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CadreService } from '../../cadre.service';
import { HelpUtils } from '../../../app/utils/HelpUtils';
@IonicPage(
    {
        name: 'page-cadre',
        segment: 'cadre/:ClassCode'
    }
)
@Component({
    selector: 'page-cadre',
    templateUrl: 'cadre.html'
})
export class CadrePage {
    cadreData = [];
    classCode = '';
    className = '';
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public cadreService: CadreService,
        public helpUtil: HelpUtils) {

    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter');
        this.classCode = this.navParams.get('ClassCode') || '';
        console.log('classcode--' + this.classCode);
        if (this.classCode) {
            this.getClassName(this.classCode);
            this.getClassCadre(this.classCode);
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad IndexPage');
    }

    ionViewDidEnter() {
        antlinker.configTitle({
            type: "label",
            title: '班委管理',
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

    // 获取班级干部及人员
    getClassName(code: string): void {
        this.cadreService.queryClassName(code).then(res => {
            if (res.FeedbackCode === 0) {
                this.className = res.Data.ClassName || '';
            } else {
                this.helpUtil.toastPop(res.FeedbackText);
            }
        });
    }

    // 获取班级干部及人员
    getClassCadre(code: string): void {
        this.cadreService.queryClassCadre(code).then(res => {
            console.log('11');
            if (res.FeedbackCode === 0) {
                this.cadreData = res.Data;
                console.log('22' + this.cadreData);
            } else {
                this.cadreData = [];
                this.helpUtil.toastPop(res.FeedbackText);
            }
        })
    }


    // 违纪登记
    setCadre(cadre: any) {
        this.navCtrl.push('page-student', {
            classcode: this.classCode,
            duty: cadre.Code,
            uids: cadre.IntelUserCodes
        });
    }
}