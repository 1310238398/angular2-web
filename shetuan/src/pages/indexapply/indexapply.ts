import { Component } from '@angular/core';
import { IonicPage, NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-indexapply',
  templateUrl: 'indexapply.html'
})
export class IndexApplyPage {

  dataSet = []; //列表数据
  hiddenBox = false; //进程弹框
  haveClass = false; //页面是否有数据

  dataPrecess = []; //进程数据列表
  notPassText = false; //拒绝原因

  Page: number = 0;
  moreData: boolean = true;
  PageNo: number = 20;
  loading: any;

  constructor(private navCtrl: NavController, private http: HttpService, private HelpUtils: HelpUtils) { }

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
      title: "校园申请",
      fail: function () { },
      success: function () { }
    });
  }

  ionViewDidEnter() {
    this.loadIndexJson();
  }

  //进入页面获取数据  
  loadIndexJson() {
    this.http.postFLOW({
      Router: ServelUrl.Url.flowslaunch,
      Method: 'GET',
      Body: {
        type_code: 'XYSQ',
        count: this.PageNo,
        last_id: this.Page
      }
    }).then(
      res => {
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            res[i].input_data = JSON.parse(res[i].input_data)
          }
          this.dataSet = res;
        } else {
          this.haveClass = true;
        }
      },
      err => console.log(err)
    );
  }

  //打开日期框 获取审批进程 --工作流 
  openBox(obj) {
    this.http.postFLOW({
      Router: ServelUrl.Url.flowshistory,
      Method: 'GET',
      Body: {
        flow_instance_id: obj
      }
    }).then(res => {
      for (let i = 1; i < res.length; i++) {
        res[i].input_data = JSON.parse(res[i].input_data)
      }
      this.dataPrecess = res;
      this.hiddenBox = true;
    },
      err => console.log(err)
    );
  }

  //进入申请详情页
  NavigationTo(obj) {
    
    if (obj.flow_code == 'Process_college_good_member' || obj.flow_code == 'Process_college_class_advanced_class_group' || obj.flow_code == 'Process_college_three_good' || obj.flow_code == 'Process_excellent_cadre_at_the_college_level' || obj.flow_code == 'Process_excellent_student_cadre' ) {
      this.navCtrl.push('PersonalApplyDetailPage', { dataPass: obj });
    } else if(obj.flow_code == 'Process_Prize') {
      this.navCtrl.push('AwardReportApplyDetailPage', { dataPass: obj });
    }else if(obj.flow_code == 'Process_assessment_plus_information_report'){
      this.navCtrl.push('QualityUpDetailPage', { dataPass: obj });
    }

  }

  //进入申请模块页
  NavigationToApplyList() {
    this.navCtrl.push('ApplyListPage');
  }

  //关闭日期框
  closeTab() {
    this.hiddenBox = false;
  }

  doInfinite(infiniteScroll) {
    var last_id = this.dataSet[this.dataSet.length - 1].id
    this.http.postFLOW({
      Router: ServelUrl.Url.flowslaunch,
      Method: 'GET',
      Body: {
        type_code: 'XYSQ',
        count: this.PageNo,
        last_id: last_id
      }
    }).then(
      res => {
        if (res.length > 0) {
          this.moreData = true;
          for (let i = 0; i < res.length; i++) {
            res[i].input_data = JSON.parse(res[i].input_data)
          }
          this.dataSet = this.dataSet.concat(res);
        } else {
          this.moreData = false;
        }
        infiniteScroll.complete();
      },
      err => console.log(err));
  }




}



