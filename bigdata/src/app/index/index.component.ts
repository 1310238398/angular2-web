import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from 'src/http/http.service';
import {ModalHelper} from 'src/app/share/modalHelper';
import {ExpandComponent} from './expand/expand.component';
import {CommonService} from 'src/app/service/common.service';
import {CalcService} from 'src/app/service/calc.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

declare var echarts: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less', './common.less']
})
export class IndexComponent implements OnInit {
  Logo = '';
  searchValue = '';
  sexChart;
  nationChart;
  PoliticalChart;
  LeaveChart;
  LeaveLine;
  permission = true;
  questionFlag = false;
  Advanced = true;
  Sexs = [];
  Campuss = [];
  Academys = [];
  Majors = [];
  Grades = [];
  Classs = [];
  Politicals = [];
  Nationalitys = [];
  StudentTypes = [];
  boardsItems = {
    Role: '',
    NeedBack: {
      TodayBack: '12',
      TodayPreUnBack: '10',
      TodayUnBack: '1'
    },
    USex: '',
    SbiStatus: [],
    SbiNationality: [],
    SbiPolitical: [],
    Leave: []
  };
  searchObj = {
    UserCode: '', // 学号
    Name: '', // 姓名
    Phone: '',
    Sex: null,
    Campus: null,
    Academy: null,
    Major: null,
    Grade: null,
    Class: null,
    StudentAreaCode: '',
    Political: null,
    Nationality: null,
    StudentType: null
  };
  StudentAreaName = '';
  activateAcadey = '';

  constructor(private message: NzMessageService,
              public acRoute: ActivatedRoute,
              private router: Router, private http: HttpService, public calcService: CalcService, public modalHelper: ModalHelper, private commonService: CommonService) {
  }

  ngOnInit(): void {
    this
      .acRoute
      .queryParams
      .subscribe(params => {
        console.log('acRoute', params);
        this.activateAcadey = params.academy || '';
      });
    this.getBoardsData();
    this.getSchoolIcon();


  }

  enEnter(e) {
    var keycode = window.event ? e.keyCode : e.which;
    if (keycode == 13) {
      this.esSearch();
    }
  }

  /**
   * 面板数据
   */
  getBoardsData() {
    this
      .http
      .POST({Router: '/api/pc/bigdata/boardsdata', Method: 'POST', Body: {academy: this.activateAcadey || ''}})
      .subscribe(res => {
        console.log(res, '我是bigres');
        if (!res.FeedbackCode) {
          this.boardsItems = res.Data || {};
          // 设置需要销假的人员统计
          this.setNeedBackPie(this.boardsItems.NeedBack);
          // 性别统计
          this.setSexPie(this.boardsItems.USex);
          // 状态统计
          this.setSbiStatus(this.boardsItems.SbiStatus);
          // 民族统计
          this.setSbiNationalityPie(this.boardsItems.SbiNationality);
          /*      // 政治面貌统计 排序
                this.boardsItems.SbiPolitical = this
                  .boardsItems
                  .SbiPolitical
                  .sort(this.calcService.compare('Value'));*/
          this.setSbiPolitical(this.boardsItems.SbiPolitical);
          // 缺勤人员统计
          this.setLeaveLine(this.boardsItems.Leave);
        } else {
          this.permission = false;
        }
      });
  }

  /**
   * 获取头像
   */
  getSchoolIcon() {
    this
      .http
      .POST({Router: '/api/yxinfofill/getschoollogoandname', Method: 'POST', Body: {}}).subscribe(res => {
      this.Logo = res.Data.Logo || '';
    });
  }

  /**
   * 性别统计
   * @param USex
   */
  setSexPie(USex) {
    const nameList = USex.map(sex => `${sex.Key}:${sex.Value}`);
    const SexDatas = USex.map(sex => {
      return {name: `${sex.Key}:${sex.Value}`, value: sex.Value};
    });
    console.log(nameList);
    const option = {

      baseOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: '54%',
          top: '20%',
          textStyle: {
            fontSize: 13
          },
          data: nameList,
          formatter: (name) => {
            return `${name}`;
          }
        },
        series: [
          {
            name: '性别',
            type: 'pie',
            radius: [
              '60%', '70%'
            ],
            center: [
              '28%', '40%'
            ],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              formatter: '',
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: SexDatas
          }
        ]
      },
      media: [ // 这里定义了 media query 的逐条规则。
        {
          query: {
            maxWidth: 200
          },   // 这里写规则。
          option: {       // 这里写此规则满足下的option。
            legend: {
              textStyle: {
                fontSize: 12
              }
            },
          }
        },
        {
          query: {
            minWidth: 200
          },   // 这里写规则。
          option: {       // 这里写此规则满足下的option。
            legend: {
              textStyle: {
                fontSize: 14
              }
            },
          }
        }
      ]
    };

    this.sexChart = echarts.init(document.getElementById('sexId'), 'antlinker');
    this.sexChart.setOption(option);
    //处理点击事件并且跳转
    this.sexChart.on('click', (params) => {
      this
        .router
        .navigate(['/student'], {
          queryParams: {
            searchValue: params.name.split(':')[0],
            academy: this.activateAcadey || '',
            QType: 'Sex'
          }
        });
    });
  }

  /**
   * 学生状态统计
   * @param SbiStatus
   */
  setSbiStatus(SbiStatus) {
    let sum = 0;
    SbiStatus.forEach(ele => {
      sum += parseInt(ele.Value || 0, 10);
    });
    SbiStatus.forEach(element => {
      element.Rate = this
        .calcService
        .getRate(element.Value, sum);
    });
  }

  /**
   * 学生状态点击
   * @param {string} searchValue
   */
  onClickStatus(searchValue = '') {
    this
      .router
      .navigate(['/student'], {
        queryParams: {
          searchValue: searchValue,
          academy: this.activateAcadey || '',
          QType: 'Status'
        }
      });
  }

  /**
   * 民族统计
   * @param SbiNationality
   */
  setSbiNationality(SbiNationality) {
    let sum = 0;
    SbiNationality.forEach(ele => {
      sum += parseInt(ele.Value || 0, 10);
    });
    SbiNationality.forEach(element => {
      element.Rate = this
        .calcService
        .getRate(element.Value, sum);
    });
  }

  /**
   * 民族统计表
   * @param SbiNationality
   */
  setSbiNationalityPie(SbiNationality) {
    const col = ['汉族', '少数民族', '未知', '其他'];
    let han = [];
    let minority = 0;
    let unknown = 0;
    let other = 0;
    SbiNationality.forEach(element => {
      if (element.Key === '汉族') {
        han = element.Value;
      } else if (element.Key == '未知') {
        unknown = element.Value;
      } else if (element.Key == '外国血统中国籍人士' || element.Key == '其他') {
        other += element.Value;
      } else {
        minority += element.Value;
      }
    });
    const colTrue = [`汉族:${han}`, `少数民族:${minority}`, `未知:${unknown}`, `其他:${other}`];
    const option = {

      baseOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}:  ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: '54%',
          top: 12,
          bottom: 20,
          data: colTrue
        },
        series: [
          {
            name: '民族统计',
            type: 'pie',
            radius: [
              '60%', '70%'
            ],
            center: [
              '28%', '40%'
            ],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: han,
                name: colTrue[0]
              }, {
                value: minority,
                name: colTrue[1]
              }, {
                value: unknown,
                name: colTrue[2]
              }, {
                value: other,
                name: colTrue[3]
              }
            ]
          }
        ],
      },
      media: [ // 这里定义了 media query 的逐条规则。
        {
          query: {
            maxWidth: 200
          },   // 这里写规则。
          option: {       // 这里写此规则满足下的option。
            legend: {
              textStyle: {
                fontSize: 10
              },
              formatter: (name) => {
                return `${name.split(':')[0]}`;
              }
            },
          }
        },
        {
          query: {
            minWidth: 200
          },   // 这里写规则。
          option: {       // 这里写此规则满足下的option。
            legend: {
              formatter: (name) => {
                return `${name}`;
              },
              textStyle: {
                fontSize: 12
              }
            },

          }
        }
      ]
    };

    this.nationChart = echarts.init(document.getElementById('SbiNationId'), 'antlinker');
    this.nationChart.setOption(option);
    this.nationChart.on('click', (params) => {
        var _name = params.name.split(':')[0];
        if (_name === '少数民族' || _name === '其他') {
          this.message.info('此项为统称,具体详细信息需展开后选择具体民族!');
        } else {
          this
            .router
            .navigate(['/student'], {
              queryParams: {
                searchValue: _name,
                academy: this.activateAcadey || '',
                QType: 'Nationality'
              }
            });
        }
      }
    );

  }

  onResize(event) {
    // 性别重置
    this.sexChart.resize();
    // 民族重置
    this.nationChart.resize();
    // 政治面貌重置
    this.PoliticalChart.resize();
    // 销假图貌重置
    this.LeaveChart.resize();
    // 线表重置
    this.LeaveLine.resize();
  }

  /**
   * 政治面貌统计
   * @param SbiPolitical
   */
  setSbiPolitical(SbiPolitical) {
    const selected = {};
    const SexDatas = SbiPolitical.map((sex, index) => {
      selected[sex.Key] = index < 4;
      return {name: `${sex.Key}:${sex.Value}`, value: sex.Value};
    });
    const nameList = SbiPolitical.map((sex, index) => {
      if (index < 4) {
        return `${sex.Key}:${sex.Value}`;
      }
    });

    console.log(nameList);
    console.log('selected', selected);
    const option = {
      baseOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: '54%',
          top: 10,
          data: nameList
        },
        series: [
          {
            name: '政治面貌',
            type: 'pie',
            radius: [
              '60%', '70%'
            ],
            center: [
              '28%', '40%'
            ],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: SexDatas
          }
        ]
      },
      media: [ // 这里定义了 media query 的逐条规则。
        {
          query: {
            maxWidth: 200
          },   // 这里写规则。
          option: {       // 这里写此规则满足下的option。
            legend: {
              textStyle: {
                fontSize: 9
              },
              formatter: (name) => {
                return `${name.split(':')[0]}`;
              }
            },
          }
        },
        {
          query: {
            minWidth: 200
          },   // 这里写规则。
          option: {       // 这里写此规则满足下的option。
            legend: {
              formatter: (name) => {
                return `${name}`;
              },
              textStyle: {
                fontSize: 12
              }
            },

          }
        }
      ]

    };
    this.PoliticalChart = echarts.init(document.getElementById('SbiPoliticalId'), 'antlinker');
    this.PoliticalChart.setOption(option);
    this.PoliticalChart.on('click', (params) => {
      this
        .router
        .navigate(['/student'], {
          queryParams: {
            searchValue: params.name.split(':')[0],
            academy: this.activateAcadey || '',
            QType: 'Political'
          }
        });
    });
  }

  /**
   *
   * @param {boolean} flag 民族  政治面貌 学生状态
   */

  expand(flag = 'SbiPolitical') {
    const params = {
      SbiNationality: [],
      SbiPolitical: [],
      SbiStatus: []
    };
    switch (flag) {
      case 'SbiStatus':
        params.SbiStatus = this.boardsItems.SbiStatus;
        break;
      case 'SbiNationality':
        params.SbiNationality = this.boardsItems.SbiNationality;
        break;
      case 'SbiPolitical':
        params.SbiPolitical = this.boardsItems.SbiPolitical;
        break;
    }
    this
      .modalHelper
      .open(ExpandComponent, params, 500, {})
      .subscribe((geo) => {
        /*  this.st.load();
         this.msg.info('回调，重新发起列表刷新'); */
      });
  }

  /**
   * 设置需要销假的人员统计图(饼图)
   * @param NeedBack
   */
  setNeedBackPie(NeedBack) {
    const col = ['今日之前待销假', '今日需销假', '今天销假的'];
    const colTrue = [`今日之前待销假:${NeedBack.TodayPreUnBack}`, `今日需销假:${NeedBack.TodayUnBack}`, `今天销假的:${NeedBack.TodayBack}`];
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: '54%',
        top: '30%',
        data: colTrue

      },
      series: [
        {
          name: '需要销假',
          type: 'pie',
          radius: '50%',
          center: [
            '28%', '50%'
          ],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          data: [
            {
              value: NeedBack.TodayPreUnBack,
              name: colTrue[0]
            }, {
              value: NeedBack.TodayUnBack,
              name: colTrue[1]
            }, {
              value: NeedBack.TodayBack,
              name: colTrue[2]
            }
          ]
        }
      ]
    };
    this.LeaveChart = echarts.init(document.getElementById('NeedBackId'), 'antlinker');
    this.LeaveChart.setOption(option);
    this.LeaveChart.on('click', (params) => {
      console.log(params.dataIndex);
      if (params.value > 0) {
        switch (params.dataIndex) {
          case 0:
            this.JumpXiaojia('2', this.activateAcadey);
            break;
          case 1:
            this.JumpXiaojia('3', this.activateAcadey);
            break;
          case 2:
            this.JumpXiaojia('4', this.activateAcadey);
            break;
        }
      }

    });
  }

  JumpXiaojia(which, academy) {
    this
      .router
      .navigate(['/xiaojia'], {
        queryParams: {
          which: which,
          academy: academy
        }
      });
  }

  /**
   * 设置缺勤人员统计
   * @param leave
   */
  setLeaveLine(leave) {
    const xData = [];
    const yValue = [];
    /* Object.keys(leave).map(el => {
      if (el !== 'AllCount' && el !== 'AllIds' && el.startsWith('c')) {
        xData.push(el.split('_')[1]);
       // return el.split('_')[1];
      }
    });*/
    leave.forEach((el, index) => {
      if (index > 0) {
        xData.push(`${el.n.split('_')[0]}-${el.n.split('_')[1]}`);
        yValue.push(el.c);
        // return el.split('_')[1];
      }
    });
    console.log(xData);
    const option = {
      baseOption: {
        /*  title: {
            text: `今日有<a>ddd</a>${leave[0].AllCount}位学生（阶段性）请假缺勤`,
            textStyle: {
              color: '#666666',
              fontSize: '14px',
              align: 'center',
              verticalAlign: 'middle'
            }
          },*/
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisLabel: {
            rotate: 30,
            interval: 0,
            fontSize: 8
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          name: '缺勤人员/人',
          max: function (value) {
            if (value.max > 4) {
              return parseInt(value.max);
            } else {
              return 4;
            }
          },
          axisLabel: {
            formatter: '{value}'
          },
          /*axisLabel: {
            show:false,
            formatter: '°C'
          }*/
        },
        series: [
          {
            data: yValue,
            symbolSize: 7,
            type: 'line'
          }
        ]
      },
      media: [ // 这里定义了 media query 的逐条规则。
        {
          query: {
            maxWidth: 430
          },   // 这里写规则。
          option: {       // 这里写此规则满足下的option。
            xAxis: {
              axisLabel: {
                fontSize: 8
              }
            },

          }
        },
        {
          query: {
            minWidth: 430
          },   // 这里写规则。
          option: {       // 这里写此规则满足下的option。
            xAxis: {
              axisLabel: {
                fontSize: 12
              }
            }
          }
        },
        {
          query: {
            minWidth: 520
          },
          option: {
            xAxis: {
              name: '时间/时',
              nameRotate: 60,
              nameLoaction: 'middle',
            },

          }
        },
        {
          query: {
            maxWidth: 520
          },
          option: {
            xAxis: {
              name: '',
            },
          }
        }
      ]
    };
    this.LeaveLine = echarts.init(document.getElementById('leavelId'), 'antlinker');
    this.LeaveLine.setOption(option);
    this.LeaveLine.on('click', (params) => {
      console.log(params.dataIndex);
      console.log('params', params);
      if (params.data > 0) {
        const ids = leave[params.dataIndex + 1].ids;
        this.navLeaveDetail(ids, this.activateAcadey || '');
      }

    });
  }

  /**
   * id
   */
  navLeaveDetail(ids, academy) {
    this
      .router
      .navigate(['/leaveapply'], {queryParams: {ids: ids, academy: academy}});
  }

  /**
   * 学生查询
   * @param params
   */
  esSearch(_value = '') {
    if (this.searchValue) {
      this
        .router
        .navigate(['/student'], {
          queryParams: {
            searchValue: this.searchValue,
            academy: this.activateAcadey || '',
            QType: 'All'
          }
        });
    }

  }

  question() {
    this.questionFlag = !this.questionFlag;
  }

  goBack() {
    this.router.navigate(['/academy']);
  }

  goHome() {
    this.activateAcadey = '';
    this.getBoardsData();
    /* this.router.navigate(['/'],{
       replaceUrl:true
     })*/
  }
}
