import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { HttpService } from "../../../../http/http.Service";
import { HelpUtils } from "../../../../app/utils/HelpUtils";
import { ServelUrl } from "../../../../app/ServelUrl";



declare var antlinker;

@IonicPage()
@Component({
  selector: 'qingongpartlist',
  templateUrl: 'qingongpartlist.html'
})
export class QingongPartListPage {

  partwork = []
  page = {
    Page: 1,
    PageSize: 20,
  };
  moreData: boolean = true;


  constructor(public navParams: NavParams, private http: HttpService, private HelpUtils: HelpUtils, public navCtrl: NavController) {
    this.getpartwork();

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
      title: "我要申请",
      fail: function () { },
      success: function () { }
    });
  }
  //初始化加载
  ionViewDidEnter() {

  }


  //加载岗位信息
  getpartwork() {
    this.http.postJSON({
      Router: ServelUrl.Url.partworkinfolist,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page++,
        PageSize: this.page.PageSize,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.partwork = res.Data.Datas;

      } else {
        console.log(res);
      }
    })
  }


  doInfinite(infiniteScroll) {
    this.http.postJSON({
      Router: ServelUrl.Url.partworkinfolist,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page++,
        PageSize: this.page.PageSize,
      }
    }).then(res => {
      if ((res.Data.Datas).length > 0 && !res.FeedbackCode) {
        this.partwork = this.partwork.concat(res.Data.Datas);

      } else {
        this.moreData = false;
      }
      infiniteScroll.complete();

    })
  }

  //跳转部门详情页
  godetail(m) {
    this.navCtrl.push('PartDetailPage', {
      PartWorkCode: m.PartWorkCode
    });

  }






}
