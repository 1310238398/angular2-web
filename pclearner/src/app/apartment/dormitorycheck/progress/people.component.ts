import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  isVisible = false;
  taskId = '';
  byPeopleData = [];
  creator = '';
  detailsinfo = [];
  progressBars;
  barVal: number;
  _loading = false;
  constructor(private httpService: HttpService, private router: ActivatedRoute, private route:Router) { }
  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      // this.campusId = params['campusId'] || [];
      console.log(params)
      this.taskId = params['taskId'];
    });
    if (this.taskId) {
      this.peopleProgressList();
    }
    this.progressBar();
  }

  peopleProgressList() {
    this._loading = true;
    this.httpService.postJSON({
      Router: ServelUrl.Url.pdoing,
      Method: 'POST',
      Body: {
        TaskId: this.taskId
      }
    }).then(res => {
      if (!res.FeedbackCode && res.FeedbackText == '成功') {
        this._loading = false;
        this.byPeopleData = res.Data;
      }
    })

  }
  details(data) {
    console.log(data);
    this.creator = data.Checker;
    this.httpService.postJSON({
      Router: ServelUrl.Url.peopledetail,
      Method: 'POST',
      Body: {
        TaskId: this.taskId,
        Creator: this.creator,
      }
    }).then(res => {
      this.detailsinfo = res.Data;
      this.isVisible = true;
    })

  }
  handleCancel() {
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

          this.barVal = ((res.Data.DoneCount) / (res.Data.TotalCount))*100;
          this.barVal = parseFloat(this.barVal.toFixed(1));
        }

      }
      // console.log(res);
    })
  }
  // 返回
  return(){
    this.route.navigate(["./dormitorycheck"]);
  }
}
