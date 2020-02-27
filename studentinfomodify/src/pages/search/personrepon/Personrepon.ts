/*
 * create by hanzhendong 2016/11/27
 * */
import {Component} from '@angular/core';
import {ServelUrl} from "../../../app/ServelUrl";
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {HttpService} from "../../../http/http.Service";
import {FamilyAddressPage} from "./../familyaddress/FamilyAddress";
import {NavController, NavParams} from "ionic-angular";
import {DomSanitizer} from '@angular/platform-browser';
import {ProvincePage} from "../familyaddress/province/Province";
import {AppService} from "../../../app/app.service";


@Component({
    selector: 'page-personrepon',
    templateUrl: 'personrepon.html'
})
export class PersonreponPage {
    item: any;
    items: any;
    title: any;
    campus: any;
    dormitorys = [];
    dormitory: any;
    FormValidatorsValue: any;

    dormitorym: any;
    reader;
    filesrc;
    studentcard: any;
    size: any;
    loadingPop;
    fileDefaultName = '请上传';
    NationTypes: any;
    CountTypes: any;
    LookTypes: any;
    IdentityTypes: any;
    MaritalTypes: any;
    result={OriginAreaCode:'',OriginAreaCodeName:''};
    NewPhoto = '';
    InfoSets=new Set();
    // Evidence;
    InformationFilling = {

        NationalityCode: '',
        UserCode: '',
        Name: '',
        PoliticalCode: '',
        OriginAreaCode: '',
        OriginAreaCodeName: '',
        OriginAreaName: '',//详细
        OriginAreaDetail: '',
        photoUrl: '',
        CampusCode: '',
        CampusName: '',
        DistrictCode: '',
        DistrictName: '',
        DormitoryCode: '',
        DormitoryName: '',
        RoomCode: '',
        RoomName: ''

    };

    constructor(public appService: AppService, public navCtrl: NavController, private HelpUtils: HelpUtils, private http: HttpService, private DomSanitization: DomSanitizer) {
        // this.initializeItems();
     /*   this.appService.get().subscribe((result) => {
            console.log(result);
            this.result=result;
            this.InformationFilling.OriginAreaCode=result.OriginAreaCode;
            this.InformationFilling.OriginAreaCodeName=result.OriginAreaName;
        })
*/
              if (this.appService.getCurrentParentPage()=='PersonreponPage') {
                  if (this.appService.getCurrentProvince() !== undefined && this.appService.getCurrentCity() !== undefined && this.appService.getCurrentCounty() !== undefined) {
                      this.InformationFilling.OriginAreaCodeName = this.appService.getCurrentProvince().GeographyName
                          + this.appService.getCurrentCity().GeographyName + this.appService.getCurrentCounty().GeographyName;
                      if (this.appService.getCurrentCounty() !== undefined) {
                          this.InformationFilling.OriginAreaCode = JSON.parse(this.appService.getCurrentCounty().GeographyCode).toString();
                      } else {
                          this.InformationFilling.OriginAreaCode = JSON.parse(this.InformationFilling.OriginAreaCode).toString();
                      }
                  }
              }

        this.reader = new FileReader();

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
            //   trigger: function () {
            //   }

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
        // 初始请求民族
        this.http.postJSON({
            Router: ServelUrl.Url.relationquery,
            Method: 'POST',
            Body: {CodeType: "Nationality"}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.NationTypes = comments.Data;
                    this.InformationFilling.NationalityCode = "458b3e39-6456-4c24-b194-ce492acec578"
                }
            });
        // 初始请求政治面貌
        this.http.postJSON({
            Router: ServelUrl.Url.relationquery,
            Method: 'POST',
            Body: {CodeType: "Political"}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.LookTypes = comments.Data;

                }
            });
        // 请求校区
        this.http.postJSON({
            Router: ServelUrl.Url.campusquery,
            Method: 'POST',
            Body: ""
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.campus = comments.Data;
                    // this.InformationFilling.CampusCode="f57412ea-8548-11e6-bd0b-5cb901890f2c";
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
                    if (comments.Data) {
                        if (this.InformationFilling.OriginAreaCode) {
                            var OriginAreaCode = this.InformationFilling.OriginAreaCode;
                            var OriginAreaCodeName = this.InformationFilling.OriginAreaCodeName;
                            this.InformationFilling = comments.Data;
                            this.InformationFilling.OriginAreaCode = OriginAreaCode;
                            this.InformationFilling.OriginAreaCodeName = OriginAreaCodeName;
                        } else {
                            this.InformationFilling = comments.Data;
                        }
                        if (this.InformationFilling.photoUrl) {
                            this.filesrc = this.InformationFilling.photoUrl;
                        }
                        //废弃不用了
                      /*  if (this.InformationFilling.CampusCode) {

                            this.dirstor(this.InformationFilling.CampusCode);
                            this.dirstors(this.InformationFilling.DistrictCode);
                        }*/

                    }

                }
            });

    }

    change(en) {
        //this.InformationFilling.CampusCode=en;

        this.dirstor(this.InformationFilling.CampusCode);
        this.InformationFilling.DistrictCode = "",
            this.InformationFilling.DormitoryCode = ""
    }

    changeyuanqu(et) {
        this.dirstors(this.InformationFilling.DistrictCode);
        this.InformationFilling.DormitoryCode = ""
    }

    dirstor(CampusCodes) {
        console.log(CampusCodes);
        if (CampusCodes) {
            let yuanqu = CampusCodes;
            // 请求园区
            this.http.postJSON({
                Router: ServelUrl.Url.disquery,
                Method: 'POST',
                Body: {CampusCode: yuanqu}
            }).then(
                comments => {
                    if (!comments.FeedbackCode) {
                        if (comments.Data) {
                            this.dormitory = comments.Data;

                        }

                    }
                });
        } else {
            this.HelpUtils.presentAlert({
                subTitle: `请先选择校区`,
                buttons: [{
                    text: '我知道了', role: 'cancel', handler: () => {

                    }
                }]
            });

        }

    }

// }
// dirstors(DormitoryCode){
//     console.log(DormitoryCode);
//     if(DormitoryCode.DistrictCode){

//         let lu = DormitoryCode.DistrictCode;
//         // 请求楼
//         this.http.postJSON({
//             Router: ServelUrl.Url.dormitoryquery,
//             Method: 'POST',
//             Body: {DistrictCode:lu}
//         }).then(

    dirstors(DormitoryCode) {
        console.log(DormitoryCode);
        if (DormitoryCode) {

            let lu = DormitoryCode;
            // 请求楼
            this.http.postJSON({
                Router: ServelUrl.Url.dormitoryquery,
                Method: 'POST',
                Body: {DistrictCode: lu}
            }).then(
                comments => {
                    if (!comments.FeedbackCode) {
                        if (comments.Data) {
                            this.dormitorym = comments.Data;

                        }

                    }
                });
        }
        else {
            this.HelpUtils.presentAlert({
                subTitle: `请先选择园区`,
                buttons: [{
                    text: '我知道了', role: 'cancel', handler: () => {

                    }
                }]
            });
        }

    }

    handleFiles($event) {
        if ($event.target.files[0]) {
            this.InformationFilling.photoUrl = $event.target.files[0] || '';
            this.size = $event.target.files[0].size;
            if (this.size > 2 * 1024 * 1024) {
                this.HelpUtils.toastPop('上传照片不能超过2M！');
                return;
            } else {
                // this.InformationFilling.photoUrl = '';
                console.log(this.InformationFilling.photoUrl);
                console.log($event.target.files[0].size);
                this.loadingPop = this.HelpUtils.presentLoadingText();
                setTimeout(() => {
                    let readers = new FileReader();
                    readers.onload = (e) => {
                        this.filesrc = this.DomSanitization.bypassSecurityTrustUrl(e.target['result']) || '';
                    };
                    readers.readAsDataURL($event.target.files[0]);
                    this.loadingPop.dismiss();
                }, 5000);
                this.NewPhoto = this.InformationFilling.photoUrl;
                this.fileDefaultName = '';
            }

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
        // this.onReCall();
    }

    onDetailPage() {
        console.log(this.InformationFilling.OriginAreaCode);
        this.FormValidatorsValue = {
            NationalityCode: this.InformationFilling.NationalityCode,
            OriginAreaCode: this.InformationFilling.OriginAreaCode,
            OriginAreaName: this.InformationFilling.OriginAreaName,
            PoliticalCode: this.InformationFilling.PoliticalCode,
            DormitoryCode: this.InformationFilling.DormitoryCode||'',
            RoomName: this.InformationFilling.RoomName||'',

            NewPhoto: this.NewPhoto,


        };
        console.log(this.InformationFilling);

        if (!this.FormValidatorsValue.NationalityCode) {
            this.HelpUtils.toastPop('请填写民族！');
            return;
        }
        if (!this.FormValidatorsValue.OriginAreaCode) {
            this.HelpUtils.toastPop('请填写籍贯');
            return;
        }
        if (!this.InfoSets.has('OriginAreaName')&&!this.FormValidatorsValue.OriginAreaName) {
            this.HelpUtils.toastPop('请填写籍贯详细地址');
            return;
        }

        if (!this.InfoSets.has('OriginAreaName')&&this.FormValidatorsValue.OriginAreaName.length > 100) {
            this.HelpUtils.toastPop('籍贯详细地址填写不能超过100个汉字！');
            return;
        }


        if (!this.FormValidatorsValue.PoliticalCode) {
            this.HelpUtils.toastPop('请填写政治面貌！');
            return;
        }
       /* if (!this.InformationFilling.CampusCode) {
            this.HelpUtils.toastPop('请填写校区！');
            return;
        }
        if (!this.InformationFilling.DistrictCode) {
            this.HelpUtils.toastPop('请填写园区！');
            return;
        }

        if (!this.FormValidatorsValue.DormitoryCode) {
            this.HelpUtils.toastPop('请填写宿舍楼！');
            return;
        }

        if (!this.FormValidatorsValue.RoomName.trim()) {
            this.HelpUtils.toastPop('请填写宿舍号！');
            return;
        }*/

        this.loadingPop = this.HelpUtils.loadingPop('信息正在提交。。。。。');
        // this.InformationFilling.Birthday = moment(this.InformationFilling.Birthday).format('YYYY-MM-DD');
        var requestData: any = this.FormValidatorsValue;
        var formData = new FormData();
        var img = document.createElement('img');

        function tt(e) {
            img.src = e.target.result;
        }

        if (this.NewPhoto) {
            this.reader.onloadend = async (e) => {
                console.log(this.reader.readyState);
                await tt(e);
                //img.src = await this.reader.result;
            }
            this.reader.readAsDataURL(this.NewPhoto);
            img.onload = () => {
                let Orientation = this.HelpUtils.getPhotoOrientation(img);
                console.log(Orientation);
                var dataUrl = this.HelpUtils.compress1(img, 0.6, Orientation);
                console.log(dataUrl)
                formData.append('file', this.HelpUtils.base64toBlob(dataUrl));

                formData.append('router', ServelUrl.Url.savephoto);
                // delete requestData.Evidence;
                requestData.NewPhoto = '照片';
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
            requestData.NewPhoto = this.NewPhoto;
            console.log(requestData);
            formData.append('router', ServelUrl.Url.savephoto);
            // delete requestData.Evidence;
            formData.append('Body', JSON.stringify(requestData));
            formData.append('file', '');
            this.submit(formData);
        }
    }

    submit(formData) {

        this.http.postFormData(formData, (comments) => {
            this.loadingPop.dismiss();
            this.appService.setCurrentParentPage('');
            if (comments.FeedbackCode == '0') {
                this.navCtrl.push(FamilyAddressPage, {InformationFilling: this.InformationFilling});
            } else {
                this.HelpUtils.toastPop(`${comments.FeedbackText}`);
            }
        })
    }

    nav() {
        this.appService.setCurrentParentPage('PersonreponPage');
        this.navCtrl.push(ProvincePage);
    }

}
