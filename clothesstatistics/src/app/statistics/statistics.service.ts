import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpService } from '../http.service';
// import { Signer } from 'crypto';

@Injectable()
export class StatisticsSevice {
    baseUrl = '';
    AccessToken = '';

    constructor(private httpService: HttpService) { }

    // 请求违纪列表
    queryStatisticsList(academycode: string, gradename: string, page: number, count: number): Observable<any> {
        const params = {
            Router: '/api/clothesstatistics/statistics',
            Method: 'POST',
            Body: {
                AcademyCode: academycode || '',
                GradeName: gradename || '',
                Page: page - 1 + '',
                Count: count + ''
            }
        };
        return this.httpService.POST<any>(params);
    }

    // 请求学院列表
    queryAcademyList(): Observable<any> {
        const params = {
            Router: '/api/classinfo/academycascadeinit',
            Method: 'POST',
            Body: {}
        };
        return this.httpService.POST<any>(params);
    }

    // 请求年级列表
    queryGradeList(): Observable<any> {
        const params = {
            Router: '/api/classinfo/gradecascadeinit',
            Method: 'POST',
            Body: {}
        };
        return this.httpService.POST<any>(params);
    }

    // 请求宿舍列表
    down(academycode: string,gradename:string): Observable<any> {
        const params = {
            Router: '/api/clothesstatistics/down',
            Method: 'POST',
            Body: {
                AcademyCode: academycode,
                GradeName:gradename
            }
        };
        return this.httpService.POST<any>(params);
    }

}