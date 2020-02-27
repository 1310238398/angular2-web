/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
  static leavePrefix = '/api/leaveflow';
  static Url = {
    apiUrl: '/api/staff/interface',
    fileUrl: '/api/staff/file',
    UserIcon: '/api/apiofbasic/queryusericon',
    getUpToken:'/api/fproof/appget',

    schoolcalendarnowyearterm:'/api/system/schoolcalendarnowyearterm', //获取当前学年学期周次(已有)
    courselist:'/api/attendance/courselist', //获取课程列表
    stulist:'/api/attendance/stulist', //获取点名前花名册|StuList|recordID|
    stulisthis:'/api/attendance/stulisthis', //获取点名后花名册|StuListHis|recordID|
    savestulist:'/api/attendance/savestulist', //保存花名册|SaveStuList|recordID+attendance+data|
    AttList:'/api/attendance/AttList', //获取本学期点名日期列表

    courselisthis:'/api/attendance/courselisthis', //获取历史点名列表
    
    queryleaverole: ServelUrl.leavePrefix + '/queryleaverole',//获取身份
    

    studentcourselist:'/api/attendancestudent/studentcourselist', //获取课程列表
    studentstulist:'/api/attendancestudent/studentstulist', //获取点名前花名册|StuList|recordID|
    studentstulisthis:'/api/attendancestudent/studentstulisthis', //获取点名后花名册|StuListHis|recordID|
    studentsavestulist:'/api/attendancestudent/studentsavestulist', //保存花名册|SaveStuList|recordID+attendancestudent+data|
    studentAttList:'/api/attendancestudent/studentAttList', //获取本学期点名日期列表

    studentcourselisthis:'/api/attendancestudent/studentcourselisthis', //获取历史点名列表
    addattencerecord:'/api/attendancestudent/addattencerecord', //添加考勤记录

    getInteluserCode:'/api/ReportRepair/UserPhone', //获取用户ID

    getentrancelist:'/api/attendancestatistics/getentrancelist', //获取入口跳转接口
    getabsentsearchlist:'/api/attendancestatistics/getabsentsearchlist', //缺勤查询数据接口
    getabsentrecord:'/api/attendancestatistics/getabsentrecord', //获取缺勤日历接口
    getthissemesterattendancestatistics:'/api/attendancestatistics/getthissemesterattendancestatistics', //获取本学期学生考勤统计接口
    getspecificIndividualstudentstatistics:'/api/attendancestatistics/getspecificIndividualstudentstatistics', //获取学生详情接口


    getspecificstatisticaltimes:'/api/attendancestatistics/getspecificstatisticaltimes', //获取学生出勤统计接口

    






















    


  }
}
