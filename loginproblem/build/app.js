/*! Built with http://stenciljs.com */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

  function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, HTMLElementPrototype, App, x, y, scriptElm) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    App.components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype);
    resourcesUrl = resourcesUrl || App.resourcesUrl;
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (!resourcesUrl && y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        // requires the es5/polyfilled core
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        // let's do this!
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force esm build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // es5 build w/ polyfills
        return true;
    }
    // final test to see if this browser support dynamic imports
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}
function createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype) {
    (win['s-apps'] = win['s-apps'] || []).push(namespace);
    if (!HTMLElementPrototype.componentOnReady) {
        HTMLElementPrototype.componentOnReady = function componentOnReady() {
            /*tslint:disable*/
            var elm = this;
            function executor(resolve) {
                if (elm.nodeName.indexOf('-') > 0) {
                    // window hasn't loaded yet and there's a
                    // good chance this is a custom element
                    var apps = win['s-apps'];
                    var appsReady = 0;
                    // loop through all the app namespaces
                    for (var i = 0; i < apps.length; i++) {
                        // see if this app has "componentOnReady" setup
                        if (win[apps[i]].componentOnReady) {
                            // this app's core has loaded call its "componentOnReady"
                            if (win[apps[i]].componentOnReady(elm, resolve)) {
                                // this component does belong to this app and would
                                // have fired off the resolve fn
                                // let's stop here, we're good
                                return;
                            }
                            appsReady++;
                        }
                    }
                    if (appsReady < apps.length) {
                        // not all apps are ready yet
                        // add it to the queue to be figured out when they are
                        (win['s-cr'] = win['s-cr'] || []).push([elm, resolve]);
                        return;
                    }
                }
                // not a recognized app component
                resolve(null);
            }
            // callback wasn't provided, let's return a promise
            if (win.Promise) {
                // use native/polyfilled promise
                return new win.Promise(executor);
            }
            // promise may not have been polyfilled yet
            return { then: executor };
        };
    }
}


  init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

  })(window, document, "App","app",0,"app.core.js","app.core.pf.js","hydrated",[["app-home","app-home",1],["app-profile",{"ios":"app-profile.ios","md":"app-profile.md"},1,[["CHKCODE",5],["DEVID",5],["RE",5],["VERSION",5],["countdown",5],["el",7],["match",1],["password",5],["password_repeat",5],["pic_base64",5],["pic_yz",5],["tel",5],["tel_get",5],["tel_yz",5],["urlHead",5]]],["app-profile-new","app-profile-new",1,[["match",1]]],["app-root","app-root",1],["ion-animation-controller",{"ios":"app-profile.ios","md":"app-profile.md"},0,[["create",6]]],["ion-button",{"ios":"app-profile.ios","md":"app-profile.md"},1,[["buttonType",2,0,"button-type",2],["color",1,0,1,2],["disabled",1,0,1,3],["el",7],["expand",1,0,1,2],["fill",1,0,1,2],["href",1,0,1,2],["keyFocus",5],["mode",1,0,1,2],["routerDirection",1,0,"router-direction",2],["shape",1,0,1,2],["size",1,0,1,2],["strong",1,0,1,3],["type",1,0,1,2],["win",3,0,0,0,"window"]]],["ion-ripple-effect",{"ios":"app-profile.ios","md":"app-profile.md"},1,[["addRipple",6],["doc",3,0,0,0,"document"],["el",7],["enableListener",3,0,0,0,"enableListener"],["queue",3,0,0,0,"queue"],["tapClick",1,0,"tap-click",3]],0,[["mousedown","mouseDown",1,1],["parent:ionActivated","ionActivated",1],["touchstart","touchStart",1,1]]],["ion-toast",{"ios":"app-profile.ios","md":"app-profile.md"},1,[["animationCtrl",4,0,0,0,"ion-animation-controller"],["closeButtonText",1,0,"close-button-text",2],["config",3,0,0,0,"config"],["cssClass",1,0,"css-class",2],["dismiss",6],["duration",1,0,1,4],["el",7],["enterAnimation",1],["keyboardClose",1,0,"keyboard-close",3],["leaveAnimation",1],["message",1,0,1,2],["onDidDismiss",6],["onWillDismiss",6],["overlayId",1,0,"overlay-id",4],["position",1,0,1,2],["present",6],["showCloseButton",1,0,"show-close-button",3],["translucent",1,0,1,3],["willAnimate",1,0,"will-animate",3]],0,[["ionDismiss","onDismiss"]]],["ion-toast-controller",{"ios":"app-profile.ios","md":"app-profile.md"},0,[["create",6],["dismiss",6],["doc",3,0,0,0,"document"],["getTop",6]],0,[["body:ionToastDidUnload","toastWillDismiss"],["body:ionToastWillDismiss","toastWillDismiss"],["body:ionToastWillPresent","toastWillPresent"],["body:keyup.escape","escapeKeyUp"]]],["stencil-route","app-root",0,[["activeInGroup",5],["activeRouter",3,0,0,0,"activeRouter"],["component",1,0,1,2],["componentProps",1],["el",7],["exact",1,0,1,3],["group",1,0,1,2],["groupIndex",1,0,"group-index",4],["isServer",3,0,0,0,"isServer"],["location",3,0,0,0,"location"],["match",5],["queue",3,0,0,0,"queue"],["routeRender",1],["scrollTopOffset",1,0,"scroll-top-offset",4],["url",1,0,1,2]]],["stencil-route-link","app-home",0,[["activeClass",1,0,"active-class",2],["activeRouter",3,0,0,0,"activeRouter"],["anchorClass",1,0,"anchor-class",2],["anchorRole",1,0,"anchor-role",2],["anchorTabIndex",1,0,"anchor-tab-index",2],["anchorTitle",1,0,"anchor-title",2],["custom",1,0,1,2],["exact",1,0,1,3],["match",5],["strict",1,0,1,3],["url",1,0,1,2],["urlMatch",1,0,"url-match",2]]],["stencil-router","app-root",0,[["activeRouter",3,0,0,0,"activeRouter"],["historyType",1,0,"history-type",2],["match",5],["root",1,0,1,2],["titleSuffix",1,0,"title-suffix",2]]]],HTMLElement.prototype);