export class ResponseData<T> {
    Data: T;
    FeedbackCode: number;
    FeedbackText: string;
}

export class SubRepair {
    AreaRecordId: string; // 报修区域的RecordId
    SpecificSite: string; // 具体地点
    Phone: string;
    ItemCode: string; // 报修项目代码, 多个用英文小写逗号隔开
    Caption: string; // 损坏情况具体说明
    DamageAttachs: string; // 损坏情况图片，传的是图片RecordId，多个RecordId用英文小写逗号分开
}

export class RepairDetail {
    RecordID: string; // 报修任务RecordId
    AvatarURL: string;
    StudentName: string; // 学生姓名
    UserCode: string; // 学号
    AcadamyName: string; // 学院名称
    StudentPhone: string; // 学生电话
    SerialNumber: string; // 报修单编号
    AreaName: string; // 	报修区域名称
    SpecificSite: string; // 	具体地点
    Item: any[] = []; // 报修项目信息
    Caption: string; // 损坏情况具体说明
    DamageAttachs: any[] = []; // 损坏情况图片信息
    RepairAttachs: any[] = []; // 维修情况图片信息
    RepairPersonnelName: string; // 维修人员姓名
    Status: string; // 状态, 10 表示待处理, 20 表示处理中, 21 表示正在返工中, 30 表示维修已完成, 31 表示无需处理, 40 表示已完成
    StatusData: any[] = []; // 状态数据
    Remark: any[] = [];
    NotneedExplanation: string; // 无需处理原因
}

export class RepairPage {
    Datas: any[];
    Total: string;
}

export class RepairPerson {
    IntelUserCode: string; // 维修人员id
    Name: string; // 维修人员姓名
    Selected: boolean;
}

export class RepairArea {
    RecordID: string; // 区域RecordID
    Name: string; // 区域名称
    IsDefault: string; // 是否为默认， 1 是， 2 不是
}

export class PersonalTaskNum {
    RepairPersonnelUID: string; // 维修人员的IntelUserCode
    UserName: string; // 维修人员名称
    TaskNumber: string; // 任务数量
    show: boolean; // 是否显示任务 
    workerTaskList: any[] = [];
}
