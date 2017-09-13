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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
                return resolve(JSON.parse(reader.result));
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOAD = exports.LOAD = 'LOAD';
var PAUSE = exports.PAUSE = 'PAUSE';
var PLAY = exports.PLAY = 'PLAY';

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _js = __webpack_require__(3);

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JS360 = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _js360Canvas = __webpack_require__(4);

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var symbols = [];

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

            var targets = (0, _utils.getTarget)(this.props.target);

            targets.forEach(function (elem) {
                var symbol = Symbol();

                symbols.push(symbol);
                elem.classList.add('js360-container');
                _this.canvases[symbol] = new _js360Canvas.JS360Canvas(_extends({ elem: elem }, _this.props));
            });
        }
    }]);

    return JS360;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JS360Canvas = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _js360Controls = __webpack_require__(5);

var _constants = __webpack_require__(1);

__webpack_require__(6);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LOAD_EVENTS = ['mousemove'];
var ROTATE_EVENTS = ['mousedown'];
var CONTROL_TYPES = {
    load: _constants.LOAD,
    play: _constants.PLAY
};

var JS360Canvas = exports.JS360Canvas = function () {
    function JS360Canvas(_ref) {
        var elem = _ref.elem,
            speed = _ref.speed,
            retinaUrl = _ref.retinaUrl,
            propsRest = _objectWithoutProperties(_ref, ['elem', 'speed', 'retinaUrl']);

        _classCallCheck(this, JS360Canvas);

        _initialiseProps.call(this);

        var _elem$dataset = elem.dataset,
            _elem$dataset$loadEve = _elem$dataset.loadEvents,
            loadEvents = _elem$dataset$loadEve === undefined ? '[]' : _elem$dataset$loadEve,
            _elem$dataset$rotateE = _elem$dataset.rotateEvents,
            rotateEvents = _elem$dataset$rotateE === undefined ? '[]' : _elem$dataset$rotateE,
            datasetRest = _objectWithoutProperties(_elem$dataset, ['loadEvents', 'rotateEvents']);

        this.props = _extends({
            canvas: document.createElement('canvas'),
            container: elem,
            height: elem.clientHeight || 180,
            loadEvents: JSON.parse(loadEvents).length ? JSON.parse(loadEvents) : LOAD_EVENTS,
            retinaUrl: window.devicePixelRatio === 2 ? retinaUrl || datasetRest.retinaUrl || '' : '',
            rotateEvents: JSON.parse(rotateEvents).length ? JSON.parse(rotateEvents) : ROTATE_EVENTS,
            speed: Math.floor((speed || datasetRest.speed || 1) * 100) / 100,
            width: elem.clientWidth || 320
        }, datasetRest, propsRest);

        this.meta = {
            success: false,
            pending: false,
            moving: false,
            paused: true
        };

        this.interval = null;
        this.clientX = 0;
        this.delta = null;
        this.step = null;
        this.images = [];
        this.controls = {};

        this.updateImage = this.getUpdateImageFn(this.props);
        this.getX = (0, _utils.getXFn)(this.props.container);

        this.init();
        this.render();
    }

    _createClass(JS360Canvas, [{
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
                controls = _props2.controls;

            container.append(canvas);

            if ((0, _utils.isEmpty)(controls)) return;

            var controlsContainer = document.createElement('div');
            for (var control in this.controls) {
                controlsContainer.append(this.controls[control]);
            }

            controlsContainer.classList.add('js360-controls');
            container.append(controlsContainer);
        }
    }, {
        key: 'index',
        get: function get() {
            var speed = this.props.speed;

            var index = Math.round((this.clientX - this.delta) / (this.step / speed));

            if (index >= this.images.length) {
                index = 0;
                this.delta = this.clientX;
            }

            if (index <= -this.images.length) {
                index += this.images.length;
                this.delta = this.clientX;
            }

            return Number.isNaN(index) ? 0 : index;
        }
    }, {
        key: 'isRotateOnMousemove',
        get: function get() {
            var rotateEvents = this.props.rotateEvents;

            var clickEvents = ['mousedown', 'touchstart'];

            return !this.meta.moving && (0, _utils.intersects)(rotateEvents, clickEvents);
        }
    }]);

    return JS360Canvas;
}();

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.getPreviewImg = function () {
        var _props3 = _this.props,
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
    };

    this.addListeners = function () {
        var _props4 = _this.props,
            container = _props4.container,
            loadEvents = _props4.loadEvents,
            rotateEvents = _props4.rotateEvents;

        var loadTarget = _this.controls.load || container;

        rotateEvents.forEach(function (event) {
            return container.addEventListener(event, _this.rotate);
        });
        loadEvents.forEach(function (event) {
            return loadTarget.addEventListener(event, _this.load);
        });
        container.addEventListener('mousemove', _this.move);
        container.addEventListener('touchmove', _this.move);
        container.addEventListener('mouseup', _this.stop);
        container.addEventListener('touchend', _this.stop);
    };

    this.move = function (event) {
        if (_this.isRotateOnMousemove) return;

        _this.meta.moving = true;
        _this.updateClientX(event);
        _this.updateImage();
    };

    this.stop = function (event) {
        _this.move(event);
        _this.meta.moving = false;
        _this.updateDelta(event);
    };

    this.rotate = function (event) {
        if (!_this.images.length) return;

        _this.updateDelta(event);
        _this.meta.moving = true;
    };

    this.togglePlay = function () {
        _this.meta.paused = !_this.meta.paused;

        var state = _this.meta.paused ? _constants.PLAY : _constants.PAUSE;
        _this.controls.play.innerHTML = new _js360Controls.Controls(state).render();
    };

    this.load = function (event) {
        var _props5 = _this.props,
            autoPlay = _props5.autoPlay,
            baseUrl = _props5.baseUrl,
            preloader = _props5.preloader,
            retinaUrl = _props5.retinaUrl,
            url = _props5.url,
            width = _props5.width;


        if (url && !_this.meta.success && !_this.meta.pending) {
            var path = [baseUrl, retinaUrl, url].filter(function (path) {
                return path;
            }).join('/');
            _this.meta.pending = true;

            if (preloader) _this.addLoader();

            (0, _utils.httpGet)(path).then(function (images) {
                _this.meta.success = true;
                _this.meta.pending = false;

                _this.step = Math.floor(width / images.length * 1000) / 1000;
                _this.images = images;
                _this.showControls(['pause', 'play']);
                _this.removeLoader();

                if (autoPlay) {
                    _this.meta.paused = false;
                    _this.startAutoPlay();
                }
            });
        }
    };

    this.startAutoPlay = function () {
        clearInterval(_this.interval);
        _this.interval = setInterval(function () {
            if (_this.meta.moving || _this.meta.paused) return;

            _this.delta--;
            _this.updateImage();
        }, Math.floor(50 / _this.props.speed));
    };

    this.addLoader = function () {
        var container = _this.props.container;

        var loader = document.createElement('div');

        loader.classList.add('loader');
        container.classList.add('is-pending');
        container.append(loader);
    };

    this.removeLoader = function () {
        var _props6 = _this.props,
            container = _props6.container,
            preloader = _props6.preloader;

        if (!preloader) return;

        container.classList.remove('is-pending');
        container.querySelector('.loader').remove();
    };

    this.initControls = function () {
        var _props7 = _this.props,
            autoPlay = _props7.autoPlay,
            controls = _props7.controls;

        if ((0, _utils.isEmpty)(controls)) return;

        for (var control in controls) {
            var button = control === 'play' && autoPlay ? _constants.PAUSE : CONTROL_TYPES[control];

            if (button) {
                _this.controls[control] = document.createElement('div');
                _this.controls[control].classList.add('js360-' + control, 'js360-control');
                _this.controls[control].innerHTML = new _js360Controls.Controls(button).render();

                if (control === 'play') {
                    _this.controls[control].addEventListener('click', function () {
                        _this.togglePlay();
                        if (!_this.interval) _this.startAutoPlay();
                    });
                }
            }
        }
    };

    this.showControls = function (types) {
        types.forEach(function (type) {
            var control = _this.props.container.querySelector('.js360-' + type);
            if (!control) return;

            control.classList.add('visible');
        });
    };

    this.updateClientX = function (_ref2) {
        var type = _ref2.type,
            changedTouches = _ref2.changedTouches,
            clientX = _ref2.clientX;

        _this.clientX = type === 'touchmove' ? _this.getX(changedTouches[0].clientX) : _this.getX(clientX);
    };

    this.updateDelta = function (_ref3) {
        var type = _ref3.type,
            changedTouches = _ref3.changedTouches,
            clientX = _ref3.clientX;

        if (!['mousedown', 'touchstart'].includes(type)) return;

        _this.delta = _this.getX(clientX || changedTouches[0].clientX) - _this.index * _this.step / _this.props.speed;
    };

    this.getUpdateImageFn = function (_ref4) {
        var container = _ref4.container,
            canvas = _ref4.canvas,
            rotateEvents = _ref4.rotateEvents,
            speed = _ref4.speed;

        var width = container.clientWidth || 320;
        var height = container.clientHeight || 180;
        var context = canvas.getContext('2d');

        return function () {
            var base64 = _this.images[_this.index > 0 ? _this.index : _this.images.length + _this.index];
            if (!base64) return;

            var img = document.createElement('img');
            img.onload = function () {
                return context.drawImage(img, 0, 0, width, height);
            };
            img.src = base64;
        };
    };
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

var _constants = __webpack_require__(1);

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
                case _constants.PAUSE:
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
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});