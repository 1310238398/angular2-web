export class ServelUrl {
    static leavePrefix = '/api/leaveapplication';
    static Url = {
        getUpToken: '/api/fproof/appget', //获取七牛上传凭证
        saveAttach: '/api/system/saveattach', //公共的文件上传
        apiUrl: '/api/staff/interface',
        fileUrl: '/api/staff/file',
        apiFlowUrl: '/api/flow/interface', // 工作流服务

        launch: '/api/v1/flows/launch',  //发起流程
        flowshandle: '/api/v1/flows/handle/page', // 已处理流程
        flowshistory: '/api/v1/flows/history', // 流程历史数据
        flowtodo: '/api/v1/flows/todo/page', // 查询流程待办列表
        starthandle: '/api/v1/flows/handle', // 处理流程

        flowflows: '/api/v1/flows', // 查询流程列表数据
        flowslaunch: '/api/v1/flows/launch/page',  // 查询我发起的流程实例分页数据

        getusertype: '/api/classzone/getusertype',      //获取用户类型url
        queryclassusers: '/api/classzone/queryclassusers',  //查询班级名单
        bizcode: '/api/system/bizcode',  //获取状态字典值
        upstatussort: '/api/classzone/upstatussort',  //修改学生状态

        GetRewardProgramList:'/api/applyApproval/GetRewardProgramList', //获取获奖项目







    }
}
