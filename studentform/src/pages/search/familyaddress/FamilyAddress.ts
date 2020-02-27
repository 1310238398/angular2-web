/**
 * Created by hanzhendong on 2016/11/29.
 */
import {Component} from '@angular/core';
import {ToastController, NavParams} from 'ionic-angular';
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {NavController} from "ionic-angular";
import {ServelUrl} from "../../../app/ServelUrl";
import {HttpService} from "../../../http/http.Service";
 import {InformationfillingPage} from "../Informationfilling";
 import {PersonreponPage} from "../personrepon/Personrepon";


@Component({
    selector: 'page-familyaddress',
    templateUrl: 'familyaddress.html'
})
export class FamilyAddressPage {
   
    InformationFilling: any;
    reader;
    loadingPop;
    item: any;
    CityTypes: any;
    Provience: any;
    AddressT: any;
    NationTypes: any;
    AreaType: any;
    CampusTypes = {
        Campus: '',
        Logo: ''
    };
    FamilyAddress = {
        Nationality: '',
        OriginArea: '',
        Height: '',
        FamilyPhone: '',
        IdentityNum: '',
        OldSchool: '',
        OldDuties: '',
        NewFamilyAddress: '',
        ZipCode: ''
    };

    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
                 public navCtrl: NavController, private http: HttpService) {      
        this.reader = new FileReader();
           //初始请求数据
           this.http.postJSON({
            Router: ServelUrl.Url.querytwo,
            Method: 'POST',
            Body: ''
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.FamilyAddress = comments.Data[0];
                    // console.log( this.InformationFilling[0].Academy)
                    
                }
            });
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
        antlinker.configNavigationButton({
            type: ['more', 'close'],
            option: ["refresh"],
            buttonTitle: '更多',
            moreOption: ["refresh"],
            success: function () {
                // alert('success被调用');
                //设置右上角按钮成功
            },
            fail: function () {
                // alert('fail被调用');
                // 设置右上角按钮失败
            },
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

    ionViewDidEnter() {}

    ionViewWillLeave() {

    }


    onDetailPageTJ() {
        let FamilyAddressValue = this.FamilyAddress;
        console.log(this.FamilyAddress);
        if (!FamilyAddressValue.Nationality.trim()) {
            this.HelpUtils.toastPop('请填写民族！');
            return;
        }
        if (!FamilyAddressValue.OriginArea.trim()) {
            this.HelpUtils.toastPop('请填写籍贯！');
            return;
        }
        if (!FamilyAddressValue.Height.trim()) {
            this.HelpUtils.toastPop('请填写身高！');
            return;
        }
        if (!FamilyAddressValue.IdentityNum.trim()) {
            this.HelpUtils.toastPop('请填写身份证号！');
            return;
        }
        var myreegs = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/;
        if (FamilyAddressValue.IdentityNum !== "") {
            if (!myreegs.test(FamilyAddressValue.IdentityNum)) {
                this.HelpUtils.toastPop('请填写正确的身份证号！');
                return;
            }

        }
        if (!FamilyAddressValue.OldSchool.trim()) {
            this.HelpUtils.toastPop('请填写原毕业学校！');
            return;
        }
        if (!FamilyAddressValue.OldDuties.trim()) {
            this.HelpUtils.toastPop('请填写曾担任职务！');
            return;
        }
        if (!FamilyAddressValue.NewFamilyAddress.trim()) {
            this.HelpUtils.toastPop('请填写现家庭地址！');
            return;
        }
        if (!FamilyAddressValue.ZipCode.trim()) {
            this.HelpUtils.toastPop('请填写邮编！');
            return;
        }
        this.loadingPop = this.HelpUtils.loadingPop('信息正在提交。。。。。');
        
        this.http.postJSON({
            Router: ServelUrl.Url.savetwo,
            Method: 'POST',
            Body:  this.FamilyAddress
            
        }).then(
            comments => {
                this.loadingPop.dismiss();
                if (comments.FeedbackCode == '0') {
                    this.navCtrl.push(PersonreponPage);
                } else {
                    this.HelpUtils.toastPop(`${comments.FeedbackText}`);
                }
            }
            )


    }


    onTopPage(){
        this.navCtrl.push(InformationfillingPage);
    }
}
