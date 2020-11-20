var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/my-command.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/my-command.js":
/*!***************************!*\
  !*** ./src/my-command.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch/ui */ "sketch/ui");
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_ui__WEBPACK_IMPORTED_MODULE_1__);

 // documentation: https://developer.sketchapp.com/reference/api/

/* harmony default export */ __webpack_exports__["default"] = (function () {
  // console.log('This is an example Sketch script.')
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var pages = document.pages;
  var desingTokensPages = pages.filter(function (page) {
    return page.selected === true;
  });
  var desingTokensPage = desingTokensPages[0];

  if (!desingTokensPage) {
    sketch_ui__WEBPACK_IMPORTED_MODULE_1___default.a.alert("请选择目标页面", "未选中页面");
    return;
  }

  var selectPage = desingTokensPage;
  var artboards = selectPage.layers.filter(function (layer) {
    return layer.selected === true;
  });

  if (artboards.length == 0) {
    sketch_ui__WEBPACK_IMPORTED_MODULE_1___default.a.alert("请选中画板", "未选中画板");
    return;
  }

  var dataSource = [];
  var jsonKey = 'jsonKey';
  var layerKey = 'layerKey';
  var nameKey = 'nameKey';

  for (var index in artboards) {
    var artboard = artboards[index];
    var jsonContent = {
      "canvas_w": artboard.frame.width,
      "canvas_h": artboard.frame.height,
      "bg_color": artboard.background.color
    };
    var poster_shapes = [];
    var poster_image = [];
    var poster_text = [];
    var poster_other = [];
    var export_layers = [];
    artboard.layers.forEach(function (layer, i) {
      var item = {
        "frame": layer.frame,
        "name": layer.name,
        "level": i,
        "type_name": layer.type,
        "locked": layer.locked,
        "transform_rotation": layer.transform.rotation
      };

      if (layer.type == 'Text') {
        item["style"] = layer.style;
        item["layer_type"] = 1;
        poster_text.push(item);
      } else if (layer.type == 'Image' || layer.type == 'Group') {
        item["layer_type"] = 2;
        item["type_name"] = 'Image';
        poster_image.push(item);
      } else if (layer.type == 'ShapePath') {
        item["svg"] = layer.getSVGPath();
        item["layer_type"] = 3;
        poster_shapes.push(item);
      } else {
        item["layer_type"] = 4;
        poster_other.push(item);
      }

      export_layers.push(layer);
    });
    jsonContent["layer_shapes"] = poster_shapes;
    jsonContent["layer_images"] = poster_image;
    jsonContent["layer_texts"] = poster_text;
    jsonContent["layer_other"] = poster_other;
    var jsonStr = JSON.stringify(jsonContent);
    var itemData = {
      jsonKey: jsonStr,
      layerKey: export_layers,
      nameKey: artboard.name
    };
    dataSource.push(itemData);
  }

  var open = NSOpenPanel.openPanel();
  open.canChooseFiles = false;
  open.canChooseDirectories = true;
  open.canCreateDirectories = true;

  if (open.runModal()) {
    var path = open.URL().path();
    var fileManager = NSFileManager.defaultManager();

    for (var _index in dataSource) {
      var _itemData = dataSource[_index];
      var _jsonStr = _itemData[jsonKey];
      var layerArr = _itemData[layerKey];
      var name = _itemData[nameKey];
      var dirPath = path + "/" + name;
      var b = fileManager.fileExistsAtPath_isDirectory(dirPath, null);

      if (!b) {
        fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(dirPath, true, null, null);
      }

      var configPath = dirPath + '/config.json';
      var file = NSString.stringWithString(_jsonStr);
      file.writeToFile_atomically_encoding_error(configPath, true, NSUTF8StringEncoding, null);
      var imagePath = dirPath;
      var exportOptions = {
        formats: 'png',
        scales: '2x',
        output: imagePath,
        overwriting: true,
        trimmed: false
      };

      for (var _index2 in layerArr) {
        var export_item = layerArr[_index2];

        if (export_item.name != 'cut_position') {
          if (export_item.type == 'Image') {
            var _path = imagePath + '/' + export_item.name + '.png';

            var imageData = export_item.image.nsdata;
            imageData.writeToFile_atomically(_path, true);
          } else {
            export_item.name = export_item.name;
            sketch__WEBPACK_IMPORTED_MODULE_0___default.a.export(export_item, exportOptions);
          }
        }
      }
    }

    sketch_ui__WEBPACK_IMPORTED_MODULE_1___default.a.alert("保存成功", path);
  } // console.log(JSON.stringify(jsonContent))
  // sketch.UI.message(JSON.stringify(jsonStr))

});

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__my-command.js.map