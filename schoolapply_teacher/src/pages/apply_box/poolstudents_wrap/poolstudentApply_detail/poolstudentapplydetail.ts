import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { ServelUrl } from "../../../../app/ServelUrl";
import { HttpService } from "../../../../http/http.Service";
import { HelpUtils } from "../../../../app/utils/HelpUtils";

declare var echarts;//设置echarts全局对象
declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-poolstudentapplydetail',
  templateUrl: 'poolstudentapplydetail.html'
})
export class PoolStudentApplyDetailPage {

  @ViewChild('EchartsContent') container: ElementRef;//与html中div #container1对应
  EChart: any;

  dataObj = {
    flow_code: "",
    flow_id: "",
    flow_name: "",
    form_data: "",
    form_type: "",
    id: 0,
    input_data: {
      AcademyCode: "",
      AcademyName: "",
      CounselorData: [],
      FocusData: [],
      GradeNames: "",
      GradesData: [],
      HardCommon: "",
      HardNormal: "",
      HardSeries: "",
      NeedSupportStudentTotal: "",
      StudentTotal: "",
      TaskID: "",
      TaskType: "",
      action: "",
      status: "",
      statustxt: "",
      timestart: "",
      title: "",
      academicImgId: '',
      schoolImgId: '',
      remarktxt: ''
    },
    is_back: false,
    launch_time: "",
    launcher: "",
    launcher_name: "",
    node_instance_id: "",
    out_data: "",
    processor: "",
    processor_name: "",
    processor_time: "",
    record_id: "",
    status: 1,
    status_text: "",
    title: "",
  };
  dataSet = {
    AcademyCode: "",
    AcademyName: "",
    CounselorData: [],
    FocusData: [],
    GradeNames: "",
    GradesData: [],
    HardCommon: "",
    HardNormal: "",
    HardSeries: "",
    NeedSupportStudentTotal: "",
    StudentTotal: "",
    TaskID: "",
    TaskType: "",
    action: "",
    status: "",
    statustxt: "",
    timestart: "",
    title: "",
    academicImgId: '',
    schoolImgId: '',
    remarktxt: ''
  };

  notProveNum = 0;

  appStatus = '1';//审批状态  1待审批  2 已审批
  GradeNum = false; //按年级 大于1条数据显示
  TeacherNum = false; //按年级 大于1条数据显示

  ImgId = '';  //签名图片ID

  itemsSrc = "";  //签名图片
  itemsTime = ""; //时间

  constructor(private navCtrl: NavController, private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams) { }

  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "校园申请",
      fail: function () { },
      success: function () { }
    });
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });
  }

  ionViewDidEnter() {
    this.dataObj = JSON.parse(sessionStorage.getItem('dataPass'));
    this.dataSet = this.dataObj.input_data;
    this.appStatus = JSON.parse(sessionStorage.getItem('appStatus'));

    if (this.dataSet.GradesData.length > 1) {
      this.GradeNum = true;
    }
    if (this.dataSet.CounselorData.length > 1) {
      this.TeacherNum = true;
    }
    this.loadEcharts(); //加载饼图
    this.loadUserType(); //获取角色
  }

  //获取角色
  loadUserType() {
    this.http.postJSON({
      Router: ServelUrl.Url.usertype,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (this.appStatus == '2' && this.dataSet.status == '2' && res.Data.BizCode == 'Leadership') {
        this.ImgId = this.dataSet.academicImgId
        this.loadSignTime();
      } else if (this.appStatus == '2' && this.dataSet.status == '2' && res.Data.BizCode == 'FundCenter') {
        this.ImgId = this.dataSet.schoolImgId
        this.loadSignTime();
      }
    },
      err => this.HelpUtils.toastPopTop(err));
  }

  //查询签名 时间
  loadSignTime() {
    this.http.postJSON({
      Router: ServelUrl.Url.getsignByRecordID,
      Method: 'POST',
      Body: {
        recordId: this.ImgId
      }
    }).then(
      data => {
        this.itemsSrc = data.Data.Base64 || [];
        this.itemsTime = (data.Data.InsertDatetime).slice(0, 10) || [];
      },
      err => this.HelpUtils.toastPopTop(err));
  }
  //加载饼图
  loadEcharts() {

    this.notProveNum = parseInt(this.dataSet.StudentTotal) - parseInt(this.dataSet.HardSeries) - parseInt(this.dataSet.HardNormal) - parseInt(this.dataSet.HardCommon);

    let ctelement = this.container.nativeElement;
    this.EChart = echarts.init(ctelement);
    this.EChart.setOption({
      title: {
        text: '',
        subtext: '',
        x: 'center'
      },
      color: ['#D8D8D8', '#E96840', '#FFC000', '#FFE79D'],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        right: 0,
        top: 50,
        bottom: 20,
        itemWidth: 20,
        itemHeight: 10,
        itemGap: 12,
        borderRadius: 2,
        data: ['未认定', '特殊困难', '困难', '一般困难']
      },
      series: [
        {
          name: '统计比例',
          type: 'pie',
          radius: '70%',
          center: ['40%', '50%'],
          data: [
            { value: this.notProveNum, name: '未认定' },
            { value: parseInt(this.dataSet.HardSeries), name: '特殊困难' },
            { value: parseInt(this.dataSet.HardNormal), name: '困难' },
            { value: parseInt(this.dataSet.HardCommon), name: '一般困难' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 90,
              shadowOffsetX: 0,
              shadowColor: '#000'
            },
            normal: {
              label: {
                show: false,
              },
              shadowBlur: 2,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
            labelLine: { show: false }
          },
        }
      ]
    });
  }


}
