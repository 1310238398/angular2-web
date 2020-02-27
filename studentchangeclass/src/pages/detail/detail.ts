import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Item } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { HelpUtils } from "../../app/utils/HelpUtils";
import { HttpService } from "../../http/http.Service";
import { ServelUrl } from "../../app/ServelUrl";



declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  substatus = false;
  tiaobanstatus = false;
  UserCode;
  UserName;
  RoleStatus;
  recordone = {
    status: ''
  }
  student = {
    IntelUserCode: '',
    class: '',
    classname: '',
    name: '',
    AcademyName: '',
    majorname: '',
    UserCode: '',
    Counselor: ''
  };
  Counselor;
  class = [];
  ClassCode;
  ClassName;
  classpeople = {
    classnum: ''
  };
  subclasscode;
  temTitle = '调班申请';

  //申请发起人信息
  operator = {
    name: '',
    IntelUserCode: ''
  }
  TaskTime = this.nowDay();

  IntelCode;
  ImgInfo = {
    AttachmentUrl: ''
  }
  constructor(private navCtrl: NavController, public alertCtrl: AlertController, private HelpUtils: HelpUtils, public navParams: NavParams, private http: HttpService,private DomS: DomSanitizer) {
    this.UserCode = this.navParams.get('UserCode');
    this.UserName = this.navParams.get('UserName');
    this.RoleStatus = this.navParams.get('RoleStatus');
    this.IntelCode = this.navParams.get('IntelCode');

    console.log(this.UserCode);
    console.log('nihao',this.IntelCode);

  }
  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "学生调班",
      fail: function () { },
      success: function () { }
    });
  }

  //初始化加载
  ionViewDidEnter() {
    this.loadGetIntelUser();
    this.getstudentinfo();
    if (this.RoleStatus) {
      this.getteacherclass();
    } else {
      this.getclass();
    }
  }


  // 获取学生基本情报
  getstudentinfo() {
    console.log(778);
    console.log('aa', this.UserCode);

    this.http.postJSON({
      Router: ServelUrl.Url.studentinfo,
      Method: 'POST',
      Body: {
        Code: this.UserCode,
        Name: this.UserName,
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data.Data) {
        console.log(res);
        this.student = res.Data.Data;
        this.ImgInfo = res.Data.Info;
        console.log(this.ImgInfo);
      } else {
        this.HelpUtils.toastPop('查无此人');
        console.log(res);
      }

    })

  }

  //辅导员获取自己的班级
  getteacherclass() {
    console.log('getclassbyteacher');
    this.http.postJSON({
      Router: ServelUrl.Url.getclassbyteacher,
      Method: 'POST',
      Body: {
        UID: ''
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.class = res.Data;
        console.log(res.Data);
      } else {
        console.log(res);
      }

    })

  }

  //班委获取自己的班级
  getclass() {
    console.log('getclassbystu');
    this.http.postJSON({
      Router: ServelUrl.Url.getclass,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.class = res.Data;
        console.log(res.Data);
      } else {
        console.log(res);
      }

    })


  }

  //选择班级
  DateSection() {
    let alert = this.alertCtrl.create({
      title: '请选择班级',
      enableBackdropDismiss: false,
      cssClass: 'chooseclass',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确定',
          handler: data => {
            console.log(data);
            if (!data) {
              this.HelpUtils.toastPop('请选择班级！');
              return false;
            }

            console.log('mmmm', data);
            this.subclasscode = data;
            var tempclass = this.class.filter(item => item.ClassCode == data);
            this.ClassName = tempclass.map(item => item.ClassName);
            console.log('sssaaa', this.ClassName);
            this.substatus = true;
          }
        }
      ]
    });
    this.ClassCode = this.class.map(item => item.ClassCode);
    this.ClassName = this.class.map(item => item.ClassName);
    console.log('ttss', this.ClassName);
    for (let i = 0; i < this.ClassName.length; i++) {
      var obj = {
        type: 'radio',
        label: this.ClassName[i],
        value: this.ClassCode[i]
      };
      alert.addInput(obj);
    }
    alert.present();
  }

  //确定
  gosub() {
    this.substatus = false;
    if (this.RoleStatus) {
      this.teacherrecordcheck();
    } else {
      this.recordcheck();
      console.log('shiyan');
    }

  }

  //取消
  cancel() {
    this.substatus = false;
  }


  //调整班级
  changeclass() {
    if (this.subclasscode == this.student.class) {
      this.HelpUtils.toastPop('该学生已经是所选班级的一员，请重新选择！');
      return false;
    }
    this.http.postJSON({
      Router: ServelUrl.Url.changeclass,
      Method: 'POST',
      Body: {
        Class: this.subclasscode,
        Code: this.student.IntelUserCode,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        console.log('调整班级成功'); //sql 触发器的缘故，更新class表同时更新了updatelog表
        this.getstudentinfo();
        this.HelpUtils.toastPop('调整班级成功');


      } else {
        console.log(res.FeedbackCode);
      }

    })

  }


  //发起工作流
  flowstart() {
    console.log('工作流开始', this.operator.name);
    var formData = {

      action: "studentApply",
      title: this.temTitle,
      timestart: this.TaskTime,
      NewClass: this.subclasscode,
      NewClassName: this.ClassName,
      sponsor: this.operator.name,  //申请发起人名字
      sponsorcode: this.operator.IntelUserCode,  //申请发起人IntelUserCode
      // WinningName: this.port.ProgramName,
      // RewardLevelsCode: this.LeaveApply.JiBie.Code,
      // RewardLevelsName: this.LeaveApply.JiBie.CodeName,
      // WinningOrderCode: this.LeaveApply.MingCi.Code,
      // WinningOrderName: this.LeaveApply.MingCi.CodeName,
      // AwardDate: this.LeaveApply.StartDate,
      // AttachmentCode: RecordIdString,

      statustxt: '辅导员审批进行中',
      status: '1'
    }

    var assignObj = Object.assign(formData, this.student)

    this.http.postFLOW({
      Router: ServelUrl.Url.launch,
      Method: 'POST',
      Body: {
        flow_id: '',
        flow_code: 'Process_StudentChangeClass',
        form_data: JSON.stringify(assignObj)
      }
    }).then(res => {
      if (res == 'ok') {
        this.HelpUtils.toastPopTop('该学生的调班申请已提交到辅导员审批处');
      } else {
        this.HelpUtils.toastPopTop(res);
      }
    },
      err => console.log(err)
    );

  }

  //保存调班成功前记录
  recordgo() {
    var Counselor = this.class.map(item => item.Counselor);
    this.Counselor = Counselor.toString();
    console.log('开始获取班级人数', this.Counselor);

    //获取选择班级的人数
    this.http.postJSON({
      Router: ServelUrl.Url.getclassnum,
      Method: 'POST',
      Body: {
        Code: this.subclasscode  // IntelUserCode
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.classpeople = res.Data;
        console.log('获取班级人数成功', this.classpeople.classnum); //sql 触发器的缘故，更新class表同时更新了updatelog表
        if (this.classpeople.classnum) {
          console.log('开始保存记录')
          this.recordsave();
        }
      } else {
        console.log(res.FeedbackCode);
      }

    })

  }

  // 保存调班记录
  recordsave() {
    this.http.postJSON({
      Router: ServelUrl.Url.recordsave,
      Method: 'POST',
      Body: {
        Code: this.student.IntelUserCode,   // IntelUserCode
        Name: this.student.name,   // 姓名
        Cname: this.student.classname,  // 班级名
        Ucode: this.student.UserCode,  // 学号
        Pnum: this.classpeople.classnum,  // 班级人数
        Type: 'changeclass',              //保存类型
        Operator: this.operator.IntelUserCode,  //申请人
        Counselor: this.Counselor      //辅导员

      }
    }).then(res => {
      if (!res.FeedbackCode) {
        console.log('保存记录成功'); //sql 触发器的缘故，更新class表同时更新了updatelog表
      } else {
        console.log(res.FeedbackCode);
      }

    })

  }

  // 是否已经审批check
  recordcheck() {
    if (this.subclasscode == this.student.class) {
      this.HelpUtils.toastPop('该学生已经是所选班级的一员，请重新选择！');
      return false;
    }
    this.http.postJSON({
      Router: ServelUrl.Url.recordone,
      Method: 'POST',
      Body: {
        Code: this.student.IntelUserCode,   // IntelUserCode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.recordone = res.Data;
        console.log('单条记录获取成功'); //sql 触发器的缘故，更新class表同时更新了updatelog表
        if (this.recordone && this.recordone.status) {
          this.HelpUtils.toastPop('该学号对应的学生调班正在审批中');
        } else {
          console.log('开始sssws')
          this.flowstart();  //发起工作流
          this.recordgo();  //前页审批记录表保存
        }

      } else {
        console.log(res.FeedbackCode);
      }

    })

  }

  // 是否已经审批check
  teacherrecordcheck() {
    if (this.subclasscode == this.student.class) {
      this.HelpUtils.toastPop('该学生已经是所选班级的一员，请重新选择！');
      return false;
    }
    this.http.postJSON({
      Router: ServelUrl.Url.recordone,
      Method: 'POST',
      Body: {
        Code: this.student.IntelUserCode,   // IntelUserCode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.recordone = res.Data;
        console.log('单条记录获取成功'); //sql 触发器的缘故，更新class表同时更新了updatelog表
        if (this.recordone && this.recordone.status) {
          this.HelpUtils.toastPop('该学号对应的学生调班正在审批中');
        } else {
          console.log('开始aaaarrr')
          this.changeclass();
        }

      } else {
        console.log(res.FeedbackCode);
      }

    })

  }


  //获取当前用户
  loadGetIntelUser() {
    this.http.postJSON({
      Router: ServelUrl.Url.getintelusername,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.operator = res.Data
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //获取当前时间
  nowDay() {
    const Dates = new Date();
    const year: number = Dates.getFullYear();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day
  }
}



