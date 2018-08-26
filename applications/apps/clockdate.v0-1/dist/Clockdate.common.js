module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "0396");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0396":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /usr/lib/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
var setPublicPath = __webpack_require__("fbfd");

// CONCATENATED MODULE: /home/jean/Documents/EIP/reflectos/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"9cdd6cc0-vue-loader-template"}!/usr/lib/node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/jean/Documents/EIP/reflectos/node_modules/cache-loader/dist/cjs.js??ref--0-0!/home/jean/Documents/EIP/reflectos/node_modules/vue-loader/lib??vue-loader-options!./clockdate.v0-1.vue?vue&type=template&id=780f64ca&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"widget",attrs:{"data-posX":"1","data-posY":"6","data-x":"3","data-y":"2"}},[(_vm.analogMode)?_c('div',{staticClass:"clock",on:{"click":function($event){_vm.switchMode()}}},[_vm._m(0),_vm._m(1),_c('div',[_c('div',{staticClass:"clk-hourhand",style:(_vm.hourStyle)}),_c('div',{staticClass:"clk-minutehand",style:(_vm.minuteStyle)}),_c('div',{staticClass:"clk-secondhand",style:(_vm.secondStyle)})])]):_vm._e(),(!_vm.analogMode)?_c('div',{staticClass:"clock-numeric",on:{"click":function($event){_vm.switchMode()}}},[(_vm.hour > 9)?_c('span',{staticClass:"hour"},[_vm._v(_vm._s(_vm.hour + ' : '))]):_c('span',{staticClass:"hour"},[_vm._v(_vm._s('0' + _vm.hour + ' : '))]),(_vm.minute > 9)?_c('span',{staticClass:"minute"},[_vm._v(_vm._s(_vm.minute + ' : '))]):_c('span',{staticClass:"minute"},[_vm._v(_vm._s('0' + _vm.minute + ' : '))]),(_vm.second > 9)?_c('span',{staticClass:"second"},[_vm._v(_vm._s(_vm.second))]):_c('span',{staticClass:"second"},[_vm._v(_vm._s('0' + _vm.second))])]):_vm._e()]),_c('div',{staticClass:"widget",attrs:{"data-posX":"5","data-posY":"6","data-x":"3","data-y":"1"}},[_c('div',{staticClass:"date"},[_c('h2',[_vm._v(_vm._s(_vm.sDay)+", "+_vm._s(_vm.sMonth)+" "+_vm._s(_vm.number)),_c('sup',[_vm._v(_vm._s(_vm.nieme))])])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"clock-frame"},[_c('div',{staticClass:"clock-center"})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"digits"},[_c('li',[_c('a',[_vm._v("1")])]),_c('li',[_c('a',[_vm._v("2")])]),_c('li',[_c('a',[_vm._v("3")])]),_c('li',[_c('a',[_vm._v("4")])]),_c('li',[_c('a',[_vm._v("5")])]),_c('li',[_c('a',[_vm._v("6")])]),_c('li',[_c('a',[_vm._v("7")])]),_c('li',[_c('a',[_vm._v("8")])]),_c('li',[_c('a',[_vm._v("9")])]),_c('li',[_c('a',[_vm._v("10")])]),_c('li',[_c('a',[_vm._v("11")])]),_c('li',[_c('a',[_vm._v("12")])])])}]


// CONCATENATED MODULE: ./clockdate.v0-1.vue?vue&type=template&id=780f64ca&

// CONCATENATED MODULE: /home/jean/Documents/EIP/reflectos/node_modules/cache-loader/dist/cjs.js??ref--0-0!/home/jean/Documents/EIP/reflectos/node_modules/vue-loader/lib??vue-loader-options!./clockdate.v0-1.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var lib_vue_loader_options_clockdate_v0_1vue_type_script_lang_js_ = ({
  name: 'ClockDate',
  data () {
    return {
      hourStyle: {},
      minuteStyle: {},
      secondStyle: {},
      hour: 0,
      minute: 0,
      second: 0,
      analogMode: true,
      sDay: '',
      sMonth: '',
      number: 0,
      nieme: ''
    }
  },

  mounted () {
    setInterval(this.update, 1000)
  },
  methods: {
    switchMode () {
      this.analogMode = !this.analogMode
    },

    update () {
      let time = new Date(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds()

      this.hour = hour
      this.minute = minute
      this.second = second

      if (hour > 12) {
        hour -= 12
      }

      var hourStyle = {
          transform: 'rotate(' + (hour * 30 + (minute / 2) + 180) + 'deg)'
        },
        minuteStyle = {
          transform: 'rotate(' + (minute * 6 + 180) + 'deg)'
        },
        secondStyle = {
          transform: 'rotate(' + (second * 6 + 180) + 'deg)'
        }
      this.hourStyle = hourStyle
      this.minuteStyle = minuteStyle
      this.secondStyle = secondStyle

      var day = time.getDay()
      var number = time.getDate()
      var month = time.getMonth() + 1

      var sDay, sMonth, nieme = ''

      switch (day) {
        case 1:
          sDay = 'Monday'
          break
        case 2:
          sDay = 'Tuesday'
          break
        case 3:
          sDay = 'Wednesday'
          break
        case 4:
          sDay = 'Thursday'
          break
        case 5:
          sDay = 'Friday'
          break
        case 6:
          sDay = 'Saturday'
          break
        case 0:
          sDay = 'Sunday'
          break
      }

      switch (month) {
        case 1:
          sMonth = 'January'
          break
        case 2:
          sMonth = 'February'
          break
        case 3:
          sMonth = 'March'
          break
        case 4:
          sMonth = 'April'
          break
        case 5:
          sMonth = 'May'
          break
        case 6:
          sMonth = 'June'
          break
        case 7:
          sMonth = 'July'
          break
        case 8:
          sMonth = 'August'
          break
        case 9:
          sMonth = 'September'
          break
        case 10:
          sMonth = 'October'
          break
        case 11:
          sMonth = 'November'
          break
        case 12:
          sMonth = 'December'
          break
      }

      if (number === 1 || number === 21 || number === 31) {
        nieme = 'st'
      } else if (number === 2 || number === 22) {
        nieme = 'nd'
      } else if (number === 3 || number === 23) {
        nieme = 'rd'
      } else {
        nieme = 'th'
      }

      this.sDay = sDay
      this.sMonth = sMonth
      this.nieme = nieme
      this.number = number
    }
  }
});

// CONCATENATED MODULE: ./clockdate.v0-1.vue?vue&type=script&lang=js&
 /* harmony default export */ var clockdate_v0_1vue_type_script_lang_js_ = (lib_vue_loader_options_clockdate_v0_1vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./clockdate.v0-1.vue?vue&type=style&index=0&lang=css&
var clockdate_v0_1vue_type_style_index_0_lang_css_ = __webpack_require__("64e2");

// CONCATENATED MODULE: /home/jean/Documents/EIP/reflectos/node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./clockdate.v0-1.vue






/* normalize component */

var component = normalizeComponent(
  clockdate_v0_1vue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "clockdate.v0-1.vue"
/* harmony default export */ var clockdate_v0_1 = (component.exports);
// CONCATENATED MODULE: /usr/lib/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (clockdate_v0_1);



/***/ }),

/***/ "0bd0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "64e2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _usr_lib_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_usr_lib_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clockdate_v0_1_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0bd0");
/* harmony import */ var _usr_lib_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_usr_lib_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clockdate_v0_1_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_usr_lib_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_usr_lib_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clockdate_v0_1_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_usr_lib_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_usr_lib_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clockdate_v0_1_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "fbfd":
/***/ (function(module, exports, __webpack_require__) {

// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}


/***/ })

/******/ })["default"];
//# sourceMappingURL=Clockdate.common.js.map