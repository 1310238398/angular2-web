/*! Built with http://stenciljs.com */
App.loadBundle('app-root', ['exports', './chunk-abed0fce.js'], function (exports, __chunk_1) {
    var h = window.App.h;
    var AppRoot = /** @class */ (function () {
        function AppRoot() {
        }
        AppRoot.prototype.render = function () {
            return (h("div", null, h("main", null, h("stencil-router", { historyType: "hash" }, h("stencil-route", { url: '/', component: 'app-home', exact: true }), h("stencil-route", { url: '/profile', component: 'app-profile' }), h("stencil-route", { url: '/profilenew', component: 'app-profile-new' })))));
        };
        Object.defineProperty(AppRoot, "is", {
            get: function () { return "app-root"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppRoot, "style", {
            get: function () { return "header {\n  background: #5851ff;\n  color: white;\n  height: 56px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n}\n\nh1 {\n  font-size: 1.4rem;\n  font-weight: 500;\n  color: #fff;\n  padding: 0 12px;\n}"; },
            enumerable: true,
            configurable: true
        });
        return AppRoot;
    }());
    /**
      * @name Route
      * @module ionic
      * @description
     */
    var Route = /** @class */ (function () {
        function Route() {
            this.unsubscribe = function () { return; };
            this.componentProps = {};
            this.exact = false;
            this.group = null;
            this.groupIndex = null;
            this.routeRender = null;
            this.scrollTopOffset = null;
            this.match = null;
            this.activeInGroup = false;
            this.scrollOnNextRender = false;
        }
        // Identify if the current route is a match.
        Route.prototype.computeMatch = function (pathname) {
            if (!pathname) {
                var location = this.activeRouter.get('location');
                pathname = location.pathname;
            }
            return __chunk_1.matchPath(pathname, {
                path: this.url,
                exact: this.exact,
                strict: true
            });
        };
        Route.prototype.componentWillLoad = function () {
            var _this = this;
            var thisRoute = this;
            // subscribe the project's active router and listen
            // for changes. Recompute the match if any updates get
            // pushed
            var listener = function (matchResults) {
                _this.match = matchResults;
                return new Promise(function (resolve) {
                    thisRoute.componentDidRerender = resolve;
                });
            };
            this.unsubscribe = this.activeRouter.subscribe({
                isMatch: this.computeMatch.bind(this),
                listener: listener,
                groupId: this.group,
                groupIndex: this.groupIndex
            });
        };
        Route.prototype.componentDidUnload = function () {
            // be sure to unsubscribe to the router so that we don't
            // get any memory leaks
            this.unsubscribe();
        };
        Route.prototype.componentDidUpdate = function () {
            var _this = this;
            if (this.componentDidRerender) {
                // After route component has rendered then check if its child has.
                var childElement = this.el.firstElementChild;
                if (childElement && childElement.componentOnReady) {
                    childElement.componentOnReady().then(function () {
                        if (_this.componentDidRerender) {
                            _this.componentDidRerender();
                        }
                        _this.componentDidRerender = undefined;
                        _this.activeInGroup = !!_this.match;
                        _this.scrollOnNextRender = _this.activeInGroup;
                    });
                }
                else {
                    // If there is no child then resolve the Promise immediately
                    this.componentDidRerender();
                    this.componentDidRerender = undefined;
                    this.activeInGroup = !!this.match;
                    this.scrollOnNextRender = this.activeInGroup;
                }
            }
            else if (this.scrollOnNextRender) {
                // If this is the new active route in a group and it is now active then scroll
                this.scrollTo();
                this.scrollOnNextRender = false;
            }
        };
        Route.prototype.scrollTo = function () {
            var _this = this;
            var history = this.activeRouter.get('history');
            if (this.scrollTopOffset == null || !history || this.isServer) {
                return;
            }
            if (history.action === 'POP' && history.location.scrollPosition != null) {
                return this.queue.write(function () {
                    window.scrollTo(history.location.scrollPosition[0], history.location.scrollPosition[1]);
                });
            }
            // read a frame to let things measure correctly
            return this.queue.read(function () {
                // okay, the frame has passed. Go ahead and render now
                return _this.queue.write(function () {
                    window.scrollTo(0, _this.scrollTopOffset);
                });
            });
        };
        Route.prototype.hostData = function () {
            if (!this.activeRouter || !this.match || (this.group && !this.activeInGroup)) {
                return {
                    style: {
                        display: 'none'
                    }
                };
            }
        };
        Route.prototype.render = function () {
            // If there is no activeRouter then do not render
            // Check if this route is in the matching URL (for example, a parent route)
            if (!this.activeRouter || !this.match) {
                return null;
            }
            // component props defined in route
            // the history api
            // current match data including params
            var childProps = Object.assign({}, this.componentProps, { history: this.activeRouter.get('history'), match: this.match });
            // If there is a routerRender defined then use
            // that and pass the component and component props with it.
            if (this.routeRender) {
                return this.routeRender(Object.assign({}, childProps, { component: this.component }));
            }
            if (this.component) {
                var ChildComponent = this.component;
                return (h(ChildComponent, Object.assign({}, childProps)));
            }
        };
        Object.defineProperty(Route, "is", {
            get: function () { return "stencil-route"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Route, "properties", {
            get: function () {
                return {
                    "activeInGroup": {
                        "state": true
                    },
                    "activeRouter": {
                        "context": "activeRouter"
                    },
                    "component": {
                        "type": String,
                        "attr": "component"
                    },
                    "componentProps": {
                        "type": "Any",
                        "attr": "component-props"
                    },
                    "el": {
                        "elementRef": true
                    },
                    "exact": {
                        "type": Boolean,
                        "attr": "exact"
                    },
                    "group": {
                        "type": String,
                        "attr": "group"
                    },
                    "groupIndex": {
                        "type": Number,
                        "attr": "group-index"
                    },
                    "isServer": {
                        "context": "isServer"
                    },
                    "location": {
                        "context": "location"
                    },
                    "match": {
                        "state": true
                    },
                    "queue": {
                        "context": "queue"
                    },
                    "routeRender": {
                        "type": "Any",
                        "attr": "route-render"
                    },
                    "scrollTopOffset": {
                        "type": Number,
                        "attr": "scroll-top-offset"
                    },
                    "url": {
                        "type": String,
                        "attr": "url"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        return Route;
    }());
    function hasBasename(path, prefix) {
        return (new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i')).test(path);
    }
    function stripBasename(path, prefix) {
        return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
    }
    function stripTrailingSlash(path) {
        return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
    }
    function addLeadingSlash(path) {
        return path.charAt(0) === '/' ? path : '/' + path;
    }
    function stripLeadingSlash(path) {
        return path.charAt(0) === '/' ? path.substr(1) : path;
    }
    function parsePath(path) {
        var pathname = path || '/';
        var search = '';
        var hash = '';
        var hashIndex = pathname.indexOf('#');
        if (hashIndex !== -1) {
            hash = pathname.substr(hashIndex);
            pathname = pathname.substr(0, hashIndex);
        }
        var searchIndex = pathname.indexOf('?');
        if (searchIndex !== -1) {
            search = pathname.substr(searchIndex);
            pathname = pathname.substr(0, searchIndex);
        }
        return {
            pathname: pathname,
            search: search === '?' ? '' : search,
            hash: hash === '#' ? '' : hash
        };
    }
    function createPath(location) {
        var pathname = location.pathname, search = location.search, hash = location.hash;
        var path = pathname || '/';
        if (search && search !== '?') {
            path += (search.charAt(0) === '?' ? search : "?" + search);
        }
        if (hash && hash !== '#') {
            path += (hash.charAt(0) === '#' ? hash : "#" + hash);
        }
        return path;
    }
    function parseQueryString(query) {
        if (!query) {
            return {};
        }
        return (/^[?#]/.test(query) ? query.slice(1) : query)
            .split('&')
            .reduce(function (params, param) {
            var _a = param.split('='), key = _a[0], value = _a[1];
            params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
            return params;
        }, {});
    }
    function isAbsolute(pathname) {
        return pathname.charAt(0) === '/';
    }
    // About 1.5x faster than the two-arg version of Array#splice()
    function spliceOne(list, index) {
        for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
            list[i] = list[k];
        }
        list.pop();
    }
    // This implementation is based heavily on node's url.parse
    function resolvePathname(to, from) {
        if (from === void 0) { from = ''; }
        var toParts = to && to.split('/') || [];
        var fromParts = from && from.split('/') || [];
        var isToAbs = to && isAbsolute(to);
        var isFromAbs = from && isAbsolute(from);
        var mustEndAbs = isToAbs || isFromAbs;
        if (to && isAbsolute(to)) {
            // to is absolute
            fromParts = toParts;
        }
        else if (toParts.length) {
            // to is relative, drop the filename
            fromParts.pop();
            fromParts = fromParts.concat(toParts);
        }
        if (!fromParts.length) {
            return '/';
        }
        var hasTrailingSlash;
        if (fromParts.length) {
            var last = fromParts[fromParts.length - 1];
            hasTrailingSlash = (last === '.' || last === '..' || last === '');
        }
        else {
            hasTrailingSlash = false;
        }
        var up = 0;
        for (var i = fromParts.length; i >= 0; i--) {
            var part = fromParts[i];
            if (part === '.') {
                spliceOne(fromParts, i);
            }
            else if (part === '..') {
                spliceOne(fromParts, i);
                up++;
            }
            else if (up) {
                spliceOne(fromParts, i);
                up--;
            }
        }
        if (!mustEndAbs) {
            for (; up--; up) {
                fromParts.unshift('..');
            }
        }
        if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) {
            fromParts.unshift('');
        }
        var result = fromParts.join('/');
        if (hasTrailingSlash && result.substr(-1) !== '/') {
            result += '/';
        }
        return result;
    }
    function valueEqual(a, b) {
        if (a === b) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        if (Array.isArray(a)) {
            return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
                return valueEqual(item, b[index]);
            });
        }
        var aType = typeof a;
        var bType = typeof b;
        if (aType !== bType) {
            return false;
        }
        if (aType === 'object') {
            var aValue = a.valueOf();
            var bValue = b.valueOf();
            if (aValue !== a || bValue !== b) {
                return valueEqual(aValue, bValue);
            }
            var aKeys = Object.keys(a);
            var bKeys = Object.keys(b);
            if (aKeys.length !== bKeys.length) {
                return false;
            }
            return aKeys.every(function (key) {
                return valueEqual(a[key], b[key]);
            });
        }
        return false;
    }
    function locationsAreEqual(a, b) {
        return a.pathname === b.pathname &&
            a.search === b.search &&
            a.hash === b.hash &&
            a.key === b.key &&
            valueEqual(a.state, b.state);
    }
    function createLocation(path, state, key, currentLocation) {
        var location;
        if (typeof path === 'string') {
            // Two-arg form: push(path, state)
            location = parsePath(path);
            location.state = state;
        }
        else {
            // One-arg form: push(location)
            location = Object.assign({}, path);
            if (location.pathname === undefined) {
                location.pathname = '';
            }
            if (location.search) {
                if (location.search.charAt(0) !== '?') {
                    location.search = '?' + location.search;
                }
            }
            else {
                location.search = '';
            }
            if (location.hash) {
                if (location.hash.charAt(0) !== '#') {
                    location.hash = '#' + location.hash;
                }
            }
            else {
                location.hash = '';
            }
            if (state !== undefined && location.state === undefined) {
                location.state = state;
            }
        }
        try {
            location.pathname = decodeURI(location.pathname);
        }
        catch (e) {
            if (e instanceof URIError) {
                throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' +
                    'This is likely caused by an invalid percent-encoding.');
            }
            else {
                throw e;
            }
        }
        if (key) {
            location.key = key;
        }
        if (currentLocation) {
            // Resolve incomplete/relative pathname relative to current location.
            if (!location.pathname) {
                location.pathname = currentLocation.pathname;
            }
            else if (location.pathname.charAt(0) !== '/') {
                location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
            }
        }
        else {
            // When there is no prior location and pathname is empty, set it to /
            if (!location.pathname) {
                location.pathname = '/';
            }
        }
        location.query = parseQueryString(location.search);
        return location;
    }
    function invariant(value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!value) {
            console.error.apply(console, args);
        }
    }
    function warning(value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!value) {
            console.warn.apply(console, args);
        }
    }
    var createTransitionManager = function () {
        var prompt;
        var setPrompt = function (nextPrompt) {
            warning(prompt == null, 'A history supports only one prompt at a time');
            prompt = nextPrompt;
            return function () {
                if (prompt === nextPrompt) {
                    prompt = null;
                }
            };
        };
        var confirmTransitionTo = function (location, action, getUserConfirmation, callback) {
            // TODO: If another transition starts while we're still confirming
            // the previous one, we may end up in a weird state. Figure out the
            // best way to handle this.
            if (prompt != null) {
                var result = typeof prompt === 'function' ? prompt(location, action) : prompt;
                if (typeof result === 'string') {
                    if (typeof getUserConfirmation === 'function') {
                        getUserConfirmation(result, callback);
                    }
                    else {
                        warning(false, 'A history needs a getUserConfirmation function in order to use a prompt message');
                        callback(true);
                    }
                }
                else {
                    // Return false from a transition hook to cancel the transition.
                    callback(result !== false);
                }
            }
            else {
                callback(true);
            }
        };
        var listeners = [];
        var appendListener = function (fn) {
            var isActive = true;
            var listener = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (isActive) {
                    fn.apply(void 0, args);
                }
            };
            listeners.push(listener);
            return function () {
                isActive = false;
                listeners = listeners.filter(function (item) { return item !== listener; });
            };
        };
        var notifyListeners = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            listeners.forEach(function (listener) { return listener.apply(void 0, args); });
        };
        return {
            setPrompt: setPrompt,
            confirmTransitionTo: confirmTransitionTo,
            appendListener: appendListener,
            notifyListeners: notifyListeners
        };
    };
    var createScrollHistory = function (applicationScrollKey) {
        if (applicationScrollKey === void 0) { applicationScrollKey = 'scrollPositions'; }
        var scrollPositions = new Map();
        if (__chunk_1.storageAvailable('sessionStorage')) {
            scrollPositions = window.sessionStorage.getItem(applicationScrollKey) ?
                new Map(JSON.parse(window.sessionStorage.getItem(applicationScrollKey))) :
                scrollPositions;
        }
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        function set(key, value) {
            scrollPositions.set(key, value);
            if (__chunk_1.storageAvailable('sessionStorage')) {
                var arrayData_1 = [];
                scrollPositions.forEach(function (value, key) {
                    arrayData_1.push([key, value]);
                });
                window.sessionStorage.setItem('scrollPositions', JSON.stringify(arrayData_1));
            }
        }
        function get(key) {
            return scrollPositions.get(key);
        }
        function has(key) {
            return scrollPositions.has(key);
        }
        function capture(key) {
            set(key, [window.scrollX, window.scrollY]);
        }
        return {
            set: set,
            get: get,
            has: has,
            capture: capture
        };
    };
    var PopStateEvent = 'popstate';
    var HashChangeEvent = 'hashchange';
    var getHistoryState = function () {
        try {
            return window.history.state || {};
        }
        catch (e) {
            // IE 11 sometimes throws when accessing window.history.state
            // See https://github.com/ReactTraining/history/pull/289
            return {};
        }
    };
    /**
     * Creates a history object that uses the HTML5 history API including
     * pushState, replaceState, and the popstate event.
     */
    var createBrowserHistory = function (props) {
        if (props === void 0) { props = {}; }
        invariant(__chunk_1.canUseDOM, 'Browser history needs a DOM');
        var globalHistory = window.history;
        var canUseHistory = __chunk_1.supportsHistory();
        var needsHashChangeListener = !__chunk_1.supportsPopStateOnHashChange();
        var scrollHistory = createScrollHistory();
        var _a = props.forceRefresh, forceRefresh = _a === void 0 ? false : _a, _b = props.getUserConfirmation, getUserConfirmation = _b === void 0 ? __chunk_1.getConfirmation : _b, _c = props.keyLength, keyLength = _c === void 0 ? 6 : _c;
        var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
        var getDOMLocation = function (historyState) {
            historyState = historyState || {};
            var key = historyState.key, state = historyState.state;
            var _a = window.location, pathname = _a.pathname, search = _a.search, hash = _a.hash;
            var path = pathname + search + hash;
            warning((!basename || hasBasename(path, basename)), 'You are attempting to use a basename on a page whose URL path does not begin ' +
                'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
            if (basename) {
                path = stripBasename(path, basename);
            }
            return createLocation(path, state, key);
        };
        var createKey = function () { return (Math.random().toString(36).substr(2, keyLength)); };
        var transitionManager = createTransitionManager();
        var setState = function (nextState) {
            // Capture location for the view before changing history.
            scrollHistory.capture(history.location.key);
            Object.assign(history, nextState);
            // Set scroll position based on its previous storage value
            history.location.scrollPosition = scrollHistory.get(history.location.key);
            history.length = globalHistory.length;
            transitionManager.notifyListeners(history.location, history.action);
        };
        var handlePopState = function (event) {
            // Ignore extraneous popstate events in WebKit.
            if (__chunk_1.isExtraneousPopstateEvent(event)) {
                return;
            }
            handlePop(getDOMLocation(event.state));
        };
        var handleHashChange = function () {
            handlePop(getDOMLocation(getHistoryState()));
        };
        var forceNextPop = false;
        var handlePop = function (location) {
            if (forceNextPop) {
                forceNextPop = false;
                setState();
            }
            else {
                var action_1 = 'POP';
                transitionManager.confirmTransitionTo(location, action_1, getUserConfirmation, function (ok) {
                    if (ok) {
                        setState({ action: action_1, location: location });
                    }
                    else {
                        revertPop(location);
                    }
                });
            }
        };
        var revertPop = function (fromLocation) {
            var toLocation = history.location;
            // TODO: We could probably make this more reliable by
            // keeping a list of keys we've seen in sessionStorage.
            // Instead, we just default to 0 for keys we don't know.
            var toIndex = allKeys.indexOf(toLocation.key);
            if (toIndex === -1) {
                toIndex = 0;
            }
            var fromIndex = allKeys.indexOf(fromLocation.key);
            if (fromIndex === -1) {
                fromIndex = 0;
            }
            var delta = toIndex - fromIndex;
            if (delta) {
                forceNextPop = true;
                go(delta);
            }
        };
        var initialLocation = getDOMLocation(getHistoryState());
        var allKeys = [initialLocation.key];
        // Public interface
        var createHref = function (location) {
            return basename + createPath(location);
        };
        var push = function (path, state) {
            warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' +
                'argument is a location-like object that already has state; it is ignored');
            var action = 'PUSH';
            var location = createLocation(path, state, createKey(), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var href = createHref(location);
                var key = location.key, state = location.state;
                if (canUseHistory) {
                    globalHistory.pushState({ key: key, state: state }, null, href);
                    if (forceRefresh) {
                        window.location.href = href;
                    }
                    else {
                        var prevIndex = allKeys.indexOf(history.location.key);
                        var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                        nextKeys.push(location.key);
                        allKeys = nextKeys;
                        setState({ action: action, location: location });
                    }
                }
                else {
                    warning(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');
                    window.location.href = href;
                }
            });
        };
        var replace = function (path, state) {
            warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' +
                'argument is a location-like object that already has state; it is ignored');
            var action = 'REPLACE';
            var location = createLocation(path, state, createKey(), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var href = createHref(location);
                var key = location.key, state = location.state;
                if (canUseHistory) {
                    globalHistory.replaceState({ key: key, state: state }, null, href);
                    if (forceRefresh) {
                        window.location.replace(href);
                    }
                    else {
                        var prevIndex = allKeys.indexOf(history.location.key);
                        if (prevIndex !== -1) {
                            allKeys[prevIndex] = location.key;
                        }
                        setState({ action: action, location: location });
                    }
                }
                else {
                    warning(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');
                    window.location.replace(href);
                }
            });
        };
        var go = function (n) {
            globalHistory.go(n);
        };
        var goBack = function () { return go(-1); };
        var goForward = function () { return go(1); };
        var listenerCount = 0;
        var checkDOMListeners = function (delta) {
            listenerCount += delta;
            if (listenerCount === 1) {
                __chunk_1.addEventListener(window, PopStateEvent, handlePopState);
                if (needsHashChangeListener) {
                    __chunk_1.addEventListener(window, HashChangeEvent, handleHashChange);
                }
            }
            else if (listenerCount === 0) {
                __chunk_1.removeEventListener(window, PopStateEvent, handlePopState);
                if (needsHashChangeListener) {
                    __chunk_1.removeEventListener(window, HashChangeEvent, handleHashChange);
                }
            }
        };
        var isBlocked = false;
        var block = function (prompt) {
            if (prompt === void 0) { prompt = ''; }
            var unblock = transitionManager.setPrompt(prompt);
            if (!isBlocked) {
                checkDOMListeners(1);
                isBlocked = true;
            }
            return function () {
                if (isBlocked) {
                    isBlocked = false;
                    checkDOMListeners(-1);
                }
                return unblock();
            };
        };
        var listen = function (listener) {
            var unlisten = transitionManager.appendListener(listener);
            checkDOMListeners(1);
            return function () {
                checkDOMListeners(-1);
                unlisten();
            };
        };
        var history = {
            length: globalHistory.length,
            action: 'POP',
            location: initialLocation,
            createHref: createHref,
            push: push,
            replace: replace,
            go: go,
            goBack: goBack,
            goForward: goForward,
            block: block,
            listen: listen
        };
        return history;
    };
    var HashChangeEvent$1 = 'hashchange';
    var HashPathCoders = {
        hashbang: {
            encodePath: function (path) { return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path); },
            decodePath: function (path) { return path.charAt(0) === '!' ? path.substr(1) : path; }
        },
        noslash: {
            encodePath: stripLeadingSlash,
            decodePath: addLeadingSlash
        },
        slash: {
            encodePath: addLeadingSlash,
            decodePath: addLeadingSlash
        }
    };
    var getHashPath = function () {
        // We can't use window.location.hash here because it's not
        // consistent across browsers - Firefox will pre-decode it!
        var href = window.location.href;
        var hashIndex = href.indexOf('#');
        return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
    };
    var pushHashPath = function (path) { return (window.location.hash = path); };
    var replaceHashPath = function (path) {
        var hashIndex = window.location.href.indexOf('#');
        window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
    };
    var createHashHistory = function (props) {
        if (props === void 0) { props = {}; }
        invariant(__chunk_1.canUseDOM, 'Hash history needs a DOM');
        var globalHistory = window.history;
        var canGoWithoutReload = __chunk_1.supportsGoWithoutReloadUsingHash();
        var _a = props.getUserConfirmation, getUserConfirmation = _a === void 0 ? __chunk_1.getConfirmation : _a, _b = props.hashType, hashType = _b === void 0 ? 'slash' : _b;
        var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
        var _c = HashPathCoders[hashType], encodePath = _c.encodePath, decodePath = _c.decodePath;
        var getDOMLocation = function () {
            var path = decodePath(getHashPath());
            warning((!basename || hasBasename(path, basename)), 'You are attempting to use a basename on a page whose URL path does not begin ' +
                'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
            if (basename) {
                path = stripBasename(path, basename);
            }
            return createLocation(path);
        };
        var transitionManager = createTransitionManager();
        var setState = function (nextState) {
            Object.assign(history, nextState);
            history.length = globalHistory.length;
            transitionManager.notifyListeners(history.location, history.action);
        };
        var forceNextPop = false;
        var ignorePath = null;
        var handleHashChange = function () {
            var path = getHashPath();
            var encodedPath = encodePath(path);
            if (path !== encodedPath) {
                // Ensure we always have a properly-encoded hash.
                replaceHashPath(encodedPath);
            }
            else {
                var location = getDOMLocation();
                var prevLocation = history.location;
                if (!forceNextPop && locationsAreEqual(prevLocation, location)) {
                    return; // A hashchange doesn't always == location change.
                }
                if (ignorePath === createPath(location)) {
                    return; // Ignore this change; we already setState in push/replace.
                }
                ignorePath = null;
                handlePop(location);
            }
        };
        var handlePop = function (location) {
            if (forceNextPop) {
                forceNextPop = false;
                setState();
            }
            else {
                var action_2 = 'POP';
                transitionManager.confirmTransitionTo(location, action_2, getUserConfirmation, function (ok) {
                    if (ok) {
                        setState({ action: action_2, location: location });
                    }
                    else {
                        revertPop(location);
                    }
                });
            }
        };
        var revertPop = function (fromLocation) {
            var toLocation = history.location;
            // TODO: We could probably make this more reliable by
            // keeping a list of paths we've seen in sessionStorage.
            // Instead, we just default to 0 for paths we don't know.
            var toIndex = allPaths.lastIndexOf(createPath(toLocation));
            if (toIndex === -1) {
                toIndex = 0;
            }
            var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
            if (fromIndex === -1) {
                fromIndex = 0;
            }
            var delta = toIndex - fromIndex;
            if (delta) {
                forceNextPop = true;
                go(delta);
            }
        };
        // Ensure the hash is encoded properly before doing anything else.
        var path = getHashPath();
        var encodedPath = encodePath(path);
        if (path !== encodedPath) {
            replaceHashPath(encodedPath);
        }
        var initialLocation = getDOMLocation();
        var allPaths = [createPath(initialLocation)];
        // Public interface
        var createHref = function (location) { return ('#' + encodePath(basename + createPath(location))); };
        var push = function (path, state) {
            warning(state === undefined, 'Hash history cannot push state; it is ignored');
            var action = 'PUSH';
            var location = createLocation(path, undefined, undefined, history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var path = createPath(location);
                var encodedPath = encodePath(basename + path);
                var hashChanged = getHashPath() !== encodedPath;
                if (hashChanged) {
                    // We cannot tell if a hashchange was caused by a PUSH, so we'd
                    // rather setState here and ignore the hashchange. The caveat here
                    // is that other hash histories in the page will consider it a POP.
                    ignorePath = path;
                    pushHashPath(encodedPath);
                    var prevIndex = allPaths.lastIndexOf(createPath(history.location));
                    var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                    nextPaths.push(path);
                    allPaths = nextPaths;
                    setState({ action: action, location: location });
                }
                else {
                    warning(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');
                    setState();
                }
            });
        };
        var replace = function (path, state) {
            warning(state === undefined, 'Hash history cannot replace state; it is ignored');
            var action = 'REPLACE';
            var location = createLocation(path, undefined, undefined, history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var path = createPath(location);
                var encodedPath = encodePath(basename + path);
                var hashChanged = getHashPath() !== encodedPath;
                if (hashChanged) {
                    // We cannot tell if a hashchange was caused by a REPLACE, so we'd
                    // rather setState here and ignore the hashchange. The caveat here
                    // is that other hash histories in the page will consider it a POP.
                    ignorePath = path;
                    replaceHashPath(encodedPath);
                }
                var prevIndex = allPaths.indexOf(createPath(history.location));
                if (prevIndex !== -1) {
                    allPaths[prevIndex] = path;
                }
                setState({ action: action, location: location });
            });
        };
        var go = function (n) {
            warning(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');
            globalHistory.go(n);
        };
        var goBack = function () { return go(-1); };
        var goForward = function () { return go(1); };
        var listenerCount = 0;
        var checkDOMListeners = function (delta) {
            listenerCount += delta;
            if (listenerCount === 1) {
                __chunk_1.addEventListener(window, HashChangeEvent$1, handleHashChange);
            }
            else if (listenerCount === 0) {
                __chunk_1.removeEventListener(window, HashChangeEvent$1, handleHashChange);
            }
        };
        var isBlocked = false;
        var block = function (prompt) {
            if (prompt === void 0) { prompt = ''; }
            var unblock = transitionManager.setPrompt(prompt);
            if (!isBlocked) {
                checkDOMListeners(1);
                isBlocked = true;
            }
            return function () {
                if (isBlocked) {
                    isBlocked = false;
                    checkDOMListeners(-1);
                }
                return unblock();
            };
        };
        var listen = function (listener) {
            var unlisten = transitionManager.appendListener(listener);
            checkDOMListeners(1);
            return function () {
                checkDOMListeners(-1);
                unlisten();
            };
        };
        var history = {
            length: globalHistory.length,
            action: 'POP',
            location: initialLocation,
            createHref: createHref,
            push: push,
            replace: replace,
            go: go,
            goBack: goBack,
            goForward: goForward,
            block: block,
            listen: listen
        };
        return history;
    };
    var HISTORIES = {
        'browser': createBrowserHistory,
        'hash': createHashHistory
    };
    /**
      * @name Router
      * @module ionic
      * @description
     */
    var Router = /** @class */ (function () {
        function Router() {
            this.root = '/';
            this.historyType = 'browser';
            // A suffix to append to the page title whenever
            // it's updated through RouteTitle
            this.titleSuffix = '';
            this.unsubscribe = function () { };
            this.match = null;
        }
        Router.prototype.titleSuffixChanged = function (newValue) {
            this.activeRouter.set({
                titleSuffix: newValue
            });
        };
        Router.prototype.computeMatch = function (pathname) {
            return {
                path: this.root,
                url: this.root,
                isExact: pathname === this.root,
                params: {}
            };
        };
        Router.prototype.componentWillLoad = function () {
            var _this = this;
            var history = HISTORIES[this.historyType]();
            history.listen(function (location) {
                _this.activeRouter.set({ location: _this.getLocation(location) });
            });
            this.activeRouter.set({
                location: this.getLocation(history.location),
                titleSuffix: this.titleSuffix,
                root: this.root,
                history: history
            });
            // subscribe the project's active router and listen
            // for changes. Recompute the match if any updates get
            // pushed
            this.unsubscribe = this.activeRouter.subscribe({
                isMatch: this.computeMatch.bind(this),
                listener: function (matchResult) {
                    _this.match = matchResult;
                },
            });
            this.match = this.computeMatch();
        };
        Router.prototype.componentDidLoad = function () {
            this.activeRouter.dispatch();
        };
        Router.prototype.getLocation = function (location) {
            // Remove the root URL if found at beginning of string
            var pathname = location.pathname.indexOf(this.root) == 0 ?
                '/' + location.pathname.slice(this.root.length) :
                location.pathname;
            return Object.assign({}, location, { pathname: pathname });
        };
        Router.prototype.componentDidUnload = function () {
            // be sure to unsubscribe to the router so that we don't
            // get any memory leaks
            this.unsubscribe();
        };
        Router.prototype.render = function () {
            return h("slot", null);
        };
        Object.defineProperty(Router, "is", {
            get: function () { return "stencil-router"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Router, "properties", {
            get: function () {
                return {
                    "activeRouter": {
                        "context": "activeRouter"
                    },
                    "historyType": {
                        "type": String,
                        "attr": "history-type"
                    },
                    "match": {
                        "state": true
                    },
                    "root": {
                        "type": String,
                        "attr": "root"
                    },
                    "titleSuffix": {
                        "type": String,
                        "attr": "title-suffix",
                        "watchCallbacks": ["titleSuffixChanged"]
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        return Router;
    }());
    exports.AppRoot = AppRoot;
    exports.StencilRoute = Route;
    exports.StencilRouter = Router;
    Object.defineProperty(exports, '__esModule', { value: true });
});
