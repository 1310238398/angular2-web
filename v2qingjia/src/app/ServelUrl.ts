/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
  static leavePrefix = '/api/leaveflow';
  static Url = {
    apiUrl: '/api/staff/interface',
    fileUrl: '/api/staff/file',
    UserIcon: '/api/apiofbasic/queryusericon',
    queryleaverole: ServelUrl.leavePrefix + '/queryleaverole',
    queryleavecount: ServelUrl.leavePrefix + '/queryleavecount',//请假数量
    checkremindleave: ServelUrl.leavePrefix + '/checkremindleave',//是否结束后铃铛
    QueryFakeLeaveCount: ServelUrl.leavePrefix + '/queryfakeleavecount',//销假数量
    queryleavetype: ServelUrl.leavePrefix + '/queryleavetype',
    queryleaveoutplace: ServelUrl.leavePrefix + '/queryleaveoutplace',
    studentleaveapplication: ServelUrl.leavePrefix + '/studentleaveapplication',
    studentreturnapplication: ServelUrl.leavePrefix + '/recallapply',//销假
    recallapply: ServelUrl.leavePrefix + '/recallapply',//销假(图片)
    queryleavestudentmessage: ServelUrl.leavePrefix + '/queryleavestudentmessage',
    StudentCancelApplication: ServelUrl.leavePrefix + '/studentcancelapplication',//取消申请
    studentcancelapply: ServelUrl.leavePrefix + '/studentcancelapply',//流程取消申请
    queryoneleavemessage: ServelUrl.leavePrefix + '/queryoneleavemessage',//根据record查询请假情况
    StaffNotApprovalHandleLeaveApplication: ServelUrl.leavePrefix + '/staffnotapprovalhandleleaveapplication',//不准假
    staffnoapply: ServelUrl.leavePrefix + '/staffnoapply',//流程不准假
    staffnorecall: ServelUrl.leavePrefix + '/staffnorecall',//销假不批准
    StaffApprovalHandleFakeLeaveApplication: ServelUrl.leavePrefix + '/staffapprovalhandlefakeleaveapplication',//批准销假
    staffagreerecall: ServelUrl.leavePrefix + '/staffagreerecall',//流程批准销假
    StaffApprovalHandleLeaveApplication: ServelUrl.leavePrefix + '/staffapprovalhandleleaveapplication',//批准请假
    StaffAgreeApply: ServelUrl.leavePrefix + '/staffagreeapply',//流程批准请假
    querystudentleaveapplication: ServelUrl.leavePrefix + '/querydoneflow',//学生个人请假情况
    querydoflow: ServelUrl.leavePrefix + '/querydoflow',//审批
    QueryLeaveApplicationPhoto: ServelUrl.leavePrefix + '/queryleaveapplicationphoto',//学生上传附件信息
    getSysParams: '/web/system/parameter/sysparameterauto',//取系统参数
    QueryCampusLocation: ServelUrl.leavePrefix + '/querycampuslocationbystudent',//取系统参数
    QueryUserTaskReasonAndLocation: ServelUrl.leavePrefix + '/queryusertaskreasonandlocation',//取系统参数
    queryapplyrefuse: ServelUrl.leavePrefix + '/queryapplyrefuse',//请假拒绝
    saveApply: ServelUrl.leavePrefix + '/apply',

    QuerySelfLeaveApplication: ServelUrl.leavePrefix + 'yellowpages/queryselfleaveapplication',
    getUpToken:'/api/fproof/appget',
    canApply:ServelUrl.leavePrefix+'/checksalesleave',
    onInfo:ServelUrl.leavePrefix+'/checksalesleave',//提醒销假
    getFlow:ServelUrl.leavePrefix+'/gettaskflow',//获取流程
  }
}
