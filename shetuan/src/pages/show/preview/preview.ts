import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from "@angular/platform-browser";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";


/**
 * Generated class for the PreviewPage page.
 *
 */
declare var antlinker;
@IonicPage()
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {

  SheTuanEND = [];
  mark: boolean = false;
  waterMarks = [];
  indexInit = 0;
  time;
  UnionCode;
  Member;
  shetuanstatus;
  ActivityCode;
  honorsrc;
  honorpicture = false;
  Endpage = {
    lastid: 1,
    count: 10
  };
  moreDatar = true;


  constructor(private DomS: DomSanitizer, private navCtrl: NavController, public navParams: NavParams, private http: HttpService, private HelpUtils: HelpUtils) {
    this.UnionCode = this.navParams.get('UnionCode');
    this.Member = this.navParams.get('Member');
    this.shetuanstatus = this.navParams.get('shetuanstatus');
    this.getunionendinfo();
    console.log('f'+this.UnionCode);
    if (this.UnionCode && this.Member) {
      this.sesstionCut();
    }

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



  //存储缓存
  sesstionCut() {
    sessionStorage.setItem('UnionCode', this.UnionCode);
    sessionStorage.setItem('Member', this.Member);
    console.log(17);
    console.log(sessionStorage.getItem('UnionCode'));
  }

  //初始化加载
  ionViewDidEnter() {
     console.log('ses');
    if (!this.UnionCode) {
      this.UnionCode = sessionStorage.getItem('UnionCode');
    }
    if (!this.Member) {
      this.Member = sessionStorage.getItem('Member');
    }

    console.log(this.UnionCode);


  }



  //活动detail页展示
  godetail(m) {
    this.ActivityCode = m.activityCode
    this.navCtrl.push('PreviewDetailPage', {
      UnionCode: this.UnionCode,
      shetuanstatus: this.shetuanstatus,
      Member: this.Member,
      ActivityCode: this.ActivityCode


    });

  }

  //加载社团活动总结
  getunionendinfo() {
    console.log(9);
    this.http.postJSON({
      Router: ServelUrl.Url.getunionendinfo,
      Method: 'POST',
      Body: {
        Uname: this.UnionCode,
        pageindex: this.Endpage.lastid,
        pagesize: this.Endpage.count
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data.data) {
        // for (let i = 0; i < res.length; i++) {
        //   res[i].Data = JSON.parse(res[i].Data);
        // }
        this.SheTuanEND = res.Data.data
        console.log(this.SheTuanEND);
      }
    })

  }
  //上拉加载社团总结
  doInfiniter(infiniteScroll) {
    console.log('荣誉');
    this.http.postJSON({
      Router: ServelUrl.Url.getunionendinfo,
      Method: 'POST',
      Body: {
        Uname: this.UnionCode,
        pageindex: this.Endpage.lastid++,
        pagesize: this.Endpage.count
      }
    }).then(res => {
      if (res.Data.Datas && !res.FeedbackCode) {
        this.moreDatar = true;
        this.SheTuanEND = this.SheTuanEND.concat(res.Data.data);

      } else {
        this.moreDatar = false;
        console.log('荣誉wu');
      }
      infiniteScroll.complete();

    })
  }


  navView(ev) {
    this.navCtrl.pop();
    ev.stopPropagation();
  }

}
