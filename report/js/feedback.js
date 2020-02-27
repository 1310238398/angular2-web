

//声明全局变量

//未处理的列表数组
var list_array_not = [];
//已处理的列表数组
var list_array = [];
//最后一条未处理的id
var last_id_not = "";
//最后一条已处理的id
var last_id = "";
//列表一次请求的数量
var post_conut = 10;
//用于判断当前tab
var tab_active = 'spanOne';
//保存需要提交处理的id
var deal_id = '';


//调用SDK获取token
function onload_getList1(value){
    //新增ajax请求举报信息列表
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
                Router: '/app/reporting/op/list',
                Method: 'POST',
                Body: JSON.stringify({
                    //status 状态, 0:待处理, 1:已处理, 2:已忽略,3:已恢复,4:处理中
                    //上一次返回的最后一条数据的ID
                    "status": 0,
                    "count": post_conut,
                    "lastid": last_id_not
                })
            }),
            dataType: "json",
            success: function (result) {
                console.log("请求列表1成功");

                //请求未处理的列表
                list_array_not = result.Data;

                //保存最后一条的帖子的id
                var list_length = result.Data.length;
                if(list_length > 0){
                    last_id_not = result.Data[list_length - 1].id;
                }else {
                    return;
                }
                //遍历列表
                if(list_array_not.length >0){
                    var li_not = document.getElementById("li_not_deal");
                    //循环遍历数组
                    for(var x = 0 ; x < list_array_not.length;x++){
                        if(list_array_not[x].type == 0){
                            if(list_array_not[x].post_desc.length > 12){
                                list_array_not[x].post_desc = list_array_not[x].post_desc.substring(0,12)+'...';
                            }
                            li_not.innerHTML+='<div class="content-list border-bottom-1px">'+
                                '<p class="content-list-title  post-title">'+ list_array_not[x].post_desc +'</p>'+
                                '<div class="content-list-desc">'+
                                '<p class="content-list-desc-type post-type">帖子</p>'+
                                '<div class="content-list-handel">'+
                                '<p>'+
                                '<a href="./reportPostDetails.html?'+ list_array_not[x].id +'">查看举报详情</a>'+
                                '</p>'+
                                '<p onclick="'+ "showModal('帖子',false,"+ "'" +list_array_not[x].id + "'" +')"'+ '>操作</p>'+
                                '</div>'+
                                '</p>'+
                                '</div>'+
                                '</div>'
                        }else if(list_array_not[x].type == 1){
                            if(list_array_not[x].reply_desc.length > 12){
                                list_array_not[x].reply_desc = list_array_not[x].reply_desc.substring(0,12)+'...';
                            }
                            li_not.innerHTML+= '<div class="content-list box-shadow-1px">'+
                                //'<p class="comment-desc">'+ list_array_not[x].reply_desc +'</p>'+
                                '<p class="content-list-title  comment-title">'+ list_array_not[x].reply_desc +'</p>'+
                                '<div class="content-list-desc">'+
                                '<p class="content-list-desc-type comment-type">评论</p>'+
                                '<div class="content-list-handel">'+
                                '<p>'+
                                '<a href="./reportCommentDetails.html?'+ list_array_not[x].id +'">查看举报详情</a>'+
                                '</p>'+
                                '<p onclick="'+ "showModal('评论',false,"+ "'" +list_array_not[x].id + "'" +')"'+ '>操作</p>'+
                                '</div>'+
                                '</p>'+
                                '</div>'+
                                '</div>'
                        }else {
                            if(list_array_not[x].target_uname.length > 12){
                                list_array_not[x].target_uname = list_array_not[x].target_uname.substring(0,12)+'...';
                            }
                            li_not.innerHTML+= '<div class="content-list border-bottom-1px">'+
                                '<p class="content-list-title  user-title">'+ list_array_not[x].target_uname +'</p>'+
                                '<div class="content-list-desc">'+
                                '<p class="content-list-desc-type user-type">用户</p>'+
                                '<div class="content-list-handel">'+
                                '<p>' +
                                '<a href="./reportUserDetails.html?'+ list_array_not[x].id +'">查看举报详情</a>' +
                                '</p>'+
                                '<p onclick="'+ "showModal('用户',false,"+ "'" +list_array_not[x].id + "'" +')"'+ '>操作</p>'+
                                '</div>'+
                                '</p>'+
                                '</div>'+
                                '</div>'
                        }

                    }
                }else {

                }
                if(value == "only"){

                }else{
                    onload_getList2();
                }

            },
            error: function () {
                console.log("请求列表1失败")
            }
        })
    });
}

function onload_getList2(){
    //新增ajax请求已经处理过的列表信息
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
                Router: '/app/reporting/op/list',
                Method: 'POST',
                Body: JSON.stringify({
                    //status 状态, 0:待处理, 1:已处理, 2:已忽略,3:已恢复,4:处理中
                    //上一次返回的最后一条数据的ID
                    "status": 1,
                    "count": post_conut,
                    "lastid": last_id,
                    "sort":1
                })
            }),
            dataType: "json",
            success: function (result) {
                console.log("请求列表2成功");

                //请求未处理的列表
                list_array = result.Data;

                //保存最后一条的帖子的id
                var list_length = result.Data.length;
                if(list_length > 0){
                    last_id = result.Data[list_length - 1].id;
                }else {
                    return;
                }

                var display = 'block';

                //遍历列表
                if(list_array.length >0){
                    var li_deal = document.getElementById("li_deal");
                    //循环遍历数组
                    for(var x = 0 ; x < list_array.length;x++){
                        if(list_array[x].action > 10 || list_array[x].action == 0){
                            display = 'none';
                        }else{
                            display = 'block';
                        }

                        if(list_array[x].type == 2){
                            switch (list_array[x].action)
                            {
                                case 0:
                                    list_array[x].action="已忽略";
                                    break;
                                case 1:
                                    list_array[x].action="禁言1天";
                                    break;
                                case 2:
                                    list_array[x].action="禁言1周";
                                    break;
                                case 3:
                                    list_array[x].action="禁言1月";
                                    break;
                                case 4:
                                    list_array[x].action="永久封停";
                                    break;
                                case 5:
                                    list_array[x].action="删除";
                                    break;
                                case 11:
                                    list_array[x].action="已解除禁言";
                                    break;
                                case 12:
                                    list_array[x].action="已恢复";
                                    break;
                                case 13:
                                    list_array[x].action="已恢复并解除禁言";
                                    break;
                            }
                        }else{
                            switch (list_array[x].action)
                            {
                                case 0:
                                    list_array[x].action="已忽略";
                                    break;
                                case 1:
                                    list_array[x].action="删除并禁言1天";
                                    break;
                                case 2:
                                    list_array[x].action="删除并禁言1周";
                                    break;
                                case 3:
                                    list_array[x].action="删除并禁言1月";
                                    break;
                                case 4:
                                    list_array[x].action="删除并永久封停";
                                    break;
                                case 5:
                                    list_array[x].action="删除";
                                    break;
                                case 11:
                                    list_array[x].action="已恢复";
                                    break;
                                case 12:
                                    list_array[x].action="已解除禁言";
                                    break;
                                case 13:
                                    list_array[x].action="已恢复并解除禁言";
                                    break;
                            }
                        }


                        if(list_array[x].type == 0){
                            if(list_array[x].post_desc.length > 12){
                                list_array[x].post_desc = list_array[x].post_desc.substring(0,12)+'...';
                            }
                            li_deal.innerHTML+= '<div class="content-list border-bottom-1px">'+
                                '<p class="content-list-title  post-title handle-title">'+
                                 list_array[x].post_desc +
                                '<span class="handle">'+ list_array[x].action +'</span>'+
                                '</p>'+
                                '<div class="content-list-desc">'+
                                '<p class="content-list-desc-type post-type">帖子</p>'+
                                '<div class="content-list-handel">'+
                                '<p>' +
                                '<a href="./reportPostDetails.html?'+ list_array[x].id +'">查看举报详情</a>' +
                                '</p>'+
                                '<p style="display:'+ display +'" onclick="showModal('+ "'帖子'" +',' + true + ",'" +list_array[x].id + "'" +')">恢复</p>'+
                                '</div>'+
                                '</p>'+
                                '</div>'+
                                '</div>'
                        }else if(list_array[x].type == 1){
                            if(list_array[x].reply_desc.length > 12){
                                list_array[x].reply_desc = list_array[x].reply_desc.substring(0,12)+'...';
                            }
                            li_deal.innerHTML+= '<div class="content-list box-shadow-1px">'+
                                //'<p class="comment-desc">'+ list_array[x].reply_desc +'</p>'+
                                '<p class="content-list-title  comment-title handle-title">' + list_array[x].reply_desc +
                                '<span class="handle">'+ list_array[x].action +'</span>'+
                                '</p>'+
                                '<div class="content-list-desc">'+
                                '<p class="content-list-desc-type comment-type">评论</p>'+
                                '<div class="content-list-handel">'+
                                '<p>'+
                                '<a href="./reportCommentDetails.html?'+ list_array[x].id + '">查看举报详情</a>'+
                                '</p>'+
                                '<p style="display:'+ display +'" onclick="showModal('+ "'评论'" +',' + true + ",'" + list_array[x].id + "'" + ')">恢复</p>'+
                                '</div>'+
                                '</p>'+
                                '</div>'+
                                '</div>'
                        }else {
                            if(list_array[x].target_uname.length > 12){
                                list_array[x].target_uname = list_array[x].target_uname.substring(0,12)+'...';
                            }
                            li_deal.innerHTML+= '<div class="content-list border-bottom-1px">'+
                                '<p class="content-list-title  user-title handle-title">'+ list_array[x].target_uname +
                                '<span class="handle">'+ list_array[x].action +'</span>'+
                                '</p>'+
                                '<div class="content-list-desc">'+
                                '<p class="content-list-desc-type user-type">用户</p>'+
                                '<div class="content-list-handel">'+
                                '<p>' +
                                '<a href="./reportUserDetails.html?'+ list_array[x].id + '">查看举报详情</a>' +
                                '</p>'+
                                '<p style="display:'+ display +'" onclick="showModal('+ "'用户'" +',' + true + ",'" +list_array[x].id + "'" + ')">恢复</p>'+
                                '</div>'+
                                '</p>'+
                                '</div>'+
                                '</div>'
                        }

                    }
                }else {

                }

            },
            error: function () {
                console.log("请求列表2失败")
            }
        })
    });
}

window.onresize = function () {
    // 调取
    getRem(720, 100)
};
window.onload = function () {
    getRem(720, 100)
    // tab栏=================================================================================================================================================
    var title = document.getElementById('title');
    var content = document.getElementById('content');
    var spans = title.getElementsByTagName('span');
    var lis = content.getElementsByTagName('li');
    for (var i = 0; i < spans.length; i++) {
        spans[i].index = i;
        spans[i].onclick = function () {

            //存储当前显示的tab id
            tab_active = this.id;

            //新增点击请求列表
            if(tab_active == 'spanOne'){
                last_id_not = "";
                var li_not = document.getElementById("li_not_deal");
                li_not.innerHTML = '';
                onload_getList1('only');
            }else {
                last_id = "";
                var li = document.getElementById("li_deal");
                li.innerHTML = '';
                onload_getList2();
            }


            for (var j = 0; j < spans.length; j++) {
                spans[j].className = '';
                lis[j].className = '';
            }
            // tab切换inpout Bug
            for (var item = 0;item < document.getElementsByTagName("input").length;item++) {
                document.getElementsByTagName("input")[item].removeAttribute('checked')
            }
            this.className = 'select';
            document.getElementById('imgOne').src = "./img/Untreated.png"
            document.getElementById('imgTwo').src = "./img/Alreadyprocessed.png"
            var imgUrl = this.getElementsByTagName('img')[0].attributes["src"].nodeValue
            this.getElementsByTagName('img')[0].src = './img/active' + imgUrl.substr(6, imgUrl.length)
            lis[this.index].className = 'show';
        }
    }

    onload_getList1();

    // tab栏=================================================================================================================================================
}


//移动端上拉加载
//var screenHeight = window.screen.height;
//window.onscroll = function(){
//    if(screenHeight + document.body.scrollTop >= document.body.scrollHeight){
//        setTimeout(function(){
//            //上拉执行的函数
//            getList();
//        },1000)
//    }
//}
//
//function getList(){
//    alert("上拉加载触发");
//    //onload_getList1('only');
//}

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
        if(tab_active == 'spanOne'){
            //alert("上拉加载")
            if(last_id_not == ''){
              return;
            }else {
                onload_getList1('only')
            }
        }else {
            //alert("上拉加载")
            if(last_id == ''){
                return;
            }else {
                onload_getList2();
            }
        }
    }

 }
 //-----------------结束--------------------



// id=================================================================================================================================================
//function $(id) { return document.getElementById(id) }

// rem自适应方法=================================================================================================================================================
function getRem(pwidth, prem) {
    var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth / pwidth * prem + "px";
}
// 模态框 =================================================================================================================================================
function showModal(value, type, id) {
    document.body.style.height = '100vh';
    document.body.style.width = '100vw';
    document.body.style.overflow = 'hidden';
    deal_id = id;
    if (value == '帖子') {
        document.getElementById('post_report').style.display = 'block'
        if (type) {
            document.getElementById('modal_post_show').innerHTML = handleModalShow('帖子');
        }else{
            document.getElementById('modal_post_show').innerHTML = modal_Show('帖子')
        }
    } else if (value == '评论') {
        document.getElementById('comment_report').style.display = 'block'
        if (type) {
            document.getElementById('modal_comment_show').innerHTML = handleModalShow('评论')
        }else {
            document.getElementById('modal_comment_show').innerHTML = modal_Show('评论')
        }
    } else {
        document.getElementById('user_report').style.display = 'block'
        if (type) {
            document.getElementById('user_report').style.display = 'none'
            document.getElementById('window_confirm').style.display = 'block'
            document.getElementById('occlusion').style.display = 'block';
        }else {
            document.getElementById('modal_user_show').innerHTML = modal_user_show()
        }
    }
}
function hidemodal(that) {
    that.style.display = 'none'
    document.body.style.height = 'auto'
    document.body.style.width = 'auto'
    document.body.style.overflow = 'auto'
    // tab切换inpout Bug
    var input_array = document.getElementsByTagName("input");
    for (var item; item < input_array;item++) {
        input_array[item].removeAttribute('checked')
    }
}
function stopHidemodal(event) {
    console.log('利用冒泡机制处理bug')
    event.stopPropagation();
}
// 已处理input checked提示=================================================================================================================================================
function setChecked(id, type) {
    var inputChecked = document.getElementById(id).getElementsByClassName('a-radio')
    for (var i = 0; i < inputChecked.length; i++) {
        if (type == inputChecked[i].attributes["value"].nodeValue) {
            document.getElementById(id).getElementsByClassName('a-radio')[i].setAttribute('checked', 'checked');
        }
    }
}
function modal_Show(test) {
    return `
        <div class="checkbox-center-flex">
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_post" id="" class="a-radio" value="0">
                    <span class="b-radio"></span>不予处理
                </label>
            </div>
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_post" id="" class="a-radio" value="5">
                    <span class="b-radio"></span>删${test}
                </label>
            </div>
        </div>
        <div class="checkbox-center-flex">
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_post" id="" class="a-radio" value="1">
                    <span class="b-radio"></span>删${test}禁言一天
                </label>
            </div>
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_post" id="" class="a-radio" value="2">
                    <span class="b-radio"></span>删${test}禁言一星期
                </label>
            </div>
        </div>
        <div class="checkbox-center-flex-no checkbox-center-flex">
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_post" id="" class="a-radio" value="3">
                    <span class="b-radio"></span>删${test}禁言一个月
                </label>
            </div>
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_post" id="" class="a-radio" value="4">
                    <span class="b-radio"></span>删${test}永久禁言
                </label>
            </div>
        </div>
        `
}

function modal_user_show() {
    return `
        <div class="checkbox-center-flex">
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_user" id="" class="a-radio" value="0">
                    <span class="b-radio"></span>不予处理
                </label>
            </div>
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_user" id="" class="a-radio" value="1">
                    <span class="b-radio"></span>禁言一天
                </label>
            </div>
        </div>
        <div class="checkbox-center-flex">
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_user" id="" class="a-radio" value="2">
                    <span class="b-radio"></span>禁言一星期
                </label>
            </div>
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_user" id="" class="a-radio" value="3">
                    <span class="b-radio"></span>禁言一个月
                </label>
            </div>
        </div>
        <div class="checkbox-center-flex-no">
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_user" id="" class="a-radio" value="4">
                    <span class="b-radio"></span>永久禁言
                </label>
            </div>
        </div>
    `
}

//恢复操作
function handleModalShow(test) {
    return `
        <div class="checkbox-center-flex">
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_post" id="" class="a-radio" value="12">
                    <span class="b-radio"></span>取消禁言
                </label>
            </div>
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_post" id="" class="a-radio" value="11">
                    <span class="b-radio"></span>恢复${test}
                </label>
            </div>
        </div>
        <div class="checkbox-center-flex-no">
            <div class="checkbox-center-col">
                <label>
                    <input type="radio" name="handle_post" id="" class="a-radio" value="13">
                    <span class="b-radio"></span>恢复${test}并取消禁言
                </label>
            </div>
        </div>
    `
}

//举报帖子处理  举报评论处理
function submit_post(m){
    var type = 0;
    var action = 0;
    if(m == 'post'){
        type = 0;
    }else if(m == 'comment'){
        type = 1;
    }else {
        type = 2;
    }
    var flag = false;

    if(type == 2){
        var chose = document.getElementsByName("handle_user");
    }else{
        var chose = document.getElementsByName("handle_post");
    }

    for(var i = 0 ;i< chose.length;i++){
        if(chose[i].checked){
            flag = true;
            action = parseInt(chose[i].value);
            break;
        }
    }


    if(flag == false){
        alert("请选择至少一项")
    }else{
        var router = '';
        if(tab_active == 'spanOne'){
            router = "/app/reporting/op/operate"
        }else {
            router = "/app/reporting/op/recover"
        }
        //执行请求操作
        //alert(action+" "+deal_id);
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
                    Router: router,
                    Method: 'POST',
                    Body: JSON.stringify({
                        //action 状态,  0: 忽略, 1: 删除禁言1天, 2: 删除禁言1周, 3: 删除禁言1月, 4: 删除永久封停, 5: 删除
                        "reporting_id": deal_id,
                        "action": action
                    })
                }),
                dataType: "json",
                success: function (result) {
                    if(tab_active == 'spanOne'){
                        last_id_not = '';
                        list_array_not = [];
                        var li_not = document.getElementById("li_not_deal");
                        li_not.innerHTML = '';
                        onload_getList1();
                    }else {
                        last_id = '';
                        list_array = [];
                        var li = document.getElementById("li_deal");
                        li.innerHTML = '';
                        onload_getList2();
                    }

                    //关闭模态窗
                    if(m == 'post'){
                        var hidden_obj = document.getElementById("post_report");
                    }else if(m == 'comment'){
                        var hidden_obj = document.getElementById("comment_report");
                    }else {
                        var hidden_obj = document.getElementById("user_report");
                    }
                    hidemodal(hidden_obj);

                    setTimeout(function(){
                        //根据RE判断是否处理成功
                        if( result.RE == 0 ){
                            alert("处理成功")
                        }else {
                            alert(result.Text)
                        }

                        //if(tab_active == 'spanOne'){
                        //    last_id = '';
                        //    list_array = [];
                        //    document.getElementById("li_deal").innerHTML = '';
                        //    onload_getList2();
                        //}else {
                        //    last_id_not = '';
                        //    list_array_not = [];
                        //    document.getElementById("li_not_deal").innerHTML = '';
                        //    onload_getList1();
                        //}


                    },500)
                },
                error: function () {
                    console.log("操作失败")
                }
            })
        });
    }
}


//举报用户处理
function submit_user(){

}


function userThen() {
    //向服务器发送请求
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
                Router: '/app/reporting/op/recover',
                Method: 'POST',
                Body: JSON.stringify({
                    //action 状态,
                    "reporting_id": deal_id,
                    "action": 12
                })
            }),
            dataType: "json",
            success: function (result) {
                //隐藏弹窗
                document.getElementById('window_confirm').style.display = 'none'
                document.getElementById('occlusion').style.display = 'none';

                    //重置列表2 加载
                    last_id = '';
                    list_array = '';
                    var li = document.getElementById("li_deal");
                    li.innerHTML = '';
                    onload_getList2();

                setTimeout(function(){
                    //根据RE判断是否处理成功
                    if( result.RE == 0 ){
                        alert("恢复成功")
                    }else {
                        alert(result.Text)
                    }

                },500)
            },
            error: function () {
                console.log("操作失败")
            }
        })
    });



}

function userCatch() {
    document.getElementById('window_confirm').style.display = 'none'
    document.getElementById('occlusion').style.display = 'none';
}