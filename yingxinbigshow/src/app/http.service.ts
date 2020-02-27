import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Http, Request, RequestOptionsArgs, RequestMethod, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class HttpService {
    baseURL = '/api';

    private jsonHeaders = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

    constructor(
        private http: Http
    ) { }

    // 解析响应数据
    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    // 处理响应错误
    private handleError(error: Response | any) {
        let errMsg: string;
        let errCode: number;
        if (error instanceof Response) {
            let err: string;
            try {
                const body = error.json();
                err = body.message;
                errCode = body.code;
            } catch (e) {
                err = '';
            }
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }

    // post请求
    postJSON<T>(url: string, body: any): Promise<T> {
        const options = new RequestOptions({
            method: RequestMethod.Post,
            body: JSON.stringify(body),
            headers: this.jsonHeaders
        });

        return this.request<T>(url, options);
    }

    // get请求
    getJSON<T>(url: string, search?: Map<string, string>): Promise<T> {
        const params = new URLSearchParams();
        if (search) {
            search.forEach((v, i) => {
                params.set(i, v);
            });
        }

        const options = new RequestOptions({
            method: RequestMethod.Get,
            search: params
        });

        return this.request<T>(url, options);
    }
    // 请求处理
    request<T>(url: string, options?: RequestOptionsArgs): Promise<T> {
        return this.http.request(url, options)
            .toPromise()
            .then(this.extractData)
            .catch((error: Response | any) => {
                let errMsg: string;
                let errCode: number;
                if (error instanceof Response) {
                    let err: string;
                    try {
                        const body = error.json();
                        err = body.message;
                        errCode = body.code;
                    } catch (e) {
                        err = '';
                    }
                    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
                } else {
                    errMsg = error.message ? error.message : error.toString();
                }

                return Promise.reject(errMsg);
            });
        // return new Promise((resolve, reject) => {

        //     const xhr: XMLHttpRequest = new XMLHttpRequest();
        //     xhr.open('POST', url, true);
        //     xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

        //     xhr.onreadystatechange = () => {
        //         if (xhr.readyState === 4) {
        //             if (xhr.status === 200) {
        //                 resolve(JSON.parse(xhr.response));
        //             } else {
        //                 alert(xhr.response);
        //             }
        //         }
        //     };
        //     xhr.send();

        // });
    }
}
