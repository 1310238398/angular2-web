var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*! Built with http://stenciljs.com */
App.loadBundle('app-profile.ios', ['exports'], function (exports) {
    var h = window.App.h;
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    // declare var toast: any;
    var AppProfile = /** @class */ (function () {
        function AppProfile() {
            var _this = this;
            this.password = '';
            this.password_repeat = '';
            this.tel = '';
            this.tel_yz = '';
            this.pic_yz = '';
            this.tel_get = '获取验证码';
            this.countdown = 120;
            this.CHKCODE = '';
            this.pic_base64 = '';
            this.RE = 9999;
            this.VERSION = '';
            this.DEVID = '';
            this.urlHead = 'https://app.xiaoyuanjijiehao.com';
            //发送验证码
            this.sendTel = function () {
                //判断手机号
                if (_this.tel == '') {
                    alert("手机号不能为空");
                    return;
                }
                else {
                    var tel_patrn = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                    if (tel_patrn.test(_this.tel))
                        ;
                    else {
                        alert("请输入有效的手机号");
                        return;
                    }
                }
                // if (this.countdown == 120) {
                var params = {
                    method: 'POST',
                    header: '',
                    body: JSON.stringify({
                        CHKCODE: _this.CHKCODE,
                        DEVID: _this.DEVID,
                        EXIST: 1,
                        ICODE: _this.pic_yz,
                        TEL: _this.tel,
                        VERSION: _this.VERSION
                    })
                };
                var url = _this.urlHead + '/app/getcheckkey';
                console.log('url', url);
                fetch(url, params).then(function (r) { return r.json().then(function (result) {
                    // debugger;
                    _this.CHKCODE = result.CHKCODE;
                    if (result.IMG) {
                        _this.pic_base64 = 'data:image/png;base64,' + result.IMG;
                    }
                    _this.RE = result.RE;
                    if (result.RE == 10) {
                        var pic_yz = document.getElementById("pic_yz");
                        pic_yz.style.display = 'block';
                        return;
                    }
                    else if (result.RE == 11) {
                        _this.presentToast('middle');
                        return;
                    }
                    else if (result.RE == 5) {
                        alert("2分钟内只能获取一次");
                        return;
                    }
                    else if (result.RE == 6) {
                        alert("获取验证码超时");
                        return;
                    }
                    else if (result.RE == 1) {
                        alert("服务器错误");
                        return;
                    }
                    else if (result.RE == 2) {
                        alert("手机号码已存在");
                        return;
                    }
                    else if (result.RE == 3) {
                        alert("手机号码不存在");
                        return;
                    }
                    else if (result.RE == 4) {
                        alert("解析错误");
                        return;
                    }
                    else if (result.RE == 7) {
                        alert("操作过于频繁");
                        return;
                    }
                    else if (result.RE == 11) {
                        alert("图形验证码错误");
                        return;
                    }
                    else if (result.RE == 12) {
                        alert("图形验证码错误次数过多");
                        return;
                    }
                    else if (result.RE == 99) {
                        alert("参数错误， 错误码是 99");
                        return;
                    }
                    else if (result.RE == 0) {
                        // alert("验证码已发送");
                        _this.presentToast2('middle');
                        // console.log(this.sendTime);
                        _this.sendTime();
                        // return;
                    }
                }); });
                // } else {
                // }
                // if (this.RE == 0) {
                //   var btn = document.getElementById("btn");
                //   if (this.countdown == 0) {
                //     btn.removeAttribute("disabled");
                //     btn.style.backgroundColor = "#FFC000";
                //     this.tel_get = "获取验证码";
                //     this.countdown = 120;
                //     return;
                //   } else {
                //     btn.setAttribute("disabled", 'true');
                //     btn.style.backgroundColor = "#D5D5D5";
                //     this.tel_get = "重新发送(" + this.countdown + ")";
                //     let now = new Date();
                //     console.log(now, this.tel_get);
                //     this.countdown--;
                //     //return;
                //   }
                //   setTimeout(this.sendTel, 1000)
                // }
            };
            this.sendTime = function () {
                var btn = document.getElementById("btn");
                if (_this.countdown == 0) {
                    btn.removeAttribute("disabled");
                    btn.style.backgroundColor = "#FFC000";
                    _this.tel_get = "获取验证码";
                    _this.countdown = 120;
                    return;
                }
                else {
                    btn.setAttribute("disabled", 'true');
                    btn.style.backgroundColor = "#D5D5D5";
                    _this.tel_get = "重新发送(" + _this.countdown + ")";
                    var now_1 = new Date();
                    console.log(now_1, _this.tel_get);
                    _this.countdown--;
                    //return;
                }
                setTimeout(_this.sendTime, 1000);
            };
            this.sendTel2 = function () {
                //debugger;
                var params = {
                    method: 'POST',
                    header: '',
                    body: JSON.stringify({
                        CHKCODE: _this.CHKCODE,
                        DEVID: _this.DEVID,
                        EXIST: 1,
                        ICODE: _this.pic_yz,
                        TEL: _this.tel,
                        VERSION: _this.VERSION
                    })
                };
                var url = _this.urlHead + '/app/getcheckkey';
                fetch(url, params).then(function (r) { return r.json().then(function (result) {
                    _this.CHKCODE = result.CHKCODE;
                    _this.pic_base64 = 'data:image/png;base64,' + result.IMG;
                    _this.RE = result.RE;
                    if (result.RE == 10 || result.RE == 11) {
                        var pic_yz = document.getElementById("pic_yz");
                        pic_yz.style.display = 'block';
                    }
                }); });
            };
        }
        AppProfile.prototype.presentToast = function (position) {
            return __awaiter(this, void 0, void 0, function () {
                var toastElement;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.toastController = this.el.querySelector("ion-toast-controller");
                            return [4 /*yield*/, this.toastController.componentOnReady()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.toastController.create({
                                    message: '图形验证码错误',
                                    position: position,
                                    duration: 1000
                                })];
                        case 2:
                            toastElement = _a.sent();
                            return [4 /*yield*/, toastElement.present()];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AppProfile.prototype.presentToast2 = function (position) {
            return __awaiter(this, void 0, void 0, function () {
                var toastElement;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.toastController = this.el.querySelector("ion-toast-controller");
                            return [4 /*yield*/, this.toastController.componentOnReady()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.toastController.create({
                                    message: '验证码已发送',
                                    position: position,
                                    duration: 1000
                                })];
                        case 2:
                            toastElement = _a.sent();
                            return [4 /*yield*/, toastElement.present()];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AppProfile.prototype.componentWillLoad = function () {
            console.log('Component is about to be rendered');
            console.log('antlinker', antlinker);
            // debugger;
            var that = this;
            antlinker.getInitConfig({
                success: function (config) {
                    //config为初始化的配置参数
                    console.log("config", config);
                    if (config.length > 0) {
                        console.log("antlinker.getInitConfig ok!");
                        //config为初始化的配置参数
                        for (var i = 0; i < config.length; i++) {
                            console.log(i, config[i].Key);
                            if (config[i].Key == "App.Server.Host") {
                                console.log('config[i].Key', config[i].Key);
                                that.urlHead = config[i].Value;
                            }
                        }
                    }
                    console.log("head:" + that.urlHead);
                },
                fail: function () {
                    alert("SDK读取配置文件失败");
                }
            });
            // alert(that.urlHead);
            antlinker.getDeviceID({
                success: function (result) {
                    // alert("DeviceID:" + result.DeviceID);
                    that.DEVID = result.DeviceID;
                },
                fail: function () {
                    alert("加载配置参数失败");
                },
                complete: function () {
                }
            });
            antlinker.configTitle({
                type: "label",
                title: "忘记密码",
                success: function () {
                    // alert("标题修改成功")
                },
                fail: function () {
                    // alert("标题修改失败!")
                }
            });
            //debugger;
            antlinker.getAppVersion({
                success: function (result) {
                    // alert("Version:" + JSON.stringify(result));
                    this.VERSION = result.Version;
                },
                fail: function () {
                    // alert("oh no version!")
                },
                complete: function () {
                    console.log("over version");
                }
            });
            console.log(antlinker.uuid());
            this.CHKCODE = antlinker.uuid();
        };
        AppProfile.prototype.componentDidLoad = function () {
            console.log('Component has been rendered');
            // toast.presentToast();
        };
        AppProfile.prototype.componentWillUpdate = function () {
            console.log('Component will update and re-render');
        };
        AppProfile.prototype.componentDidUpdate = function () {
            console.log('Component did update');
        };
        AppProfile.prototype.componentDidUnload = function () {
            console.log('Component removed from the DOM');
        };
        //密码控制赋值
        AppProfile.prototype.handleChange = function (event) {
            this.password = event.target.value;
        };
        //重复密码
        AppProfile.prototype.handleChangeNew = function (event) {
            this.password_repeat = event.target.value;
        };
        //手机号
        AppProfile.prototype.handleTel = function (event) {
            // event.target.value = "23135135614"
            // replace(/[/\D{n,}$/g/\+/\-/\*/\#/./\,/\;/g]/,'');
            event.target.value = event.target.value.replace(/\D/g, '');
            this.tel = event.target.value;
            console.log(this.tel);
        };
        //手机验证码
        AppProfile.prototype.handleTel_yz = function (event) {
            this.tel_yz = event.target.value;
        };
        //图形验证码
        AppProfile.prototype.handlePic_yz = function (event) {
            this.pic_yz = event.target.value;
            console.log(this.pic_yz);
        };
        //获取当前时间
        AppProfile.prototype.pad2 = function (n) {
            return n < 10 ? '0' + n : n;
        };
        AppProfile.prototype.generateTimeReqestNumber = function () {
            var date = new Date();
            return date.getFullYear().toString() + this.pad2(date.getMonth() + 1) + this.pad2(date.getDate()) + this.pad2(date.getHours()) + this.pad2(date.getMinutes()) + this.pad2(date.getSeconds());
        };
        //提交
        AppProfile.prototype.send = function () {
            //判断密码是否为空
            if (this.password == '') {
                alert("请输入密码");
                return;
            }
            else if (this.password.trim() == '') {
                alert("密码不能为全空格");
                return;
            }
            //判断再次输入密码是否为空
            if (this.password_repeat == '') {
                alert("请输入确认密码");
                return;
            }
            // 判断密码的长度
            if (this.password.length < 6 || this.password.length > 20) {
                alert("密码长度限制为6-20个字符");
                return;
            }
            //判断密码是否为纯数字
            var patrn = /^[0-9]*$/;
            if (patrn.test(this.password)) {
                alert("密码不能为纯数字");
                return;
            }
            //判断两次密码是否一致
            if (this.password != this.password_repeat) {
                alert("两次密码不一致");
                return;
            }
            //判断手机号
            if (this.tel == '') {
                alert("手机号不能为空");
                return;
            }
            else {
                var tel_patrn = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (tel_patrn.test(this.tel))
                    ;
                else {
                    alert("请输入有效的手机号");
                    return;
                }
            }
            //判断手机验证码
            if (this.tel_yz == '') {
                alert("手机验证码不能为空");
                return;
            }
            //判断图形验证码
            // if (this.RE == 10 || this.RE == 11) {
            //   if (this.pic_yz == '') {
            //     alert("图形验证码不能为空");
            //     return;
            //   } else {
            //   }
            // } else {
            // }
            var params = {
                method: 'POST',
                header: '',
                body: JSON.stringify({
                    // CHKCODE: this.CHKCODE,
                    DEVID: this.DEVID,
                    //   EXIST: 1,
                    //   ICODE: '',
                    //   TEL: this.tel,
                    //   VERSION: this.VERSION
                    AID: this.CHKCODE,
                    ST: this.generateTimeReqestNumber(),
                    UPASS: md5(this.password).toUpperCase(),
                    TEL: this.tel,
                    CHECKKEY: this.tel_yz
                })
            };
            // this.url_head 暂时不加
            var url = this.urlHead + '/app/chngpass';
            fetch(url, params).then(function (r) { return r.json().then(function (result) {
                if (result.RE == 0) {
                    //成功
                    alert("密码修改成功");
                    antlinker.closeView({
                        success: function () {
                        },
                        fail: function () {
                            alert("跳转失败");
                        }
                    });
                }
                else if (result.RE == 1) {
                    alert("修改有误");
                    return;
                }
                else if (result.RE == 2) {
                    alert("验证码错误");
                    return;
                }
                else if (result.RE == 3) {
                    alert("密码不符合要求");
                    return;
                }
                else if (result.RE == 4) {
                    alert("手机号不是当前用户的绑定手机");
                    return;
                }
                else if (result.RE == 8) {
                    alert("验证码已失效");
                    return;
                }
                else {
                    alert(result.TEXT);
                    return;
                }
            }); });
        };
        AppProfile.prototype.show_modal = function () {
            var modal_container = document.getElementById("modal_container");
            var modal_inner = document.getElementById("modal_inner");
            modal_container.style.display = "block";
            modal_inner.style.display = "block";
        };
        //模态窗
        AppProfile.prototype.modal = function () {
            var modal_container = document.getElementById("modal_container");
            var modal_inner = document.getElementById("modal_inner");
            modal_container.style.display = "none";
            modal_inner.style.display = "none";
        };
        //提交
        AppProfile.prototype.sendPic = function () {
        };
        AppProfile.prototype.render = function () {
            var _this = this;
            return (h("div", { class: "app-profile" }, h("div", { class: "div_format_all top_div" }, h("div", { class: "div_left" }, "\u65B0\u5BC6\u7801"), h("div", { class: "div_left_inner" }, h("input", { class: "input_format", maxlength: "20", value: this.password, type: "password", onInput: function (event) { return _this.handleChange(event); }, placeholder: "\u8BF7\u8F93\u51656-20\u4F4D\u975E\u7EAF\u6570\u5B57\u5BC6\u7801" }))), h("div", { class: "div_format_all" }, h("div", { class: "div_left" }, "\u786E\u8BA4\u65B0\u5BC6\u7801"), h("div", { class: "div_left_inner" }, h("input", { class: "input_format", maxlength: "20", type: "password", value: this.password_repeat, onInput: function (event) { return _this.handleChangeNew(event); }, placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801" }))), h("div", { class: "div_format_all top_div" }, h("div", { class: "div_left" }, "\u624B\u673A\u53F7"), h("div", { class: "div_left_inner" }, h("input", { class: "input_format width40", type: "tel", value: this.tel, onInput: function (event) { return _this.handleTel(event); }, maxlength: "11", placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7" }), h("input", { type: "button", id: "btn", value: this.tel_get, class: "div_yz", onClick: function () { _this.sendTel(); } }))), h("div", { id: "pic_yz", class: "div_format_all margin_bottom1 none" }, h("div", { class: "div_left" }, "\u56FE\u5F62\u9A8C\u8BC1\u7801"), h("div", { class: "div_left_inner" }, h("input", { class: "input_format width55", type: "text", value: this.pic_yz, onInput: function (event) { return _this.handlePic_yz(event); }, placeholder: "\u8BF7\u8F93\u5165\u540E\u91CD\u65B0\u83B7\u53D6" }), h("div", { class: "div_pic_yz", onClick: function () { _this.sendPic(); } }, h("img", { class: "base64", src: this.pic_base64, onClick: function () { _this.sendTel2(); }, alt: "" })))), h("div", { class: "div_format_all" }, h("div", { class: "div_left" }, "\u9A8C\u8BC1\u7801"), h("div", { class: "div_left_inner" }, h("input", { class: "input_format", type: "text", value: this.tel_yz, onInput: function (event) { return _this.handleTel_yz(event); }, placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" }))), h("div", { class: "button", onClick: function () { _this.send(); } }, "\u786E\u5B9A"), h("div", { class: "button button_top10", onClick: function () { _this.show_modal(); } }, "\u65E0\u6CD5\u83B7\u53D6\u9A8C\u8BC1\u7801\u8BF7\u70B9\u51FB\u6B64\u5904"), h("ion-toast-controller", null), h("div", { class: "fix", id: "modal_container", onClick: function () { _this.modal(); } }, h("div", { class: "fix_inner", id: "modal_inner", onClick: function () { _this.modal(); } }, h("p", null, "1.\u82E5\u5FD8\u8BB0\u5BC6\u7801\u4E14\u66F4\u6362\u4E86\u624B\u673A\u53F7\u65E0\u6CD5\u83B7\u53D6\u9A8C\u8BC1\u7801\uFF0C\u8BF7\u5B66\u751F\u7528\u6237\u7EBF\u4E0B\u8054\u7CFB\u73ED\u59D4/\u8F85\u5BFC\u5458\uFF0C\u5B66\u5DE5\u7528\u6237\u8054\u7CFB\u7CFB\u7EDF\u7BA1\u7406\u5458\uFF0C\u4E3A\u8D26\u6237\u91CD\u7F6E\u5BC6\u7801"), h("p", null, "2.\u5982\u679C\u65E0\u6CD5\u6536\u5230\u9A8C\u8BC1\u7801\uFF0C\u8BF7\u591A\u5C1D\u8BD5\u51E0\u6B21\uFF0C\u5982\u679C\u4F9D\u7136\u6536\u4E0D\u5230\uFF0C\u4E5F\u8BF7\u8054\u7CFB\u76F8\u5173\u4EBA\u5458\u4E3A\u8D26\u53F7\u91CD\u7F6E\u5BC6\u7801"), h("p", null, "3.\u5BC6\u7801\u88AB\u91CD\u7F6E\u540E\uFF0C\u8BF7\u4F7F\u7528\u539F\u8D26\u53F7\u5C3D\u5FEB\u767B\u5F55\uFF0C\u91CD\u65B0\u7ED1\u5B9A\u624B\u673A\u53F7\u540E\u53D8\u66F4\u5BC6\u7801")))));
        };
        Object.defineProperty(AppProfile, "is", {
            get: function () { return "app-profile"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppProfile, "properties", {
            get: function () {
                return {
                    "CHKCODE": {
                        "state": true
                    },
                    "countdown": {
                        "state": true
                    },
                    "DEVID": {
                        "state": true
                    },
                    "el": {
                        "elementRef": true
                    },
                    "match": {
                        "type": "Any",
                        "attr": "match"
                    },
                    "password": {
                        "state": true
                    },
                    "password_repeat": {
                        "state": true
                    },
                    "pic_base64": {
                        "state": true
                    },
                    "pic_yz": {
                        "state": true
                    },
                    "RE": {
                        "state": true
                    },
                    "tel": {
                        "state": true
                    },
                    "tel_get": {
                        "state": true
                    },
                    "tel_yz": {
                        "state": true
                    },
                    "urlHead": {
                        "state": true
                    },
                    "VERSION": {
                        "state": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppProfile, "style", {
            get: function () { return "*{\n  margin: 0;\n  padding: 0;\n}\n\n*, :focus, :hover, :active {\n  -webkit-tap-highlight-color:rgba(0,0,0,0);\n  /* -webkit-user-modify:read-write-plaintext-only; */\n  outline:0;\n  }\n\ninput[type=button],input[type=text],input[type=password]{\n  -webkit-appearance: none;\n  outline:none;\n  border: 0px;\n}\n\ninput:disabled, input[disabled]{ \n  /* color: red; \n  -webkit-text-fill-color:red;  */\n  -webkit-opacity:1; \n  opacity: 1; \n  }\n\nbody{\n  background-color: #f5f5f5;\n}\n.div_format_all{\n  width: 100%;\n  height: 44px;\n  background-color: white;\n}\n.top_div{\n  margin: 10px 0 1px 0;\n}\n.div_left{\n  float: left;\n  height: 26.5px;\n  line-height: 26.5px;\n  margin: 9px 0 8.5px 15px;\n  font-family: PingFangSC-Regular;\n  font-size: 16px;\n  color: #3E3E3E;\n  letter-spacing: 0.19px;\n}\n.div_left_inner{\n  height: 44px;\n  margin-left: 103px;\n}\n.input_format{\n  width: 90%;\n  margin: 10px 0;\n  padding-left: 5px;\n  border: 0px;\n  height: 24px;\n  font-size: 14px;\n}\n.yzm{\n  height: 28px;\n  margin: 8px 15px;\n}\n.div_yz{\n  width: 100px;\n  padding: 0 5px;\n  height: 28px;\n  float: right;\n  margin: 8px 15px 8px 5px;\n  background: #FFC000;\n  border-radius: 4px;\n  font-family: PingFangSC-Regular;\n  font-size: 14px;\n  color: #FFFFFF;\n  line-height: 28px;\n  letter-spacing: 0.12px;\n}\n.div_pic_yz{\n  padding: 0 5px;\n  height: 28px;\n  float: right;\n  margin: 8px 15px;\n  background: #D5D5D5;\n  border-radius: 4px;\n  font-family: PingFangSC-Regular;\n  font-size: 10px;\n  color: #FFFFFF;\n  line-height: 28px;\n  letter-spacing: 0.12px;\n}\n\n.yellow{\n  background: #FFC000;\n}\n.button{\n  margin: 75px 27.5px 0 27.5px;\n  background: #FFC000;\n  border-radius: 4px;\n  font-family: PingFangSC-Regular;\n  font-size: 16px;\n  color: #FFFFFF;\n  letter-spacing: 0.19px;\n  text-align: center;\n  height: 40px;\n  line-height: 40px;\n}\n\n.button_top10{\n  margin-top: 10px;\n  color: #13A0FA;\n  background-color: white\n}\n\n.margin_bottom10{\n  margin-bottom: 10px;\n}\n.margin_bottom1{\n  margin-bottom: 1px;\n}\n.width40{\n  width: 40%;\n}\n\n.width55{\n  width: 55%;\n}\n\n.none{\n  display: none;\n}\n.base64{\n  height: 28px;\n}\n.toast-ios .toast-message{\n  background-color: rgba(0, 0, 0, 0.6);\n  text-align: center;  \n  color: white;\n  border-radius: 10px;\n}\n.toast-md .toast-message{\n  text-align: center;  \n  color: white;\n}\n\n\@media screen and (max-width: 321px) {\n  .div_yz{\n    width: 90px;\n    margin: 8px 5px 8px 5px;\n    font-size: 10px;\n  }\n  .width40{\n    width: 51%;\n  }\n}\n\n.fix{\n  display: none;\n  position: fixed;\n  top: 0;\n  bottom:0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  /* opacity: 0.3; */\n  z-index: 8888;\n}\n\n.fix_inner{\n  padding: 20px;\n  display: none;\n  position:fixed;\n  width: 280px;\n  height: 250px;\n  top: 0;\n  bottom:0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  background-color: white;\n}\n\n.fix_inner p{\n  margin-top: 5px;\n}"; },
            enumerable: true,
            configurable: true
        });
        return AppProfile;
    }());
    var CSS_PROP = function (docEle) {
        // transform
        var transformProp = [
            'webkitTransform',
            '-webkit-transform',
            'webkit-transform',
            'transform'
        ].find(function (key) { return docEle.style[key] !== undefined; }) || 'transform';
        var transitionProp = [
            'webkitTransition',
            'transition'
        ].find(function (key) { return docEle.style[key] !== undefined; }) || 'transition';
        // The only prefix we care about is webkit for transitions.
        var prefix = transitionProp.indexOf('webkit') > -1 ? '-webkit-' : '';
        return {
            transitionDurationProp: prefix + 'transition-duration',
            transitionTimingFnProp: prefix + 'transition-timing-function',
            transformProp: transformProp,
            transitionProp: transitionProp
        };
    }(document.documentElement);
    var CSS_VALUE_REGEX = /(^-?\d*\.?\d*)(.*)/;
    var DURATION_MIN = 32;
    var TRANSITION_END_FALLBACK_PADDING_MS = 400;
    function transitionEnd(el, callback) {
        var unRegTrans;
        var opts = { passive: true };
        function unregister() {
            unRegTrans && unRegTrans();
        }
        function onTransitionEnd(ev) {
            if (el === ev.target) {
                unregister();
                callback(ev);
            }
        }
        if (el) {
            el.addEventListener('webkitTransitionEnd', onTransitionEnd, opts);
            el.addEventListener('transitionend', onTransitionEnd, opts);
            unRegTrans = function () {
                el.removeEventListener('webkitTransitionEnd', onTransitionEnd, opts);
                el.removeEventListener('transitionend', onTransitionEnd, opts);
            };
        }
        return unregister;
    }
    var TRANSFORM_PROPS = {
        'translateX': 1,
        'translateY': 1,
        'translateZ': 1,
        'scale': 1,
        'scaleX': 1,
        'scaleY': 1,
        'scaleZ': 1,
        'rotate': 1,
        'rotateX': 1,
        'rotateY': 1,
        'rotateZ': 1,
        'skewX': 1,
        'skewY': 1,
        'perspective': 1
    };
    var raf = window.requestAnimationFrame || (function (f) { return f(); });
    var Animator = /** @class */ (function () {
        function Animator() {
            this._hasDur = false;
            this._hasTweenEffect = false;
            this._isAsync = false;
            this._isReverse = false;
            this._destroyed = false;
            this.hasChildren = false;
            this.isPlaying = false;
            this.hasCompleted = false;
        }
        Animator.prototype.addElement = function (el) {
            if (el) {
                if (el.length) {
                    for (var i = 0; i < el.length; i++) {
                        this._addEl(el[i]);
                    }
                }
                else {
                    this._addEl(el);
                }
            }
            return this;
        };
        /**
         * NO DOM
         */
        Animator.prototype._addEl = function (el) {
            if (el.nodeType === 1) {
                (this._elements = this._elements || []).push(el);
            }
        };
        /**
         * Add a child animation to this animation.
         */
        Animator.prototype.add = function (childAnimation) {
            childAnimation.parent = this;
            this.hasChildren = true;
            (this._childAnimations = this._childAnimations || []).push(childAnimation);
            return this;
        };
        /**
         * Get the duration of this animation. If this animation does
         * not have a duration, then it'll get the duration from its parent.
         */
        Animator.prototype.getDuration = function (opts) {
            if (opts && opts.duration != null) {
                return opts.duration;
            }
            else if (this._duration != null) {
                return this._duration;
            }
            else if (this.parent) {
                return this.parent.getDuration();
            }
            return 0;
        };
        /**
         * Returns if the animation is a root one.
         */
        Animator.prototype.isRoot = function () {
            return !this.parent;
        };
        /**
         * Set the duration for this animation.
         */
        Animator.prototype.duration = function (milliseconds) {
            this._duration = milliseconds;
            return this;
        };
        /**
         * Get the easing of this animation. If this animation does
         * not have an easing, then it'll get the easing from its parent.
         */
        Animator.prototype.getEasing = function () {
            if (this._isReverse && this._reversedEasingName) {
                return this._reversedEasingName;
            }
            return this._easingName != null ? this._easingName : (this.parent && this.parent.getEasing()) || null;
        };
        /**
         * Set the easing for this animation.
         */
        Animator.prototype.easing = function (name) {
            this._easingName = name;
            return this;
        };
        /**
         * Set the easing for this reversed animation.
         */
        Animator.prototype.easingReverse = function (name) {
            this._reversedEasingName = name;
            return this;
        };
        /**
         * Add the "from" value for a specific property.
         */
        Animator.prototype.from = function (prop, val) {
            this._addProp('from', prop, val);
            return this;
        };
        /**
         * Add the "to" value for a specific property.
         */
        Animator.prototype.to = function (prop, val, clearProperyAfterTransition) {
            var fx = this._addProp('to', prop, val);
            if (clearProperyAfterTransition) {
                // if this effect is a transform then clear the transform effect
                // otherwise just clear the actual property
                this.afterClearStyles([fx.trans ? CSS_PROP.transformProp : prop]);
            }
            return this;
        };
        /**
         * Shortcut to add both the "from" and "to" for the same property.
         */
        Animator.prototype.fromTo = function (prop, fromVal, toVal, clearProperyAfterTransition) {
            return this.from(prop, fromVal).to(prop, toVal, clearProperyAfterTransition);
        };
        /**
         * NO DOM
         */
        Animator.prototype._getProp = function (name) {
            if (this._fxProperties) {
                return this._fxProperties.find(function (prop) { return prop.effectName === name; });
            }
            return undefined;
        };
        Animator.prototype._addProp = function (state, prop, val) {
            var fxProp = this._getProp(prop);
            if (!fxProp) {
                // first time we've see this EffectProperty
                var shouldTrans = (TRANSFORM_PROPS[prop] === 1);
                fxProp = {
                    effectName: prop,
                    trans: shouldTrans,
                    // add the will-change property for transforms or opacity
                    wc: (shouldTrans ? CSS_PROP.transformProp : prop)
                };
                (this._fxProperties = this._fxProperties || []).push(fxProp);
            }
            // add from/to EffectState to the EffectProperty
            var fxState = {
                val: val,
                num: 0,
                effectUnit: '',
            };
            fxProp[state] = fxState;
            if (typeof val === 'string' && val.indexOf(' ') < 0) {
                var r = val.match(CSS_VALUE_REGEX);
                if (r) {
                    var num = parseFloat(r[1]);
                    if (!isNaN(num)) {
                        fxState.num = num;
                    }
                    fxState.effectUnit = (r[0] !== r[2] ? r[2] : '');
                }
            }
            else if (typeof val === 'number') {
                fxState.num = val;
            }
            return fxProp;
        };
        /**
         * Add CSS class to this animation's elements
         * before the animation begins.
         */
        Animator.prototype.beforeAddClass = function (className) {
            (this._beforeAddClasses = this._beforeAddClasses || []).push(className);
            return this;
        };
        /**
         * Remove CSS class from this animation's elements
         * before the animation begins.
         */
        Animator.prototype.beforeRemoveClass = function (className) {
            (this._beforeRemoveClasses = this._beforeRemoveClasses || []).push(className);
            return this;
        };
        /**
         * Sets a CSS class during the duration of the animation.
         */
        Animator.prototype.duringAddClass = function (className) {
            this.beforeAddClass(className);
            this.afterRemoveClass(className);
            return this;
        };
        /**
         * Set CSS inline styles to this animation's elements
         * before the animation begins.
         */
        Animator.prototype.beforeStyles = function (styles) {
            this._beforeStyles = styles;
            return this;
        };
        /**
         * Clear CSS inline styles from this animation's elements
         * before the animation begins.
         */
        Animator.prototype.beforeClearStyles = function (propertyNames) {
            this._beforeStyles = this._beforeStyles || {};
            for (var i = 0; i < propertyNames.length; i++) {
                this._beforeStyles[propertyNames[i]] = '';
            }
            return this;
        };
        /**
         * Add a function which contains DOM reads, which will run
         * before the animation begins.
         */
        Animator.prototype.beforeAddRead = function (domReadFn) {
            (this._readCallbacks = this._readCallbacks || []).push(domReadFn);
            return this;
        };
        /**
         * Add a function which contains DOM writes, which will run
         * before the animation begins.
         */
        Animator.prototype.beforeAddWrite = function (domWriteFn) {
            (this._writeCallbacks = this._writeCallbacks || []).push(domWriteFn);
            return this;
        };
        /**
         * Add CSS class to this animation's elements
         * after the animation finishes.
         */
        Animator.prototype.afterAddClass = function (className) {
            (this._afterAddClasses = this._afterAddClasses || []).push(className);
            return this;
        };
        /**
         * Remove CSS class from this animation's elements
         * after the animation finishes.
         */
        Animator.prototype.afterRemoveClass = function (className) {
            (this._afterRemoveClasses = this._afterRemoveClasses || []).push(className);
            return this;
        };
        /**
         * Set CSS inline styles to this animation's elements
         * after the animation finishes.
         */
        Animator.prototype.afterStyles = function (styles) {
            this._afterStyles = styles;
            return this;
        };
        /**
         * Clear CSS inline styles from this animation's elements
         * after the animation finishes.
         */
        Animator.prototype.afterClearStyles = function (propertyNames) {
            this._afterStyles = this._afterStyles || {};
            for (var i = 0; i < propertyNames.length; i++) {
                this._afterStyles[propertyNames[i]] = '';
            }
            return this;
        };
        /**
         * Play the animation.
         */
        Animator.prototype.play = function (opts) {
            var self = this;
            // If the animation was already invalidated (it did finish), do nothing
            if (self._destroyed) {
                return;
            }
            // this is the top level animation and is in full control
            // of when the async play() should actually kick off
            // if there is no duration then it'll set the TO property immediately
            // if there is a duration, then it'll stage all animations at the
            // FROM property and transition duration, wait a few frames, then
            // kick off the animation by setting the TO property for each animation
            self._isAsync = self._hasDuration(opts);
            // ensure all past transition end events have been cleared
            self._clearAsync();
            // recursively kicks off the correct progress step for each child animation
            // ******** DOM WRITE ****************
            self._playInit(opts);
            // doubling up RAFs since this animation was probably triggered
            // from an input event, and just having one RAF would have this code
            // run within the same frame as the triggering input event, and the
            // input event probably already did way too much work for one frame
            raf(function () {
                raf(function () {
                    self._playDomInspect(opts);
                });
            });
        };
        Animator.prototype.playAsync = function (opts) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.onFinish(resolve, { oneTimeCallback: true, clearExistingCallacks: true });
                _this.play(opts);
                return _this;
            });
        };
        Animator.prototype.playSync = function () {
            // If the animation was already invalidated (it did finish), do nothing
            if (!this._destroyed) {
                var opts = { duration: 0 };
                this._isAsync = false;
                this._clearAsync();
                this._playInit(opts);
                this._playDomInspect(opts);
            }
        };
        /**
         * DOM WRITE
         * RECURSION
         */
        Animator.prototype._playInit = function (opts) {
            // always default that an animation does not tween
            // a tween requires that an Animation class has an element
            // and that it has at least one FROM/TO effect
            // and that the FROM/TO effect can tween numeric values
            this._hasTweenEffect = false;
            this.isPlaying = true;
            this.hasCompleted = false;
            this._hasDur = (this.getDuration(opts) > DURATION_MIN);
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    // ******** DOM WRITE ****************
                    children[i]._playInit(opts);
                }
            }
            if (this._hasDur) {
                // if there is a duration then we want to start at step 0
                // ******** DOM WRITE ****************
                this._progress(0);
                // add the will-change properties
                // ******** DOM WRITE ****************
                this._willChange(true);
            }
        };
        /**
         * DOM WRITE
         * NO RECURSION
         * ROOT ANIMATION
         */
        Animator.prototype._playDomInspect = function (opts) {
            var self = this;
            // fire off all the "before" function that have DOM READS in them
            // elements will be in the DOM, however visibily hidden
            // so we can read their dimensions if need be
            // ******** DOM READ ****************
            // ******** DOM WRITE ****************
            self._beforeAnimation();
            // for the root animation only
            // set the async TRANSITION END event
            // and run onFinishes when the transition ends
            var dur = self.getDuration(opts);
            if (self._isAsync) {
                self._asyncEnd(dur, true);
            }
            // ******** DOM WRITE ****************
            self._playProgress(opts);
            if (self._isAsync && !this._destroyed) {
                // this animation has a duration so we need another RAF
                // for the CSS TRANSITION properties to kick in
                raf(function () {
                    self._playToStep(1);
                });
            }
        };
        /**
         * DOM WRITE
         * RECURSION
         */
        Animator.prototype._playProgress = function (opts) {
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    // ******** DOM WRITE ****************
                    children[i]._playProgress(opts);
                }
            }
            if (this._hasDur) {
                // set the CSS TRANSITION duration/easing
                // ******** DOM WRITE ****************
                this._setTrans(this.getDuration(opts), false);
            }
            else {
                // this animation does not have a duration, so it should not animate
                // just go straight to the TO properties and call it done
                // ******** DOM WRITE ****************
                this._progress(1);
                // since there was no animation, immediately run the after
                // ******** DOM WRITE ****************
                this._setAfterStyles();
                // this animation has no duration, so it has finished
                // other animations could still be running
                this._didFinish(true);
            }
        };
        /**
         * DOM WRITE
         * RECURSION
         */
        Animator.prototype._playToStep = function (stepValue) {
            if (!this._destroyed) {
                var children = this._childAnimations;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        // ******** DOM WRITE ****************
                        children[i]._playToStep(stepValue);
                    }
                }
                if (this._hasDur) {
                    // browser had some time to render everything in place
                    // and the transition duration/easing is set
                    // now set the TO properties which will trigger the transition to begin
                    // ******** DOM WRITE ****************
                    this._progress(stepValue);
                }
            }
        };
        /**
         * DOM WRITE
         * NO RECURSION
         * ROOT ANIMATION
         */
        Animator.prototype._asyncEnd = function (dur, shouldComplete) {
            var self = this;
            function onTransitionEnd() {
                // congrats! a successful transition completed!
                // ensure transition end events and timeouts have been cleared
                self._clearAsync();
                // ******** DOM WRITE ****************
                self._playEnd();
                // transition finished
                self._didFinishAll(shouldComplete, true, false);
            }
            function onTransitionFallback() {
                console.debug('Animation onTransitionFallback, CSS onTransitionEnd did not fire!');
                // oh noz! the transition end event didn't fire in time!
                // instead the fallback timer when first
                // if all goes well this fallback should never fire
                // clear the other async end events from firing
                self._timerId = undefined;
                self._clearAsync();
                // set the after styles
                // ******** DOM WRITE ****************
                self._playEnd(shouldComplete ? 1 : 0);
                // transition finished
                self._didFinishAll(shouldComplete, true, false);
            }
            // set the TRANSITION END event on one of the transition elements
            self._unregisterTrnsEnd = transitionEnd(self._transEl(), onTransitionEnd);
            // set a fallback timeout if the transition end event never fires, or is too slow
            // transition end fallback: (animation duration + XXms)
            self._timerId = setTimeout(onTransitionFallback, (dur + TRANSITION_END_FALLBACK_PADDING_MS));
        };
        /**
         * DOM WRITE
         * RECURSION
         */
        Animator.prototype._playEnd = function (stepValue) {
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    // ******** DOM WRITE ****************
                    children[i]._playEnd(stepValue);
                }
            }
            if (this._hasDur) {
                if (stepValue !== null && stepValue !== undefined) {
                    // too late to have a smooth animation, just finish it
                    // ******** DOM WRITE ****************
                    this._setTrans(0, true);
                    // ensure the ending progress step gets rendered
                    // ******** DOM WRITE ****************
                    this._progress(stepValue);
                }
                // set the after styles
                // ******** DOM WRITE ****************
                this._setAfterStyles();
                // remove the will-change properties
                // ******** DOM WRITE ****************
                this._willChange(false);
            }
        };
        /**
         * NO DOM
         * RECURSION
         */
        Animator.prototype._hasDuration = function (opts) {
            if (this.getDuration(opts) > DURATION_MIN) {
                return true;
            }
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    if (children[i]._hasDuration(opts)) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * NO DOM
         * RECURSION
         */
        Animator.prototype._hasDomReads = function () {
            if (this._readCallbacks && this._readCallbacks.length) {
                return true;
            }
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    if (children[i]._hasDomReads()) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * Immediately stop at the end of the animation.
         */
        Animator.prototype.stop = function (stepValue) {
            if (stepValue === undefined) {
                stepValue = 1;
            }
            // ensure all past transition end events have been cleared
            this._clearAsync();
            this._hasDur = true;
            this._playEnd(stepValue);
        };
        /**
         * NO DOM
         * NO RECURSION
         */
        Animator.prototype._clearAsync = function () {
            this._unregisterTrnsEnd && this._unregisterTrnsEnd();
            this._timerId && clearTimeout(this._timerId);
            this._timerId = this._unregisterTrnsEnd = undefined;
        };
        /**
         * DOM WRITE
         * NO RECURSION
         */
        Animator.prototype._progress = function (stepValue) {
            // bread 'n butter
            var val;
            var elements = this._elements;
            var effects = this._fxProperties;
            if (!elements || elements.length === 0 || !effects || this._destroyed) {
                return;
            }
            // flip the number if we're going in reverse
            if (this._isReverse) {
                stepValue = 1 - stepValue;
            }
            var i = 0;
            var j = 0;
            var finalTransform = '';
            var fx;
            for (i = 0; i < effects.length; i++) {
                fx = effects[i];
                if (fx.from && fx.to) {
                    var fromNum = fx.from.num;
                    var toNum = fx.to.num;
                    var tweenEffect = (fromNum !== toNum);
                    if (tweenEffect) {
                        this._hasTweenEffect = true;
                    }
                    if (stepValue === 0) {
                        // FROM
                        val = fx.from.val;
                    }
                    else if (stepValue === 1) {
                        // TO
                        val = fx.to.val;
                    }
                    else if (tweenEffect) {
                        // EVERYTHING IN BETWEEN
                        var valNum = (((toNum - fromNum) * stepValue) + fromNum);
                        var unit = fx.to.effectUnit;
                        val = valNum + unit;
                    }
                    if (val !== null) {
                        var prop = fx.effectName;
                        if (fx.trans) {
                            finalTransform += prop + '(' + val + ') ';
                        }
                        else {
                            for (j = 0; j < elements.length; j++) {
                                // ******** DOM WRITE ****************
                                elements[j].style[prop] = val;
                            }
                        }
                    }
                }
            }
            // place all transforms on the same property
            if (finalTransform.length) {
                if (!this._isReverse && stepValue !== 1 || this._isReverse && stepValue !== 0) {
                    finalTransform += 'translateZ(0px)';
                }
                for (i = 0; i < elements.length; i++) {
                    // ******** DOM WRITE ****************
                    elements[i].style[CSS_PROP.transformProp] = finalTransform;
                }
            }
        };
        /**
         * DOM WRITE
         * NO RECURSION
         */
        Animator.prototype._setTrans = function (dur, forcedLinearEasing) {
            // Transition is not enabled if there are not effects
            var elements = this._elements;
            if (!elements || elements.length === 0 || !this._fxProperties) {
                return;
            }
            // set the TRANSITION properties inline on the element
            var easing = (forcedLinearEasing ? 'linear' : this.getEasing());
            var durString = dur + 'ms';
            var cssTransform = CSS_PROP.transitionProp;
            var cssTransitionDuration = CSS_PROP.transitionDurationProp;
            var cssTransitionTimingFn = CSS_PROP.transitionTimingFnProp;
            var eleStyle;
            for (var i = 0; i < elements.length; i++) {
                eleStyle = elements[i].style;
                if (dur > 0) {
                    // ******** DOM WRITE ****************
                    eleStyle[cssTransform] = '';
                    eleStyle[cssTransitionDuration] = durString;
                    // each animation can have a different easing
                    if (easing) {
                        // ******** DOM WRITE ****************
                        eleStyle[cssTransitionTimingFn] = easing;
                    }
                }
                else {
                    eleStyle[cssTransform] = 'none';
                }
            }
        };
        /**
         * DOM READ
         * DOM WRITE
         * RECURSION
         */
        Animator.prototype._beforeAnimation = function () {
            // fire off all the "before" function that have DOM READS in them
            // elements will be in the DOM, however visibily hidden
            // so we can read their dimensions if need be
            // ******** DOM READ ****************
            this._fireBeforeReadFunc();
            // ******** DOM READS ABOVE / DOM WRITES BELOW ****************
            // fire off all the "before" function that have DOM WRITES in them
            // ******** DOM WRITE ****************
            this._fireBeforeWriteFunc();
            // stage all of the before css classes and inline styles
            // ******** DOM WRITE ****************
            this._setBeforeStyles();
        };
        /**
         * DOM WRITE
         * RECURSION
         */
        Animator.prototype._setBeforeStyles = function () {
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    children[i]._setBeforeStyles();
                }
            }
            var elements = this._elements;
            // before the animations have started
            // only set before styles if animation is not reversed
            if (!elements || elements.length === 0 || this._isReverse) {
                return;
            }
            var addClasses = this._beforeAddClasses;
            var removeClasses = this._beforeRemoveClasses;
            for (var i = 0; i < elements.length; i++) {
                var el = elements[i];
                var elementClassList = el.classList;
                // css classes to add before the animation
                if (addClasses) {
                    for (var j = 0; j < addClasses.length; j++) {
                        // ******** DOM WRITE ****************
                        elementClassList.add(addClasses[j]);
                    }
                }
                // css classes to remove before the animation
                if (removeClasses) {
                    for (var j = 0; j < removeClasses.length; j++) {
                        // ******** DOM WRITE ****************
                        elementClassList.remove(removeClasses[j]);
                    }
                }
                // inline styles to add before the animation
                if (this._beforeStyles) {
                    for (var prop in this._beforeStyles) {
                        // ******** DOM WRITE ****************
                        el.style[prop] = this._beforeStyles[prop];
                    }
                }
            }
        };
        /**
         * DOM READ
         * RECURSION
         */
        Animator.prototype._fireBeforeReadFunc = function () {
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    // ******** DOM READ ****************
                    children[i]._fireBeforeReadFunc();
                }
            }
            var readFunctions = this._readCallbacks;
            if (readFunctions) {
                for (var i = 0; i < readFunctions.length; i++) {
                    // ******** DOM READ ****************
                    readFunctions[i]();
                }
            }
        };
        /**
         * DOM WRITE
         * RECURSION
         */
        Animator.prototype._fireBeforeWriteFunc = function () {
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    // ******** DOM WRITE ****************
                    children[i]._fireBeforeWriteFunc();
                }
            }
            var writeFunctions = this._writeCallbacks;
            if (writeFunctions) {
                for (var i = 0; i < writeFunctions.length; i++) {
                    // ******** DOM WRITE ****************
                    writeFunctions[i]();
                }
            }
        };
        /**
         * DOM WRITE
         */
        Animator.prototype._setAfterStyles = function () {
            var i, j;
            var el;
            var elementClassList;
            var elements = this._elements;
            if (!elements) {
                return;
            }
            var prop;
            for (i = 0; i < elements.length; i++) {
                el = elements[i];
                elementClassList = el.classList;
                // remove the transition duration/easing
                // ******** DOM WRITE ****************
                el.style[CSS_PROP.transitionDurationProp] = el.style[CSS_PROP.transitionTimingFnProp] = '';
                if (this._isReverse) {
                    // finished in reverse direction
                    // css classes that were added before the animation should be removed
                    var beforeAddClasses = this._beforeAddClasses;
                    if (beforeAddClasses) {
                        for (j = 0; j < beforeAddClasses.length; j++) {
                            // ******** DOM WRITE ****************
                            elementClassList.remove(beforeAddClasses[j]);
                        }
                    }
                    // css classes that were removed before the animation should be added
                    var beforeRemoveClasses = this._beforeRemoveClasses;
                    if (beforeRemoveClasses) {
                        for (j = 0; j < beforeRemoveClasses.length; j++) {
                            // ******** DOM WRITE ****************
                            elementClassList.add(beforeRemoveClasses[j]);
                        }
                    }
                    // inline styles that were added before the animation should be removed
                    var beforeStyles = this._beforeStyles;
                    if (beforeStyles) {
                        for (prop in beforeStyles) {
                            // ******** DOM WRITE ****************
                            el.style[prop] = '';
                        }
                    }
                }
                else {
                    // finished in forward direction
                    // css classes to add after the animation
                    var afterAddClasses = this._afterAddClasses;
                    if (afterAddClasses) {
                        for (j = 0; j < afterAddClasses.length; j++) {
                            // ******** DOM WRITE ****************
                            elementClassList.add(afterAddClasses[j]);
                        }
                    }
                    // css classes to remove after the animation
                    var afterRemoveClasses = this._afterRemoveClasses;
                    if (afterRemoveClasses) {
                        for (j = 0; j < afterRemoveClasses.length; j++) {
                            // ******** DOM WRITE ****************
                            elementClassList.remove(afterRemoveClasses[j]);
                        }
                    }
                    // inline styles to add after the animation
                    var afterStyles = this._afterStyles;
                    if (afterStyles) {
                        for (prop in afterStyles) {
                            // ******** DOM WRITE ****************
                            el.style[prop] = afterStyles[prop];
                        }
                    }
                }
            }
        };
        /**
         * DOM WRITE
         * NO RECURSION
         */
        Animator.prototype._willChange = function (addWillChange) {
            var wc;
            var effects = this._fxProperties;
            var willChange;
            if (addWillChange && effects) {
                wc = [];
                for (var i = 0; i < effects.length; i++) {
                    var propWC = effects[i].wc;
                    if (propWC === 'webkitTransform') {
                        wc.push('transform', '-webkit-transform');
                    }
                    else if (propWC) {
                        wc.push(propWC);
                    }
                }
                willChange = wc.join(',');
            }
            else {
                willChange = '';
            }
            var elements = this._elements;
            if (elements) {
                for (var i = 0; i < elements.length; i++) {
                    // ******** DOM WRITE ****************
                    elements[i].style.willChange = willChange;
                }
            }
        };
        /**
         * Start the animation with a user controlled progress.
         */
        Animator.prototype.progressStart = function () {
            // ensure all past transition end events have been cleared
            this._clearAsync();
            // ******** DOM READ/WRITE ****************
            this._beforeAnimation();
            // ******** DOM WRITE ****************
            this._progressStart();
        };
        /**
         * DOM WRITE
         * RECURSION
         */
        Animator.prototype._progressStart = function () {
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    // ******** DOM WRITE ****************
                    children[i]._progressStart();
                }
            }
            // force no duration, linear easing
            // ******** DOM WRITE ****************
            this._setTrans(0, true);
            // ******** DOM WRITE ****************
            this._willChange(true);
        };
        /**
         * Set the progress step for this animation.
         * progressStep() is not debounced, so it should not be called faster than 60FPS.
         */
        Animator.prototype.progressStep = function (stepValue) {
            // only update if the last update was more than 16ms ago
            stepValue = Math.min(1, Math.max(0, stepValue));
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    // ******** DOM WRITE ****************
                    children[i].progressStep(stepValue);
                }
            }
            // ******** DOM WRITE ****************
            this._progress(stepValue);
        };
        /**
         * End the progress animation.
         */
        Animator.prototype.progressEnd = function (shouldComplete, currentStepValue, dur) {
            var _this = this;
            if (this._isReverse) {
                // if the animation is going in reverse then
                // flip the step value: 0 becomes 1, 1 becomes 0
                currentStepValue = 1 - currentStepValue;
            }
            var stepValue = shouldComplete ? 1 : 0;
            var diff = Math.abs(currentStepValue - stepValue);
            if (dur === undefined) {
                dur = -1;
            }
            if (dur < 0) {
                dur = this._duration || 0;
            }
            else if (diff < 0.05) {
                dur = 0;
            }
            this._isAsync = (dur > 30);
            this._progressEnd(shouldComplete, stepValue, dur, this._isAsync);
            if (this._isAsync) {
                // for the root animation only
                // set the async TRANSITION END event
                // and run onFinishes when the transition ends
                // ******** DOM WRITE ****************
                this._asyncEnd(dur, shouldComplete);
                // this animation has a duration so we need another RAF
                // for the CSS TRANSITION properties to kick in
                if (!this._destroyed) {
                    raf(function () {
                        _this._playToStep(stepValue);
                    });
                }
            }
        };
        /**
         * DOM WRITE
         * RECURSION
         */
        Animator.prototype._progressEnd = function (shouldComplete, stepValue, dur, isAsync) {
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    // ******** DOM WRITE ****************
                    children[i]._progressEnd(shouldComplete, stepValue, dur, isAsync);
                }
            }
            if (!isAsync) {
                // stop immediately
                // set all the animations to their final position
                // ******** DOM WRITE ****************
                this._progress(stepValue);
                this._willChange(false);
                this._setAfterStyles();
                this._didFinish(shouldComplete);
            }
            else {
                // animate it back to it's ending position
                this.isPlaying = true;
                this.hasCompleted = false;
                this._hasDur = true;
                // ******** DOM WRITE ****************
                this._willChange(true);
                this._setTrans(dur, false);
            }
        };
        /**
         * Add a callback to fire when the animation has finished.
         */
        Animator.prototype.onFinish = function (callback, opts) {
            if (opts && opts.clearExistingCallacks) {
                this._onFinishCallbacks = this._onFinishOneTimeCallbacks = undefined;
            }
            if (opts && opts.oneTimeCallback) {
                this._onFinishOneTimeCallbacks = this._onFinishOneTimeCallbacks || [];
                this._onFinishOneTimeCallbacks.push(callback);
            }
            else {
                this._onFinishCallbacks = this._onFinishCallbacks || [];
                this._onFinishCallbacks.push(callback);
            }
            return this;
        };
        /**
         * NO DOM
         * RECURSION
         */
        Animator.prototype._didFinishAll = function (hasCompleted, finishAsyncAnimations, finishNoDurationAnimations) {
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    children[i]._didFinishAll(hasCompleted, finishAsyncAnimations, finishNoDurationAnimations);
                }
            }
            if (finishAsyncAnimations && this._isAsync || finishNoDurationAnimations && !this._isAsync) {
                this._didFinish(hasCompleted);
            }
        };
        /**
         * NO RECURSION
         */
        Animator.prototype._didFinish = function (hasCompleted) {
            this.isPlaying = false;
            this.hasCompleted = hasCompleted;
            if (this._onFinishCallbacks) {
                // run all finish callbacks
                for (var i = 0; i < this._onFinishCallbacks.length; i++) {
                    this._onFinishCallbacks[i](this);
                }
            }
            if (this._onFinishOneTimeCallbacks) {
                // run all "onetime" finish callbacks
                for (var i = 0; i < this._onFinishOneTimeCallbacks.length; i++) {
                    this._onFinishOneTimeCallbacks[i](this);
                }
                this._onFinishOneTimeCallbacks.length = 0;
            }
        };
        /**
         * Reverse the animation.
         */
        Animator.prototype.reverse = function (shouldReverse) {
            if (shouldReverse === undefined) {
                shouldReverse = true;
            }
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    children[i].reverse(shouldReverse);
                }
            }
            this._isReverse = !!shouldReverse;
            return this;
        };
        /**
         * Recursively destroy this animation and all child animations.
         */
        Animator.prototype.destroy = function () {
            this._destroyed = true;
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    children[i].destroy();
                }
            }
            this._clearAsync();
            if (this._elements) {
                this._elements.length = 0;
            }
            if (this._readCallbacks) {
                this._readCallbacks.length = 0;
            }
            if (this._writeCallbacks) {
                this._writeCallbacks.length = 0;
            }
            this.parent = undefined;
            if (this._childAnimations) {
                this._childAnimations.length = 0;
            }
            if (this._onFinishCallbacks) {
                this._onFinishCallbacks.length = 0;
            }
            if (this._onFinishOneTimeCallbacks) {
                this._onFinishOneTimeCallbacks.length = 0;
            }
        };
        /**
         * NO DOM
         */
        Animator.prototype._transEl = function () {
            // get the lowest level element that has an Animator
            var children = this._childAnimations;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var targetEl = children[i]._transEl();
                    if (targetEl) {
                        return targetEl;
                    }
                }
            }
            return (this._hasTweenEffect &&
                this._hasDur &&
                this._elements &&
                this._elements.length > 0 ?
                this._elements[0] : null);
        };
        return Animator;
    }());
    var AnimationControllerImpl = /** @class */ (function () {
        function AnimationControllerImpl() {
        }
        AnimationControllerImpl.prototype.create = function (animationBuilder, baseEl, opts) {
            if (animationBuilder) {
                return animationBuilder(Animator, baseEl, opts);
            }
            return Promise.resolve(new Animator());
        };
        Object.defineProperty(AnimationControllerImpl, "is", {
            get: function () { return "ion-animation-controller"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationControllerImpl, "properties", {
            get: function () {
                return {
                    "create": {
                        "method": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        return AnimationControllerImpl;
    }());
    /**
     * Create the mode and color classes for the component based on the classes passed in
     */
    function createThemedClasses(mode, color, classes) {
        var classObj = {};
        getClassList(classes).forEach(function (classString) {
            classObj[classString] = true;
            if (mode) {
                classObj[classString + "-" + mode] = true;
                if (color) {
                    classObj[classString + "-" + color] = true;
                    classObj[classString + "-" + mode + "-" + color] = true;
                }
            }
        });
        return classObj;
    }
    /**
     * Get the classes from a class list and return them as an object
     */
    function getElementClassMap(classList) {
        var classObj = {};
        for (var i = 0; i < classList.length; i++) {
            classObj[classList[i]] = true;
        }
        return classObj;
    }
    /**
     * Get the classes based on the button type
     * e.g. alert-button, action-sheet-button
     */
    function getButtonClassMap(buttonType, mode) {
        var _a;
        if (!buttonType) {
            return {};
        }
        return _a = {},
            _a[buttonType] = true,
            _a[buttonType + "-" + mode] = true,
            _a;
    }
    function getClassList(classes) {
        if (classes) {
            var array = Array.isArray(classes) ? classes : classes.split(' ');
            return array
                .filter(function (c) { return c != null; })
                .map(function (c) { return c.trim(); })
                .filter(function (c) { return c !== ''; });
        }
        return [];
    }
    function getClassMap(classes) {
        var map = {};
        getClassList(classes).forEach(function (c) { return map[c] = true; });
        return map;
    }
    function openURL(win, url, ev, direction) {
        return __awaiter(this, void 0, void 0, function () {
            var router;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(url && url[0] !== '#' && url.indexOf('://') === -1)) return [3 /*break*/, 2];
                        router = win.document.querySelector('ion-router');
                        if (!router) return [3 /*break*/, 2];
                        ev && ev.preventDefault();
                        return [4 /*yield*/, router.componentOnReady()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, router.push(url, direction)];
                    case 2: return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    }
    var Button = /** @class */ (function () {
        function Button() {
            this.keyFocus = false;
            /**
             * The type of button.
             * Possible values are: `"button"`, `"bar-button"`.
             */
            this.buttonType = 'button';
            /**
             * If true, the user cannot interact with the button. Defaults to `false`.
             */
            this.disabled = false;
            /**
             * Set to `"clear"` for a transparent button, to `"outline"` for a transparent
             * button with a border, or to `"solid"`. The default style is `"solid"` except inside of
             * a toolbar, where the default is `"clear"`.
             */
            this.fill = 'default';
            /**
             * If true, activates a button with a heavier font weight.
             */
            this.strong = false;
            /**
             * The type of the button.
             * Possible values are: `"submit"`, `"reset"` and `"button"`.
             * Default value is: `"button"`
             */
            this.type = 'button';
        }
        Button.prototype.componentWillLoad = function () {
            if (this.el.closest('ion-buttons')) {
                this.buttonType = 'bar-button';
            }
        };
        Button.prototype.onFocus = function () {
            this.ionFocus.emit();
        };
        Button.prototype.onKeyUp = function () {
            this.keyFocus = true;
        };
        Button.prototype.onBlur = function () {
            this.keyFocus = false;
            this.ionBlur.emit();
        };
        Button.prototype.render = function () {
            var _this = this;
            var _a = this, buttonType = _a.buttonType, color = _a.color, expand = _a.expand, fill = _a.fill, mode = _a.mode, shape = _a.shape, size = _a.size, strong = _a.strong;
            var TagType = this.href ? 'a' : 'button';
            var buttonClasses = Object.assign({}, getButtonClassMap(buttonType, mode), getButtonTypeClassMap(buttonType, expand, mode), getButtonTypeClassMap(buttonType, size, mode), getButtonTypeClassMap(buttonType, shape, mode), getButtonTypeClassMap(buttonType, strong ? 'strong' : undefined, mode), getColorClassMap(buttonType, color, fill, mode), getElementClassMap(this.el.classList), { 'focused': this.keyFocus });
            var attrs = (TagType === 'button')
                ? { type: this.type }
                : { href: this.href };
            return (h(TagType, Object.assign({}, attrs, { class: buttonClasses, disabled: this.disabled, onFocus: this.onFocus.bind(this), onKeyUp: this.onKeyUp.bind(this), onBlur: this.onBlur.bind(this), onClick: function (ev) { return openURL(_this.win, _this.href, ev, _this.routerDirection); } }), h("span", { class: "button-inner" }, h("slot", { name: "icon-only" }), h("slot", { name: "start" }), h("slot", null), h("slot", { name: "end" })), this.mode === 'md' && h("ion-ripple-effect", { tapClick: true })));
        };
        Object.defineProperty(Button, "is", {
            get: function () { return "ion-button"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button, "properties", {
            get: function () {
                return {
                    "buttonType": {
                        "type": String,
                        "attr": "button-type",
                        "mutable": true
                    },
                    "color": {
                        "type": String,
                        "attr": "color"
                    },
                    "disabled": {
                        "type": Boolean,
                        "attr": "disabled"
                    },
                    "el": {
                        "elementRef": true
                    },
                    "expand": {
                        "type": String,
                        "attr": "expand"
                    },
                    "fill": {
                        "type": String,
                        "attr": "fill"
                    },
                    "href": {
                        "type": String,
                        "attr": "href"
                    },
                    "keyFocus": {
                        "state": true
                    },
                    "mode": {
                        "type": String,
                        "attr": "mode"
                    },
                    "routerDirection": {
                        "type": String,
                        "attr": "router-direction"
                    },
                    "shape": {
                        "type": String,
                        "attr": "shape"
                    },
                    "size": {
                        "type": String,
                        "attr": "size"
                    },
                    "strong": {
                        "type": Boolean,
                        "attr": "strong"
                    },
                    "type": {
                        "type": String,
                        "attr": "type"
                    },
                    "win": {
                        "context": "window"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button, "events", {
            get: function () {
                return [{
                        "name": "ionFocus",
                        "method": "ionFocus",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }, {
                        "name": "ionBlur",
                        "method": "ionBlur",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button, "style", {
            get: function () { return ".button {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  text-align: center;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  -webkit-appearance: none;\n  appearance: none;\n  position: relative;\n  z-index: 0;\n  display: inline-block;\n  border: 0;\n  line-height: 1;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  text-transform: none;\n  white-space: nowrap;\n  cursor: pointer;\n  vertical-align: top;\n  vertical-align: -webkit-baseline-middle;\n  -webkit-transition: background-color, opacity 100ms linear;\n  transition: background-color, opacity 100ms linear;\n  -webkit-font-kerning: none;\n  font-kerning: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  contain: content; }\n\n.button:active,\n.button:focus {\n  outline: none; }\n\n.button-inner {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%; }\n\na[disabled],\nbutton[disabled],\n.button[disabled] {\n  cursor: default;\n  pointer-events: none; }\n\n.button-block {\n  display: block;\n  clear: both;\n  width: 100%;\n  contain: strict; }\n\n.button-block::after {\n  clear: both; }\n\n.button-full {\n  display: block;\n  width: 100%;\n  contain: strict; }\n\n.button-full.button-outline {\n  border-radius: 0;\n  border-right-width: 0;\n  border-left-width: 0; }\n\n.button ion-icon {\n  font-size: 1.4em;\n  pointer-events: none; }\n\n.button ion-icon[slot=\"start\"] {\n  margin: 0 0.3em 0 -0.3em; }\n\n.button ion-icon[slot=\"end\"] {\n  margin: 0 -0.2em 0 0.3em; }\n\n.button ion-icon[slot=\"icon-only\"] {\n  font-size: 1.8em; }\n\n.button-ios {\n  border-radius: 8px;\n  margin: 4px 2px;\n  padding: 0 1em;\n  height: 2.8em;\n  font-family: -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", \"Roboto\", sans-serif;\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: -0.03em;\n  color: var(--ion-color-ios-primary-contrast, var(--ion-color-primary-contrast, #fff));\n  background-color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff)); }\n\n.button-ios.activated {\n  background-color: var(--ion-color-ios-primary-shade, var(--ion-color-primary-shade, #3171e0));\n  opacity: 1; }\n\n.button-ios.focused {\n  background-color: var(--ion-color-ios-primary-shade, var(--ion-color-primary-shade, #3171e0)); }\n\n.button-ios:hover {\n  opacity: 0.8; }\n\na[disabled],\nbutton[disabled],\n.button[disabled] {\n  opacity: 0.5; }\n\n.button-large-ios {\n  padding: 0 1em;\n  height: 2.8em;\n  font-size: 20px; }\n\n.button-small-ios {\n  padding: 0 0.9em;\n  height: 2.1em;\n  font-size: 13px; }\n\n.button-block-ios {\n  margin-left: 0;\n  margin-right: 0; }\n\n.button-full-ios {\n  margin-left: 0;\n  margin-right: 0;\n  border-radius: 0;\n  border-right-width: 0;\n  border-left-width: 0; }\n\n.button-outline-ios {\n  border-radius: 8px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n  background-color: transparent; }\n\n.button-outline-ios.activated {\n  color: var(--ion-color-ios-primary-contrast, var(--ion-color-primary-contrast, #fff));\n  background-color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n  opacity: 1; }\n\n.button-outline-ios.focused {\n  background-color: rgba(var(--ion-color-ios-primary-rgb, var(--ion-color-primary-rgb, 56, 128, 255)), 0.25); }\n\n.button-outline-ios.activated.focused {\n  border-color: var(--ion-color-ios-primary-shade, var(--ion-color-primary-shade, #3171e0));\n  background-color: var(--ion-color-ios-primary-shade, var(--ion-color-primary-shade, #3171e0)); }\n\n.button-clear-ios {\n  border-color: transparent;\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n  background-color: transparent; }\n\n.button-clear-ios.activated {\n  background-color: transparent;\n  opacity: 0.4; }\n\n.button-clear-ios.focused {\n  background-color: rgba(var(--ion-color-ios-primary-rgb, var(--ion-color-primary-rgb, 56, 128, 255)), 0.25); }\n\n.button-clear-ios:hover {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n  opacity: 0.6; }\n\n.button-round-ios {\n  border-radius: 64px;\n  padding: 0 26px; }\n\n.button-ios-primary {\n  color: var(--ion-color-ios-primary-contrast, var(--ion-color-primary-contrast, #fff));\n  background-color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff)); }\n\n.button-ios-primary.activated {\n  background-color: var(--ion-color-ios-primary-shade, var(--ion-color-primary-shade, #3171e0)); }\n\n.button-ios-primary.focused {\n  background-color: var(--ion-color-ios-primary-shade, var(--ion-color-primary-shade, #3171e0)); }\n\n.button-outline-ios-primary {\n  border-color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n  background-color: transparent; }\n\n.button-outline-ios-primary.activated {\n  color: var(--ion-color-ios-primary-contrast, var(--ion-color-primary-contrast, #fff));\n  background-color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff)); }\n\n.button-outline-ios-primary.focused {\n  background-color: rgba(var(--ion-color-ios-primary-rgb, var(--ion-color-primary-rgb, 56, 128, 255)), 0.25); }\n\n.button-outline-ios-primary.activated.focused {\n  border-color: var(--ion-color-ios-primary-shade, var(--ion-color-primary-shade, #3171e0));\n  background-color: var(--ion-color-ios-primary-shade, var(--ion-color-primary-shade, #3171e0)); }\n\n.button-clear-ios-primary {\n  border-color: transparent;\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n  background-color: transparent; }\n\n.button-clear-ios-primary.activated {\n  opacity: 0.4; }\n\n.button-clear-ios-primary.focused {\n  background-color: rgba(var(--ion-color-ios-primary-rgb, var(--ion-color-primary-rgb, 56, 128, 255)), 0.25); }\n\n.button-clear-ios-primary:hover {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff)); }\n\n.button-ios-secondary {\n  color: var(--ion-color-ios-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n  background-color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8)); }\n\n.button-ios-secondary.activated {\n  background-color: var(--ion-color-ios-secondary-shade, var(--ion-color-secondary-shade, #0bb8cc)); }\n\n.button-ios-secondary.focused {\n  background-color: var(--ion-color-ios-secondary-shade, var(--ion-color-secondary-shade, #0bb8cc)); }\n\n.button-outline-ios-secondary {\n  border-color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n  background-color: transparent; }\n\n.button-outline-ios-secondary.activated {\n  color: var(--ion-color-ios-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n  background-color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8)); }\n\n.button-outline-ios-secondary.focused {\n  background-color: rgba(var(--ion-color-ios-secondary-rgb, var(--ion-color-secondary-rgb, 12, 209, 232)), 0.25); }\n\n.button-outline-ios-secondary.activated.focused {\n  border-color: var(--ion-color-ios-secondary-shade, var(--ion-color-secondary-shade, #0bb8cc));\n  background-color: var(--ion-color-ios-secondary-shade, var(--ion-color-secondary-shade, #0bb8cc)); }\n\n.button-clear-ios-secondary {\n  border-color: transparent;\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n  background-color: transparent; }\n\n.button-clear-ios-secondary.activated {\n  opacity: 0.4; }\n\n.button-clear-ios-secondary.focused {\n  background-color: rgba(var(--ion-color-ios-secondary-rgb, var(--ion-color-secondary-rgb, 12, 209, 232)), 0.25); }\n\n.button-clear-ios-secondary:hover {\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8)); }\n\n.button-ios-tertiary {\n  color: var(--ion-color-ios-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n  background-color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff)); }\n\n.button-ios-tertiary.activated {\n  background-color: var(--ion-color-ios-tertiary-shade, var(--ion-color-tertiary-shade, #633ce0)); }\n\n.button-ios-tertiary.focused {\n  background-color: var(--ion-color-ios-tertiary-shade, var(--ion-color-tertiary-shade, #633ce0)); }\n\n.button-outline-ios-tertiary {\n  border-color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n  background-color: transparent; }\n\n.button-outline-ios-tertiary.activated {\n  color: var(--ion-color-ios-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n  background-color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff)); }\n\n.button-outline-ios-tertiary.focused {\n  background-color: rgba(var(--ion-color-ios-tertiary-rgb, var(--ion-color-tertiary-rgb, 112, 68, 255)), 0.25); }\n\n.button-outline-ios-tertiary.activated.focused {\n  border-color: var(--ion-color-ios-tertiary-shade, var(--ion-color-tertiary-shade, #633ce0));\n  background-color: var(--ion-color-ios-tertiary-shade, var(--ion-color-tertiary-shade, #633ce0)); }\n\n.button-clear-ios-tertiary {\n  border-color: transparent;\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n  background-color: transparent; }\n\n.button-clear-ios-tertiary.activated {\n  opacity: 0.4; }\n\n.button-clear-ios-tertiary.focused {\n  background-color: rgba(var(--ion-color-ios-tertiary-rgb, var(--ion-color-tertiary-rgb, 112, 68, 255)), 0.25); }\n\n.button-clear-ios-tertiary:hover {\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff)); }\n\n.button-ios-success {\n  color: var(--ion-color-ios-success-contrast, var(--ion-color-success-contrast, #fff));\n  background-color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60)); }\n\n.button-ios-success.activated {\n  background-color: var(--ion-color-ios-success-shade, var(--ion-color-success-shade, #0ec254)); }\n\n.button-ios-success.focused {\n  background-color: var(--ion-color-ios-success-shade, var(--ion-color-success-shade, #0ec254)); }\n\n.button-outline-ios-success {\n  border-color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n  background-color: transparent; }\n\n.button-outline-ios-success.activated {\n  color: var(--ion-color-ios-success-contrast, var(--ion-color-success-contrast, #fff));\n  background-color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60)); }\n\n.button-outline-ios-success.focused {\n  background-color: rgba(var(--ion-color-ios-success-rgb, var(--ion-color-success-rgb, 16, 220, 96)), 0.25); }\n\n.button-outline-ios-success.activated.focused {\n  border-color: var(--ion-color-ios-success-shade, var(--ion-color-success-shade, #0ec254));\n  background-color: var(--ion-color-ios-success-shade, var(--ion-color-success-shade, #0ec254)); }\n\n.button-clear-ios-success {\n  border-color: transparent;\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n  background-color: transparent; }\n\n.button-clear-ios-success.activated {\n  opacity: 0.4; }\n\n.button-clear-ios-success.focused {\n  background-color: rgba(var(--ion-color-ios-success-rgb, var(--ion-color-success-rgb, 16, 220, 96)), 0.25); }\n\n.button-clear-ios-success:hover {\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60)); }\n\n.button-ios-warning {\n  color: var(--ion-color-ios-warning-contrast, var(--ion-color-warning-contrast, #fff));\n  background-color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00)); }\n\n.button-ios-warning.activated {\n  background-color: var(--ion-color-ios-warning-shade, var(--ion-color-warning-shade, #e0b500)); }\n\n.button-ios-warning.focused {\n  background-color: var(--ion-color-ios-warning-shade, var(--ion-color-warning-shade, #e0b500)); }\n\n.button-outline-ios-warning {\n  border-color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n  background-color: transparent; }\n\n.button-outline-ios-warning.activated {\n  color: var(--ion-color-ios-warning-contrast, var(--ion-color-warning-contrast, #fff));\n  background-color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00)); }\n\n.button-outline-ios-warning.focused {\n  background-color: rgba(var(--ion-color-ios-warning-rgb, var(--ion-color-warning-rgb, 255, 206, 0)), 0.25); }\n\n.button-outline-ios-warning.activated.focused {\n  border-color: var(--ion-color-ios-warning-shade, var(--ion-color-warning-shade, #e0b500));\n  background-color: var(--ion-color-ios-warning-shade, var(--ion-color-warning-shade, #e0b500)); }\n\n.button-clear-ios-warning {\n  border-color: transparent;\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n  background-color: transparent; }\n\n.button-clear-ios-warning.activated {\n  opacity: 0.4; }\n\n.button-clear-ios-warning.focused {\n  background-color: rgba(var(--ion-color-ios-warning-rgb, var(--ion-color-warning-rgb, 255, 206, 0)), 0.25); }\n\n.button-clear-ios-warning:hover {\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00)); }\n\n.button-ios-danger {\n  color: var(--ion-color-ios-danger-contrast, var(--ion-color-danger-contrast, #fff));\n  background-color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141)); }\n\n.button-ios-danger.activated {\n  background-color: var(--ion-color-ios-danger-shade, var(--ion-color-danger-shade, #d33939)); }\n\n.button-ios-danger.focused {\n  background-color: var(--ion-color-ios-danger-shade, var(--ion-color-danger-shade, #d33939)); }\n\n.button-outline-ios-danger {\n  border-color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n  background-color: transparent; }\n\n.button-outline-ios-danger.activated {\n  color: var(--ion-color-ios-danger-contrast, var(--ion-color-danger-contrast, #fff));\n  background-color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141)); }\n\n.button-outline-ios-danger.focused {\n  background-color: rgba(var(--ion-color-ios-danger-rgb, var(--ion-color-danger-rgb, 240, 65, 65)), 0.25); }\n\n.button-outline-ios-danger.activated.focused {\n  border-color: var(--ion-color-ios-danger-shade, var(--ion-color-danger-shade, #d33939));\n  background-color: var(--ion-color-ios-danger-shade, var(--ion-color-danger-shade, #d33939)); }\n\n.button-clear-ios-danger {\n  border-color: transparent;\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n  background-color: transparent; }\n\n.button-clear-ios-danger.activated {\n  opacity: 0.4; }\n\n.button-clear-ios-danger.focused {\n  background-color: rgba(var(--ion-color-ios-danger-rgb, var(--ion-color-danger-rgb, 240, 65, 65)), 0.25); }\n\n.button-clear-ios-danger:hover {\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141)); }\n\n.button-ios-light {\n  color: var(--ion-color-ios-light-contrast, var(--ion-color-light-contrast, #000));\n  background-color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8)); }\n\n.button-ios-light.activated {\n  background-color: var(--ion-color-ios-light-shade, var(--ion-color-light-shade, #d7d8da)); }\n\n.button-ios-light.focused {\n  background-color: var(--ion-color-ios-light-shade, var(--ion-color-light-shade, #d7d8da)); }\n\n.button-outline-ios-light {\n  border-color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n  background-color: transparent; }\n\n.button-outline-ios-light.activated {\n  color: var(--ion-color-ios-light-contrast, var(--ion-color-light-contrast, #000));\n  background-color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8)); }\n\n.button-outline-ios-light.focused {\n  background-color: rgba(var(--ion-color-ios-light-rgb, var(--ion-color-light-rgb, 244, 245, 248)), 0.25); }\n\n.button-outline-ios-light.activated.focused {\n  border-color: var(--ion-color-ios-light-shade, var(--ion-color-light-shade, #d7d8da));\n  background-color: var(--ion-color-ios-light-shade, var(--ion-color-light-shade, #d7d8da)); }\n\n.button-clear-ios-light {\n  border-color: transparent;\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n  background-color: transparent; }\n\n.button-clear-ios-light.activated {\n  opacity: 0.4; }\n\n.button-clear-ios-light.focused {\n  background-color: rgba(var(--ion-color-ios-light-rgb, var(--ion-color-light-rgb, 244, 245, 248)), 0.25); }\n\n.button-clear-ios-light:hover {\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8)); }\n\n.button-ios-medium {\n  color: var(--ion-color-ios-medium-contrast, var(--ion-color-medium-contrast, #fff));\n  background-color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2)); }\n\n.button-ios-medium.activated {\n  background-color: var(--ion-color-ios-medium-shade, var(--ion-color-medium-shade, #86888f)); }\n\n.button-ios-medium.focused {\n  background-color: var(--ion-color-ios-medium-shade, var(--ion-color-medium-shade, #86888f)); }\n\n.button-outline-ios-medium {\n  border-color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n  background-color: transparent; }\n\n.button-outline-ios-medium.activated {\n  color: var(--ion-color-ios-medium-contrast, var(--ion-color-medium-contrast, #fff));\n  background-color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2)); }\n\n.button-outline-ios-medium.focused {\n  background-color: rgba(var(--ion-color-ios-medium-rgb, var(--ion-color-medium-rgb, 152, 154, 162)), 0.25); }\n\n.button-outline-ios-medium.activated.focused {\n  border-color: var(--ion-color-ios-medium-shade, var(--ion-color-medium-shade, #86888f));\n  background-color: var(--ion-color-ios-medium-shade, var(--ion-color-medium-shade, #86888f)); }\n\n.button-clear-ios-medium {\n  border-color: transparent;\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n  background-color: transparent; }\n\n.button-clear-ios-medium.activated {\n  opacity: 0.4; }\n\n.button-clear-ios-medium.focused {\n  background-color: rgba(var(--ion-color-ios-medium-rgb, var(--ion-color-medium-rgb, 152, 154, 162)), 0.25); }\n\n.button-clear-ios-medium:hover {\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2)); }\n\n.button-ios-dark {\n  color: var(--ion-color-ios-dark-contrast, var(--ion-color-dark-contrast, #fff));\n  background-color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428)); }\n\n.button-ios-dark.activated {\n  background-color: var(--ion-color-ios-dark-shade, var(--ion-color-dark-shade, #1e2023)); }\n\n.button-ios-dark.focused {\n  background-color: var(--ion-color-ios-dark-shade, var(--ion-color-dark-shade, #1e2023)); }\n\n.button-outline-ios-dark {\n  border-color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n  background-color: transparent; }\n\n.button-outline-ios-dark.activated {\n  color: var(--ion-color-ios-dark-contrast, var(--ion-color-dark-contrast, #fff));\n  background-color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428)); }\n\n.button-outline-ios-dark.focused {\n  background-color: rgba(var(--ion-color-ios-dark-rgb, var(--ion-color-dark-rgb, 34, 36, 40)), 0.25); }\n\n.button-outline-ios-dark.activated.focused {\n  border-color: var(--ion-color-ios-dark-shade, var(--ion-color-dark-shade, #1e2023));\n  background-color: var(--ion-color-ios-dark-shade, var(--ion-color-dark-shade, #1e2023)); }\n\n.button-clear-ios-dark {\n  border-color: transparent;\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n  background-color: transparent; }\n\n.button-clear-ios-dark.activated {\n  opacity: 0.4; }\n\n.button-clear-ios-dark.focused {\n  background-color: rgba(var(--ion-color-ios-dark-rgb, var(--ion-color-dark-rgb, 34, 36, 40)), 0.25); }\n\n.button-clear-ios-dark:hover {\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428)); }\n\n.button-strong-ios {\n  font-weight: 600; }"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button, "styleMode", {
            get: function () { return "ios"; },
            enumerable: true,
            configurable: true
        });
        return Button;
    }());
    /**
     * Get the classes based on the type
     * e.g. block, full, round, large
     */
    function getButtonTypeClassMap(buttonType, type, mode) {
        var _a;
        if (!type) {
            return {};
        }
        type = type.toLocaleLowerCase();
        return _a = {},
            _a[buttonType + "-" + type] = true,
            _a[buttonType + "-" + type + "-" + mode] = true,
            _a;
    }
    function getColorClassMap(buttonType, color, fill, mode) {
        var _a;
        var className = buttonType;
        if (buttonType !== 'bar-button' && fill === 'solid') {
            fill = 'default';
        }
        if (fill && fill !== 'default') {
            className += "-" + fill.toLowerCase();
        }
        // special case for a default bar button
        // if the bar button is default it should get the fill
        // but if a color is passed the fill shouldn't be added
        if (buttonType === 'bar-button' && fill === 'default') {
            className = buttonType;
            if (!color) {
                className += '-' + fill.toLowerCase();
            }
        }
        var map = (_a = {},
            _a[className] = true,
            _a[className + "-" + mode] = true,
            _a);
        if (color) {
            map[className + "-" + mode + "-" + color] = true;
        }
        return map;
    }
    function now(ev) {
        return ev.timeStamp || Date.now();
    }
    var RippleEffect = /** @class */ (function () {
        function RippleEffect() {
            this.lastClick = -10000;
            this.tapClick = false;
        }
        RippleEffect.prototype.tapClickChanged = function (tapClick) {
            this.enableListener(this, 'parent:ionActivated', tapClick);
            this.enableListener(this, 'touchstart', !tapClick);
            this.enableListener(this, 'mousedown', !tapClick);
        };
        RippleEffect.prototype.ionActivated = function (ev) {
            this.addRipple(ev.detail.x, ev.detail.y);
        };
        RippleEffect.prototype.touchStart = function (ev) {
            this.lastClick = now(ev);
            var touches = ev.touches[0];
            this.addRipple(touches.clientX, touches.clientY);
        };
        RippleEffect.prototype.mouseDown = function (ev) {
            var timeStamp = now(ev);
            if (this.lastClick < (timeStamp - 1000)) {
                this.addRipple(ev.pageX, ev.pageY);
            }
        };
        RippleEffect.prototype.componentDidLoad = function () {
            this.tapClickChanged(this.tapClick);
        };
        RippleEffect.prototype.addRipple = function (pageX, pageY) {
            var _this = this;
            var x, y, size;
            this.queue.read(function () {
                var rect = _this.el.getBoundingClientRect();
                var width = rect.width;
                var height = rect.height;
                size = Math.min(Math.sqrt(width * width + height * height) * 2, MAX_RIPPLE_DIAMETER);
                x = pageX - rect.left - (size / 2);
                y = pageY - rect.top - (size / 2);
            });
            this.queue.write(function () {
                var div = _this.doc.createElement('div');
                div.classList.add('ripple-effect');
                var style = div.style;
                var duration = Math.max(RIPPLE_FACTOR * Math.sqrt(size), MIN_RIPPLE_DURATION);
                style.top = y + 'px';
                style.left = x + 'px';
                style.width = size + 'px';
                style.height = size + 'px';
                style.animationDuration = duration + 'ms';
                _this.el.appendChild(div);
                setTimeout(function () { return div.remove(); }, duration + 50);
            });
        };
        Object.defineProperty(RippleEffect, "is", {
            get: function () { return "ion-ripple-effect"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RippleEffect, "properties", {
            get: function () {
                return {
                    "addRipple": {
                        "method": true
                    },
                    "doc": {
                        "context": "document"
                    },
                    "el": {
                        "elementRef": true
                    },
                    "enableListener": {
                        "context": "enableListener"
                    },
                    "queue": {
                        "context": "queue"
                    },
                    "tapClick": {
                        "type": Boolean,
                        "attr": "tap-click",
                        "watchCallbacks": ["tapClickChanged"]
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RippleEffect, "listeners", {
            get: function () {
                return [{
                        "name": "parent:ionActivated",
                        "method": "ionActivated",
                        "disabled": true
                    }, {
                        "name": "touchstart",
                        "method": "touchStart",
                        "disabled": true,
                        "passive": true
                    }, {
                        "name": "mousedown",
                        "method": "mouseDown",
                        "disabled": true,
                        "passive": true
                    }];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RippleEffect, "style", {
            get: function () { return "ion-ripple-effect {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  contain: strict; }\n\n.ripple-effect {\n  border-radius: 50%;\n  position: absolute;\n  background-color: var(--ion-ripple-background-color, #000);\n  opacity: 0;\n  will-change: transform, opacity;\n  pointer-events: none;\n  -webkit-animation-name: rippleAnimation;\n  animation-name: rippleAnimation;\n  -webkit-animation-duration: 200ms;\n  animation-duration: 200ms;\n  -webkit-animation-timing-function: ease-out;\n  animation-timing-function: ease-out;\n  contain: strict; }\n\n\@-webkit-keyframes rippleAnimation {\n  0% {\n    opacity: .2;\n    -webkit-transform: scale(0.1);\n    transform: scale(0.1); }\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n\n\@keyframes rippleAnimation {\n  0% {\n    opacity: .2;\n    -webkit-transform: scale(0.1);\n    transform: scale(0.1); }\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(1);\n    transform: scale(1); } }"; },
            enumerable: true,
            configurable: true
        });
        return RippleEffect;
    }());
    var RIPPLE_FACTOR = 35;
    var MIN_RIPPLE_DURATION = 260;
    var MAX_RIPPLE_DIAMETER = 550;
    var lastId = 1;
    function createOverlay(element, opts) {
        // convert the passed in overlay options into props
        // that get passed down into the new overlay
        Object.assign(element, opts);
        element.overlayId = lastId++;
        // append the overlay element to the document body
        var doc = element.ownerDocument;
        var appRoot = doc.querySelector('ion-app') || doc.body;
        appRoot.appendChild(element);
        return element.componentOnReady();
    }
    function dismissOverlay(data, role, overlays, id) {
        id = id >= 0 ? id : getHighestId(overlays);
        var overlay = overlays.get(id);
        if (!overlay) {
            return Promise.reject('overlay does not exist');
        }
        return overlay.dismiss(data, role);
    }
    function getTopOverlay(overlays) {
        return overlays.get(getHighestId(overlays));
    }
    function getHighestId(overlays) {
        var minimum = -1;
        overlays.forEach(function (_, id) {
            if (id > minimum) {
                minimum = id;
            }
        });
        return minimum;
    }
    function removeLastOverlay(overlays) {
        var toRemove = getTopOverlay(overlays);
        return toRemove ? toRemove.dismiss() : Promise.resolve();
    }
    function present(overlay, name, iosEnterAnimation, mdEnterAnimation, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var animationBuilder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (overlay.presented) {
                            return [2 /*return*/];
                        }
                        overlay.presented = true;
                        overlay.willPresent.emit();
                        animationBuilder = (overlay.enterAnimation)
                            ? overlay.enterAnimation
                            : overlay.config.get(name, overlay.mode === 'ios' ? iosEnterAnimation : mdEnterAnimation);
                        return [4 /*yield*/, overlayAnimation(overlay, animationBuilder, overlay.el, opts)];
                    case 1:
                        _a.sent();
                        overlay.didPresent.emit();
                        return [2 /*return*/];
                }
            });
        });
    }
    function dismiss(overlay, data, role, name, iosLeaveAnimation, mdLeaveAnimation, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var animationBuilder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!overlay.presented) {
                            return [2 /*return*/];
                        }
                        overlay.presented = false;
                        overlay.willDismiss.emit({ data: data, role: role });
                        animationBuilder = (overlay.leaveAnimation)
                            ? overlay.leaveAnimation
                            : overlay.config.get(name, overlay.mode === 'ios' ? iosLeaveAnimation : mdLeaveAnimation);
                        return [4 /*yield*/, overlayAnimation(overlay, animationBuilder, overlay.el, opts)];
                    case 1:
                        _a.sent();
                        overlay.didDismiss.emit({ data: data, role: role });
                        overlay.el.remove();
                        return [2 /*return*/];
                }
            });
        });
    }
    function overlayAnimation(overlay, animationBuilder, baseEl, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var activeElement, animation, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (overlay.keyboardClose) {
                            activeElement = baseEl.ownerDocument.activeElement;
                            activeElement && activeElement.blur && activeElement.blur();
                        }
                        if (overlay.animation) {
                            overlay.animation.destroy();
                            overlay.animation = undefined;
                        }
                        _a = overlay;
                        return [4 /*yield*/, overlay.animationCtrl.create(animationBuilder, baseEl, opts)];
                    case 1:
                        animation = _a.animation = _b.sent();
                        overlay.animation = animation;
                        if (!overlay.willAnimate) {
                            animation.duration(0);
                        }
                        return [4 /*yield*/, animation.playAsync()];
                    case 2:
                        _b.sent();
                        animation.destroy();
                        overlay.animation = undefined;
                        return [2 /*return*/];
                }
            });
        });
    }
    function eventMethod(element, eventName, callback) {
        var resolve;
        var promise = new Promise(function (r) { return resolve = r; });
        onceEvent(element, eventName, function (event) {
            var detail = event.detail;
            callback && callback(detail);
            resolve(detail);
        });
        return promise;
    }
    function onceEvent(element, eventName, callback) {
        var handler = function (ev) {
            element.removeEventListener(eventName, handler);
            callback(ev);
        };
        element.addEventListener(eventName, handler);
    }
    /**
     * iOS Toast Enter Animation
     */
    function iosEnterAnimation(Animation, baseEl, position) {
        var baseAnimation = new Animation();
        var wrapperAnimation = new Animation();
        var wrapperEle = baseEl.querySelector('.toast-wrapper');
        wrapperAnimation.addElement(wrapperEle);
        var variable;
        if (CSS.supports('bottom', 'env(safe-area-inset-bottom)')) {
            variable = 'env';
        }
        else if (CSS.supports('bottom', 'constant(safe-area-inset-bottom)')) {
            variable = 'constant';
        }
        var bottom = variable ? 'calc(-10px - ' + variable + '(safe-area-inset-bottom))' : '-10px';
        var top = variable ? 'calc(' + variable + '(safe-area-inset-top) + 10px)' : '10px';
        switch (position) {
            case 'top':
                wrapperAnimation.fromTo('translateY', '-100%', top);
                break;
            case 'middle':
                var topPosition = Math.floor(baseEl.clientHeight / 2 - wrapperEle.clientHeight / 2);
                wrapperEle.style.top = topPosition + "px";
                wrapperAnimation.fromTo('opacity', 0.01, 1);
                break;
            default:
                wrapperAnimation.fromTo('translateY', '100%', bottom);
                break;
        }
        return Promise.resolve(baseAnimation
            .addElement(baseEl)
            .easing('cubic-bezier(.155,1.105,.295,1.12)')
            .duration(400)
            .add(wrapperAnimation));
    }
    /**
     * iOS Toast Leave Animation
     */
    function iosLeaveAnimation(Animation, baseEl, position) {
        var baseAnimation = new Animation();
        var wrapperAnimation = new Animation();
        var wrapperEle = baseEl.querySelector('.toast-wrapper');
        wrapperAnimation.addElement(wrapperEle);
        var variable;
        if (CSS.supports('bottom', 'env(safe-area-inset-bottom)')) {
            variable = 'env';
        }
        else if (CSS.supports('bottom', 'constant(safe-area-inset-bottom)')) {
            variable = 'constant';
        }
        var bottom = variable ? 'calc(-10px - ' + variable + '(safe-area-inset-bottom))' : '-10px';
        var top = variable ? 'calc(' + variable + '(safe-area-inset-top) + 10px)' : '10px';
        switch (position) {
            case 'top':
                wrapperAnimation.fromTo('translateY', top, '-100%');
                break;
            case 'middle':
                wrapperAnimation.fromTo('opacity', 0.99, 0);
                break;
            default:
                wrapperAnimation.fromTo('translateY', bottom, '100%');
                break;
        }
        return Promise.resolve(baseAnimation
            .addElement(baseEl)
            .easing('cubic-bezier(.36,.66,.04,1)')
            .duration(300)
            .add(wrapperAnimation));
    }
    /**
     * MD Toast Enter Animation
     */
    function mdEnterAnimation(Animation, baseEl, position) {
        var baseAnimation = new Animation();
        var wrapperAnimation = new Animation();
        var wrapperEle = baseEl.querySelector('.toast-wrapper');
        wrapperAnimation.addElement(wrapperEle);
        switch (position) {
            case 'top':
                wrapperAnimation.fromTo('translateY', '-100%', '0%');
                break;
            case 'middle':
                var topPosition = Math.floor(baseEl.clientHeight / 2 - wrapperEle.clientHeight / 2);
                wrapperEle.style.top = topPosition + "px";
                wrapperAnimation.fromTo('opacity', 0.01, 1);
                break;
            default:
                wrapperAnimation.fromTo('translateY', '100%', '0%');
                break;
        }
        return Promise.resolve(baseAnimation
            .addElement(baseEl)
            .easing('cubic-bezier(.36,.66,.04,1)')
            .duration(400)
            .add(wrapperAnimation));
    }
    /**
     * md Toast Leave Animation
     */
    function mdLeaveAnimation(Animation, baseEl, position) {
        var baseAnimation = new Animation();
        var wrapperAnimation = new Animation();
        var wrapperEle = baseEl.querySelector('.toast-wrapper');
        wrapperAnimation.addElement(wrapperEle);
        switch (position) {
            case 'top':
                wrapperAnimation.fromTo('translateY', '0px', '-100%');
                break;
            case 'middle':
                wrapperAnimation.fromTo('opacity', 0.99, 0);
                break;
            default:
                wrapperAnimation.fromTo('translateY', "0px", '100%');
                break;
        }
        return Promise.resolve(baseAnimation
            .addElement(baseEl)
            .easing('cubic-bezier(.36,.66,.04,1)')
            .duration(300)
            .add(wrapperAnimation));
    }
    var Toast = /** @class */ (function () {
        function Toast() {
            this.presented = false;
            this.keyboardClose = false;
            /**
             * If true, the close button will be displayed. Defaults to `false`.
             */
            this.showCloseButton = false;
            /**
             * If true, the toast will be translucent. Defaults to `false`.
             */
            this.translucent = false;
            /**
             * If true, the toast will animate. Defaults to `true`.
             */
            this.willAnimate = true;
        }
        Toast.prototype.componentDidLoad = function () {
            this.ionToastDidLoad.emit();
        };
        Toast.prototype.componentDidUnload = function () {
            this.ionToastDidUnload.emit();
        };
        Toast.prototype.onDismiss = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            this.dismiss();
        };
        /**
         * Present the toast overlay after it has been created.
         */
        Toast.prototype.present = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, present(this, 'toastEnter', iosEnterAnimation, mdEnterAnimation, this.position)];
                        case 1:
                            _a.sent();
                            if (this.duration) {
                                this.durationTimeout = setTimeout(function () { return _this.dismiss(); }, this.duration);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Dismiss the toast overlay after it has been presented.
         */
        Toast.prototype.dismiss = function (data, role) {
            if (this.durationTimeout) {
                clearTimeout(this.durationTimeout);
            }
            return dismiss(this, data, role, 'toastLeave', iosLeaveAnimation, mdLeaveAnimation, this.position);
        };
        /**
         * Returns a promise that resolves when the toast did dismiss. It also accepts a callback
         * that is called in the same circustances.
         *
         * ```
         * const {data, role} = await toast.onDidDismiss();
         * ```
         */
        Toast.prototype.onDidDismiss = function (callback) {
            return eventMethod(this.el, 'ionToastDidDismiss', callback);
        };
        /**
         * Returns a promise that resolves when the toast will dismiss. It also accepts a callback
         * that is called in the same circustances.
         *
         * ```
         * const {data, role} = await toast.onWillDismiss();
         * ```
         */
        Toast.prototype.onWillDismiss = function (callback) {
            return eventMethod(this.el, 'ionToastWillDismiss', callback);
        };
        Toast.prototype.hostData = function () {
            var themedClasses = this.translucent ? createThemedClasses(this.mode, this.color, 'toast-translucent') : {};
            return {
                class: Object.assign({}, themedClasses, getClassMap(this.cssClass))
            };
        };
        Toast.prototype.render = function () {
            var _a;
            var _this = this;
            var position = this.position ? this.position : 'bottom';
            var wrapperClass = (_a = {
                    'toast-wrapper': true
                },
                _a["toast-" + position] = true,
                _a);
            return (h("div", { class: wrapperClass }, h("div", { class: "toast-container" }, this.message
                ? h("div", { class: "toast-message" }, this.message)
                : null, this.showCloseButton
                ? h("ion-button", { fill: "clear", color: "light", class: "toast-button", onClick: function () { return _this.dismiss(); } }, this.closeButtonText || 'Close')
                : null)));
        };
        Object.defineProperty(Toast, "is", {
            get: function () { return "ion-toast"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Toast, "host", {
            get: function () {
                return {
                    "theme": "toast"
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Toast, "properties", {
            get: function () {
                return {
                    "animationCtrl": {
                        "connect": "ion-animation-controller"
                    },
                    "closeButtonText": {
                        "type": String,
                        "attr": "close-button-text"
                    },
                    "config": {
                        "context": "config"
                    },
                    "cssClass": {
                        "type": String,
                        "attr": "css-class"
                    },
                    "dismiss": {
                        "method": true
                    },
                    "duration": {
                        "type": Number,
                        "attr": "duration"
                    },
                    "el": {
                        "elementRef": true
                    },
                    "enterAnimation": {
                        "type": "Any",
                        "attr": "enter-animation"
                    },
                    "keyboardClose": {
                        "type": Boolean,
                        "attr": "keyboard-close"
                    },
                    "leaveAnimation": {
                        "type": "Any",
                        "attr": "leave-animation"
                    },
                    "message": {
                        "type": String,
                        "attr": "message"
                    },
                    "onDidDismiss": {
                        "method": true
                    },
                    "onWillDismiss": {
                        "method": true
                    },
                    "overlayId": {
                        "type": Number,
                        "attr": "overlay-id"
                    },
                    "position": {
                        "type": String,
                        "attr": "position"
                    },
                    "present": {
                        "method": true
                    },
                    "showCloseButton": {
                        "type": Boolean,
                        "attr": "show-close-button"
                    },
                    "translucent": {
                        "type": Boolean,
                        "attr": "translucent"
                    },
                    "willAnimate": {
                        "type": Boolean,
                        "attr": "will-animate"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Toast, "events", {
            get: function () {
                return [{
                        "name": "ionToastDidLoad",
                        "method": "ionToastDidLoad",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }, {
                        "name": "ionToastDidPresent",
                        "method": "didPresent",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }, {
                        "name": "ionToastWillPresent",
                        "method": "willPresent",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }, {
                        "name": "ionToastWillDismiss",
                        "method": "willDismiss",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }, {
                        "name": "ionToastDidDismiss",
                        "method": "didDismiss",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }, {
                        "name": "ionToastDidUnload",
                        "method": "ionToastDidUnload",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Toast, "listeners", {
            get: function () {
                return [{
                        "name": "ionDismiss",
                        "method": "onDismiss"
                    }];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Toast, "style", {
            get: function () { return "ion-toast {\n  left: 0;\n  top: 0;\n  position: absolute;\n  z-index: 1000;\n  display: block;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  contain: strict; }\n\n.toast-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  pointer-events: auto;\n  contain: content; }\n\n.toast-button {\n  font-size: 15px; }\n\n.toast-message {\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1; }\n\n.toast-ios {\n  font-family: -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", \"Roboto\", sans-serif; }\n\n.toast-ios .toast-wrapper {\n  left: 10px;\n  right: 10px;\n  margin: auto;\n  border-radius: 14px;\n  position: absolute;\n  z-index: 10;\n  display: block;\n  max-width: 700px;\n  background: var(--ion-background-ios-color-step-50, var(--ion-background-color-step-50, #f2f2f2)); }\n\n.toast-translucent-ios .toast-wrapper {\n  background: rgba(var(--ion-background-ios-color-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8);\n  -webkit-backdrop-filter: saturate(180%) blur(20px);\n  backdrop-filter: saturate(180%) blur(20px); }\n\n.toast-ios .toast-wrapper.toast-top {\n  -webkit-transform: translate3d(0,  -100%,  0);\n  transform: translate3d(0,  -100%,  0);\n  top: 0; }\n\n.toast-ios .toast-wrapper.toast-bottom {\n  -webkit-transform: translate3d(0,  100%,  0);\n  transform: translate3d(0,  100%,  0);\n  bottom: 0; }\n\n.toast-ios .toast-wrapper.toast-middle {\n  opacity: .01; }\n\n.toast-ios .toast-message {\n  padding: 15px;\n  font-size: 14px;\n  color: var(--ion-text-ios-color-step-150, var(--ion-text-color-step-150, #262626)); }\n\n.toast-ios .toast-button {\n  color: var(--ion-text-ios-color-step-400, var(--ion-text-color-step-400, #666666)); }"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Toast, "styleMode", {
            get: function () { return "ios"; },
            enumerable: true,
            configurable: true
        });
        return Toast;
    }());
    var ToastController = /** @class */ (function () {
        function ToastController() {
            this.toasts = new Map();
        }
        ToastController.prototype.toastWillPresent = function (ev) {
            this.toasts.set(ev.target.overlayId, ev.target);
        };
        ToastController.prototype.toastWillDismiss = function (ev) {
            this.toasts.delete(ev.target.overlayId);
        };
        ToastController.prototype.escapeKeyUp = function () {
            removeLastOverlay(this.toasts);
        };
        /*
         * Create a toast overlay with toast options.
         */
        ToastController.prototype.create = function (opts) {
            return createOverlay(this.doc.createElement('ion-toast'), opts);
        };
        /*
         * Dismiss the open toast overlay.
         */
        ToastController.prototype.dismiss = function (data, role, toastId) {
            if (toastId === void 0) { toastId = -1; }
            return dismissOverlay(data, role, this.toasts, toastId);
        };
        /*
         * Get the most recently opened toast overlay.
         */
        ToastController.prototype.getTop = function () {
            return getTopOverlay(this.toasts);
        };
        Object.defineProperty(ToastController, "is", {
            get: function () { return "ion-toast-controller"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ToastController, "properties", {
            get: function () {
                return {
                    "create": {
                        "method": true
                    },
                    "dismiss": {
                        "method": true
                    },
                    "doc": {
                        "context": "document"
                    },
                    "getTop": {
                        "method": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ToastController, "listeners", {
            get: function () {
                return [{
                        "name": "body:ionToastWillPresent",
                        "method": "toastWillPresent"
                    }, {
                        "name": "body:ionToastWillDismiss",
                        "method": "toastWillDismiss"
                    }, {
                        "name": "body:ionToastDidUnload",
                        "method": "toastWillDismiss"
                    }, {
                        "name": "body:keyup.escape",
                        "method": "escapeKeyUp"
                    }];
            },
            enumerable: true,
            configurable: true
        });
        return ToastController;
    }());
    exports.AppProfile = AppProfile;
    exports.IonAnimationController = AnimationControllerImpl;
    exports.IonButton = Button;
    exports.IonRippleEffect = RippleEffect;
    exports.IonToast = Toast;
    exports.IonToastController = ToastController;
    Object.defineProperty(exports, '__esModule', { value: true });
});
