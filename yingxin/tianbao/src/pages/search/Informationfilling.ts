/*
 * create by hanzhendong 2016/11/27
 * */
import {Component} from '@angular/core';
import {ServelUrl} from "../../app/ServelUrl";
import {HelpUtils} from "../../app/utils/HelpUtils";
import {HttpService} from "../../http/http.Service";
import {FamilyAddressPage} from "./familyaddress/FamilyAddress";
import {NavController, NavParams} from "ionic-angular";
import {DomSanitizer} from '@angular/platform-browser';


@Component({
    selector: 'page-informationfilling',
    templateUrl: 'informationfilling.html'
})
export class InformationfillingPage {
    item: any;
    items: any;
    reader;
    filesrc;
    SexTypes: any;
    CampusTypes = {
        Campus: '',
        Logo: ''
    };
    PhoneType = {
        Phone: ''
    };
    loadingPop;
    fileDefaultName = '请上传';
    NationTypes: any;
    CountTypes: any;
    LookTypes: any;
    IdentityTypes: any;
    MaritalTypes: any;
    // Evidence;
    InformationFilling = {
        Name: '',
        NameSpell: '',
        NameBefore: '',
        NameEnglish: '',
        Sex: '',
        Nationality: '',
        Country: '',
        Political: '',
        IdentityType: '',
        Identity: '',
        Tel: '',
        Email: '',
        Marital: '',
        BankCard: '',
        Evidence: '',
        IdPhoto: '',
        Birthday: '',
        IdValiDate: ''
    };

    constructor(public navCtrl: NavController, private HelpUtils: HelpUtils, private http: HttpService, private DomSanitization: DomSanitizer) {
        // this.initializeItems();
        this.reader = new FileReader();
        antlinker.configTitle({
            type: "label",
            title: '个人信息填报',
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
        this.http.postJSON({
            Router: ServelUrl.Url.querycampus,
            Method: 'GET',
            Body: {}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.CampusTypes = comments.Data;
                }
            });
        this.http.postJSON({
            Router: ServelUrl.Url.querysextype,
            Method: 'POST',
            Body: {CodeType: "Sex"}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.SexTypes = comments.Data;
                }
            });
        this.http.postJSON({
            Router: ServelUrl.Url.querynationtype,
            Method: 'POST',
            Body: {CodeType: "Nationality"}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.NationTypes = comments.Data;
                    this.InformationFilling.Nationality = "458b3e39-6456-4c24-b194-ce492acec578"
                }
            });
        this.http.postJSON({
            Router: ServelUrl.Url.querycountytype,
            Method: 'POST',
            Body: {CodeType: "Country"}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.CountTypes = comments.Data;
                    this.InformationFilling.Country = "5e53a673-f1c7-4d52-b982-023d6e9bf6e9"
                }
            });
        this.http.postJSON({
            Router: ServelUrl.Url.querylooktype,
            Method: 'POST',
            Body: {CodeType: "Political"}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.LookTypes = comments.Data;
                }
            });
        this.http.postJSON({
            Router: ServelUrl.Url.queryidentitytype,
            Method: 'POST',
            Body: {CodeType: "IdentityType"}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.IdentityTypes = comments.Data;
                }
            });

        this.http.postJSON({
            Router: ServelUrl.Url.querymaritaltype,
            Method: 'POST',
            Body: {CodeType: "Marital"}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.MaritalTypes = comments.Data;
                }
            });

    }

    ionViewDidEnter() {
        //

        // let cacheInformationFillingApply = JSON.parse(localStorage.getItem('InformationFilling'));
        // if (cacheInformationFillingApply) {
        //     this.InformationFilling.Name = cacheInformationFillingApply.Name;
        //     this.InformationFilling.NameSpell = cacheInformationFillingApply.NameSpell;
        //     this.InformationFilling.NameBefore = cacheInformationFillingApply.NameBefore;
        //     this.InformationFilling.NameEnglish = cacheInformationFillingApply.NameEnglish;
        //     this.InformationFilling.Sex = cacheInformationFillingApply.Sex;
        //     this.InformationFilling.Nationality = cacheInformationFillingApply.Nationality;
        //     // this.InformationFilling.Evidence= cacheInformationFillingApply.Evidence.name;
        //     this.InformationFilling.Country = cacheInformationFillingApply.Country;
        //     this.InformationFilling.Birthday = moment(cacheInformationFillingApply.Birthday).locale('es').format();
        //     this.InformationFilling.Political = cacheInformationFillingApply.Political;
        //     this.InformationFilling.IdentityType = cacheInformationFillingApply.IdentityType;
        //     this.InformationFilling.Identity = cacheInformationFillingApply.Identity;
        //     this.InformationFilling.IdValiDate = moment(cacheInformationFillingApply.IdValiDate).locale('es').format()
        //     this.InformationFilling.Marital = cacheInformationFillingApply.Marital;
        //     this.InformationFilling.Tel = cacheInformationFillingApply.Tel;
        //     this.InformationFilling.Email = cacheInformationFillingApply.Email;
        //     this.InformationFilling.BankCard = cacheInformationFillingApply.BankCard;
        // }
        this.http.postJSON({
            Router: ServelUrl.Url.queryformdata,
            Method: 'POST',
            Body: {}
        }).then(data => {
            if (data.Data) {
                this.InformationFilling = data.Data;
                if (this.InformationFilling.IdPhoto) {
                    console.log(this.InformationFilling = data.Data)
                    this.fileDefaultName = '已上传';
                }
            }
        })

    }

    // blurInput(){ console.log("blur"); }
    // initializeItems() {
    //     this.http.postJSON({
    //         Router: ServelUrl.Url.queryformdata,
    //         Method: 'POST',
    //         Body: {}
    //     }).then(
    //         comments => {
    //             this.InformationFilling = comments.Data || {};
    //             // if (this.InformationFilling.IdPhoto != "") {
    //             //     this.fileDefaultName = '已上传';
    //             // }
    //             if (this.InformationFilling.Tel == "") {
    //                 this.http.postJSON({
    //                     Router: ServelUrl.Url.queryphonetype,
    //                     Method: 'POST',
    //                     Body: {}
    //                 }).then(
    //                     comments => {
    //                         if (!comments.FeedbackCode) {
    //                             // this.PhoneType = comments.Data;
    //                             this.InformationFilling.Tel = comments.Data.Phone;
    //                         }
    //                     });
    //             }
    //             console.log(this.InformationFilling);
    //         });
    // }

    handleFiles($event) {
        if ($event.target.files[0]) {
            this.InformationFilling.Evidence = $event.target.files[0] || '';

            console.log(this.InformationFilling.Evidence);
            setTimeout(() => {
                let readers = new FileReader();
                readers.onload = (e) => {
                    debugger;
                        this.filesrc = this.DomSanitization.bypassSecurityTrustUrl(e.target['result']) || '';

                };
                readers.readAsDataURL($event.target.files[0]);

            },6500);
            this.fileDefaultName = '';

        }
    }

    /**
     * 上传文件
     */
    uploadFile() {
        antlinker.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
                console.log("返回值" + res);
            },
            fail: function (failed) { //上传失败后的处理},
                console.log('失败：' + failed);

            },
            complete: function () {//上传完成，成功、失败都可}
                console.log('complete：' + this);
            }
        });
    }


    ionViewWillLeave() {
        //localStorage.removeItem('InformationFilling');
    }

    onDetailPage() {

        let FormValidatorsValue = this.InformationFilling;
        console.log(this.InformationFilling);
        // if (!FormValidatorsValue.Evidence) {
        //     this.HelpUtils.toastPop('请上传证件照！');
        //     return;
        // }
        if (!FormValidatorsValue.IdPhoto && !FormValidatorsValue.Evidence) {
            this.HelpUtils.toastPop('请上传证件照！');
            return;
        }
        // if (!this.InformationFilling.IdPhoto && !FormValidatorsValue.Evidence) {
        //     this.HelpUtils.toastPop('请上传证件照！');
        //     return;
        // }
        if (!FormValidatorsValue.Nationality) {
            this.HelpUtils.toastPop('请选择民族！');
            return;
        }
        if (!FormValidatorsValue.Country) {
            this.HelpUtils.toastPop('请选择国家！');
            return;
        }
        if (!FormValidatorsValue.Birthday) {
            this.HelpUtils.toastPop('请选择出生日期！');
            return;
        }
        if (!FormValidatorsValue.Political) {
            this.HelpUtils.toastPop('请填写政治面貌！');
            return;
        }
        if (!FormValidatorsValue.BankCard) {
            this.HelpUtils.toastPop('请填写银行账号！');
            return;
        }
        var myreg = /^1[3|4|5|8|1|2|6|7|8|9][0-9]\d{4,8}$/;
        if (this.InformationFilling.Tel == "") {
        } else {
            if (!myreg.test(FormValidatorsValue.Tel)) {
                this.HelpUtils.toastPop('请填写正确的手机号！');
                return;
            }

        }
        // var myreegs = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
        var myreegs = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/;
        if (FormValidatorsValue.Identity !== "") {
            if (!myreegs.test(FormValidatorsValue.Identity)) {
                this.HelpUtils.toastPop('请填写正确的身份证号！');
                return;
            }

        }
        if (this.InformationFilling.IdValiDate == "") {
        } else {
            if (this.InformationFilling.Birthday > this.InformationFilling.IdValiDate) {
                this.HelpUtils.toastPop('出生日期不能在身份证到期日期之后哦！');
                return;
            }
        }
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if (FormValidatorsValue.Email !== "") {
            if (!reg.test(FormValidatorsValue.Email)) {
                this.HelpUtils.toastPop('请填写正确的邮箱！');
                return;
            }

        }
        this.loadingPop = this.HelpUtils.loadingPop('信息正在提交。。。。。');
        this.InformationFilling.Birthday = moment(this.InformationFilling.Birthday).format('YYYY-MM-DD');
        this.InformationFilling.IdValiDate = moment(this.InformationFilling.IdValiDate).format('YYYY-MM-DD');
        var requestData: any = this.InformationFilling;
        var formData = new FormData();
        var img = document.createElement('img');

        function tt(e) {
            img.src = e.target.result;
        }

        if (requestData.Evidence) {
            this.reader.onloadend = async (e) => {
                console.log(this.reader.readyState);
                await tt(e);
                //img.src = await this.reader.result;
            }
            this.reader.readAsDataURL(requestData.Evidence);
            img.onload = () => {
                let Orientation = this.HelpUtils.getPhotoOrientation(img);
                console.log(Orientation)
                var dataUrl = this.HelpUtils.compress1(img, 0.6, Orientation);
                console.log(dataUrl)
                formData.append('file', this.HelpUtils.base64toBlob(dataUrl));

                formData.append('router', ServelUrl.Url.querysaveinformation);
                // delete requestData.Evidence;
                formData.append('Body', JSON.stringify(requestData));
                this.submit(formData);
            }


            /*this.reader.onloadend = (e) => {
                var dataUrl = this.HelpUtils.compress(this.reader.result, 0.1);
                formData.append('file', this.HelpUtils.base64toBlob(dataUrl));
                //  delete requestData.Evidence;
                formData.append('router', ServelUrl.Url.querysaveinformation);
                formData.append('Body', JSON.stringify(requestData));
                this.submit(formData);
            };
            this.reader.readAsDataURL(requestData.Evidence);*/
        }
        else {
            requestData.IdPhoto = this.InformationFilling.IdPhoto;
            formData.append('router', ServelUrl.Url.querysaveinformation);
            // delete requestData.Evidence;
            formData.append('Body', JSON.stringify(requestData));
            this.submit(formData);
        }
    }

    submit(formData) {

        this.http.postFormData(formData, (comments) => {
            this.loadingPop.dismiss();
            if (comments.FeedbackCode == '0') {
                this.navCtrl.push(FamilyAddressPage, {InformationFilling: this.InformationFilling});
            } else {
                this.HelpUtils.toastPop(`${comments.FeedbackText}`);
            }
        })
    }

}
