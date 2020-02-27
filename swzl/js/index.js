/**
 * Created by pillars on 2018/4/8.
 */
var uid__owner = 0;
var phone_finder = 0;
//修改span的点击样式
function span_chose() {
    var sp = document.getElementsByTagName("span");
//            console.log(sp.length)
    for (var i = 1; i < sp.length; i++) {
        sp[i].onclick = function () {
            for (var a = 1; a < sp.length; a++) {
                sp[a].className = "target_span";
            }
            this.className = "target_span_chose";
            var input_num = document.getElementById("stu_input");
            var stu_div = document.getElementById("stu_div");
            var stu_div_send = document.getElementById("stu_div_send");
            if(input_num.value == ""){
                stu_div.style.display = "block";
                stu_div_send.style.display = "none";
            }else {
                stu_div.style.display = "none";
                stu_div_send.style.display = "block";
            }
        }
    }
}

function input_change() {
    var stu_input = document.getElementById("stu_input");
    var span_chose = document.getElementsByClassName("target_span_chose")[0];
//            console.log(stu_input.value);
    var stu_div = document.getElementById("stu_div");
    var stu_div_send = document.getElementById("stu_div_send");
//            console.log(span_chose.innerHTML);
    if (stu_input.value !== "" && span_chose) {
        stu_div.style.display = "none";
        stu_div_send.style.display = "block";
    } else {
        stu_div.style.display = "block";
        stu_div_send.style.display = "none";
    }
}
//发送函数
function stu_div_send() {
    var span_chose = document.getElementsByClassName("target_span_chose")[0];
//            console.log(span_chose.innerHTML);
    var stu_input = document.getElementById("stu_input");
//            console.log(stu_input.value);
    var obj = {};
    antlinker.exeUserBasicInfoSdk(obj,function(obj,success){
        $.ajax({
            type: "POST",
            url: "/api/appsrv/interface",
            beforeSend: function (request) {
                var a = window["__AppWebkey"];
                //alert("webkey"+a);
                var new_token = a.split("ACKEY_")[1];
                request.setRequestHeader("AccessToken", new_token);
            },
            data: JSON.stringify({
                Router: '/app/itemlostfound/new',
                Method: 'POST',
                Body: JSON.stringify({"item_name": span_chose.innerHTML,"owner_user_code":stu_input.value})
            }),
            dataType: "json",
            success: function (result) {
                //判断是否访问成功
                if(result.RE == 0){
                    //判断访问成功后的返回状态码
                    if(result.Data.status_code == 0){
                        //赋值给全局变量

                        uid__owner = result.Data.owner_uid;
                        phone_finder = result.Data.finder_phone;

                            var tel = result.Data.finder_phone;
                            //var tel_a = tel.substring(0,3);
                            //var tel_b = tel.substring(3,7);
                            //var tel_c = tel.substring(7,11);
                            var telephone = document.getElementById("telephone");
                            telephone.innerHTML = tel.substring(0,3)+" "+tel.substring(3,7)+" "+tel.substring(7,11);
                            var mengban = document.getElementById("mengban");
                            var alert_div = document.getElementById("alert_div");
                            mengban.style.display = "block";
                            alert_div.style.display = "block";

                    }
                    else if(result.Data.status_code == 2){
                        alert("每日最多可发送"+result.Data.limit_times+"条");
                    }
                    else if(result.Data.status_code == 3){
                        alert("此物品的丢失信息已发送，请稍后再试");
                    }else if(result.Data.status_code == 1){
                        alert("未找到相关同学，他可能不是集结号的用户。请检查输入的准确性或尝试其他失物招领渠道")
                    }else if(result.Data.status_code == 4){
                        alert("该用户未绑定手机号")
                    }else if(result.Data.status_code == 5){
                        alert("用户不可向自己发送招领信息")
                    }
                }else {
                    alert(result.Text)
                }
            },
            error: function () {
                alert("获取数据失败")
            }
        })
    });


    //function hide_div(){
    //    alert_div2.style.display = "none";
    //
    //    var mengban = document.getElementById("mengban");
    //    var alert_div = document.getElementById("alert_div");
    //    mengban.style.display = "block";
    //    alert_div.style.display = "block";
    //
    //    var span_chose = document.getElementsByClassName("target_span_chose")[0];
    //    var stu_input = document.getElementById("stu_input");
    //}
    //setTimeout(hide_div,5000);



}
//取消函数
function qx_func() {
    var mengban = document.getElementById("mengban");
    var alert_div = document.getElementById("alert_div");
    mengban.style.display = "none";
    alert_div.style.display = "none";

    //要发送的参数
    var span_chose = document.getElementsByClassName("target_span_chose")[0];
//            console.log(span_chose.innerHTML);
    var stu_input = document.getElementById("stu_input");
//            console.log(stu_input.value);

    //发送请求
    var obj = {};
    antlinker.exeUserBasicInfoSdk(obj,function(obj,success){
        if(uid__owner == 0 || phone_finder == 0){

        }else{
            $.ajax({
                type: "POST",
                url: "/api/appsrv/interface",
                beforeSend: function (request) {
                    var a = window["__AppWebkey"];
                    var new_token = a.split("ACKEY_")[1];
                    request.setRequestHeader("AccessToken", new_token);
                },
                data: JSON.stringify({
                    Router: '/app/itemlostfound/sendmsg',
                    Method: 'POST',
                    Body: JSON.stringify({"item_name": span_chose.innerHTML,"owner_uid":uid__owner,"finder_phone":phone_finder,"cancel":true})
                }),
                dataType: "json",
                success: function (result) {
                    //判断是否访问成功
                    if(result.RE == 0){
                        if(result.Data.status_code == 0){
                            //alert(result.Data.status_msg);
                            //setTimeout("javascript:location.href='tongzhi1.html'", 1000);

                        }else{
                            alert(result.Data.status_msg);
                        }
                    }else{
                        alert(result.Text)
                    }

                },
                error: function () {
                    alert("获取数据失败")
                }
            })
        }

    });
}
//下一步函数
function next_func() {
    //控制动画弹窗

    var mengban = document.getElementById("mengban");
    var alert_div = document.getElementById("alert_div");
    mengban.style.display = "none";
    alert_div.style.display = "none";

    //要发送的参数
    var span_chose = document.getElementsByClassName("target_span_chose")[0];
//            console.log(span_chose.innerHTML);
    var stu_input = document.getElementById("stu_input");
//            console.log(stu_input.value);


    //发送请求
    var obj = {};
    antlinker.exeUserBasicInfoSdk(obj,function(obj,success){
        if(uid__owner == 0 || phone_finder == 0){

        }else{
            $.ajax({
                type: "POST",
                url: "/api/appsrv/interface",
                beforeSend: function (request) {
                    var a = window["__AppWebkey"];
                    var new_token = a.split("ACKEY_")[1];
                    request.setRequestHeader("AccessToken", new_token);
                },
                data: JSON.stringify({
                    Router: '/app/itemlostfound/sendmsg',
                    Method: 'POST',
                    Body: JSON.stringify({"item_name": span_chose.innerHTML,"owner_uid":uid__owner,"finder_phone":phone_finder })
                }),
                dataType: "json",
                success: function (result) {
                    //判断是否访问成功
                    if(result.RE == 0){
                        if(result.Data.status_code == "0"){
                            var alert_div2 = document.getElementById("alert_div2");
                            alert_div2.style.display = "block";
                            setTimeout(function(){
                                alert_div2.style.display = "none";
                                var tel = result.Data.finder_phone;
                                //var tel_a = tel.substring(0,3);
                                //var tel_b = tel.substring(3,7);
                                //var tel_c = tel.substring(7,11);
                                var telephone = document.getElementById("telephone");
                                telephone.innerHTML = tel.substring(0,3)+" "+tel.substring(3,7)+" "+tel.substring(7,11);
                                var mengban = document.getElementById("mengban");
                                var alert_div = document.getElementById("alert_div");
                                mengban.style.display = "block";
                                alert_div.style.display = "block";
                            },2000);
                            setTimeout("javascript:location.href='tongzhi1.html'",2000);
                        }else {
                            alert(result.Data.status_msg);
                        }
                    }else {
                        alert(result.Text)
                    }

                },
                error: function () {
                    alert("获取数据失败")
                }
            })
        }

    });

}

function my_ds(){
    //javascript:location.href='tongzhi2.html';
    //document.title = "test";

    window.location.href='tongzhi2.html';
   // setTimeout("javascript:location.href='tongzhi2.html?time=new Date()'", 100);
   // setTimeout("javascript:location.href='tongzhi2.html?time=new Date()'", 100);
}

function span_num(){
    $.ajax({
        type: "POST",
        url: "/api/appsrv/interface",
        beforeSend: function (request) {
            var a = window["__AppWebkey"];
            var new_token = a.split("ACKEY_")[1];
            request.setRequestHeader("AccessToken", new_token);
        },
        data: JSON.stringify({
            Router: 'app/itemlostfound/times/success',
            Method: 'GET',
            Body: JSON.stringify({})
        }),
        dataType: "json",
        success: function (result) {
            //判断是否访问成功
            if(result.RE == 0){
                if(result.Data !== ""){
                 document.getElementById("count").innerHTML = result.Data;
                }
            }

        },
        error: function () {
            alert("获取数据失败")
        }
    })
}
