import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServelUrl} from "../app/ServelUrl";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/**
 * Created by hanzhendong on 2016/12/15.
 */
@Injectable()
export class HttpService {
  private baseUrl: string = ServelUrl.Url.apiUrl;
  private fileUrl: string = ServelUrl.Url.fileUrl;
  private AccessTokenL: string = '51OCIRDHOBSL5ZKROINWTA';

  constructor(private http: HttpClient) {
  }

  private responseToJson<T>(resp) {
    return resp || undefined as T;
  }


  /**
   * POST
   * @param params
   * @param url 默认请求：baseUrl
   * @param queryParams
   */
  post<T>(params: any, url: string = this.baseUrl) {
    this.AccessTokenL = window["__AppWebkey"];
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'AccessToken': this.AccessTokenL})
    // let headers = new Headers({'Content-Type': 'application/json', 'AccessToken': this.AccessTokenL});
    // let options = new RequestOptions({headers: headers});
    return this.http.post(url, params || null, {headers: headers})
      .toPromise()
      .then(r => this.responseToJson<T>(r))
      .catch(this.catchAuthError)
  }

  /**
   * POSTJSON
   * @param params
   * @param url 默认请求：this.baseUrl
   * @param queryParams
   */
  postJSON<T>(params: any, url: string = this.baseUrl) {
    //let headers = new Headers({'Content-Type': 'application/json', 'AccessToken': window["__AppWebkey"]||this.AccessTokenL});
    // let options = new RequestOptions({headers: headers});
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'AccessToken': window["__AppWebkey"] || this.AccessTokenL
    });
    return this.http.post(url, JSON.stringify({
      Router: params.Router,
      Method: params.Method || 'GET',
      Body: JSON.stringify(params.Body)
    } || null), {headers: headers})
      .toPromise()
      .then(r => this.responseToJson<T>(r))
      .catch(this.catchAuthError)
  }

  /**
   *
   * @param formData
   * @param callBack
   * @param url
   */
  postFormData(formData: any, callBack, url: string = this.fileUrl) {
    /* var send = XMLHttpRequest.prototype.send,
         token = window["__AppWebkey"];*/
    var token = window["__AppWebkey"] || this.AccessTokenL;
    /*     XMLHttpRequest.prototype.send = function (data) {
             this.setRequestHeader('AccessToken', token);
             return send.apply(this, arguments);
         };*/
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("AccessToken", token);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status === 200) {
        callBack(JSON.parse(xhr.responseText));
      } else {
        console.log("Http status: " + xhr.status + " , " + xhr.statusText);
      }
    };
    xhr.send(formData);
  }

  postXhr(params: any, callBack, url: string = this.baseUrl) {
    var token = window["__AppWebkey"] || this.AccessTokenL;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("AccessToken", token);
    xhr.send(JSON.stringify({
      Router: params.Router,
      Method: params.Method || 'GET',
      Body: JSON.stringify(params.Body)
    } || null));
    if (xhr.readyState == 4 && xhr.status === 200) {
     return callBack(JSON.parse(xhr.responseText));
    } else {
      console.log("Http status: " + xhr.status + " , " + xhr.statusText);
      return '';
    }
  }


  private catchAuthError(res: Response | any) {
    console.log(res);
    if (res.status === 401 || res.status === 403) {
      let errMsg: string;
      if (res instanceof Response) {
        let err: string;
        try {
          //let body = res.json();
          // err = body.message;
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
