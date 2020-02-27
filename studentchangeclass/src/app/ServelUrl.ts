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
        flowslaunch: '/api/v1/flows/launch/page',  // 查询我发起的流程实例分页数据

        GetStaffInfo: '/api/ApplyApproval/GetStaffInfo', //获取老师信息
        RewardLevelList: '/api/ApplyApproval/RewardLevelList', //获取奖励级别
        RewardGradeList: '/api/ApplyApproval/RewardGradeList', //获取奖励等次
        GetUserAttachmentURL: '/api/ApplyApproval/GetUserAttachmentURL', //获取图片URL和缩略图URL

        GetStudentInfo: '/api/ApplyApproval/GetStudentInfo', //获取学生信息
        GetIntelUser: '/api/applyapproval/GetIntelUser', //获取当前登录用户code接口

        GetRewardProgramList: '/api/applyApproval/GetRewardProgramList', //获取获奖项目
        GetRankList: '/api/applyApproval/GetRankList', //获取名次级别接口
        GetLevelList: '/api/applyApproval/GetLevelList', //获取获奖级别接口 国家级 省级


        bankyquery: ServelUrl.apiPrefix + 'yxinfofill/getbizname', //获取称谓

        getformfieldlist: '/api/newstudentinfo/getformfieldlist', //获取该显示的表单字段接口
        getcreedlist: '/api/newstudentinfo/getcreedlist', //获取宗教信仰列表接口
        GetAvatarAddress: '/api/newstudentinfo/GetAvatarAddress', //获取头像地址接口

        getallshetaunlist: '/api/shetuan/phoneallshetuanlist', //获取所有社团列表
        getshetaunlist: '/api/shetuan/phoneshetuanlist', //获取自己社团列表
        addactivity: '/api/shetuan/addactivity', //添加活动
        getallactivityinfo: '/api/shetuan/getallactivityinfo', //查询社团活动
        updateactivity: '/api/shetuan/updateactivity',     //变更社团活动
        getactivityinfo: '/api/shetuan/getactivityinfo',     //获取当前活动
        getshetuaninfo: '/api/shetuan/getshetuaninfo',     //获取当前活动
        updateunionavatar: '/api/shetuan/updateunionavatar',     //变更社团活动
        updateactivityend: '/api/shetuan/updateactivityend',     //变更社团活动总结
        addshetuanhonor: '/api/shetuan/addshetuanhonor', //添加活动
        getunionhonorinfo: '/api/shetuan/getunionhonorinfo',     //获取当前荣誉
        getunionendinfo: '/api/shetuan/getunionendinfo',     //获取当前活动
        getunionendoneinfo: '/api/shetuan/getunionendoneinfo',     //获取当前活动
        addshetuanapply: '/api/shetuan/addshetuanapply', //添加社团申请
        getownapplyinfo: '/api/shetuan/getownapplyinfo',     //获取当前申请详情
        unionmemberlist: '/api/shetuan/unionmemberlist',     //获取当前社团所有成员
        unionmemberone: '/api/shetuan/unionmemberone',     //获取当前社团所有成员
        getapplyinfo: '/api/shetuan/getapplyinfo',     //获取社团申请列表
        updateshetuanapply: '/api/shetuan/updateshetuanapply',     //变更社团申请
        addshetuanmember: '/api/shetuan/addshetuanmember', //添加活动
        getoneapplyinfo: '/api/shetuan/getoneapplyinfo',     //获取特定人员申请详情
        getallactivityfabuinfo: '/api/shetuan/getallactivityfabuinfo', //查询社团活动
        getstudentname: '/api/shetuan/getstudentname',     //获取学生姓名
        getname: '/api/shetuan/getname',     //获取学生姓名
        getxiaoyuanuid: '/api/shetuan/GetXiaoYuanUID',     //获取学生姓名
        studentinfo: '/api/StudentChangeClass/StudentInfo',     //获取学生专业班级学院信息
        rolecheck: '/api/system/queryuserrole',     //判断登录者的身份
        getclassbyteacher: '/api/system/classlist',     //判断登录者的身份
        changeclass: '/api/StudentChangeClass/UpdateStuBasicInfo',     //根据学生code和班级code调班
        getclass: '/api/StudentChangeClass/GetClassBystu',     //获取学生专业班级学院信息
        recordsave: '/api/StudentChangeClass/InsertClassChangeLog',     //前页审批记录表保存
        recordlist: '/api/StudentChangeClass/ClassChangeLogList',     //前页审批记录表查询
        recordone: '/api/StudentChangeClass/ClassChangeLogOne',     //前页审批单条记录查询
        getclassnum: '/api/StudentChangeClass/GetClassStuNum',     //获取班级人数
        getintelusername: '/api/StudentChangeClass/GetIntelCodeAndName',     //获取班级人数
        getclassstuinfo: '/api/StudentChangeClass/GetClassStuInfo',     //获取班级人员详情
        pushstudent: '/api/StudentChangeClass/PushStudent',     //获取班级人员详情
        getintelcode: '/api/StudentChangeClass/GetIntelCode',     //获取用户intelusercode





































    }
}