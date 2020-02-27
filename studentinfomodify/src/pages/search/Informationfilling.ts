/*
 * create by hanzhendong 2016/11/27
 * */
import {Component} from '@angular/core';
import {ServelUrl} from "../../app/ServelUrl";
import {HelpUtils} from "../../app/utils/HelpUtils";
import {HttpService} from "../../http/http.Service";
import {PersonreponPage} from "./personrepon/Personrepon";
import {NavController, NavParams} from "ionic-angular";
import {DomSanitizer} from '@angular/platform-browser';


@Component({
    selector: 'page-informationfilling',
    templateUrl: 'informationfilling.html'
})
export class InformationfillingPage {
    item: any;
    items: any;
    InfoSets = new Set();
    // Evidence;
    InformationFilling = {
        photoUrl: '',
        Name: '',
        UserCode: '',
        NationalityCode: '',
        Nationality: '',
        OriginAreaName: '',
        PoliticalCode: '',
        Political: '',
        CampusCode: '',
        CampusName: '',
        DistrictCode: '',
        DistrictName: '',
        DormitoryCode: '',
        DormitoryName: '',
        BankCardNumber: '',
        RoomCode: '',
        RoomName: '',
        Email: '',
        AccountBankCode: '',
        AccountBank: '',
        QQAcct: '',
        StudentAreaCode: '',
        StudentAreaCode1: '',
        StudentAreaCode2: '',
        PostCode: '',
        DetailAddress: '',
        HomePhone: '',
        MemberName1: '',
        MemberTypeCode1: '',
        MemberType1: '',
        MemberWorkUnit1: '',
        MobilePhone1: '',
        MemberName2: '',
        MemberTypeCode2: '',
        MemberType2: '',
        MemberWorkUnit2: '',
        MobilePhone2: '',
        Dormitory: '',
        StudentAreaName: '',
    };
    pet: string = "puppies";

    constructor(public navCtrl: NavController, private HelpUtils: HelpUtils, private http: HttpService, private DomSanitization: DomSanitizer) {
        // this.initializeItems();

        antlinker.configTitle({
            type: "label",
            title: '个人信息',
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
            //   trigger: function () {
            //   }

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
                    if (comments.Data) {
                        this.InformationFilling = comments.Data;
                        if (this.InfoSets.has('OriginAreaName')) {
                            this.InformationFilling.OriginAreaName = '';
                        }

                        // if (this.InformationFilling.Photo) {
                        //     this.http.postJSON({
                        //         Router: ServelUrl.Url.queryphoto,
                        //         Method: 'POST',
                        //         Body: {Photo: this.InformationFilling.Photo}
                        //     }).then(comments => {
                        //         if (!comments.FeedbackCode) {
                        //             // this.filesrc = comments.Data.Photo || '';
                        //         }
                        //         console.log(comments)
                        //     })
                        // }

                    }

                }
            });

    }

    firstpage() {
        this.navCtrl.push(PersonreponPage);
    }

    detail(message) {
        this.HelpUtils.presentAlert({
            title: '',
            subTitle: `${message}`,
            buttons: []
        })
    }

    callPhone(params) {
        let Data = {
            Phone: params,
            Name: '家庭电话'
        }
        this.HelpUtils.callUp(Data)
    }
}
