/**
 * Created by hanzhendong on 2016/11/29.
 */
import {Component} from '@angular/core';
import {ToastController, NavParams} from 'ionic-angular';
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {NavController} from "ionic-angular";
import {ServelUrl} from "../../../app/ServelUrl";
import {HttpService} from "../../../http/http.Service";
import {FamilyeconomyPage} from "../familyeconomy/Familyeconomy";
import {PersonreponPage} from "../personrepon/Personrepon";
import {AppService} from "../../../app/app.service";
import {ProvincePage} from "./province/Province";

@Component({
    selector: 'page-familyaddress',
    templateUrl: 'familyaddress.html'
})
export class FamilyAddressPage {

    InformationFilling: any;
    InfoSets = new Set();
    reader;
    loadingPop;
    item: any;
    title: any;
    Ruerybank: any;
    CityTypes: any;
    Provience: any;
    AddressT: any;
    NationTypes: any;
    AreaType: any;
    CampusTypes = {
        Campus: '',
        Logo: ''
    };
    studencode: any;
    HomeCity: any;
    FamilyAddress = {
        StudentAreaName: '',
        Email: '',
        BankCardNumber: '',
        AccountBankCode: '',
        QQAcct: '',
        StudentAreaCode: '',
        PostCode: '',
        FamilyAddressName: '',
        FamilyAddress: '',
        DetailAddress: '',
        HomePhone: '',
    };

    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
                public navCtrl: NavController, private http: HttpService, private appService: AppService,) {

        if (this.appService.getCurrentParentPage() == 'FamilyAddressPage') {
            console.log(this.appService.getCurrentProvince())
            if (this.appService.getCurrentProvince() !== undefined && this.appService.getCurrentCity() !== undefined && this.appService.getCurrentCounty() !== undefined) {
                if (localStorage.getItem('currentCode') == 'StudentAreaName') {
                    this.FamilyAddress.StudentAreaName = this.appService.getCurrentProvince().GeographyName
                        + this.appService.getCurrentCity().GeographyName + this.appService.getCurrentCounty().GeographyName;
                    localStorage.setItem('StudentAreaName',this.FamilyAddress.StudentAreaName);
                }
                if (localStorage.getItem('currentCode') == 'FamilyAddressName') {
                    this.FamilyAddress.FamilyAddressName = this.appService.getCurrentProvince().GeographyName
                        + this.appService.getCurrentCity().GeographyName + this.appService.getCurrentCounty().GeographyName;
                    localStorage.setItem('FamilyAddressName',this.FamilyAddress.FamilyAddressName);
                }
                if (this.appService.getCurrentCounty() !== undefined) {
                    if (localStorage.getItem('currentCode') == 'StudentAreaName') {
                        this.FamilyAddress.StudentAreaCode = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
                        localStorage.setItem('StudentAreaCode',this.FamilyAddress.StudentAreaCode)
                    }
                    if (localStorage.getItem('currentCode') == 'FamilyAddressName') {
                        this.FamilyAddress.FamilyAddress = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
                        localStorage.setItem('FamilyAddress',this.FamilyAddress.FamilyAddress);
                    }
                } else {
                        this.FamilyAddress.StudentAreaCode = JSON.parse(this.FamilyAddress.StudentAreaCode).toString();
                        this.FamilyAddress.FamilyAddress = JSON.parse(this.FamilyAddress.FamilyAddress).toString();
                }
                console.log(this.FamilyAddress)
            }
        }

        this.reader = new FileReader();

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
                        console.log(this.title);

                    }

                }
            });
        // 开户行
        this.http.postJSON({
            Router: ServelUrl.Url.bankyquery,
            Method: 'POST',
            Body: {CodeType: "OpenBank"}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.Ruerybank = comments.Data;
                }
            });

    }

    ionViewDidEnter() {
        this.http.postJSON({
            Router: ServelUrl.Url.querysystemvalue,
            Method: 'POST',
            Body: {
                Name: 'InfoDisabled',
                Type: 'studentinfomodify',
                Group: 'studentinfo',
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.InfoSets = new Set(res.Data.split(','));
            }
        });
        //初始请求数据
        this.http.postJSON({
            Router: ServelUrl.Url.firstqueryone,
            Method: 'POST',
            Body: ''
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.FamilyAddress = comments.Data;
                    if (this.appService.getCurrentParentPage() == 'FamilyAddressPage') {
                        if (this.appService.getCurrentProvince() !== undefined && this.appService.getCurrentCity() !== undefined && this.appService.getCurrentCounty() !== undefined) {
                            if (localStorage.getItem('currentCode') == 'StudentAreaName') {
                                this.FamilyAddress.StudentAreaName = this.appService.getCurrentProvince().GeographyName + this.appService.getCurrentCity().GeographyName + this.appService.getCurrentCounty().GeographyName;
                                var StudentAreaCode = this.FamilyAddress.StudentAreaCode;
                                this.FamilyAddress.StudentAreaCode = StudentAreaCode;
                                this.FamilyAddress.FamilyAddress = localStorage.getItem('FamilyAddress')||"";
                                this.FamilyAddress.FamilyAddressName = localStorage.getItem('FamilyAddressName')||"";
                            }
                            if (localStorage.getItem('currentCode') == 'FamilyAddressName') {
                                this.FamilyAddress.FamilyAddressName = this.appService.getCurrentProvince().GeographyName + this.appService.getCurrentCity().GeographyName + this.appService.getCurrentCounty().GeographyName;
                                this.FamilyAddress.StudentAreaCode = localStorage.getItem('StudentAreaCode')||"";
                                this.FamilyAddress.StudentAreaName = localStorage.getItem('StudentAreaName')||"";
                                var FamilyAddress = this.FamilyAddress.FamilyAddress||"";
                                this.FamilyAddress.FamilyAddress = FamilyAddress||'';
                            }
                        }
                    }


                }
            });
    }

    // ionViewWillLeave() {

    // }
    test($event) {
        this.FamilyAddress.BankCardNumber = $event.target.value.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    }


    nav(code) {
        this.appService.setCurrentParentPage('FamilyAddressPage');
        this.navCtrl.push(ProvincePage);
        localStorage.setItem('currentCode', code);
    }

    onDetailPageTJ() {

        console.log(this.FamilyAddress.StudentAreaCode);
        let FamilyAddressValue = this.FamilyAddress;
        console.log(this.FamilyAddress);
        if (this.appService.getCurrentCounty() !== undefined) {
            if (localStorage.getItem('currentCode') == 'StudentAreaName') {
                FamilyAddressValue.StudentAreaCode = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
            }
            if (localStorage.getItem('currentCode') == 'FamilyAddressName') {
                FamilyAddressValue.FamilyAddress = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
            }
        } else {
            FamilyAddressValue.StudentAreaCode = JSON.parse(this.FamilyAddress.StudentAreaCode).toString();
            FamilyAddressValue.FamilyAddress = JSON.parse(this.FamilyAddress.FamilyAddress).toString();
        }
        if (!this.FamilyAddress.StudentAreaCode) {
            this.HelpUtils.toastPop('请填写生源地！');
            return;
        }
        if (!this.FamilyAddress.FamilyAddress) {
            this.HelpUtils.toastPop('请填写家庭地址！');
            return;
        }
        if (!FamilyAddressValue.Email) {
            this.HelpUtils.toastPop('请填写邮箱！');
            return;
        }

        var myreegs = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
        if (FamilyAddressValue.Email !== "") {
            if (!myreegs.test(FamilyAddressValue.Email)) {
                this.HelpUtils.toastPop('请填写正确格式的邮箱！');
                return;
            }

        }
        if (!FamilyAddressValue.AccountBankCode.trim() && !this.InfoSets.has('AccountBank')) {
            this.HelpUtils.toastPop('请填写银行！');
            return;
        }
        if (!FamilyAddressValue.BankCardNumber && !this.InfoSets.has('BankCardNumber')) {
            this.HelpUtils.toastPop('请填写银行卡号！');
            return;
        }
        if (!this.InfoSets.has('BankCardNumber')) {
            var pattern = /^[\d\s]{19}|[\d\s]{23}$/;
            if (FamilyAddressValue.BankCardNumber !== "") {
                console.log(FamilyAddressValue.BankCardNumber.length)
                if (!pattern.test(FamilyAddressValue.BankCardNumber)) {
                    this.HelpUtils.toastPop('请填写正确格式银行卡号！');
                    return;
                }

            }
        }

        if (!FamilyAddressValue.QQAcct.trim()) {
            this.HelpUtils.toastPop('请填写QQ号！');
            return;
        }

        // var myreegs = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/;
        // if (FamilyAddressValue.IdentityNum !== "") {
        //     if (!myreegs.test(FamilyAddressValue.IdentityNum)) {
        //         this.HelpUtils.toastPop('请填写正确的身份证号！');
        //         return;
        //     }

        // }


        if (!FamilyAddressValue.DetailAddress.trim()) {
            this.HelpUtils.toastPop('请填写家庭详细地址！');
            return;
        }

        this.loadingPop = this.HelpUtils.loadingPop('信息正在提交。。。。。');
        this.http.postJSON({
            Router: ServelUrl.Url.savefamily,
            Method: 'POST',
            Body: {
                Email: this.FamilyAddress.Email,
                AccountBankCode: this.FamilyAddress.AccountBankCode,
                BankCardNumber: this.FamilyAddress.BankCardNumber,
                QQAcct: this.FamilyAddress.QQAcct,
                PostCode: this.FamilyAddress.PostCode,
                DetailAddress: this.FamilyAddress.DetailAddress,
                HomePhone: this.FamilyAddress.HomePhone,
                StudentAreaCode: this.FamilyAddress.StudentAreaCode,
                FamilyAddress: this.FamilyAddress.FamilyAddress

            }

        }).then(
            comments => {
                this.loadingPop.dismiss();
                if (comments.FeedbackCode == '0') {
                    this.navCtrl.push(FamilyeconomyPage);
                    localStorage.clear();
                } else {
                    this.HelpUtils.toastPop(`${comments.FeedbackText}`);
                }
            }
        )


    }


    onTopPage() {
        this.navCtrl.push(PersonreponPage);
    }
}
