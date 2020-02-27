/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
    static apiPrefix = '/api/';
    static Url = {
        apiUrl: '/api/staff/interface',
        // YelloPageList: ServelUrl.apiPrefix + 'yellowpages/queryyellowpagesmessage',
      YelloPageList: ServelUrl.apiPrefix + 'dimensionquery/dimensionqueryuser',
       getCounselorname: ServelUrl.apiPrefix + 'dimensionquery/dimensionquerybyid',
    //   getCounselorname: ServelUrl.apiPrefix + 'yellowpages/querystudentwithcounselorname',
    }
}
