import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { ServelUrl } from "../../../../app/ServelUrl";
import { HttpService } from "../../../../http/http.Service";
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { HelpUtils } from "../../../../app/utils/HelpUtils";

class Port {
  public Code: string;
  public CodeName: string;
}

class Mproject {
  public Code: string;
  public CodeName: string;
}

declare var qiniu;
declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-secondclassapply',
  templateUrl: 'secondclassapply.html'
})
export class SecondClassApplyPage {

  ports: Port[];
  port: Port;

  mains: Mproject[];
  main: Mproject;

  subs: Mproject[];
  sub: Mproject;

  uuid;
  suscore;
  temTitle = '第二课堂申请'

  LeaveApply = {
    JiBie: {
      Code: '',
      CodeName: ''
    },
    MingCi: {
      Code: '',
      CodeName: ''
    },
    StartDate: '',
    AwardDate: '',
    ActivityName: '',
    Info: ''
  }

  schoolcalendarmap = {
    AcademicTermCode: '',
    AcademicYearCode: '',
  };

  item = {
    code: 'Process_SecondClassRoom',
    memo: '',
    name: '',
    record_id: ''
  };

  StudentInfo = {
    AvatarUrl: '',
    Name: '',
    UserCode: '',
    IntelUserCode: '',
    Sex: '',
    DepartmentName: '',
  }

  formData = {

  }
  MingCiTypes = []; //获奖名次
  JiBieTypes = [];  //获奖级别

  fileLoading;
  CertifyImgs = [];
  RecordIdArr = [] //存储后台返回的RecordID

  displayTxt = '取消';
  selestFB = true; //搜索框禁用
  selestMC = true
  TaskTime = this.nowDay();
  subStop = false;

  bodyHeight;
  Info = '';
  constructor(private navCtrl: NavController, private http: HttpService, private DomSanitizer: DomSanitizer, private HelpUtils: HelpUtils, public navParams: NavParams) {
  }

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
    if (this.navParams.get('item')) {
      this.item = this.navParams.get('item');
    }
  }
  //初始化加载
  ionViewDidEnter() {

    // if (this.item.code == undefined) {
    //   this.item.code = 'Process_SecondClassRoom';
    // }
    // if (!this.item.code) {
    //   this.item.code = 'Process_SecondClassRoom';

    // }
    console.log('item', this.item);
    this.loadschoolcalendarmap(); //获取学年学期
    this.loadStudentInfo();  //获取个人信息
    this.loadtype();//获取类别
  }

  loadschoolcalendarmap() {
    this.http.postJSON({
      Router: ServelUrl.Url.schoolcalendarnowyearterm,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.schoolcalendarmap = res.Data;
      } else {
        console.log(res);
      }
    })

  }


  //获取个人信息
  loadStudentInfo() {
    this.bodyHeight = document.documentElement.clientHeight + 'px';
    this.http.postJSON({
      Router: ServelUrl.Url.GetStudentInfo,
      Method: 'POST',
      Body: {
        uid: '',
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.StudentInfo = res.Data
      } else {
        console.log(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }
  //获取获奖项目
  loadProgramList() {
    this.http.postJSON({
      Router: ServelUrl.Url.GetRewardProgramList,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.ports = res.Data
      } else {
        console.log(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //获取类别
  loadtype() {
    this.http.postJSON({
      Router: ServelUrl.Url.getsecondclasstype,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.ports = res.Data;
      } else {
        console.log(res.FeedbackText);
      }
    },
      err => console.log(err)
    );

  }

  //获取主项目
  loadMainPj() {
    this.http.postJSON({
      Router: ServelUrl.Url.getmainpj,
      Method: 'POST',
      Body: {
        Code: this.port.Code
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.mains = res.Data;
      } else {
        console.log(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //获取子项目
  loadSubPj() {
    this.http.postJSON({
      Router: ServelUrl.Url.getsubpj,
      Method: 'POST',
      Body: {
        Type: this.port.Code,
        Code: this.main.Code
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.subs = res.Data;
      } else {
        console.log(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //获取获奖级别  国家级 省级
  loadGetLevelList() {
    this.getbizinfo(this.sub.Code);
    this.http.postJSON({
      Router: ServelUrl.Url.getsubjibie,
      Method: 'POST',
      Body: {
        Type: this.port.Code,
        Code: this.sub.Code
      }
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

  //获取认定依据
  getbizinfo(m) {
    console.log("getbizinfo 2", m);
    this.http.postJSON({
      Router: ServelUrl.Url.getBizInfo,
      Method: 'POST',
      Body: {
        Code: m
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        console.log('res', res);
        this.Info = res.Data.Info;
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );

  }
  //总提交
  tabAlert() {
    if (!this.schoolcalendarmap.AcademicTermCode) {
      this.HelpUtils.toastPopTop('网络异常，未捕获到学年学期，请重新登录第二课堂或者校园集结号！');
      return false

    }

    if (!this.port) {
      this.HelpUtils.toastPopTop('请选择类别');
      return false
    }
    if (!this.main) {
      this.HelpUtils.toastPopTop('请选择主项目');
      return false
    }
    if (!this.sub) {
      this.HelpUtils.toastPopTop('请选择子项目');
      return false
    }

    if (!this.LeaveApply.StartDate) {
      this.HelpUtils.toastPopTop('请选择参与时间');
      return false
    }

    if (this.JiBieTypes && this.JiBieTypes.length > 0) {
      if (!this.LeaveApply.JiBie.Code) {
        this.HelpUtils.toastPopTop('请选择名次');
        return false
      }
      if (!this.LeaveApply.ActivityName) {
        this.HelpUtils.toastPopTop('请写入活动名称');
        return false
      }
      if (!this.LeaveApply.AwardDate) {
        this.HelpUtils.toastPopTop('请选择获奖时间');
        return false
      }

      console.log('StartDate', this.LeaveApply.StartDate, this.LeaveApply.AwardDate);
      var start = Date.parse(this.LeaveApply.StartDate);
      var award = Date.parse(this.LeaveApply.AwardDate);
      console.log('parse StartDate', start, award);

      if (start > award) {
        this.HelpUtils.toastPopTop('参与时间不能大于获奖时间！请认真核对时间！');
        return false
      }

    } else {
      this.LeaveApply.JiBie.Code = '1'
      if (!this.LeaveApply.Info) {
        this.HelpUtils.toastPopTop('请写入详细描述');
        return false
      }
    }


    if (!this.CertifyImgs.length) {
      this.HelpUtils.toastPopTop('请添加证明材料');
      return false
    }

    this.checkscore();

  }


  postsub() {

    this.subStop = true;

    var RecordIdString = this.RecordIdArr.join(',')

    if (this.LeaveApply.JiBie.Code == '1') {
      var subcode = this.sub.Code;
    } else {
      var subcode = this.LeaveApply.JiBie.Code;

    }

    console.log('SubCode', subcode);
    this.uuid = this.guidUUid();
    this.formData = {
      action: "studentApply",
      title: this.temTitle,
      timestart: this.TaskTime,
      AVid: this.uuid,                        //创建的RecordId
      SuScore: this.suscore ? this.suscore.toString() : '',
      ActivityName: this.LeaveApply.ActivityName,
      Info: this.LeaveApply.Info,
      AcademicTerm: this.schoolcalendarmap.AcademicTermCode,   //学期
      AcademicYear: this.schoolcalendarmap.AcademicYearCode,   //学年
      PortCode: this.port.Code,
      PortName: this.port.CodeName,
      MainCode: this.main.Code,
      MainName: this.main.CodeName,
      SubCode: subcode,
      SubName: this.sub.CodeName,
      RewardLevelsCode: this.LeaveApply.JiBie.Code,
      RewardLevelsName: this.LeaveApply.JiBie.CodeName,
      StartDate: this.LeaveApply.StartDate,
      AwardDate: this.LeaveApply.AwardDate,
      AttachmentCode: RecordIdString,
      statustxt: '班委审批进行中',
      status: '1',
      CustomScore: '0'
    }

    var assignObj = Object.assign(this.formData, this.StudentInfo)

    this.http.postFLOW({
      Router: ServelUrl.Url.launch,
      Method: 'POST',
      Body: {
        flow_id: '',
        flow_code: this.item.code,
        form_data: JSON.stringify(assignObj)
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
            console.log('response', response);
            that.RecordIdArr.push(response.Data.RecordID);
            that.CertifyImgs.push({
              RecordID: response.Data.RecordID,
              Caption: '',	//字符串	说明
              AttachmentURL: window.URL.createObjectURL(file),
              URL: response.Data.URL,
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

  //类别跳转
  TypeChange(event: { component: SelectSearchableComponent, value: any }) {
    this.displayTxt = '取消';
    this.selestFB = false;
    if (this.main) {
      this.main.Code = '';
      this.main.CodeName = '';
    }
    if (this.sub) {
      this.sub.Code = '';
      this.sub.CodeName = '';
    }
    this.JiBieTypes = [];  //获奖级别
    this.LeaveApply.JiBie.Code = null;
    this.LeaveApply.ActivityName = null;
    this.Info = '';

    this.loadMainPj();   //获取主项目
  }

  //主项目跳转
  MainChange(event: { component: SelectSearchableComponent, value: any }) {
    console.log('mmmmm');
    this.displayTxt = '取消';
    this.selestFB = false;
    if (this.sub) {
      this.sub.Code = '';
      this.sub.CodeName = '';
    }
    this.JiBieTypes = [];  //获奖级别
    this.LeaveApply.JiBie.Code = null;
    this.LeaveApply.ActivityName = null;
    this.Info = '';

    this.loadSubPj();   //获取子项目

  }

  //子项目跳转
  SubChange(event: { component: SelectSearchableComponent, value: any }) {
    this.displayTxt = '取消';
    this.selestFB = false;
    this.JiBieTypes = [];  //获奖级别
    this.LeaveApply.JiBie.Code = null;
    this.LeaveApply.ActivityName = '';
    this.Info = '';

    this.loadGetLevelList();

  }

  //跳转帮助页
  gotoHelp() {
    this.navCtrl.push('HelpPage');
  }

  //获取当前时间
  nowDay() {
    const Dates = new Date();
    const year: number = Dates.getFullYear();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day
  }

  //离开页面
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


  guidUUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


  //提交项目和以前提交的分数总和进行check
  checkscore() {
    this.subStop = true;

    if (this.LeaveApply.JiBie.Code == '1') {
      var subcode = this.sub.Code;
    } else {
      var subcode = this.LeaveApply.JiBie.Code;

    }

    console.log('subcode', subcode);
    this.http.postJSON({
      Router: ServelUrl.Url.scorecheck,
      Method: 'POST',
      Body: {
        Code: subcode,
        IntelUserCode: this.StudentInfo.IntelUserCode,
        AcademicTerm: this.schoolcalendarmap.AcademicTermCode,   //学期
        AcademicYear: this.schoolcalendarmap.AcademicYearCode   //学年
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.suscore = parseInt(res.Data.Datas.suscore);
        var score = parseInt(res.Data.Score);
        var total = parseInt(res.Data.Total);
        console.log(this.suscore);
        if (this.suscore < 0) {
          if (this.suscore + score == 0) {
            if (total > 0) {
              this.HelpUtils.toastPopTop('提交的子项目已达到本学期该子项目最高分，请等待审核结果！');
              this.subStop = false;
              return false;
            } else {
              this.HelpUtils.toastPopTop('提交的子项目已达到本学期该子项目最高分，请选择别的项目！');
              this.subStop = false;
              return false;

            }

          } else {
            this.postsub();
            console.log('bbb');
          }
        } else {
          this.postsub();
          console.log('aaa');
        }
      } else {
        console.log(res.FeedbackText);
        this.subStop = false;

      }
    },
      err => console.log(err)
    );

  }

  //跳转图片放大
  navPreview(params) {
    this.navCtrl.push('PreviewPage', params)
  }


}
