
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
        getCampus: ServelUrl.apiPrefix + 'campuscascadeinit',
        getAcademy: ServelUrl.apiPrefix + 'academycascadeinit',
        getMajor: ServelUrl.apiPrefix + 'majorcascadeinit',
        getGrade: ServelUrl.apiPrefix + 'gradecascadeinit',
        getClass: ServelUrl.apiPrefix + 'classcascadeinit',
        getBizCode: ServelUrl.apiPrefix + 'parameterinit',
        getStaff: ServelUrl.apiPrefix + 'staffuserdownboxinit',
        getList: ServelUrl.apiPrefix + 'classquery',
        getStudentList: ServelUrl.studentPrefix + 'studusersquery',

        userpasswdreset: ServelUrl.studentPrefix + 'userpasswdreset',
        userdelete: ServelUrl.studentPrefix + 'userdelete',
        classupdate: ServelUrl.apiPrefix + 'classupdate',

        getOrg: ServelUrl.studentPrefix + 'queryorganizationchildnodeofstudentadjust',
        getHaveClassStudent: ServelUrl.studentPrefix + 'querypersonofstudentadjust',
        pushStudent: ServelUrl.studentPrefix + 'pushpersonofstudentadjust',
        pullStudent: ServelUrl.studentPrefix + 'pullpersonofstudentadjust',

        countList: ServelUrl.authPrefix + 'countlist',
        getAuthdetail: ServelUrl.authPrefix + 'unauthdetail',
        exportunauthdetail: ServelUrl.authPrefix + 'exportunauthdetail',

        getStaffList: ServelUrl.staffPrefix + 'staffusersquery',
        getdepartment: ServelUrl.staffPrefix + 'departmentinit',
        getRole: ServelUrl.staffPrefix + 'roleinit',
        Useradd: ServelUrl.staffPrefix + 'useradd',
        Useredit: ServelUrl.staffPrefix + 'useredit',
        staffdelete: ServelUrl.staffPrefix + 'userdelete',

        //=======================================================文件上传
        upfileList: '/pc/fileupload/list', //文件上传列表
        upfileMen: '/pc/fileupload/member', //文件上传接收人
        upfileAdd: '/pc/fileupload/add', //文件上传保存
        upfileSchool: '/pc/fileupload/university', //获取学校列表
        upfileInfo: '/pc/fileupload/initinfo',     //获取发送人的学校 姓名


        leaveList: ServelUrl.leavePrefix + 'pcquerystudentleaveapplication',
        export: ServelUrl.leavePrefix + 'querystudentleaveapplicationtabe',

        // 调查问卷
        // 验证用户是否为集结号认证有效的老师 待做
        checkUser: ServelUrl.pcSurvey + 'checkuser',
        // 获取用户学校
        getUniversity: ServelUrl.pcSurvey + 'university',
        // 首页
        // getquestionnaire: ServelUrl.pcSurvey + 'querybatch',
        // getquestionnaaires: ServelUrl.pcSurvey + 'querys',
        getquestionnaaires: ServelUrl.pcSurvey + 'querybatch',
        // 进行中或已完成预览问卷  待做
        getQuestionnaireDetail: ServelUrl.pcSurvey + 'queryone',
        // 发布 待做
        publishQustionnaire: ServelUrl.pcSurvey + 'publish',
        // 修改
        modifyOne: ServelUrl.pcSurvey + 'save',
        // 分析
        getQuestionnaireAnalysis: ServelUrl.pcSurvey + 'analysis',
        // 未答题人员名单
        getNoDoList: ServelUrl.pcSurvey + 'nodo',

        // 校区
        getCampusList: ServelUrl.PCDropDownList + 'querycampuslist',
        // 学院
        getAcademyList: ServelUrl.PCDropDownList + 'querysyncdepartmentacademy',
        // 专业
        getMajorList: ServelUrl.PCDropDownList + 'querysyncdepartmentmajor',
        // 年级
        getGradeList: ServelUrl.PCDropDownList + 'querysyncdepartmentgrade',
        // 班级
        getClassList: ServelUrl.PCDropDownList + 'querysyncdepartmentclass',
        // 简答题明细
        getDetailes: ServelUrl.pcSurvey + 'text',
        // 导出未答题人员
        exportNoDoList: ServelUrl.pcSurvey + 'export/nodo',
        // 导出简答题
        exportJiandatiList: ServelUrl.pcSurvey + 'export/text',
        // 导出明细
        exportAllDetails: ServelUrl.pcSurvey + 'export/detail',
        // 查询学院未答题人员
        getAcademyNodoList: ServelUrl.pcSurvey + 'academy/nodo',
        //更改学生状态
        setStatus: '/api/pc/pstudent/savestatus',
        //学生列表
        getStudent: '/api/pc/pclass/querystudents',
        //移入
        pullStu: '/api/pc/pclass/pullstudent',
        //移出
        pushStu: '/api/pc/pclass/pushstudent',
        //班级列表
        getStudentClass: '/api/pc/pclass/queryname',

        // 离校清退
        // 查询所有
        queryAll: '/api/pc/graduation/query',
        // 清退
        doleave: '/api/pc/graduation/doleave',
        /*
        * 调查问卷管理
        * */
        wenjuanQuerypage: '/api/questionnaire/querypage',
        wenjuanImport: '/api/questionnaire/import',
        wenjuanDelete: '/api/questionnaire/del',
        wenjuanSave: '/api/questionnaire/save',


        // 公寓检查
        schoolCampus: '/web/system/department/campuscascadeinit',
        taskList: ServelUrl.dormitoryCheck + 'tasklist',  //任务列表
        closeTask: ServelUrl.dormitoryCheck + 'taskclose',    //关闭任务
        parameterinit: '/api/system/parameter/parameterinit',   //获取检查类型
        schoolcalendarweeks: '/api/system/schoolcalendarweeks',    //获取周次信息
        nowyearterm: '/api/system/schoolcalendarnowyearterm',   //当前学期
        saveTask: ServelUrl.dormitoryCheck + 'save',       //保存创建任务
        list: ServelUrl.dormitoryCheck + 'list',  //查询宿舍分配列表
        campusList: 'api/system/parameter/campusquery',   //校区列表
        previewPageTitle: ServelUrl.dormitoryCheck + 'one',   //
        checkerList: ServelUrl.dormitoryCheck + 'checkerlist',    //检查人列表
        distribute: ServelUrl.dormitoryCheck + 'distribute',          //分配
        pdoing: ServelUrl.dormitoryCheck + 'pdoing',    //按人员查看进度
        ddoing: ServelUrl.dormitoryCheck + 'ddoing',    //按宿舍查看进度
        dormdetail: ServelUrl.dormitoryCheck + 'dundetail',   //按宿舍查看未完成详情
        peopledetail: ServelUrl.dormitoryCheck + 'pundetail',     //按人员查看未完成详情
        resultlist: ServelUrl.dormitoryCheck + 'resultlist',       //查看结果
        exportList: ServelUrl.dormitoryCheck + 'resultexport',       //导出结果

        resultCampus: ServelUrl.dormitoryCheck + 'campus',     //结果页校区
        resultDorm: ServelUrl.dormitoryCheck + 'dorm',     //结果页宿舍楼
        resultRoom: ServelUrl.dormitoryCheck + 'room',      //结果页宿舍
        resultdetail: ServelUrl.dormitoryCheck + 'resultdetail',  //分值明细表
        resultattach: ServelUrl.dormitoryCheck + 'resultattach',   //查看附件
        todo: ServelUrl.dormitoryCheck + 'todo',
        // '/api/dormitorychecktask/dundetail'
        /*============================================宿舍数据查询============================================================*/
        GetCampusList: ServelUrl.dormitoryData + 'GetCampusList',        //获取校区
        GetDistrictList: ServelUrl.dormitoryData + 'GetDistrictList',       //根据校区获取园区接口
        GetDormitoryList: ServelUrl.dormitoryData + 'GetDormitoryList',     //根据园区获取宿舍楼号接口
        GetUnitList: ServelUrl.dormitoryData + 'GetUnitList',               //根据宿舍楼号获取单元接口
        GetRoomList: ServelUrl.dormitoryData + 'GetRoomList',
        GetAcademyList: ServelUrl.dormitoryData + 'GetAcademyList',         //获取学院数据接口
        GetMajorList: ServelUrl.dormitoryData + 'GetMajorList',              //获取具体学院下的所属专业接口
        // GetMajorAllList: ServelUrl.dormitoryData + 'GetMajorAllList',        //获取所有专业
        GetClassList: ServelUrl.dormitoryData + 'GetClassList',               //获取具体专业下的所属班级
        // GetClassAllList: ServelUrl.dormitoryData + 'GetClassAllList',          //获取所有班级接口
        GetGradeList: ServelUrl.dormitoryData + 'GetGradeList',               //获取所有年级接口
        GetNationalityList: ServelUrl.dormitoryData + 'GetNationalityList',    //获取所有民族接口
        GetSexList: ServelUrl.dormitoryData + 'GetSexList',                    //获取性别接口
        GetPoliticalList: ServelUrl.dormitoryData + 'GetPoliticalList',         //获取政治面貌接口
        GetProvinceList: ServelUrl.dormitoryData + 'GetProvinceList',           //获取省份
        GetCityList: ServelUrl.dormitoryData + 'GetCityList',                 //根据具体省份获取所属城市接口
        GetCountyList: ServelUrl.dormitoryData + 'GetCountyList',             //根据具体城市获取所属县级城市接口
        GetSearch: ServelUrl.dormitoryData + 'GetSearch',                    //查询数据
        GetDormitoryMembers: ServelUrl.dormitoryData + 'GetDormitoryMembers',  //查询宿舍成员

        /*============================================宿舍分配============================================================*/
        GetUndistributedStudentData: ServelUrl.dormitorydistribution + 'GetUndistributedStudentData',  //获取学生待分配数据
        GetStudentCampusData: ServelUrl.dormitorydistribution + 'GetStudentCampusData',  //获取校区数据
        GetStudentGradeData: ServelUrl.dormitorydistribution + 'GetStudentGradeData',  //获取校区数据
        GetEmptyDistrictBedDorm: ServelUrl.dormitorydistribution + 'GetEmptyDistrictBedDorm',  //获取未分配学生入住的空床位(获取校区下的各园区的空床位数)
        GetEmptyChildBedDorm: ServelUrl.dormitorydistribution + 'GetEmptyChildBedDorm',  //获取未分配学生入住的空床位（获取具体children下的空床位数)
        GetStudentRoomBeforeAllocation: ServelUrl.dormitorydistribution + 'GetStudentRoomBeforeAllocation',  //获取分配前班级和宿舍对应数据接口
        GetStudentRoomRealAllocation: ServelUrl.dormitorydistribution + 'GetStudentRoomRealAllocation',  //获取分配班级和宿舍对应数据接口


        /*==============================================宿舍清退===================================================*/
        GetStudentAcademyData: ServelUrl.dormitoryretreat + 'GetStudentAcademyData',  //获取学院数据
        GetStudentMajorData: ServelUrl.dormitoryretreat + 'GetStudentMajorData',  //获取学院数据
        GetRoomRetreatData: ServelUrl.dormitoryretreat + 'GetRoomRetreatData',  //获取宿舍清退数据
        GetRealRoomRetreatResult: ServelUrl.dormitoryretreat + 'GetRealRoomRetreatResult',  //获取宿舍清退数据

        /*==============================================宿舍调整===================================================*/
        GetCampusData: ServelUrl.dormitoryadjust + 'GetCampusData',  //获取校区数据
        GetDistrictData: ServelUrl.dormitoryadjust + 'GetDistrictData',  //获取园区数据
        GetDormitoryData: ServelUrl.dormitoryadjust + 'GetDormitoryData',  //获取宿舍楼数据
        GetDormitoryAdjustRoomData: ServelUrl.dormitoryadjust + 'GetDormitoryAdjustRoomData',  //获取宿舍数据
        GetOneAdjustRoomData: ServelUrl.dormitoryadjust + 'GetOneAdjustRoomData',  //获取具体宿舍数据
        UnDistributionData: ServelUrl.dormitoryadjust + 'UnDistributionData',  //获取未分配宿舍的学生数据
        GetPullStuRoomResult: ServelUrl.dormitoryadjust + 'GetPullStuRoomResult',  //移入分配学生
        GetPushStuRoomResult: ServelUrl.dormitoryadjust + 'GetPushStuRoomResult',  //移出已分配学生
        // GetRealRoomRetreatResult: ServelUrl.dormitoryadjust + 'GetRealRoomRetreatResult',  //获取宿舍清退数据



        /*==============================================贫困生===================================================*/
        poolquery: '/api/poorstudent/querypage2',
        poolGetOne: '/api/poorstudent/one',
        poolAttach: "/api/poorstudent/queryattach",
        poolExport: '/api/poorstudent/exportall',
        //查询贫困生问卷答题结果数据
        poolTopic: "/api/poorstudent/querytopic",
        //查询贫困生问卷答题结果附件数据
        queryTopicAttach: '/api/poorstudent/querytopicattach',


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
        syn: '/api/poorstudent/syn',  //同步到认定
        waitresultlist: '/api/poorstudent/resultlist', //待认定-辅导员界面-结果查看
        taskyear: '/api/poorstudent/taskyear', //查询任务年份
        usertype: '/api/poorstudent/usertype', //查询当前角色
        counselorconfirmother: '/api/poorstudent/counselorconfirmother',  //辅导员认定没有资料的学生

        /*==============================================辅导员日志===================================================*/

        counsellorLogList:'/api/counsellormanage/counsellorLogList', //辅导员获取日志列表
        schoolcalendarnowyearterm: '/api/system/schoolcalendarnowyearterm',   //获取当前学年学期周次
        counsellorlogsave: '/api/counsellormanage/counsellorlogsave',   //保存创建的日志
        counsellorlogcontent: '/api/counsellormanage/counsellorlogcontent',   //获取日志内容
        publishlog: '/api/counsellormanage/publishlog',   //发布日志内容
        deletelog: '/api/counsellormanage/deletelog',   //删除日志
        savechangelog: '/api/counsellormanage/savechangelog',   //保存日志

        counsellorselectall: '/api/counsellormanage/counsellorselectall',   //获取辅导员班主任
        leadershipsearch: '/api/counsellormanage/leadershipsearch',   //学院分管领导查询
        counsellorselectyearterm: '/api/counsellormanage/counsellorselectyearterm',   //获取所有学年学期
        nowweektime: '/api/counsellormanage/nowweektime',   //学年学期所有周次
        searchloglist: '/api/counsellormanage/searchloglist',   //学院分管领导查询日志列表
        getacademyother: '/api/counsellormanage/getacademyother',   //根绝角色获取学院
        saveattach:'/api/system/saveattach', //对于每个上传的保存(公共接口)








        infolist: '/pc/infobatch', //批量资讯查询
        infodelete: '/pc/infodel', //资讯删除
        infosave: '/pc/infonew', //资讯保存
        infomodify: '/pc/infomodify', //资讯修改
        infoone: '/pc/infoone', //资讯精确查询
        infopublish: '/pc/infopub', //资讯精确查询
        infostatistic: '/pc/infostatistic', //资讯精确查询
        queryuniversity: '/pc/survey/university', // 当前用户所在学校
        querycampus: '/app/querycampuslist', // 校区
        queryacademy: '/app/querysyncdepartmentacademy', // 学院
        querymajor: '/app/querysyncdepartmentmajor', // 专业
        querygrade: '/app/querysyncdepartmentgrade', // 年级
        queryclass: '/app/querysyncdepartmentclass', // 班级


        noticelist: '/pc/noticequerybatch',
        noticedelete: '/pc/noticedelete',
        noticesave: '/pc/noticenew',
        noticemodify: '/pc/noticemodify',
        noticeone: '/pc/noticequeryone',
        noticepublish: '/pc/noticepublish',

        activitylist: '/pc/activityquerybatch', 
        activityclose: 'pc/activityclose',
        activitydelete: '/pc/activitydelete',
        activitysave: '/pc/activitinit',
        activityaudit: '/pc/activityexamine',
        activityone: '/pc/activityqueryone',
        /*-------------------------------功能配置----------------------------*/
        getFuns: '/pc/compusfunc/query',
        getRolesByFid: '/api/pc/campusfunc/getroles',
        getStaffByFid: '/pc/compusfunc/queryfiduser',
        getFunRoles: '/api/pc/campusfunc/roles',
        querystaff: '/pc/compusfunc/querystaff',
        delStaff: "/pc/compusfunc/deluser",
        addFuncUser: "/pc/compusfunc/adduser",
        addFuncRole: '/api/pc/campusfunc/setroles',
        getFunGrades: '/api/system/allgrade',
        getFidFunGrades: '/pc/compusfunc/queryfidgrade',
        addFunGrade: '/pc/compusfunc/addgrade',
        delFunGrade: '/pc/compusfunc/delgrade',




    }







}
