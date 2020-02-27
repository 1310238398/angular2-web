var antlinker = Object();
antlinker["callback"] = Object();
antlinker.userAgent = navigator.userAgent;
antlinker.isAndroid = antlinker.userAgent.indexOf('Android') > -1 || antlinker.userAgent.indexOf('Adr') > -1; //android终端
antlinker.isiOS = !!antlinker.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
antlinker.isPC = (antlinker.userAgent === "antlinker_pc"); //pc版本自定义useragent
antlinker.version = "1.0.4-dev";
var webkit;
var androidAntLinker;
var pcAntLinker;
var $;
var jQuery;
// 1. success：接口调用成功时执行的回调函数。
//
// 1. fail：接口调用失败时执行的回调函数。
//
// 1. complete：接口调用完成时执行的回调函数，无论成功或失败都会执行。
//
// 1. cancel：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
//
// 1. trigger: 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
antlinker.config = function (request) {
  antlinker.config.success = request.success;
  antlinker.config.fail = request.fail;
  antlinker.config.complete = request.complete;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.config.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.config.fail(err);
      console.log("iOS config not exist");
      console.log(err);
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.Config(JSON.stringify(request));
    }
    catch (err) {
      antlinker.config.fail(err);
      console.log("Android config not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.Config(JSON.stringify(request));
    }
    catch (err) {
      antlinker.config.fail(err);
      console.log("PC config not exist");
    }
  }
  else {
    console.log("getAppVersion not exist");
  }
};
antlinker.getSdkVersion = function (request) {
  antlinker.getSdkVersion.success = request.success;
  antlinker.getSdkVersion.fail = request.fail;
  antlinker.getSdkVersion.complete = request.complete;
  var version = Object();
  version.Version = antlinker.version;
  request.success(version);
  request.complete();
};
//antlinker.getAppVersion({
//    success: function {},
//    fail: function(failed) {},
//    complete: function {}
//});
// failed参数为
//{
//    FailCode: xxx,
//    FailReason: yyy
//}
//// success参数为
//{
//    Version: "x.x.x"
//}
antlinker.getAppVersion = function (request) {
  antlinker.getAppVersion.success = request.success;
  antlinker.getAppVersion.fail = request.fail;
  antlinker.getAppVersion.complete = request.complete;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.getAppVersion.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getAppVersion.fail(err);
      console.log("iOSGetAppVersion not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.GetAppVersion(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getAppVersion.fail(err);
      console.log("AndroidGetAppVersion not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.GetAppVersion(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getAppVersion.fail(err);
      console.log("PC GetAppVersion not exist");
    }
  }
  else {
    console.log("getAppVersion not exist");
  }
};
// 返回可用的api的列表
// failed参数为
//{
//    FailCode: xxx,
//    FailReason: yyy
//}
//// success参数为
// {
//    AvailableApi:["Api_1", "Api_2", "Api_3", "Api_4"]
// }
antlinker.getAvailableApi = function (request) {
  antlinker.getAvailableApi.success = request.success;
  antlinker.getAvailableApi.fail = request.fail;
  antlinker.getAvailableApi.complete = request.complete;
  if (antlinker.isiOS) {
    if (webkit.messageHandlers.getAppVersion) {
      try {
        webkit.messageHandlers.getAvailableApi.postMessage(JSON.stringify(request));
      }
      catch (err) {
        console.log(err);
        antlinker.getAvailableApi.fail(err);
        console.log("iOSGetAvailableApi not exist");
      }
    }
    else {
      antlinker.getAvailableApi.success({
        "AvailableApi": []
      });
    }
  }
  else if (antlinker.isAndroid) {
    if (androidAntLinker) {
      try {
        androidAntLinker.GetAvailableApi(JSON.stringify(request));
      }
      catch (err) {
        antlinker.getAvailableApi.fail(err);
        console.log("AndroidGetAvailableApi not exist");
      }
    }
    else {
      antlinker.getAvailableApi.success({
        "AvailableApi": []
      });
    }
  }
  else if (antlinker.isPC) {
    if (pcAntLinker) {
      try {
        pcAntLinker.GetAvailableApi(JSON.stringify(request));
      }
      catch (err) {
        antlinker.getAvailableApi.fail(err);
        console.log("AndroidGetAvailableApi not exist");
      }
    }
    else {
      antlinker.getAvailableApi.success({
        "AvailableApi": []
      });
    }
  }
  else {
    console.log("getAvailableApi not exist");
  }
};
// antlinker.checkJsApi({
//     jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
//     success: function(res) {
//         // 以键值对的形式返回，可用的api值true，不可用为false
//         // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
//     }
// });
antlinker.checkJsApi = function (request) {
  console.log("antlinker.checkJsApi request " + JSON.stringify(request.JsApiList));
  antlinker.checkJsApi.success = request.success;
  antlinker.checkJsApi.fail = request.fail;
  antlinker.checkJsApi.complete = request.complete;
  antlinker.checkJsApi.JsApiList = request.JsApiList;
  var request = {
    success: function (result) {
      var res = {};
      res["CheckResult"] = {};
      // 逐个检验jsapilist里面的元素有没有在availableapi中
      for (var i in antlinker.checkJsApi.JsApiList) {
        for (var j in result.AvailableApi) {
          if (antlinker.checkJsApi.JsApiList[i] == result.AvailableApi[j]) {
            res["CheckResult"][antlinker.checkJsApi.JsApiList[i]] = true;
            break;
          }
        }
        if (res["CheckResult"].hasOwnProperty(antlinker.checkJsApi.JsApiList[i]) === false) {
          res["CheckResult"][antlinker.checkJsApi.JsApiList[i]] = false;
        }
      }
      antlinker.checkJsApi.success(res);
    },
    complete: function () {
      if (antlinker.checkJsApi.complete) {
        antlinker.checkJsApi.complete();
      }
    }
  };
  // 获取可用的api
  antlinker.getAvailableApi(request);
};
// 这个接口需要入口地址在whitelist里面才能调用,仅供内部调用
antlinker.getUserBasicInfo = function (request) {
  antlinker.getUserBasicInfo.change = request.change;
  antlinker.getUserBasicInfo.success = request.success;
  antlinker.getUserBasicInfo.fail = request.fail;
  antlinker.getUserBasicInfo.complete = request.complete;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.getUserBasicInfo.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getUserBasicInfo.fail(err);
      console.log("iOS getUserBasicInfo not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.GetUserBasicInfo(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getUserBasicInfo.fail(err);
      console.log("Android getUserBasicInfo not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.GetUserBasicInfo(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getUserBasicInfo.fail(err);
      console.log("PC getUserBasicInfo not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
// 这个接口用于不在白名单的URL使用
antlinker.getUserProfile = function (request) {
  antlinker.getUserProfile.success = request.success;
  antlinker.getUserProfile.fail = request.fail;
  antlinker.getUserProfile.complete = request.complete;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.getUserProfile.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getUserProfile.fail(err);
      console.log("iOS getUserProfile not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.GetUserProfile(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getUserProfile.fail(err);
      console.log("Android getUserProfile not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.GetUserProfile(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getUserProfile.fail(err);
      console.log("PC getUserProfile not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
antlinker.getUserEduInfo = function (request) {
  antlinker.getUserEduInfo.success = request.success;
  antlinker.getUserEduInfo.fail = request.fail;
  antlinker.getUserEduInfo.complete = request.complete;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.getUserEduInfo.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getUserEduInfo.fail(err);
      console.log("iOS getUserEduInfo not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.GetUserEduInfo(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getUserEduInfo.fail(err);
      console.log("Android getUserEduInfo not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.GetUserEduInfo(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getUserEduInfo.fail(err);
      console.log("PC getUserEduInfo not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
// antlinker.shareToTimeline({
//     title: '', // 分享标题
//     link: '', // 分享链接
//     imgUrl: '', // 分享图标
//     success: function () {
//     },
//     cancel: function () {
//     }
// });
antlinker.shareToTimeline = function (request) {
  antlinker.shareToTimeline.success = request.success;
  antlinker.shareToTimeline.cancel = request.cancel;
  antlinker.shareToTimeline.fail = request.fail;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.shareToTimeline.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.shareToTimeline.fail(err);
      console.log("iOS shareToTimeline not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.ShareToTimeline(JSON.stringify(request));
    }
    catch (err) {
      antlinker.shareToTimeline.fail(err);
      console.log("Android ShareToTimeline not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.ShareToTimeline(JSON.stringify(request));
    }
    catch (err) {
      antlinker.shareToTimeline.fail(err);
      console.log("PC ShareToTimeline not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
/*
 * antlinker.configTitleButton({
 type: "share",// 可选类型为label即设置标题和camera 、share
 option: ["aaa", "bbb"], // 这是一组最大值，原生可以根据用户的不同减小这一组值

 option数组会用到的元素：
 square：广场
 u2u：个人聊天
 u2g：群组聊天
 wechat：微信好友
 weshare：微信朋友圈
 weibo：微博
 qq：qq好友
 qqzone：qq空间


 shareContent:{
 title: '分享标题标题标题', // 分享标题
 desc: '分享描述描述描述', // 分享描述
 link: '', // 分享链接
 id: '', // id
 type: 'lottery', // 分享类型,music、video或link，不填默认为link
 dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
 },


 success: function () {
 // 设置右上角按钮成功
 },
 fail: function () {
 // 设置右上角按钮失败
 },
 onClick: function () {
 // 点击调用哪个函数
 // 在这个函数中，需要准备好各种信息，然后调用shareContent
 // 之后，原生弹出选择分享到哪的界面，之后由原生控制
 }
 });
 *
 * */
antlinker.configTitleButton = function (request) {
  antlinker.configTitleButton.success = request.success;
  antlinker.configTitleButton.shareContent = request.shareContent;
  antlinker.configTitleButton.fail = request.fail;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.configTitleButton.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.configTitleButton.fail(err);
      console.log("iOS configTitleButton not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.ConfigTitleButton(JSON.stringify(request));
    }
    catch (err) {
      antlinker.configTitleButton.fail(err);
      console.log("Android configTitleButton not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.ConfigTitleButton(JSON.stringify(request));
    }
    catch (err) {
      antlinker.configTitleButton.fail(err);
      console.log("Android configTitleButton not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
/*
 *
 antlinker.shareContent({
 title: '', // 分享标题
 desc: '', // 分享描述
 link: '', // 分享链接
 imgUrl: '', // 分享图标
 type: '', // 分享类型,music、video或link，不填默认为link

 type可能的类型：
 square：广场
 activity：活动
 vote：投票
 survey：调查问卷
 info：资讯
 notice：公告
 answer：答题闯关
 lottery：积分抽奖

 dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
 success: function () {
 // 用户确认分享后执行的回调函数
 },
 cancel: function () {
 // 用户取消分享后执行的回调函数
 }
 })
 *
 * */
antlinker.shareContent = function (request) {
  antlinker.shareContent.success = request.success;
  antlinker.shareContent.cancel = request.cancel;
  antlinker.shareContent.fail = request.fail;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.shareContent.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.shareContent.fail(err);
      console.log("iOS shareContent not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.ShareContent(JSON.stringify(request));
    }
    catch (err) {
      antlinker.shareContent.fail(err);
      console.log("Android shareContent not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.ShareContent(JSON.stringify(request));
    }
    catch (err) {
      antlinker.shareContent.fail(err);
      console.log("Android shareContent not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
// antlinker.shareToAppMessage({
//     title: '', // 分享标题
//     desc: '', // 分享描述
//     link: '', // 分享链接
//     imgUrl: '', // 分享图标
//     type: '', // 分享类型,music、video或link，不填默认为link
//     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//     success: function () {
//         // 用户确认分享后执行的回调函数
//     },
//     cancel: function () {
//         // 用户取消分享后执行的回调函数
//     }
// });
antlinker.shareToAppMessage = function (request) {
  antlinker.shareToAppMessage.success = request.success;
  antlinker.shareToAppMessage.cancel = request.cancel;
  antlinker.shareToAppMessage.fail = request.fail;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.shareToAppMessage.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.shareToAppMessage.fail(err);
      console.log("iOS shareToAppMessage not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.ShareToAppMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.shareToAppMessage.fail(err);
      console.log("Android ShareToAppMessage not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.ShareToAppMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.shareToAppMessage.fail(err);
      console.log("Android ShareToAppMessage not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
//
// antlinker.chooseImage({
//     count: 1, // 默认9
//     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//     success: function (res) {
//         var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//     }
// });
antlinker.chooseImage = function (request) {
  antlinker.chooseImage.success = request.success;
  antlinker.chooseImage.cancel = request.cancel;
  antlinker.chooseImage.fail = request.fail;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.chooseImage.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.chooseImage.fail(err);
      console.log("iOS chooseImage not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.ChooseImage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.chooseImage.fail(err);
      console.log("Android ChooseImage not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.ChooseImage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.chooseImage.fail(err);
      console.log("Android ChooseImage not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
// antlinker.getDeviceType({
//     success: function(device_type) {} // 返回值为设备类型
// })
antlinker.getDeviceType = function (request) {
  antlinker.getDeviceType.success = request.success;
  antlinker.getDeviceType.fail = request.fail;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.getDeviceType.postMessage(JSON.stringify(request));
    }
    catch (err) {
      console.log("iOS getDeviceType not exist");
      antlinker.getDeviceType.fail(err);
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.GetDeviceType(JSON.stringify(request));
    }
    catch (err) {
      console.log("Android getDeviceType not exist");
      antlinker.getDeviceType.fail(err);
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.GetDeviceType(JSON.stringify(request));
    }
    catch (err) {
      console.log("Android getDeviceType not exist");
      antlinker.getDeviceType.fail(err);
    }
  }
  else {
    console.log("unknown device");
  }
};
// antlinker.getNetworkType({
//     success: function (res) {
//         var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
//     }
// });
antlinker.getNetworkType = function (request) {
  antlinker.getNetworkType.success = request.success;
  antlinker.getNetworkType.fail = request.fail;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.getNetworkType.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getNetworkType.fail(err);
      console.log("iOS getNetworkType not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.GetNetworkType(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getNetworkType.fail(err);
      console.log("Android getNetworkType not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.GetNetworkType(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getNetworkType.fail(err);
      console.log("Android getNetworkType not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
// antlinker.getLocation({
//     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
//     success: function (res) {
//         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
//         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
//         var speed = res.speed; // 速度，以米/每秒计
//         var accuracy = res.accuracy; // 位置精度
//     }
// });
antlinker.getLocation = function (request) {
  antlinker.getLocation.success = request.success;
  antlinker.getLocation.fail = request.fail;
  antlinker.getLocation.cancel = request.cancel;
  antlinker.getLocation.complete = request.complete;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.getLocation.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getLocation.fail(err);
      console.log("iOS getNetworkType not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.GetLocation(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getLocation.fail(err);
      console.log("Android getLocation not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.GetLocation(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getLocation.fail(err);
      console.log("Android getLocation not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
antlinker.configTitle = function (request) {
  antlinker.configTitle.success = request.success;
  antlinker.configTitle.fail = request.fail;
  antlinker.configTitle.complete = request.complete;
  antlinker.configTitle.onSelect = request.onSelect;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.configTitle.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.configTitle.fail(err);
      console.log("iOS getNetworkType not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.ConfigTitle(JSON.stringify(request));
    }
    catch (err) {
      antlinker.configTitle.fail(err);
      console.log("Android getLocation not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.ConfigTitle(JSON.stringify(request));
    }
    catch (err) {
      antlinker.configTitle.fail(err);
      console.log("Android getLocation not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
/**
 * request
 * @param request
 * {URI:params}
 * params:需要打开新页面的参数（#xxx&TITLE='黄页'）
 */
antlinker.openNewView = function (request) {
  antlinker.openNewView.success = request.success;
  antlinker.openNewView.fail = request.fail;
  antlinker.openNewView.complete = request.complete;
  antlinker.openNewView.onSelect = request.onSelect;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.openNewView.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.openNewView.fail(err);
      console.log("iOS openNewView not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.openNewView(JSON.stringify(request));
    }
    catch (err) {
      antlinker.openNewView.fail(err);
      console.log("Android openNewView not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.openNewView(JSON.stringify(request));
    }
    catch (err) {
      antlinker.openNewView.fail(err);
      console.log("Android openNewView not exist");
    }
  }
  else {
    console.log("unknown device");
  }

}
antlinker.listEqual = function (listA, listB) {
  if (Array.isArray(listA) && Array.isArray(listB)) {
    if (listA.length !== listB.length) {
      return false;
    }
    for (var i = 0; i < listA.length; ++i) {
      if (listA[i] !== listB[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
};
antlinker.listContains = function (listA, listB) {
  var res = {};
  res["CheckResult"] = {};
  if (Array.isArray(listA) && Array.isArray(listB)) {
    for (var i = 0; i < listA.length; ++i) {
      for (var j = 0; j < listB.length; ++j) {
        if (listB[j] === listA[i]) {
          res["CheckResult"][listA[i]] = true;
          break;
        }
      }
    }
  }
  return res;
};
antlinker.objectEqual = function (objA, objB) {
  if (objA === objB) {
    return true;
  }
  if (!(objA instanceof Object) || !(objB instanceof Object)) {
    return false;
  }
  if (objA.constructor !== objB.constructor) {
    return false;
  }
  for (var p in objA) {
    if (objA.hasOwnProperty(p)) {
      if (!objB.hasOwnProperty(p)) {
        return false;
      }
      if (objA[p] === objB[p]) {
        continue;
      }
      if (typeof objA[p] !== "object") {
        return false;
      }
      if (!antlinker.objectEqual(objA[p], objB[p])) {
        return false;
      }
    }
  }
  for (var q in objB) {
    if (objB.hasOwnProperty(q) && !objA.hasOwnProperty(q)) {
      return false;
    }
  }
  return true;
};
antlinker.jumpToNative = function (request) {
  antlinker.jumpToNative.success = request.success;
  antlinker.jumpToNative.fail = request.fail;
  antlinker.jumpToNative.complete = request.complete;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.jumpToNative.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.jumpToNative.fail(err);
      console.log("iOS jumpToNative not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.JumpToNative(JSON.stringify(request));
    }
    catch (err) {
      antlinker.jumpToNative.fail(err);
      console.log("Android jumpToNative not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.JumpToNative(JSON.stringify(request));
    }
    catch (err) {
      antlinker.jumpToNative.fail(err);
      console.log("Android jumpToNative not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
antlinker.uploadFile = function (request) {
  antlinker.uploadFile.success = request.success;
  antlinker.uploadFile.fail = request.fail;
  antlinker.uploadFile.complete = request.complete;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.uploadFile.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.uploadFile.fail(err);
      console.log("iOS uploadFile not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.UploadFile(JSON.stringify(request));
    }
    catch (err) {
      antlinker.uploadFile.fail(err);
      console.log("Android uploadFile not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.UploadFile(JSON.stringify(request));
    }
    catch (err) {
      antlinker.uploadFile.fail(err);
      console.log("Android uploadFile not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
antlinker.uuid = function () {
  return antlinker.s4() + antlinker.s4() + '-' + antlinker.s4() + '-' + antlinker.s4()
    + '-' + antlinker.s4() + '-' + antlinker.s4() + antlinker.s4() + antlinker.s4();
};
antlinker.s4 = function () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
antlinker.listEqual = function (listA, listB) {
  if (Array.isArray(listA) && Array.isArray(listB)) {
    if (listA.length !== listB.length) {
      return false;
    }
    for (var i = 0; i < listA.length; ++i) {
      if (listA[i] !== listB[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
};
antlinker.listContains = function (listA, listB) {
  var res = {};
  res["CheckResult"] = {};
  if (Array.isArray(listA) && Array.isArray(listB)) {
    for (var i = 0; i < listA.length; ++i) {
      for (var j = 0; j < listB.length; ++j) {
        if (listB[j] === listA[i]) {
          res["CheckResult"][listA[i]] = true;
          break;
        }
      }
    }
  }
  return res;
};
antlinker.objectEqual = function (objA, objB) {
  if (objA === objB) {
    return true;
  }
  if (!(objA instanceof Object) || !(objB instanceof Object)) {
    return false;
  }
  if (objA.constructor !== objB.constructor) {
    return false;
  }
  for (var p in objA) {
    if (objA.hasOwnProperty(p)) {
      if (!objB.hasOwnProperty(p)) {
        return false;
      }
      if (objA[p] === objB[p]) {
        continue;
      }
      if (typeof objA[p] !== "object") {
        return false;
      }
      if (!antlinker.objectEqual(objA[p], objB[p])) {
        return false;
      }
    }
  }
  for (var q in objB) {
    if (objB.hasOwnProperty(q) && !objA.hasOwnProperty(q)) {
      return false;
    }
  }
  return true;
};
antlinker.exeUserBasicInfoSdk = function (obj, exeBus) {
  if (!!!obj.UID) {
    var request = new Object({
      success: function (succeed) {
        obj.AppWebKey = obj.AppWebKey || succeed.AppWebKey;
        obj.UserType = obj.UserType || succeed.UserType;
        obj.UID = succeed.UserID;
        obj.Version = succeed.Version;
        //obj.UserCode =succeed.UserCode;
        window["__AppWebkey"] = obj.AppWebKey;
        window["__UserID"] = obj.UID;
        //console.log(obj.UserCode);
        if (typeof exeBus == "function") {
          //alert("goEXEBUs");
          //alert("SDK"+JSON.stringify(obj));
          exeBus(obj, succeed);
        }
      },
      fail: function (failed) {
        alert(JSON.stringify(failed));
      },
      complete: function () {
      }
    });
    antlinker.getUserBasicInfo(request);
  }
  else {
    //alert("UID");
    window["__UserID"] = obj.UID;
    if (typeof exeBus == "function") {
      //alert("goEXEBUs");
      exeBus(obj, null);
    }
  }
};
//向客户端请求实时有效的webkey
antlinker.getEffectiveWebkey = function (request) {
  antlinker.getEffectiveWebkey.success = request.success;
  antlinker.getEffectiveWebkey.fail = request.fail;
  antlinker.getEffectiveWebkey.complete = request.complete;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.getEffectiveWebkey.postMessage(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getEffectiveWebkey.fail(err);
      console.log("iOS getEffectiveWebkey not exist");
    }
  }
  else if (antlinker.isAndroid) {
    try {
      androidAntLinker.GetEffectiveWebkey(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getEffectiveWebkey.fail(err);
      console.log("Android getEffectiveWebkey not exist");
    }
  }
  else if (antlinker.isPC) {
    try {
      pcAntLinker.GetEffectiveWebkey(JSON.stringify(request));
    }
    catch (err) {
      antlinker.getEffectiveWebkey.fail(err);
      console.log("Android getEffectiveWebkey not exist");
    }
  }
  else {
    console.log("unknown device");
  }
};
//拨打电话
antlinker.onTel = function (request) {
  antlinker.onTel.success = request.success;
  antlinker.onTel.fail = request.fail;
  antlinker.onTel.complete = request.complete;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.onTel.postMessage(JSON.stringify(request));
    } catch (err) {
      antlinker.onTel.fail(err);
      console.log("iOS onTel not exist");
    }
  } else if (antlinker.isAndroid) {
    try {
      androidAntLinker.OnTel(JSON.stringify(request));
    } catch (err) {
      antlinker.onTel.fail(err);
      console.log("Android OnTel not exist");
    }
  } else {
    console.log("unknown device");
  }
}
