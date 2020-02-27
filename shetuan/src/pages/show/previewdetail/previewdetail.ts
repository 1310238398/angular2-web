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
  selector: 'page-previewdetail',
  templateUrl: 'previewdetail.html',
})
export class PreviewDetailPage {

  items = [];
  mark: boolean = false;
  waterMarks = [];
  indexInit = 0;
  time;
  UnionCode;
  Member;
  shetuanstatus;
  ActivityCode;

  Endpage = {
    lastid: 1,
    count: 5
  };
  honorsrc;
  honorpicture = false;
  
  SheTuanEND = [];



  constructor(private DomS: DomSanitizer, private navCtrl: NavController, private navParams: NavParams, private http: HttpService, private HelpUtils: HelpUtils) {
    this.UnionCode = this.navParams.get('UnionCode');
    this.Member = this.navParams.get('Member');
    this.shetuanstatus = this.navParams.get('shetuanstatus');
    this.ActivityCode = this.navParams.get('ActivityCode');
    this.getunionendoneinfo();


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
      success: function () { 
        // this.navCtrl.push('PreviewPage', {
        //   UnionCode: this.UnionCode,
        //   shetuanstatus: this.shetuanstatus,
        //   Member: this.Member
        // });
    
      },
      fail: function () { },
      trigger: function () { }
    });
  }

  //初始化加载
  ionViewDidEnter() {

  }

  //跳转图片放大
  navPreview(params) {
    this.navCtrl.push('PreviewPhotoPage', params)
  }


  //加载社团活动总结
  getunionendoneinfo() {
    console.log(9);
    this.http.postJSON({
      Router: ServelUrl.Url.getunionendoneinfo,
      Method: 'POST',
      Body: {
        Uname: this.ActivityCode,
        pageindex: this.Endpage.lastid,
        pagesize: this.Endpage.count
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        // for (let i = 0; i < res.length; i++) {
        //   res[i].Data = JSON.parse(res[i].Data);
        // }
        this.SheTuanEND = res.Data.data
        console.log(this.SheTuanEND);
      }
    })

  }



  // navView(ev) {
  //   this.navCtrl.pop();
  //   ev.stopPropagation();
  // }

}
