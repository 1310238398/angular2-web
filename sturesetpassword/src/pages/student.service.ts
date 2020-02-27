import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

export class ResponseData<T> {
    Data: T;
    FeedbackCode: number;
    FeedbackText: string;
}

@Injectable()
export class StudentService {
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

    // 获取班级名单
    queryClassStudent(classCode: string): Promise<ResponseData<any>> {
        this.param.Router = '/api/classzone/queryclassusers';
        this.param.Method = 'POST';
        this.param.Body = {
            ClassCode: classCode
        };
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

    // 重置密码
    resetPassWord(usercode: string): Promise<ResponseData<any>> {
        this.param.Router = '/api/student/userpasswdreset';
        this.param.Method = 'POST';
        this.param.Body = {
            IntelUserCode: usercode
        };
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

}