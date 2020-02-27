
window.onload = function () {

    //获取帖子id
    var report_post_id  = window.location.href.split("?")[1];

    // 调取
    getRem(720, 100)
    // 提交状态
    formState()
    // 输入
    document.getElementById('detailedContent').oninput = function (e) {
        formState()
    }
    document.getElementById('button_submit').onclick = function () {
        var ifToast = formState()
        if (ifToast) {
            toast("请选择举报原因")
        }else{
            //保存举报内容
            var detail_desc = document.getElementById("detailedContent").value;

            //保存举报类型
            if(rubbish != ''){
                post_arr.push(rubbish);
            }
            if(unrealistic != ''){
                post_arr.push(unrealistic);
            }
            if(harmful != ''){
                post_arr.push(harmful);
            }
            if(Illegality != ''){
                post_arr.push(Illegality);
            }
            if(obscene != ''){
                post_arr.push(obscene);
            }
            if(attack != ''){
                post_arr.push(attack);
            }
            //if(plagiarism != ''){
            //    post_arr.push(plagiarism);
            //}
            if(other != ''){
                post_arr.push(other);
            }

            //新增
            var obj = {};
            antlinker.exeUserBasicInfoSdk(obj,function(obj,success){
                $.ajax({
                    type: "POST",
                    url: "/api/appsrv/interface",
                    beforeSend: function (request) {
                        var a = window["__AppWebkey"];
                        var new_token = a.split("ACKEY_")[1];
                        request.setRequestHeader("AccessToken", new_token);
                    },
                    //async:false,
                    data: JSON.stringify({
                        Router: '/app/reporting/new',
                        Method: 'POST',
                        Body: JSON.stringify({
                            "type": 2,
                            "target_uid": report_post_id,
                            "reason_type": post_arr,
                            "reason_desc": detail_desc,
                            "reason_images": saveArr
                        })
                    }),
                    dataType: "json",
                    success: function (result) {
                        if(result.RE == 0){
                            alert("举报成功,感谢您的反馈");
                        }else{
                            alert(result.Text);
                        }
                        antlinker.closeView({
                            success: function () {
                            },
                            fail: function () {
                            }
                        });
                    },
                    error: function () {
                        alert("请求失败")
                    }
                })
            });
        }
    }
}
window.onresize = function () {
    // 调取
    getRem(720, 100)
};
// rem==自适应方法
function getRem(pwidth, prem) {
    var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth / pwidth * prem + "px";
}

// 垃圾营销
var rubbish = '';
// 不实信息
var unrealistic = '';
// 有害信息
var harmful = '';
// 违法信息
var Illegality = '';
// 淫秽色情
var obscene = '';
// 人身攻击我
var attack = '';
// 抄袭我的内容
//var plagiarism = '';
// 其他
var other = '';

// 举报原因code  仅用于向后台发送
var post_arr = [];

// 判断为空
function handelChangge(that, value) {
    if (that.checked) {
        switch (value) {
            case "rubbish":
                rubbish = '垃圾营销';
                break;
            case "unrealistic":
                unrealistic = '不实信息';
                break;
            case "harmful":
                harmful = '有害信息';
                break;
            case "Illegality":
                Illegality = '违法信息';
                break;
            case "obscene":
                obscene = '淫秽色情';
                break;
            case "attack":
                attack = '人身攻击我';
                break;
            //case "plagiarism":
            //    plagiarism = '抄袭我的内容';
            //    break;
            case "other":
                other = '其他';
                break;
        }
    } else {
        switch (value) {
            case "rubbish":
                rubbish = '';
                break;
            case "unrealistic":
                unrealistic = '';
                break;
            case "harmful":
                harmful = '';
                break;
            case "Illegality":
                Illegality = '';
                break;
            case "obscene":
                obscene = '';
                break;
            case "attack":
                attack = '';
                break;
            //case "plagiarism":
            //    plagiarism = '';
            //    break;
            case "other":
                other = '';
                break;
        }
    }
    formState()
}

// id封装
//function $(id) {
//    return document.getElementById(id)
//}

// 提交检验
function formState() {
    //var detailedContent = document.getElementById("detailedContent");
    //detail_desc.value 暂时不做判断
    if (rubbish == '' && unrealistic == '' && harmful == '' && Illegality == '' && obscene == '' && attack == '' && other == '') {
        document.getElementById('button_submit').style.background = '#FDD86A'
        return true;
    } else {
        document.getElementById('button_submit').style.background = '#FFC000'
        return false;
    }
}
// 点击提交
//function formSend(){
//    if (rubbish == 0 && unrealistic == 0 && harmful == 0 && Illegality == 0 && obscene == 0 && attack == 0 && other == 0 && detailedContent.value == '') {
//        return;
//    } else {
//
//
//    }
//}

// toast
function toast(msg) {
    setTimeout(function () {
        document.getElementsByClassName('toast-wrap')[0].getElementsByClassName('toast-msg')[0].innerHTML = msg;
        var toastTag = document.getElementsByClassName('toast-wrap')[0];
        toastTag.className = toastTag.className.replace('toastAnimate', '');
        setTimeout(function () {
            toastTag.className = toastTag.className + ' toastAnimate';
        }, 100);
    }, 500);
}



