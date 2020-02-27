import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/http/http.service';
import { ModalHelper } from 'src/app/share/modalHelper';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-awarddetail',
  templateUrl: './awarddetail.component.html',
  styleUrls: ['./awarddetail.component.less']
})
export class AwardDetailComponent implements OnInit {
  dataSet = [];  //页面数据
  academyOption = [];    //学院
  majorOption = [];      //专业
  gradeOption = [];      //年级
  classOption = [];      //班级
  ranksOption = [];      //困难等级
  projectOption = [];    //获奖项目
  typeOption = [];      //项目类别
  category = '';        //项目类别
  //搜索条件
  searchObj = {
    name: '',       //姓名
    schoolId: '',   //学号
    academy: '',  //学院
    major: '',      //专业
    grade: '',      //年级
    class: '',      //班级
    rank: '',       //困难等级
    project: '',     //获奖项目
    type: '',       //获奖类别
    time: '',        //获奖时间
    level: '',        //档次
    money: '',        //金额
    projectname: '',  //项目名称
    moneyadress: '',  //资金来源
    Page: 1,
    PageSize: 30,
    total: 0,
  }
  dataEmpty = true;       //是否有数据
  _loading = false;   //加载中
  gotoJumpData = {
    year: '',         //学年学期
    betweenCode: '',      //学院或班级代码
    betweenName: '',      // academy 学院 class 班级
    wardStor: '',
    poolStor: ''
  }

  carryYear = '';   //是否携带学年

  constructor(public acRoute: ActivatedRoute, public router: Router, public http: HttpService, public modalHelper: ModalHelper) { }

  ngOnInit(): void {
    this.acRoute.params.forEach((params: Params) => {
      this.searchObj.project = params['awardType'];
      this.searchObj.rank = params['poolType'];
      this.gotoJumpData.betweenCode = params['betweenCode'];
      this.category = params['category'];
      this.carryYear = params['carryYear'];
    });


    this.gotoJumpData.year = JSON.parse(sessionStorage.getItem('year'));
    this.gotoJumpData.betweenName = JSON.parse(sessionStorage.getItem('betweenName'));
    this.gotoJumpData.wardStor = JSON.parse(sessionStorage.getItem('awardType'));
    this.gotoJumpData.poolStor = JSON.parse(sessionStorage.getItem('poolType'));

    if (this.searchObj.project == undefined && this.gotoJumpData.wardStor == null) {
      this.searchObj.project = '';
    } else if (this.searchObj.project == undefined && this.gotoJumpData.wardStor != null) {
      this.searchObj.project = this.gotoJumpData.wardStor;
    }

    if (this.searchObj.rank == undefined && this.gotoJumpData.poolStor == null) {
      this.searchObj.rank = '';
    } else if (this.searchObj.rank == undefined && this.gotoJumpData.poolStor != null) {
      this.searchObj.rank = this.gotoJumpData.poolStor;
    }

    if (this.gotoJumpData.betweenName == 'academy') {
      this.searchObj.academy = this.gotoJumpData.betweenCode
    } else {
      this.searchObj.class = this.gotoJumpData.betweenCode
    }

    if (this.category != undefined) {
      this.searchObj.type = this.category
    }

    if (this.carryYear != undefined) {
      this.gotoJumpData.year = this.carryYear
    }

    console.log(this.gotoJumpData.year, '111111111')

    window.sessionStorage.removeItem('awardType');  //清除缓存
    window.sessionStorage.removeItem('poolType');   //清除缓存


    this.loadAcademy();     //获取学院
    this.loadGrade();       //获取年级
    this.loadClass(false);       //获取班级
    this.loadRanks();       //获取困难等级
    this.loadProject();     //获取获奖项目
    if (this.searchObj.project) {
      this.loadType(false);      //获取获奖类别
    }
    this.onSearch(true);    //获取数据
  }

  //获取数据列表
  onSearch(obj) {
    this._loading = true;   //加载中
    if (obj) {
      this.searchObj.Page = 1
    }
    for (var i in this.searchObj) {
      if (this.searchObj[i] == null) {
        this.searchObj[i] = '';
      }
    }

    if (this.searchObj.time) {
      var d = new Date(this.searchObj.time)
      this.searchObj.time = d.getFullYear() + '-' + this.addZero((d.getMonth() + 1)) + '-' + this.addZero(d.getDate());
    }

    this.searchObj.name = this.searchObj.name.trim();
    this.searchObj.schoolId = this.searchObj.schoolId.trim();
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getprizesearch',
      Method: 'POST',
      Body: {
        year: this.gotoJumpData.year,
        academy: this.searchObj.academy,
        major: this.searchObj.major,
        grade: this.searchObj.grade,
        class: this.searchObj.class,
        name: this.searchObj.name,
        usercode: this.searchObj.schoolId,
        recognitionlevel: this.searchObj.rank,
        awarditems: this.searchObj.project,
        awardcate: this.searchObj.type,
        time: this.searchObj.time,
        awardgrade: this.searchObj.level,
        amount: this.searchObj.money,
        projectname: this.searchObj.projectname,
        stemfrom: this.searchObj.moneyadress,
        pageindex: this.searchObj.Page,
        pagesize: this.searchObj.PageSize
      }
    }).subscribe(res => {
      this._loading = false
      if (!res.FeedbackCode) {
        this.searchObj.total = res.Data.total
        this.dataSet = res.Data.items;
        if (this.dataSet.length == 0) {
          this.dataEmpty = false;
        } else {
          this.dataEmpty = true;
        }
      }
    })
  }
  //获取学院
  loadAcademy() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getacademydropdownList',
      Method: 'POST',
      Body: {}
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.academyOption = res.Data;
      }
    });
  }
  //获取专业
  loadMajor() {
    this.searchObj.major = null;
    for (var i in this.searchObj) {
      if (this.searchObj[i] == null) {
        this.searchObj[i] = '';
      }
    }
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getmajordropdownlist',
      Method: 'POST',
      Body: {
        academy: this.searchObj.academy
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.majorOption = res.Data;
      }
    });
  }
  //获取年级
  loadGrade() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getgradedropdownlist',
      Method: 'POST',
      Body: {}
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.gradeOption = res.Data;
      }
    });
  }
  //获取班级
  loadClass(obj) {
    if (obj) {
      this.searchObj.class = null;
    }
    for (var i in this.searchObj) {
      if (this.searchObj[i] == null) {
        this.searchObj[i] = '';
      }
    }

    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getclassdropdownlist',
      Method: 'POST',
      Body: {
        major: this.searchObj.major,
        grade: this.searchObj.grade,
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.classOption = res.Data;
      }
    });
  }
  //获取困难等级
  loadRanks() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getrecognitionleveldropdownlist',
      Method: 'POST',
      Body: {}
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.ranksOption = res.Data;
      }
    });
  }
  //获取获奖项目
  loadProject() {
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getawarditemsdropdownlist',
      Method: 'POST',
      Body: {}
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.projectOption = res.Data;
      }
    });
  }
  //获取获奖类别
  loadType(obj) {
    if (obj) {
      this.searchObj.type = null;
    }
    for (var i in this.searchObj) {
      if (this.searchObj[i] == null) {
        this.searchObj[i] = '';
      }
    }
    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getawardcatedropdownlist',
      Method: 'POST',
      Body: {
        aidtype: this.searchObj.project
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.typeOption = res.Data;
      }
    });
  }
  //重置
  resetForm(form) {
    form.reset();
  }
  //返回上一页
  goBack() {
    window.history.back();
  }
  //时间加0
  addZero(obj) {
    if (parseInt(obj) < 10) {
      return '0' + String(obj)
    } else {
      return obj
    }
  }




}
