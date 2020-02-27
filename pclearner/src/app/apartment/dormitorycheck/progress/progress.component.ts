
import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.less']
})
export class ProgressComponent implements OnInit {
  taskId;
  storageTaskId;
  byDormData;
  byPeopleData;
  title = {
    TaskName:'',
    StartDate:'',
    EndDate:''
  };

  constructor(private httpService: HttpService, private router: ActivatedRoute, ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.taskId = params['taskId'] || [];
      if (this.taskId != "") {
        localStorage.setItem('this.storageTaskId', this.taskId);
      } else {
        this.taskId = localStorage.getItem("this.storageTaskId");
      }

    });
    this.PageTitle();
  }
  PageTitle() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.previewPageTitle,
      Method: 'POST',
      Body: { TaskId: this.taskId }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.title = res.Data;
      }
    })
  }
}
