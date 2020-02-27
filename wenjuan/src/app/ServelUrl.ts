/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
  static question = '/api/questionnaire';
  static Url = {
    apiUrl: '/api/staff/interface',
    fileUrl: '/api/staff/file',
    saveAttach: '/api/system/saveattach',
    UserIcon: '/api/apiofbasic/queryusericon',
    //根据编号精确查询调查问卷数据
    onebycode: `${ServelUrl.question}/onebycode`,
    //查询问卷题目数据（包含选项）
    querytopics: `${ServelUrl.question}/querytopics`,
    //提交题目选项
    submitoption: `${ServelUrl.question}/submitoption`,
    //获取七牛上传凭证
    getUpToken:'/api/fproof/appget',
    //任务详情列表
    tasklist:'/api/dormitorychecktask/ptask',
    //被分配宿舍楼页面头部
    dtasktop:'/api/dormitorychecktask/dtasktop',
    //被分配宿舍页面头部
    rtasktop:'/api/dormitorychecktask/rtasktop',
    // 被分配宿舍楼页面列表
    dtasklist:'/api/dormitorychecktask/dtasklist',
    //  被分配宿舍页面列表
    rtasklist:'api/dormitorychecktask/rtasklist',
    //  问卷完成
    completion:'/api/poorstudent/completion',
    //  提交答题完成
    submitcompletion:'/api/questionnaire/submitcompletion',
    getWeek:"/api/system/schoolcalendarnowyearterm",
    resultDetail:'/api/dormitorychecktask/resultdetail'
  }
}
