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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOAD = exports.LOAD = 'LOAD';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _js = __webpack_require__(2);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JS360 = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = __webpack_require__(3);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JS360 = exports.JS360 = function () {
    function JS360(options) {
        _classCallCheck(this, JS360);

        this.props = _extends({}, options);
        this.canvases = {};
    }

    _createClass(JS360, [{
        key: 'render',
        value: function render() {
            var _this = this;

            var target = this.props.target;

            var targets = [];

            if (typeof target === 'string') {
                targets = document.querySelectorAll(target);
            } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.length) {
                targets = target;
            } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && !target.length) {
                targets = [target];
            }

            targets.forEach(function (elem) {
                var _elem$dataset = elem.dataset,
                    url = _elem$dataset.url,
                    retinaPrefix = _elem$dataset.retinaPrefix;

                var _props = _this.props,
                    target = _props.target,
                    rest = _objectWithoutProperties(_props, ['target']);

                elem.classList.add('js360-container');
                _this.canvases[url] = new _Canvas.Canvas(_extends({ elem: elem, retinaPrefix: retinaPrefix }, rest));
            });
        }
    }]);

    return JS360;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Canvas = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(4);

var _Controls = __webpack_require__(5);

var _constants = __webpack_require__(0);

__webpack_require__(6);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LOAD_EVENTS = ['mousemove'];
var ROTATE_EVENTS = ['mousedown'];

var Canvas = exports.Canvas = function () {
    function Canvas(_ref) {
        var elem = _ref.elem,
            retinaPrefix = _ref.retinaPrefix,
            speed = _ref.speed,
            controls = _ref.controls,
            rest = _objectWithoutProperties(_ref, ['elem', 'retinaPrefix', 'speed', 'controls']);

        _classCallCheck(this, Canvas);

        _initialiseProps.call(this);

        var _elem$dataset = elem.dataset,
            _elem$dataset$loadEve = _elem$dataset.loadEvents,
            loadEvents = _elem$dataset$loadEve === undefined ? '[]' : _elem$dataset$loadEve,
            _elem$dataset$rotateE = _elem$dataset.rotateEvents,
            rotateEvents = _elem$dataset$rotateE === undefined ? '[]' : _elem$dataset$rotateE;


        this.props = _extends({
            retinaPrefix: window.devicePixelRatio === 2 ? retinaPrefix : '',
            container: elem,
            canvas: document.createElement('canvas'),
            width: elem.clientWidth || 320,
            height: elem.clientHeight || 180,
            preview: elem.dataset.preview,
            loadEvents: JSON.parse(loadEvents).length ? JSON.parse(loadEvents) : LOAD_EVENTS,
            rotateEvents: JSON.parse(rotateEvents).length ? JSON.parse(rotateEvents) : ROTATE_EVENTS,
            url: elem.dataset.url,
            baseUrl: elem.dataset.baseUrl,
            speed: Math.floor((elem.dataset.speed || speed || 1) * 100) / 100,
            controls: {
                load: controls && controls.load ? document.createElement('div') : null
            }
        }, rest);

        this.interval = null;
        this.intervalIndex = 0;

        this.meta = {
            success: false,
            pending: false,
            moving: false,
            fixed: false
        };

        this.clientX = 0;
        this.delta = null;
        this.step = null;
        this.controls = {};

        this.images = [];

        this.changeImage = this.getChangeImageFn(this.props);
        this.getX = (0, _utils.getXFn)(this.props.container);

        this.init();
        this.render();
    }

    _createClass(Canvas, [{
        key: 'init',
        value: function init() {
            var _props = this.props,
                container = _props.container,
                width = _props.width,
                height = _props.height,
                canvas = _props.canvas;


            canvas.setAttribute('width', width + 'px');
            canvas.setAttribute('height', height + 'px');
            container.style.position = 'relative';
            this.getPreviewImg();
            this.initControls();
            this.addListeners();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                container = _props2.container,
                canvas = _props2.canvas,
                load = _props2.controls.load;

            container.append(canvas);

            if (load) {
                container.append(load);
            }
        }
    }, {
        key: 'getPreviewImg',
        value: function getPreviewImg() {
            var _props3 = this.props,
                canvas = _props3.canvas,
                width = _props3.width,
                height = _props3.height,
                preview = _props3.preview;


            var context = canvas.getContext('2d');
            var img = document.createElement('img');

            img.src = preview;
            img.onload = function () {
                return context.drawImage(img, 0, 0, width, height);
            };
        }
    }, {
        key: 'addListeners',
        value: function addListeners() {
            var _this = this;

            var _props4 = this.props,
                container = _props4.container,
                controls = _props4.controls,
                loadEvents = _props4.loadEvents,
                rotateEvents = _props4.rotateEvents;

            var loadTarget = controls.load || container;

            rotateEvents.forEach(function (event) {
                return container.addEventListener(event, _this.rotate);
            });
            loadEvents.forEach(function (event) {
                return loadTarget.addEventListener(event, _this.load);
            });
            container.addEventListener('mousemove', this.onMove);
            container.addEventListener('touchmove', this.onMove);
            container.addEventListener('mouseup', this.stop);
            container.addEventListener('touchend', this.stop);
        }
    }, {
        key: 'index',
        get: function get() {
            var speed = this.props.speed;

            var index = 0;

            index = Math.round((this.clientX - this.delta) / (this.step / speed));

            if (index >= this.images.length) {
                index = 0;
                this.delta = this.clientX;
            }

            if (index <= -this.images.length) {
                index += this.images.length;
                this.delta = this.clientX;
            }

            if (Number.isNaN(index)) {
                index = 0;
            }

            return index;
        }
    }, {
        key: 'isRotatable',
        get: function get() {
            var rotateEvents = this.props.rotateEvents;

            return !((rotateEvents.includes('mousedown') || rotateEvents.includes('touchstart')) && !this.meta.moving);
        }
    }]);

    return Canvas;
}();

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.onMove = function (event) {
        if (_this2.isRotatable) {
            _this2.meta.moving = true;
            _this2.updateClientX(event);
            _this2.changeImage(_this2.index);
        };
    };

    this.stop = function (event) {
        _this2.onMove(event);
        _this2.meta.moving = false;
        _this2.calcDelta(event);
        _this2.intervalIndex = _this2.index;
    };

    this.rotate = function (event) {
        if (!_this2.images.length) return;
        _this2.calcDelta(event);
        _this2.meta.moving = true;
    };

    this.load = function (event) {
        var _props5 = _this2.props,
            baseUrl = _props5.baseUrl,
            url = _props5.url,
            width = _props5.width,
            retinaPrefix = _props5.retinaPrefix,
            autoPlay = _props5.autoPlay;


        if (url && !_this2.meta.success && !_this2.meta.pending) {
            _this2.meta.pending = true;
            var path = [baseUrl, retinaPrefix, url].filter(function (path) {
                return path;
            }).join('/');

            _this2.addLoader();
            (0, _utils.httpGet)(path).then(function (images) {
                _this2.step = Math.floor(width / images.length * 1000) / 1000;
                _this2.images = images;
                _this2.meta.success = true;
                _this2.meta.pending = false;
                _this2.removeLoader();

                if (autoPlay) _this2.play();
            });
        }
    };

    this.play = function () {
        _this2.interval = setInterval(function () {
            if (!_this2.meta.moving) {
                _this2.intervalIndex++;
                _this2.changeImage(_this2.intervalIndex);

                if (_this2.intervalIndex >= _this2.images.length) {
                    _this2.intervalIndex = 0;
                }
            }
        }, Math.floor(50 / _this2.props.speed));
    };

    this.calcDelta = function (_ref2) {
        var clientX = _ref2.clientX,
            changedTouches = _ref2.changedTouches,
            type = _ref2.type;

        if (type === 'mousedown' || type === 'touchstart') {
            var index = _this2.interval ? _this2.intervalIndex : _this2.index;
            var x = clientX || changedTouches[0].clientX;
            var speed = _this2.props.speed;


            _this2.delta = _this2.getX(x) - index * _this2.step / speed;
        }
    };

    this.addLoader = function () {
        var container = _this2.props.container;

        container.classList.add('is-pending');

        var loader = document.createElement('div');
        loader.classList.add('loader');
        container.append(loader);
    };

    this.removeLoader = function () {
        var container = _this2.props.container;

        container.classList.remove('is-pending');
        document.querySelector('.loader').remove();
    };

    this.initControls = function () {
        var controls = _this2.props.controls;


        if (controls.load) {
            controls.load.classList.add('js360-load');
            controls.load.innerHTML = new _Controls.Controls(_constants.LOAD).render();
        }
    };

    this.updateClientX = function (_ref3) {
        var type = _ref3.type,
            changedTouches = _ref3.changedTouches,
            clientX = _ref3.clientX;

        _this2.clientX = type === 'touchmove' ? _this2.getX(changedTouches[0].clientX) : _this2.getX(clientX);
    };

    this.getChangeImageFn = function (_ref4) {
        var container = _ref4.container,
            canvas = _ref4.canvas,
            rotateEvents = _ref4.rotateEvents,
            speed = _ref4.speed;

        var width = container.clientWidth || 320;
        var height = container.clientHeight || 180;
        var context = canvas.getContext('2d');

        return function (index) {
            var img = document.createElement('img');
            img.src = _this2.images[index > 0 ? index : _this2.images.length + index];
            img.onload = function () {
                return context.drawImage(img, 0, 0, width, height);
            };
        };
    };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getXFn = getXFn;
function getXFn(container) {
    var rect = container.getBoundingClientRect();
    var left = rect.left;


    return function (x) {
        return x - left;
    };
}

var httpGet = exports.httpGet = function httpGet(url) {
    return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            var reader = new FileReader();
            reader.readAsText(xhr.response);
            reader.onloadend = function () {
                return resolve(JSON.parse(reader.result));
            };
        };

        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Controls = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

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
                    return '<?xml version="1.0" encoding="utf-8"?>\n                    <!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n                    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n                    \t width="300px" height="300px" viewBox="45 45 420 420" enable-background="new 0 0 500 500" xml:space="preserve">\n                    <g>\n                    \t<g>\n                    \t\t<path fill="#010101" d="M195.6,260.1c1.9,2.7,5.1,4.6,8.6,4.6c4.4,0,8.7-3.4,8.7-8.4c0-4.8-4-8.5-9.1-8.5c-1.9,0-3.8,0.5-5.6,1.3\n                    \t\t\tv-5.3l8.7-10.3h-15.5v-8h28.2v5.3l-8.4,10.3c6.4,2.5,10.7,8,10.7,15c0,9.8-7.7,16.4-17.3,16.4c-5.8,0-11.3-2.6-15.4-7.2\n                    \t\t\tL195.6,260.1z"/>\n                    \t\t<path fill="#010101" d="M253.9,225.6l-8.7,14.8h0.6c8.8,0,16.2,6.7,16.2,16c0,9-7.5,16.3-16.5,16.3c-8.7,0-17-6.2-17-15.8\n                    \t\t\tc0-4.6,2.1-8.7,4.6-12.8l10.9-18.4H253.9z M237.1,256.8c0,4.4,3.7,7.9,8.2,7.9c4.6,0,7.8-3.6,7.8-8.1c0-4.4-3.3-8.3-8.3-8.3\n                    \t\t\tc-1.7,0-3.2,0.3-5,1.1C238.7,251.2,237.1,253.7,237.1,256.8z"/>\n                    \t\t<path fill="#010101" d="M284.6,225c11.9,0,16.2,10.7,16.2,23.9c0,13.2-4.4,23.9-16.2,23.9c-11.9,0-16.2-10.7-16.2-23.9\n                    \t\t\tC268.3,235.6,272.7,225,284.6,225z M284.6,232.9c-5.4,0-7.3,7.2-7.3,15.9c0,8.7,1.9,15.9,7.3,15.9c5.4,0,7.3-7.2,7.3-15.9\n                    \t\t\tC291.8,240.1,289.9,232.9,284.6,232.9z"/>\n                    \t\t<path fill="#010101" d="M316.4,221.6c4,0,7.3,3.2,7.3,7.3c0,4-3.2,7.3-7.3,7.3c-4,0-7.3-3.2-7.3-7.3\n                    \t\t\tC309.1,224.9,312.3,221.6,316.4,221.6z M316.4,230.9c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2c-1.1,0-2,0.9-2,2\n                    \t\t\tC314.4,230.1,315.3,230.9,316.4,230.9z"/>\n                    \t</g>\n                    \t<g>\n                    \t\t<path fill="#010101" d="M250.5,376.5c-70,0-127-57-127-127s57-127,127-127c28.8,0,56,9.4,78.6,27.2l-7.7,9.8\n                    \t\t\tc-20.4-16-44.9-24.5-70.8-24.5C187.3,135,136,186.3,136,249.5S187.3,364,250.5,364c63.2,0,114.5-51.4,114.5-114.5\n                    \t\t\tc0-26.7-9.4-52.7-26.5-73.3l9.6-8c18.9,22.7,29.4,51.6,29.4,81.2C377.5,319.5,320.5,376.5,250.5,376.5z"/>\n                    \t\t<polygon fill="#010101" points="331.8,160.1 335.8,198.8 369.7,172.6 \t\t"/>\n                    \t</g>\n                    </g>\n                    </svg>\n                ';
                default:
                    return '<div></div>';
            }
        }
    }]);

    return Controls;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});