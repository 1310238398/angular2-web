import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { HttpService } from "../../../http/http.Service";
import { ServelUrl } from "../../../app/ServelUrl";


declare var antlinker;
@IonicPage()
@Component({
  selector: 'otherdetail',
  templateUrl: 'otherdetail.html',
})
export class OtherDetailPage {

  topTitle = {
    AcademicYearCode: '',
    AcademicTermCode: '',
    IntelUserCode: '',
    checkStatus: '',
    qingJia: true,
    kuangKe: true,
    chiDao: true,
    Leaves: '1',
    Late: '2',
    Absenteeism: '3',
    emptyData: false,   //是否显示空页面
    moreRili: true,   //下拉加载
    Page: 1,          //初始页 数据下拉加载
    PageNo: 20,       //每页条数
  }

  dataObj = [];   //列表
  headData = {
    absent: '',
    late: '',
    leaves: '',
    normal: '',
    total: '',
  }

  constructor(public navParams: NavParams, private http: HttpService, public navCtrl: NavController) { }

  ionViewDidEnter() {
    antlinker.configTitleButton({
      type: 'close',
      text: '关闭',
      fail: function () { },
      success: function () { },
      trigger: function () { }
    });

    this.topTitle.IntelUserCode = this.navParams.get('IntelUserCode');
    this.topTitle.checkStatus = this.navParams.get('checkStatus');
    this.topTitle.AcademicYearCode = this.navParams.get('schoolyear');
    this.topTitle.AcademicTermCode = this.navParams.get('schoolterm');

    if (this.topTitle.checkStatus == '0') {
      this.topTitle.qingJia = true;
      this.topTitle.kuangKe = true;
      this.topTitle.chiDao = true;
      this.topTitle.Leaves = '1';
      this.topTitle.Late = '2';
      this.topTitle.Absenteeism = '3';
    }

    if (this.topTitle.checkStatus == '1') {
      this.topTitle.qingJia = true;
      this.topTitle.kuangKe = false;
      this.topTitle.chiDao = false;
      this.topTitle.Leaves = '1';
      this.topTitle.Late = '';
      this.topTitle.Absenteeism = '';
    }

    if (this.topTitle.checkStatus == '2') {
      this.topTitle.qingJia = false;
      this.topTitle.chiDao = true;
      this.topTitle.kuangKe = false;
      this.topTitle.Leaves = '';
      this.topTitle.Late = '2';
      this.topTitle.Absenteeism = '';
    }

    if (this.topTitle.checkStatus == '3') {
      this.topTitle.qingJia = false;
      this.topTitle.chiDao = false;
      this.topTitle.kuangKe = true;
      this.topTitle.Leaves = '';
      this.topTitle.Late = '';
      this.topTitle.Absenteeism = '3';
    }

    console.log(this.topTitle)
    this.loadNameFirst();
    this.loadTotalNum();
  }

  //获取个人本学期详情
  loadNameFirst() {
    this.http.postJSON({
      Router: ServelUrl.Url.getspecificIndividualstudentstatistics,
      Method: 'POST',
      Body: {
        schoolyear: this.topTitle.AcademicYearCode,
        schoolterm: this.topTitle.AcademicTermCode,
        usercode: this.topTitle.IntelUserCode,
        absent: this.topTitle.Absenteeism,
        late: this.topTitle.Late,
        leave: this.topTitle.Leaves,
        pageindex: this.topTitle.Page,
        pagesize: this.topTitle.PageNo
      }
    }).then(
      res => {
        if (!res.FeedbackCode && res.Data.items.length > 0) {
          for (let i = 0; i < res.Data.items.length; i++) {
            var tempArr = res.Data.items[i].Sections.split(",");
            var sect1 = tempArr[0];
            var sect2 = tempArr[tempArr.length - 1];
            res.Data.items[i].Sections = sect1 + '-' + sect2;
            res.Data.items[i]['Dates'] = res.Data.items[i].Day.substring(res.Data.items[i].Day.length - 5, res.Data.items[i].Day.length);
          }
          this.dataObj = this.dataObj.concat(res.Data.items);
          this.topTitle.moreRili = true;
          this.topTitle.emptyData = false;
        } else if (!res.FeedbackCode && res.Data.items.length == 0 && res.Data.total != 0) {
          this.topTitle.moreRili = false;
        } else if (!res.FeedbackCode && res.Data.items.length == 0 && res.Data.total == 0) {
          this.dataObj = [];
          this.topTitle.moreRili = false;
          this.topTitle.emptyData = true;
        } else {
          console.log(res.FeedbackText)
        }
      },
      err => console.log(err));
  }

  //获取各项出勤情况统计
  loadTotalNum() {
    this.http.postJSON({
      Router: ServelUrl.Url.getspecificstatisticaltimes,
      Method: 'POST',
      Body: {
        schoolyear: this.topTitle.AcademicYearCode,
        schoolterm: this.topTitle.AcademicTermCode,
        usercode: this.topTitle.IntelUserCode,
      }
    }).then(
      res => {
        if (!res.FeedbackCode) {
          this.headData = res.Data.items[0];
        } else {
          console.log(res.FeedbackText)
        }
      },
      err => console.log(err));
  }

  //下拉刷新
  riLiinite(riLiScroll) {
    this.topTitle.Page++
    this.loadNameFirst();
    riLiScroll.complete();
  }

  //请假复选框
  qingJiaCheck() {
    if (this.topTitle.qingJia) {
      this.topTitle.Leaves = '1'
    } else {
      this.topTitle.Leaves = ''
    }
    this.dataObj = [];
    this.topTitle.Page = 1;
    this.loadNameFirst();
  }
  //迟到复选框
  chiDaoCheck() {
    if (this.topTitle.chiDao) {
      this.topTitle.Late = '2'
    } else {
      this.topTitle.Late = ''
    }
    this.dataObj = [];
    this.topTitle.Page = 1;
    this.loadNameFirst();
  }
  //旷课复选框
  kuangKeCheck() {
    if (this.topTitle.kuangKe) {
      this.topTitle.Absenteeism = '3'
    } else {
      this.topTitle.Absenteeism = ''
    }
    this.dataObj = [];
    this.topTitle.Page = 1;
    this.loadNameFirst();
  }

  //点击查看请假单
  lookLeaveList(obj) {
    antlinker.openNewView({
      uri: 'ant://h5app/open?URL=%2fv2qingjia%2f%23%2fmyapplydetailpage%2f' + obj,
      fail: function () { }
    });
  }

}
