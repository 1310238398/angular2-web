import { Injectable } from "@angular/core";
import { Response, Headers, RequestOptions, Http } from "@angular/http";
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
// import { objectToURLSearchParams } from "../app/object_to_url_search_params";

@Injectable()
export class HttpService {
    private baseUrl: string = '/api/appsrv/interface';
    private AccessTokenL: string = window["__AppWebkey"];
    // private AccessTokenL: string = 'T6ASUMBUOK-NNXPBNJJ9WQ';

    private headers = new Headers({ 'Content-Type': 'application/json', 'AccessToken': this.AccessTokenL });
    // private headers = new Headers({ 'Content-Type': 'application/json', 'IDKEY': this.AccessTokenL });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http, private toastCtrl: ToastController) {
    }

    private responseToJson<T>(resp: Response) {
        if (resp.json().RE != 0) {
            let toast = this.toastCtrl.create({
                message: resp.json().Text,
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }
        return (resp.text() && resp.json()) || undefined as T;
    }

    // 获取请求的url
    private getRequestURL(url: string): string {
        if (url.charAt(0) !== '/') {
            return `${this.baseUrl}/${url}`;
        }
        return `${this.baseUrl}${url}`;
    }

    /**
     * POSTJSON
     * @param params
     * @param url 默认请求：this.baseUrl
     * @param queryParams
     */
    postJSON<T>(params: any) {
        return this.http.post(this.baseUrl, JSON.stringify({
            Router: params.Router,
            Method: params.Method || 'GET',
            Body: JSON.stringify(params.Body)
        } || null), this.options)
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
            })
    }

    private catchAuthError(res: Response | any) {

    }
}
