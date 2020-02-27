/**
 * Created by hanzhendong on 2016/11/29.
 */
import {Component} from '@angular/core';
import {AppService} from "../../../app/app.service";
import {Geography} from "../../../app/geography";
import {ToastController, NavParams} from 'ionic-angular';
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {NavController} from "ionic-angular";
import {ServelUrl} from "../../../app/ServelUrl";
import {HttpService} from "../../../http/http.Service";
import {objectToURLSearchParams} from "../../../app/object_to_url_search_params";
// import {ProvincePage} from "../familyaddress/procity/Procity";
import {ProvincePage} from "../familyaddress/province/Province";

@Component({
    selector: 'page-familyaddress',
    templateUrl: 'familyaddress.html'
})
export class FamilyAddressPage {
    pcity = {
        Province: {
            GeographyName: '',
            GeographyCode: '',
        },
        City: {
            GeographyName: '',
            GeographyCode: '',

        },
        County: {
            GeographyName: '',
            GeographyCode: '',
        }
    };
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
        HomeProvinceCode: '',
        HomeCityCode: '',
        HomeCountyCode: '',
        HomeCity: '',
        HomeRoad: '',
        HomeDetailAddress: '',
        Postcode: '',
        DadName: '',
        DadJobSpace: '',
        DadJob: '',
        MomName: '',
        MomJob: '',
        MomJobSpace: '',
        MomTel: '',
        DadTel: '',
        FamilyTel: '',
    };

    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
                private appService: AppService, public navCtrl: NavController, private http: HttpService) {

        if (this.appService.getCurrentProvince() !== undefined && this.appService.getCurrentCity() !== undefined && this.appService.getCurrentCounty() !== undefined) {
            this.FamilyAddress.HomeCity = this.appService.getCurrentProvince().GeographyName
                + this.appService.getCurrentCity().GeographyName + this.appService.getCurrentCounty().GeographyName
        }
        // this.InformationFilling = this.params.get('InformationFilling');
        appService.getCampusInfo().then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.CampusTypes = comments.Data;
                }
            });
        this.reader = new FileReader();
        /*、
         * 调用jssdk
         *
         * */
        antlinker.configTitle({
            type: "label",
            title: '家庭信息',
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

    ionViewDidEnter() {
        this.http.postJSON({
            Router: ServelUrl.Url.queryformdata,
            Method: 'POST',
            Body: {}

        }).then(data => {
            if (data.Data) {
                this.FamilyAddress = data.Data
            }
            if (this.appService.getCurrentProvince() !== undefined && this.appService.getCurrentCity() !== undefined && this.appService.getCurrentCounty() !== undefined) {
                this.FamilyAddress.HomeCity = this.appService.getCurrentProvince().GeographyName + this.appService.getCurrentCity().GeographyName + this.appService.getCurrentCounty().GeographyName;
            }
            console.log(data.Data);
        })
    }

    ionViewWillLeave() {

    }

    nav() {
        this.navCtrl.push(ProvincePage);
    }

    onDetailPageTJ() {
        let FamilyAddressValue = this.FamilyAddress;
        console.log(this.FamilyAddress);
        if (!FamilyAddressValue.HomeCity) {
            this.HelpUtils.toastPop('请填写家庭地址！');
            return;
        }
        if (!FamilyAddressValue.Postcode) {
            this.HelpUtils.toastPop('请填写邮政编码！');
            return;
        }
        if (!FamilyAddressValue.DadName) {
            this.HelpUtils.toastPop('请填写父亲姓名！');
            return;
        }
        if (!FamilyAddressValue.MomName) {
            this.HelpUtils.toastPop('请填写母亲姓名！');
            return;
        }
        //this.loadingPop = this.HelpUtils.loadingPop('信息正在提交。。。。。');
        var requestData: any = this.FamilyAddress;
        if (this.appService.getCurrentProvince() !== undefined && this.appService.getCurrentCity() !== undefined && this.appService.getCurrentCounty() !== undefined) {
            this.FamilyAddress.HomeCity = this.appService.getCurrentProvince().GeographyName + this.appService.getCurrentCity().GeographyName + this.appService.getCurrentCounty().GeographyName;
            requestData.HomeCity = this.FamilyAddress.HomeCity;
        } else {
            requestData.HomeCity = this.FamilyAddress.HomeCity;
        }
        //requestData.HomeCity = this.appService.getCurrentProvince().GeographyName + this.appService.getCurrentCity().GeographyName + this.appService.getCurrentCounty().GeographyName;
        if (this.appService.getCurrentProvince() !== undefined) {
            requestData.HomeProvinceCode = JSON.parse(this.appService.getCurrentProvince().GeographyCode).toString();
        } else {
            requestData.HomeProvinceCode = JSON.parse(this.FamilyAddress.HomeProvinceCode).toString();
        }
        if (this.appService.getCurrentCity() !== undefined) {
            requestData.HomeCityCode = JSON.parse(this.appService.getCurrentCity().GeographyCode).toString();
        } else {
            requestData.HomeCityCode = JSON.parse(this.FamilyAddress.HomeCityCode).toString();
        }
        if (this.appService.getCurrentCounty() !== undefined) {
            requestData.HomeCountyCode = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
        } else {
            requestData.HomeCountyCode = JSON.parse(this.FamilyAddress.HomeCountyCode).toString();
        }
        if (!FamilyAddressValue.Postcode) {
            requestData.Postcode = JSON.parse(this.FamilyAddress.Postcode).toString();
        }
        //requestData.HomeProvinceCode = JSON.parse(this.appService.getCurrentProvince().GeographyCode) || JSON.parse(this.FamilyAddress.HomeProvinceCode);
        //requestData.HomeCityCode = JSON.parse(this.appService.getCurrentCity().GeographyCode) || JSON.parse(this.FamilyAddress.HomeCityCode);
        //requestData.HomeCountyCode = JSON.parse(this.appService.getCurrentCounty().GeographyCode) || JSON.parse(this.FamilyAddress.HomeCountyCode);

        var formData = new FormData();
        formData.append('router', ServelUrl.Url.queryfamilyinformation);
        formData.append('Body', JSON.stringify(requestData));
        this.submit(formData);


    }

    submit(formData) {
        this.appService.postFamilyInfoToServer(formData, (comments) => {
            //this.loadingPop.dismiss();
            if (!comments.FeedbackCode) {
               // this.HelpUtils.toastPop(`${comments.FeedbackText}`);
                this.HelpUtils.presentAlert({
                    subTitle: `${comments.FeedbackText}`,
                    buttons: [{
                        text: '确定', role: 'cancel', handler: () => {
                            antlinker.closeView({
                                //uri: 'ant://h5app/open?URL=' + encodeURIComponent('yingxin/index.html'),
                                success: function () {
                                    console.log('成功')
                                },
                                fail: function () {

                                }
                            });
                        }
                    }]
                });
                //填写成功跳回主线
                //  this.navCtrl.push('TaskPage');

            } else {
                this.HelpUtils.toastPop(`${comments.FeedbackText}`);
            }
        });
    }


}
