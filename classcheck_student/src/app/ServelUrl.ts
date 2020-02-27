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
    studentcourselist:'/api/attendancestudent/studentcourselist', //获取课程列表
    studentstulist:'/api/attendancestudent/studentstulist', //获取点名前花名册|StuList|recordID|
    studentstulisthis:'/api/attendancestudent/studentstulisthis', //获取点名后花名册|StuListHis|recordID|
    studentsavestulist:'/api/attendancestudent/studentsavestulist', //保存花名册|SaveStuList|recordID+attendancestudent+data|
    studentAttList:'/api/attendancestudent/studentAttList', //获取本学期点名日期列表

    studentcourselisthis:'/api/attendancestudent/studentcourselisthis', //获取历史点名列表
    addattencerecord:'/api/attendancestudent/addattencerecord', //添加考勤记录

    getInteluserCode:'/api/ReportRepair/UserPhone', //获取用户ID

    


    
    
    
    




  }
}
