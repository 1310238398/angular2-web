/**
 * Created by pillars on 2018/4/12.
 */

function cannot_see(_this){
    var _reason = "";
    var uid = _this.previousSibling.id;
    //alert(uid)
    var mengban = document.getElementById("mengban");
    var hulve_func = document.getElementById("hulve_func");
    //var hulve = document.getElementById("hulve");
    //var hulve_ok = document.getElementById("hulve_ok");
    var rc = document.getElementById("radio_container");

    mengban.style.display = "block";
    hulve_func.style.display = "block";

    mengban.onclick = function(){
        hulve_func.style.display = "none";
        mengban.style.display = "none";
        _this.style.display = "none";
        _this.nextSibling.style.display = "block";
        //hulve_ok.style.display = "block";
        $.ajax({
            type: "POST",
            url: "/api/appsrv/interface",
            beforeSend: function (request) {
                var a = window["__AppWebkey"];
                var new_token = a.split("ACKEY_")[1];
                request.setRequestHeader("AccessToken", new_token);
            },
            data: JSON.stringify({
                Router: '/app/itemlostfound/owner/action',
                Method: 'POST',
                Body: JSON.stringify({"_id":uid,"ignored":true,"ignored_reason":_reason})
            }),
            dataType: "json",
            success: function (result) {

            },
            error: function () {
                alert("获取数据失败")
            }
        })
    }
    hulve_func.onclick = function(){
        hulve_func.style.display = "none";
        mengban.style.display = "none";
        _this.style.display = "none";
        _this.nextSibling.style.display = "block";
        //hulve_ok.style.display = "block";

        var a = document.getElementsByName("radio_chose");
        for (i = 0; i < a.length; i++) {
            if (a[i].checked) {
                //alert(a[i].value)
                _reason = a[i].value;
            }
        }
        //alert(_reason);
        $.ajax({
            type: "POST",
            url: "/api/appsrv/interface",
            beforeSend: function (request) {
                var a = window["__AppWebkey"];
                var new_token = a.split("ACKEY_")[1];
                request.setRequestHeader("AccessToken", new_token);
            },
            data: JSON.stringify({
                Router: '/app/itemlostfound/owner/action',
                Method: 'POST',
                Body: JSON.stringify({"_id":uid,"ignored":true,"ignored_reason":_reason})
            }),
            dataType: "json",
            success: function (result) {

            },
            error: function () {
                alert("获取数据失败")
            }
        })
    }
    //                获取选中的标签





}

function lx_tel(_this){
    //alert(_this.id)
    var u_id = _this.parentNode.id;
    //alert(u_id);
    antlinker.onTel({
        tel:_this.id,
        text:"您确定要拨打电话吗?",
        success:function(){

        },
        fail:function(){

        }
    })
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
            data: JSON.stringify({
                Router: '/app/itemlostfound/owner/action',
                Method: 'POST',
                Body: JSON.stringify({"_id":u_id,"contacted":true})
            }),
            dataType: "json",
            success: function (result) {

            },
            error: function () {
                alert("发送数据失败")
            }
        })
    })
    _this.innerHTML = "已联系";
}


function req(){
    $.ajax({
        type: "POST",
        url: "/api/appsrv/interface",
        beforeSend: function (request) {
            var a = window["__AppWebkey"];
            var new_token = a.split("ACKEY_")[1];
            request.setRequestHeader("AccessToken", new_token);
        },
        data: JSON.stringify({
            Router: '/app/itemlostfound/items/get',
            Method: 'POST',
            Body: JSON.stringify({"action": "ALL"})
        }),
        dataType: "json",
        success: function (result) {
            //判断是否访问成功
            //alert("chenggong");
            //alert(result.Data[1].contacted);
            //alert(result.Data[2].ignored);
            if(result.RE == 0){
                var main_container = document.getElementById("main_container");
                for (var i = 0; i < result.Data.length; i++) {
                    var div_inner = document.createElement('div');
                    div_inner.className += 'tongzhi';
                    if (result.Data[i]._id) {
                        if(result.Data[i].contacted == "联系"){
                            if(result.Data[i].ignored == "忽略"){
                                div_inner.innerHTML +=
                                    '<div class="tongzhi_top">你丢失的'+result.Data[i].name+'已经被其他同学捡到，他也在着急找你哦，不要拖太久，快联系他取回吧~ </div>'
                                    +'<div class="fenge"></div>'
                                    +'<div class="bottombar_container">'
                                    +'<div class="time">'+result.Data[i].notify_time+'</div>'
                                    +'<div class="lianxi" id="'+result.Data[i]._id+'">'
                                    +'<div class="lianxi_inner" id="'+result.Data[i].finder_phone+'" onclick="lx_tel(this)">联系他</div>'
                                    +'<img src="img/icon_call@2x.png" alt=""></div>'
                                    +'<div class="hul" onclick="cannot_see(this)">忽略</div>'
                                    +'<div class="hul none">已忽略</div>'
                                    +'</div>'
                            }
                            else {
                                div_inner.innerHTML +=
                                    '<div class="tongzhi_top">你丢失的'+result.Data[i].name+'已经被其他同学捡到，他也在着急找你哦，不要拖太久，快联系他取回吧~ </div>'
                                    +'<div class="fenge"></div>'
                                    +'<div class="bottombar_container">'
                                    +'<div class="time">'+result.Data[i].notify_time+'</div>'
                                    +'<div class="lianxi" id="'+result.Data[i]._id+'">'
                                    +'<div class="lianxi_inner" id="'+result.Data[i].finder_phone+'" onclick="lx_tel(this)">联系他</div>'
                                    +'<img src="img/icon_call@2x.png" alt=""></div>'
                                    +'<div class="hul">已忽略</div>'
                                    +'</div>'
                            }
                        }else {
                            if(result.Data[i].ignored == "忽略"){
                                div_inner.innerHTML +=
                                    '<div class="tongzhi_top">你丢失的'+result.Data[i].name+'已经被其他同学捡到，他也在着急找你哦，不要拖太久，快联系他取回吧~ </div>'
                                    +'<div class="fenge"></div>'
                                    +'<div class="bottombar_container">'
                                    +'<div class="time">'+result.Data[i].notify_time+'</div>'
                                    +'<div class="lianxi" id="'+result.Data[i]._id+'">'
                                    +'<div class="lianxi_inner" id="'+result.Data[i].finder_phone+'" onclick="lx_tel(this)">已联系</div>'
                                    +'<img src="img/icon_call@2x.png" alt=""></div>'
                                    +'<div class="hul" onclick="cannot_see(this)">忽略</div>'
                                    +'<div class="hul none">已忽略</div>'
                                    +'</div>'
                            }
                            else {
                                div_inner.innerHTML +=
                                    '<div class="tongzhi_top">你丢失的'+result.Data[i].name+'已经被其他同学捡到，他也在着急找你哦，不要拖太久，快联系他取回吧~ </div>'
                                    +'<div class="fenge"></div>'
                                    +'<div class="bottombar_container">'
                                    +'<div class="time">'+result.Data[i].notify_time+'</div>'
                                    +'<div class="lianxi" id="'+result.Data[i]._id+'">'
                                    +'<div class="lianxi_inner" id="'+result.Data[i].finder_phone+'" onclick="lx_tel(this)">已联系</div>'
                                    +'<img src="img/icon_call@2x.png" alt=""></div>'
                                    +'<div class="hul">已忽略</div>'
                                    +'</div>'
                            }
                        }


//                                判断忽略状态
//                        if(result.Data[i].ignored == "忽略"){
//                            div_inner.innerHTML +='<div class="hul" onclick="cannot_see(this)">忽略</div>'
//                                +'<div class="hul">已忽略</div>'
//                                +'</div>'
//                        }else{
//                            div_inner.innerHTML +='<div class="hul">已忽略</div></div>'
//                        }
                    }
//                                判断联系状态

                    main_container.appendChild(div_inner);
                }
            }else {
                alert(result.Text);
            }
        },
        error: function () {
            alert("获取数据失败")
        }
    })


}

