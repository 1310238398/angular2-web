/*! Built with http://stenciljs.com */
App.loadBundle('app-home', ['exports', './chunk-abed0fce.js'], function (exports, __chunk_1) {
    var h = window.App.h;
    var AppHome = /** @class */ (function () {
        function AppHome() {
        }
        AppHome.prototype.componentWillLoad = function () {
            console.log('Component is about to be rendered');
            antlinker.configTitle({
                type: "label",
                title: "登录遇到问题",
                success: function () {
                    // alert("标题修改成功")
                },
                fail: function () {
                    // alert("标题修改失败!")
                }
            });
        };
        AppHome.prototype.render = function () {
            return (h("div", { class: 'app-home' }, h("stencil-route-link", { url: '/profile' }, h("div", { class: "div_format border_bottom" }, h("img", { src: "assets/img/mima.png", class: "fl img_left", alt: "" }), h("div", { class: "fl text_div" }, "\u5FD8\u8BB0\u5BC6\u7801"), h("img", { src: "assets/img/jiantou.png", class: "fr img_right", alt: "" }))), h("stencil-route-link", { url: '/profilenew' }, h("div", { class: "div_format" }, h("img", { src: "assets/img/wenti.png", class: "fl img_left", alt: "" }), h("div", { class: "fl text_div" }, "\u5176\u4ED6\u65E0\u6CD5\u767B\u5F55\u95EE\u9898"), h("img", { src: "assets/img/jiantou.png", class: "fr img_right", alt: "" })))));
        };
        Object.defineProperty(AppHome, "is", {
            get: function () { return "app-home"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppHome, "style", {
            get: function () { return "*{\n  margin: 0;\n  padding: 0;\n}\nbody{\n  background-color: #f5f5f5;\n}\n.div_format{\n  padding: 0 15px;\n  height: 44px;\n  background-color: white;\n}\n.border_bottom{\n  /* border-bottom:1px solid #D5D5D5; */\n  margin-bottom: 1px;\n  margin-top: 10px;\n}\n.img_left{\n  /*width: 14.4px;*/\n  /*height: 16.6px;*/\n  margin-top: 12px;\n  width: 19px;\n  height: 19px;\n}\n.img_right{\n  /*width: 14.4px;*/\n  /*height: 16.6px;*/\n  margin-top: 13.5px;\n  width: 6.5px;\n  height: 16px;\n}\n.text_div{\n  height: 100%;\n  line-height: 44px;\n  margin-left: 15px;\n  font-family: PingFangSC-Regular;\n  font-size: 16px;\n  color: #3E3E3E;\n  letter-spacing: 0.19px;\n}\n.fl{\n  float: left;\n}\n.fr{\n  float: right;\n}"; },
            enumerable: true,
            configurable: true
        });
        return AppHome;
    }());
    /**
      * @name Route
      * @module ionic
      * @description
     */
    var RouteLink = /** @class */ (function () {
        function RouteLink() {
            this.unsubscribe = function () { return; };
            this.activeClass = 'link-active';
            this.exact = false;
            this.strict = true;
            /**
             *  Custom tag to use instead of an anchor
             */
            this.custom = 'a';
            this.match = null;
        }
        // Identify if the current route is a match.
        RouteLink.prototype.computeMatch = function (pathname) {
            if (!pathname) {
                var location = this.activeRouter.get('location');
                pathname = location.pathname;
            }
            var match = __chunk_1.matchPath(pathname, {
                path: this.urlMatch || this.url,
                exact: this.exact,
                strict: this.strict
            });
            return match;
        };
        RouteLink.prototype.componentWillLoad = function () {
            var _this = this;
            // subscribe the project's active router and listen
            // for changes. Recompute the match if any updates get
            // pushed
            this.unsubscribe = this.activeRouter.subscribe({
                isMatch: this.computeMatch.bind(this),
                listener: function (matchResult) {
                    _this.match = matchResult;
                },
            });
            // Likely that this route link could receive a location prop
            this.match = this.computeMatch();
        };
        RouteLink.prototype.componentDidUnload = function () {
            // be sure to unsubscribe to the router so that we don't
            // get any memory leaks
            this.unsubscribe();
        };
        RouteLink.prototype.handleClick = function (e) {
            if (__chunk_1.isModifiedEvent(e)) {
                return;
            }
            e.preventDefault();
            if (!this.activeRouter) {
                console.warn('<stencil-route-link> wasn\'t passed an instance of the router as the "router" prop!');
                return;
            }
            var history = this.activeRouter.get('history');
            return history.push(this.getUrl(this.url));
        };
        // Get the URL for this route link without the root from the router
        RouteLink.prototype.getUrl = function (url) {
            var root = this.activeRouter.get('root') || '/';
            // Don't allow double slashes
            if (url.charAt(0) == '/' && root.charAt(root.length - 1) == '/') {
                return root.slice(0, root.length - 1) + url;
            }
            return root + url;
        };
        RouteLink.prototype.render = function () {
            var _a;
            var anchorAttributes = {
                class: (_a = {},
                    _a[this.activeClass] = this.match !== null,
                    _a),
                onClick: this.handleClick.bind(this)
            };
            if (this.anchorClass) {
                anchorAttributes.class[this.anchorClass] = true;
            }
            if (this.custom === 'a') {
                anchorAttributes = Object.assign({}, anchorAttributes, { href: this.url, title: this.anchorTitle, role: this.anchorRole, tabindex: this.anchorTabIndex });
            }
            return (h(this.custom, Object.assign({}, anchorAttributes), h("slot", null)));
        };
        Object.defineProperty(RouteLink, "is", {
            get: function () { return "stencil-route-link"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouteLink, "properties", {
            get: function () {
                return {
                    "activeClass": {
                        "type": String,
                        "attr": "active-class"
                    },
                    "activeRouter": {
                        "context": "activeRouter"
                    },
                    "anchorClass": {
                        "type": String,
                        "attr": "anchor-class"
                    },
                    "anchorRole": {
                        "type": String,
                        "attr": "anchor-role"
                    },
                    "anchorTabIndex": {
                        "type": String,
                        "attr": "anchor-tab-index"
                    },
                    "anchorTitle": {
                        "type": String,
                        "attr": "anchor-title"
                    },
                    "custom": {
                        "type": String,
                        "attr": "custom"
                    },
                    "exact": {
                        "type": Boolean,
                        "attr": "exact"
                    },
                    "match": {
                        "state": true
                    },
                    "strict": {
                        "type": Boolean,
                        "attr": "strict"
                    },
                    "url": {
                        "type": String,
                        "attr": "url"
                    },
                    "urlMatch": {
                        "type": String,
                        "attr": "url-match"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        return RouteLink;
    }());
    exports.AppHome = AppHome;
    exports.StencilRouteLink = RouteLink;
    Object.defineProperty(exports, '__esModule', { value: true });
});
