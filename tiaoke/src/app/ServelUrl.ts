/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
    static apiUrl='/api/staff/interface';
    static evaluPrefix = '/api/staffadjustcourse';
    static Url = {
        getcoursenature: ServelUrl.evaluPrefix + '/getcoursenature',//获取课程性质
        getweekly:ServelUrl.evaluPrefix + '/getweekly',//获取当前学期的周次信息
        getday:ServelUrl.evaluPrefix + '/getday',//获取星期数信息
        getsection:ServelUrl.evaluPrefix + '/getsection',//获取课程节次信息
        addstaffadjustcourse:ServelUrl.evaluPrefix + '/addstaffadjustcourse',//添加调课信息
        queryalladjustcourse:ServelUrl.evaluPrefix + '/queryalladjustcourse',//查询调课信息列表
        queryoneadjustcourse:ServelUrl.evaluPrefix + '/queryoneadjustcourse',//查询单个调课
        makeUpDetails:ServelUrl.evaluPrefix + '/MakeUpDetails',//补充调课信息
        changeadjustcoursestatus:ServelUrl.evaluPrefix + '/changeadjustcoursestatus',//改变审批状态
        getStaffName:ServelUrl.evaluPrefix + '/getStaffName',//获取申请人名字
        changeAdjustCourseStatusBySelf:ServelUrl.evaluPrefix + '/ChangeAdjustCourseStatusBySelf',//自己改变审批状态
        whoComeIn:ServelUrl.evaluPrefix + '/WhoComeIn',//判断进调课申请/调课审批页面
        getstaffdepartment:ServelUrl.evaluPrefix + '/getstaffdepartment'//获取部门列表
    }
}