/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
    static apiUrl='/api/staff/interface';
    static evaluPrefix = '/api/evaluation';
    static evaluationPrefix='/api/survey';
    static Url = {
        querycounselorinfo: ServelUrl.evaluPrefix + '/querycounselorinfo',//返回辅导员信息
        saveinstructor:ServelUrl.evaluPrefix + '/saveevaluationresult',//保存分数
        queryacademy:ServelUrl.evaluPrefix + '/queryacademyinfo',//获取学院名称
        checkacademy:ServelUrl.evaluPrefix + '/checkacademyinfo',//判断是否已经评教完毕
        querycourselist:ServelUrl.evaluationPrefix + '/getcourselist',  //获取当前学生课程列表
        gettestlist:ServelUrl.evaluationPrefix + '/gettitlelist',  //获取试题
        surveysave : ServelUrl.evaluationPrefix + '/save', //保存评教结果
    }
}