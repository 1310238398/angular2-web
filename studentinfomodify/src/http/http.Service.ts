import { Injectable } from "@angular/core";
import { ServelUrl } from "../app/ServelUrl";
import { Response, Headers, RequestOptions, Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { objectToURLSearchParams } from "../app/object_to_url_search_params";
/**
 * Created by hanzhendong on 2016/12/15.
 */
@Injectable()
export class HttpService {
    // 初始化界面调用的接口
    private baseUrl: string = ServelUrl.Url.apiUrl;
    private fileUrl: string = ServelUrl.Url.fileUrl;
    private AccessTokenL: string = 'KFA_YNPTPSWCCIL0ILR46A';

    constructor(private http: Http) {
    }

    private responseToJson<T>(resp: Response) {
        return (resp.text() && resp.json()) || undefined as T;
    }

    /**
     * GET
     * @param url
     * @param query
     */
    get<T>(url: string, query: any = null) {
        let search = objectToURLSearchParams(query);
        return this.http.get(url, {search: search})
            .toPromise()
            .then(r => this.responseToJson<T>(r))
            .catch(e => this.catchAuthError(e))
    }

    /**
     * POST
     * @param params
     * @param url 默认请求：baseUrl
     * @param queryParams
     */
    post<T>(params: any, url: string = this.baseUrl) {
        this.AccessTokenL = window["__AppWebkey"];
        let headers = new Headers({'Content-Type': 'application/json', 'AccessToken': this.AccessTokenL});
        let options = new RequestOptions({headers: headers});
        return this.http.post(url, params || null, options)
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
        this.AccessTokenL = window["__AppWebkey"];
        let headers = new Headers({'Content-Type': 'application/json', 'AccessToken': this.AccessTokenL});
        let options = new RequestOptions({headers: headers});
        return this.http.post(url, JSON.stringify({
                Router: params.Router,
                Method: params.Method || 'GET',
                Body: JSON.stringify(params.Body)
            } || null), options)
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
    postFormData<T>(formData: any, callBack, url: string = this.fileUrl) {
        /* var send = XMLHttpRequest.prototype.send,
             token = window["__AppWebkey"];*/
             var token=window["__AppWebkey"]
    /*     XMLHttpRequest.prototype.send = function (data) {
             this.setRequestHeader('AccessToken', token);
             return send.apply(this, arguments);
         };*/
         var xhr = new XMLHttpRequest();
         xhr.open("POST", url, true);
         xhr.setRequestHeader("AccessToken",token)
         xhr.onreadystatechange = function () {
             if (xhr.readyState == 4 && xhr.status === 200) {
                 callBack(JSON.parse(xhr.responseText));
             } else {
                 console.log("Http status: " + xhr.status + " , " + xhr.statusText);
             }
         };
         xhr.send(formData);
     }
    /**
     * postObser
     * @param url 默认请求：this.baseUrl
     * @param params
     */
    postObser<T>(params, url: string = this.baseUrl) {
        return this.http.post(url, params)
            .map((res: Response) => this.responseToJson<T>(res))
    }

    /**
     * postObser
     * @param url 默认请求：ServelUrl.Url.apiUrl
     * @param params
     */
    postObserJSON<T>(params, url: string = this.baseUrl) {
        return this.http.post(url, JSON.stringify({
            Router: params.Router,
            Method: params.Method || 'GET',
            Body: JSON.stringify(params.Body)
        }))
            .map((res: Response) => this.responseToJson<T>(res))

    }

    /**
     *
     * @param params
     * @param url
     * @returns {Promise<string|any|T>|Promise<T>|Promise<TResult2|string|any|T>}
     */
    put<T>(params, url: string = this.baseUrl) {
        return this.http.put(url + url, JSON.stringify(params))
            .toPromise()
            .then(r => this.responseToJson<T>(r))
            .catch(e => this.catchAuthError(e))
    }

    /**
     *
     * @param url
     * @returns {Promise<string|any|T>|Promise<T>|Promise<TResult2|string|any|T>}
     */
    delete<T>(params, url: string = this.baseUrl) {
        return this.http.delete(this.baseUrl + url)
            .toPromise()
            .then(r => this.responseToJson<T>(r))
            .catch(this.catchAuthError);
    }

    private catchAuthError(res: Response | any) {
        console.log(res);
        if (res.status === 401 || res.status === 403) {
            let errMsg: string;
            if (res instanceof Response) {
                let err: string;
                try {
                    let body = res.json();
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