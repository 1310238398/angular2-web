import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

export class ResponseData<T> {
    Data: T;
    FeedbackCode: number;
    FeedbackText: string;
}

@Injectable()
export class StaffService {
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

    // 工作单位查询
    queryDepartmentInit(): Promise<ResponseData<any>> {
        this.param.Router = '/api/staffmanage/departmentinit';
        this.param.Method = 'POST';
        this.param.Body = {};
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

    // 学工查询
    queryStaff(name: string, department: string, start: number, limit: number): Promise<any> {
        this.param.Router = '/api/staffmanage/staffusersquery';
        this.param.Method = 'POST';
        this.param.Body = {
            params: {
                Name: name,
                Department: department,
            },
            start: start,
            limit: limit
        };
        return this.httpServise.postJSON<any>(this.param);
    }

    // 重置密码
    resetStaffPassWord(usercode: string): Promise<ResponseData<any>> {
        this.param.Router = '/api/staffmanage/userpasswdreset';
        this.param.Method = 'POST';
        this.param.Body = {
            IntelUserCode: usercode
        };
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

}