import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-managedetail',
  templateUrl: 'managedetail.html'
})
export class ManageDetailPage {
  UnionCode;
  ApplicationCode;
  ShetuanApplyOne = {
    name: '',
    InsertDatetime: '',
    Info: '',
    Member: ''
  }
  ApplyStatus;
  message;
  ApplyInfo;
  shetuanmember;
  UnionName;
  subStop = false;

  page = {
    Page: 1,
    PageSize: 2,
  };

  substatus = false;
  shenqingapply;
  Member;
  shetuanstatus;
  constructor(private navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private http: HttpService, private HelpUtils: HelpUtils, private DomS: DomSanitizer) {
    this.UnionCode = this.navParams.get('UnionCode');
    this.UnionName = this.navParams.get('UnionName');
    this.ApplicationCode = this.navParams.get('ApplicationCode');
    this.Member = this.navParams.get('Member');
    this.shetuanstatus = this.navParams.get('shetuanstatus');
    console.log(this.UnionCode);

  }

  //初始化加载
  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "社团成员",
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
    this.getoneapplyinfo();
  }


  //拒绝申请
  //拒绝申请
  pass(a) {
    this.shetuanmember = a.Member;
    this.ApplicationCode = a.ApplicationCode;
    this.ApplyStatus = 2;
    this.substatus = true;
    // this.passapplication();
  }

  cancel() {
    this.substatus = false;
    this.shenqingapply = null;
  }
  applicationsub() {
    this.ApplyInfo = this.shenqingapply;
    this.updateshetuanapply();
    this.substatus = false;

  }

  //同意申请
  agree(a) {
    this.shetuanmember = a.Member;
    this.ApplyStatus = 3;
    this.addshetuanmember();
    this.updateshetuanapply();
    this.subStop = true;

  }

  //拒绝申请理由
  // passapplication() {
  //   const prompt = this.alertCtrl.create({
  //     inputs: [
  //       {
  //         name: 'apply',
  //         placeholder: '请输入拒绝原因',

  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: '取消',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: '确定',
  //         handler: data => {
  //           console.log(data.apply);
  //           if (data.apply.length > 21) {
  //             this.HelpUtils.toastPopTop('拒绝理由不能超过21个字');
  //             return false;
  //           }
  //           this.ApplyInfo = data.apply
  //           this.updateshetuanapply();
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }




  //获取特定人员申请详情
  getoneapplyinfo() {
    this.http.postJSON({
      Router: ServelUrl.Url.getoneapplyinfo,
      Method: 'POST',
      Body: {
        Code: this.ApplicationCode,         // 申请code
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.ShetuanApplyOne = res.Data;
      } else {
        console.log('save apply fail');
      }
    },
      err => console.log(err)
    );
  }

  //添加社团成员
  addshetuanmember() {

    this.http.postJSON({
      Router: ServelUrl.Url.addshetuanmember,
      Method: 'POST',
      Body: {
        Code: this.UnionCode,         // 申请code
        Member: this.shetuanmember,           // status
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        console.log('save member success');
      } else {
        this.subStop = false;
        console.log('save member fail');
      }
    },
      err => console.log(err)
    );

  }


  //更新社团申请
  updateshetuanapply() {

    this.http.postJSON({
      Router: ServelUrl.Url.updateshetuanapply,
      Method: 'POST',
      Body: {
        Code: this.ApplicationCode,         // 申请code
        Uname: this.UnionName,         // 社团name
        Info: this.ApplyInfo,               // 拒绝理由
        Status: this.ApplyStatus,           // status
        Member: this.shetuanmember,           // status
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        console.log('a' + this.UnionCode)
        this.navCtrl.push('ShetuanMemberPage', {
          UnionCode: this.UnionCode,
          Member: this.Member,
          shetuanstatus: this.shetuanstatus,
        });

        console.log('update apply success');
      } else {
        this.subStop = false;
        console.log('update apply fail');
      }
    },
      err => console.log(err)
    );

  }


  //跳转到原生个人主页
  gomemberdetail(m) {
    console.log(m.Member);
    this.http.postJSON({
      Router: ServelUrl.Url.getxiaoyuanuid,
      Method: 'POST',
      Body: {
        Member: m.Member,
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        let uid = res.Data;
        console.log(uid);
        antlinker.openNewView({
          uri: 'ant://contacts/userdetails/open?UID=' + uid,
          fail: function () {
          }
        });
      }
    })

  }



}



