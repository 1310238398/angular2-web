import {Injectable} from '@angular/core';
import {HttpService} from "../../http/http.service";
import {ServelUrl} from "../ServelUrl";

@Injectable()
export class CommonService {

  constructor(private httpService: HttpService) {
  }

  loadBizCode(code): Promise<any> {
    return this.httpService.postJSON({
      Router: ServelUrl.Url.getBizCode,
      Method: 'POST',
      Body: {
        parameter: [code]
      }
    })
  }


}
