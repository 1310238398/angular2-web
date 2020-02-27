import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class InfoService {

  constructor(private http: HttpService) {
  }

  /*校区*/
  saveUser(user): Observable<any> {
    return this
      .http
      .POST({ Router: '/api/pc/bigdata/upuser', Method: 'POST', Body: user || {} });
  }

  /*加载学院*/
  saveBasic(basic): Observable<any> {
    return this
      .http
      .POST({ Router: '/api/pc/bigdata/upstudentbasicinfo', Method: 'POST', Body: basic || {} });
  }
  // 获取当前学年学期
  querySchoolCalendarNow(): Observable<any> {
    return this.http.POST({
      Router: '/api/system/schoolcalendarnowyearterm',
      Method: 'POST',
      Body: {}
    });
  }

  // 获取学年学期
  queryYearTermlist(year: string, code: string): Observable<any> {
    return this.http.POST({
      Router: '/api/pc/bigdata/getyeartermlist',
      Method: 'POST',
      Body: {
        year: year,
        user: code
      }
    });
  }

  // 获取综合素质雷达图
  queryRadarChartData(year: string, term: string, uid: string): Observable<any> {
    return this.http.POST({
      Router: '/api/pc/bigdata/querycomprehensivequalitychart',
      Method: 'POST',
      Body: {
        year: year,
        term: term,
        user: uid
      }
    });
  }

  // 获取综合素质雷达图
  queryRadarChartDataDetail(year: string, term: string, uid: string): Observable<any> {
    return this.http.POST({
      Router: '/api/pc/bigdata/getchartcategorydetails',
      Method: 'POST',
      Body: {
        year: year,
        term: term,
        user: uid
      }
    });
  }
}
