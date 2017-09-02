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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _js = __webpack_require__(1);

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.js360 = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var js360 = exports.js360 = function () {
    function js360(options) {
        _classCallCheck(this, js360);

        this.props = _extends({}, options);
        this.canvases = [];

        if (!this.props.baseUrl) {
            console.warn('Not provided "baseUrl" property in constructor. It needed to get images from server. Please, provide it something like this: new js360({ baseUrl: "...you_api..." })');
        }
    }

    _createClass(js360, [{
        key: 'render',
        value: function render() {
            var _this = this;

            var js360 = document.querySelectorAll('.js360');

            js360.forEach(function (elem) {
                var _elem$dataset = elem.dataset,
                    url = _elem$dataset.url,
                    retinaPrefix = _elem$dataset.retinaPrefix;
                var baseUrl = _this.props.baseUrl;


                elem.classList.add('js-360-container');
                _this.canvases[url] = new _Canvas.Canvas({ elem: elem, baseUrl: baseUrl, retinaPrefix: retinaPrefix });
            });
        }
    }]);

    return js360;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Canvas = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(3);

__webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = exports.Canvas = function () {
    function Canvas(_ref) {
        var elem = _ref.elem,
            baseUrl = _ref.baseUrl,
            retinaPrefix = _ref.retinaPrefix;

        _classCallCheck(this, Canvas);

        _initialiseProps.call(this);

        this.props = {
            baseUrl: baseUrl,
            retinaPrefix: window.devicePixelRatio === 2 ? retinaPrefix : '',
            container: elem,
            canvas: document.createElement('canvas'),
            url: elem.dataset.url,
            width: elem.clientWidth || 320,
            height: elem.clientHeight || 180,
            preview: elem.dataset.preview
        };

        this.index = 0;
        this.isMoved = false;
        this.delta = null;
        this.step = null;
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
            this.addListeners();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                container = _props2.container,
                canvas = _props2.canvas;

            container.append(canvas);
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

            var container = this.props.container;


            container.addEventListener('mousedown', function (_ref2) {
                var clientX = _ref2.clientX;

                _this.isMoved = true;
                _this.delta = _this.getX(clientX) - _this.index * _this.step;
            });
            container.addEventListener('touchstart', function (_ref3) {
                var changedTouches = _ref3.changedTouches;

                _this.isMoved = true;
                _this.delta = _this.getX(changedTouches[0].clientX) - _this.index * _this.step;
            });

            container.addEventListener('mouseup', function () {
                return _this.isMoved = null;
            });
            container.addEventListener('touchend', function () {
                return _this.isMoved = null;
            });
            container.addEventListener('mousemove', this.startCycle);
            container.addEventListener('touchmove', this.startCycle);
        }
    }, {
        key: 'addLoader',
        value: function addLoader() {
            var container = this.props.container;

            container.classList.add('is-pending');

            var loader = document.createElement('div');
            loader.classList.add('loader');
            container.append(loader);
        }
    }, {
        key: 'removeLoader',
        value: function removeLoader() {
            var container = this.props.container;

            container.classList.remove('is-pending');
            document.querySelector('.loader').remove();
        }
    }]);

    return Canvas;
}();

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.startCycle = function (event) {
        var _props4 = _this2.props,
            baseUrl = _props4.baseUrl,
            url = _props4.url,
            width = _props4.width,
            retinaPrefix = _props4.retinaPrefix;
        var length = _this2.images.length;


        if (url && !length) {
            var path = [baseUrl, retinaPrefix, url].filter(function (path) {
                return path;
            }).join('/');

            _this2.addLoader();
            (0, _utils.httpGet)(path).then(function (images) {
                _this2.step = Math.floor(width / images.length * 1000) / 1000;
                _this2.images = images;
                _this2.removeLoader();
            });
        }

        if (_this2.isMoved && length) {
            _this2.changeImage(event);
        }
    };

    this.getChangeImageFn = function (_ref4) {
        var container = _ref4.container,
            canvas = _ref4.canvas;

        var width = container.clientWidth || 320;
        var height = container.clientHeight || 180;
        var context = canvas.getContext('2d');

        return function (event) {
            var clientX = null;
            if (event.type === 'touchmove') {
                clientX = _this2.getX(event.changedTouches[0].clientX);
            } else {
                clientX = _this2.getX(event.clientX);
            }

            _this2.index = Math.round((clientX - _this2.delta) / _this2.step);

            if (_this2.index >= _this2.images.length) {
                _this2.index = 0;
                _this2.delta = clientX;
            }

            if (_this2.index <= -_this2.images.length) {
                _this2.index += _this2.images.length;
            }

            var img = document.createElement('img');
            img.src = _this2.images[_this2.index > 0 ? _this2.index : _this2.images.length + _this2.index];
            img.onload = function () {
                return context.drawImage(img, 0, 0, width, height);
            };
        };
    };
};

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});