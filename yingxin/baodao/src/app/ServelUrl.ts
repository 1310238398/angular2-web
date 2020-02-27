/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
    static apiPrefix = '/api/';
    static Url = {
        apiUrl: '/api/staff/interface',
        //学院头部信息
       querycampus:ServelUrl.apiPrefix +'yxcheckin/academyhead',
       //学院报到数据
       queryacademy:ServelUrl.apiPrefix +'yxcheckin/academydetails',
        //专业头部信息
       querymajor:ServelUrl.apiPrefix +'yxcheckin/majorhead',
       //专业报到数据
       querymajorregist:ServelUrl.apiPrefix +'yxcheckin/majordetails',
        //班级头部信息
       queryclasshead:ServelUrl.apiPrefix +'yxcheckin/classhead',
       //班级报到数据
       queryclass:ServelUrl.apiPrefix +'yxcheckin/classdetails',
       //一个班级报到数据
       queryclassone:ServelUrl.apiPrefix +'yxcheckin/classeveryone',
       //查询接口
       seachquery:ServelUrl.apiPrefix+'yxcheckin/search',
        //查询个人接口
       seachpersonquery:ServelUrl.apiPrefix+'yxcheckin/userid',
    }
}
