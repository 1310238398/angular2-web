import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { ServelUrl } from "../../../../app/ServelUrl";
import { HttpService } from "../../../../http/http.Service";
import { HelpUtils } from "../../../../app/utils/HelpUtils";

declare var qiniu;
declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-qualityup',
  templateUrl: 'qualityup.html'
})
export class QualityUpPage {

  temTitle = '辅导员(班主任)考核加分信息上报'
  LeaveApply = {
    Name: '',
    JiBie: {
      Code: '',
      CodeName: ''
    },
    MingCi: {
      Code: '',
      CodeName: '' 
    },
    StartDate: ''
  }

  StaffInfo = {
    AvatarUrl: '',
    Name: '',
    UserCode: '',
    IntelUserCode: '',
    Sex: '',
    DepartmentName: '',
  }

  item = {
    code: '',
    memo: '',
    name: '',
    record_id: ''
  };

  MingCiTypes = []; //获奖名次
  JiBieTypes = [];  //获奖级别

  fileLoading;
  CertifyImgs = [];
  RecordIdArr = [] //存储后台返回的RecordID

  displayTxt = '取消';
  TaskTime = this.nowDay();
  subStop = false;

  constructor(private navCtrl: NavController, private http: HttpService, private DomSanitizer: DomSanitizer, private HelpUtils: HelpUtils, public navParams: NavParams) { }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });

    antlinker.configTitle({
      type: "label",
      title: "校园申请",
      fail: function () { },
      success: function () { }
    });
    this.item = this.navParams.get('item');
    console.log(this.item)
  }
  //初始化加载
  ionViewDidEnter() {
    this.loadGetLevelList(); //获取获奖级别
    this.loadGetMingCi();   //获取获奖名次
    this.loadStaffInfo();  //获取辅导员个人信息
  }

  //获取辅导员个人信息
  loadStaffInfo() {
    this.http.postJSON({
      Router: ServelUrl.Url.GetStaffInfo,
      Method: 'POST',
      Body: {
        uid: '',
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.StaffInfo = res.Data
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //获取获奖级别  国家级 省级
  loadGetLevelList() {
    this.http.postJSON({
      Router: ServelUrl.Url.RewardLevelList,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.JiBieTypes = res.Data;
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //获取获奖名次
  loadGetMingCi() {
    this.http.postJSON({
      Router: ServelUrl.Url.RewardGradeList,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.MingCiTypes = res.Data
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //总提交
  tabAlert() {
    if (this.LeaveApply.Name.trim() == '') {
      this.HelpUtils.toastPopTop('请输入奖项名称');
      return false
    }
    if (!this.LeaveApply.JiBie.Code) {
      this.HelpUtils.toastPopTop('请选择级别');
      return false
    }
    if (!this.LeaveApply.MingCi.Code) {
      this.HelpUtils.toastPopTop('请选择名次');
      return false
    }
    if (!this.LeaveApply.StartDate) {
      this.HelpUtils.toastPopTop('请选择获奖时间');
      return false
    }
    if (!this.CertifyImgs.length) {
      this.HelpUtils.toastPopTop('请添加获奖证书');
      return false
    }

    this.subStop = true;

    var RecordIdString = this.RecordIdArr.join(',')
    var formData = {
      action: "counsellorApply",
      title: this.temTitle,
      timestart: this.TaskTime,

      WinningName: this.LeaveApply.Name,
      RewardLevelsCode: this.LeaveApply.JiBie.Code,
      RewardLevelsName:this.LeaveApply.JiBie.CodeName,
      WinningOrderCode: this.LeaveApply.MingCi.Code,
      WinningOrderName: this.LeaveApply.MingCi.CodeName,
      AwardDate: this.LeaveApply.StartDate,
      AttachmentCode: RecordIdString,

      StaffAvatarUrl: this.StaffInfo.AvatarUrl,
      StaffName: this.StaffInfo.Name,
      StaffUserCode: this.StaffInfo.UserCode,
      StaffIntelUserCode: this.StaffInfo.IntelUserCode,
      StaffSex: this.StaffInfo.Sex,
      StaffDepartmentName: this.StaffInfo.DepartmentName,

      statustxt: '学生工作处审批进行中',
      status: '1'
    }

    this.http.postFLOW({
      Router: ServelUrl.Url.launch,
      Method: 'POST',
      Body: {
        flow_id: '',
        flow_code: this.item.code,
        form_data: JSON.stringify(formData)
      }
    }).then(res => {
      if (res == 'ok') {
        this.HelpUtils.toastPopTop('提交成功');
        const that = this;
        setTimeout(function () {
          that.navCtrl.push('IndexApplyPage');
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

  //获取当前时间
  nowDay() {
    const Dates = new Date();
    const year: number = Dates.getFullYear();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day
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
