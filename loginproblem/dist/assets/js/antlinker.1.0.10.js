var antlinker = Object();
window["antlinker"] = antlinker;
antlinker["callback"] = Object();

antlinker.userAgent = navigator.userAgent;
antlinker.isAndroid = antlinker.userAgent.indexOf('Android') > -1 || antlinker.userAgent.indexOf('Adr') > -1; //android终端
antlinker.isiOS = !!antlinker.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
antlinker.isPC = (antlinker.userAgent === "antlinker_pc"); //pc版本自定义useragent

antlinker.version = "1.0.10";


var webkit;

var androidAntLinker;

var pcAntLinker;

var $;

var jQuery;


antlinker.getAppVersion = function (request) {
  antlinker.getAppVersion.success = request.success;
  antlinker.getAppVersion.fail = request.fail;
  antlinker.getAppVersion.complete = request.complete;

  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.getAppVersion.postMessage(JSON.stringify(request));
    } catch (err) {
      antlinker.getAppVersion.fail(err);
      console.log("iOSGetAppVersion not exist");
    }
  } else if (antlinker.isAndroid) {
    try {
      androidAntLinker.GetAppVersion(JSON.stringify(request));
    } catch (err) {
      antlinker.getAppVersion.fail(err);
      console.log("AndroidGetAppVersion not exist");
    }
  } else if (antlinker.isPC) {
    try {
      pcAntLinker.getAppVersion(JSON.stringify(request));
    } catch (err) {
      antlinker.getAppVersion.fail(err);
      console.log("PC GetAppVersion not exist");
    }
  } else {
    console.log("getAppVersion not exist")
  }

};

antlinker.getInitConfig = function (request) {
  antlinker.getInitConfig.success = request.success;
  antlinker.getInitConfig.fail = request.fail;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.getInitConfig.postMessage(JSON.stringify(request));
    } catch (err) {
      antlinker.getInitConfig.fail(err);
      console.log("iOS getInitConfig not exist");
    }
  } else if (antlinker.isAndroid) {
    try {
      androidAntLinker.getInitConfig(JSON.stringify(request));
    } catch (err) {
      antlinker.getInitConfig.fail(err);
      console.log("Android getInitConfig not exist");
    }
  } else if (antlinker.isPC) {
    try {
      pcAntLinker.getInitConfig(JSON.stringify(request));
    } catch (err) {
      antlinker.getInitConfig.fail(err);
      console.log("Pc getInitConfig not exist");
    }
  } else {
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
    } catch (err) {
      antlinker.configTitle.fail(err);
      console.log("iOS getNetworkType not exist");
    }
  } else if (antlinker.isAndroid) {
    try {
      androidAntLinker.ConfigTitle(JSON.stringify(request));
    } catch (err) {
      antlinker.configTitle.fail(err);
      console.log("Android getLocation not exist");
    }
  } else if (antlinker.isPC) {
    try {
      pcAntLinker.ConfigTitle(JSON.stringify(request));
    } catch (err) {
      antlinker.configTitle.fail(err);
      console.log("Android getLocation not exist");
    }
  } else {
    console.log("unknown device");
  }
};

antlinker.openNewView = function (request) {
  antlinker.openNewView.success = request.success;
  antlinker.openNewView.fail = request.fail;
  antlinker.openNewView.complete = request.complete;
  antlinker.openNewView.onSelect = request.onSelect;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.openNewView.postMessage(JSON.stringify(request));
    } catch (err) {
      antlinker.openNewView.fail(err);
      console.log("iOS openNewView not exist");
    }
  } else if (antlinker.isAndroid) {
    try {
      androidAntLinker.openNewView(JSON.stringify(request));
    } catch (err) {
      antlinker.openNewView.fail(err);
      console.log("Android openNewView not exist");
    }
  } else if (antlinker.isPC) {
    try {
      pcAntLinker.openNewView(JSON.stringify(request));
    } catch (err) {
      antlinker.openNewView.fail(err);
      console.log("Android openNewView not exist");
    }
  } else {
    console.log("unknown device");
  }

}

antlinker.jumpToNative = function (request) {
  antlinker.jumpToNative.success = request.success;
  antlinker.jumpToNative.fail = request.fail;
  antlinker.jumpToNative.complete = request.complete;
  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.jumpToNative.postMessage(JSON.stringify(request));
    } catch (err) {
      antlinker.jumpToNative.fail(err);
      console.log("iOS jumpToNative not exist");
    }
  } else if (antlinker.isAndroid) {
    try {
      androidAntLinker.JumpToNative(JSON.stringify(request));
    } catch (err) {
      antlinker.jumpToNative.fail(err);
      console.log("Android jumpToNative not exist");
    }
  } else if (antlinker.isPC) {
    try {
      pcAntLinker.jumpToNative(JSON.stringify(request));
    } catch (err) {
      antlinker.jumpToNative.fail(err);
      console.log("Android jumpToNative not exist");
    }
  } else {
    console.log("unknown device");
  }
};

antlinker.getDeviceID = function (request) {
  antlinker.getDeviceID.success = request.success;
  antlinker.getDeviceID.fail = request.fail;
  antlinker.getDeviceID.complete = request.complete;

  if (antlinker.isiOS) {
    try {
      webkit.messageHandlers.getDeviceID.postMessage(JSON.stringify(request));
    } catch (err) {
      antlinker.getDeviceID.fail(err);
      console.log("iOSgetDeviceID not exist");
    }
  } else if (antlinker.isAndroid) {
    try {
      androidAntLinker.getDeviceID(JSON.stringify(request));
    } catch (err) {
      antlinker.getDeviceID.fail(err);
      console.log("AndroidgetDeviceID  not exist");
    }
  } else if (antlinker.isPC) {
    try {
      pcAntLinker.getDeviceID(JSON.stringify(request));
    } catch (err) {
      antlinker.getDeviceID.fail(err);
      console.log("PC getDeviceID not exist");
    }
  } else {
    console.log("getDeviceID not exist")
  }

};

antlinker.uuid = function () {
  return antlinker.s4() + antlinker.s4() + '-' + antlinker.s4() + '-' + antlinker.s4() +
    '-' + antlinker.s4() + '-' + antlinker.s4() + antlinker.s4() + antlinker.s4();
};

antlinker.s4 = function () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

antlinker.closeView = function (request) {
  antlinker.closeView.success = request.success;
  antlinker.closeView.fail = request.fail;
  if (antlinker.isiOS) {
      try {
          webkit.messageHandlers.closeView.postMessage(JSON.stringify(request));
      } catch (err) {
          antlinker.closeView.fail(err);
          console.log("iOS closeView not exist");
      }
  } else if (antlinker.isAndroid) {
      try {
          androidAntLinker.closeView(JSON.stringify(request));
      } catch (err) {
          antlinker.closeView.fail(err);
          console.log("Android closeView not exist");
      }
  } else if (antlinker.isPC) {
      try {
          pcAntLinker.closeView(JSON.stringify(request));
      } catch (err) {
          antlinker.closeView.fail(err);
          console.log("Pc closeView not exist");
      }
  } else {
      console.log("unknown device");
  }
};