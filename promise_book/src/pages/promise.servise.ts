import { Injectable } from '@angular/core';
import { HttpService } from './http/http.service';
import { QueryResult, PromiseBook, PromiseBookMy, Member, SignCount, SignResult, ClassResult, Tpl } from './promise';

@Injectable()
export class PromiseService {
    param = {
        Router: '',
        Method: 'POST',
        Body: {}
    };
    constructor(private httpServise: HttpService) { }

    // 分页查询承诺书列表
    queryPromisePage(querytype: number, count: number, commitmentid: string): Promise<QueryResult<PromiseBook[]>> {
        this.param.Router = '/app/commitment/batch';
        this.param.Body = {
            QueryType: querytype,
            Count: count,
            CommitmentID: commitmentid
        };
        return this.httpServise.postJSON<QueryResult<PromiseBook[]>>(this.param);
    }

    // 精确查询承诺书数据
    queryPromiseone(id: string): Promise<QueryResult<PromiseBook>> {
        this.param.Router = '/app/commitment/one';
        this.param.Body = {
            CommitmentID: id
        };
        return this.httpServise.postJSON<QueryResult<PromiseBook>>(this.param);
    }

    // 新增承诺书
    addPromise(body: PromiseBook): Promise<QueryResult<string>> {
        this.param.Router = '/app/commitment/add';
        this.param.Body = body;
        return this.httpServise.postJSON<QueryResult<string>>(this.param);
    }

    // 查询选择的参与人员的去重人数
    queryUserCount(data: any[]): Promise<QueryResult<any>> {
        this.param.Router = '/app/commitment/usercount';
        this.param.Body = {
            Datas: data
        };
        return this.httpServise.postJSON<QueryResult<any>>(this.param);
    }

    // 查询承诺书成员数据
    queryMember(id: string): Promise<any> {
        this.param.Router = '/app/commitment/member';
        this.param.Body = {
            CommitmentID: id
        };
        return this.httpServise.postJSON<any>(this.param);
    }

    // 编辑承诺书签署人员
    editMember(id: string, member: any): Promise<any> {
        this.param.Router = '/app/commitment/editmember';
        this.param.Body = {
            CommitmentID: id,
            Members: member
        };
        return this.httpServise.postJSON<any>(this.param);
    }

    // 发布承诺书
    publish(id: string): Promise<QueryResult<string>> {
        this.param.Router = '/app/commitment/publish';
        this.param.Body = {
            CommitmentID: id
        };
        return this.httpServise.postJSON<QueryResult<string>>(this.param);
    }

    // 结束承诺书
    recycle(id: string): Promise<any> {
        this.param.Router = '/app/commitment/recycle';
        this.param.Body = {
            CommitmentID: id
        };
        return this.httpServise.postJSON<any>(this.param);
    }

    // 查询承诺书签署数量
    signCount(id: string): Promise<QueryResult<SignCount>> {
        this.param.Router = '/app/commitment/signcount';
        this.param.Body = {
            CommitmentID: id
        };
        return this.httpServise.postJSON<QueryResult<SignCount>>(this.param);
    }

    // 查询辅导员的签署结果
    querySchWorkersResult(id: string): Promise<QueryResult<SignResult[]>> {
        this.param.Router = '/app/commitment/counselorresult';
        this.param.Body = {
            CommitmentID: id
        };
        return this.httpServise.postJSON<QueryResult<SignResult>>(this.param);
    }

    // 查询非辅导员的签署结果
    queryNoSchWorkersResult(id: string, queryType: number, deptID?: string): Promise<QueryResult<SignResult[]>> {
        this.param.Router = '/app/commitment/result';
        this.param.Body = {
            CommitmentID: id,
            QueryType: queryType
        };
        if (deptID) {
            this.param.Body = {
                CommitmentID: id,
                QueryType: queryType,
                DeptID: deptID
            };
        }

        return this.httpServise.postJSON<QueryResult<SignResult>>(this.param);
    }

    // 查询班级的签署结果
    queryClassResult(commitid: string, deptid: string, status: number): Promise<QueryResult<ClassResult[]>> {
        this.param.Router = '/app/commitment/classresult';
        this.param.Body = {
            CommitmentID: commitid,
            DeptID: deptid,
            Status: status
        };

        return this.httpServise.postJSON<QueryResult<ClassResult>>(this.param);
    }

    // 查询辅导员的未签署结果
    queryNoSignResult(commitid: string): Promise<QueryResult<ClassResult[]>> {
        this.param.Router = '/app/commitment/counselornonresult';
        this.param.Body = {
            CommitmentID: commitid
        };

        return this.httpServise.postJSON<QueryResult<ClassResult>>(this.param);
    }

    // 提醒用户签署承诺书
    remind(commitmentid: string, userid: string): Promise<QueryResult<any>> {
        this.param.Router = '/app/commitment/remind';
        this.param.Body = {
            CommitmentID: commitmentid,
            UserID: userid
        };
        return this.httpServise.postJSON<QueryResult<any>>(this.param);
    }

    // 导出承诺书
    export(commitmentid: string, userid: string): Promise<QueryResult<any>> {
        this.param.Router = '/app/commitment/export';
        this.param.Body = {
            CommitmentID: commitmentid,
            UserID: userid
        };
        return this.httpServise.postJSON<QueryResult<any>>(this.param);
    }

    // 查询我的承诺书
    queryPromiseMy(): Promise<QueryResult<PromiseBookMy[]>> {

        this.param.Router = '/app/commitment/my';
        this.param.Body = {
            
        };
        return this.httpServise.postJSON<QueryResult<PromiseBookMy[]>>(this.param);
    }

    // 查询用户的承诺书明细
    queryPromiseUserOne(commitid: string, userid?: string): Promise<QueryResult<PromiseBookMy>> {
        this.param.Router = '/app/commitment/userone';
        this.param.Body = {
            CommitmentID: commitid,
            UserID: userid || ''
        };
        return this.httpServise.postJSON<QueryResult<PromiseBookMy>>(this.param);
    }

    // 签署承诺书
    signature(id: string, sign: string): Promise<any> {
        this.param.Router = '/app/commitment/signature';
        this.param.Body = {
            CommitmentID: id,
            Signature: sign
        };
        return this.httpServise.postJSON<any>(this.param);
    }

    // 模板列表
    queryTplList(): Promise<QueryResult<Tpl[]>> {
        this.param.Router = "/app/commitment/tpllist";
        this.param.Body = null;
        return this.httpServise.postJSON<QueryResult<Tpl[]>>(this.param);
    }

    // 模板列表详情
    queryTplOne(id: string): Promise<QueryResult<Tpl>> {
        this.param.Router = "/app/commitment/tplone";
        this.param.Body = {
            TplID: id
        };
        return this.httpServise.postJSON<QueryResult<Tpl>>(this.param);
    }

}