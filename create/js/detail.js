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
        //async:false,
        data: JSON.stringify({
            Router: '/app/article/drafts/one',
            Method: 'POST',
            Body: JSON.stringify({"ID": article_id})
        }),
        dataType: "json",
        success: function (result) {
            //alert("成功")
            console.log(result);
//                    对数据做处理
//            var cw_0 = window.screen.width;
//            alert(cw_0);
            var cw = window.screen.width - 30;

            //alert(cw);
            if(result.Data.Backdrop.ID && result.Data.Backdrop.URL){
                //document.getElementsByClassName("middle_container")[0].style.backgroundColor = "transparent";
                //document.body.style.backgroundImage = "url("+ url_head + "/create/img/" + result.Data.Backdrop.URL + ")";
                document.getElementById("theme").href = "css_detail/" + result.Data.Backdrop.ID;
            }else{

            }

            //标题图片渲染
            var topic = document.getElementById("topic");
            var introduce = document.getElementById("introduce");
            if (result.Data.CoverURL && result.Data.Title) {
                //result.Data.Title = result.Data.Title.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot');
                result.Data.Title = result.Data.Title.replace(/<script>/g, '&lt;script&gt;').replace(/<\/script>/g, '&lt;/script&gt;');
                topic.innerHTML = '<div onclick="img_show_cover()" class="zhezhao"></div><img id="fengmian" src="'+ url_head +'/' + result.Data.CoverURL + '-art.cover' +'" alt="">' +
                    '<div id="topic_div"><b>' + result.Data.Title + '</b></div>'
                //alert("进入创建封面和标题处理")
                img_SDK_Array.push({src:result.Data.CoverURL,description:""});
            }

            if (result.Data.Abstract) {
                result.Data.Abstract = result.Data.Abstract.replace(/<script>/g, '&lt;script&gt;').replace(/<\/script>/g, '&lt;/script&gt;');
                introduce.innerHTML = result.Data.Abstract;
            }else{
                var introduce = document.getElementById("introduce")
                var fenge = document.getElementById("fenge")
                introduce.style.display = "none";
                fenge.style.display = "none";
            }

            var div = document.getElementById("json_content");
            //div.innerHTML = '';
            //渲染出音乐栏
            if (result.Data.BGM.URL) {
                //新增判断
                var music_url = result.Data.BGM.URL.slice(0,4);
                //alert(music_url);

                var div_inner = document.createElement('div');
                div_inner.className += 'jsoncontainer_Class';
                if(music_url == "http"){
                    div_inner.innerHTML += '<div class="music">' +
                        '<img id="music_img" src="img/zanting@3x.png" alt="" onclick="dom_audio()">' +
                        '<div class="song_name">' + result.Data.BGM.Name + '</div>' +
                        '<div style="float: left">' +
                        '<audio id="audio" src="' + result.Data.BGM.URL + '" loop="loop" autoplay="autoplay"></audio>' +
                        '</div>' +
                        '</div>';
                }else{
                    div_inner.innerHTML += '<div class="music">' +
                        '<img id="music_img" src="img/zanting@3x.png" alt="" onclick="dom_audio()">' +
                        '<div class="song_name">' + result.Data.BGM.Name + '</div>' +
                        '<div style="float: left">' +
                        '<audio id="audio" src="'+ url_head +'/' + result.Data.BGM.URL + '" loop="loop" autoplay="autoplay"></audio>' +
                        '</div>' +
                        '</div>';
                }
                div.appendChild(div_inner);

                if(document.getElementsByTagName("audio").length > 0){
                    var _audio = document.getElementById("audio");
                    _audio.addEventListener('pause',function(){
                        var _img = document.getElementById("music_img");
                        _img.src = "img/bofang@3x.png";
                    })
                }

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
                    div_inner.innerHTML += '<div class="json_article">' + result.Data.Sections[sec_id].Text.replace(/\n/g,"<br>").replace(/\s/g, '&nbsp;') + '</div>'
                }
                if (result.Data.Sections[sec_id].Type == "html") {
                    div_inner.innerHTML += '<div class="json_article">' + result.Data.Sections[sec_id].Text + '</div>'
                }
                if (result.Data.Sections[sec_id].Type == "image") {
                    div_inner.innerHTML += '<div class="json_pic"><img onclick="img_show(this)" src="'+ url_head +'/' + result.Data.Sections[sec_id].ImageURL + '-art.detail' + '" alt=""></div>'
                    if (result.Data.Sections[sec_id].Description !== "") {
                        result.Data.Sections[sec_id].Description = result.Data.Sections[sec_id].Description.replace(/<script>/g, '&lt;script&gt;').replace(/<\/script>/g, '&lt;/script&gt;');
                        div_inner.innerHTML += '<div class="json_pic_text">' + result.Data.Sections[sec_id].Description + '</div>'
                    }
                    img_SDK_Array.push({src:result.Data.Sections[sec_id].ImageURL,description:result.Data.Sections[sec_id].Description});
                }
                if (result.Data.Sections[sec_id].Type == "gif") {
                    div_inner.innerHTML += '<div class="json_pic"><img onclick="img_show(this)" src="'+ url_head +'/' + result.Data.Sections[sec_id].ImageURL + '" alt=""></div>'
                    if (result.Data.Sections[sec_id].Description !== "") {
                        result.Data.Sections[sec_id].Description = result.Data.Sections[sec_id].Description.replace(/<script>/g, '&lt;script&gt;').replace(/<\/script>/g, '&lt;/script&gt;');
                        div_inner.innerHTML += '<div class="json_pic_text">' + result.Data.Sections[sec_id].Description + '</div>'
                    }
                    img_SDK_Array.push({src:result.Data.Sections[sec_id].ImageURL,description:result.Data.Sections[sec_id].Description});
                }
                if (result.Data.Sections[sec_id].Type == "video") {
                    //invironment_string
                    if(invironment_string == 'ios'){
                        div_inner.innerHTML += '<div class="json_shipin"><video class="video_test" src="'+ url_head +'/'
                            + result.Data.Sections[sec_id].VideoURL + '" playsinline="true" poster="'+url_head +'/'+result.Data.Sections[sec_id].ImageURL+'-thumb" preload="none" controls="controls" onplay="video_play(this)"></video></div>'

                    }else {
                        div_inner.innerHTML += '<div class="json_shipin" style="position: relative"><img style="width: 100%" class="video_test" id="'+ url_head +'/'
                            + result.Data.Sections[sec_id].VideoURL + '"  src="'+url_head +'/'+result.Data.Sections[sec_id].ImageURL+'-thumb" preload="none" controls="controls">' +
                            '<img style="position: absolute;top:50%;left: 50%;margin-top:-25px;margin-left:-25px;width:50px;height: 50px;" src="img/bf_button.png" onclick="video_play(this)" alt=""></div>'
                    }

                    //div_inner.innerHTML += '<div class="json_shipin"><video class="video-js vjs-big-play-centered video_test" playsinline="true" poster="'+url_head +'/'+result.Data.Sections[sec_id].ImageURL+'-thumb" preload="none" controls="controls" data-setup="{}" onplay="video_play(this)">' +
                    //    '<source src="'+ url_head +'/' + result.Data.Sections[sec_id].VideoURL+'" type="video/mp4"></video></div>'

                    if (result.Data.Sections[sec_id].Description !== "") {
                        result.Data.Sections[sec_id].Description = result.Data.Sections[sec_id].Description.replace(/<script>/g, '&lt;script&gt;').replace(/<\/script>/g, '&lt;/script&gt;');
                        div_inner.innerHTML += '<div class="json_pic_text">' + result.Data.Sections[sec_id].Description + '</div>'
                    }
                }
                div.appendChild(div_inner);
//                        }
            }
            //添加阅读量
            var read_count = document.getElementById('read_count');
            //if(result.Privacy == 0){
                read_count.innerHTML = '<div style="">阅读量 '+result.Data.ReadCount+'</div>'
            //}else{
            //    read_count.display = "none";
            //}

            //遍历关键字
            var span_father = document.getElementById('span_father');

            for (var x = 0; x < result.Data.Keywords.length; x++) {
                //根据SectionIDs去遍历取值
                var key_id = result.Data.Keywords[x];

                span_father.innerHTML += '<span class="gjz_span">'+key_id+'</span>';
            }

            //输出图片数组长度
            //alert(img_SDK_Array.length);

            //$('.test-lazyload').picLazyLoad({
            //    threshold: 100,
            //    placeholder: 'http://image.yihaodianimg.com/front-homepage/global/images/blank.gif'
            //});
            //$('.test-lazyload').picLazyLoad();
            //数据渲染结束
        },
        error: function () {
            //alert("失败")
        }
    })

//            请求结束
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
            //alert("文章id"+article_id+"....BackdropID"+this.firstElementChild.id+"....BackdropURL"+this.firstChild.src);
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
                    //alert("更换背景发送成功")
                },
                error: function () {
                    //alert("更换背景发送失败")
                }
            })

            //document.getElementsByClassName("middle_container")[0].style.backgroundColor = "transparent";
            for (var a = 0; a < ali.length; a++) {
                ali[a].style.border = "2px solid transparent";
            }
            this.style.border = "2px solid #ffc000";

            document.body.style.backgroundImage = "url(" + this.firstChild.src + ")";
            document.getElementById("theme").href = "css/" + this.id;
        }
    }
}


function guanbi() {
    document.getElementById("swipe_div_container").style.display = "none";
}


//音乐空间js
function dom_audio() {
    if(document.getElementsByTagName("video").length>0){
        var video_arr = document.getElementsByTagName("video");
        for (i = 0;i < video_arr.length;i++){
            video_arr[i].pause();
        }
    }

    var a = document.getElementById("music_img");
    var b = document.getElementById("audio");
//            alert(a.src);
    if(b.paused){
        b.play();
        a.src = "img/zanting@3x.png";
    }else {
        b.pause();
        a.src = "img/bofang@3x.png";
    }
}


function video_play(_this){
    //暂停音乐
    //debugger;
    if(document.getElementsByTagName("audio").length>0){
        var _img = document.getElementById("music_img");
        var _audio = document.getElementById("audio");
        _audio.pause();
        _img.src = "img/bofang@3x.png";
    }
    var video_arr = document.getElementsByTagName("video");
    if(netType == "Mobile" && oldNetType != "Mobile"){
        //当为ios环境时,遍历暂停所有视频 除了当前
        if(invironment_string == 'ios'){
            for (var i = 0; i < video_arr.length; i++) {
                video_arr[i].pause();
            }
        }

        var x=confirm("当前是移动网络环境,是否继续播放");
        if (x==true)
        {
            //判断设备选择是否调用sdk
            if(invironment_string == 'android'){
                //console.log(_this.poster+"+++"+_this.src);
                antlinker.playVideoOnFullView({
                    video:_this.parentNode.children[0].id,
                    thumbnail:_this.parentNode.children[0].src,
                    success: function() {
                    },
                    fail: function() {}
                })
            }else{
                _this.play();
            }
            //_this.play();
            oldNetType = "Mobile";
        }
        else {

        }
    }else{
        //无线网环境下处理
        if(invironment_string == 'ios'){
            //ios环境中遍历视频停止 除了当前
            for (var i = 0; i < video_arr.length; i++) {
                if (video_arr[i] != _this) {
                    video_arr[i].pause();
                } else {
                    //判断设备选择是否调用skd
                    _this.play();
                }

                //_this.play();
            }
        }else{
            //安卓环境中调用SDK
            antlinker.playVideoOnFullView({
                //alert(_this.parentNode.children[0].id + "" + _this.parentNode.children[0].src);
                video:_this.parentNode.children[0].id,
                thumbnail:_this.parentNode.children[0].src,
                success: function() {
                    console.log("调用成功")
                },
                fail: function() {
                    console.log("调用失败")
                }
            })

        }

    }
    return true;
}

function bofang(x){
    x.style.display = "none"
}


function img_show(_this){
    console.log(img_SDK_Array);
    for(var i = 0;i<img_SDK_Array.length;i++){
        if(decodeURI(_this.src).indexOf(img_SDK_Array[i].src) != -1){
            antlinker.browseOriginalImages({
                index:i,
                imgs:img_SDK_Array,
                success: function() {
                    console.log("调用图片预览成功")
                },
                fail: function() {
                    console.log("调用图片预览失败")
                }
            })
        }
    }
}


function img_show_cover(){
    console.log(img_SDK_Array);
    var img_cover = document.getElementById("fengmian");
    //alert(img_cover.src);
    for(var i = 0;i<img_SDK_Array.length;i++){
        if(decodeURI(img_cover.src).indexOf(img_SDK_Array[i].src) != -1 ){
            antlinker.browseOriginalImages({
                index:i,
                imgs:img_SDK_Array,
                success: function() {
                    console.log("调用图片预览成功")
                },
                fail: function() {
                    console.log("调用图片预览失败")
                }
            })
        }
    }
}