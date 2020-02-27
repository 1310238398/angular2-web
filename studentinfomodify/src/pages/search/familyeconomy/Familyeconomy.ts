/*
 * create by hanzhendong 2016/11/27
 * */
import {Component} from '@angular/core';
import {ToastController} from 'ionic-angular';
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {NavController} from "ionic-angular";
import {ServelUrl} from "../../../app/ServelUrl";
import {HttpService} from "../../../http/http.Service";
import {InformationfillingPage} from "../Informationfilling";
import {FamilyAddressPage} from "../familyaddress/FamilyAddress";
import { AlertController } from 'ionic-angular';


@Component({
    selector: 'page-familyeconomy',
    templateUrl: 'familyeconomy.html'
})
export class FamilyeconomyPage {
    InformationFilling: any;
    reader;
    MemberTypes: any;
    title: any;
    loadingPop;
    item: any;
    FamilyAddress = {
        MemberName1:'',
        MemberTypeCode1: '',
        MemberWorkUnit1: '',
        MemberName2: '',
        MobilePhone1: '',
        MemberTypeCode2: '',
        MemberWorkUnit2: '',
        MobilePhone2: '',
    };

    Learning: any = [{StartDate: "", EndDate: "", School: "", Duties: "", Witness: "",}];
    RewardsAndPunishments: any = [{StartDate: "", EndDate: "", Details: "",}];

    constructor(public toastCtrl: ToastController, private HelpUtils: HelpUtils,
                public navCtrl: NavController, private http: HttpService,private alertCtrl: AlertController) {

        this.reader = new FileReader();
        //初始请求数据
        this.http.postJSON({
            Router: ServelUrl.Url.firstqueryone,
            Method: 'POST',
            Body: ''
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    if (comments.Data) {
                        this.FamilyAddress = comments.Data;
                        

                    }
                    // console.log( this.InformationFilling[0].Academy)

                }
            });
        /*、
         * 调用jssdk
         *
         * */
        antlinker.configTitle({
            type: "label",
            title: '信息填报',
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
        // 初始请求-标题
        this.http.postJSON({
            Router: ServelUrl.Url.firstquery,
            Method: 'POST',
            Body: ''
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    if (comments.Data) {
                        this.title = comments.Data;
                        console.log( this.title);
                      
                    }

                }
            });
        // 开户行
            this.http.postJSON({
                Router: ServelUrl.Url.bankyquery,
                Method: 'POST',
                Body:{CodeType:"MemberType"}
            }).then(
                comments => {
                    if (!comments.FeedbackCode) {
                        this.MemberTypes = comments.Data;
                    }
                });

    }

    onDetailPageTJ() {
        console.log(this.FamilyAddress);
        if (!this.FamilyAddress.MemberName1.trim()) {
            this.HelpUtils.toastPop('请填写监护人一姓名！');
            return;
        }
        if (!this.FamilyAddress.MemberTypeCode1) {
            this.HelpUtils.toastPop('请填写本人与监护人一关系！');
            return;
        }
        if (!this.FamilyAddress.MemberWorkUnit1.trim()) {
            this.HelpUtils.toastPop('请填写监护人一工作单位！');
            return;
        }
        if (!this.FamilyAddress.MobilePhone1.trim()) {
            this.HelpUtils.toastPop('请填写监护人一联系电话！');
            return;
        }
    
        this.loadingPop = this.HelpUtils.loadingPop('信息正在提交。。。。。');
        this.http.postJSON({
            Router: ServelUrl.Url.saveperson,
            Method: 'POST',
            Body:  {MemberName1:this.FamilyAddress.MemberName1,
                MemberTypeCode1:this.FamilyAddress.MemberTypeCode1,
                MemberWorkUnit1:this.FamilyAddress.MemberWorkUnit1,
                MobilePhone1:this.FamilyAddress.MobilePhone1,
                MemberName2:this.FamilyAddress.MemberName2,
                MemberTypeCode2:this.FamilyAddress.MemberTypeCode2,
                MemberWorkUnit2:this.FamilyAddress.MemberWorkUnit2,
                MobilePhone2:this.FamilyAddress.MobilePhone2,
                
            }
        }).then(
            comments => {
                this.loadingPop.dismiss();
                if (comments.FeedbackCode == '0') {
                    this.navCtrl.push(InformationfillingPage);
                } else {
                    this.HelpUtils.toastPop(`${comments.FeedbackText}`);
                }
            }
        )

    }


    onTopPage() {
        this.navCtrl.push(FamilyAddressPage);
    }
}
