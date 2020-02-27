/**
 * Created by hanzhendong on 2017/3/15.
 */
export class ServelUrl {
  static choujiangPrefix = '/web/poineer/innovationpoineer';
  static Url = {
    apiUrl: '/api/staff/interface',
    queryDetials: ServelUrl.choujiangPrefix + '/querypoineerdetials',
    login: ServelUrl.choujiangPrefix + '/innovationpoineerlogin',
    getNum: ServelUrl.choujiangPrefix + '/innovationpoineernum'
  }
}
