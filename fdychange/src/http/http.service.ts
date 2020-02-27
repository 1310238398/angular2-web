import { Injectable } from "@angular/core";
import { Response, Headers, RequestOptions, Http } from "@angular/http";
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
// import { objectToURLSearchParams } from "../app/object_to_url_search_params";

@Injectable()
export class HttpService {
    private baseUrl: string = '/api/staff/interface';
    private flowUrl: string = '/api/flow/interface';
    // private AccessTokenL: string = window["__AppWebkey"];
    private AccessTokenL: string = window["__AppWebkey"] || 'MP0IUK9OOBGE5TIHL1XLWQ';

    private headers = new Headers({ 'Content-Type': 'application/json', 'AccessToken': this.AccessTokenL });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http, private toastCtrl: ToastController) {
    }

    private responseToJson<T>(resp: Response) {
        // if (resp.json().FeedbackCode != 200) {
        //     let toast = this.toastCtrl.create({
        //         message: resp.json().FeedbackText,
        //         duration: 3000,
        //         position: 'bottom'
        //     });
        //     toast.present();
        // }
        return (resp.text() && resp.json()) || undefined as T;
    }

    /**
     * POSTJSON
     * @param params
     * @param url 默认请求：this.baseUrl
     * @param queryParams
     */
    postJSON<T>(params: any, url: string=this.baseUrl) {
        return this.http.post(url, JSON.stringify({
            Router: params.Router,
            Method: params.Method || 'GET',
            Body: JSON.stringify(params.Body)
        } || null), this.options)
            .toPromise()
            .then(r => this.responseToJson<T>(r))
            .catch(res => {
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
                let toast = this.toastCtrl.create({
                    message: errMsg,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                return Promise.resolve(res);
            })
    }

    /**
* 工作流平台服务POST接口请求
*
* @param {string} url URL地址
* @param {*} [body] body内容
* @param {*} [params] 请求参数
*/
    postFlowJSON<T>(params: any, url: string = this.flowUrl): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'AccessToken': window["__AppWebkey"] || this.AccessTokenL
        });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(url, JSON.stringify({
                Router: params.Router,
                Method: params.Method || 'GET',
                Body: JSON.stringify(params.Body)
            } || null), options)
            .toPromise()
            .then(r => this.responseToJson<T>(r))
            .catch(res => {
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
            });
    }

}
