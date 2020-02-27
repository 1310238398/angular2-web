import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

export class ResponseData<T> {
    Data: T;
    FeedbackCode: number;
    FeedbackText: string;
}

@Injectable()
export class CadreService {
    param = {
        Router: '',
        Method: 'POST',
        Body: {}
    };
    constructor(private httpServise: HttpService) { }

    // 获取班级名
    queryClassName(classCode: string): Promise<ResponseData<any>> {
        this.param.Router = '/api/classzone/getclassname';
        this.param.Method = 'POST';
        this.param.Body = {
            ClassCode: classCode
        };
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }
    // 获取班级干部及人员
    queryClassCadre(classCode: string): Promise<ResponseData<any>> {
        this.param.Router = '/api/classzone/getcadre';
        this.param.Method = 'POST';
        this.param.Body = {
            ClassCode: classCode
        };
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

    // 获取班级名单
    queryClassStudent(classCode: string): Promise<ResponseData<any>> {
        this.param.Router = '/api/classzone/queryclassusers';
        this.param.Method = 'POST';
        this.param.Body = {
            ClassCode: classCode
        };
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

    // 设置班干部
    setClassCadre(classCode: string, duty: string, uids: string): Promise<ResponseData<any>> {
        this.param.Router = '/api/classzone/setcadre';
        this.param.Method = 'POST';
        this.param.Body = {
            ClassCode: classCode,
            Duty: duty,
            Uids: uids
        };
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

}