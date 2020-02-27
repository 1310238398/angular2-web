import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";

// import { Signer } from 'crypto';

@Injectable()
export class StatisticsSevice {
    baseUrl = '';
    AccessToken = '';

    constructor(private httpService: HttpService) { }
    // 请求宿舍列表
    down(status: number): Observable<any> {
        const params = {
            Router: ServelUrl.Url.down,
            Method: 'POST',
            Body: {
                Status: status,
            }
        };
        return this.httpService.POST<any>(params);
    }

}