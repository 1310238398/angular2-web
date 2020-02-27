import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";

//import { HelpPage } from '../help/help';

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {

  items = {
    Note: '', //认定说明
    ConfirmStage: '',//认定阶段 0无认定任务阶段 1初次认定阶段 2复核认定阶段
    AvatarUrl: '', //头像链接
    Name: '', //用户名
    UserCode: '', //学号
    Acadamy: '', //学院名
    Attachs: '', //申请所需资料完成情况 0未完成 1已完成
    Enconomic: '', //经济情况调查问卷完成情况 0未完成 1已完成
    SelfAssessment: '', //学生自评完成情况 0未完成 1已完成
    SelfAssessmentTime: '', //学生自评开启时间 如果收到空 可点击，其他不可点击
    SubmitStatus: '', //提交按钮情况情况 0提交 1申请修改认定资料
    Status: '',         // 空 未提交资料 0待审批 1已通过 2已拒绝  |
    StatusMain: '',     //41直接认定 42一票否定 43小组评议 |
    SchoolAttitude: '',//正式数据资助中心意见(仅针对直接认定和一票否定) 0待审批 1已通过 2已拒绝 |
    RefuseReason: '', //拒绝原因
    ConfirmReason: '', //手输的认定原因
    ConfirmReasonSelect: '', //选择的认定原因多个
    RecognitionLevelCode: '', //认定平级  不与评级87000040
    RecognitionLevelName: '', //认定结论 eg:特别困难
    IntelUserCode: '',
    InsertDatetime: '',      //上一次填写的时间
    TmpTime: '',        //||资料提交时间,0表示没有到这个步骤|
    ApprovalTime: '',   //||审批通过或不通过时间,0表示没有到这个步骤|
    EndTime: '',        //|字符串|认定完成时间,0表示没有到这个步骤|
    Effective:''
  }

  openbtn = false; //学生自评是否可以点击  true 不可点击  false 可以点击
  submitbtn = true; //提交按钮是否可以点击  true 不可点击  false 可以点击
  applyBtn = false; //申请变更资料按钮是否可以点击  true 不可点击  false 可以点击
  proCess = [];     //进程

  removeWrap = false;  //是否显示取消按钮   true 显示
  firstBtn = true  //是否显示提交按钮   true 显示
  againBtn = false;  //申请变更认定资料按钮 true 显示

  exChange = '1';  //判断是否可以修改 0不可以  1可以
  speakcokieStr = '' //是否存在修改原因

  constructor(private navCtrl: NavController, public alertCtrl: AlertController, private http: HttpService, public navParams: NavParams, private HelpUtils: HelpUtils) { }

  ionViewWillEnter() {
    //var that = this;
    antlinker.configTitleButton({
      showClose: false,
      type: "label",
      text: " ",
      success: function () { },
      fail: function () { },
      trigger: function () {
        //that.navCtrl.push(HelpPage);
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
    this.initItems();
  }

  //进入页面刷新数据
  initItems() {
    this.http.postJSON({
      Router: ServelUrl.Url.substatus,
      Method: 'POST',
      Body: {}
    }).then(
      comments => {
        this.items = comments.Data || [];
        this.loadChange();
      });
  }
  //进入页面获取修改原因
  loadChange() {
    this.http.postJSON({
      Router: ServelUrl.Url.GetModifyReason,
      Method: 'POST',
      Body: {}
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          if (comments.Data != null && comments.Data.ModifyReason != '') {
            this.speakcokieStr = comments.Data.ModifyReason;
          }
        }
        this.processSpk();
        this.judgeIf();
      });
  }

  //解析进程说明
  processSpk() {
    if (this.items.TmpTime != '' && this.items.ApprovalTime == '') {
      this.proCess = [
        { name: '认定资料已提交', time: this.items.TmpTime.slice(0, 10) },
        { name: '认定资料待审批', time: '' },
      ]
    }

    if (this.items.TmpTime != '' && this.items.ApprovalTime != '' && this.items.EndTime == '') {
      if (this.items.Status == '1') {
        this.proCess = [
          { name: '认定资料已提交', time: this.items.TmpTime.slice(0, 10) },
          { name: '认定资料待审批通过', time: this.items.ApprovalTime.slice(0, 10) },
          { name: '家庭经济困难情况认定中', time: '' }
        ]
      } else if (this.items.Status == '2') {
        this.proCess = [
          { name: '认定资料已提交', time: this.items.TmpTime.slice(0, 10) },
          { name: '认定资料待审批未通过', time: this.items.ApprovalTime.slice(0, 10) },
        ]
      }
    }

    if (this.items.TmpTime != '' && this.items.ApprovalTime != '' && this.items.EndTime != '') {
      if (this.items.StatusMain == '42' && this.items.Effective == '1') {
        this.items.ConfirmReasonSelect = this.items.ConfirmReasonSelect.replace(/\|/g, ',');
        this.proCess = [
          { name: '认定资料已提交', time: this.items.TmpTime.slice(0, 10) },
          { name: '认定资料待审批通过', time: this.items.ApprovalTime.slice(0, 10) },
          { name: '家庭经济困难情况未被认定', time: this.items.EndTime.slice(0, 10) }
        ]
      } else if (this.items.RecognitionLevelCode == '87000040') {
        this.proCess = [
          { name: '认定资料已提交', time: this.items.TmpTime.slice(0, 10) },
          { name: '认定资料待审批通过', time: this.items.ApprovalTime.slice(0, 10) },
          { name: '家庭经济困难情况未被认定', time: this.items.EndTime.slice(0, 10) }
        ]
      } else if (this.items.StatusMain != '42' && this.items.RecognitionLevelCode != '87000040' && this.items.Effective == '1') {
        this.proCess = [
          { name: '认定资料已提交', time: this.items.TmpTime.slice(0, 10) },
          { name: '认定资料待审批通过', time: this.items.ApprovalTime.slice(0, 10) },
          { name: '家庭经济困难情况已认定', time: this.items.EndTime.slice(0, 10) }
        ]
      }
    }
  }

  //各种情况判断
  judgeIf() {
    //是否出现弹窗提示
    let tankIdStr = sessionStorage.getItem('tankId');
    if (this.items.Note != '' && this.items.SubmitStatus == '0' && tankIdStr == null && this.items.ConfirmStage != '0' && this.items.Attachs == '0' && this.items.Enconomic == '0' && this.items.SelfAssessment == '0') {
      this.showAlert();
      sessionStorage.setItem('tankId', JSON.stringify('1'));
    }
    //判断学生自评是否可以点击 并判断时间以及等待开启
    if (this.items.SelfAssessmentTime == '' || this.items.Status != '') {
      this.openbtn = false;  //可点击
    } else {
      this.openbtn = true;  //不可点击
    }

    //提交按钮是否可以点击  三项都填完才可以提交
    if (this.items.Attachs == '1' && this.items.Enconomic == '1' && this.items.SelfAssessment == '1') {
      this.submitbtn = false;  //可以点击
    }

    //提交按钮是否显示
    if (this.items.SubmitStatus == '0') {
      this.firstBtn = true; //显示提交按钮
      this.exChange = '1'   //可以修改资料
    }

    //已经提交过并且没有修改原因  显示申请变更认定资料按钮
    if (this.items.SubmitStatus == '1' && this.speakcokieStr == '') {
      this.firstBtn = false; //隐藏提交按钮
      this.againBtn = true;  //显示申请变更认定资料按钮
      this.exChange = '0';  //不可以修改资料
    }

    //申请变更认定资料按钮 是否可以点击
    var OldTamp = new Date(this.items.TmpTime).getTime() || new Date((this.items.TmpTime).replace(/-/g, '/')).getTime();
    var NowTamp = this.getNewTime();

    if (OldTamp > NowTamp) {
      this.applyBtn = true;  //禁用申请变更认定资料按钮
    } else {
      this.applyBtn = false;
    }

    //已经提交过并且有修改原因
    if (this.items.SubmitStatus == '1' && this.speakcokieStr != '') {
      this.firstBtn = true;  //显示提交按钮
      this.againBtn = false; //隐藏申请变更认定资料按钮
      this.removeWrap = true; //显示取消按钮
      this.exChange = '1';  //可以修改资料
    }

  }

  //跳转经济问卷调查
  jingjiFunc() {
    var jingjiUrl = ''
    if (this.exChange == '0') {
      jingjiUrl = '%2fwenjuan%2f%23%2fdetail%2fantlinker-jjdc'
    } else {
      jingjiUrl = '%2fwenjuan%2f%23%2fhome%2fantlinker-jjdc'
    }
    antlinker.openNewView({
      uri: 'ant://h5app/open?URL=' + jingjiUrl,
      fail: function () {
      }
    });
  }

  //跳转学生自评问卷调查
  zipingFunc() {
    var zipingUrl = ''
    if (this.exChange == '0') {
      zipingUrl = '%2fwenjuan%2f%23%2fdetail%2fantlinker-xszp'
    } else {
      zipingUrl = '%2fwenjuan%2f%23%2fhome%2fantlinker-xszp'
    }
    antlinker.openNewView({
      uri: 'ant://h5app/open?URL=' + zipingUrl,
      fail: function () {
      }
    });
  }

  //弹窗说明
  showAlert() {
    let alert = this.alertCtrl.create({
      title: '认定说明!',
      subTitle: this.items.Note,
      buttons: ['好的,我知道了']
    });
    alert.present();
  }

  //点击取消刷新页面 回到 ==申请变更认定资料
  removeCan() {
    this.http.postJSON({
      Router: ServelUrl.Url.DelModifyReason,
      Method: 'POST',
      Body: {
      }
    }).then(
      res => {
        if (!res.FeedbackCode) {
          this.navCtrl.push('IndexPage');
        } else {
          this.HelpUtils.toastPopTop(res.FeedbackText);
        }
      },
      err => alert(err)
    );

  }

  //跳转申请所需资料首页
  NavtoUploading() {
    this.navCtrl.push('UploadingTwoPage', { exChange: this.exChange });
  }

  //跳转到承诺书签署页
  NavtoPromiseOne() {
    this.navCtrl.push('PromiseBookOnePage');
  }
  //跳转到申请变更原因页
  NavtoChange() {
    this.navCtrl.push('ChangeTalePage');
  }

  //时间不到10前面加0
  addTime(data) {
    if (data < 10) {
      return '0' + data
    }
    return data
  }

  //时间转为时间戳
  getNewTime() {
    var date = new Date();
    var date_value = date.getFullYear() + '-' + this.addTime(date.getMonth() + 1) + '-' + this.addTime(date.getDate()) + ' 00' + ':' + '00' + ':' + '01';
    var TimeTamp = new Date(date_value).getTime() || new Date((date_value).replace(/-/g, '/')).getTime();
    return TimeTamp
  }

























}
