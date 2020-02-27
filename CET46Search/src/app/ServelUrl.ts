/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
  static apiPrefix = '/api/';
  static Url = {
    apiUrl: '/api/staff/interface',
    //查询估分开始结束时间
    estimateTime: ServelUrl.apiPrefix + 'cet/estimatetime',
    //是否估过分
    isestimate: ServelUrl.apiPrefix + 'cet/Judge',
    //查询估分表单默认数据
    getDefaultData: ServelUrl.apiPrefix + 'cet/estimate',
    //保存估分数据
    saveEstimateValue: ServelUrl.apiPrefix + 'cet/estimatesave',
    //查询估分成绩
    queryEstimateScore: ServelUrl.apiPrefix + 'cet/estimatequery',
    //查询ID
    queryScore:ServelUrl.apiPrefix+'cet/query',
    //根据id查询成绩
    queryScoreById:ServelUrl.apiPrefix+'cet/querybyid'
  }
}
