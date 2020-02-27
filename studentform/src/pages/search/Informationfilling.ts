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
    studentcard: any;
    size:any;
    loadingPop;
    fileDefaultName = '请上传';
    NationTypes: any;
    CountTypes: any;
    LookTypes: any;
    IdentityTypes: any;
    MaritalTypes: any;
    // Evidence;
    InformationFilling = {
        Academy: '',
        Grade: '',
        Major: '',
        Class: '',
        Photo: '',
        Photos: '',
        Name: '',
        Sex: '',
        Birthday: '',
        Political: '',
    };

    constructor(public navCtrl: NavController, private HelpUtils: HelpUtils, private http: HttpService, private DomSanitization: DomSanitizer) {
        // this.initializeItems();
        this.reader = new FileReader();
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
            //   trigger: function () {
            //   }

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
        //初始请求数据
        this.http.postJSON({
            Router: ServelUrl.Url.querystudentcard,
            Method: 'POST',
            Body: ''
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    if (comments.Data.length != 0) {
                        this.InformationFilling = comments.Data[0];
                        if (this.InformationFilling.Photo) {
                            this.http.postJSON({
                                Router: ServelUrl.Url.queryphoto,
                                Method: 'POST',
                                Body: {Photo: this.InformationFilling.Photo}
                            }).then(comments => {
                                if (!comments.FeedbackCode) {
                                    this.filesrc = comments.Data.Photo || '';
                                }
                                console.log(comments)
                            })
                        }

                    }

                }
            });

    }

    ionViewDidEnter() {

    }


    handleFiles($event) {
        if ($event.target.files[0]) {
            this.size = $event.target.files[0].size;
            if(this.size>2*1024*1024){
                this.HelpUtils.toastPop('上传照片不能超过2M！');
                return;
            }
            this.InformationFilling.Photos = $event.target.files[0] || '';
            this.InformationFilling.Photo = '';
            console.log(this.InformationFilling.Photo);
            console.log($event.target.files[0].size);
            this.loadingPop = this.HelpUtils.presentLoadingText();
            setTimeout(() => {
                let readers = new FileReader();
                readers.onload = (e) => {
                    debugger;
                    this.filesrc = this.DomSanitization.bypassSecurityTrustUrl(e.target['result']) || '';
                };
                readers.readAsDataURL($event.target.files[0]);
                this.loadingPop.dismiss();
            },5000);
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
        // this.onReCall();
    }

    onDetailPage() {

        let FormValidatorsValue = this.InformationFilling;
        console.log(this.InformationFilling);

        if (!FormValidatorsValue.Academy.trim()) {
            this.HelpUtils.toastPop('请填写院系！');
            return;
        }
        
        if (!FormValidatorsValue.Grade.trim()) {
            this.HelpUtils.toastPop('请填写年级！');
            return;
        }
        if (!FormValidatorsValue.Major.trim()) {
            this.HelpUtils.toastPop('请填写专业！');
            return;
        }
        if (!FormValidatorsValue.Class.trim()) {
            this.HelpUtils.toastPop('请填写班级！');
            return;
        }
        if (!FormValidatorsValue.Photo && !FormValidatorsValue.Photos) {
            this.HelpUtils.toastPop('请上传照片！');
            return;
        }
        /*if (!FormValidatorsValue.Photos) {
            this.HelpUtils.toastPop('请上传照片！');
            return;
        }*/
       
        if (!FormValidatorsValue.Name.trim()) {
            this.HelpUtils.toastPop('请填写姓名！');
            return;
        }
        if (!FormValidatorsValue.Sex) {
            this.HelpUtils.toastPop('请选择性别！');
            return;
        }
        if (!FormValidatorsValue.Birthday) {
            this.HelpUtils.toastPop('请填写出生年月！');
            return;
        }
        
        if (!FormValidatorsValue.Political.trim()) {
            this.HelpUtils.toastPop('请填写政治面貌！');
            return;
        }

        this.loadingPop = this.HelpUtils.loadingPop('信息正在提交。。。。。');
        // this.InformationFilling.Birthday = moment(this.InformationFilling.Birthday).format('YYYY-MM-DD');
        var requestData: any = this.InformationFilling;
        var formData = new FormData();
        var img = document.createElement('img');

        function tt(e) {
            img.src = e.target.result;
        }

        if (requestData.Photos) {
            this.reader.onloadend = async (e) => {
                console.log(this.reader.readyState);
                await tt(e);
                //img.src = await this.reader.result;
            }
            this.reader.readAsDataURL(requestData.Photos);
            img.onload = () => {
                let Orientation = this.HelpUtils.getPhotoOrientation(img);
                console.log(Orientation)
                var dataUrl = this.HelpUtils.compress1(img, 0.6, Orientation);
                console.log(dataUrl)
                formData.append('file', this.HelpUtils.base64toBlob(dataUrl));

                formData.append('router', ServelUrl.Url.savestudentcard);
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
            requestData.Photo = this.InformationFilling.Photo;
            formData.append('router', ServelUrl.Url.savestudentcard);
            // delete requestData.Evidence;
            formData.append('Body', JSON.stringify(requestData));
            formData.append('file', '');
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
