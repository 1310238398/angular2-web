/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
  static apiPrefix = '/api/';
  static Url = {
    apiUrl: '/api/staff/interface',
    YelloPageList: ServelUrl.apiPrefix + 'yellowpages/queryyellowpagesmessage',
    getList: ServelUrl.apiPrefix + 'yellowpages/getlist',
    getHisList: ServelUrl.apiPrefix + 'yellowpages/getsearchhistorylist',
    saveSearchValue: ServelUrl.apiPrefix + 'yellowpages/savesearchValue',
    deleteHis: ServelUrl.apiPrefix + 'yellowpages/deletesearchvalue'
  }
}
