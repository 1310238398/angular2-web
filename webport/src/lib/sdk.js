/**
 * Created by hanzhendong on 18/09/20.
 */


var sdk = Object();
window.antlinker = Object();
antlinker.isPC = true;
window.pcAntLinker = Object();

var apiList = ["getAppVersion", "getSdkVersion"];
//
sdk.configure = (platform) => {
    antlinker.isPC = true;
    pcAntLinker.GetAppVersion = function(res) {
        var request = JSON.parse(res);
        var version = {
            "Version": "1.0.0"
        };
        antlinker.getAppVersion.success(version);
        antlinker.getAppVersion.complete();
    };
    pcAntLinker.getNetWorkInfo = function(res) {
        var response = {
            isNetAvailable: 'true'
        };
        antlinker.getNetWorkInfo.success(response);
    };


    pcAntLinker.GetAvailableApi = function(res) {
        antlinker.getAvailableApi.success(apiList);
        antlinker.getAvailableApi.complete();
    }
    pcAntLinker.GetUserBasicInfo = function(res) {
        var user = {};
        antlinker.getUserBasicInfo.success(user);
    };
    pcAntLinker.getEffectiveWebkey = {};
    pcAntLinker.getEffectiveWebkey.postMessage = function(res) {
        var key = {
            WebKey: 'O_ST2VSMMK2GIWFDKVRNIG'
        }
        setTimeout(antlinker.getEffectiveWebkey.success(key), 10);
        //antlinker.getUserBasicInfo.success(user);
    };
};

export default sdk;