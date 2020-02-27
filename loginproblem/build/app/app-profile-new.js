/*! Built with http://stenciljs.com */
const { h } = window.App;

class AppProfile {
    componentWillLoad() {
        console.log('Component is about to be rendered');
        antlinker.configTitle({
            type: "label",
            title: "其他无法登录问题",
            success: function () {
                // alert("标题修改成功")
            },
            fail: function () {
                alert("标题修改失败!");
            }
        });
    }
    render() {
        return (h("div", { class: 'app-profile-new' },
            h("div", { class: "pic_div" },
                h("img", { class: "lianxi_img", src: "assets/img/lianxi.png", alt: "" })),
            h("div", { class: "zixun" }, "\u9047\u5230\u5176\u4ED6\u65E0\u6CD5\u767B\u5F55\u95EE\u9898\uFF0C\u53EF\u4EE5\u54A8\u8BE2\u96C6\u7ED3\u53F7\u5C0F\u52A9\u624B"),
            h("div", { class: "qq" }, "QQ\u53F7\uFF1A3401277263")));
    }
    static get is() { return "app-profile-new"; }
    static get properties() { return {
        "match": {
            "type": "Any",
            "attr": "match"
        }
    }; }
    static get style() { return ".pic_div{\n  text-align: center;\n  margin: 37px 0 30px 0;\n}\n.lianxi_img{\n  margin: 0 auto;\n  width: 187px;\n  height: 160px;\n}\n.zixun{\n  font-family: PingFangSC-Regular;\n  font-size: 14px;\n  color: #666666;\n  letter-spacing: 0.17px;\n  height: 24px;\n  line-height: 24px;\n  text-align: center;\n}\n.qq{\n  font-family: PingFangSC-Regular;\n  font-size: 16px;\n  color: #3E3E3E;\n  letter-spacing: 0.38px;\n  height: 22.5px;\n  line-height: 22.5px;\n  text-align: center;\n}"; }
}

export { AppProfile as AppProfileNew };
