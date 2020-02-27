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
App.loadBundle("chunk-666d0cc3.js", ["exports"], function (t) { function e(t, e, n) { var o = new Headers; o.append("Content-Type", "application/json"), o.append("AccessToken", window.__AppWebkey || "DQ9Z_VDEPF-GOTU00KXCCQ"); var r = { Router: t, Method: e, Body: JSON.stringify(n) }, a = new Request("/api/flow/interface", { method: "POST", body: JSON.stringify(r), headers: o }); return fetch(a).then(function (t) { if (200 === t.status)
    return t; throw new Error(t.statusText); }).then(function (t) { return t.json(); }); } window.App.h, t.util = /** @class */ (function () {
    function class_1() {
    }
    class_1.loading = function (t) {
        return __awaiter(this, void 0, void 0, function () { var e, n; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e = document.querySelector("ion-loading-controller");
                    return [4 /*yield*/, e.componentOnReady()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, e.create({ content: t || "加载中...", spinner: "crescent" })];
                case 2:
                    n = _a.sent();
                    return [4 /*yield*/, n.present()];
                case 3: return [2 /*return*/, (_a.sent(), n)];
            }
        }); });
    };
    class_1.alert = function (t, e, n) {
        return __awaiter(this, void 0, void 0, function () { var o, r; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    o = document.querySelector("ion-alert-controller");
                    return [4 /*yield*/, o.componentOnReady()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, o.create({ header: e, message: t, buttons: [{ text: "确定", handler: n }] })];
                case 2:
                    r = _a.sent();
                    return [4 /*yield*/, r.present()];
                case 3: return [2 /*return*/, (_a.sent(), r)];
            }
        }); });
    };
    class_1.confirm = function (t, e, n) {
        return __awaiter(this, void 0, void 0, function () { var o, r; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    o = document.querySelector("ion-alert-controller");
                    return [4 /*yield*/, o.componentOnReady()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, o.create({ header: e, message: t, buttons: [{ text: "确定", handler: n }, { text: "取消" }] })];
                case 2:
                    r = _a.sent();
                    return [4 /*yield*/, r.present()];
                case 3: return [2 /*return*/, (_a.sent(), r)];
            }
        }); });
    };
    class_1.getDate = function () { var t = new Date; var e = t.getMonth() + 1, n = e.toString(); e < 10 && (n = "0" + e); var o = t.getDate(), r = o.toString(); return o < 10 && (r = "0" + o), t.getFullYear() + "-" + n + "-" + r; };
    return class_1;
}()), t.fetchFlowGet = function (t, n) { return e(t, "GET", n); }, t.fetchFlowPost = function (t, n) { return e(t, "POST", n); }; });
