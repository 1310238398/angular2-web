import { Injectable } from "@angular/core";
import { ServelUrl } from "../app/ServelUrl";
import { Response, Headers, RequestOptions, Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    private baseUrl: string = ServelUrl.apiUrl;
    private AccessTokenL: string = 'KFA_YNPTPSWCCIL0ILR46A';
    private responseToJson<T>(resp: Response) {
        return (resp.text() && resp.json()) || undefined as T;
    }
    constructor(private http: Http) {
    }

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
