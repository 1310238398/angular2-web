
/**
 * Created by hanzhendong on 2017/11/13.
 */
export class ServelUrl {
    static apiPrefix = '/api/classinfo/';
    static studentPrefix = '/api/student/';
    static authPrefix = '/api/authcount/';
    static staffPrefix = '/api/staffmanage/';
    static leavePrefix = '/api/leaveapplication/';
    static pcSurvey = '/pc/survey/';
    static PCDropDownList = '/app/';
    static leaveSchool = '/api/pc/graduation/';
    static dormitoryCheck = '/api/dormitorychecktask/';
    static dormitorydistribution = '/api/pc/dormitorydistribution/';
    static dormitoryretreat = '/api/pc/dormitoryretreat/';
    static dormitoryadjust = '/api/pc/dormitoryadjust/';
    static dormitoryData = '/api/department/';
    static Url = {
        getUpToken: '/api/fproof/appget',
        fileUrl: '/api/staff/file',
        apiUrl: '/api/staff/interface',
        apiUrl1: '/api/appsrv/interface',
        apiFlowUrl: '/api/flow/interface', // 工作流服务

        launch: '/api/v1/flows/launch',  //发起流程
        flowshandle: '/api/v1/flows/handle/page', // 已处理流程
        flowshistory: '/api/v1/flows/history', // 流程历史数据
        flowtodo: '/api/v1/flows/todo/page', // 查询流程待办列表
        starthandle: '/api/v1/flows/handle', // 处理流程

        flowflows: '/api/v1/flows', // 查询流程列表数据
        flowslaunch:'/api/v1/flows/launch/page',  // 查询我发起的流程实例分页数据

        /*=================贫困生==================*/

        approvallist: '/api/poorstudent/approvallist',   //待审批-班级列表
        allgrade: '/api/system/allgrade',   //待审批-加载年级
        classingrade: '/api/system/classingrade',   //待审批-加载班级
        bizcode: '/api/system/bizcode',   //待审批-状态
        approvalone: '/api/poorstudent/approvalone',   //待审批-单个人
        approvaloneattach: '/api/poorstudent/approvaloneattach',   //待审批-查看申请所需资料
        approvalonequestionnaire: '/api/poorstudent/approvalonequestionnaire',   //待审批-查看问卷结果
        queryattach: '/api/questionnaire/queryattach',  //待审批-查看问卷结果的附件（已有）
        approvalonemodify: '/api/poorstudent/approvalonemodify',  //待审批-查看变更结果
        subapproval: '/api/poorstudent/subapproval',  //待审批- 审批提交

        CounselorAcadamyDoneStatus: '/api/poorstudent/CounselorAcadamyDoneStatus',  //获取当前老师和学院完成状态
        UpCounselorDoneStatus: '/api/poorstudent/UpCounselorDoneStatus',  //更改辅导员完成状态
        GetCounselorDoneStatus: '/api/poorstudent/GetCounselorDoneStatus',  //获取本学院所有辅导员完成状态

        confirmclasslist: '/api/poorstudent/confirmclasslist',  //待认定-辅导员界面-认定任务1
        confirmstudentlist: '/api/poorstudent/confirmstudentlist',  //待认定-辅导员界面-认定任务1-待认定学生
        eliberatelist: '/api/poorstudent/eliberatelist',  //待认定-辅导员界面-认定任务2-待评议学生
        notice: '/api/poorstudent/notice',  //新建/修改公示
        qnotice: '/api/poorstudent/qnotice',  //查询评议人员公告及名单
        counselorconfirm: '/api/poorstudent/counselorconfirm',  //辅导员认定提交
        counselorconfirmq: '/api/poorstudent/counselorconfirmq',  //辅导员认定查询
        groupquestionnariquery: '/api/poorstudent/groupquestionnariquery',  //小组评议多个题目查询
        groupquestionnarisub: '/api/poorstudent/groupquestionnarisub',  //小组评议多个题目提交
        eliberateone: '/api/poorstudent/eliberateone',  //待认定-辅导员界面-认定任务2-待评议具体学生
        task: '/api/poorstudent/task',   //新建认定任务
        tasklist: '/api/poorstudent/tasklist',   //新建认定任务列表
        taskone: '/api/poorstudent/taskone',  //查询单个认定任务
        uptask: '/api/poorstudent/uptask',  //修改认定任务 
        syn: '/api/poorstudent/syn',  //同步到认定
        waitresultlist: '/api/poorstudent/resultlist', //待认定-辅导员界面-结果查看
        taskyear: '/api/poorstudent/taskyear', //查询任务年份
        usertype: '/api/poorstudent/usertype', //查询当前角色
        counselorconfirmother: '/api/poorstudent/counselorconfirmother',  //辅导员认定没有资料的学生
        counselorconfirmMultiple: '/api/poorstudent/counselorconfirmMultiple', //批量认定为小组评议
        groupCommentLevel: '/api/poorstudent/groupCommentLevel', //评议等级

        ConfirmAcademyList: '/api/poorstudent/ConfirmAcademyList', //资助中心-各学院认定数据列表
        AcademyEliberateList: '/api/poorstudent/AcademyEliberateList', //资助中心界面-学生列表
        FundCenterApprovalOne: '/api/poorstudent/FundCenterApprovalOne', //资助中心审批直接认定/一票否定学生 
        FundCenterResultList: '/api/poorstudent/FundCenterResultList', //资助中心界面-结果查看 
        resultstatics: '/api/poorstudent/resultstatics', //资助中心-各班级统计比例 

        ApproveInfoDetail: '/api/poorstudent/ApproveInfoDetail', //获取学院数据统计 -- 辅导员提交
        exportidentifydata: '/api/poorstudent/exportidentifydata', //下载数据表格
        downloadexportidentifydata: '/api/poorstudent/downloadexportidentifydata', //下载数据表格
        finalexportidentifydata: '/api/poorstudent/finalexportidentifydata', //资助中心导出

        
        /*=================查询==================*/

        getaccess: '/api/pc/poorstudentsearch/getaccess', //获取访问权限
        getacademydropdownList: '/api/pc/poorstudentsearch/getacademydropdownList', //获取学院
        getmajordropdownlist: '/api/pc/poorstudentsearch/getmajordropdownlist', //获取专业
        getgradedropdownlist: '/api/pc/poorstudentsearch/getgradedropdownlist', //获取年级
        getclassdropdownlist: '/api/pc/poorstudentsearch/getclassdropdownlist', //获取班级
        getsexdropdownlist: '/api/pc/poorstudentsearch/getsexdropdownlist', //获取性别
        getnationaldropdownlist: '/api/pc/poorstudentsearch/getnationaldropdownlist', //获取民族
        getpoliticaldropdownlist: '/api/pc/poorstudentsearch/getpoliticaldropdownlist', //获取政治面貌
        getentrancedropdownlist: '/api/pc/poorstudentsearch/getentrancedropdownlist', //获取入学时间
        getgraduationdropdownlist: '/api/pc/poorstudentsearch/getgraduationdropdownlist', //获取毕业时间
        getprovincialdropdownlist: '/api/pc/poorstudentsearch/getprovincialdropdownlist', //获取省
        getcitydropdownlist: '/api/pc/poorstudentsearch/getcitydropdownlist', //获取市
        getcountydropdownlist: '/api/pc/poorstudentsearch/getcountydropdownlist', //获取区县
        getrecognitionleveldropdownlist: '/api/pc/poorstudentsearch/getrecognitionleveldropdownlist', //获取贫困等级
        getrecognitiontypedropdownlist: '/api/pc/poorstudentsearch/getrecognitiontypedropdownlist', //获取认证类型
        geteconomicconditionlist: '/api/pc/poorstudentsearch/geteconomicconditionlist', //获取经济情况列表
        getsearch: '/api/pc/poorstudentsearch/getsearch', //获取贫困生认定数据查询结果
        getsearchexportdata: '/api/pc/poorstudentsearch/getsearchexportdata', //导出

        // ======实时数据查询=======

        getruntimeacademydropdownList: '/api/pc/poorstudentsearch/getruntimeacademydropdownList', //获取实时学院
        getruntimemajordropdownList: '/api/pc/poorstudentsearch/getruntimemajordropdownList', //获取实时专业
        getruntimegradedropdownList: '/api/pc/poorstudentsearch/getruntimegradedropdownList', //获取实时年级
        getruntimeclassdropdownlist: '/api/pc/poorstudentsearch/getruntimeclassdropdownlist', //获取实时班级
        getruntimesexdropdownlist: '/api/pc/poorstudentsearch/getruntimesexdropdownlist', //获取实时性别
        getruntimenationaldropdownlist: '/api/pc/poorstudentsearch/getruntimenationaldropdownlist', //获取实时民族
        getruntimepoliticaldropdownlist: '/api/pc/poorstudentsearch/getruntimepoliticaldropdownlist', //获取实时政治面貌
        getruntimeentrancedropdownlist: '/api/pc/poorstudentsearch/getruntimeentrancedropdownlist', //获取实时入学时间
        getruntimegraduationdropdownlist: '/api/pc/poorstudentsearch/getruntimegraduationdropdownlist', //获取实时毕业时间
        getruntimeprovincialdropdownlist: '/api/pc/poorstudentsearch/getruntimeprovincialdropdownlist', //获取省
        getruntimecitydropdownList: '/api/pc/poorstudentsearch/getruntimecitydropdownList', //获取市
        getruntimecountydropdownList: '/api/pc/poorstudentsearch/getruntimecountydropdownList', //获取区县
        getruntimesearch: '/api/pc/poorstudentsearch/getruntimesearch', //获取贫困生认定数据查询结果
        getruntimesearchexportdata: '/api/pc/poorstudentsearch/getruntimesearchexportdata', //导出




























        

    }







}
