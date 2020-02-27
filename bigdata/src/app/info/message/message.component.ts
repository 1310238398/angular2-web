import {Component, OnInit} from '@angular/core';
import { HttpService } from '../../../http/http.service';

@Component({selector: 'app-message', templateUrl: './message.component.html', styleUrls: ['./message.component.less']})
export class MessageComponent implements OnInit {
  data: any;
  StudentCadres = [];
  statuss = [];
  StayInfo = [];
  type: any;
  uid: any;
  constructor(private http: HttpService) {}

  ngOnInit() {
    if (this.type === 'StayInfo') {
      if (this.data) {
        this
        .StayInfo
        .push(this.data);
      }

    }
    if (this.type === 'StudentCadres') {
      this.data.forEach(element => {
        if (element.ScStatus !== '0') {
          this.StudentCadres.push(element);
         }
      });
    }
    if (this.type === 'status') {
        this
          .http
          .POST({
            Router: '/api/pc/bigdata/querystudentstatus',
            Body: {
              uid: this.uid
            }
          })
          .subscribe(res => {
            if (!res.FeedbackCode) {
                this.statuss = res.Data || [];
            } else {
              console.log(res.Data.FeedbackText);
            }
          });
    }
    console.log(this.data);
  }
}
