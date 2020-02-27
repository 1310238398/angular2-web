
import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
import { NzMessageService } from "ng-zorro-antd";
@Component({
  selector: 'app-previewcheck',
  templateUrl: './previewcheck.component.html',
  styleUrls: ['./previewcheck.component.css']
})
export class PreviewcheckComponent implements OnInit {

  taskId;
  CampusId;
  constructor(private route: Router, public msgSrv: NzMessageService, private httpService: HttpService, private router: ActivatedRoute, ) { }
  title = {
    TaskName:'',
    StartDate:'',
    EndDate:''
  };
  startTime: '';
  endTime: '';
  sTime;
  eTime;
  dataSet = [];
  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.CampusId = params['CampusId'] || [];
      this.taskId = params['TaskId'] || [];
    });
    this.previewPageTitle();
    this.list();
  }

  // 预览界面标题和时间
  previewPageTitle() {
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
  // 分配数据列表
  list() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.list,
      Method: 'POST',
      Body: {
        OnlyDone:'1',
        TaskId: this.taskId,
        Campus: this.CampusId
      }
    }).then(res => {
      // console.log(res)
      if (!res.FeedbackCode) {
        this.dataSet = res.Data;
      }
    })
  }

  prePage() {
    this.route.navigate(['/dormitorycheck/assign']);
  }
  created() {
    // this.helpUtil.toastPop("创建成功");
    this.msgSrv.success("创建成功");
    this.httpService.postJSON({
      Router: ServelUrl.Url.todo,
      Method: 'POST',
      Body: {
        TaskId: this.taskId
      }
    }).then(res => {
      console.log(res);
    })
    this.route.navigate(['./dormitorycheck'])
  }

}
