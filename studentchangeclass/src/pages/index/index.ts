import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";
import { ServelUrl } from "../../app/ServelUrl";
import { TranslationWidth } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';


declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {
  subStop = true;
  classStop = true;
  showoff = true;
  UserCode; //学号
  UserName;//姓名
  queryinfo = [];
  Role = [];
  RoleStatus;
  Record = [];
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
  selecttag = '学号';
  bodyHeight;
  moreData: boolean = true;
  teacherstatus: boolean = false;
  substatus: boolean = false;
  message = '请在班级空间中设置班委后，由班委调整 班委调整后需要经过辅导员审批才可生效';
  class = [];
  ClassCode;
  ClassName;
  pointer;
  Total;
  StuInfo = [];
  BanStuInfo = [];

  //工作流相关
  temTitle = '移出班级申请';

  //申请发起人信息
  operator = {
    name: '',
    IntelUserCode: ''
  }
  TaskTime = this.nowDay();

  recordone = {
    status: ''
  }

  Intel = {
    IntelUserCode: ''
  }

  searchQuery;
  constructor(private navCtrl: NavController, public navParams: NavParams, private http: HttpService, private HelpUtils: HelpUtils, private DomS: DomSanitizer, public alertCtrl: AlertController) {

  }
  //初始化加载
  ionViewWillEnter() {

    antlinker.configTitle({
      type: "label",
      title: "学生调班",
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
    this.rolecheck();
    this.loadGetIntelUser();
  }


  //从我的社团进入社团详情页
  // openshetuaninfoPage(n) {
  //   console.log(n.Role);
  //   if (n.Role == '33330006' || n.Role == '33330007') {
  //     if (n.Days <= 0) {
  //       this.shetuanstatus = 1; //负责人社团详情
  //     } else {
  //       this.shetuanstatus = 2; //普通社员
  //     }
  //   } else {
  //     this.shetuanstatus = 2; //普通社员
  //   }
  //   this.navCtrl.push('ShetuanInfoPage', {
  //     UnionCode: n.UnionCode,
  //     Member: n.Member,
  //     shetuanstatus: this.shetuanstatus
  //   });
  // }

  //选择搜索标签种类
  change(m) {
    this.selecttag = m;
    this.searchQuery = '';
    this.UserCode = '';
    this.UserName = '';
  }
  //判断登陆者身份
  rolecheck() {
    console.log(999);
    this.bodyHeight = document.documentElement.clientHeight + 'px';

    this.http.postJSON({
      Router: ServelUrl.Url.rolecheck,
      Method: 'POST',
      Body: {
        UID: ''
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.queryinfo = res.Data.map(item => item.Role);
        this.Role = this.queryinfo.filter(item => item == 'Counselor' || item == 'Adviser');
        console.log(this.queryinfo);
        console.log(this.Role);
        if (this.Role && this.Role.length) {
          this.getteacherclass();
        }

      } else if (!res.FeedbackCode) {
        this.getclass();

      } else {
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
        var subclasscode = this.class.map(item => item.ClassCode)
        var subclassname = this.class.map(item => item.ClassName)
        this.ClassName = subclassname.toString();
        this.ClassCode = subclasscode.toString();
        if (!this.ClassName) {
          this.showoff = false;
        }
        console.log(this.ClassCode, this.ClassName,this.showoff);
        this.getbanclassstuinfo();


      } else {
        console.log(res);
      }

    })


  }

  //查询准备
  searchbegin(m) {
    if (m.length > 0) {
    if (this.selecttag == '学号') {
      this.UserCode = m;
      this.subStop = false;
    } else if (this.selecttag == '姓名') {
      this.UserName = m;
      this.subStop = false;
    } 
  } else {
    this.subStop = true;
  }

    console.log(m);
    // this.getintelcode();
  }

  // 
  //跳转详情页
  gotodetail() {
    if (this.Role.length) {
      this.RoleStatus = 1;
    }
    this.navCtrl.push('DetailPage', {
      UserCode: this.UserCode,
      UserName: this.UserName,
      RoleStatus: this.RoleStatus,
    });
  }

  // search(m) {
  //   console.log(m);
  //   if (m.length > 20) {
  //     this.HelpUtils.toastPop('最多输入20字');
  //     return
  //   }


  // }



  // 帮助弹窗页展示
  gotoHelp() {
    let alert = this.alertCtrl.create({
      // title: '友情提示',
      enableBackdropDismiss: false,
      message: this.message,
      cssClass: 'helpalert',
      buttons: ['确定']

    });
    alert.present();

  }

  //开始准备加载老师调班页面
  gotobegin(m, n) {

    this.ClassCode = m.ClassCode;
    this.ClassName = m.ClassName;
    this.pointer = n;
    this.classStop = false;
    console.log('开始准备加载', m.ClassCode, n);
  }

  //加载老师调班页面
  gototiaoban() {

    this.teacherstatus = true;
    this.getclassstuinfo();
  }

  //老师获取班级成员详情
  getclassstuinfo() {
    console.log('老师获取班级成员详情开始')
    this.http.postJSON({
      Router: ServelUrl.Url.getclassstuinfo,
      Method: 'POST',
      Body: {
        Code: this.ClassCode,
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.Total = res.Data.Total;
        this.StuInfo = res.Data.Datas;
        console.log('成功获取班级成员', this.Total, this.StuInfo);

      } else {
        console.log(res);
      }

    })

  }

  //班委获取班级成员详情
  getbanclassstuinfo() {
    console.log('获取班级成员详情开始')
    this.http.postJSON({
      Router: ServelUrl.Url.getclassstuinfo,
      Method: 'POST',
      Body: {
        Code: this.ClassCode,
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.Total = res.Data.Total;
        this.BanStuInfo = res.Data.Datas;
        console.log('成功获取班级成员', this.Total, this.StuInfo);

      } else {
        console.log(res);
      }

    })

  }


  //移除当前的班级
  classoff(m, n) {
    console.log('开始移除班级', m, n);
    this.student.name = m.Name;
    this.student.UserCode = m.UserCode;
    this.student.IntelUserCode = m.IntelUserCode;
    this.student.classname = this.ClassName;
    this.student.AcademyName = m.AcademyName;
    this.student.Counselor = m.Counselor;
    this.substatus = true;
  }

  //确定
  gosub() {
    this.substatus = false;
    if (this.Role.length) {
      console.log('老师移除学生开始');
      this.teacherrecordcheck();
    } else {
      console.log('移除已经提交到辅导员');
      this.recordcheck();

    }

  }

  // 是否已经审批check
  recordcheck() {
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
          this.HelpUtils.toastPop('该学号对应的学生移出班级正在审批中');
        } else {
          console.log('开始sssws')
          this.flowstart();  //发起工作流
          this.recordsave();  //前页审批记录表保存
        }

      } else {
        console.log(res.FeedbackCode);
      }

    })

  }

  // 是否已经审批check
  teacherrecordcheck() {
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
          this.HelpUtils.toastPop('该学号对应的学生移出班级正在审批中');
        } else {
          console.log('开始rrrrra')
          this.pushstudent();
        }

      } else {
        console.log(res.FeedbackCode);
      }

    })

  }


  //跳转申请详情记录页
  gotoprocess() {
    this.navCtrl.push('ProcessPage', {
    });

  }
  //取消
  cancel() {
    this.substatus = false;
  }

  //老师移除学生
  pushstudent() {
    console.log('laoshi开始移除学生', this.student.IntelUserCode)
    this.http.postJSON({
      Router: ServelUrl.Url.pushstudent,
      Method: 'POST',
      Body: {
        Code: this.student.IntelUserCode,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        console.log('老师移除学生成功');
        this.HelpUtils.toastPop('该学生被成功移出当前班级');
        this.getclassstuinfo();

      } else {
        console.log(res);
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
        this.HelpUtils.toastPopTop('该学生的移出班级申请已提交到辅导员审批处');
      } else {
        this.HelpUtils.toastPopTop(res);
      }
    },
      err => console.log(err)
    );

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
        Pnum: '1',  // 班级人数
        Type: 'pushclass',              //保存类型
        Operator: this.operator.IntelUserCode,  //申请人
        Counselor: this.student.Counselor      //辅导员
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        console.log('保存记录成功'); //sql 触发器的缘故，更新class表同时更新了updatelog表
      } else {
        console.log(res.FeedbackCode);
      }

    })

  }

  //获取当前时间
  nowDay() {
    const Dates = new Date();
    const year: number = Dates.getFullYear();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day
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

  //根据学号获取用户
  getintelcode() {
    this.http.postJSON({
      Router: ServelUrl.Url.getintelcode,
      Method: 'POST',
      Body: {
        Code: this.UserCode,   // IntelUserCode

      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Intel = res.Data;
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );

  }
}



