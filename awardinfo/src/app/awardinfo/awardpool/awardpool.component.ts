import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/http/http.service';
import { ModalHelper } from 'src/app/share/modalHelper';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-awardpool',
  templateUrl: './awardpool.component.html',
  styleUrls: ['./awardpool.component.less']
})
export class AwardPoolComponent implements OnInit {

  searchObj = [];       //奖助5类数据
  PoolRankData = [];    //困难等级

  awardType = '';       //类型代码      
  awardTypName = '';    //类型名称
  betweenName = '';     //学院还是班级
  year = '';            //数据时间段 

  showTableBt = '1';  //判断显示的表格 1 奖助贷补减   3 困难
  titleName = '';    //抬头名称

  total = 0;
  Page = 1;
  PageSize = 30;

  titleData = {
    Amount: 0,
    Members: "",
    Nums: ""
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


  constructor(public acRoute: ActivatedRoute, private router: Router, private http: HttpService, public modalHelper: ModalHelper) { }

  ngOnInit(): void {
    this.acRoute.params.forEach((params: Params) => {
      this.awardType = params['awardType'];
      this.awardTypName = params['awardTypName'];
    });

    if (this.awardTypName == 'Prize') {
      this.showTableBt = '1';
      this.titleName = '奖学金';
    } else if (this.awardTypName == 'Aid') {
      this.showTableBt = '1';
      this.titleName = '助学金';
    } else if (this.awardTypName == 'Loan') {
      this.showTableBt = '1';
      this.titleName = '助学贷款';
    } else if (this.awardTypName == 'Subsidy') {
      this.showTableBt = '1';
      this.titleName = '困难补助';
    } else if (this.awardTypName == 'Free') {
      this.showTableBt = '1';
      this.titleName = '学费减免';
    } else if (this.awardTypName == 'DifficultyLevel') {
      this.showTableBt = '3';
      this.titleName = '困难等级';
    }

    this.year = JSON.parse(sessionStorage.getItem('year'));  //选择学年
    this.betweenName = JSON.parse(sessionStorage.getItem('betweenName'));  //判断是班级还是学院
    this.awardData = JSON.parse(sessionStorage.getItem('awardData'));

    if (this.showTableBt == '1') {
      this.getAwardFive(true);
      this.getHeadAwardFive()
    } else if (this.showTableBt == '3') {
      this.getPoolData();
      this.getHeadPoolData();
    }
  }

  // 获取困难等级头部标题
  getHeadPoolData() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getrecognitionleveljumptotop',
      Method: 'POST',
      Body: {
        year: this.year,
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.titleData = res.Data.item[0];
        this.titleData['Nums'] = res.Data.item[0].ScholarshipAid;
      }
    });
  }

  // 获取 困难等级
  getPoolData() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getrecognitionleveljump',
      Method: 'POST',
      Body: {
        year: this.year,
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.PoolRankData = res.Data.item;
        this.total = res.Data.total;
        for (let i = 0; i < this.PoolRankData.length; i++) {
          this.PoolRankData[i]['totalNum'] = parseInt(this.PoolRankData[i].PrizeMembers) + parseInt(this.PoolRankData[i].AidMembers) + parseInt(this.PoolRankData[i].LoanMembers) + parseInt(this.PoolRankData[i].WorkMembers) + parseInt(this.PoolRankData[i].SubsidyMembers) + parseInt(this.PoolRankData[i].FreeMembers);

          this.PoolRankData[i]['totalMon'] = parseInt(this.PoolRankData[i].PrizeAmount) + parseInt(this.PoolRankData[i].AidAmount) + parseInt(this.PoolRankData[i].LoanAmount) + parseInt(this.PoolRankData[i].WorkAmount) + parseInt(this.PoolRankData[i].SubsidyAmount) + parseInt(this.PoolRankData[i].FreeAmount);
        }
      }
    });
  }

  // 获取奖 助 贷 补 减头部标题
  getHeadAwardFive() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getsupportprojectjumptotop',
      Method: 'POST',
      Body: {
        type: this.awardTypName,
        year: this.year,
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.titleData = res.Data.item[0];
      }
    });
  }
  // 获取 奖 助 贷 补 减
  getAwardFive(obj) {
    if (obj) {
      this.Page = 1;
    }
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getsupportprojectjump',
      Method: 'POST',
      Body: {
        type: this.awardTypName,
        year: this.year,
        pageindex: this.Page,
        pagesize: this.PageSize
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.searchObj = res.Data.item;
        this.total = res.Data.total;
        for (let i = 0; i < this.searchObj.length; i++) {
          this.searchObj[i]['totalNum'] = parseInt(this.searchObj[i].SpecialMembers) + parseInt(this.searchObj[i].MiddleMembers) + parseInt(this.searchObj[i].NomalMembers) + parseInt(this.searchObj[i].NoGradeMembers);

          this.searchObj[i]['totalMon'] = parseInt(this.searchObj[i].SpecialAmount) + parseInt(this.searchObj[i].MiddleAmount) + parseInt(this.searchObj[i].NomalAmount) + parseInt(this.searchObj[i].NoGradeAmount);
        }
      }
    });
  }

  //返回上一页
  goBack() {
    window.history.back();
  }
}


























