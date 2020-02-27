/**
 * Created by hanzhendong on 2016/12/09.
 */
export class ServelUrl {
  static leavePrefix = '/api/leaveflow';
  static Url = {
    apiUrl: '/api/staff/interface',
    fileUrl: '/api/staff/file',
    UserIcon: '/api/apiofbasic/queryusericon',
    getUpToken:'/api/fproof/appget',

    substatus:'/api/poorstudent/substatus', //学生进入页面加载内容

    getsign:'/api/poorstudent/getsign', //获取贫困生签名图片 
    saveattach:'/api/system/saveattach', //对于每个上传的保存(公共接口)
    //queryup:'/api/poorstudent/queryup', //学生查询上传材料

    upattachcaption:'/api/poorstudent/upattachcaption', //添加/修改文件说明

    threesub:'/api/poorstudent/sub', //三项提交
    poorsaveattach:'/api/poorstudent/saveattach',  //总的保存材料

    GetModifyReason:'/api/poorstudent/GetModifyReason',  //获取学生申请修改原因
    SaveModifyReason:'/api/poorstudent/SaveModifyReason',  //保存学生申请修改原因

    DelModifyReason:'/api/poorstudent/DelModifyReason',  //清空学生申请修改原因

    QueryUp:'/api/poorstudent/QueryUp',  //清空学生申请修改原因

    
    

  }
}




// #### 保存学生申请修改原因

// * 请求路由： /api/poorstudent/SaveModifyReason
// * 请求方式： POST

// |请求参数名|数据类型|是否必填|说明|
// |----------|--------|---|----|
// |ModifyReason|string|是|修改原因|

// #### 获取学生申请修改原因

// * 请求路由： /api/poorstudent/GetModifyReason
// * 请求方式： POST

// |响应参数名|数据类型|说明|
// |----------|--------|----|
// |IntelUserCode|string|用户ID|
// |ModifyReason|string|修改原因|

// #### 清空学生申请修改原因

// * 请求路由： /api/poorstudent/DelModifyReason
// * 请求方式： POST