import { HttpService } from 'src/http/http.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {
  params;
  score;
  dataSet = [];

  constructor(private router: Router, private modal: NzModalRef, private message: NzMessageService, private http: HttpService) {
  }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this
      .http
      .POST({
        Router: '/api/pc/assess/queryhonour',
        Method: 'POST',
        Body: { codeType: '1', code: this.params.IntelUserCode }
      })
      .subscribe(res => {
        if (!res.FeedbackCode) {
          if (res.Data) {
            this.dataSet = res.Data;
          }
        } else {
          console.log(res.Data.FeedbackText);
        }
      });
  }

  onSave() {
    if (this.score) {
      this.http
        .POST({
          Router: '/api/pc/assess/upstaffscore',
          Method: 'POST',
          Body: {
            uid: this.params.IntelUserCode,
            academy: this.params.Academy,
            numb: this.params.Numb,
            year: this.params.year,
            typeCode: '0070014',
            score: this.score.toString()
          }
        }).subscribe(res => {
          if (!res.FeedbackCode) {
            this.message.success('保存成功!');
            this.modal.destroy({ save: true });
          }
        });
    } else {
      this.message.warning('请填写分数!');
    }
  }

  nav(code) {
    this.router.navigateByUrl(`/attachmment/${code}`);
    this.modal.destroy();

  }

}
