export class ServelUrl {
    static leavePrefix = '/api/leaveapplication';
    static Url = {
        getUpToken: '/api/fproof/appget', //获取七牛上传凭证
        saveAttach: '/api/system/saveattach', //公共的文件上传
        apiUrl: '/api/staff/interface',
        fileUrl: '/api/staff/file',
        apiFlowUrl: '/api/flow/interface', // 工作流服务
        flowshandle: '/api/v1/flows/handle', // 处理流程
        flowshistory: '/api/v1/flows/history', // 流程历史数据
        UserIcon: '/api/apiofbasic/queryusericon',
        queryleaverole: ServelUrl.leavePrefix + '/queryleaverole',
        queryuserrole: '/api/reportrepair/userrolelist', // 获取当前登录用户角色
        queryuserphone: '/api/reportrepair/userphone', // 获取当前登录用户手机号
        queryrepairitem: '/api/reportrepair/itemlist', // 获取报修项目
        queryrepairarea: '/api/reportrepair/arealist', // 获取报修区域
        submitrepair: '/api/reportrepair/submit', // 提交报修任务
        queryrepairone: '/api/reportrepair/one', // 获取报修任务详情
        queryrepairquantity: '/api/reportrepair/statusquantity', // 获取各状态报修任务的数量
        querypersonneltasknumber: '/api/reportrepair/repairpersonneltasknumber', // 获取各维修人员任务数量
        queryrepairlist: '/api/reportrepair/list', // 获取报修任务列表
        receiverepair: '/api/reportrepair/receive', // 接单
        queryrepairperson: '/api/reportrepair/repairpersonnellist', // 获取维修人员列表
        repairdesignate: '/api/reportrepair/designate', // 派单
        repairnotneed: '/api/reportrepair/notneed', // 无需处理
        repairaccomplish: '/api/reportrepair/accomplish', // 维修完成
        repairrework: '/api/reportrepair/rework', // 返工
        repairaddremark: '/api/reportrepair/addremark', // 添加备注
        repairend: '/api/reportrepair/end', // 确认维修已完成
    }
}