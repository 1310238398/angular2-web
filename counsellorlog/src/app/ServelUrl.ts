/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
  static leavePrefix = '/api/leaveflow';
  static Url = {
    apiUrl: '/api/staff/interface',
    fileUrl: '/api/staff/file',
    UserIcon: '/api/apiofbasic/queryusericon',
    getUpToken: '/api/fproof/appget',

    substatus: '/api/poorstudent/substatus', //学生进入页面加载内容

    getsign: '/api/poorstudent/getsign', //获取贫困生签名图片 
    saveattach: '/api/system/saveattach', //对于每个上传的保存(公共接口)
    queryup: '/api/poorstudent/queryup', //学生查询上传材料

    upattachcaption: '/api/poorstudent/upattachcaption', //添加/修改文件说明

    threesub: '/api/poorstudent/sub', //三项提交
    poorsaveattach: '/api/poorstudent/saveattach',  //总的保存材料

    GetModifyReason: '/api/poorstudent/GetModifyReason',  //获取学生申请修改原因
    SaveModifyReason: '/api/poorstudent/SaveModifyReason',  //保存学生申请修改原因

    DelModifyReason: '/api/poorstudent/DelModifyReason',  //清空学生申请修改原因

    /*==============================================辅导员日志===================================================*/

    counsellorLogList: '/api/counsellormanage/counsellorLogList', //辅导员获取日志列表
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
    bizcode: '/api/system/bizcode',   //获取类型


  }
}



