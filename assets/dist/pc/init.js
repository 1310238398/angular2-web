if (!antlinker) {
    console.error('jssdk尚未加载!')
}

function initWeb(op) {
    var option = {};
    option.message = op.message || true;
    option.file = op.file || 'main.js';
    option.delayTime = op.delayTime || 400;
    if (option.message) {
        window.addEventListener('message', function (messageEvent) {
            var data = messageEvent.data;
            if (typeof data == 'string') {
                window['__AppWebkey'] = data;
            }
        }, false);
    }
    var obj = {UID: 'antlinker'};
    if (antlinker.isPC) {
        obj = {};
    }
    antlinker.exeUserBasicInfoSdk(obj, function (obj, success) {
        s = document.createElement("script");
        setTimeout(function () {
            s.setAttribute("src", option.file);
            document.body.appendChild(s);
        }, option.delayTime)
    })
}
