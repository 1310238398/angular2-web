import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../http/http.service";

@Component({
  selector: 'app-attach',
  templateUrl: './attach.component.html',
  styleUrls: ['./attach.component.less']
})
export class AttachComponent implements OnInit {
  dataSet=[];
  constructor(public route: ActivatedRoute,private http: HttpService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params["AttachmentCode"])
    this.getAttach(this.route.snapshot.params["AttachmentCode"]);
  }

  getAttach(AttachmentCode) {
    this
      .http
      .POST({
        Router: '/api/pc/assess/queryhonourattach',
        Method: 'POST',
        Body: {attachCode: AttachmentCode}
      })
      .subscribe(res => {
        if (!res.FeedbackCode) {
          if (res.Data) {
            this.dataSet = res.Data||[];
          }
        } else {
          console.log(res);
        }
      });
  }
  back(){
    history.back()
  }

}
