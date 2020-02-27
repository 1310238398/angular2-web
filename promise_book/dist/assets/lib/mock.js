/**
 * Created by mac on 16/6/20.
 */
/**
 * 用于模拟android和iOS客户端
 * Created by developer on 4/20/16.
 */

// webkit.messageHandlers.getAppVersion.postMessage

var mock = Object();

var apiList = ["getAppVersion", "getSdkVersion"];
//
mock.configure = function (platform) {
  if (platform === "iOS") {
    antlinker.isiOS = true;
    antlinker.isAndroid = false;
    webkit = {};
    webkit.messageHandlers = {};

    webkit.messageHandlers.config = {};
    webkit.messageHandlers.config.postMessage = function (res) {

      antlinker.config.success();
      antlinker.config.complete();
      antlinker.config.fail();
    };

    webkit.messageHandlers.getAppVersion = {};
    webkit.messageHandlers.getAppVersion.postMessage = function (res) {
      var request = JSON.parse(res);
      var version = {
        "Version": "1.2.3"
      };
      antlinker.getAppVersion.success(version);
      antlinker.getAppVersion.complete();
      antlinker.getAppVersion.fail(null);
    };

    webkit.messageHandlers.getAvailableApi = {};
    webkit.messageHandlers.getAvailableApi.postMessage = function (res) {
      var response = {};
      response.AvailableApi = apiList;
      antlinker.getAvailableApi.success(response);
      antlinker.getAvailableApi.complete();
    };

    webkit.messageHandlers.shareToTimeline = {};
    webkit.messageHandlers.shareToTimeline.postMessage = function (res) {
      if (Math.random() > 0.3) {
        antlinker.shareToTimeline.success();
      } else {
        antlinker.shareToTimeline.cancel();
      }
    };

    webkit.messageHandlers.shareToAppMessage = {};
    webkit.messageHandlers.shareToAppMessage.postMessage = function (res) {
      if (Math.random() > 0.3) {
        antlinker.shareToAppMessage.success();
      } else {
        antlinker.shareToAppMessage.cancel();
      }
    };
    webkit.messageHandlers.chooseImage = {};
    webkit.messageHandlers.chooseImage.postMessage = function (res) {
      antlinker.chooseImage.success();
    };


    webkit.messageHandlers.getUserBasicInfo = {};
    webkit.messageHandlers.getUserBasicInfo.postMessage = function (res) {
      var user = {
        //UserID: "DA0000042723",
        //UserCode:'13512341142',
        //AppWebKey: "AA_k3cGlRC20r"
        //UserID: "DA0000042733",
        //UserCode:'13512341152',
        //AppWebKey: "AA_GZ0GLBLvZe"
        /*UserID: "DY0000051036",
        AppWebKey: "AA_9EgSpxibiV",
        UserCode: "15168855914",
        UserType: 1*/
        /*UserID: "DY0000051036",
        AppWebKey: "AA_9EgSpxibiV",
        UserCode: "15168855914",
        UserType: 1*/
        /*抽奖*/
        /*UserID: "AA0000035791",
        AppWebKey: "ACKEY_Q1APS9BOPEOOIOOBHTRLHW",
        UserCode: "15168855914",
        UserType: 1*/


        //课程表 答题闯关
        UserID: "DA0000101860",
        AppWebKey: "6VU1HY-COZYEQO1QYZH_KG",
        UserCode: "11820173004",
        "UserType": "2"

      };
      setTimeout(antlinker.getUserBasicInfo.success(user), 10);
      //antlinker.getUserBasicInfo.success(user);
    };
    webkit.messageHandlers.getEffectiveWebkey = {};
    webkit.messageHandlers.getEffectiveWebkey.postMessage = function (res) {
      var key = {
        WebKey: 'YN7YIOY2MSWYTBWYMSAX8A'
      }
      setTimeout(antlinker.getEffectiveWebkey.success(key), 10);
      //antlinker.getUserBasicInfo.success(user);
    };
  } else if (platform === "Android") {
    antlinker.isiOS = false;
    antlinker.isAndroid = true;
    androidAntLinker = {};

    androidAntLinker.GetAppVersion = function (res) {
      var request = JSON.parse(res);
      var version = {
        "Version": "1.0.0"
      };
      antlinker.getAppVersion.success(version);
      antlinker.getAppVersion.complete();
    };

    androidAntLinker.GetAvailableApi = function (res) {
      antlinker.getAvailableApi.success(apiList);
      antlinker.getAvailableApi.complete();
    }
  } else {
    console.error("设置操作系统错误")
  }
};

mock.configure("iOS");
