import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/http/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-xiaojia',
  templateUrl: './xiaojia.component.html',
  styleUrls: ['./xiaojia.component.less']
})
export class XiaojiaComponent implements OnInit {
  dataSet = [];
  constructor(private http: HttpService, public route: ActivatedRoute) { }

  ngOnInit() {
    this
      .route
      .queryParams
      .subscribe(params => {
        console.log(params)
        this.onSearch(params.which,params.academy)
      });
  }
  onSearch(which,academy='') {
    this.http.POST({
      Router: '/api/pc/bigdata/leavedetail',
      Method: 'POST',
      Body: {
        which: which,
        academy:academy
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.dataSet = res.Data || [];
      }

    });
  }
}
