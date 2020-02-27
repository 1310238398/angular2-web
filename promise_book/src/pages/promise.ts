export class QueryResult<T> {
    RE: number;
    Text: string;
    Data: T
}
export class PromiseBook {
    CommitmentID: string;
    Title: string; // 标题
    Content: string; // 内容(最大50个字符)
    WrittenTime: string; // 成文日期
    Members: Member[]; // 签署人员数据
    Status: number;
    IsCreater: number; //是否是创建者(0否 1是)
    CreateTime: string;
    constructor() {
       
    }
}
export class PromiseBookMy {
    CommitmentID: string; // 承诺书ID
    Title: string; // 标题
    Content: string; // 内容(最大50个字符)
    CreateTime: string; // 创建日期
    Status: number; // 签署状态（0待签署 1未签署 2已签署）
    SignTime: string; //签署时间
    SignLink: string; //签名图片链接
    WrittenTime:string;
}
export class Member {
    Type: number; // 类型（0用户 1群组）
    BuID: string; // 业务ID
    Source: number;
    SourceBuID: string;
    UserCount: number;
    Name: string;
    IsAuth: number;
}

export class SignCount {
    TotalCount: number; // 总人数
    SignCount: number; // 签署人数
    IsCounselor: number; // 是否是辅导员(0否 1是)
}

export class SignResult {
    DeptID: string; // 部门ID
    DeptName: string; // 部门名称
    SignCount: number;// 签署人数
    TotalCount: number;
}

export class ClassResult {
    UserID: string; //	用户ID
    Name: string; //	显示名称(群名片 > 备注 > 昵称)
    IsAuth: number; //	是否是认证用户（0否，1是）
    Status: number; // 	签署状态(0未签署 1已签署)
}

export class SignResultMembers {
    Type: number; //类型（0用户 1群组）
    BuID: string; //业务ID
    Name: string; //显示名称
    IsAuth: number; //是否是认证用户（0否，1是）
    TotalCount: number; //总人数(类型为群组时使用)
    SignCount: number; //签署人数(类型为群组时使用)
    Status: number; //签署状态(0未签署 1已签署)
}

export class Tpl {
    TplID: string;
    Title: string;
    Content: string;
}