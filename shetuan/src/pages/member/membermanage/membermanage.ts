import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-membermanage',
  templateUrl: 'membermanage.html'
})
export class MemberManagePage {
  UnionCode;
  UnionName;
  ApplyMember = [];
  ApplicationCode;
  page = {
    Page: 1,
    PageSize: 2,
  };

  moreData: boolean = true;

  ApplyInfo;
  ApplyStatus;
  shetuanmember;

  constructor(private navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private http: HttpService, private HelpUtils: HelpUtils, private DomS: DomSanitizer) {
    this.UnionCode = this.navParams.get('UnionCode');
    this.UnionName = this.navParams.get('UnionName');

    console.log(this.UnionCode)

  }

  //初始化加载
  ionViewDidEnter() {
    console.log(11111111)
    if (this.UnionCode) {
      console.log(44);
      this.getapplyinfo();

    }
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

  //拒绝申请
  pass(a) {
    this.shetuanmember = a.Member;
    this.ApplicationCode = a.ApplicationCode;
    this.ApplyStatus = 2;
    this.passapplication();
  }

  //同意申请
  agree(a) {
    this.shetuanmember = a.Member;
    this.ApplicationCode = a.ApplicationCode;
    this.ApplyStatus = 3;
    this.addshetuanmember();
    this.updateshetuanapply();

  }

  //拒绝申请理由
  passapplication() {
    const prompt = this.alertCtrl.create({
      // title: 'Login',
      // message: this.message,
      inputs: [
        {
          name: 'apply',
          placeholder: '请输入拒绝原因',
          // type: 'password'

        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            console.log(data.apply);
            this.ApplyInfo = data.apply
            this.updateshetuanapply();
          }
        }
      ]
    });
    prompt.present();
  }




  //加载当前社团申请列表
  getapplyinfo(reload = false) {
    if (reload) {
      this.page.Page = 1;
    }
    console.log(1);
    this.http.postJSON({
      Router: ServelUrl.Url.getapplyinfo,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page++,
        PageSize: this.page.PageSize,
        Code: this.UnionCode,
      }
    }).then(res => {
      if (!res.FeedbackCode) {

        this.ApplyMember = this.ApplyMember.concat(res.Data.Datas);
        console.log(this.ApplyMember);
        if (reload) {
          this.ApplyMember = res.Data.Datas;
        }

      }
    })

  }

  //跳转到成员申请详情页
  gomemberdetail(m) {
    if (m.status == 1) {
      this.ApplicationCode = m.ApplicationCode;
      this.navCtrl.push('ManageDetailPage', {
        UnionCode: this.UnionCode,
        UnionName: this.UnionName,
        ApplicationCode: this.ApplicationCode,
      });

    }

    if (m.status == 2 || m.status == 3) {
      antlinker.openNewView({
        uri: 'ant://contacts/userdetails/open?UID=' + m.Member,
        fail: function () {
        }
      });
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
        this.ApplyMember = this.ApplyMember.concat(res.Data.Datas);

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
      } else {
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
        const that = this;
        setTimeout(function () {
          that.getapplyinfo(true);
        }, '1000');

        console.log('update apply success');
      } else {
        console.log('update apply fail');
      }
    },
      err => console.log(err)
    );

  }


}



