/**
 * Created by pillars on 2018/4/3.
 */
//请求数据
function req_body() {
    //ajax提交请求
    var article_id = window.location.href.split("?")[1];

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
            Router: '/app/article/drafts/one',
            Method: 'POST',
            Body: JSON.stringify({"ID": article_id})
        }),
        dataType: "json",
        success: function (result) {
            alert("成功")
            console.log(result);
//                    对数据做处理
            if(result.Data.Backdrop.ID && result.Data.Backdrop.URL){
                document.body.style.backgroundImage = "url(" + result.Data.Backdrop.URL + ")";
                document.getElementById("theme").href = "css/" + result.Data.Backdrop.ID;
            }else{

            }

            //标题图片渲染
            var topic = document.getElementById("topic");
            var introduce = document.getElementById("introduce");
            if (result.Data.CoverURL && result.Data.Title) {
                topic.innerHTML = '<div class="zhezhao"></div><img id="fengmian" src="https://pubdev.xiaoyuanjijiehao.com/' + result.Data.CoverURL + '" alt="">' +
                    '<div id="topic_div">' + result.Data.Title + '</div>'
                //alert("进入创建封面和标题处理")
            }

            if (result.Data.Abstract) {
                introduce.innerHTML = result.Data.Abstract;
            }

            var div = document.getElementById("json_content");
            div.innerHTML = '';
            //渲染出音乐栏
            if (result.Data.BGM.URL) {
                var div_inner = document.createElement('div');
                div_inner.className += 'jsoncontainer_Class';
                div_inner.innerHTML += '<div class="music">' +
                    '<img id="music_img" src="img/bofang@3x.png" alt="" onclick="dom_audio()">' +
                    '<div class="song_name">' + result.Data.BGM.Name + '</div>' +
                    '<div style="float: left">' +
                    '<audio id="audio" src="' + result.Data.BGM.URL + '" loop="loop"></audio>' +
                    '</div>' +
                    '</div>';
                div.appendChild(div_inner);

            }
            //遍历内容SectionIDs
            for (var i = 0; i < result.Data.SectionIDs.length; i++) {
                //根据SectionIDs去遍历取值
                var sec_id = result.Data.SectionIDs[i];
//            console.log("id~:  " + sec_id);
//                        for (var i = 0; i < result.Data.Sections.length; i++) {
                var div_inner = document.createElement('div');
                div_inner.className += 'jsoncontainer_Class';
//            console.log(result.Data.Sections[sec_id]);
                if (result.Data.Sections[sec_id].Type == "text") {
                    div_inner.innerHTML += '<div class="json_article">' + result.Data.Sections[sec_id].Text + '</div>'
                }
                if (result.Data.Sections[sec_id].Type == "image") {
                    div_inner.innerHTML += '<div class="json_pic"><img src="https://pubdev.xiaoyuanjijiehao.com/' + result.Data.Sections[sec_id].ImageURL + '" alt=""></div>'
                    if (result.Data.Sections[sec_id].Description !== "") {
                        div_inner.innerHTML += '<div class="json_pic_text">' + result.Data.Sections[sec_id].Description + '</div>'
                    }
                }
                if (result.Data.Sections[sec_id].Type == "gif") {
                    div_inner.innerHTML += '<div class="json_pic"><img src="https://pubdev.xiaoyuanjijiehao.com/' + result.Data.Sections[sec_id].ImageURL + '" alt=""></div>'
                    if (result.Data.Sections[sec_id].Description !== "") {
                        div_inner.innerHTML += '<div class="json_pic_text">' + result.Data.Sections[sec_id].Description + '</div>'
                    }
                }
                if (result.Data.Sections[sec_id].Type == "video") {
                    div_inner.innerHTML += '<div class="json_shipin"><video src="https://pubdev.xiaoyuanjijiehao.com/' + result.Data.Sections[sec_id].Description.VideoURL + '" controls="controls"></video></div>'
                    if (result.Data.Sections[sec_id].Description !== "") {
                        div_inner.innerHTML += '<div class="json_pic_text">' + result.Data.Sections[sec_id].Description + '</div>'
                    }
                }
                div.appendChild(div_inner);
//                        }

            }


            //数据渲染结束
        },
        error: function () {
            alert("失败")
        }
    })
//            请求结束
}

//音乐空间js
function dom_audio() {
    var a = document.getElementById("music_img");
    var b = document.getElementById("audio");
//            alert(a.src);
    if (a.src == "https://dev.xiaoyuanjijiehao.com:10010/create/img/zanting@3x.png") {
        b.pause();
        a.src = "img/bofang@3x.png";
    } else {
        b.play();
        a.src = "img/zanting@3x.png";
    }
}
function bg_func() {
    //添加主题背景功能
    document.getElementById("button_div").onclick = function (event) {
        document.getElementById("swipe_div_container").style.display = "block";
        event.stopPropagation();
    };
    //给li绑定点击事件
    var ali = document.getElementsByTagName("li");
    for (var i = 0; i < ali.length; i++) {
        ali[i].onclick = function () {
            var article_id = window.location.href.split("?")[1];
            alert("文章id"+article_id+"....BackdropID"+this.firstElementChild.id+"....BackdropURL"+this.firstChild.src);
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
                    Router: '/app/article/backdrop/save',
                    Method: 'POST',
                    Body: JSON.stringify({"ID": article_id,"BackdropID":this.firstElementChild.id,"BackdropURL":this.firstChild.src})
                }),
                dataType: "json",
                success: function (result) {
                    alert("更换背景发送成功")
                },
                error: function () {
                    alert("更换背景发送失败")
                }
            })

            document.getElementsByClassName("middle_container")[0].style.backgroundColor = "transparent";
            for (var a = 0; a < ali.length; a++) {
                ali[a].style.border = "2px solid transparent";
            }
            this.style.border = "2px solid #ffc000";

            document.body.style.backgroundImage = "url(" + this.firstChild.src + ")";
            document.getElementById("theme").href = "css/" + this.id;
        }
    }
}
function send() {
    $.ajax({
        type: "get",
        url: "",
        data: {},
//                {'Content-Type': 'application/json', 'AccessToken': window["__AppWebkey"] || RM7XMPOWMAKKWYYRXDQNYQ},
        dataType: "json",
        success: function (result) {

        },
        error: function () {
            alert("发送失败")
        }
    })
//            请求结束
}

function guanbi() {
    document.getElementById("swipe_div_container").style.display = "none";
}