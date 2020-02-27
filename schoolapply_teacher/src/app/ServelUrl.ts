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

        GetStaffInfo: '/api/ApplyApproval/GetStaffInfo', //获取老师信息
        RewardLevelList: '/api/ApplyApproval/RewardLevelList', //获取奖励级别
        RewardGradeList: '/api/ApplyApproval/RewardGradeList', //获取奖励等次
        GetUserAttachmentURL: '/api/secondclassroom/GetUserAttachmentURL', //获取图片URL和缩略图URL

        GetStudentInfo: '/api/ApplyApproval/GetStudentInfo', //获取学生信息
        GetIntelUser: '/api/applyapproval/GetIntelUser', //获取当前登录用户code接口

        GetRewardProgramList: '/api/applyApproval/GetRewardProgramList', //获取获奖项目
        GetRankList: '/api/applyApproval/GetRankList', //获取名次级别接口
        GetLevelList: '/api/applyApproval/GetLevelList', //获取获奖级别接口 国家级 省级

        getsign: '/api/poorstudent/getsign', //获取贫困生签名图片
        saveattach: '/api/system/saveattach', //对于每个上传的保存(公共接口)

        getsignByRecordID: '/api/poorstudent/getsignByRecordID', //获取签名图片以及时间

        usertype: '/api/poorstudent/usertype', //获取用户类型

        GetAvatarAddress: '/api/newstudentinfo/GetAvatarAddress', //获取头像地址接口
        bankyquery: '/api/yxinfofill/getbizname', //获取称谓


        addpartwork: '/api/qingongzhuxue/InsertPartWork',
        updatepartwork: '/api/qingongzhuxue/UpdatePartWork',
        partworkinfolist: '/api/qingongzhuxue/PartWorkInfoList',
        partworknamecode: '/api/qingongzhuxue/PartWorkNameCode',
        indexpartworkinfo: '/api/qingongzhuxue/IndexPartWorkInfo',
        indexpartworkstudentinfo: '/api/qingongzhuxue/IndexPartWorkStudentInfo',
        studentpartworkinfolist: '/api/qingongzhuxue/StudentPartJobWorkInfoList',
        deletestudentpartwork: '/api/qingongzhuxue/DeleteStudentPartJobWork',
        deletepartwork: '/api/qingongzhuxue/DeletePartWork',
        allchangepart: '/api/qingongzhuxue/AllUpdateStudentPartJobWork',
        alltuipart: '/api/qingongzhuxue/AllTuiStudentPartJobWork',
        onechangepart: '/api/qingongzhuxue/OneUpdateStudentPartJobWork',
        doublechangepart: '/api/qingongzhuxue/DoubleUpdateStudentPartJobWork',
        zaigangtiaopart: '/api/qingongzhuxue/TiaoStudentPartJobWork',
        changewage: '/api/qingongzhuxue/StudentPartJobWorkWage',
        schoolcalendarnowyearterm: '/api/system/schoolcalendarnowyearterm',
        getclass: '/api/StudentChangeClass/GetClassBystu',     //获取学生专业班级学院信息
        getcounselor: '/api/system/classadvisercounselor',     //获取学生专业班级学院信息
        pushtodo: '/api/qingongzhuxue/PushTodo',
        getsecondclasstype: '/api/secondclassroom/Getsecondclasstype',     //获取第二课堂子项目
        getmainpj: '/api/secondclassroom/GetMainPj',     //获取第二课堂主项目
        getsubpj: '/api/secondclassroom/GetSubPj',     //获取第二课堂子项目
        getsubjibie: '/api/secondclassroom/GetSubJiBie',     //获取第二课堂子项目
        scorecheck: '/api/secondclassroom/ScoreCheck',     //获取第二课堂子项目
        getBizInfo: '/api/secondclassroom/GetBizInfo',     //获取第二课堂子项目
        getcustomscore: '/api/secondclassroom/GetCustomScore',     //获取第二课堂子项目
        SecondClassSchoolCheck: '/api/secondclassroom/SecondClassSchoolCheck',     //获取第二课堂子项目














    }
}
