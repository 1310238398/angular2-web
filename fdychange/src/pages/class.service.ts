import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

export class ResponseData<T> {
    Data: T;
    FeedbackCode: number;
    FeedbackText: string;
}

@Injectable()
export class ClassService {
    param = {
        Router: '',
        Method: 'POST',
        Body: {}
    };
    constructor(private httpServise: HttpService) { }

    // 获取班级
    queryStaffClass(): Promise<ResponseData<any>> {
        this.param.Router = '/api/classzone/staffqueryclass';
        this.param.Method = 'POST';
        this.param.Body = {};
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }


    // 设置01撤销班主任 02撤销辅导员 11设置班主任 12设置辅导员
    setClassRole(classCode: string, role: string): Promise<ResponseData<any>> {
        this.param.Router = '/api/classzone/setmeas';
        this.param.Method = 'POST';
        this.param.Body = {
            ClassCode: classCode,
            Role: role
        };
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

    // 同步群组
    syncClassGroup() {
        this.param.Router = '/app/classzone/syncclassgroup';
        this.param.Method = 'POST';
        this.param.Body = {};
        return this.httpServise.postJSON<ResponseData<any>>(this.param,'/api/appsrv/interface');
    }

}