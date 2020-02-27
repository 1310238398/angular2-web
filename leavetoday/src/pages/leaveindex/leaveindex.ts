import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController } from 'ionic-angular';
import { HttpService } from '../../http/http.service';
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from '../../app/utils/HelpUtils';

declare var echarts;
declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-leaveindex',
  templateUrl: 'leaveindex.html'
})
export class LeaveIndexPage {
  loading = true;
  LeaveLine: any;   //图标
  leave = [];       //图表数据
  Role = 0;        //班级  还是学院  

  leaveInfoData = {
    leaveNum: '',
    leaveNumCode: '',
    notDisplay: '',
    notDisplayCode: '',
    notCome: '',
    notComeCode: '',
    weekLeave: '',
    weekLeaveCode: ''
  }

  listCateName = '';  //下面列表数据名称
  listCateCode = '';  //下面列表数据代码

  schoolData = [];  //学院或者班级列表数据
  cardData = [];    //详情数据
  CateG = 'leaveNum';         //点击类型
  temp = '';

  emptyData = false;

  constructor(private http: HttpService, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController) { }

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
      title: "今日请假统计",
      fail: function () { },
      success: function () { }
    });

    this.loadChertsData();
    this.loadLeaveData();

  }
  //获取图形数据
  loadChertsData() {
    this.http.postJSON({
      Router: ServelUrl.Url.boardsdata,
      Method: 'POST',
      Body: {
        academy: ''
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.emptyData = false;
        this.leave = res.Data.Leave;
        this.leaveInfoData.notCome = res.Data.Leave[0].AllCount;
        this.leaveInfoData.notComeCode = res.Data.Leave[0].AllIds;
        this.leaveInfoData.weekLeave = res.Data.Leave[0].AllCountNow;
        this.leaveInfoData.weekLeaveCode = res.Data.Leave[0].AllIdsNow;
        this.setLeaveLine(this.leave);
      } else {
        this.emptyData = true;
      }
    })
  }
  //获取请假缺勤人数
  loadLeaveData() {
    this.http.postJSON({
      Router: ServelUrl.Url.precount,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.leaveInfoData.leaveNum = res.Data.p1c;
        this.leaveInfoData.leaveNumCode = res.Data.p1ids;
        this.listCateCode = res.Data.p1ids;
        this.leaveInfoData.notDisplay = res.Data.p2c;
        this.leaveInfoData.notDisplayCode = res.Data.p2ids;
        this.Role = res.Data.goToClassUrl;
        if (this.Role == 1) {
          this.getClassData();
        } else {
          this.getAcademyData();
        }
      }
    })
  }
  //班级列表
  getClassData() {
    this.http.postJSON({
      Router: ServelUrl.Url.precountdetailclass,
      Method: 'POST',
      Body: {
        ids: this.listCateCode
      }
    }).then(res => {
      this.loading = false;
      if (!res.FeedbackCode) {
        this.schoolData = res.Data;
        for (var i = 0; i < this.schoolData.length; i++) {
          this.schoolData[i]['checked'] = false;
          this.schoolData[i]['data'] = [];
        }
      }
    });
  }
  //学院列表
  getAcademyData() {
    this.http.postJSON({
      Router: ServelUrl.Url.precountdetailacademy,
      Method: 'POST',
      Body: {
        ids: this.listCateCode
      }
    }).then(res => {
      this.loading = false;
      if (!res.FeedbackCode) {
        this.schoolData = res.Data;
        for (var i = 0; i < this.schoolData.length; i++) {
          this.schoolData[i]['checked'] = false;
          this.schoolData[i]['data'] = [];
        }

        console.log(this.schoolData, '1111111111')
      }
    });
  }
  //切换请假数据
  makeInfo(obj1, obj2) {
    this.CateG = obj2;
    this.listCateCode = obj1;
    this.loading = true;
    this.temp = '';
    if (this.Role == 1) {
      this.getClassData();
    } else {
      this.getAcademyData();
    }
  }
  //点击显示详情
  accordion(name, ids, temp) {

    if(!temp){
      this.http.postJSON({
        Router: ServelUrl.Url.leavedetailwithids,
        Method: 'POST',
        Body: {
          ids: ids
        }
      }).then(res => {
        if (!res.FeedbackCode) {
          for (var i = 0; i < this.schoolData.length; i++) {
            if (this.schoolData[i].Name == name) {
              this.schoolData[i].checked = true;
              this.schoolData[i].data = res.Data;
            }
          }
        }
      });
    }else{
      for (var i = 0; i < this.schoolData.length; i++) {
        if (this.schoolData[i].Name == name) {
          this.schoolData[i].checked = false;
        }
      }
    }

 

    console.log(this.schoolData, '222222222222222')

  }

  //折线图
  setLeaveLine(leave) {
    const xData = [];
    const yValue = [];
    leave.forEach((el, index) => {
      if (index > 0) {
        xData.push(`${el.n.split('_')[0]}-${el.n.split('_')[1]}`);
        yValue.push(el.c);
      }
    });

    const option = {
      baseOption: {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.6)',
          textStyle: {
            color: '#aaa',
            align: 'left'
          },
          axisPointer: {
            lineStyle: {
              color: '#2E6999'
            }
          }
        },
        grid: {
          top: '30px',
          left: '5px',
          right: '23px',
          bottom: '40px',
          containLabel: true
        },
        //伸缩
        dataZoom: [{
          show: true,
          realtime: true,
          start: 25,
          end: 75,
          handleSize: '100%',
          left: '40',
          right: '45',
          bottom: '0'
        }, {
          type: 'inside',
          realtime: true,
          start: 20,
          end: 80
        }],
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
            },
            axisLine: { show: false },
            axisLabel: {
              textStyle: {
                color: '#666',
                rotate: 30,
                interval: 0,
                fontSize: 8
              },
              formatter: function (value) {
                return value.split(" ", 5).join("\n")
              },
            },
            boundaryGap: false,
            data: xData,
            name: 'H',
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '    缺勤/人',
            position: 'left',
            nameTextStyle: {
              color: '#666'
            },
            textStyle: {
              color: '#666',
              fontSize: '8'
            },
            axisTick: {
              show: false,
            },
            axisLine: { show: false },
            axisLabel: {
              textStyle: {
                color: '#999',
                fontSize: '10'
              },
            },
            max: function (value) {
              if (value.max > 4) {
                return parseInt(value.max);
              } else {
                return 4;
              }
            },
            splitLine: {
              show: true,
              //  改变轴线颜色
              lineStyle: {
                // 使用深浅的间隔色
                color: ['#e3e3e3'],
                type: 'dashed'
              }
            },
          }
        ],

        series: [
          {
            data: yValue,
            smooth: 0.2,
            symbolSize: 7,
            type: 'line'
          }
        ]
      },
    };
    this.LeaveLine = echarts.init(document.getElementById('EchartsContent'), 'antlinker');
    this.LeaveLine.setOption(option);
    this.LeaveLine.on('click', (params) => {
      console.log(params.dataIndex);
      console.log('params', params);
      if (params.data > 0) {
        const ids = leave[params.dataIndex + 1].ids;
        //this.navLeaveDetail(ids, this.activateAcadey || '');
      }

    });
  }
  //下拉刷新
  doRefresh(refresher) {
    this.CateG = 'leaveNum';
    this.temp = '';
    this.loadChertsData();
    this.loadLeaveData();
    refresher.complete()
  }

}
