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

  dataSet = [];

  constructor(private navCtrl: NavController, private http: HttpService, private HelpUtils: HelpUtils) {
    this.loadWatchList(); //获取功能列表

  }

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
          var isRepeated = true;
          res[i]['src'] = 'assets/images/' + res[i].code + '.png';

          if (res[i].code == 'Process_StudentNeedSupport') {
            isRepeated = false;
          }

          if (res[i].code == 'Process_Student_Status_Adjust') {
            console.log('bbb');
            isRepeated = false;

          }

          if (res[i].code == 'Process_StudentChangeClass') {
            console.log('aaa');
            isRepeated = false;

          }

          if (res[i].code == 'Process_school_activity_apply') {
            console.log('aaa');
            isRepeated = false;

          }

          if (isRepeated) {
            this.dataSet.push(res[i]);
          }

        }

        // this.dataSet = res;
        console.log('sstas', this.dataSet);


      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //跳转到申请列表页
  NavigationToApplyFrom(obj) {
    if (obj.code == 'Process_college_good_member' || obj.code == 'Process_college_class_advanced_class_group' || obj.code == 'Process_college_three_good' || obj.code == 'Process_excellent_cadre_at_the_college_level' || obj.code == 'Process_excellent_student_cadre') {
      this.navCtrl.push('PersonalApplyCreatPage', { item: obj });
    } else if (obj.code == 'Process_Prize') {
      this.navCtrl.push('AwardReportApplyPage', { item: obj });
    } else if (obj.code == 'Process_assessment_plus_information_report') {
      this.navCtrl.push('QualityUpPage', { item: obj });
    } else if (obj.code == 'Process_QingongStudySupport') {
      this.navCtrl.push('QingongUpPage', { item: obj });
    } else if (obj.code == 'Process_SecondClassRoom') {
      this.navCtrl.push('SecondClassApplyPage', { item: obj });
    }
  }


}
