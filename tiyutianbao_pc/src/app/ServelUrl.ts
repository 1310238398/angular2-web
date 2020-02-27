
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


        //=======================================================社团情报
        addshetuan: '/api/shetuan/addshetuan',
        addunionsta: '/api/shetuan/addunionsta',
        getuniontype: '/api/shetuan/getuniontype',
        getdepart: '/api/shetuan/getdepart',
        getteacher: '/api/shetuan/getteacher',
        getshetaunlist: '/api/shetuan/shetuanlist',
        getstudentcode: '/api/shetuan/getstudentcode',
        shetuanslide: '/api/shetuan/shetuanslide',
        shetuanmember: '/api/shetuan/shetuanmember',
        getUnionrole: '/api/shetuan/getunionrole',
        updaterole: '/api/shetuan/updaterole',
        deleterole: '/api/shetuan/derole',
        getmember: '/api/shetuan/getmember',
        getmemberrole: '/api/shetuan/getmemberrole',
        addrole: '/api/shetuan/addrole',
        getallactivityinfo: '/api/shetuan/getallactivityinfo',
        getallunionname: '/api/shetuan/getallunionname',
        getactivityinfo: '/api/shetuan/getactivityinfo',
        updateshenpi: '/api/shetuan/updateactivitystatus',
        getteachername: '/api/shetuan/getstudentname',
        tupdateshenpi: '/api/shetuan/updateactivitytstatus',
        getunionendoneinfo: '/api/shetuan/getunionendoneinfo',     //获取当前活动
        getunionhonorinfo: '/api/shetuan/getunionhonorinfo',     //获取当前荣誉
        getshetuaninfo: '/api/shetuan/getshetuaninfo',     //获取当前活动
        mabiaolist: '/api/tiyutianbao/mabiaolist',     //获取码表
        updatemabiao: '/api/tiyutianbao/updatemabiao',     //更新码表
        demabiao: '/api/tiyutianbao/demabiao',     //删除码表
        addmabiao: '/api/tiyutianbao/addmabiao',     //添加码表
        humansociety: '/api/tiyutianbao/humansociety',     //获取人社厅表
        down: '/api/tiyutianbao/down',     //导出excel
        updatehumansociety: '/api/tiyutianbao/updatehumansociety',     //获取人社厅表













    }







}
