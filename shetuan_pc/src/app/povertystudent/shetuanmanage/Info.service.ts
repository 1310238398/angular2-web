import {Injectable} from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class InfoService {

  constructor(private http: HttpService) {
  }

  /*校区*/
  saveUser(user): Observable<any> {
    return this
      .http
      .POST({Router: '/api/pc/bigdata/upuser', Method: 'POST', Body: user || {}});
  }

  /*加载学院*/
  saveBasic(basic): Observable<any> {
    return this
      .http
      .POST({Router: '/api/pc/bigdata/upstudentbasicinfo', Method: 'POST', Body: basic || {}});
  }

}
