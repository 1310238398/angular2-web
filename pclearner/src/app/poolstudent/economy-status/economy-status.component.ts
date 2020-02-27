import {Component, OnInit} from '@angular/core';
import {ServelUrl} from "../../ServelUrl";
import {HttpService} from "../../../http/http.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {PreviewComponent} from "../economy-detail-materials/preview/preview.component";
import {ModalHelper} from "../../shared/helper/modal.helper";

@Component({
  selector: 'app-economy-status',
  templateUrl: './economy-status.component.html',
  styleUrls: ['./economy-status.component.less']
})
export class EconomyStatusComponent implements OnInit {
  topics;
  poolDeatil;

  constructor(private modalHelper: ModalHelper, private httpService: HttpService, private route: ActivatedRoute) {
    console.log(this.route.snapshot.params);

  }

  ngOnInit() {
    this.poolDeatil = this.route.snapshot.params;
    this.queryTopic(this.poolDeatil.intelUserCode)
  }

  queryTopic(intercode = '') {
    this.httpService.POST({
      Router: ServelUrl.Url.poolTopic,
      Method: 'POST',
      Body: {intelUserCode: intercode, questionnaire_code: localStorage.getItem('pid') || ""}
    }).subscribe(res => {
      if (!res.FeedBackCode) {
        console.log(res.Data);
        this.topics = res.Data || [];
      }
    })
  }


  preview(record_id, index) {
    this.httpService.POST({
      Router: ServelUrl.Url.queryTopicAttach, Method: 'POST', Body: {record_id: record_id}
    }).subscribe(res => {
      if (!res.FeedBackCode) {
        /*
        * 获取到附件
        * */
        console.log(res.Data);
        const attach = res.Data || [];
        this.modalHelper.open(PreviewComponent, {attach, index}).subscribe(() => {

        })
      }
    })
  }

}
