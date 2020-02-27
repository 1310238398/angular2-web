import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { ServelUrl } from '../app/ServelUrl';

@Injectable()
export class HttpService {
  private fileUrl: string = ServelUrl.Url.fileUrl;
  private baseUrl: string = ServelUrl.Url.apiUrl;
  private thirdUrl: string = ServelUrl.Url.apiUrl1;

  private AccessTokenL: string = 'HKVLQGU2NLEMIPYAMVUHUA';

  private _loading = false;

  /** 是否正在加载中 */
  get loading(): boolean {
    return this._loading;
  }

  constructor(private http: Http) { }

  // 解析响应数据
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }


  /**
   * POST请求
   *
   * @param {string} url URL地址
   * @param {*} [body] body内容
   * @param {*} [params] 请求参数
   */
  POST<T>(params: any, url: string = this.baseUrl): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'AccessToken': window['__AppWebkey'] || this.AccessTokenL
    });
    const options = new RequestOptions({ headers: headers });
    this.begin();
    return this.http
      .post(url, JSON.stringify({
        Router: params.Router,
        Method: params.Method || 'GET',
        Body: JSON.stringify(params.Body)
      } || null), options)
      .do(() => this.end())
      .map(r => this.responseToJson<T>(r))
      .catch(r => this.catchAuthError(r));
  }

  /**
  * POST请求
  *
  * @param {string} url URL地址
  * @param {*} [body] body内容
  * @param {*} [params] 请求参数
  */
  // postReq<T>(params: any, url: string=): Promise<any> {
  //   let headers = new Headers({
  //     'Content-Type': 'application/json',
  //     'AccessToken': window["__AppWebkey"] || this.AccessTokenL
  //   });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http
  //     .post(url, JSON.stringify(params || null), options)
  //     .toPromise()
  //     .then(r => this.responseToJson<T>(r))
  //     .catch(this.catchError);
  // }

  /**
   * POST请求
   *
   * @param {string} url URL地址
   * @param {*} [body] body内容
   * @param {*} [params] 请求参数
   */
  postJSON<T>(params: any, url: string = this.baseUrl): Promise<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'AccessToken': window['__AppWebkey'] || this.AccessTokenL
    });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .post(url, JSON.stringify({
        Router: params.Router,
        Method: params.Method || 'GET',
        Body: JSON.stringify(params.Body)
      } || null), options)
      .toPromise()
      .then(r => this.responseToJson<T>(r))
      .catch(this.catchError);
  }

  /**
  * POST请求   应用服务接口
  *
  * @param {string} url URL地址
  * @param {*} [body] body内容
  * @param {*} [params] 请求参数
  */
  Post<T>(params: any, url: string = this.thirdUrl): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'AccessToken': window['__AppWebkey'] || this.AccessTokenL
    });
    const options = new RequestOptions({ headers: headers });
    this.begin();
    return this.http
      .post(url, JSON.stringify({
        Router: params.Router,
        Method: params.Method || 'GET',
        Body: JSON.stringify(params.Body)
      } || null), options)
      .do(() => this.end())
      .map(r => this.responseToJson<T>(r))
      .catch(r => this.catchAuthError(r));
  }

  /**
   * POST请求
   *
   * @param {string} url URL地址
   * @param {*} [body] body内容
   * @param {*} [params] 请求参数
   */
  PostJSON<T>(params: any, url: string = this.thirdUrl): Promise<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'AccessToken': window['__AppWebkey'] || this.AccessTokenL
    });
    const options = new RequestOptions({ headers: headers });
    this.begin();
    return this.http
      .post(url, JSON.stringify({
        Router: params.Router,
        Method: params.Method || 'GET',
        Body: JSON.stringify(params.Body)
      } || null), options)
      .toPromise()
      .then(r => this.responseToJson<T>(r))
      .catch(this.catchError);
  }


  // --------------------
  postXhr(params: any, callBack, url: string = this.baseUrl) {

    let windowKey = window['__AppWebkey'];
    windowKey = windowKey.substring(6, windowKey.length);
    const token = windowKey || this.AccessTokenL;
    // var token = this.AccessTokenL;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, false);
    xhr.setRequestHeader('X-ANT-TOKEN', token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader("X-ANT-EXT",xantheader);
    xhr.send(JSON.stringify(params));
    if (xhr.readyState === 4 && xhr.status === 200) {
      return callBack(JSON.parse(xhr.responseText));
    } else {
      console.log('Http status: ' + xhr.status + ' , ' + xhr.statusText);
      return '';
    }
  }

  // ---------------------


  /**
   *
   * @param formData
   * @param callBack
   * @param url
   */
  postFormData(formData: any, callBack, url: string = this.fileUrl) {
    /* var send = XMLHttpRequest.prototype.send,
         token = window["__AppWebkey"];*/
    const token = window['__AppWebkey'] || this.AccessTokenL;
    /*     XMLHttpRequest.prototype.send = function (data) {
             this.setRequestHeader('AccessToken', token);
             return send.apply(this, arguments);
         };*/
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('AccessToken', token);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callBack(JSON.parse(xhr.responseText));
        } else {
          console.log('Http status: ' + xhr.status + ' , ' + xhr.statusText);
          callBack(JSON.parse(xhr.responseText));
        }
      }
    };
    xhr.send(formData);
  }
  private begin() {
    console.time('http');
    this._loading = true;
  }

  end() {
    console.timeEnd();
    this._loading = false;
  }

  private responseToJson<T>(resp: Response) {
    this.end();
    return (resp.text() && resp.json()) || undefined as T;
  }

  private catchAuthError(res: Response | any) {
    this.end();
    if (res.status === 401 || res.status === 403) {
      let errMsg: string;
      if (res instanceof Response) {
        let err: string;
        try {
          const body = res.json();
          err = body.message;
        } catch (e) {
          err = '';
        }
        errMsg = `${res.status}:${res.statusText || ''} ${err}`;
      }
      console.log(errMsg);
    }
    return Observable.throw(res);
  }

  private catchError(res: Response | any) {
    console.log(res);
    if (res.status === 401 || res.status === 403) {
      let errMsg: string;
      if (res instanceof Response) {
        let err: string;
        try {
          const body = res.json();
          err = body.message;
        } catch (e) {
          err = '';
        }
        errMsg = `${res.status}:${res.statusText || ''} ${err}`;
      }
      console.log(errMsg);
    }
    return Promise.reject(res);
  }
}
