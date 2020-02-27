import { Injectable } from "@angular/core";
import { ServelUrl } from "../app/ServelUrl";
import { Response, Headers, RequestOptions, Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
/**
 * Created by hanzhendong on 2016/12/15.
 */
@Injectable()
export class HttpService {
    private baseUrl: string = ServelUrl.Url.apiUrl;
    private AccessTokenL: string = '';

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
        let search = '';
        return this.http.get(url, { search: search })
            .toPromise()
            .then(r => this.responseToJson<T>(r))
            .catch(e => this.catchAuthError(e))
    }

    /**
     * POST
     * @param params
     * @param url 默认请求：baseUrl
     * @param option//其他参数
     */
    post<T>(params: any, url: string = this.baseUrl, ...option) {
        return this.http.post(url, params || null)
            .toPromise()
            .then(r => this.responseToJson<T>(r))
            .catch(this.catchAuthError)
    }

    /**
     * POSTJSON
     * @param params
     * @param url 默认请求：this.baseUrl
     * @param option
     */
    postJSON<T>(url: string = this.baseUrl,params: any) {
        return this.http.post(url, JSON.stringify(params || ''))
            .toPromise()
            .then(r => this.responseToJson<T>(r))
            .catch(this.catchAuthError)
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
