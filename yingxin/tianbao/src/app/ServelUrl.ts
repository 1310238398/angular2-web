/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
    static apiPrefix = '/api/';
    static Url = {
        apiUrl: '/api/staff/interface',
         fileUrl: '/api/staff/file',
      querysextype:ServelUrl.apiPrefix +'yxinfofill/getbizname',
      querynationtype:ServelUrl.apiPrefix +'yxinfofill/getbizname',
      querycountytype:ServelUrl.apiPrefix +'yxinfofill/getbizname',
     querylooktype:ServelUrl.apiPrefix +'yxinfofill/getbizname',
      queryidentitytype:ServelUrl.apiPrefix +'yxinfofill/getbizname',
     querymaritaltype:ServelUrl.apiPrefix +'yxinfofill/getbizname',
     querysaveinformation:ServelUrl.apiPrefix +'yxinfofill/saveformpersonal',
      queryfamilyinformation:ServelUrl.apiPrefix +'yxinfofill/saveformfamily',
    querycampus:ServelUrl.apiPrefix +'yxinfofill/getschoollogoandname',
     //获取省市县
     querycitytype:ServelUrl.apiPrefix +'yxinfofill/geographyinit',
      queryphonetype:ServelUrl.apiPrefix +'yxinfofill/getphone',
    
    //主线进来，有数据
     queryformdata:ServelUrl.apiPrefix +'yxinfofill/getform',
   
    }
}
