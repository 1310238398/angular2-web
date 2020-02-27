/**
 * Created by pillars on 2018/4/26.
 */
document.addEventListener('visibilitychange', function() {
    var isHidden = document.hidden;
    if (isHidden) {
        if(document.getElementsByTagName("audio").length>0){
            var _img = document.getElementById("music_img");
            var _audio = document.getElementById("audio");
            _audio.pause();
            _img.src = "img/bofang@3x.png";
        }
    } else {

    }
});



var netType ="";
var oldNetType ="";
var connected = true;

document.addEventListener("connectChange",function(info) {
//      evt.netType=" + nettype + ";evt.oldNetType=\"+oldtype+\";evt.connected=\"+s+\";document" + "" + ".dispatchEvent(evt);"
    console.log(info);
    netType = info.netType;
    oldNetType = info.oldNetType;
    connected = info.connected;
    console.log(netType+";"+oldNetType+";"+connected+";")
    //alert("当前网络状态是:"+netType+";刚才网络状态是"+oldNetType+";网络状态是"+connected+";")
    if(netType == "Mobile" && oldNetType!= "Mobile"){
        if(document.getElementsByTagName("video").length>0){
//       切换成4g后视频处理
            var video_arr = document.getElementsByTagName("video");

            for (var i = 0; i < video_arr.length; i++) {
                if (video_arr[i].paused) {

                } else {
                    video_arr[i].pause();
                    var r = confirm("当前是移动网络环境,是否继续播放");
                    if (r==true)
                    {
                        video_arr[i].play();
                    }
                    else {

                    }
                }

            }
        }
    }
//    if(connected){
//
//    }else {
//        if(document.getElementsByTagName("video").length>0){
////       没网时候的处理
//            var video_arr = document.getElementsByTagName("video");
//
//            for (var i = 0; i < video_arr.length; i++) {
//                if(video_arr[i].paused){
//
//                }else {
//                    video_arr[i].pause();
//                    alert("内容加载失败,请检查网络稍后重试");
//                    break;
//                }
//
//            }
//
//        }
//    }

});