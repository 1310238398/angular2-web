import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http';
@Injectable()
export class HttpService {
  private baseUrl = '/api/staff/interface';

  private AccessToken = 'DWJM4K7MNY2HXLAFVOR4QQ';

  private _loading = false;

  /** 是否正在加载中 */
  get loading() {
    return this._loading;
  }

  constructor(private httpClient: HttpClient) {}

  responseToJson(resp) {
    if (resp.type === 'cors') {
      console.warn('cors请求');
    }
    if (resp.ok) {
      return resp.json() || undefined;
    } else {
      this.catchAuthError(resp);
    }
  }
  catchAuthError(res) {
    switch (res.status) {
      case 200:
        console.log('200');
        break;
      case 401: // 未登录状态码
        console.warn('401:认证中心错误');
        break;
      case 403:
      case 404:
      case 500:
      case 502:
        console.warn('服务器错误:请检查h5api或后端服务');
        break;
      default:
        if (res instanceof Response) {
          const errMsg = `${res.status}:${res.statusText || ''} ${res}`;
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', errMsg, );
        }
        break;
    }
    /*    if (res.status === 401 || res.status === 403) {
      let errMsg;
      if (res instanceof Response) {
        let err;
        try {
          const body = res.json();
          err = body;
        } catch (e) {
          err = '';
        }
        errMsg = `${res.status}:${res.statusText || ''} ${err}`;
      }
      console.log(errMsg);
    } */
    return Promise.reject(res);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('出错了:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.message}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  Fetch(params, method = 'POST', url = this.baseUrl) {
    params.Body = JSON.stringify(params.Body);
    const init = {
      method: method,
      headers: new Headers({
        'AccessToken': window['__AppWebkey'] || this.AccessToken
      }),
      body: JSON.stringify(params)
    };
    return fetch(url, init)
      .then(r => this.responseToJson(r))
      .catch(this.catchAuthError);
  }
  POST(params, url = this.baseUrl): Observable < any > {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'AccessToken': window['__AppWebkey'] || this.AccessToken
      })
    };
    params.Body = JSON.stringify(params.Body);

    return this.httpClient.post < any > (url, params, httpOptions).pipe(catchError(this.handleError));
  }
}
