(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["js360"] = factory();
	else
		root["js360"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(17)(); // Support ES3 engines

module.exports = function (val) {
 return (val !== _undefined) && (val !== null);
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getXFn = exports.getXFn = function getXFn(container) {
    var _container$getBoundin = container.getBoundingClientRect(),
        left = _container$getBoundin.left;

    return function (x) {
        return x - left;
    };
};

var httpGet = exports.httpGet = function httpGet(url) {
    return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            var reader = new FileReader();
            reader.readAsText(xhr.response);
            reader.onloadend = function () {
                try {
                    resolve(JSON.parse(reader.result));
                } catch (e) {
                    console.error('HTTP.ERROR: Невозможно получить массив изображений. Проблема либо в пути к JSON объекту либо возвращаемый объект не является валидным JSON.');
                    console.error(e);
                    resolve([]);
                }
            };
        };

        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
};

var getTarget = exports.getTarget = function getTarget(target) {
    if (typeof target === 'string') {
        return document.querySelectorAll(target);
    } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.length) {
        return target;
    } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && !target.length) {
        return [target];
    }

    return [];
};

var intersects = exports.intersects = function intersects() {
    var first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var second = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return first.some(function (el) {
        return second.includes(el);
    });
};

var isEmpty = exports.isEmpty = function isEmpty(obj) {
    var result = true;
    for (var val in obj) {
        result = !!obj[val] ? false : result;
    }

    return result;
};

var range = exports.range = function range(length) {
    var result = [];

    for (var i = 0; i < length; i++) {
        result.push(i);
    }

    return result;
};

var LOAD_EVENTS = ['mousemove'];
var getLoadEvents = exports.getLoadEvents = function getLoadEvents() {
    var dataEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[]';
    var propsEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (JSON.parse(dataEvents).length) return JSON.parse(dataEvents);
    if (propsEvents.length) return propsEvents;
    return LOAD_EVENTS;
};

var ROTATE_EVENTS = ['mousedown'];
var getRotateEvents = exports.getRotateEvents = function getRotateEvents() {
    var dataEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[]';
    var propsEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (JSON.parse(dataEvents).length) return JSON.parse(dataEvents);
    if (propsEvents.length) return propsEvents;
    return ROTATE_EVENTS;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOAD = exports.LOAD = 'LOAD';
var STOP = exports.STOP = 'STOP';
var PLAY = exports.PLAY = 'PLAY';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _js = __webpack_require__(4);

Object.keys(_js).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _js[key];
    }
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JS360 = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _js360Canvas = __webpack_require__(5);

var _utils = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JS360 = exports.JS360 = function () {
    function JS360(options) {
        var _this = this;

        _classCallCheck(this, JS360);

        this.load = function () {
            var indexes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _utils.range)(_this.canvases.length);
            return Promise.all(indexes.map(function (index) {
                return _this.canvases[index].load();
            }));
        };

        this.play = function () {
            var indexes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _utils.range)(_this.canvases.length);
            return indexes.forEach(function (index) {
                return _this.canvases[index].play();
            });
        };

        this.stop = function () {
            var indexes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _utils.range)(_this.canvases.length);
            return indexes.forEach(function (index) {
                return _this.canvases[index].stop();
            });
        };

        this.toggle = function () {
            var indexes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _utils.range)(_this.canvases.length);
            return indexes.forEach(function (index) {
                return _this.canvases[index].toggle();
            });
        };

        this.isLoaded = function () {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            return _this.canvases[index].isLoaded;
        };

        this.isPending = function () {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            return _this.canvases[index].isPending;
        };

        this.isMoving = function () {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            return _this.canvases[index].isMoving;
        };

        this.isStopped = function () {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            return _this.canvases[index].isStopped;
        };

        this.isPlaying = function () {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            return _this.canvases[index].isPlaying;
        };

        this.props = _extends({}, options);
        this.canvases = [];
    }

    _createClass(JS360, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var targets = (0, _utils.getTarget)(this.props.target);

            targets.forEach(function (elem) {
                elem.classList.add('js360-container');
                _this2.canvases.push(new _js360Canvas.JS360Canvas(_extends({ elem: elem }, _this2.props)));
            });
        }
    }]);

    return JS360;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JS360Canvas = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(1);

var _js360Controls = __webpack_require__(6);

var _constants = __webpack_require__(2);

var _es6Symbol = __webpack_require__(7);

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

__webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _updateImage = (0, _es6Symbol2.default)();
var _controls = (0, _es6Symbol2.default)();
var _interval = (0, _es6Symbol2.default)();
var _clientX = (0, _es6Symbol2.default)();
var _images = (0, _es6Symbol2.default)();
var _delta = (0, _es6Symbol2.default)();
var _index = (0, _es6Symbol2.default)();
var _step = (0, _es6Symbol2.default)();
var _meta = (0, _es6Symbol2.default)();

var getPreviewImg = function getPreviewImg(_ref) {
    var canvas = _ref.canvas,
        width = _ref.width,
        height = _ref.height,
        preview = _ref.preview;

    var context2D = canvas.getContext('2d');
    var img = document.createElement('img');

    img.src = preview;
    img.onload = function () {
        return context2D.drawImage(img, 0, 0, width, height);
    };
};

var isRotateOnMousemoveFn = function isRotateOnMousemoveFn(context) {
    return function () {
        var rotateEvents = context.props.rotateEvents;

        var clickEvents = ['mousedown', 'touchstart'];

        return !context[_meta].moving && (0, _utils.intersects)(rotateEvents, clickEvents);
    };
};

var move = function move(context) {
    var props = context.props;

    var isRotateOnMousemove = isRotateOnMousemoveFn(context);

    return function (event) {
        if (isRotateOnMousemove()) return;

        if (typeof props.onRotate === 'function') props.onRotate();
        context[_meta].moving = true;
        updateClientX(context)(event);
        context[_updateImage]();
    };
};

var moveEnd = function moveEnd(context) {
    var props = context.props;

    var moveInstance = move(context);

    return function (event) {
        moveInstance(event);
        context[_meta].moving = false;
        updateDelta(context)(event);
        if (typeof props.onRotateEnd === 'function') props.onRotateEnd();
    };
};

var rotate = function rotate(context) {
    var props = context.props;


    return function (event) {
        if (!context[_images].length) return;

        if (typeof props.onRotateStart === 'function') props.onRotateStart();
        updateDelta(context)(event);
        context[_meta].moving = true;
    };
};

var addListeners = function addListeners(context) {
    var _context$props = context.props,
        container = _context$props.container,
        loadEvents = _context$props.loadEvents,
        load = context.load;

    var loadTarget = context[_controls].load || container;

    loadEvents.forEach(function (event) {
        return loadTarget.addEventListener(event, load);
    });
    container.addEventListener('mousemove', move(context));
    container.addEventListener('touchmove', move(context));
    container.addEventListener('mouseup', moveEnd(context));
    container.addEventListener('touchend', moveEnd(context));
};

var addLoader = function addLoader(_ref2) {
    var container = _ref2.container;

    var loader = document.createElement('div');

    loader.classList.add('loader');
    container.classList.add('is-pending');
    container.append(loader);
};

var removeLoader = function removeLoader(_ref3) {
    var container = _ref3.container,
        preloader = _ref3.preloader;

    if (preloader !== 'true' && preloader !== true) return;

    container.classList.remove('is-pending');
    container.querySelector('.loader').remove();
};

var CONTROL_TYPES = { LOAD: _constants.LOAD, PLAY: _constants.PLAY };
var initControls = function initControls(context) {
    var _context$props2 = context.props,
        controlLoad = _context$props2.controlLoad,
        controlPlay = _context$props2.controlPlay,
        stop = context.stop;


    if (controlLoad) {
        context[_controls].load = document.createElement('div');
        context[_controls].load.classList.add('js360-load', 'js360-control');
        context[_controls].load.innerHTML = new _js360Controls.Controls(CONTROL_TYPES[_constants.LOAD]).render();
    }

    if (controlPlay) {
        context[_controls].play = document.createElement('div');
        context[_controls].play.classList.add('js360-play', 'js360-control');
        context[_controls].play.innerHTML = new _js360Controls.Controls(CONTROL_TYPES[_constants.PLAY]).render();
        context[_controls].play.addEventListener('click', stop);
    }
};

var showControls = function showControls(props, types) {
    types.forEach(function (type) {
        var control = props.container.querySelector('.js360-' + type);
        if (!control) return;

        control.classList.add('visible');
    });
};

var updatePlayButton = function updatePlayButton(context) {
    if (!context[_controls].play) return;

    var state = context[_meta].stopped ? _constants.PLAY : _constants.STOP;
    context[_controls].play.innerHTML = new _js360Controls.Controls(state).render();
};

var updateClientX = function updateClientX(context) {
    return function (_ref4) {
        var type = _ref4.type,
            changedTouches = _ref4.changedTouches,
            clientX = _ref4.clientX;

        var getX = (0, _utils.getXFn)(context.props.container);
        context[_clientX] = ['touchmove', 'touchend'].includes(type) ? getX(changedTouches[0].clientX) : getX(clientX);
    };
};

var updateDelta = function updateDelta(context) {
    return function (_ref5) {
        var type = _ref5.type,
            changedTouches = _ref5.changedTouches,
            clientX = _ref5.clientX;

        if (!['mousedown', 'touchstart'].includes(type)) return;

        var getX = (0, _utils.getXFn)(context.props.container);
        context[_delta] = getX(clientX || changedTouches[0].clientX) - context[_index]() * context[_step] / context.props.speed;
    };
};

var getUpdateImageFn = function getUpdateImageFn(context) {
    var _context$props3 = context.props,
        container = _context$props3.container,
        canvas = _context$props3.canvas;

    var width = container.clientWidth || 320;
    var height = container.clientHeight || 180;
    var context2D = canvas.getContext('2d');

    return function () {
        var base64 = context[_images][context[_index]() > 0 ? context[_index]() : context[_images].length + context[_index]()];
        if (!base64) return;

        var img = document.createElement('img');
        img.onload = function () {
            return context2D.drawImage(img, 0, 0, width, height);
        };
        img.src = base64;
    };
};

var JS360Canvas = exports.JS360Canvas = function () {
    function JS360Canvas(_ref6) {
        var _this = this;

        var elem = _ref6.elem,
            dataset = _ref6.elem.dataset,
            props = _objectWithoutProperties(_ref6, ['elem', 'elem']);

        _classCallCheck(this, JS360Canvas);

        this.stop = function () {
            if (_this[_meta].stopped) return _this.play();

            _this[_meta].stopped = true;
            clearInterval(_this[_interval]);
            _this[_interval] = null;

            if (typeof _this.props.onPlayEnd === 'function') _this.props.onPlayEnd();
            updatePlayButton(_this);
        };

        this.load = function () {
            var _props = _this.props,
                autoPlay = _props.autoPlay,
                baseUrl = _props.baseUrl,
                preloader = _props.preloader,
                retinaUrl = _props.retinaUrl,
                url = _props.url,
                width = _props.width,
                onLoad = _props.onLoad;


            return new Promise(function (resolve) {
                if (url && !_this[_meta].loaded && !_this[_meta].pending) {
                    var path = [baseUrl, retinaUrl, url].filter(function (path) {
                        return path;
                    }).join('/');
                    _this[_meta].pending = true;

                    if (preloader === 'true' || preloader === true) addLoader(_this.props);

                    (0, _utils.httpGet)(path).then(function (images) {
                        removeLoader(_this.props);
                        if (!images.length) return;

                        var _props2 = _this.props,
                            container = _props2.container,
                            rotateEvents = _props2.rotateEvents;


                        _this[_meta].loaded = true;
                        _this[_meta].pending = false;

                        _this[_step] = Math.floor(width / images.length * 1000) / 1000;
                        _this[_images] = images;
                        showControls(_this.props, ['play']);

                        rotateEvents.forEach(function (event) {
                            return container.addEventListener(event, rotate(_this));
                        });
                        if (typeof onLoad === 'function') onLoad();
                        if (autoPlay === 'true' || autoPlay === true) _this.play();
                        resolve();
                    });
                } else resolve();
            });
        };

        this.play = function () {
            var forced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            _this[_meta].stopped = forced;
            if (_this[_controls].play) updatePlayButton(_this);

            if (!_this[_meta].stopped && typeof _this.props.onPlayStart === 'function') _this.props.onPlayStart();
            if (typeof _this.props.onPlayStart === 'function') _this.props.onPlayStart();

            clearInterval(_this[_interval]);
            _this[_interval] = setInterval(function () {
                if (_this[_meta].moving || _this[_meta].stopped) return;

                if (typeof _this.props.onPlay === 'function') _this.props.onPlay();
                _this[_delta]--;
                _this[_updateImage]();
            }, Math.floor(50 / _this.props.speed));
        };

        this.props = {
            canvas: document.createElement('canvas'),
            container: elem,

            height: dataset.height || props.height || elem.clientHeight || 180,
            width: dataset.width || props.width || elem.clientWidth || 320,

            retinaUrl: window.devicePixelRatio === 2 ? dataset.retinaUrl || props.retinaUrl || '' : '',
            speed: Math.floor((dataset.speed || props.speed || 1) * 100) / 100,
            loadEvents: (0, _utils.getLoadEvents)(dataset.loadEvents, props.loadEvents),
            rotateEvents: (0, _utils.getRotateEvents)(dataset.rotateEvents, props.rotateEvents),

            autoPlay: dataset.autoPlay || props.autoPlay,
            preloader: dataset.preloader || props.preloader,
            baseUrl: dataset.baseUrl || props.baseUrl,
            preview: dataset.preview || props.preview,
            url: dataset.url || props.url,
            controlLoad: props.controlLoad || false,
            controlPlay: props.controlPlay || false
        };

        this[_updateImage] = getUpdateImageFn(this);
        this[_interval] = null;
        this[_clientX] = 0;
        this[_delta] = null;
        this[_step] = null;
        this[_images] = [];
        this[_controls] = {};
        this[_meta] = {
            loaded: false,
            pending: false,
            moving: false,
            stopped: true
        };
        this[_index] = function () {
            var index = Math.round((_this[_clientX] - _this[_delta]) / (_this[_step] / _this.props.speed));

            if (index >= _this[_images].length) {
                index = 0;
                _this[_delta] = _this[_clientX];
            }

            if (index <= -_this[_images].length) {
                index += _this[_images].length;
                _this[_delta] = _this[_clientX];
            }

            return Number.isNaN(index) ? 0 : index;
        };

        this.init();
        this.render();
    }

    _createClass(JS360Canvas, [{
        key: 'init',
        value: function init() {
            var _props3 = this.props,
                container = _props3.container,
                width = _props3.width,
                height = _props3.height,
                canvas = _props3.canvas;


            canvas.setAttribute('width', width + 'px');
            canvas.setAttribute('height', height + 'px');
            container.style.position = 'relative';

            getPreviewImg(this.props);
            initControls(this);
            addListeners(this);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props4 = this.props,
                container = _props4.container,
                canvas = _props4.canvas;

            container.innerHTML = '';
            container.append(canvas);

            if ((0, _utils.isEmpty)(this[_controls])) return;

            var controlsContainer = document.createElement('div');
            for (var control in this[_controls]) {
                controlsContainer.append(this[_controls][control]);
            }

            controlsContainer.classList.add('js360-controls');
            container.append(controlsContainer);
        }
    }, {
        key: 'isLoaded',
        get: function get() {
            return this[_meta].loaded;
        }
    }, {
        key: 'isPending',
        get: function get() {
            return this[_meta].pending;
        }
    }, {
        key: 'isMoving',
        get: function get() {
            return this[_meta].moving;
        }
    }, {
        key: 'isStopped',
        get: function get() {
            return this[_meta].stopped;
        }
    }, {
        key: 'isPlaying',
        get: function get() {
            return !this[_meta].stopped;
        }
    }]);

    return JS360Canvas;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Controls = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controls = exports.Controls = function () {
    function Controls(type) {
        _classCallCheck(this, Controls);

        this.props = { type: type };
    }

    _createClass(Controls, [{
        key: 'render',
        value: function render() {
            var type = this.props.type;


            switch (type) {
                case _constants.LOAD:
                    return '\n                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n                    \t width="300px" height="300px" viewBox="45 45 420 420" enable-background="new 0 0 500 500" xml:space="preserve">\n                        <g>\n                        \t<g>\n                        \t\t<path fill="#010101" d="M195.6,260.1c1.9,2.7,5.1,4.6,8.6,4.6c4.4,0,8.7-3.4,8.7-8.4c0-4.8-4-8.5-9.1-8.5c-1.9,0-3.8,0.5-5.6,1.3\n                        \t\t\tv-5.3l8.7-10.3h-15.5v-8h28.2v5.3l-8.4,10.3c6.4,2.5,10.7,8,10.7,15c0,9.8-7.7,16.4-17.3,16.4c-5.8,0-11.3-2.6-15.4-7.2\n                        \t\t\tL195.6,260.1z"/>\n                        \t\t<path fill="#010101" d="M253.9,225.6l-8.7,14.8h0.6c8.8,0,16.2,6.7,16.2,16c0,9-7.5,16.3-16.5,16.3c-8.7,0-17-6.2-17-15.8\n                        \t\t\tc0-4.6,2.1-8.7,4.6-12.8l10.9-18.4H253.9z M237.1,256.8c0,4.4,3.7,7.9,8.2,7.9c4.6,0,7.8-3.6,7.8-8.1c0-4.4-3.3-8.3-8.3-8.3\n                        \t\t\tc-1.7,0-3.2,0.3-5,1.1C238.7,251.2,237.1,253.7,237.1,256.8z"/>\n                        \t\t<path fill="#010101" d="M284.6,225c11.9,0,16.2,10.7,16.2,23.9c0,13.2-4.4,23.9-16.2,23.9c-11.9,0-16.2-10.7-16.2-23.9\n                        \t\t\tC268.3,235.6,272.7,225,284.6,225z M284.6,232.9c-5.4,0-7.3,7.2-7.3,15.9c0,8.7,1.9,15.9,7.3,15.9c5.4,0,7.3-7.2,7.3-15.9\n                        \t\t\tC291.8,240.1,289.9,232.9,284.6,232.9z"/>\n                        \t\t<path fill="#010101" d="M316.4,221.6c4,0,7.3,3.2,7.3,7.3c0,4-3.2,7.3-7.3,7.3c-4,0-7.3-3.2-7.3-7.3\n                        \t\t\tC309.1,224.9,312.3,221.6,316.4,221.6z M316.4,230.9c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2c-1.1,0-2,0.9-2,2\n                        \t\t\tC314.4,230.1,315.3,230.9,316.4,230.9z"/>\n                        \t</g>\n                        \t<g>\n                        \t\t<path fill="#010101" d="M250.5,376.5c-70,0-127-57-127-127s57-127,127-127c28.8,0,56,9.4,78.6,27.2l-7.7,9.8\n                        \t\t\tc-20.4-16-44.9-24.5-70.8-24.5C187.3,135,136,186.3,136,249.5S187.3,364,250.5,364c63.2,0,114.5-51.4,114.5-114.5\n                        \t\t\tc0-26.7-9.4-52.7-26.5-73.3l9.6-8c18.9,22.7,29.4,51.6,29.4,81.2C377.5,319.5,320.5,376.5,250.5,376.5z"/>\n                        \t\t<polygon fill="#010101" points="331.8,160.1 335.8,198.8 369.7,172.6 \t\t"/>\n                        \t</g>\n                        </g>\n                    </svg>\n                ';
                case _constants.STOP:
                    return '\n                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n                        <path d="M6 19h2V5H6v14zm7-14v14h2V5h-4z"/>\n                        <path d="M0 0h24v24H0z" fill="none"/>\n                    </svg>\n                ';
                case _constants.PLAY:
                    return '\n                    <svg fill="#9E9E9E" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n                        <path d="M8 5v14l11-7z"/>\n                        <path d="M0 0h24v24H0z" fill="none"/>\n                    </svg>\n                ';
                default:
                    return '<div></div>';
            }
        }
    }]);

    return Controls;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(8)() ? Symbol : __webpack_require__(9);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ES2015 Symbol polyfill for environments that do not (or partially) support it



var d              = __webpack_require__(10)
  , validateSymbol = __webpack_require__(24)

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// To ensure proper interoperability with other native functions (e.g. Array.from)
	// fallback to eventual native implementation of given symbol
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(11)
  , normalizeOpts = __webpack_require__(19)
  , isCallable    = __webpack_require__(20)
  , contains      = __webpack_require__(21)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(12)()
	? Object.assign
	: __webpack_require__(13);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(14)
  , value = __webpack_require__(18)
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(15)()
	? Object.keys
	: __webpack_require__(16);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
 return false;
}
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(0);

var keys = Object.keys;

module.exports = function (object) {
	return keys(isValue(object) ? Object(object) : object);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(0);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(0);

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
 return typeof obj === "function";
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(22)()
	? String.prototype.contains
	: __webpack_require__(23);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return (str.contains("dwa") === true) && (str.contains("foo") === false);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(25);

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});