window.addEventListener('message', function (messageEvent) {
    var data = messageEvent.data;
    window['__AppWebkey'] = data || '';
}, false);
var obj = {UID: 'antlinker'};
antlinker.exeUserBasicInfoSdk(obj, function (obj, success) {
    s = document.createElement("script");
    setTimeout(() => {
        s.setAttribute("src", "main.js");
        document.body.appendChild(s);
    }, 500)
});
