/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
    static cetPrefix = '/api/studentcetsignup';
    static Url = {
        apiUrl: '/api/staff/interface',
        fileUrl: '/api/staff/file',
        querycetlanguage: ServelUrl.cetPrefix + '/querycetlanguage',
        querystudentcetmessage: ServelUrl.cetPrefix + '/querystudentcetmessage',//学生详细信息
        dostudentcetsignup: ServelUrl.cetPrefix + '/dostudentcetsignup',//提交
        checkstudentcetsignupstatus: ServelUrl.cetPrefix + '/checkstudentcetsignupstatus',//检查审核状态
        querycetcontactteacherbycampus: ServelUrl.cetPrefix + '/querycetcontactteacherbycampus',//
    }
}