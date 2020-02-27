/**
 * Created by pillars on 2018/10/18.
 */

//声明全局变量

//最后一条信息的id
var last_id = '';
//一次请求的数量控制
var count = 10;
//列表数组
var list_arr = [];
//请求id
var detail_id = '';
//被举报用户主页uri
var report_uri = '';

window.onload = function(){
    getRem(720, 100);



    //获取帖子id
    detail_id = window.location.href.split("?")[1];

    loadlist();

}

//请求详情列表
function loadlist(){
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
            //async:false,
            data: JSON.stringify({
                Router: '/app/reporting/op/detail/list',
                Method: 'POST',
                Body: JSON.stringify({
                    "id": detail_id,
                    "count":count,
                    "lastid":last_id
                })
            }),
            dataType: "json",
            success: function (result) {
                console.log(result.Text);

                //用户主页uri
                report_uri = "ant://contacts/userdetails/open?UID=" + result.Data.report.target_uid;

                var title = document.getElementById("title");
                title.innerHTML = result.Data.report.target_uname;

                list_arr = result.Data.reasons;

                //判断列表数据  赋值最后一条id
                var list_length = result.Data.reasons.length;
                if(list_length > 0){
                    last_id = result.Data.reasons[list_length - 1].id;
                }else {
                    return;
                }

                //遍历数组
                if(list_length > 0){
                    var list = document.getElementById("list");
                    for(var i = 0 ; i < list_arr.length; i++ ){

                        //遍历添加节点
                        var a = '';
                        if(list_arr[i].media.length > 0){
                            for(var x = 0;x < list_arr[i].media.length;x++ )
                             a+= '<div class="div_img_container"><img onclick="show_big_view(this)" src="'+ url_head + '/'+ list_arr[i].media[x].url +'" alt=""></div>'
                        }

                        if(list_arr[i].media.length == 0){
                            //没有上传图片的处理
                            list.innerHTML+='<div class="comment-user-list">'+
                                '<div style="padding: 0px;">'+
                                '<p class="username">'+ list_arr[i].uname +'</p>'+
                                //new Date(list_arr[i].create_time * 1000).toLocaleTimeString()
                                '<p class="time">'+ formatDate(list_arr[i].create_time * 1000) +'</p>'+
                                '</div>'+
                                '<div class="comment-desc" style="border-bottom: 0px;padding-bottom: 0px;">'+
                                list_arr[i].type.join("、") +
                                '</div>'+
                                '<div class="comment-desc" style="margin-top: 5px">'+
                                list_arr[i].desc +
                                '</div>'+
                                '</div>'
                        }else{
                            //有上传图片的处理
                            list.innerHTML+='<div class="comment-user-list">'+
                                '<div style="padding: 0px;">'+
                                '<p class="username">'+ list_arr[i].uname +'</p>'+
                                '<p class="time">'+ formatDate(list_arr[i].create_time * 1000) +'</p>'+
                                '</div>'+
                                '<div class="comment-desc" style="border-bottom: 0px;padding-bottom: 0px;">'+
                                list_arr[i].type.join("、") +
                                '</div>'+
                                '<div class="comment-desc" style="margin-top: 5px;border-bottom: 0px;">'+
                                list_arr[i].desc +
                                '</div>'+
                                '<div class="comment-desc" style="margin-top: 0px;height: auto;">'+
                                    a +
                                '<div style="clear:both"></div>'+
                                '</div>'+
                                '</div>'
                        }



                    }
                }



            },
            error: function () {
                alert("请求失败")
            }
        })
    });
}

// rem自适应方法=================================================================================================================================================
function getRem(pwidth, prem) {
    var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth / pwidth * prem + "px";
}

//--------------上拉加载更多---------------
// 获取滚动条当前的位置
function getScrollTop() {
    var scrollTop = 0;
    if(document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if(document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

//获取当前可视范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if(document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

//获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

//滚动事件触发
window.onscroll = function() {
    if(getScrollTop() + getClientHeight() == getScrollHeight()) {

            //alert("上拉加载")
            if(last_id == ''){
                return;
            }else {
                loadlist();
            }

    }
}
//-----------------结束--------------------

function jump_uri(){

    //var a = "ant://square/post/open?detailID=" + report_id
    antlinker.openNewView({
        uri: report_uri,
        fail: function () {
        }
    });

}


//显示图片大图
function show_big_view(_this){
    var img_modal = document.getElementById("img_modal");
    var show_img_big = document.getElementById("show_img_big");
    show_img_big.src = _this.src;
    img_modal.style.display = "table";
}

//隐藏大图窗口
function hidden_modal(){
    var img_modal = document.getElementById("img_modal");
    img_modal.style.display = "none";
}

//时间格式
function formatDate(time){
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    if(min < 10){
        min = '0' + min ;
    }
    if(sec < 10){
        sec = '0' + sec ;
    }
    var newTime =
        //year + '-' + month + '-' + day + ' ' +
        hour + ':' +
        min + ':' +
        sec;
    return newTime;
}
