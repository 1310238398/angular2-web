/**
 * Created by hanzhendong on 2017/12/18.
 */
export class ServelUrl {
    static apiPrefix = '/api/';
    static Url = {
        apiUrl: '/api/staff/interface',
        fileUrl: '/api/staff/file',
        querystudentcard: ServelUrl.apiPrefix + 'studentcard/queryone',
        queryphoto: ServelUrl.apiPrefix + 'studentcard/queryphoto',
        savestudentcard: ServelUrl.apiPrefix + 'studentcard/saveone',
        querytwo: ServelUrl.apiPrefix + 'studentcard/querytwo',
        savetwo: ServelUrl.apiPrefix + 'studentcard/savetwo',
        querytree: ServelUrl.apiPrefix + 'studentcard/querythree',
        savethree: ServelUrl.apiPrefix + 'studentcard/savethree',
        queryfour: ServelUrl.apiPrefix + 'studentcard/queryfour',
        savefour: ServelUrl.apiPrefix + 'studentcard/savefour',
        queryfive: ServelUrl.apiPrefix + 'studentcard/queryfive',
        savefive: ServelUrl.apiPrefix + 'studentcard/savefive',
        //获取省市县
        querycitytype: ServelUrl.apiPrefix + 'yxinfofill/geographyinit',

        //初始请求数据-标题
        firstquery: ServelUrl.apiPrefix + 'studentinfochange/titleshow',
        //初始请求数据-学生数据
        firstqueryone: ServelUrl.apiPrefix + 'studentinfochange/infoshow',
        querysystemvalue: '/api/system/parameter/querysystemvalue',
        // 民族下拉框(政治面貌)
        relationquery: ServelUrl.apiPrefix + 'yxinfofill/getbizname',
        // 获取校区
        campusquery: ServelUrl.apiPrefix + 'studentinfochange/dormitorycampus',
        // 获取园区
        disquery: ServelUrl.apiPrefix + 'studentinfochange/dormitorydistrict',
        // 获取宿舍楼
        dormitoryquery: ServelUrl.apiPrefix + 'studentinfochange/dormitorydormitory',

        // 获取开户行,与监护人关系
        bankyquery: ServelUrl.apiPrefix + 'yxinfofill/getbizname',
        // 保存第二页
        savefamily: ServelUrl.apiPrefix + 'studentinfochange/save2',
        // 保存第三页
        saveperson: ServelUrl.apiPrefix + 'studentinfochange/save3',
        // 保存第一页
        savephoto: ServelUrl.apiPrefix + 'studentinfochange/save1',


    }
}
