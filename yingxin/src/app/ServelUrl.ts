/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
  static leavePrefix = '/api/welcome';
  static Url = {
    apiUrl: '/api/welcome/interface',
    fileUrl: '/api/staff/file',
    content: ServelUrl.leavePrefix + '/content',
    check: ServelUrl.leavePrefix + '/check',
    init: ServelUrl.leavePrefix + '/init',
    ad: ServelUrl.leavePrefix + '/ad',
    adclickcount: ServelUrl.leavePrefix + '/adclickcount',
    tip: ServelUrl.leavePrefix + '/tip',
    topline: '/api/topline',
    one: '/api/topline/one',
    task: '/api/task',
    click: '/api/task/click',
    uriloc: '/api/task/uriloc',
  }
}
