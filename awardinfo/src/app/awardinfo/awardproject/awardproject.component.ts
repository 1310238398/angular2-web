import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/http/http.service';
import { ModalHelper } from 'src/app/share/modalHelper';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-awardproject',
  templateUrl: './awardproject.component.html',
  styleUrls: ['./awardproject.component.less']
})
export class AwardProjectComponent implements OnInit {

  DiligentStudyObj = [];   //勤工助学
  betweenName = '';  //学院还是班级
  betweenCode = '';   //学院还是班级代码
  scopecode = '';
  awardType = '';
  year = '';  //数据时间段

  titleName = '勤工助学';    //抬头名称
  total = 0;
  Page = 1;
  PageSize = 30;

  titleData = {
    Amount: "",
    Members: "",
    Works: ""
  }
  carryYear = '';   //是否携带学年
  poolType = '';    //困难等级

  constructor(public acRoute: ActivatedRoute, private router: Router, private http: HttpService, public modalHelper: ModalHelper) { }

  ngOnInit(): void {
    this.acRoute.params.forEach((params: Params) => {
      this.awardType = params['awardType'];
      this.betweenCode = params['betweenCode'];
      this.carryYear = params['carryYear'];
      this.poolType = params['poolType'];
    });

    this.year = JSON.parse(sessionStorage.getItem('year'));  //选择学年学期
    this.betweenName = JSON.parse(sessionStorage.getItem('betweenName'));  //学院还是班级

    if (this.awardType == undefined) {
      this.awardType = JSON.parse(sessionStorage.getItem('awardType'));  
    }

    if (this.betweenCode != undefined) {
      this.scopecode = this.betweenCode
    }

    if (this.carryYear != undefined) {
      this.year = this.carryYear
    }

    this.getAwardWork(true);
    this.getHeadTitleData()
  }

  // 获取 勤工助学
  getAwardWork(obj) {
    if (obj) {
      this.Page = 1;
    }

    if (!this.scopecode) {
      this.betweenName = ''
    }

    if (this.poolType != undefined) {
      this.betweenName = 'difficultylevel'
      this.scopecode = this.poolType
    }

    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getworkdata',
      Method: 'POST',
      Body: {
        year: this.year,
        scope: this.betweenName,
        scopecode: this.scopecode,
        pageindex: this.Page,
        pagesize: this.PageSize
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.total = res.Data.total;
        this.DiligentStudyObj = res.Data.item;
      }
    });
  }

  // 获取头部标题
  getHeadTitleData() {

    if (this.poolType != undefined) {
      this.betweenName = 'difficultylevel'
      this.scopecode = this.poolType
    }

    this.http.POST({
      Router: '/api/pc/prizeaidfreesupport/getworkdatatop',
      Method: 'POST',
      Body: {
        year: this.year,
        scope: this.betweenName,
        scopecode: this.scopecode
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.titleData = res.Data[0];
        this.titleData.Amount = String(parseInt(this.titleData.Amount)/10000)
      }
    });
  }

  //返回上一页
  goBack() {
    window.history.back();
  }




}


























