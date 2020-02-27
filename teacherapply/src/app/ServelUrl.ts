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
    
    
    
    




  }
}
