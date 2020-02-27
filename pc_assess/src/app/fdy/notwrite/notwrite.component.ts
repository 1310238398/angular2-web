import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ModalHelper } from '../../share/modalHelper';
import { ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: 'app-notwrite',
  templateUrl: './notwrite.component.html',
  styleUrls: ['./notwrite.component.less']
})

export class NotWriteComponent implements OnInit {

  loading = true;
  dataSet = [];
  IntelUserCode = '';

  constructor(public acRoute: ActivatedRoute, private http: HttpService) { }

  ngOnInit() {

    this.acRoute.params.forEach((params: Params) => {
      this.IntelUserCode = params['IntelUserCode'];
    });
    this.onSearch();
  }

  onSearch() {
    this.http.POST({
      Router: '/api/pc/assess/getclassprogresslist',
      Method: 'POST',
      Body: {
        usercode: this.IntelUserCode
      }
    }).subscribe(res => {
      this.loading = false;
      if (!res.FeedbackCode) {
        this.dataSet = res.data.item;
        for (let i = 0; i < this.dataSet.length; i++) {

          if (this.dataSet[i].MeasuredNums == this.dataSet[i].ClassNums) {
            this.dataSet[i]['rate'] = '100%'
          } else if (this.dataSet[i].MeasuredNums == '0') {
            this.dataSet[i]['rate'] = '0%'
          } else {
            this.dataSet[i]['rate'] = ((this.dataSet[i].MeasuredNums/this.dataSet[i].ClassNums)*100).toFixed(2)+'%'
          }
        }
      } else {
        console.log(res.Data.FeedbackText);
      }
    });
  }

  //返回上一页
  goBack() {
    window.history.back();
  }


}
