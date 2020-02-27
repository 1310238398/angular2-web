import { Component } from '@angular/core';
import { IonicPage, NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-indexapprove',
  templateUrl: 'indexapprove.html'
})
export class IndexApprovePage {

  dataSet = []; //列表数据
  hiddenBox = false; //进程弹框
  haveClass = false; //页面是否有数据
  dataPrecess = []; //进程数据列表
  approvalNum = '1';
  waitShell = 'yes-css';
  overShell = 'not-css';

  notPassText = false; //拒绝原因
  notRemark = '';

  Page: number = 0;
  moreData: boolean = true;
  PageNo: number = 20;
  loading: any;

  appStatus = '1'; //审批状态  1待审批  2 已审批

  constructor(private navCtrl: NavController, private http: HttpService) { }

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
    this.waitShell = 'yes-css';
    this.overShell = 'not-css';
  }
  ionViewDidEnter() {
    this.loadIndexJson();
  }

  //获取数据  待审批  
  loadIndexJson() {
    this.http.postFLOW({
      Router: ServelUrl.Url.flowtodo,
      Method: 'GET',
      Body: {
        type_code: 'XYSQ,XSXXTB',
        count: this.PageNo,
        last_id: this.Page
      }
    }).then(
      res => {
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            res[i].input_data = JSON.parse(res[i].input_data);
          }
          this.dataSet = res;
          this.haveClass = false;
        } else {
          this.haveClass = true;
        }
      },
      err => console.log(err)
    );
  }

  //已审批数据  
  loadOverJson() {
    this.http.postFLOW({
      Router: ServelUrl.Url.flowshandle,
      Method: 'GET',
      Body: {
        type_code: 'XYSQ,XSXXTB',
        count: this.PageNo,
        last_id: this.Page
      }
    }).then(
      res => {
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            res[i].input_data = JSON.parse(res[i].input_data);
          }
          this.dataSet = res;
          this.haveClass = false;
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

  //待审批按钮
  changeWait() {
    this.appStatus = '1';
    this.waitShell = 'yes-css';
    this.overShell = 'not-css';
    this.moreData = true;
    this.loadIndexJson();
  }
  //已审批按钮
  changeOver() {
    this.appStatus = '2';
    this.waitShell = 'not-css';
    this.overShell = 'yes-css';
    this.moreData = true;
    this.loadOverJson()
  }

  doInfinite(infiniteScroll) {
    var last_id = this.dataSet[this.dataSet.length - 1].id;

    if (this.appStatus == '1') {
      this.http.postFLOW({
        Router: ServelUrl.Url.flowtodo,
        Method: 'GET',
        Body: {
          type_code: 'XYSQ,XSXXTB',
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
    } else if (this.appStatus == '2') {
      this.http.postFLOW({
        Router: ServelUrl.Url.flowshandle,
        Method: 'GET',
        Body: {
          type_code: 'XYSQ,XSXXTB',
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

  //进入申请详情页
  NavigationTo(obj) {
    if (obj.flow_code == 'Process_college_good_member' || obj.flow_code == 'Process_college_class_advanced_class_group' || obj.flow_code == 'Process_college_three_good' || obj.flow_code == 'Process_excellent_cadre_at_the_college_level' || obj.flow_code == 'Process_excellent_student_cadre' ) {
      this.navCtrl.push('ThreeGoodDetailPage', { dataPass: obj, appStatus: this.appStatus });
    } else if (obj.flow_code == 'Process_Prize') {
      this.navCtrl.push('AwardReportDetailPage', { dataPass: obj, appStatus: this.appStatus });
    }else if (obj.flow_code == 'Process_assessment_plus_information_report') {
      this.navCtrl.push('QualityUpApproveDetailPage', { dataPass: obj, appStatus: this.appStatus });
    }else if (obj.flow_code == 'Process_New_Stu_Information_Approval') {
      this.navCtrl.push('NewStudentInfoDetailPage', { dataPass: obj, appStatus: this.appStatus });
    }

  }

  //关闭日期框
  closeTab() {
    this.hiddenBox = false;
  }



}
