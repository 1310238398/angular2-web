import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-shetuanmember',
  templateUrl: 'shetuanmember.html'
})

export class ShetuanMemberPage {
  UnionCode;
  Member;
  shetuanstatus;
  UnionName;

  pet: string = "member";

  page = {
    Page: 1,
    PageSize: 20,
  };

  Applypage = {
    Page: 1,
    PageSize: 100,
  };

  applymiss = {};
  ShetuanMember = [];

  ShetuanMemberOne = {
    name: '',
    InsertDatetime: '',
    days: 0,
    CodeName: ''
  }
  ApplyMember = [];
  applystatus = false;
  moreData = true;
  moreDatae = true;



  ApplyMembers = [];
  ApplicationCode;
  pagem = {
    Page: 1,
    PageSize: 20,
  };


  ApplyInfo;
  ApplyStatus;
  shetuanmember;
  substatus = false;
  shenqingapply;
  subStop = false;

  constructor(private navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private http: HttpService, private HelpUtils: HelpUtils, private DomS: DomSanitizer) {
    this.UnionCode = this.navParams.get('UnionCode');
    this.Member = this.navParams.get('Member');
    this.shetuanstatus = this.navParams.get('shetuanstatus');
    this.UnionName = this.navParams.get('UnionName');

  }


  //初始化加载
  ionViewDidEnter() {
    this.unionmemberlist();
    this.unionmemberone();
    this.getapplyinfos();
    this.getapplyinfo();
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
    // if (this.shetuanstatus==1) {
    //   antlinker.configTitleButton({
    //     showClose: true,
    //     type: "label",
    //     text: "加入申请",
    //     success: function () { 
    //       this.navCtrl.push('MemberManagePage', {
    //         UnionCode: this.UnionCode,
    //         UnionName: this.UnionName,

    //       });

    //     },
    //     fail: function () { },
    //     trigger: function () { }
    //   });

    // }
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



  //加载当前社团除自己之外所有成员
  unionmemberlist(reload = false) {
    if (reload) {
      this.page.Page = 1;
    }
    this.http.postJSON({
      Router: ServelUrl.Url.unionmemberlist,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page++,
        PageSize: this.page.PageSize,
        Code: this.UnionCode,
      }
    }).then(res => {
      if (!res.FeedbackCode) {

        this.ShetuanMember = res.Data.Datas;
        console.log(this.ShetuanMember, 'aaa');
        console.log(Boolean(this.ShetuanMember.length), 'sss');

      }
    })

  }

  //上拉加载当前社团除自己之外所有成员
  doInfinitea(infiniteScroll) {
    this.http.postJSON({
      Router: ServelUrl.Url.unionmemberlist,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page++,
        PageSize: this.page.PageSize,
        Code: this.UnionCode,
      }
    }).then(res => {
      if (res.Data.Datas.length && !res.FeedbackCode) {
        this.moreDatae = true;
        this.ShetuanMember = this.ShetuanMember.concat(res.Data.Datas);

      } else {
        this.moreDatae = false;
      }
      infiniteScroll.complete();

    })
  }

  //加载自己成员信息
  unionmemberone() {
    this.http.postJSON({
      Router: ServelUrl.Url.unionmemberone,
      Method: 'POST',
      Body: {
        Code: this.UnionCode,
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {

        this.ShetuanMemberOne = res.Data;
        if (this.ShetuanMemberOne.days == 0) {
          this.ShetuanMemberOne.days = 1;
        }
        console.log(this.ShetuanMemberOne);

      } else {
        this.ShetuanMemberOne = null;
      }
    })

  }




  //加载当前社团申请列表
  getapplyinfo() {
    console.log(1);
    this.http.postJSON({
      Router: ServelUrl.Url.getapplyinfo,
      Method: 'POST',
      Body: {
        PageNum: this.Applypage.Page,
        PageSize: this.Applypage.PageSize,
        Code: this.UnionCode,
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data.Datas) {

        this.ApplyMember = res.Data.Datas;
        this.applymiss = this.ApplyMember.filter(item => item.status == 1)
        if (this.applymiss) {
          console.log('ok')
        }
        console.log('---------', Boolean(this.applymiss));
        // if (applymiss.length >  0) {
        //   this.applystatus = true;
        // }

      }
    })

  }




  //成员管理


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
    this.ApplicationCode = a.ApplicationCode;
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




  //加载当前社团申请列表
  getapplyinfos(reload = false) {
    if (reload) {
      this.pagem.Page = 1;
    }
    console.log(1);
    this.http.postJSON({
      Router: ServelUrl.Url.getapplyinfo,
      Method: 'POST',
      Body: {
        PageNum: this.pagem.Page++,
        PageSize: this.pagem.PageSize,
        Code: this.UnionCode,
      }
    }).then(res => {
      if (!res.FeedbackCode) {

        this.ApplyMembers = this.ApplyMembers.concat(res.Data.Datas);
        console.log(this.ApplyMembers);
        if (reload) {
          this.ApplyMembers = res.Data.Datas;
          // const that = this;
          // setTimeout(function () {
          this.subStop = false;
          // }, '1000');
        }

      }
    })

  }

  //跳转到成员申请详情页
  gomemberdetails(m) {
    if (m.status == 1) {
      this.ApplicationCode = m.ApplicationCode;
      this.navCtrl.push('ManageDetailPage', {
        UnionCode: this.UnionCode,
        UnionName: this.UnionName,
        Member: this.Member,
        shetuanstatus: this.shetuanstatus,
        ApplicationCode: this.ApplicationCode,
      });

    } else {
      console.log(777);
      this.gomemberdetail(m);
      // this.HelpUtils.toastPopTop('暂时不支持跳转');

    }

  }



  doInfinite(infiniteScroll) {
    this.http.postJSON({
      Router: ServelUrl.Url.getapplyinfo,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page++,
        PageSize: this.page.PageSize,
        Code: this.UnionCode,
      }
    }).then(res => {
      if (res.Data.Datas.length && !res.FeedbackCode) {
        this.moreData = true;
        this.ApplyMembers = this.ApplyMembers.concat(res.Data.Datas);

      } else {
        this.moreData = false;
      }
      infiniteScroll.complete();

    })
  }


  /*
社团申请相关
*/

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
        this.unionmemberlist(true);
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
        Info: this.ApplyInfo,               // 拒绝理由
        Status: this.ApplyStatus,           // status
        Member: this.shetuanmember,           // status
        Uname: this.UnionName,         // 社团name

      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.getapplyinfos(true);
        this.getapplyinfo();

        console.log('update apply success');
      } else {
        this.subStop = false;
        console.log('update apply fail');
      }
    },
      err => console.log(err)
    );

  }


}



