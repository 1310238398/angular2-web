import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../http/http.service';
import {ActivatedRoute, Router} from '@angular/router';

declare var echarts;

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.less']
})
export class AcademyComponent implements OnInit {
  dataSet = [];
    QBTITLE;
    GRADE;
    loading=false;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit() {
    let routeParams=this.route.snapshot.queryParams;
    this.GRADE=routeParams['GRADE']||'';
    this.QBTITLE=routeParams['QBTITLE']||'';
    this.onSearch({QBID:parseInt(routeParams['QBID']),GRADE:routeParams['GRADE']})
  }
  onSearch(params) {
      this.loading=true;
    this
      .http
      .POST({ Router: '/app/qbrandom/speed/academy', Method: 'POST', Body: params })
      .subscribe(res => {
          this.loading=false;
        console.log(res);
        this.dataSet = res.Data || [];
      });
  }
  /**
   * id
   */
  navStaff(academy = '') {
    this
      .router
      .navigate(['stafflist'], {
        queryParams: {
            QBID: this.route.snapshot.queryParams['QBID']||"",
            ACADEMYNAME: academy||"",
            GRADE: this.GRADE||"",
        }
      });
  }
}
