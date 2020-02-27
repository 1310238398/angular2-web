export class ServelUrl {
    static leavePrefix = '/api/leaveapplication';
    static apiPrefix = '/api/';
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
        flowslaunch:'/api/v1/flows/launch/page',  // 查询我发起的流程实例分页数据

        GetStaffInfo: '/api/ApplyApproval/GetStaffInfo', //获取老师信息
        RewardLevelList: '/api/ApplyApproval/RewardLevelList', //获取奖励级别
        RewardGradeList: '/api/ApplyApproval/RewardGradeList', //获取奖励等次
        GetUserAttachmentURL: '/api/ApplyApproval/GetUserAttachmentURL', //获取图片URL和缩略图URL

        GetStudentInfo:'/api/ApplyApproval/GetStudentInfo', //获取学生信息
        GetIntelUser:'/api/applyapproval/GetIntelUser', //获取当前登录用户code接口

        GetRewardProgramList:'/api/applyApproval/GetRewardProgramList', //获取获奖项目
        GetRankList:'/api/applyApproval/GetRankList', //获取名次级别接口
        GetLevelList:'/api/applyApproval/GetLevelList', //获取获奖级别接口 国家级 省级

        querycitytype: ServelUrl.apiPrefix + 'yxinfofill/geographyinit',//获取省市县
        bankyquery: ServelUrl.apiPrefix + 'yxinfofill/getbizname', //获取称谓

        getformfieldlist: '/api/newstudentinfo/getformfieldlist', //获取该显示的表单字段接口
        getcreedlist: '/api/newstudentinfo/getcreedlist', //获取宗教信仰列表接口
        GetAvatarAddress: '/api/newstudentinfo/GetAvatarAddress', //获取头像地址接口








    }
}