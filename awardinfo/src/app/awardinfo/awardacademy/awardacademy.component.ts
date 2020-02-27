import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/http/http.service';
import { ModalHelper } from 'src/app/share/modalHelper';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-awardacademy',
  templateUrl: './awardacademy.component.html',
  styleUrls: ['./awardacademy.component.less']
})
export class AwardAcademyComponent implements OnInit {

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


  Type = '';            // Awardlevel 奖助项目   Difficultlevel 困难等级
  academyCode = '';
  year = '';  //数据时间段
  cutProtBT: any;       //奖助表格切换
  _loading = false;   //加载中

  titleData = {
    AcademyName: "",
    Amount: "",
    Members: "",
    catnums: ""
  }

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

  constructor(private message: NzMessageService, public acRoute: ActivatedRoute, private router: Router, private http: HttpService, public modalHelper: ModalHelper) { }

  ngOnInit(): void {
    this.acRoute.params.forEach((params: Params) => {
      this.Type = params['Type'];
      this.academyCode = params['betweenCode'];
    });

    this.year = JSON.parse(sessionStorage.getItem('year'));
    this.awardData = JSON.parse(sessionStorage.getItem('awardData'));

    this._loading = true;
    if (this.Type == 'Awardlevel') {
      this.cutProtBT = true;
      this.supportTypeData();
    } else if (this.Type == 'Difficultlevel') {
      this.poolTypeData();
      this.cutProtBT = false;
    }

    this.getHeadTitleData();
  }

  //资助六类与困难等级切换
  cutProtFunc(num) {
    this._loading = true;
    if (num == 1) {
      this.cutProtBT = true;
      this.supportTypeData();
    } else {
      this.cutProtBT = false;
      this.poolTypeData();
    }
  }


  // 获取头部标题
  getHeadTitleData() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getsupportprojectforclasstop',
      Method: 'POST',
      Body: {
        year: this.year,
        academy: this.academyCode
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.titleData = res.Data[0];
        this.titleData.Amount = String(parseInt(this.titleData.Amount) / 10000)
      }
    });
  }

  //资助项目 表格数据获取
  supportTypeData() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getsupportprojectforclass',
      Method: 'POST',
      Body: {
        year: this.year,
        academy: this.academyCode
      }
    }).subscribe(res => {
      this._loading = false;
      if (!res.FeedbackCode) {
        this.awardTableData = res.Data;

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

          sessionStorage.setItem('betweenName', JSON.stringify('class'));
        }
      }
    });
  }

  //困难等级 数据获取
  poolTypeData() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getdifficultylevelforclass',
      Method: 'POST',
      Body: {
        year: this.year,
        academy: this.academyCode
      }
    }).subscribe(res => {
      this._loading = false;
      if (!res.FeedbackCode) {
        this.poolTableData = res.Data;

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

          sessionStorage.setItem('betweenName', JSON.stringify('class'));
        }
      }
    });
  }

  //返回上一页
  goBack() {
    window.history.back();
  }

  changeName(){
    sessionStorage.setItem('betweenName', JSON.stringify('academy'));
  }




}
