
// 图片上传变量=========================================
var input = document.getElementById("file_input");
var result;
var dataArr = [];                                       // 储存所选图片的结果(文件名和base64数据)
var saveArr = [];                                       //保存服务器返回的图片路径
var imgIndex = -1;
var fd;                                                 // FormData方式发送请求    
var picLen = 0;                                         // 判断3张
var oAdd = document.getElementById("file_add");
var oInput = document.getElementById("file_input");
if (typeof FileReader === 'undefined') {
    alert("抱歉，你的浏览器不支持 FileReader");
    input.setAttribute('disabled', 'disabled');
} else {
    input.addEventListener('change', readFile, false);
}
// 图片上传变量=========================================
function readFile() {
    fd = new FormData();
    var iLen = this.files.length;
    var index = 0;
    for (var i = 0; i < iLen; i++) {
        if (!input['value'].match(/.jpg|.png|.jpeg/i)) {
            return alert("上传的图片格式不正确，请重新选择");
        }
        var reader = new FileReader();
        reader.index = i;
        // 大小判断
        if (this.files[i].size > 5242880) {
            alert("请选择5M之内的图片")
            return
        }
        fd.append('Filedata', this.files[0]);
        fd.append('BuType', 'info');
        fd.append('router', '/app/file/upload');
        reader.readAsDataURL(this.files[i]);            //转成base64    
        reader.fileName = this.files[i].name;
        reader.onload = function (e) {
            var imgMsg = {
                name: this.fileName,                        //获取文件名    
                base64: this.result                       //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里    
            }
            dataArr.push(imgMsg);
            result = '<div class="delete" id="delete_pic' + picLen + '" >x</div><img src="' + this.result + '" alt="" onclick="show_big_pic(this)"/>';
            var div = document.createElement('div');
            div.innerHTML = result;
            div['className'] = 'pic-float';
            div['index'] = index;
            document.getElementById('pic_wrapper').appendChild(div);  　　//插入dom树    
            var img = div.getElementsByTagName('img')[0];
            img.onload = function () {
                imgIndex ++
                console.log(imgIndex)
                document.getElementById(`delete_pic${picLen}`).imgIndex = imgIndex
                console.log(document.getElementById(`delete_pic${picLen}`).imgIndex)
                picUpload(fd);
                var nowHeight = ReSizePic(this); //设置图片大小    
                var oParent = this.parentNode;
                if (nowHeight) {
                    // oParent.style.paddingTop = (oParent.offsetHeight - nowHeight) / 2 + 'px';
                }
                picLen++;
                //alert(picLen);
                if (picLen == 3) {
                    document.getElementById('file_add').style.display = 'none';
                }
            }
            document.getElementById(`delete_pic${picLen}`).onclick = function () {
                picLen--;
                div.remove();                      // 在页面中删除该图片元素  
                delete dataArr[div.index];//删除dataArr对应的数据
                console.log(this.imgIndex);
                saveArr.splice(this.imgIndex);
                imgIndex --
                if (picLen < 3) {
                    document.getElementById('file_add').style.display = 'block';
                }
            }
            index++;
        }
    }
}
oAdd.onclick = function () {
    oInput.value = "";                  //先将oInput值清空，否则选择图片与上次相同时change事件不会触发  
    oInput.click();
}
function ReSizePic(ThisPic) {
    var RePicWidth = 80; //这里修改为您想显示的宽度值    
    var TrueWidth = ThisPic.width; //图片实际宽度    
    var TrueHeight = ThisPic.height; //图片实际高度    
    if (TrueWidth > TrueHeight) {
        //宽大于高    
        var reWidth = RePicWidth;
        ThisPic.width = reWidth;
        //垂直居中    
        var nowHeight = TrueHeight * (reWidth / TrueWidth);
        return nowHeight;  //将图片修改后的高度返回，供垂直居中用    
    } else {
        //宽小于高    
        var reHeight = RePicWidth;
        ThisPic.height = reHeight;
    }
};
function picUpload(fileData) {
    antlinker.getEffectiveWebkey({
        success: function (msg) {
            //alert("ok")
            console.log(msg);
            window["__AppWebkey"] = msg.WebKey;
            //alert(window["__AppWebkey"]);
            //alert("token:"+ window["__AppWebkey"])
            var token = window["__AppWebkey"].split("ACKEY_")[1] || "GZDC1NL1NTCOLQNPRMOJQQ";
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/appsrv/file", true);
            xhr.setRequestHeader("AccessToken", token);
            xhr.onreadystatechange = function () {
                //alert("ok")
                if (xhr.readyState == 4) {
                    if (xhr.status === 200) {
                        //alert(1)
                        var object = JSON.parse(xhr.responseText);
                        saveArr.push(object.Data.FileLink);
                        //console.log(xhr.responseText.Data.FileLink)
                    } else {
                        //alert(2)
                    }
                }
            };
            xhr.send(fileData);
        }
    });

}

function show_big_pic(_this){
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