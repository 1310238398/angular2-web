import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpService } from '../http.service';
// import { Signer } from 'crypto';

@Injectable()
export class SafeService {
    baseUrl = '';
    AccessToken = '';

    constructor(private httpService: HttpService) { }

    // 请求违纪列表
    queryUnSafeList(index: number, size: number, search: any): Observable<any> {
        const params = {
            Router: '/api/dormitorysafecheck/getsearchlist',
            Method: 'POST',
            Body: {
                pageindex: index,
                pagesize: size
            }
        };
        for (const [key, value] of Object.entries(search)) {
            params.Body[key] = value || '';
        }
        return this.httpService.POST<any>(params);
    }

    // 请求学院列表
    queryAcademyList(): Observable<any> {
        const params = {
            Router: '/api/dormitorysafecheck/getacademylist',
            Method: 'GET',
            Body: {}
        };
        return this.httpService.POST<any>(params);
    }

    // 请求宿舍楼列表
    queryDormRoomList(): Observable<any> {
        const params = {
            Router: '/api/dormitorysafecheck/getdormitorydropdownlist',
            Method: 'GET',
            Body: {}
        };
        return this.httpService.POST<any>(params);
    }

    // 请求宿舍列表
    queryRoomList(code: string): Observable<any> {
        const params = {
            Router: '/api/dormitorysafecheck/getroomdropdownlist',
            Method: 'POST',
            Body: {
                dormitory: code
            }
        };
        return this.httpService.POST<any>(params);
    }

    // 停用关键词
    deleteKeyWods(type: string, key: string): Observable<any> {
        const params = {
            Router: '/api/dormitorysafecheck/deletekey',
            Method: 'POST',
            Body: {
                type: type,
                key: key
            }
        };
        return this.httpService.POST<any>(params);
    }

    // 复用关键词
    relivekKeyWods(type: string, key: string): Observable<any> {
        const params = {
            Router: '/api/dormitorysafecheck/relivekey',
            Method: 'POST',
            Body: {
                type: type,
                key: key
            }
        };
        return this.httpService.POST<any>(params);
    }

    // 违纪关键词列表
    queryViolationList(): Observable<any> {
        const params = {
            Router: '/api/dormitorysafecheck/getdisciplinedropdownlist',
            Method: 'GET',
            Body: {}
        };
        return this.httpService.POST<any>(params);
    }

    // 没收关键词列表
    queryAwayList(): Observable<any> {
        const params = {
            Router: '/api/dormitorysafecheck/getcontrabanddropdownList',
            Method: 'GET',
            Body: {}
        };
        return this.httpService.POST<any>(params);
    }

    // 添加违纪关键词接口 room 宿舍违纪 area 公共区域 "1" 常用 "2" 临时
    addWeiJiWords(keywords: string, hot: string): Observable<any> {
        const params = {
            Router: '/api/dormitorysafecheck/postdisciplinelist',
            Method: 'POST',
            Body: {
                keywords: keywords,
                hot: hot,
            }
        };
        return this.httpService.POST<any>(params);
    }

    // 添加没收物品关键词接口 room 宿舍违纪 area 公共区域 "1" 常用 "2" 临时
    addWuPinWords(keywords: string, hot: string): Observable<any> {
        const params = {
            Router: '/api/dormitorysafecheck/postcontrabandlist',
            Method: 'POST',
            Body: {
                keywords: keywords,
                hot: hot
            }
        };
        return this.httpService.POST<any>(params);
    }

    // 删除违纪记录
    deleteUnSafe(type: string, record: string): Observable<any> {
        const params = {
            Router: '/api/dormitorysafecheck/deleteSaferecord',
            Method: 'POST',
            Body: {
                type: type,
                record: record
            }
        };
        return this.httpService.POST<any>(params);
    }

    // 附件查看
    queryAnnexList(type: string, record: string): Observable<any> {
        const params = {
            Router: '/api/dormitorysafecheck/getimagespathlist',
            Method: 'POST',
            Body: {
                type: type,
                record: record
            }
        };
        return this.httpService.POST<any>(params);
    }
}