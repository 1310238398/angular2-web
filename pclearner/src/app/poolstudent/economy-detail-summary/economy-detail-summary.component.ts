import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../http/http.service";
import {ServelUrl} from "../../ServelUrl";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-economy-detail-summary',
  templateUrl: './economy-detail-summary.component.html',
  styleUrls: ['./economy-detail-summary.component.less']
})
export class EconomyDetailSummaryComponent implements OnInit {
  intercode = '';
  detail = {
    RecognitionLevel: "",
    approval_situation: "",
    economic_situation: "",
    group_comment: "",
    intelUserCode: "",
    name: "",
    sum: 0,
    self_assessment: "",
    user_code: ""
  };
  pid;

  constructor(private route: ActivatedRoute, public httpService: HttpService) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.params['code']);
    this.pid = localStorage.getItem('pid');
    this.intercode = this.route.snapshot.params['code'];
    this.queryInfo();
  }

  queryInfo() {
    this.httpService.POST({
      Router: ServelUrl.Url.poolGetOne, Method: 'POST', Body: {intelUserCode: this.intercode}
    }).subscribe(res => {
      if (!res.FeedBackCode) {
        const data = res.Data;
        this.detail = data;
        this.detail.sum = data.economic_situation * 0.5 + data.self_assessment * 0.2 + data.group_comment * 0.3
      }
    })
  }
}
