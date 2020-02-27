/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
    static apiUrl='/api/staff/interface';
    static evaluPrefix = '/api/evaluation';
    static Url = {
        queryquerycounselors:ServelUrl.evaluPrefix+'/querycounselorlist', //获取辅导员列表
        querycounselorinfo: ServelUrl.evaluPrefix + '/querycounselorinfo',//返回辅导员信息
        saveinstructor:ServelUrl.evaluPrefix + '/saveevaluationresult',//保存分数
        queryacademy:ServelUrl.evaluPrefix + '/queryacademyinfo',//获取学院名称
        checkacademy:ServelUrl.evaluPrefix + '/checkacademyinfo',//判断是否已经测评完学院

        getquestionnaire:ServelUrl.evaluPrefix + '/getquestionnaire',//获取问卷



    }
}