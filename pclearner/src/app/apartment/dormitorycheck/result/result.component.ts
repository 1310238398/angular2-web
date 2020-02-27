import { Params } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
import { NzMessageService } from "ng-zorro-antd";
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.less']
})
export class ResultComponent implements OnInit {

  constructor(private msgSrv:NzMessageService,private httpService: HttpService, private router: ActivatedRoute, private route: Router, private msvg: NzMessageService) { }
  Campus = [];
  isDisabled=false;
  Dorm = [];
  Room = [];
  title = {
    TaskName: '',
    StartDate: '',
    EndDate: ''
  };
  searchObj = {
    Campus: '',
    Dormitory: '',
    Room: '',
    LowScore: '',
    HighScore: '',
  };
  taskId: '';
  dataSet = [
    // {
    //   CampusName: '松山校区',
    //   DormitoryName: '一号楼',
    //   RoomName: '54302',
    //   RoomCode: '2343435345',
    //   Checker: '老王',
    //   CheckerCode: '327874237',
    //   Score: '100',
    //   Created: '2017-03-05'
    // }
  ];
  page = {
    Page: 1,
    PageSize: 30,
  }
  total = 0;
  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.taskId = params['taskId'];
    })
    this.loadCampus();
    this.onSearch();
    this.PageTitle();
  }
  export(p = '') {
    this.isDisabled = true;
    var temp={
      TaskId:this.taskId||''
    };
    this.httpService.postJSON({
      Router: ServelUrl.Url.exportList,
      Method: 'POST',
      Body:Object.assign(this.searchObj,temp)
    }).then(value => {
      this.isDisabled = false;
      if (!value.FeedbackCode) {
        this.msgSrv.success(value.FeedbackText);
        // window.open(value.Data.url);
        var a = document.createElement('a');
        var filename = '宿舍检查.xlsx';
        a.href = value.Data.url;
        a.download = filename;
        a.click();
      } else {
        this.msgSrv.warning(value.FeedbackText);
      }
    }).catch(re => {
      this.msgSrv.error('出错了亲');
    });
  }
  // 结果列表
  onSearch() {
    if (this.searchObj.Campus == null) {
      this.searchObj.Campus = ''
    }
    if (this.searchObj.Dormitory == null) {
      this.searchObj.Dormitory = ''
    }
    if (this.searchObj.Room == null) {
      this.searchObj.Room = ''
    }
    this.httpService.postJSON({
      Router: ServelUrl.Url.resultlist,
      Method: 'POST',
      Body: {
        TaskId: this.taskId,
        CampusCode: this.searchObj.Campus,
        DormitoryCode: this.searchObj.Dormitory,
        RoomCode: this.searchObj.Room,
        Score1: this.searchObj.LowScore.toString(),
        Score2: this.searchObj.HighScore.toString(),
        page:this.page.Page-1,
        count:this.page.PageSize
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.dataSet = res.Data.datas;
        this.total=res.Data.total||0;
      }
    })
  }
  // 标题和时间
  PageTitle() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.previewPageTitle,
      Method: 'POST',
      Body: { TaskId: this.taskId }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.title = res.Data;
        // this.startTime = res.Data.StartDate;
        /*    this.sTime = this.startTime.substr(0, 11); */
        // console.log(sTime)
        // this.endTime = res.Data.EndDate;
        // this.eTime = this.endTime.substr(0, 11);
      }
    })
  }


  // 校区
  loadCampus() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.resultCampus,
      Method: 'POST',
      Body: {
        TaskId: this.taskId
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Campus = res.Data;

      }
    });
  }
  // 宿舍楼
  dorm(campus) {
    if (campus) {
      this.httpService.postJSON({
        Router: ServelUrl.Url.resultDorm,
        Method: 'POST',
        Body: {
          CampusCode: campus,
        }
      }).then(res => {
        this.Dorm = res.Data;
      })
    }
    //  else {
    //   this.msvg.error('请先选择校区');
    // }

  }
  // 宿舍号
  room(dorm) {
    if (dorm) {
      this.httpService.postJSON({
        Router: ServelUrl.Url.resultRoom,
        Method: 'POST',
        Body: {
          DormitoryCode: dorm,
        }
      }).then(res => {
        this.Room = res.Data;
      })
    }
  }
  // 校区选择将给园区，楼赋值请求下拉框
  changeCampus(event) {
    this.searchObj.Dormitory = null;
    this.searchObj.Room = null;
    this.dorm(event);
  }
  changeDorm(event) {
    this.room(event);
    this.searchObj.Room = null;
  }
  resetForm(form) {
    form.reset();
    this.searchObj.Campus = '';
    this.searchObj.Dormitory = '';
    this.searchObj.HighScore = '';
    this.searchObj.LowScore = '';
    this.searchObj.Room = '';
  }

  details(data) {
    this.route.navigate(['./dormitorycheck/resultdetail', { taskid: this.taskId, dorm: data.DormitoryName, room: data.RoomName, roomId: data.RoomCode, checker: data.Checker, creator: data.CheckerCode, time: data.Created }])
  }
  // 返回首页
  return_index() {
    this.route.navigate(['./dormitorycheck']);
  }
}
