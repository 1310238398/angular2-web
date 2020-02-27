import {Component, OnInit} from '@angular/core';
import {HttpService} from 'src/http/http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-leaveapply',
  templateUrl: './leaveapply.component.html',
  styleUrls: ['./leaveapply.component.less']
})
export class LeaveapplyComponent implements OnInit {

  dataSet = [];
  ids='';
isDisabled;
  constructor(public httpService: HttpService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this
      .route
      .queryParams
      .subscribe(params => {
        this.ids=params['ids'];
        this.onSearch(params['ids'], params['academy']);
      });
  }


  onSearch(ids, academy = '') {

    this.httpService.POST({
      Router: '/api/pc/bigdata/leavedetailwithids',
      Method: 'POST',
      Body: {
        ids: ids,
        academy: academy
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.dataSet = res.Data || [];
      }

    });
  }
  export(){
    this.isDisabled=true;
    this.httpService.POST({
      Router: '/api/pc/bigdata/leavedetailwithidsexport',
      Method: 'POST',
      Body: {
        ids: this.ids
      }
    }).subscribe(res => {
      this.isDisabled=false;
      if (!res.FeedbackCode) {
        var a = document.createElement('a');
        var filename = '请假缺勤人员.xlsx';
        a.href = res.Data.url;
        a.download = filename;
        a.click();
       // this.dataSet = res.Data || [];
      }else{
        alert(res.FeedbackText);
      }

    });
  }
}
