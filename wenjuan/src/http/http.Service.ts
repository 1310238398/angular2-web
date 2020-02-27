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
  private AccessTokenL: string = 'LZE2FZ3FNMAFFW_KIA8HWW';

  constructor(private http: HttpClient) {
  }

  private responseToJson<T>(resp) {
    return resp || undefined as T;
  }

  /**
   * POSTJSON
   * @param params
   * @param url 默认请求：this.baseUrl
   * @param queryParams
   */
  postJSON<T>(params: any, url: string = this.baseUrl) {
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
  get<T>(url: string = this.baseUrl) {

    return this.http.get(url)
      .toPromise()
      .then(r => this.responseToJson<T>(r))
      .catch(this.catchAuthError)
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
