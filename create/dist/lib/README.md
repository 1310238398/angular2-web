# 校园集结号JSSDK文档

* 版本号：`v1.0.9`

## 版本历史

### 1.0.9变更说明

1. 修改了configTitleButton的实现，加上了show close属性控制是否显示关闭按钮，增加了menu、icon和empty三种类型

```
// 增加showClose属性，向下兼容
antlinker.configTitleButton({
    showClose: true,
    type:'label', // 可设置的类型为label或者camera或者share或者menu或者empty
    text: "今天你开心吗？",
    success: function () {
    //设置右上角按钮成功
    },
    fail: function () {
    // 设置右上角按钮失败
    }
    trigger:function(){
    //点击标题时调用
    }
 );
 

// 增加showClose属性，向下兼容
antlinker.configTitleButton({
    showClose: true,
    type:'camera', // 可设置的类型为label或者camera或者share或者menu或者empty
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    }
 );
 
// 新增加的方法
// 具体的行为为，在content中设置图表，在点击具体的功能项是触发trigger的回调
// 如果想要刷新，则js端需要在trigger中调用location.reload()
// 如果想要分享，则js端需要在trigger中调用antlinker.sharePlatform
antlinker.configTitleButton({
    showClose: true,
    type: "icon",// 可设置的类型为label或者camera或者share或者menu或者empty或icon
    content: {name:"功能A", iconUrl:"http://xxx.png"},//{name:"分享", icon:"share"}, {name:"刷新", icon:"refresh"},系统默认的icon依据sdk版本不同变化，目前版本只支持refresh和share
    success: function () {
        // 设置右上角按钮成功
    },
    fail: function () {
        // 设置右上角按钮失败
    },
    trigger: function (option) {
        // option:{name:'功能A'}
        // 点击调用哪个函数
        // 例如点击了“功能A”，传入的option就是功能A:{name:'功能A'}
    }
});

// 新增加的方法
// 具体的行为为，在option中设置菜单项，使得点击“更多”按钮时弹出菜单，在点击具体的功能项是触发trigger的回调
// 如果想要刷新，则js端需要在trigger中调用location.reload()
// 如果想要分享，则js端需要在trigger中调用antlinker.sharePlatform
antlinker.configTitleButton({
    showClose: true,
    type: "menu",// 可设置的类型为label或者camera或者share或者menu或者empty或icon
    menuList: [{name:"功能A", iconUrl:"http://xxx.png"}, {name:"功能B", iconUrl:"http://xxx.png"}, {name:"分享", icon:"share"}, {name:"刷新", icon:"refresh"}], // 这是一组最大值，原生可以根据用户的不同减小这一组值，系统默认的icon依据sdk版本不同变化，目前版本只支持refresh和share
    success: function () {
        // 设置右上角按钮成功
    },
    fail: function () {
        // 设置右上角按钮失败
    },
    trigger: function (option) {
        // option:{name:'功能A'}
        // 点击调用哪个函数
        // 例如点击了“功能A”，传入的option就是功能A:{name:'功能A'}
    }
});

// 新增加的方法
// 具体的行为为，设置右上角为空
antlinker.configTitleButton({
    showClose: true,
    type: "empty",// 可设置的类型为label或者camera或者share或者menu或者empty
    success: function () {
        // 设置右上角按钮成功
    },
    fail: function () {
        // 设置右上角按钮失败
    }
});
```

2. configNavigationButton 函数废弃，后续会删除

### 1.0.8变更说明

1. getUserBasicInfo增加change方法，该方法是为了解决网页内key与原生key同步问题，之前是网页通过定时任务不停的刷新实现。change函数在原生的key变化时由原生程序调用，参数与success一致。

### 1.0.7变更说明

1. 增加接口antlinker.openNewView = function (request) {}


### 1.0.5变更说明

1. 细化分享内容的回调函数的参数

### 1.0.4变更说明

## 接口说明

### 1.初始化配置

* 函数名：`config`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|title|字符串|页面标题
|debug|布尔|是否开启调试模式
|success|函数|接口调用成功时执行的回调函数
|fail|函数|接口调用失败时执行的回调函数
|complete|函数|接口调用完成时执行的回调函数，无论成功或失败都会执行

#### 使用范例

``` javascript
antlinker.config({
    title: "这是一个测试页面",
    debug: true,
    success: function() {},
    fail: function() {},
    complete: function() {}
})
```

#### 响应参数说明

无

### 3.app相关的基本信息

* 函数名：`getAppVersion`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|success|函数|接口调用成功时执行的回调函数
|fail|函数|接口调用失败时执行的回调函数
|complete|函数|接口调用完成时执行的回调函数，无论成功或失败都会执行

#### 使用范例

``` javascript
antlinker.getAppVersion({
        success: function {},
        fail: function {failed},
        complete: function {}
    });

    fail的参数为
    {
        FailCode: xxx,
        FailReason: yyy
    }
    antlinker.getUserBasicInfo({
        success: function {},
        fail: function {},
        complete: function {}
    })
    success的参数为
    {
        UserID: xxx,
        DisplayName: yyy
    }
```

#### 响应参数说明

无
### 3.返回可用的api的列表

* 函数名：`getAvailableApi`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|success|函数|接口调用成功时执行的回调函数
|fail|函数|接口调用失败时执行的回调函数
|complete|函数|接口调用完成时执行的回调函数，无论成功或失败都会执行

#### 使用规范

``` javascript
antlinker.getAvailableApi({
    success: function {},
    fail: function {},
    complete: function {}
});

failed参数为
{
    FailCode: xxx,
    FailReason: yyy
}
success参数为
{
    AvailableApi:["Api_1", "Api_2", "Api_3", "Api_4"]
}
```

#### 响应参数说明

|属性名|属性类型|备注
|-----|-------|---
|AvailableApi|字符串数组|API列表


### 5.提供接口检查当前版本是否支持特定接口

* 函数名：`checkJsApi`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|jsApiList|字符串数组|需要检测的JS接口列表，所有JS接口列表见附录2
|success|函数|接口调用成功时执行的回调函数

#### 使用规范

``` javascript
antlinker.checkJsApi({
    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    }
});
```

#### 响应参数说明

无

### 6.获得登陆用户信息

> 这个接口需要入口地址在whitelist里面才能调用,仅供内部调用

* 函数名：`getUserBasicInfo`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|success|函数|接口调用成功时执行的回调函数
|fail|函数|接口调用失败时执行的回调函数
|complete|函数|接口调用完成时执行的回调函数，无论成功或失败都会执行

#### 使用范例

``` javascript
antlinker.getUserBasicInfo({
    success: function {},
    fail: function{},
    change: function{},
    complete: function{}
})
```

#### 响应参数说明

无
### 7.这个接口用于不在白名单的URL使用 ?

* 函数名：`getUserProfile`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|success|函数|接口调用成功时执行的回调函数
|fail|函数|接口调用失败时执行的回调函数
|complete|函数|接口调用完成时执行的回调函数，无论成功或失败都会执行

#### 使用规范

``` javascript
antlinker.getUserProfile({
    success: function {},
    fail: function{},
    complete: function{}
});
```

#### 响应参数说明

无

### 8.学工相关的基本信息

* 函数名：`getUserEduInfo`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|success|函数|接口调用成功时执行的回调函数
|fail|函数|接口调用失败时执行的回调函数
|complete|函数|接口调用完成时执行的回调函数，无论成功或失败都会执行

#### 使用规范

``` javascript
antlinker.getUserEduInfo({
    success: function {},
    fail: function {},
    complete: function {}
});
```

#### 响应参数说明

无

### 9.分享到分享墙(不再使用，准备废弃)

* 函数名：`shareToTimeline`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|title|参数|分享标题
|link|参数|分享链接
|imgUrl|参数|分享图标
|success|函数|接口调用成功时执行的回调函数
|cancel|函数|失败

#### 使用规范

``` javascript
antlinker.shareToTimeline({
    title: '',
    link: '',
    imgUrl: '',
    success: function () {
    },
    cancel: function () {
    }
});
```

#### 响应参数说明

无

### 10.标题栏按钮配置

* 函数名：`configTitleButton`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|type|字符串|可选类型为`label(设置标题)`、`camera` 、`share`
|option|数组|这是一组最大值，原生可以根据用户的不同减小这一组值
|shareContent|对象|查看`shareContent`参数说明
|success|函数|设置右上角按钮成功
|fail|函数|设置右上角按钮失败
|onClick|函数|点击调用哪个函数,在这个函数中，需要准备好各种信息，然后调用shareContent,之后，原生弹出选择分享到哪的界面，之后由原生控制

##### `shareContent`参数说明

|属性名|属性类型|备注
|-----|-------|---
|title|字符串|分享标题标题标题
|desc|字符串|分享描述描述描述
|link|字符串|分享链接
|id|字符串|id
|type|字符串|分享类型,music、video或link，不填默认为link
|dataUrl|字符串|如果type是music或video，则要提供数据链接，默认为空

#### 使用范例

##### 可选类型为label即设置标题
``` javascript
antlinker.configTitleButton({
    type: "label",// 可选类型为label即设置文字或者相机
    text: "今天你开心吗？",
    success: function () {
    }
});
```

##### 可选类型为camera即选择照片
``` javascript
antlinker.configTitleButton({
    type: "camera",// 可选类型为label即设置标题和camera即设置选择照片
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    }
});
```


##### 可选类型为share即设置分享按钮
``` javascript
antlinker.configTitleButton({
    type: "share",// 可选类型为label即设置标题和camera 、share
    /*
        option数组会用到的元素：
        square：广场
        u2u：个人聊天
        u2g：群组聊天
        wechat：微信好友
        weshare：微信朋友圈
        weibo：微博
        qq：qq好友
        qqzone：qq空间
    */
    option: ["square", "timeline", "wechart", "weibo"], // 这是一组最大值，原生可以根据用户的不同减小这一组值
    success: function () {
        // 设置右上角按钮成功
    },
    fail: function () {
        // 设置右上角按钮失败
    },
    onClick: function () {
        // 点击调用哪个函数
        // 在这个函数中，需要准备好各种信息，然后调用shareContent
        // 之后，原生弹出选择分享到哪的界面，之后由原生控制
    }
});
```
#### 响应参数说明

无

### 11.分享内容

* 函数名：`shareContent`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|title|字符串|分享标题
|desc|字符串|分享描述
|link|字符串|分享链接
|imgUrl|字符串|分享图标
|type|字符串|分享类型(square：广场,activity：活动,vote：投票,survey：调查问卷,info：资讯,notice：公告,answer：答题闯关,lottery：积分抽奖)
|dataUrl|字符串|如果type是music或video，则要提供数据链接，默认为空
|success|函数|用户确认分享后执行的回调函数，参数为option
|cancel|函数|用户取消分享后执行的回调函数

#### 使用范例

``` javascript
antlinker.shareContent({
    title: '',
    desc: '',
    link: '',
    imgUrl: '',
    type: '',
    dataUrl: '',
    success: function (option) {
        if (option==="微博") {
            // 给用户一次抽奖的机会
        }
    },
    cancel: function () {
    }
})
```

#### 响应参数说明

无

### 12.分享给好友或群

* 函数名：`shareToAppMessage`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|title|字符串|分享标题
|desc|字符串|分享描述
|link|字符串|分享链接
|imgUrl|字符串|分享图标
|type|字符串|分享类型,music、video或link，不填默认为link
|dataUrl|字符串|如果type是music或video，则要提供数据链接，默认为空
|success|函数|用户确认分享后执行的回调函数
|cancel|函数|用户取消分享后执行的回调函数

#### 使用范例

``` javascript
antlinker.shareToAppMessage({
    title: '',
    desc: '',
    link: '',
    imgUrl: '',
    type: '',
    dataUrl: '',
    success: function () {
    },
    cancel: function () {
    }
});

```

#### 响应参数说明

无
### 13.上传图片

* 函数名：`chooseImage`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|count|字符串|默认9
|sizeType|数组|可以指定是原图还是压缩图，默认二者都有
|sourceType|数组|可以指定来源是相册还是相机，默认二者都有
|success|函数|接口调用成功时返回

#### 使用范例

``` javascript
antlinker.chooseImage({
     count: 1,
     sizeType: ['original', 'compressed'],
     sourceType: ['album', 'camera'], //
     success: function (res) {
         
     }
});
```

#### 响应参数说明
``` javascript
var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
```

### 14.返回设备类型

* 函数名：`getDeviceType`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|success|函数|接口调用成功时执行的回调函数

#### 使用范例

```javascript
antlinker.getDeviceType({
         success: function(device_type) {} // 返回值为设备类型
})
```

#### 响应参数说明
```javascript
         success: function(device_type) {
            console.log(device_type)// 返回值为设备类型
         }
})
```
### 15.返回网络类型

* 函数名：`getNetworkType`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|success|函数|接口调用成功时执行的回调函数

#### 使用范例

``` javascript
antlinker.getNetworkType({
    success: function (res) {
        
    }
});
```

#### 响应参数说明
``` javascript
res.networkType;// 返回网络类型2g，3g，4g，wifi
```
### 16.返回地理位置接口

* 函数名：`getLocation`

#### 参数说明

|属性名|属性类型|备注
|-----|-------|---
|type|字符串|默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
|success|函数|接口调用成功时执行的回调函数


#### 使用范例

``` javascript
antlinker.getLocation({
        type: 'wgs84',
        success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
        }
    });
```

#### 响应参数说明
``` javascript
var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
var speed = res.speed; // 速度，以米/每秒计
var accuracy = res.accuracy; // 位置精度
```
### 17.设置标题

* 函数名：`configTitle`

#### 参数说明
1.

|属性名|属性类型|备注|
|-----|-------|---|
|type|字符串|label（设置标题）|
|title|字符串|标题|
|success|函数|接口调用成功时执行的回调函数|

2.

|属性名|属性类型|备注|
|-----|-------|---|
|type|字符串|label（设置标题）|
|title|函数|配置显示的列表️|
|items|数组|设置要显示的列表|
|selected|字符串|代表初始化时选中元素的value，展示的是name|
|head|字符串|时间|
|columnCount|字符串|每一行显示的个数|
|success|函数|接口调用成功时执行的回调函数|
|onSelect|函数|用户选择的参数|


#### 使用范例

``` javascript
//1
antlinker.configTitle({
        type: "label",
        title: "标题",
        success: function () {
        }
    });
//2
    antlinker.configTitle({
        type: "radio",
        title: {
            items:[{name: "第一周", value: "1"}, {name: "第十八周", value: "18"}],
            selected: "1",
            head: "时间",
            columnCount: 4
        }
        success: function () {
        },
        onSelect: function (result) {
            
        }
    });
```

#### 响应参数说明

``` javascript
//result的格式为{name: "第一周", value: "1"}//选择后的选项
```

### 18.从html5界面跳转到原生，依据不同的type跳转到不同的界面

* 函数名：`jumpToNative`

#### 参数说明

|属性名|属性类型|备注|
|-----|-------|---|
|type|字符串|TeacherDetail或者为空则关闭当前界面|
|data|函数|需要传输的数据|
|studentID|字符串|？|
|studentName|字符串|？|
|success|函数|接口调用成功时执行的回调函数|
|fail|函数|接口调用失败时执行的回调函数|
|complete|函数|接口调用完成时执行的回调函数，无论成功或失败都会执行|

#### 使用范例

``` javascript
antlinker.jumpToNative({
        type: "StudentDetail",
        data: {
            studentID: "id",
            studentName: "name"
        },
        success: function() {},
        fail: function() {},
        complete: function() {}
    });
```

#### 响应参数说明

无

### 19.文件上传接口

* 函数名：`uploadFile`

#### 参数说明

|属性名|属性类型|备注|
|-----|-------|---|
|success|函数|返回选定文件的路径列表|
|cancel|函数|用户取消，没有上传文件|

#### 使用范例

``` javascript
antlinker.uploadFile({
        success: function (res) {
            
        },
        cancel: function () {
        }
    });
```

#### 响应参数说明

``` javascript
res.NewFileList;// 返回选定文件的路径列表
```

### 20.exeUserBasicInfoSdk(未确认)


#### 使用范例

``` javascript
$(document).ready(function () {
        var dataObj = {};
        var request = new Object({
            success: function(succeed) {
                dataObj.UserCode = succeed.UserCode;
                dataObj.UID = succed.UserID;
                dataObj.InterfaceName = "integral";
            },
            fail: function(failed) {
            },
            complete: function() {
            }
        });
        antlinker.getUserBasicInfo(request);
        function exeBus(userinfo) {
            busbefore(userinfo);
            //ajax查询
            var dataModel = "";
            $.ajax1({
                type: 'POST',
                url: '/*****',
                data: JSON.stringify({}),
                cache: false,
                dataType: 'json',
                success: function (data) {
                    dataModel = data;

                    //初始调用
                    XXXX(userinfo,dataModel);
                }
            });
        }
        antlinker.exeUserBasicInfoSdk(dataObj,exeBus);
    });
```

#### 响应参数说明

无

### 21.向客户端请求实时有效的webkey

* 函数名：`getEffectiveWebkey`

#### 参数说明

|属性名|属性类型|备注|
|-----|-------|---|
|success|函数|接口调用成功时执行的回调函数|

#### 使用范例

``` javascript
antlinker.getEffectiveWebkey({
    success: function (msg) {
        webkey = msg.WebKey;
    }
});
```

#### 响应参数说明

``` javascript
    webkey = msg.WebKey;//返回实时有效的webkey
});
```

### 22.拨打电话

* 函数名：`onTel`

#### 参数说明

|属性名|属性类型|备注|
|-----|-------|---|
|tel|字符串|设置拨打的号码|
|text|字符串|需要弹窗提醒的文本|
|success|函数|接口调用成功时执行的回调函数|
|fail|函数|接口调用失败时执行的回调函数|

#### 使用范例

``` javascript
antlinker.onTel({
        tel: "1516885XXXX",
        text: "您确定要拨打:XX吗?"
        success: function () {
        },
        fail: function () {
        }
    });
```

#### 响应参数说明

无

### 23.本地存储接口 准备废弃

* 函数名：`storePut`,`storeGet`,`storeDelete`

#### 参数说明

|属性名|属性类型|备注|
|-----|-------|---|
|text|字符串|存储的是json的数组或对象|
|success|函数|接口调用成功时执行的回调函数|
|fail|函数|接口调用失败时执行的回调函数|
|complete|函数|执行完成|

#### 使用范例

``` javascript
antlinker.storePut({//存数据
    nameSpace: "antlink",
    id: "antlink",
    text: object,
    success: function () {
    },
    fail: function () {
    
    },
    complete: function() {
    }
});
    
antlinker.storeGet({//取数据
    nameSpace: "antlink",
    id: "antlink",
    success: function (result) {
      // result.text//取出的数据
    },
    fail: function () {
    
    },
    complete: function() {
    }
});
    
antlinker.storeDelete({//删除数据
    nameSpace: "antlink",
    id: "antlink",
    success: function (result) {
      // result.text
    },
    fail: function () {
    
    },
    complete: function() {
    }
});

```

#### 响应参数说明

无

### 24.改变屏幕状态

* 函数名：`changeOrientation`

#### 参数说明

|属性名|属性类型|备注|
|-----|-------|---|
|orientation|字符串|portrait-使竖屏 landscape-使横屏|
|success|函数|接口调用成功时执行的回调函数|
|fail|函数|接口调用失败时执行的回调函数|
|complete|函数|执行完成|

#### 使用范例

``` javascript

 antlinker.changeOrientation({
            orientation：'landscape',
            success: function () {
                //jssdk成功
            },
            fail: function () {
                // jssdk失败
            }
        })

```

#### 响应参数说明

无

### 25.直接打开分享平台

* 函数名：`sharePlatform`

#### 参数说明

|属性名|属性类型|备注|
|-----|-------|---|
|option|数组|['qq','qzone'] 规定可以分享到哪些平台 square：广场 u2u：个人聊天 u2g：群组聊天 wechat：微信好友 weshare：微信朋友圈 weibo：微博 qq：qq好友 qzone：qq空间|
|shareContent|对象| title: '分享标题标题标题', // 分享标题, desc: '分享描述描述描述', // 分享描述5, link: '', // 分享链接,id: '', // id, type: 'cet46', //分享类型 cet46（四六级分享）,music、video或link，不填默认为link, dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空|
|success|函数|接口调用成功时执行的回调函数|
|fail|函数|接口调用失败时执行的回调函数|
|complete|函数|执行完成|

#### 使用范例

``` javascript

 antlinker.sharePlatform({
            option: ['qq', 'qzone', 'wechat'],
            shareContent: {
                title: '分享标题标题标题', // 分享标题
                desc: '分享描述描述描述', // 分享描述
                link: '', // 分享链接
                id: 'default', // id //此参数必须-2018.03.21
                type: 'cet46score', // 分享类型 cet46score（四六级分享）,music、video或link，不填默认为link
                dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
            },
            success: function () {
                //设置右上角按钮成功
            },
            fail: function () {
                // 设置右上角按钮失败
            }
        })

```

#### 响应参数说明

无

### 26.新版按钮配置

* 函数名：`configNavigationButton`

#### 参数说明

|属性名|属性类型|备注|
|-----|-------|---|
|type|数组|['more','close','label']| 规定标题栏有哪些按钮|
|buttonTitle|字符串|可配置标题按钮内容|
|moreOption|数组|share：分享 refresh：刷新|
|shareContent|对象|分享内容对象|
|success|函数|接口调用成功时执行的回调函数|
|fail|函数|接口调用失败时执行的回调函数|
|complete|函数|执行完成|

#### 使用范例

``` javascript

  antlinker.configNavigationButton({
 type:['more','close','label'],
 buttonTitle:'我是标题',
 moreOption: ["share", "refresh"],
 sharePlatform:['qq','qzone'],
 shareContent:{
 title: '分享标题标题标题', // 分享标题
 desc: '分享描述描述描述', // 分享描述5
 link: '', // 分享链接
 id: '', // id
 type: 'lottery', // 分享类型,music、video或link，不填默认为link
 dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
 }
 success: function () {
  //设置右上角按钮成功
 },
 fail: function () {
  // 设置右上角按钮失败
  }
 trigger:function(){
 //点击标题时调用
 });


```

#### 响应参数说明

无

### 27.主动关闭h5视图

* 函数名：`closeView`

#### 参数说明

|属性名|属性类型|备注|
|-----|-------|---|
|success|函数|接口调用成功时执行的回调函数|
|fail|函数|接口调用失败时执行的回调函数|

#### 使用范例

``` javascript
antlinker.closeView({
        success: function () {
        },
        fail: function () {
        }
    });
```

#### 响应参数说明

无

### 28.保存当前图片

* 函数名：`savePhoto`

#### 参数说明

|属性名|属性类型|备注|
|-----|-------|---|
|success|函数|接口调用成功时执行的回调函数|
|fail|函数|接口调用失败时执行的回调函数|

#### 使用范例

``` javascript
antlinker.savePhoto({
        success: function () {
        },
        fail: function () {
        }
    });
```

#### 响应参数说明

无
### 29.h5调用名单选人

* 函数名：`openNativeRollSelect`

#### 参数说明

|属性名|属性类型|备注|
|-----|-------|---|
|Datas|对象数组|{Type:'',BuID:'',Source:'',SourceBuID:''}|
|selected|函数|（选择完成后调用)->返回对象datas为对象（ojb）数组|
|success|函数|接口调用成功时执行的回调函数|
|fail|函数|接口调用失败时执行的回调函数|

#### 使用范例

``` javascript
antlinker.openNativeRollSelect({
            success: function () {
                //jssdk成功
            },
            fail: function () {
                // jssdk失败
            },
            selected:function(datas){
               //选择完成后处理datas（包含选择的人员）
            }
        })
```

#### 响应参数说明

无

