
import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
@Component({
  selector: 'app-dorm',
  templateUrl: './dorm.component.html',
  styleUrls: ['./dorm.component.css']
})
export class DormComponent implements OnInit {
  taskId = '';
  byDormData = [];
  dormitoryCode = '';
  isVisible = false;
  proportion: number;
  Details = [];
  progressBars;
  barVal: number;
  _loading = false;
  constructor(private httpService: HttpService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      // this.campusId = params['campusId'] || [];
      this.taskId = params['params'];
    });
    if (this.taskId) {
      this.list();
    }
    this.progressBar();
  }
  list() {
    this._loading = true;
    this.httpService.postJSON({
      Router: ServelUrl.Url.ddoing,
      Method: 'POST',
      Body: {
        TaskId: this.taskId
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this._loading = false;
        this.byDormData = res.Data;
      }
    })
  }
  details(data) {
    this.dormitoryCode = data.DormitoryCode;
    this.httpService.postJSON({
      Router: ServelUrl.Url.dormdetail,
      Method: 'POST',
      Body: {
        TaskId: this.taskId,
        DormitoryCode: this.dormitoryCode,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Details = res.Data;
        this.isVisible = true;
      }
    })

  }
  handleCancel(e) {
    this.isVisible = false;
  }

  //进度条信息
  progressBar() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.previewPageTitle,
      Method: 'POST',
      Body: { TaskId: this.taskId }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.progressBars = res.Data;
        if (res.Data.TotalCount == 0) {
          this.barVal = 0;

        } else {
          this.barVal = ((res.Data.DoneCount) / (res.Data.TotalCount)) * 100;
          this.barVal = parseFloat(this.barVal.toFixed(1));
        }

      }
      // console.log(res);
    })
  }
  // 返回
  return() {
    this.route.navigate(["./dormitorycheck"]);
  }

}
