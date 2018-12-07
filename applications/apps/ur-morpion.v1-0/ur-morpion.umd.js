(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ur-morpion"] = factory();
	else
		root["ur-morpion"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "8fc3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "3d3f":
/***/ (function(module, exports, __webpack_require__) {

// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}


/***/ }),

/***/ "8fc3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /Users/albanbin/.config/yarn/global/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
var setPublicPath = __webpack_require__("3d3f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0595ba96-vue-loader-template"}!/Users/albanbin/.config/yarn/global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Morpion.vue?vue&type=template&id=710b4b98&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.curVue == 'Menu')?_c('div',{staticClass:"ur-morpion-menu"},[_c('h1',{staticClass:"ur-mp-menu-title"},[_vm._v("Morpion")]),_c('div',{staticClass:"ur-mp-menu-bt-container"},[_c('button',{staticClass:"ur-mp-menu-button ur-mp-1vs1",attrs:{"type":"button"},on:{"click":function($event){_vm.launch_game('1vs1')}}},[_vm._v("1 VS 1")]),_c('button',{staticClass:"ur-mp-menu-button ur-mp-1vsai",attrs:{"type":"button"},on:{"click":function($event){_vm.launch_game('1vsai')}}},[_vm._v("1 VS AI")])])]):(_vm.curVue == 'Morpion')?_c('div',{staticClass:"ur-morpion-game"},[_c('div',{staticClass:"ur-mp-info-bar"},[_c('button',{staticClass:"ur-mp-back-but",attrs:{"type":"button"},on:{"click":function($event){_vm.curVue = 'Menu'}}},[_vm._v("Back")]),_c('div',{staticClass:"ur-mp-stats"},[_c('p',{staticClass:"title-player"},[_vm._v("Player 1")]),_c('p',{staticClass:"score-player score-p1"},[_vm._v(_vm._s(_vm.score[0]))]),_c('p',{staticClass:"score-separator"},[_vm._v("-")]),_c('p',{staticClass:"score-player score-p2"},[_vm._v(_vm._s(_vm.score[1]))]),_c('p',{staticClass:"title-player"},[_vm._v("Player 2")])])]),_c('div',{staticClass:"ur-mp-morpion"},[_c('div',{staticClass:"ur-mp-circle ur-mp-cross",staticStyle:{"display":"none"}}),_c('table',[_c('tbody',[_c('tr',[_c('td',{staticClass:"carre zonea1",on:{"click":function($event){_vm.play('zonea1')}}},[_c('div',{staticClass:"ur-mp-circle invisible"}),_c('div',{staticClass:"ur-mp-cross invisible"})]),_c('td',{staticClass:"carre zonea2",on:{"click":function($event){_vm.play('zonea2')}}},[_c('div',{staticClass:"ur-mp-circle invisible"}),_c('div',{staticClass:"ur-mp-cross invisible"})]),_c('td',{staticClass:"carre zonea3",on:{"click":function($event){_vm.play('zonea3')}}},[_c('div',{staticClass:"ur-mp-circle invisible"}),_c('div',{staticClass:"ur-mp-cross invisible"})])]),_c('tr',[_c('td',{staticClass:"carre zoneb1",on:{"click":function($event){_vm.play('zoneb1')}}},[_c('div',{staticClass:"ur-mp-circle invisible"}),_c('div',{staticClass:"ur-mp-cross invisible"})]),_c('td',{staticClass:"carre zoneb2",on:{"click":function($event){_vm.play('zoneb2')}}},[_c('div',{staticClass:"ur-mp-circle invisible"}),_c('div',{staticClass:"ur-mp-cross invisible"})]),_c('td',{staticClass:"carre zoneb3",on:{"click":function($event){_vm.play('zoneb3')}}},[_c('div',{staticClass:"ur-mp-circle invisible"}),_c('div',{staticClass:"ur-mp-cross invisible"})])]),_c('tr',[_c('td',{staticClass:"carre zonec1",on:{"click":function($event){_vm.play('zonec1')}}},[_c('div',{staticClass:"ur-mp-circle invisible"}),_c('div',{staticClass:"ur-mp-cross invisible"})]),_c('td',{staticClass:"carre zonec2",on:{"click":function($event){_vm.play('zonec2')}}},[_c('div',{staticClass:"ur-mp-circle invisible"}),_c('div',{staticClass:"ur-mp-cross invisible"})]),_c('td',{staticClass:"carre zonec3",on:{"click":function($event){_vm.play('zonec3')}}},[_c('div',{staticClass:"ur-mp-circle invisible"}),_c('div',{staticClass:"ur-mp-cross invisible"})])])])])])]):(_vm.curVue == 'Replay')?_c('div',{staticClass:"ur-morpion-replay"},[_c('h1',{staticClass:"ur-mp-replay-title"},[_vm._v(_vm._s(_vm.winner))]),_c('div',{staticClass:"ur-mp-stats"},[_c('p',{staticClass:"title-player"},[_vm._v("Player 1")]),_c('p',{staticClass:"score-player score-p1"},[_vm._v(_vm._s(_vm.score[0]))]),_c('p',{staticClass:"score-separator"},[_vm._v("-")]),_c('p',{staticClass:"score-player score-p2"},[_vm._v(_vm._s(_vm.score[1]))]),_c('p',{staticClass:"title-player"},[_vm._v("Player 2")])]),_c('div',{staticClass:"ur-mp-menu-bt-container"},[_c('button',{staticClass:"ur-mp-menu-button ur-mp-menu",attrs:{"type":"button"},on:{"click":function($event){_vm.curVue = 'Menu'}}},[_vm._v("Menu")]),_c('button',{staticClass:"ur-mp-menu-button ur-mp-replay",attrs:{"type":"button"},on:{"click":function($event){_vm.curVue = 'Morpion'}}},[_vm._v("Replay")])])]):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Morpion.vue?vue&type=template&id=710b4b98&scoped=true&

// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Morpion.vue?vue&type=script&lang=js&
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
/* harmony default export */ var Morpionvue_type_script_lang_js_ = ({
  name: 'Morpion',
  data: function data() {
    return {
      type: [],
      curVue: 'Menu',
      players: [],
      curPlayer: 1,
      winner: '',
      score: [0, 0],
      vsai: false
    };
  },
  methods: {
    launch_game: function launch_game(type) {
      this.curVue = 'Morpion';
      if (type === '1vs1') this.init1vs1();else this.init1vsai();
    },
    init1vs1: function init1vs1() {
      this.score = [0, 0];
      this.vsai = false;
      this.curPlayer = 1;
    },
    init1vsai: function init1vsai() {
      this.score = [0, 0];
      this.vsai = true;
      this.curPlayer = 1;
    },
    initReplay: function initReplay() {
      this.curVue = 'Replay';
      this.curPlayer = 1;
    },
    play: function play(zone) {
      var el = document.getElementsByClassName(zone);
      el = el.length === 1 ? el[0] : null;

      if (el !== null && !el.classList.contains('played1') && !el.classList.contains('played2')) {
        if (this.curPlayer === 1) {
          el.classList.add('played1');
          el.classList.add('played');
          var circleEl = el.getElementsByClassName('ur-mp-circle')[0];
          circleEl.classList.remove('invisible'); // el.style.backgroundImage = 'url(../assets/image-morpion/circle-w.png)'

          this.curPlayer = 2;
        } else if (this.curPlayer === 2) {
          el.classList.add('played2');
          el.classList.add('played');
          var crossEl = el.getElementsByClassName('ur-mp-cross')[0];
          crossEl.classList.remove('invisible'); // el.style.backgroundImage = 'url(../assets/image-morpion/cross-w.png)'

          this.curPlayer = 1;
        }

        if (!this.checkEnd()) {
          if (this.vsai && this.curPlayer === 2) this.aiplay();
        }
      }
    },
    aiplay: function aiplay() {
      var zones = [[document.getElementsByClassName('zonea1')[0], document.getElementsByClassName('zonea2')[0], document.getElementsByClassName('zonea3')[0]], [document.getElementsByClassName('zoneb1')[0], document.getElementsByClassName('zoneb2')[0], document.getElementsByClassName('zoneb3')[0]], [document.getElementsByClassName('zonec1')[0], document.getElementsByClassName('zonec2')[0], document.getElementsByClassName('zonec3')[0]]];
      var zonesClass = [['zonea1', 'zonea2', 'zonea3'], ['zoneb1', 'zoneb2', 'zoneb3'], ['zonec1', 'zonec2', 'zonec3']];
      var check = false;
      var x = 0;
      var y = 0;

      while (!check) {
        x = Math.floor(Math.random() * Math.floor(3));
        y = Math.floor(Math.random() * Math.floor(3));
        if (!zones[y][x].classList.contains('played')) check = true;
      }

      this.play(zonesClass[y][x]);
    },
    checkEnd: function checkEnd() {
      var zonea1 = document.getElementsByClassName('zonea1')[0];
      var zonea2 = document.getElementsByClassName('zonea2')[0];
      var zonea3 = document.getElementsByClassName('zonea3')[0];
      var zoneb1 = document.getElementsByClassName('zoneb1')[0];
      var zoneb2 = document.getElementsByClassName('zoneb2')[0];
      var zoneb3 = document.getElementsByClassName('zoneb3')[0];
      var zonec1 = document.getElementsByClassName('zonec1')[0];
      var zonec2 = document.getElementsByClassName('zonec2')[0];
      var zonec3 = document.getElementsByClassName('zonec3')[0];

      if (zonea1.classList.contains('played1') && zonea2.classList.contains('played1') && zonea3.classList.contains('played1') || zoneb1.classList.contains('played1') && zoneb2.classList.contains('played1') && zoneb3.classList.contains('played1') || zonec1.classList.contains('played1') && zonec2.classList.contains('played1') && zonec3.classList.contains('played1') || zonea1.classList.contains('played1') && zoneb1.classList.contains('played1') && zonec1.classList.contains('played1') || zonea2.classList.contains('played1') && zoneb2.classList.contains('played1') && zonec2.classList.contains('played1') || zonea3.classList.contains('played1') && zoneb3.classList.contains('played1') && zonec3.classList.contains('played1') || zonea1.classList.contains('played1') && zoneb2.classList.contains('played1') && zonec3.classList.contains('played1') || zonea3.classList.contains('played1') && zoneb2.classList.contains('played1') && zonec1.classList.contains('played1')) {
        this.winner = 'Player 1 wins !';
        this.score[0]++;
        this.initReplay();
        return true;
      } else if (zonea1.classList.contains('played2') && zonea2.classList.contains('played2') && zonea3.classList.contains('played2') || zoneb1.classList.contains('played2') && zoneb2.classList.contains('played2') && zoneb3.classList.contains('played2') || zonec1.classList.contains('played2') && zonec2.classList.contains('played2') && zonec3.classList.contains('played2') || zonea1.classList.contains('played2') && zoneb1.classList.contains('played2') && zonec1.classList.contains('played2') || zonea2.classList.contains('played2') && zoneb2.classList.contains('played2') && zonec2.classList.contains('played2') || zonea3.classList.contains('played2') && zoneb3.classList.contains('played2') && zonec3.classList.contains('played2') || zonea1.classList.contains('played2') && zoneb2.classList.contains('played2') && zonec3.classList.contains('played2') || zonea3.classList.contains('played2') && zoneb2.classList.contains('played2') && zonec1.classList.contains('played2')) {
        this.winner = 'Player 2 wins !';
        this.score[1]++;
        this.initReplay();
        return true;
      } else if (zonea1.classList.contains('played') && zonea2.classList.contains('played') && zonea3.classList.contains('played') && zoneb1.classList.contains('played') && zoneb2.classList.contains('played') && zoneb3.classList.contains('played') && zonec1.classList.contains('played') && zonec2.classList.contains('played') && zonec3.classList.contains('played')) {
        this.winner = 'Draw !';
        this.initReplay();
        return true;
      }

      return false;
    }
  }
});
// CONCATENATED MODULE: ./src/components/Morpion.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Morpionvue_type_script_lang_js_ = (Morpionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Morpion.vue?vue&type=style&index=0&id=710b4b98&scoped=true&lang=css&
var Morpionvue_type_style_index_0_id_710b4b98_scoped_true_lang_css_ = __webpack_require__("f834");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
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

// CONCATENATED MODULE: ./src/components/Morpion.vue






/* normalize component */

var component = normalizeComponent(
  components_Morpionvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "710b4b98",
  null
  
)

component.options.__file = "Morpion.vue"
/* harmony default export */ var Morpion = (component.exports);
// CONCATENATED MODULE: /Users/albanbin/.config/yarn/global/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (Morpion);



/***/ }),

/***/ "dc65":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f834":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _config_yarn_global_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_config_yarn_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Morpion_vue_vue_type_style_index_0_id_710b4b98_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("dc65");
/* harmony import */ var _config_yarn_global_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_config_yarn_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Morpion_vue_vue_type_style_index_0_id_710b4b98_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config_yarn_global_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_config_yarn_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Morpion_vue_vue_type_style_index_0_id_710b4b98_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_config_yarn_global_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_config_yarn_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Morpion_vue_vue_type_style_index_0_id_710b4b98_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=ur-morpion.umd.js.map