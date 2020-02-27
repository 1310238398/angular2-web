import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/http/http.service';
import { ModalHelper } from 'src/app/share/modalHelper';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var echarts: any;

@Component({
  selector: 'app-awardindex',
  templateUrl: './awardindex.component.html',
  styleUrls: ['./awardindex.component.less']
})
export class QwardIndexComponent implements OnInit {

  schooLogo = '';    //学校logo
  schooName = '';    //学校名称

  beginYearName = ''; //开始学年名称
  endYearName = '';   //结束学年名称

  beginTimeObj = {};   //选择的开始
  endTimeObj = {};   //选择的结束

  year = '';     //最终请求数据的时间
  timeOption = [];  //学年列表

  supportNumChart;
  supportMoneyChart;
  poolNumChart;
  poolMoneyChart;

  cutProtBT = true;   //奖助表格切换
  isVisible = false;
  acaOrclass = true;  // true 学院数据  false 班级数据
  _loading = false;   //加载中

  awardData = [
    {
      Amount: "",
      Members: "",
      TypeCode: "",
      TypeName: ""
    },
    {
      Amount: "",
      Members: "",
      TypeCode: "",
      TypeName: ""
    },
    {
      Amount: "",
      Members: "",
      TypeCode: "",
      TypeName: ""
    },
    {
      Amount: "",
      Members: "",
      TypeCode: "",
      TypeName: ""
    },
    {
      Amount: "",
      Members: "",
      TypeCode: "",
      TypeName: ""
    },
    {
      Amount: "",
      Members: "",
      TypeCode: "",
      TypeName: ""
    },
  ];  //六类资助饼图数据
  poolData = [];  //获取贫困等级饼状图数据
  awardTableData = [];  //六类资助表格数据
  //六类资助表格数据合计
  awardTotal = {
    PrizeMembersTotal: 0,
    PrizeAmountTotal: 0,
    AidMembersTotal: 0,
    AidAmountTotal: 0,
    LoanMembersTotal: 0,
    LoanAmountTotal: 0,
    WorkMembersTotal: 0,
    WorkAmountTotal: 0,
    SubsidyMembersTotal: 0,
    SubsidyAmountTotal: 0,
    FreeMembersTotal: 0,
    FreeAmountTotal: 0,
    awardTotalMembers: 0,
    awardTotalAmount: 0
  };
  poolTableData = [];  //获取贫困等级表格数据
  //获取贫困等级表格数据合计
  poolTotal = {
    SpecialMembersTotal: 0,
    SpecialAmountTotal: 0,
    MiddleMembersTotal: 0,
    MiddleAmountTotal: 0,
    NomalMembersTotal: 0,
    NomalAmountTotal: 0,
    NoGradeMembersTotal: 0,
    NoGradeAmountTotal: 0,
    poolMembersTotal: 0,
    poolAmountTotal: 0,
  };

  totalMemders = '';  //总人数
  totalAmount = '';  //总钱数

  constructor(private message: NzMessageService, public acRoute: ActivatedRoute, private router: Router, private http: HttpService, public modalHelper: ModalHelper) { }

  ngOnInit(): void {
    this._loading = true;
    this.getSchoolIcon(); //获取获取头像 名称
    this.getYearTerm();     //获取当前学年学期
    this.getYearTermList(); //获取学年学期列表
  }

  //获取头像 名称
  getSchoolIcon() {
    this.http.POST({
      Router: '/api/yxinfofill/getschoollogoandname',
      Method: 'POST',
      Body: {}
    }).subscribe(res => {

      this.schooLogo = res.Data.Logo;
      this.schooName = res.Data.Campus;
    });
  }
  // 获取当前学年学期
  getYearTerm() {
    this.http.POST({
      Router: '/api/system/schoolcalendarnowyearterm',
      Method: 'POST',
      Body: {
        Data: ''
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.beginYearName = res.Data.AcademicYear;
        this.year = res.Data.AcademicYearCode;

        sessionStorage.setItem('year', JSON.stringify(this.year));

        this.getTotal();  //获取总人数 钱数
        this.getSixChartsData(); //获取六大类饼状图数据
        this.getPoolLevelData(); //获取贫困等级饼状图数据
        this.supportTypeData();  //获取六大类表格数据
      }
    });
  }
  // 获取学年列表
  getYearTermList() {
    this.http.POST({
      Router: '/api/system/bizcode',
      Method: 'POST',
      Body: {
        CodeType: 'AcademicYear'
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.timeOption = res.Data
      }
    });
  }
  //选择学年学期
  handleOk() {
    if (JSON.stringify(this.beginTimeObj) == '{}') {
      this.message.create('warning', `请选择开始学年学期`);
      return false;
    }
    if (JSON.stringify(this.endTimeObj) == '{}') {
      this.message.create('warning', `请选择结束学年学期`);
      return false;
    }
    if (this.beginTimeObj['Name'].substring(0, 4) > this.endTimeObj['Name'].substring(0, 4)) {
      this.message.create('warning', `开始学年不能大于结束学年`);
      return false;
    }

    this.isVisible = false;  //时间选择框消失

    if (this.beginTimeObj['Code'] == this.endTimeObj['Code']) {
      this.year = this.beginTimeObj['Code'];
      this.beginYearName = this.beginTimeObj['Name']
      this.endYearName = '';
    } else {
      this.beginYearName = this.beginTimeObj['Name']
      this.endYearName = this.endTimeObj['Name'];
      var aaa = parseInt(this.endTimeObj['Name'].substring(0, 4));
      var bbb = parseInt(this.beginTimeObj['Name'].substring(0, 4));
      var ccc = [];
      var ddd = []
      for (let i = 0; i < this.timeOption.length; i++) {
        if (bbb <= aaa) {
          ccc.push(bbb);
          bbb = bbb + 1;
        }
      }
      for (let j = 0; j < ccc.length; j++) {
        for (let i = 0; i < this.timeOption.length; i++) {
          if ((String(ccc[j]) + '~' + String(ccc[j] + 1)) == this.timeOption[i].Name) {
            ddd.push(this.timeOption[i].Code)
          }
        }
      }
      this.year = ddd.join(',')
    }

    sessionStorage.setItem('year', JSON.stringify(this.year));

    this._loading = true;
    this.cutProtBT = true;
    this.getTotal();  //获取总人数 钱数
    this.getSixChartsData(); //获取六大类饼状图数据
    this.getPoolLevelData(); //获取贫困等级饼状图数据
    this.supportTypeData();  //获取六大类表格数据
  }
  //获取总人数 钱数
  getTotal() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/gettotalmemberamount',
      Method: 'POST',
      Body: {
        year: this.year
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.totalMemders = res.Data[0].Members;
        this.totalAmount = String(res.Data[0].Amount / 10000);
      }
    });
  }
  // 获取六大类饼状图数据
  getSixChartsData() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getsixcategoriespiechart',
      Method: 'POST',
      Body: {
        year: this.year
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.awardData = res.Data;
        for (let i = 0; i < this.awardData.length; i++) {
          this.awardData[i].Amount = String(parseInt(this.awardData[i].Amount) / 10000);

          if (this.awardData[i].TypeName == 'Prize') {
            this.awardData[i]['awardName'] = '奖学金';
            this.awardData[i]['awardImg'] = 'assets/images/jiang.png';
          } else if (this.awardData[i].TypeName == 'Aid') {
            this.awardData[i]['awardName'] = '助学金';
            this.awardData[i]['awardImg'] = 'assets/images/zhu.png';
          } else if (this.awardData[i].TypeName == 'Loan') {
            this.awardData[i]['awardName'] = '助学贷款';
            this.awardData[i]['awardImg'] = 'assets/images/dai.png';
          } else if (this.awardData[i].TypeName == 'Work') {
            this.awardData[i]['awardName'] = '勤工助学';
            this.awardData[i]['awardImg'] = 'assets/images/qin.png';
          } else if (this.awardData[i].TypeName == 'Subsidy') {
            this.awardData[i]['awardName'] = '困难补助';
            this.awardData[i]['awardImg'] = 'assets/images/bu.png';
          } else if (this.awardData[i].TypeName == 'Free') {
            this.awardData[i]['awardName'] = '学费减免';
            this.awardData[i]['awardImg'] = 'assets/images/jian.png';
          }
        }
        this.setPeopleNumPie();
        this.setMoneyPie();
        sessionStorage.setItem('awardData', JSON.stringify(this.awardData));
      } else {
        this.message.create('error', res.FeedbackText);
      }
    });
  }
  // 获取贫困等级饼状图数据
  getPoolLevelData() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getrecognitionlevelpiechart',
      Method: 'POST',
      Body: {
        year: this.year
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.poolData = res.Data;

        for (let i = 0; i < this.poolData.length; i++) {
          this.poolData[i].Amount = parseInt(this.poolData[i].Amount) / 10000;

          if (this.poolData[i].TypeName == 'special') {
            this.poolData[i]['awardName'] = '特殊困难';
          } else if (this.poolData[i].TypeName == 'middle') {
            this.poolData[i]['awardName'] = '困难';
          } else if (this.poolData[i].TypeName == 'nomal') {
            this.poolData[i]['awardName'] = '一般困难';
          } else if (this.poolData[i].TypeName == 'nolevel') {
            this.poolData[i]['awardName'] = '无等级';
          }
        }
        this.setPoolPie();
        this.setPoolMoneyPie();
      } else {
        this.message.create('error', res.FeedbackText);
      }
    });
  }
  //六类资助 ----人数(饼图)
  setPeopleNumPie() {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}:({d}%)'
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
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
          color: ['#F5A623', '#B158FF', '#FF465D', '#80D424', '#FDD212', '#5450FF'],
          data: [
            { value: this.awardData[0].Members, name: '奖学金' },
            { value: this.awardData[1].Members, name: '助学金' },
            { value: this.awardData[2].Members, name: '助学贷款' },
            { value: this.awardData[3].Members, name: '勤工助学' },
            { value: this.awardData[4].Members, name: '困难补助' },
            { value: this.awardData[5].Members, name: '学费减免' }
          ]
        }
      ]
    };
    this.supportNumChart = echarts.init(document.getElementById('awardNum'), 'antlinker');
    this.supportNumChart.setOption(option);
    this.supportNumChart.on('click', (params) => {
      if (params.value >= 0) {
        switch (params.dataIndex) {
          case 0:
            this.JumpToAwardDetail(this.awardData[0].TypeCode);
            break;
          case 1:
            this.JumpToAwardDetail(this.awardData[1].TypeCode);
            break;
          case 2:
            this.JumpToAwardDetail(this.awardData[2].TypeCode);
            break;
          case 3:
            this.JumpToAwardDetail(this.awardData[3].TypeCode);
            break;
          case 4:
            this.JumpToAwardDetail(this.awardData[4].TypeCode);
            break;
          case 5:
            this.JumpToAwardDetail(this.awardData[5].TypeCode);
            break;
        }
      }
    });
  }
  //六类资助 ----金额(饼图)
  setMoneyPie() {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: ({d}%)'
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: '需要销假',
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
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
          color: ['#F5A623', '#B158FF', '#FF465D', '#80D424', '#FDD212', '#5450FF'],
          data: [
            { value: this.awardData[0].Amount, name: '奖学金' },
            { value: this.awardData[1].Amount, name: '助学金' },
            { value: this.awardData[2].Amount, name: '助学贷款' },
            { value: this.awardData[3].Amount, name: '勤工助学' },
            { value: this.awardData[4].Amount, name: '困难补助' },
            { value: this.awardData[5].Amount, name: '学费减免' }
          ]
        }
      ]
    };
    this.supportMoneyChart = echarts.init(document.getElementById('awardMoney'), 'antlinker');
    this.supportMoneyChart.setOption(option);
    this.supportMoneyChart.on('click', (params) => {
      if (params.value >= 0) {
        switch (params.dataIndex) {
          case 0:
            this.JumpToAwardDetail(this.awardData[0].TypeCode);
            break;
          case 1:
            this.JumpToAwardDetail(this.awardData[1].TypeCode);
            break;
          case 2:
            this.JumpToAwardDetail(this.awardData[2].TypeCode);
            break;
          case 3:
            this.JumpToAwardDetail(this.awardData[3].TypeCode);
            break;
          case 4:
            this.JumpToAwardDetail(this.awardData[4].TypeCode);
            break;
          case 5:
            this.JumpToAwardDetail(this.awardData[5].TypeCode);
            break;
        }
      }

    });
  }

  //点击饼图跳转明细页
  JumpToAwardDetail(awardType) {
    if (awardType != this.awardData[3].TypeCode) {
      this.router.navigate(['/awardinfo/awarddetail']);
      sessionStorage.setItem('awardType', JSON.stringify(awardType));
    } else {
      this.router.navigate(['/awardinfo/awardproject']);
      sessionStorage.setItem('awardType', JSON.stringify(awardType));
    }
  }

  //贫困等级 ----人数(饼图)
  setPoolPie() {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: ({d}%)'
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: '需要销假',
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
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
          color: ['#F5A623', '#B158FF', '#FF465D', '#80D424'],
          data: [
            { value: this.poolData[0].Members, name: '特殊困难' },
            { value: this.poolData[1].Members, name: '困难' },
            { value: this.poolData[2].Members, name: '一般困难' },
            { value: this.poolData[3].Members, name: '无等级' }
          ]
        }
      ]
    };
    this.poolNumChart = echarts.init(document.getElementById('poolNum'), 'antlinker');
    this.poolNumChart.setOption(option);
    this.poolNumChart.on('click', (params) => {
      if (params.value >= 0) {
        switch (params.dataIndex) {
          case 0:
            this.JumpToPoolDetail('87000030');
            break;
          case 1:
            this.JumpToPoolDetail('87000020');
            break;
          case 2:
            this.JumpToPoolDetail('87000010');
            break;
          case 3:
            this.JumpToPoolDetail('87000040');
            break;
        }
      }

    });
  }
  //贫困等级 ----金额(饼图)
  setPoolMoneyPie() {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: ({d}%)'
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
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
          color: ['#F5A623', '#B158FF', '#FF465D', '#80D424'],
          data: [
            { value: this.poolData[0].Amount, name: '特殊困难' },
            { value: this.poolData[1].Amount, name: '困难' },
            { value: this.poolData[2].Amount, name: '一般困难' },
            { value: this.poolData[3].Amount, name: '无等级' }
          ]
        }
      ]
    };
    this.poolMoneyChart = echarts.init(document.getElementById('poolMoney'), 'antlinker');
    this.poolMoneyChart.setOption(option);
    this.poolMoneyChart.on('click', (params) => {
      if (params.value >= 0) {
        switch (params.dataIndex) {
          case 0:
            this.JumpToPoolDetail('87000030');
            break;
          case 1:
            this.JumpToPoolDetail('87000020');
            break;
          case 2:
            this.JumpToPoolDetail('87000010');
            break;
          case 3:
            this.JumpToPoolDetail('87000040');
            break;
        }
      }

    });
  }

  //点击饼图跳转明细页
  JumpToPoolDetail(awardType) {
    this.router.navigate(['/awardinfo/awarddetail']);
    sessionStorage.setItem('poolType', JSON.stringify(awardType));
  }

  //资助六类与困难等级切换
  cutProtFunc(num) {
    if (num == 1) {
      this.cutProtBT = true;
      this.supportTypeData();
    } else {
      this._loading = true;
      this.cutProtBT = false;
      this.poolTypeData();
    }
  }
  //资助项目 表格数据获取
  supportTypeData() {
    this.awardTotal = {
      PrizeMembersTotal: 0,
      PrizeAmountTotal: 0,
      AidMembersTotal: 0,
      AidAmountTotal: 0,
      LoanMembersTotal: 0,
      LoanAmountTotal: 0,
      WorkMembersTotal: 0,
      WorkAmountTotal: 0,
      SubsidyMembersTotal: 0,
      SubsidyAmountTotal: 0,
      FreeMembersTotal: 0,
      FreeAmountTotal: 0,
      awardTotalMembers: 0,
      awardTotalAmount: 0
    };

    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getsupportprojects',
      Method: 'POST',
      Body: {
        year: this.year
      }
    }).subscribe(res => {
      this._loading = false;
      if (!res.FeedbackCode) {
        this.awardTableData = res.Data.item;

        for (let i = 0; i < this.awardTableData.length; i++) {
          this.awardTableData[i]['totalNum'] = parseInt(this.awardTableData[i].PrizeMembers) + parseInt(this.awardTableData[i].AidMembers) + parseInt(this.awardTableData[i].LoanMembers) + parseInt(this.awardTableData[i].WorkMembers) + parseInt(this.awardTableData[i].SubsidyMembers) + parseInt(this.awardTableData[i].FreeMembers);
          this.awardTableData[i]['totalMon'] = parseInt(this.awardTableData[i].PrizeAmount) + parseInt(this.awardTableData[i].AidAmount) + parseInt(this.awardTableData[i].LoanAmount) + parseInt(this.awardTableData[i].WorkAmount) + parseInt(this.awardTableData[i].SubsidyAmount) + parseInt(this.awardTableData[i].FreeAmount);
          this.awardTotal.PrizeMembersTotal = this.awardTotal.PrizeMembersTotal + parseInt(this.awardTableData[i].PrizeMembers)
          this.awardTotal.PrizeAmountTotal = this.awardTotal.PrizeAmountTotal + parseInt(this.awardTableData[i].PrizeAmount)
          this.awardTotal.AidMembersTotal = this.awardTotal.AidMembersTotal + parseInt(this.awardTableData[i].AidMembers)
          this.awardTotal.AidAmountTotal = this.awardTotal.AidAmountTotal + parseInt(this.awardTableData[i].AidAmount)
          this.awardTotal.LoanMembersTotal = this.awardTotal.LoanMembersTotal + parseInt(this.awardTableData[i].LoanMembers)
          this.awardTotal.LoanAmountTotal = this.awardTotal.LoanAmountTotal + parseInt(this.awardTableData[i].LoanAmount)
          this.awardTotal.WorkMembersTotal = this.awardTotal.WorkMembersTotal + parseInt(this.awardTableData[i].WorkMembers)
          this.awardTotal.WorkAmountTotal = this.awardTotal.WorkAmountTotal + parseInt(this.awardTableData[i].WorkAmount)
          this.awardTotal.SubsidyMembersTotal = this.awardTotal.SubsidyMembersTotal + parseInt(this.awardTableData[i].SubsidyMembers)
          this.awardTotal.SubsidyAmountTotal = this.awardTotal.SubsidyAmountTotal + parseInt(this.awardTableData[i].SubsidyAmount)
          this.awardTotal.FreeMembersTotal = this.awardTotal.FreeMembersTotal + parseInt(this.awardTableData[i].FreeMembers)
          this.awardTotal.FreeAmountTotal = this.awardTotal.FreeAmountTotal + parseInt(this.awardTableData[i].FreeAmount)
          this.awardTotal.awardTotalMembers = this.awardTotal.awardTotalMembers + this.awardTableData[i].totalNum;
          this.awardTotal.awardTotalAmount = this.awardTotal.awardTotalAmount + this.awardTableData[i].totalMon;
        }

        if (res.Data.type == 'academy') {
          this.acaOrclass = true;
          sessionStorage.setItem('betweenName', JSON.stringify('academy'));
        } else {
          sessionStorage.setItem('betweenName', JSON.stringify('class'));
          this.acaOrclass = false;
        }
      }
    });
  }
  //困难等级 数据获取
  poolTypeData() {
    this.poolTotal = {
      SpecialMembersTotal: 0,
      SpecialAmountTotal: 0,
      MiddleMembersTotal: 0,
      MiddleAmountTotal: 0,
      NomalMembersTotal: 0,
      NomalAmountTotal: 0,
      NoGradeMembersTotal: 0,
      NoGradeAmountTotal: 0,
      poolMembersTotal: 0,
      poolAmountTotal: 0,
    };

    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getdifficultylevelforbutton',
      Method: 'POST',
      Body: {
        year: this.year
      }
    }).subscribe(res => {
      this._loading = false;
      if (!res.FeedbackCode) {
        this.poolTableData = res.Data.item;
        for (let i = 0; i < this.poolTableData.length; i++) {
          this.poolTableData[i]['totalNum'] = parseInt(this.poolTableData[i].SpecialMembers) + parseInt(this.poolTableData[i].MiddleMembers) + parseInt(this.poolTableData[i].NomalMembers) + parseInt(this.poolTableData[i].NoGradeMembers);
          this.poolTableData[i]['totalMon'] = parseInt(this.poolTableData[i].SpecialAmount) + parseInt(this.poolTableData[i].MiddleAmount) + parseInt(this.poolTableData[i].NomalAmount) + parseInt(this.poolTableData[i].NoGradeAmount);

          this.poolTotal.SpecialMembersTotal = this.poolTotal.SpecialMembersTotal + parseInt(this.poolTableData[i].SpecialMembers)
          this.poolTotal.SpecialAmountTotal = this.poolTotal.SpecialAmountTotal + parseInt(this.poolTableData[i].SpecialAmount)
          this.poolTotal.MiddleMembersTotal = this.poolTotal.MiddleMembersTotal + parseInt(this.poolTableData[i].MiddleMembers)
          this.poolTotal.MiddleAmountTotal = this.poolTotal.MiddleAmountTotal + parseInt(this.poolTableData[i].MiddleAmount)
          this.poolTotal.NomalMembersTotal = this.poolTotal.NomalMembersTotal + parseInt(this.poolTableData[i].NomalMembers)
          this.poolTotal.NomalAmountTotal = this.poolTotal.NomalAmountTotal + parseInt(this.poolTableData[i].NomalAmount)
          this.poolTotal.NoGradeMembersTotal = this.poolTotal.NoGradeMembersTotal + parseInt(this.poolTableData[i].NoGradeMembers)
          this.poolTotal.NoGradeAmountTotal = this.poolTotal.NoGradeAmountTotal + parseInt(this.poolTableData[i].NoGradeAmount)
          this.poolTotal.poolMembersTotal = this.poolTotal.poolMembersTotal + this.poolTableData[i].totalNum;
          this.poolTotal.poolAmountTotal = this.poolTotal.poolAmountTotal + this.poolTableData[i].totalMon;
        }

        if (res.Data.type == 'academy') {
          this.acaOrclass = true;
          sessionStorage.setItem('betweenName', JSON.stringify('academy'));
        } else {
          sessionStorage.setItem('betweenName', JSON.stringify('class'));
          this.acaOrclass = false;
        }
      }
    });
  }

  //学年学期弹框
  showModal(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }


  //重置图形大小
  onResize(event) {
    this.supportNumChart.resize();
    this.supportMoneyChart.resize();
    this.poolNumChart.resize();
    this.poolMoneyChart.resize();
  }

}
