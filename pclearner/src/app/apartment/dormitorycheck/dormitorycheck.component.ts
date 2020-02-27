import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service'
import { ServelUrl } from "../../ServelUrl";
import { Router } from '@angular/router';
import { DatePipe } from "@angular/common";
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-dormitorycheck',
  templateUrl: './dormitorycheck.component.html',
  styleUrls: ['./dormitorycheck.component.css']
})
export class DormitorycheckComponent implements OnInit {
  constructor(private httpService: HttpService, private datePipe: DatePipe, private route: Router, private msvg: NzMessageService) { }

  loading = true;
  showMore: boolean;
  weeks = [];

  styleObj = {
    width:'132px',
  };

  searchObj = {
    Campus: '',
    startDate: '',
    endDate: '',
    weeks: ''
  };
  page = 0;
  pageAdd = '';
  Top20 = [];
  Campus: any[] = [];
  ItemsData = [];
  datas = [];
  universityID = '';
  closeStatus;
  ngOnInit() {
    this.loadCampus();
    this.queryWeeks();
    this.onSearch('0');
  }

  /*校区*/

  loadCampus() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.campusList,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Campus = res.Data;
      }
    });

  }

  // 周次
  queryWeeks() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.schoolcalendarweeks,
      Method: 'POST',
      Body: {
        After: '0'
      }
    }).then(res => {
      for (let i = 0; i < res.Data.length; i++) {
        this.weeks.push(res.Data[i].Weeks);
      }
    })

  }
  // 查询宿舍任务列表
  onSearch(pg = '') {
    if (pg == '') {
      pg = '0'
    }
    this.loading = true;
    this.searchObj.startDate = this.datePipe.transform(this.searchObj.startDate, 'yyyy-MM-dd');
    this.searchObj.endDate = this.datePipe.transform(this.searchObj.endDate, 'yyyy-MM-dd');
    if (this.searchObj.startDate == null) {
      this.searchObj.startDate = "";
    }
    if (this.searchObj.endDate == null) {
      this.searchObj.endDate = "";
    }
    this.httpService.postJSON({
      Router: ServelUrl.Url.taskList,
      Method: 'POST',
      Body: {
        Campus: this.searchObj.Campus,
        StartDate: this.searchObj.startDate,
        EndDate: this.searchObj.endDate,
        Weeks: this.searchObj.weeks,
        Page: pg
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.loading = false;
        this.ItemsData = res.Data;
        if (pg == '0') {
          this.datas = [];
        }
        if (this.ItemsData != null) {
          for (var i = 0; i < this.ItemsData.length; i++) {
            this.datas.push(this.ItemsData[i]);
          }
        }
        if (this.ItemsData.length < 20) {
          this.showMore = false;    //没了，
        } else if (this.ItemsData.length == 20) {
          this.showMore = true;
        }
      }
    })
  }
  onMore() {
    this.page++;
    this.pageAdd = this.page.toString();
    this.onSearch(this.pageAdd);
  }

  resetForm(form) {
    form.reset();

    this.searchObj.Campus = '';
    this.searchObj.startDate = '';
    this.searchObj.endDate = '';
    this.searchObj.weeks = '';
  }
  new() {
    this.route.navigate(['/dormitorycheck/newtask']);
  }
  // tree() {
  //   this.route.navigate(['/dormitorycheck/tree'])
  // }
  // 查看结果
  result(id) {
    this.route.navigate(['./dormitorycheck/result', { taskId: id }]);
  }
  // 查看进度
  schedule(Id) {
    this.route.navigate(['./dormitorycheck/progress', { taskId: Id }]);
  }

  cancel() {
    // alert("取消")
  }
  // 关闭任务
  confirm(Id) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.closeTask,
      Method: 'POST',
      Body: {
        TaskId: Id
      }
    }).then(
      res => {
        if (!res.FeedbackCode) {
          this.msvg.success("关闭成功");
          this.onSearch('0');
        }
      }
      )
  }




}
