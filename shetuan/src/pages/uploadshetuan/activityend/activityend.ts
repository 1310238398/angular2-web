import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";
import * as EXIF from 'exif-js';


declare var qiniu;
declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-activityend',
  templateUrl: 'activityend.html'
})
export class ActivityEndPage {

  values = 50;
  numdisb = true;
  temTitle = '辅导员(班主任)考核加分信息上报'
  ActivityCode;
  activitystatus;
  UnionCode;
  shetuanstatus;
  LeaveApply = {
    Activity: '',
    Info: '',
    endinfo: ''
  }


  item = {
    code: '',
    memo: '',
    name: '',
    record_id: ''
  };


  fileLoading;
  CertifyImgs = [];
  RecordIdArr = [] //存储后台返回的RecordID

  displayTxt = '取消';
  TaskTime = this.nowDay();
  subStop = false;

  constructor(private navCtrl: NavController, private http: HttpService, private DomSanitizer: DomSanitizer, private HelpUtils: HelpUtils, public navParams: NavParams, private DomS: DomSanitizer) {
    this.ActivityCode = this.navParams.get('ActivityCode');
    this.activitystatus = this.navParams.get('activitystatus');
    this.UnionCode = this.navParams.get('UnionCode');
    this.shetuanstatus = this.navParams.get('shetuanstatus');


  }

  //初始化加载
  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "社团活动",
      fail: function () { },
      success: function () { }
    });
    // 右上角按钮
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });
  }

  //初始化加载
  ionViewDidEnter() {
    this.getactivityinfo();

  }


  //总提交
  tabAlert() {

    if (this.LeaveApply.Activity.trim() == '') {
      this.HelpUtils.toastPopTop('请输入活动名称');
      return false
    }
    if (!this.LeaveApply.Info) {
      this.HelpUtils.toastPopTop('请填写活动内容');
      return false
    }
    if (!this.LeaveApply.endinfo) {
      this.HelpUtils.toastPopTop('请填写活动总结');
      return false
    }

    var RecordIdString = this.RecordIdArr.join(',')

    if (!RecordIdString) {
      this.HelpUtils.toastPopTop('请上传图片');
      return false
    }

    this.subStop = true;

    this.http.postJSON({
      Router: ServelUrl.Url.updateactivityend,
      Method: 'POST',
      Body: {
        Status: this.activitystatus,      //status
        Code: this.ActivityCode,                 // 活动code
        Name: this.LeaveApply.Activity,             // 活动名称
        Info: this.LeaveApply.Info,             // 活动内容
        End: this.LeaveApply.endinfo,             // 活动总结
        AttachmentCode: RecordIdString,           // 活动总结图片
        Scode: this.UnionCode                    // 社团活动code为unionstatus表服务

      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.HelpUtils.toastPopTop('社团活动+1');
        const that = this;
        setTimeout(function () {
          that.navCtrl.push('ShetuanInfoPage', {
            UnionCode: this.UnionCode,
            shetuanstatus: this.shetuanstatus
          });
        }, 1000);
      } else {
        this.subStop = false;
        this.HelpUtils.toastPopTop(res);
      }
    },
      err => console.log(err)
    );

  }

  //======七牛上传

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
        // ...
      },
      error(err) {
        that.HelpUtils.toastPop(err.message);
        return false
        // ...
      },
      complete(res) {
        var file = obj.file;
        that.fileLoading.dismiss();

        that.http.postJSON({
          Router: ServelUrl.Url.saveAttach, Method: 'POST', Body: {
            BizType: 'StudentNeedSupport',
            AttachmentItemName: file.name || '',
            AttachmentItemType: file.type,
            AttachmentItemSize: file.size.toString(),
            AttachmentURL: res.key,
            Base64: '',
          }
        }).then(response => {
          if (!response.FeedbackCode) {
            that.RecordIdArr.push(response.Data.RecordID);
            that.CertifyImgs.push({
              RecordID: response.Data.RecordID,
              Caption: '',	//字符串	说明
              AttachmentURL: window.URL.createObjectURL(file),
              AttachmentItemSize: file.size.toString(),
              AttachmentItemType: file.type,
              AttachmentItemName: file.name,
            });

          } else {
            that.HelpUtils.toastPop(response.FeedbackText);
          }
          console.log(res);
        })
      }
    };
    var subscription = observable.subscribe(observer); // 上传开始
  }

  handleFiles(event) {
    var file = event.target.files[0];

    console.log(file.size, '11111111111')

    if (file.size > 5242880) {
      this.HelpUtils.toastPop('文件大小限制:5M');
      return
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
        BizType: "SchoolApply"
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.upload({ file: file, key: res.Data.Key, token: res.Data.Proof })
      } else if (res.FeedbackText == '获取上传KEY有误，请稍后重试') {
        this.HelpUtils.toastPopTop('图片错误,请重新选择其他图片上传');
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    })
  }

  //获取上传文件后缀名
  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  }

  //删除附件
  deleteCertify(event, index) {
    this.CertifyImgs.splice(index, 1);
    this.RecordIdArr.splice(index, 1);
    event.stopPropagation();
  }


  //备注框字数变化
  // txtChange(value: string) {
  //   var valueTxt = value.trim();
  //   this.values = 50 - valueTxt.length;
  //   if (this.values != 50) {
  //     this.subStop = false;
  //   } else {
  //     this.subStop = true;
  //   }
  // }



  //获取当前时间
  nowDay() {
    const Dates = new Date();
    const year: number = Dates.getFullYear();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day
  }

  // 获取已提交的活动信息
  getactivityinfo() {
    console.log(4);
    this.http.postJSON({
      Router: ServelUrl.Url.getactivityinfo,
      Method: 'POST',
      Body: {
        Uname: this.UnionCode,
        Code: this.ActivityCode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.LeaveApply = res.Data;
        console.log(this.LeaveApply);
      } else {
        this.HelpUtils.toastPopTop(res);
      }
    },
      err => console.log(err)
    );


  }


  ionViewWillLeave() {
    var event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    var d = document.querySelector('ion-backdrop');
    if (d) {
      d.dispatchEvent(event)
    }
  }

}
