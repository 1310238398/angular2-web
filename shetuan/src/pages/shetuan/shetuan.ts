import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";
import { ServelUrl } from "../../app/ServelUrl";


declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-shetuan',
  templateUrl: 'shetuan.html'
})
export class ShetuanPage {
  items = [];
  shetuanstatus;
  page = {
    Pagea: 1,
    Page: 1,
    PageSize: 20,
  };
  pet: string = "myshetuan";
  shetuanlist = [];
  Allshetuanlist = [];
  moreData: boolean = true;
  moreDatae: boolean = true;
  isdelete: boolean = false;

  constructor(private navCtrl: NavController, public navParams: NavParams, private http: HttpService, private HelpUtils: HelpUtils, private DomS: DomSanitizer) {
  }
  //初始化加载
  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "社团风采",
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
    this.getshetaunlist();
    this.getallshetaunlist();
  }


  //从我的社团进入社团详情页
  openshetuaninfoPage(n) {
    console.log(n.Role);
    if (n.Role == '33330006' || n.Role == '33330007') {
      if (n.Days <= 0) {
        this.shetuanstatus = 1; //负责人社团详情
      } else {
        this.shetuanstatus = 2; //普通社员
      }
    } else {
      this.shetuanstatus = 2; //普通社员
    }
    this.navCtrl.push('ShetuanInfoPage', {
      UnionCode: n.UnionCode,
      Member: n.Member,
      shetuanstatus: this.shetuanstatus
    });
  }


  //从所有社团进入社团详情页
  openashetuaninfoPage(n) {
    console.log(n.Role);
    if (n.IsThis == 1) {
      if (n.Role == '33330006' || n.Role == '33330007') {
        if (n.Days <= 0) {
          this.shetuanstatus = 1; //负责人社团详情
        } else {
          this.shetuanstatus = 2; //普通社员
        }
      } else {
        this.shetuanstatus = 2; //普通社员
      }
    } else {
      this.shetuanstatus = 3; //非该社团社员

    }
    this.navCtrl.push('ShetuanInfoPage', {
      UnionCode: n.UnionCode,
      shetuanstatus: this.shetuanstatus,

    });
  }


  getallshetaunlist() {
    this.http.postJSON({
      Router: ServelUrl.Url.getallshetaunlist,
      Method: 'POST',
      Body: {
        PageNum: this.page.Pagea++,
        PageSize: this.page.PageSize,
        Name: null,
      }
    }).then(res => {
      if (res.Data.Datas && !res.FeedbackCode) {
        this.Allshetuanlist = this.Allshetuanlist.concat(res.Data.Datas);

      }

    })
  }
  getshetaunlist() {
    this.http.postJSON({
      Router: ServelUrl.Url.getshetaunlist,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page++,
        PageSize: this.page.PageSize,
      }
    }).then(res => {
      if (res.Data.Datas && !res.FeedbackCode) {
        this.shetuanlist = this.shetuanlist.concat(res.Data.Datas);

      }

    })

  }

  doInfinitea(infiniteScroll) {
    this.http.postJSON({
      Router: ServelUrl.Url.getallshetaunlist,
      Method: 'POST',
      Body: {
        PageNum: this.page.Pagea++,
        PageSize: this.page.PageSize,
        Name: null,
      }
    }).then(res => {
      if (res.Data.Datas && !res.FeedbackCode) {
        this.moreData = true;
        this.Allshetuanlist = this.Allshetuanlist.concat(res.Data.Datas);

      } else {
        this.moreData = false;
      }
      infiniteScroll.complete();

    })
  }

  doInfinite(infiniteScroll) {
    this.http.postJSON({
      Router: ServelUrl.Url.getshetaunlist,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page++,
        PageSize: this.page.PageSize,
        Name: null,
      }
    }).then(res => {
      if (res.Data.Datas && !res.FeedbackCode) {
        this.moreDatae = true;
        this.shetuanlist = this.shetuanlist.concat(res.Data.Datas);

      } else {
        this.moreDatae = false;
      }
      infiniteScroll.complete();

    })
  }


  search(m) {
    console.log(m);
    if (m.length > 20) {
      this.HelpUtils.toastPop('最多输入20字');
      return
    }
    this.page.Pagea = 1;
    this.http.postJSON({
      Router: ServelUrl.Url.getallshetaunlist,
      Method: 'POST',
      Body: {
        PageNum: this.page.Pagea++,
        PageSize: this.page.PageSize,
        Name: m,
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data.Datas) {
        this.Allshetuanlist = res.Data.Datas;
      } else {
        this.Allshetuanlist = [];
        this.HelpUtils.toastPop('未搜索出相关结果');
        console.log(this.Allshetuanlist);

      }

    })


  }

  delete(obi) {
    this.isdelete = true;
  }

}



