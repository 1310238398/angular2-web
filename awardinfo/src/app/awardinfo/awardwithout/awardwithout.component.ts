import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/http/http.service';
import { ModalHelper } from 'src/app/share/modalHelper';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-awardwithout',
  templateUrl: './awardwithout.component.html',
  styleUrls: ['./awardwithout.component.less']
})
export class AwardWithoutComponent implements OnInit {

  DiligentStudyObj = [
    { userid: '2018204250', name: '李家栋', academy: '传媒技术学院', major: '数据科学与软件工程',grade:'2018级', class: '18级软件工程01', status: '特殊困难', time: '2018.03.11' }
  ]

  academy = '';
  class = ''
  beginYearTerm = '';
  endYearTerm = '';

  
  total = 100;
  Page = 1;
  PageSize = 20;

  constructor(private message: NzMessageService, public acRoute: ActivatedRoute, private router: Router, private http: HttpService, public modalHelper: ModalHelper) { }

  ngOnInit(): void {
    this.acRoute.params.forEach((params: Params) => {
      this.academy = params['academy'];
      this.class = params['class'];
    });

    this.beginYearTerm = JSON.parse(sessionStorage.getItem('beginYearTerm'));
    this.endYearTerm = JSON.parse(sessionStorage.getItem('endYearTerm'));

    this.getBoardsData(true);
  }

    // 面板数据
  getBoardsData(obj) {
    if(obj){
      this.Page = 1;
    }
    this.http.POST({
      Router: '/api/pc/bigdata/boardsdata',
      Method: 'POST',
      Body: {
        academy: ''
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        //this.boardsItems = res.Data || {};
        // 设置需要销假的人员统计
        //this.setNeedBackPie(this.boardsItems.NeedBack);
      } else {
        //this.permission = false;
      }
    });
  }

  goBack() {
    window.history.back();
  }




}
