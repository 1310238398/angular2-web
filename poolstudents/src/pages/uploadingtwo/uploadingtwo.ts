import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpService } from "../../http/http.Service";
import { DomSanitizer } from "@angular/platform-browser";
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from "../../app/utils/HelpUtils";
//import { SpeakPage } from '../speak/speak';


declare var qiniu;
declare var antlinker;

@IonicPage()
@Component({
  selector: 'uploadingtwo',
  templateUrl: 'uploadingtwo.html',
})
export class UploadingTwoPage {

  fileLoading;

  CertifyImgs1 = [];
  CertifyImgs2 = [];
  CertifyImgs3 = [];

  RecordIdArr1 = [] //存储后台返回的RecordID
  RecordIdArr2 = [] //存储后台返回的RecordID
  RecordIdArr3 = [] //存储后台返回的RecordID
  userName = '' //证件名称
  indexType = '' //点击的第几个按钮

  text = '';
  showoff = true; //弹框的显示与隐藏
  exChange = '1'; //判断是否可以修改 0不可以  1可以
  mengGo = true; //gif加载动效

  constructor(private DomSanitizer: DomSanitizer, public navCtrl: NavController, private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewWillEnter(){
    this.exChange = this.navParams.get('exChange');
    // 右上角按钮
    var that = this;
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "说明",
      success: function () { },
      fail: function () { },
      trigger: function () {
        that.navCtrl.push('SpeakPage', { exChange: that.exChange });
      }
    });
    antlinker.configTitle({
      type: "label",
      title: "家庭经济困难认定",
      fail: function () { },
      success: function () { }
    });
  }

  ngAfterViewInit() {
    console.log(this.exChange)
    this.onSearch();
  }

  //总提交
  overSave() {
    var RecordType = []
    if (this.CertifyImgs1.length != 0) {
      for (let i = 0; i < this.CertifyImgs1.length; i++) {
        var TypeCodeObj1 = {}
        TypeCodeObj1['TypeCode'] = '9700001';
        TypeCodeObj1['AttachRecordId'] = this.CertifyImgs1[i].RecordID;
        TypeCodeObj1['Caption'] = '';
        RecordType.push(TypeCodeObj1)
      }
    }

    if (this.CertifyImgs2.length != 0) {
      for (let i = 0; i < this.CertifyImgs2.length; i++) {
        var TypeCodeObj2 = {}
        TypeCodeObj2['TypeCode'] = '9700002';
        TypeCodeObj2['AttachRecordId'] = this.CertifyImgs2[i].RecordID;
        TypeCodeObj2['Caption'] = '';
        RecordType.push(TypeCodeObj2)
      }
    }

    if (this.CertifyImgs3.length != 0) {
      var aabt = '1'
      for (let i = 0; i < this.CertifyImgs3.length; i++) {
        var TypeCodeObj3 = {}
        TypeCodeObj3['TypeCode'] = '9700003';
        TypeCodeObj3['AttachRecordId'] = this.CertifyImgs3[i].RecordID;
        TypeCodeObj3['Caption'] = this.CertifyImgs3[i].Caption.trim();
        RecordType.push(TypeCodeObj3);
        if (this.CertifyImgs3[i].Caption == '') {
          aabt = '0'
        }
      }
      if (aabt == '0') {
        this.HelpUtils.toastPopTop('文件说明不能为空');
        return false;
      }
    }

    if (RecordType.length == 0) {
      this.HelpUtils.toastPopTop('请先上传文件再提交');
      return false;
    }

    this.http.postJSON({
      Router: ServelUrl.Url.poorsaveattach,
      Method: 'POST',
      Body: RecordType
    }).then(
      res => {
        if (!res.FeedbackCode) {
          this.HelpUtils.toastPopTop('提交成功');
          const that = this;
          setTimeout(function () {
            that.navCtrl.push('IndexPage');
          }, '1500');
        } else {
          this.HelpUtils.toastPopTop(res.FeedbackText);
        }
      },
      err => alert(err)
    );
  }
  //=======================================

  upload(obj) {
    this.fileLoading = this.HelpUtils.loadingPop('正在上传，请稍等...');

    var that = this;
    var observable = qiniu.upload(obj.file, obj.key, obj.token, {
      mimeType: ["image/png", "image/jpeg", "image/jpg"]
    }, {
        useCdnDomain: true
      });
    var observer = {
      next(res) {
        console.log(res)
      },
      error(err) {
        that.HelpUtils.toastPop(err.message);
      },
      complete(res) {
        var file = obj.file;
        that.fileLoading.dismiss();

        that.http.postJSON({
          Router: ServelUrl.Url.saveattach, 
          Method: 'POST', Body: {
            BizType: 'StudentNeedSupport',
            AttachmentItemName: file.name || '',
            AttachmentItemType: file.type,
            AttachmentItemSize: file.size.toString(),
            AttachmentURL: res.key,
            Base64: '',
          }
        }).then(response => {
          if (!response.FeedbackCode) {

            if (that.indexType == '1') {
              that.RecordIdArr1.push(response.Data.RecordID);

              that.CertifyImgs1.push({
                RecordID: response.Data.RecordID,
                Caption: '',	//字符串	说明
                AttachmentURL: window.URL.createObjectURL(file),
                AttachmentURLThumb: window.URL.createObjectURL(file),
                AttachmentItemSize: file.size.toString(),
                AttachmentItemType: file.type,
                AttachmentItemName: file.name,
              });
            } else if (that.indexType == '2') {
              that.RecordIdArr2.push(response.Data.RecordID);
              that.CertifyImgs2.push({
                RecordID: response.Data.RecordID,
                Caption: '',	//字符串	说明
                AttachmentURL: window.URL.createObjectURL(file),
                AttachmentURLThumb: window.URL.createObjectURL(file),
                AttachmentItemSize: file.size.toString(),
                AttachmentItemType: file.type,
                AttachmentItemName: file.name,
              });
            } else if (that.indexType == '3') {
              that.RecordIdArr3.push(response.Data.RecordID);
              that.CertifyImgs3.push({
                RecordID: response.Data.RecordID,
                Caption: '',	//字符串	说明
                AttachmentURL: window.URL.createObjectURL(file),
                AttachmentURLThumb: window.URL.createObjectURL(file),
                AttachmentItemSize: file.size.toString(),
                AttachmentItemType: file.type,
                AttachmentItemName: file.name,
              });
            }
          } else {
            that.HelpUtils.toastPop(response.FeedbackText);
          }
          console.log(res);
        })
      }
    };
    var subscription = observable.subscribe(observer); // 上传开始
  }

  handleFiles(event, indexNum) {
    this.indexType = indexNum
    var file = event.target.files[0];
    console.log(event,'file');
    console.log(file,'file');
    if (file.size > 10485760) {
      this.HelpUtils.toastPop('文件大小限制:10M');
      return false
    }

    if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
      this.HelpUtils.toastPop('格式错误,请选择"png,jpeg,jpg"格式文件上传');
      return
    }

    this.http.postJSON({
      Router: ServelUrl.Url.getUpToken,
      Method: 'POST',
      Body: {
        Name: file.name,
        Size: file.size,
        BizType: "Subsidize"
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.upload({ file: file, key: res.Data.Key, token: res.Data.Proof })
      } else if (res.FeedbackText == '获取上传KEY有误，请稍后重试') {
        this.HelpUtils.toastPopTop('图片错误,请重新选择其他图片上传');
      } else if (res.FeedbackCode == 97) {
        this.HelpUtils.toastPopTop('图片错误,请重新选择其他图片上传');
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }

    })
  }

  //获取已上传的图片列表
  onSearch() {
    this.http.postJSON({
      Router: ServelUrl.Url.QueryUp,
      Method: 'POST',
      Body: {}
    }).then(
      res => {
        this.mengGo = false
        if (!res.FeedbackCode && res.Data != null) {

          for (let i = 0; i < res.Data.length; i++) {
            if (res.Data[i].Code == '9700001') {
              this.CertifyImgs1 = res.Data[i].Attachs;

            } else if (res.Data[i].Code == '9700002') {
              this.CertifyImgs2 = res.Data[i].Attachs;

            } else if (res.Data[i].Code == '9700003') {
              this.CertifyImgs3 = res.Data[i].Attachs;
            }
          }

          for (let i = 0; i < this.CertifyImgs1.length; i++) {
            this.CertifyImgs1[i].AttachmentURL = this.CertifyImgs1[i].AttachmentURL
          }

        }
      },
      err => alert(err)
    );
  }
  //删除附件
  deleteCertify1(event, index) {
    this.CertifyImgs1.splice(index, 1);
    this.RecordIdArr1.splice(index, 1);
    event.stopPropagation();
  }
  //删除附件
  deleteCertify2(event, index) {
    this.CertifyImgs2.splice(index, 1);
    this.RecordIdArr2.splice(index, 1);
    event.stopPropagation();
  }
  //删除附件
  deleteCertify3(event, index) {
    this.CertifyImgs3.splice(index, 1);
    this.RecordIdArr3.splice(index, 1);
    event.stopPropagation();
  }
  //查看放大图片
  navPreview(params) {
    this.navCtrl.push('PreviewPage', params)
  }
  //跳转说明页
  NavtoSpeak() {
    this.navCtrl.push('SpeakPage', { exChange: this.exChange });
  }

  //材料清单弹框
  showAlert() {
    const alert = this.alertCtrl.create({
      title: '可上传的困难材料清单',
      subTitle: '<p>1) 家庭户口簿复印件(必须提供)</p> <p>2) 父母下岗证或失业证复印件</p> <p>3) 烈属证复印件</p> <p>4) 家庭主要成员身体残疾的残疾证复印件</p> <p>5) 家庭成员患重大疾病的病例复印件</p> <p>6) 低保证、特困证复印件</p> <p>7) 建档立卡相关材料</p> <p>8) 其他能有效证明家庭经济困难的材料(如家庭住所、陈设照片等)</p>',
      buttons: ['关闭']
    });
    alert.present();
  }





}
