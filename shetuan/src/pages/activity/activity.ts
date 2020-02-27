import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";

declare var qiniu;
declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {

  Year = new Date().getFullYear();
  values = 50;
  uuid = '';

  UnionCode;
  UnionName;
  StaffCode;
  ActivityCode;
  activitystatus;
  shetuanstatus;
  retijiao;
  LeaveApply = {
    Activity: '',
    Info: '',
    Starttime: '',
    Place: '',
    Connect: '',
    phone: '',
    peoplenum: '',
    passinfo: ''
  }

  date_value;
  StaffInfo = {
    AvatarUrl: '',
    Name: '',
    UserCode: '',
    IntelUserCode: '',
    Sex: '',
    DepartmentName: '',
  }

  item = {
    code: 'Process_school_activity_apply',
    memo: '',
    name: '社团活动申请',
    record_id: ''
  };

  filetext = ''; //输入内容
  StudentInfo = {};
  MingCiTypes = []; //获奖名次
  JiBieTypes = [];  //获奖级别

  fileLoading;
  CertifyImgs = [];
  RecordIdArr = [] //存储后台返回的RecordID

  displayTxt = '取消';
  TaskTime = this.nowDay();
  subStop = false;
  ActivityStatus;

  constructor(private navCtrl: NavController, private http: HttpService, private DomSanitizer: DomSanitizer, private HelpUtils: HelpUtils, public navParams: NavParams) {
    this.UnionCode = this.navParams.get('UnionCode');
    this.UnionName = this.navParams.get('UnionName');
    this.StaffCode = this.navParams.get('StaffCode');
    this.shetuanstatus = this.navParams.get('shetuanstatus');
    this.ActivityCode = this.navParams.get('ActivityCode');
    this.activitystatus = this.navParams.get('activitystatus');
    this.retijiao = this.navParams.get('retijiao');



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
    if (this.activitystatus == 1) {
      this.getactivityinfo();
      this.ActivityStatus = '1';
    } else {
      this.ActivityStatus = '2';
    }
    this.loadStudentInfo();
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
        this.LeaveApply = res.Data
        console.log(this.LeaveApply);
      } else {
        this.HelpUtils.toastPopTop(res);
      }
    },
      err => console.log(err)
    );


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
    if (!this.LeaveApply.Starttime) {
      this.HelpUtils.toastPopTop('请选择举办时间');
      return false
    }
    if (!this.LeaveApply.Place) {
      this.HelpUtils.toastPopTop('请填写地点');
      return false
    }
    if (!this.LeaveApply.Connect) {
      this.HelpUtils.toastPopTop('请填写活动联络人');
      return false
    }
    if (!this.LeaveApply.phone) {
      this.HelpUtils.toastPopTop('请填写联系方式');
      return false
    }
    if (!this.LeaveApply.peoplenum) {
      this.HelpUtils.toastPopTop('请填写活动人数');
      return false
    }

    this.subStop = true;

    if (this.LeaveApply.Starttime) {
      var date = new Date((this.LeaveApply).Starttime);
      this.date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    }
    console.log(this.LeaveApply, this.date_value);
    this.setcokie();

  }

  //提交修改
  tabAlertr() {
    if (this.LeaveApply.Activity.trim() == '') {
      this.HelpUtils.toastPopTop('请输入活动名称');
      return false
    }
    if (!this.LeaveApply.Info) {
      this.HelpUtils.toastPopTop('请填写活动内容');
      return false
    }
    if (!this.LeaveApply.Starttime) {
      this.HelpUtils.toastPopTop('请选择举办时间');
      return false
    }
    if (!this.LeaveApply.Place) {
      this.HelpUtils.toastPopTop('请填写地点');
      return false
    }
    if (!this.LeaveApply.Connect) {
      this.HelpUtils.toastPopTop('请填写活动联络人');
      return false
    }
    if (!this.LeaveApply.phone) {
      this.HelpUtils.toastPopTop('请填写联系方式');
      return false
    }
    if (!this.LeaveApply.peoplenum) {
      this.HelpUtils.toastPopTop('请填写活动人数');
      return false
    }

    this.subStop = true;

    if (this.LeaveApply.Starttime) {
      var date = new Date((this.LeaveApply).Starttime);
      this.date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    this.setcokie();

  }
  cancel() {
    const that = this;
    this.subStop = false;
    setTimeout(function () {
      that.navCtrl.push('ShetuanInfoPage', {
        UnionCode: this.UnionCode,
        shetuanstatus: this.shetuanstatus
      });
    }, 1000);


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


  //获取个人信息
  loadStudentInfo() {
    this.http.postJSON({
      Router: ServelUrl.Url.GetStudentInfo,
      Method: 'POST',
      Body: {
        uid: '',
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.StudentInfo = res.Data
        console.log('学生信息', this.StudentInfo)
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //提交申请
  setcokie() {
    console.log('tmmms');
    this.uuid = this.guidUUid();

    var formData = {
      action: "studentApply",
      title: this.item.name,
      timestart: this.TaskTime,
      statustxt: '社团指导老师审批进行中',
      status: '1',
      ActivityStatus: this.ActivityStatus,    //判断是否提交还是修改
      AVid: this.uuid,                        //创建的activitycode
      Uname: this.UnionName,                  //社团名称
      ActivityCode: this.ActivityCode,        // 修改活动的activitycode
      UnionCode: this.UnionCode,              // 社团code
      ActivityName: this.LeaveApply.Activity, // 活动名称
      Info: this.LeaveApply.Info,             // 活动内容
      Time: this.date_value,                  // 创建时间
      Place: this.LeaveApply.Place,           // 地点
      Connect: this.LeaveApply.Connect,       // 联系人
      Phone: this.LeaveApply.phone,           // 联系方式
      Num: this.LeaveApply.peoplenum,         // 人数
    }
    var assignObj = Object.assign(formData, this.StudentInfo);

    this.http.postFLOW({
      Router: ServelUrl.Url.launch,
      Method: 'POST',
      Body: {
        flow_id: '',
        flow_code: this.item.code,
        form_data: JSON.stringify(assignObj)
      }
    }).then(
      comments => {
        if (comments == 'ok') {
          this.HelpUtils.toastPopTop('提交成功');
          const that = this;
          setTimeout(function () {
            that.navCtrl.push('ShetuanInfoPage', {
              UnionCode: this.UnionCode,
              shetuanstatus: this.shetuanstatus
            });
          }, 1000);

        } else {
          this.subStop = false;
          this.HelpUtils.toastPopTop(comments.FeedbackText);
        }
      });
  }


  guidUUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
