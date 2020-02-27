import { Component } from '@angular/core';
import { IonicPage, NavController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-applylist',
  templateUrl: 'applylist.html'
})
export class ApplyListPage {

  dataSet = []

  constructor(private navCtrl: NavController, private http: HttpService, private HelpUtils: HelpUtils) { }

  //初始化加载
  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "我要申请",
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
    this.loadWatchList(); //获取功能列表
  }

  //获取功能列表 
  loadWatchList() {
    this.http.postFLOW({
      Router: ServelUrl.Url.flowflows,
      Method: 'GET',
      Body: {
        type_code: 'XYSQ'
      }
    }).then(res => {
      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          res[i]['src'] = 'assets/images/' + res[i].code + '.png';
          this.dataSet = res;
        }
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }


  //跳转到申请列表页
  NavigationToApplyFrom(obj) {
    if (obj.code == 'Process_college_good_member' || obj.code == 'Process_college_class_advanced_class_group' || obj.code == 'Process_college_three_good' || obj.code == 'Process_excellent_cadre_at_the_college_level' || obj.code == 'Process_excellent_student_cadre' ) {
      this.navCtrl.push('PersonalApplyCreatPage',{item:obj});
    }else if(obj.code == 'Process_Prize'){
      this.navCtrl.push('AwardReportApplyPage',{item:obj});
    }else if (obj.code == 'Process_assessment_plus_information_report') {
      this.navCtrl.push('QualityUpPage',{item:obj});
    }
  }








}
