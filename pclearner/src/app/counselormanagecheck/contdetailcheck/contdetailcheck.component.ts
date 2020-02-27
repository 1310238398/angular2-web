import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { HttpService } from "../../../http/http.service";
import { ServelUrl } from "../../ServelUrl";

@Component({
  selector: 'app-contdetailcheck',
  templateUrl: './contdetailcheck.component.html',
  styleUrls: ['./contdetailcheck.component.css']
})
export class ContDetailCheckComponent implements OnInit {
  itemObj = {
    LogTitle: '',
    TemplateText: '',
    RecordID: '',
  };
  constructor(private httpService: HttpService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.itemObj.RecordID = params['RecordID'];
    });
    this.loadRizhi()
  }

  //进入页面  加载数据
  loadRizhi() {
    this.httpService.POST({
      Router: ServelUrl.Url.counsellorlogcontent,
      Method: 'POST',
      Body: {
        RecordID: this.itemObj.RecordID,
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        if(res.Data != null){
          this.itemObj = res.Data;
        }else{
          this.itemObj = {
            LogTitle: '',
            TemplateText: '',
            RecordID: '',
          };
        }
        
      }
    })
  }

  //返回
  tankbox() {
    window.history.back()
  }


}
