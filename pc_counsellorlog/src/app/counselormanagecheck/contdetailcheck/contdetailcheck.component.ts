import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { HttpService } from "../../../http/http.service";
import { ServelUrl } from "../../ServelUrl";
import { DomSanitizer } from "@angular/platform-browser";

declare var $: any

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

  CertifyImgs = [];

  constructor(private DomSanitizer: DomSanitizer,private httpService: HttpService, private route: ActivatedRoute, ) { }

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
        if (res.Data != null) {
          this.itemObj = res.Data;
          if (res.Data.ImgURLArr != null) {
            this.CertifyImgs = res.Data.ImgURLArr;
          }
        } else {
          this.itemObj = {
            LogTitle: '',
            TemplateText: '',
            RecordID: '',
          };
        }

      }
    })
  }

  //点击查看大图
  viewBigImg() {
    $('#jq22').viewer();
  }

  //返回
  tankbox() {
    window.history.back()
  }



}
