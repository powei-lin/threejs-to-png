/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


/***/ }),

/***/ "./scene/js/scene.js":
/*!***************************!*\
  !*** ./scene/js/scene.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer.js */ \"./node_modules/three/examples/jsm/postprocessing/EffectComposer.js\");\n\n\n\nlet camera, scene, renderer;\nlet mesh;\nconst AMOUNT = 4;\nlet total_frame = 50;\n\ndocument.addEventListener('DOMContentLoaded', async function () {\n  const fromServer = await fetch('http://localhost:3000/frame', {method:'GET'})\n  .then(function(response) {\n    return response.json()\n  })\n  .then(function(responseJson) {\n    return responseJson.frame\n  })\n\n  total_frame = fromServer;\n\n  init();\n  animate();\n});\n\n\nfunction init() {\n\n  const ASPECT_RATIO = window.innerWidth / window.innerHeight;\n\n  const WIDTH = ( window.innerWidth / AMOUNT ) * window.devicePixelRatio;\n  const HEIGHT = ( window.innerHeight / AMOUNT ) * window.devicePixelRatio;\n\n  const cameras = [];\n\n  for ( let y = 0; y < AMOUNT; y ++ ) {\n\n    for ( let x = 0; x < AMOUNT; x ++ ) {\n\n      const subcamera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera( 40, ASPECT_RATIO, 0.1, 10 );\n      subcamera.viewport = new three__WEBPACK_IMPORTED_MODULE_1__.Vector4( Math.floor( x * WIDTH ), Math.floor( y * HEIGHT ), Math.ceil( WIDTH ), Math.ceil( HEIGHT ) );\n      subcamera.position.x = ( x / AMOUNT ) - 0.5;\n      subcamera.position.y = 0.5 - ( y / AMOUNT );\n      subcamera.position.z = 1.5;\n      subcamera.position.multiplyScalar( 2 );\n      subcamera.lookAt( 0, 0, 0 );\n      subcamera.updateMatrixWorld();\n      cameras.push( subcamera );\n\n    }\n\n  }\n\n  camera = new three__WEBPACK_IMPORTED_MODULE_1__.ArrayCamera( cameras );\n  camera.position.z = 3;\n\n  scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();\n\n  scene.add( new three__WEBPACK_IMPORTED_MODULE_1__.AmbientLight( 0x222244 ) );\n\n  const light = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight();\n  light.position.set( 0.5, 0.5, 1 );\n  light.castShadow = true;\n  light.shadow.camera.zoom = 4; // tighter shadow map\n  scene.add( light );\n\n  const geometryBackground = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry( 100, 100 );\n  const materialBackground = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial( { color: 0x000066 } );\n\n  const background = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh( geometryBackground, materialBackground );\n  background.receiveShadow = true;\n  background.position.set( 0, 0, - 1 );\n  scene.add( background );\n\n  const geometryCylinder = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry( 0.5, 0.5, 1, 32 );\n  const materialCylinder = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial( { color: 0xff0000 } );\n\n  mesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh( geometryCylinder, materialCylinder );\n  mesh.castShadow = true;\n  mesh.receiveShadow = true;\n  scene.add( mesh );\n\n  renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();\n  renderer.setPixelRatio( window.devicePixelRatio );\n  renderer.setSize( window.innerWidth, window.innerHeight );\n  renderer.shadowMap.enabled = true;\n  document.body.appendChild( renderer.domElement );\n\n  //\n\n  window.addEventListener( 'resize', onWindowResize );\n\n}\n\nfunction onWindowResize() {\n\n  const ASPECT_RATIO = window.innerWidth / window.innerHeight;\n  const WIDTH = ( window.innerWidth / AMOUNT ) * window.devicePixelRatio;\n  const HEIGHT = ( window.innerHeight / AMOUNT ) * window.devicePixelRatio;\n\n  camera.aspect = ASPECT_RATIO;\n  camera.updateProjectionMatrix();\n\n  for ( let y = 0; y < AMOUNT; y ++ ) {\n\n    for ( let x = 0; x < AMOUNT; x ++ ) {\n\n      const subcamera = camera.cameras[ AMOUNT * y + x ];\n\n      subcamera.viewport.set(\n        Math.floor( x * WIDTH ),\n        Math.floor( y * HEIGHT ),\n        Math.ceil( WIDTH ),\n        Math.ceil( HEIGHT ) );\n\n      subcamera.aspect = ASPECT_RATIO;\n      subcamera.updateProjectionMatrix();\n\n    }\n\n  }\n\n  renderer.setSize( window.innerWidth, window.innerHeight );\n\n}\n\nvar count = 0;\n\nasync function animate() {\n\n  mesh.rotation.x += 0.005;\n  mesh.rotation.z += 0.01;\n\n  await renderer.render( scene, camera );\n  if(count < total_frame){\n    saveFrame();\n    count += 1;\n  }\n  else{\n    console.log(\"DONE\");\n  }\n\n  requestAnimationFrame( animate );\n\n}\n\nasync function saveFrame() {\n  const img = renderer.domElement.toDataURL()\n\n  const body = JSON.stringify({ img, frame: count })\n  console.log(\"save\");\n  await fetch('http://localhost:3000', {\n    body,\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    }\n  }).catch(err => {})\n}\n\n//# sourceURL=webpack://node_headless/./scene/js/scene.js?");

/***/ }),

/***/ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js":
/*!**************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/EffectComposer.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EffectComposer\": () => (/* binding */ EffectComposer),\n/* harmony export */   \"Pass\": () => (/* binding */ Pass),\n/* harmony export */   \"FullScreenQuad\": () => (/* binding */ FullScreenQuad)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaders/CopyShader.js */ \"./node_modules/three/examples/jsm/shaders/CopyShader.js\");\n/* harmony import */ var _postprocessing_ShaderPass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../postprocessing/ShaderPass.js */ \"./node_modules/three/examples/jsm/postprocessing/ShaderPass.js\");\n/* harmony import */ var _postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../postprocessing/MaskPass.js */ \"./node_modules/three/examples/jsm/postprocessing/MaskPass.js\");\n\n\n\n\n\n\nclass EffectComposer {\n\n\tconstructor( renderer, renderTarget ) {\n\n\t\tthis.renderer = renderer;\n\n\t\tif ( renderTarget === undefined ) {\n\n\t\t\tconst parameters = {\n\t\t\t\tminFilter: three__WEBPACK_IMPORTED_MODULE_3__.LinearFilter,\n\t\t\t\tmagFilter: three__WEBPACK_IMPORTED_MODULE_3__.LinearFilter,\n\t\t\t\tformat: three__WEBPACK_IMPORTED_MODULE_3__.RGBAFormat\n\t\t\t};\n\n\t\t\tconst size = renderer.getSize( new three__WEBPACK_IMPORTED_MODULE_3__.Vector2() );\n\t\t\tthis._pixelRatio = renderer.getPixelRatio();\n\t\t\tthis._width = size.width;\n\t\t\tthis._height = size.height;\n\n\t\t\trenderTarget = new three__WEBPACK_IMPORTED_MODULE_3__.WebGLRenderTarget( this._width * this._pixelRatio, this._height * this._pixelRatio, parameters );\n\t\t\trenderTarget.texture.name = 'EffectComposer.rt1';\n\n\t\t} else {\n\n\t\t\tthis._pixelRatio = 1;\n\t\t\tthis._width = renderTarget.width;\n\t\t\tthis._height = renderTarget.height;\n\n\t\t}\n\n\t\tthis.renderTarget1 = renderTarget;\n\t\tthis.renderTarget2 = renderTarget.clone();\n\t\tthis.renderTarget2.texture.name = 'EffectComposer.rt2';\n\n\t\tthis.writeBuffer = this.renderTarget1;\n\t\tthis.readBuffer = this.renderTarget2;\n\n\t\tthis.renderToScreen = true;\n\n\t\tthis.passes = [];\n\n\t\t// dependencies\n\n\t\tif ( _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_0__.CopyShader === undefined ) {\n\n\t\t\tconsole.error( 'THREE.EffectComposer relies on CopyShader' );\n\n\t\t}\n\n\t\tif ( _postprocessing_ShaderPass_js__WEBPACK_IMPORTED_MODULE_1__.ShaderPass === undefined ) {\n\n\t\t\tconsole.error( 'THREE.EffectComposer relies on ShaderPass' );\n\n\t\t}\n\n\t\tthis.copyPass = new _postprocessing_ShaderPass_js__WEBPACK_IMPORTED_MODULE_1__.ShaderPass( _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_0__.CopyShader );\n\n\t\tthis.clock = new three__WEBPACK_IMPORTED_MODULE_3__.Clock();\n\n\t}\n\n\tswapBuffers() {\n\n\t\tconst tmp = this.readBuffer;\n\t\tthis.readBuffer = this.writeBuffer;\n\t\tthis.writeBuffer = tmp;\n\n\t}\n\n\taddPass( pass ) {\n\n\t\tthis.passes.push( pass );\n\t\tpass.setSize( this._width * this._pixelRatio, this._height * this._pixelRatio );\n\n\t}\n\n\tinsertPass( pass, index ) {\n\n\t\tthis.passes.splice( index, 0, pass );\n\t\tpass.setSize( this._width * this._pixelRatio, this._height * this._pixelRatio );\n\n\t}\n\n\tremovePass( pass ) {\n\n\t\tconst index = this.passes.indexOf( pass );\n\n\t\tif ( index !== - 1 ) {\n\n\t\t\tthis.passes.splice( index, 1 );\n\n\t\t}\n\n\t}\n\n\tisLastEnabledPass( passIndex ) {\n\n\t\tfor ( let i = passIndex + 1; i < this.passes.length; i ++ ) {\n\n\t\t\tif ( this.passes[ i ].enabled ) {\n\n\t\t\t\treturn false;\n\n\t\t\t}\n\n\t\t}\n\n\t\treturn true;\n\n\t}\n\n\trender( deltaTime ) {\n\n\t\t// deltaTime value is in seconds\n\n\t\tif ( deltaTime === undefined ) {\n\n\t\t\tdeltaTime = this.clock.getDelta();\n\n\t\t}\n\n\t\tconst currentRenderTarget = this.renderer.getRenderTarget();\n\n\t\tlet maskActive = false;\n\n\t\tfor ( let i = 0, il = this.passes.length; i < il; i ++ ) {\n\n\t\t\tconst pass = this.passes[ i ];\n\n\t\t\tif ( pass.enabled === false ) continue;\n\n\t\t\tpass.renderToScreen = ( this.renderToScreen && this.isLastEnabledPass( i ) );\n\t\t\tpass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive );\n\n\t\t\tif ( pass.needsSwap ) {\n\n\t\t\t\tif ( maskActive ) {\n\n\t\t\t\t\tconst context = this.renderer.getContext();\n\t\t\t\t\tconst stencil = this.renderer.state.buffers.stencil;\n\n\t\t\t\t\t//context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );\n\t\t\t\t\tstencil.setFunc( context.NOTEQUAL, 1, 0xffffffff );\n\n\t\t\t\t\tthis.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime );\n\n\t\t\t\t\t//context.stencilFunc( context.EQUAL, 1, 0xffffffff );\n\t\t\t\t\tstencil.setFunc( context.EQUAL, 1, 0xffffffff );\n\n\t\t\t\t}\n\n\t\t\t\tthis.swapBuffers();\n\n\t\t\t}\n\n\t\t\tif ( _postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_2__.MaskPass !== undefined ) {\n\n\t\t\t\tif ( pass instanceof _postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_2__.MaskPass ) {\n\n\t\t\t\t\tmaskActive = true;\n\n\t\t\t\t} else if ( pass instanceof _postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_2__.ClearMaskPass ) {\n\n\t\t\t\t\tmaskActive = false;\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t\tthis.renderer.setRenderTarget( currentRenderTarget );\n\n\t}\n\n\treset( renderTarget ) {\n\n\t\tif ( renderTarget === undefined ) {\n\n\t\t\tconst size = this.renderer.getSize( new three__WEBPACK_IMPORTED_MODULE_3__.Vector2() );\n\t\t\tthis._pixelRatio = this.renderer.getPixelRatio();\n\t\t\tthis._width = size.width;\n\t\t\tthis._height = size.height;\n\n\t\t\trenderTarget = this.renderTarget1.clone();\n\t\t\trenderTarget.setSize( this._width * this._pixelRatio, this._height * this._pixelRatio );\n\n\t\t}\n\n\t\tthis.renderTarget1.dispose();\n\t\tthis.renderTarget2.dispose();\n\t\tthis.renderTarget1 = renderTarget;\n\t\tthis.renderTarget2 = renderTarget.clone();\n\n\t\tthis.writeBuffer = this.renderTarget1;\n\t\tthis.readBuffer = this.renderTarget2;\n\n\t}\n\n\tsetSize( width, height ) {\n\n\t\tthis._width = width;\n\t\tthis._height = height;\n\n\t\tconst effectiveWidth = this._width * this._pixelRatio;\n\t\tconst effectiveHeight = this._height * this._pixelRatio;\n\n\t\tthis.renderTarget1.setSize( effectiveWidth, effectiveHeight );\n\t\tthis.renderTarget2.setSize( effectiveWidth, effectiveHeight );\n\n\t\tfor ( let i = 0; i < this.passes.length; i ++ ) {\n\n\t\t\tthis.passes[ i ].setSize( effectiveWidth, effectiveHeight );\n\n\t\t}\n\n\t}\n\n\tsetPixelRatio( pixelRatio ) {\n\n\t\tthis._pixelRatio = pixelRatio;\n\n\t\tthis.setSize( this._width, this._height );\n\n\t}\n\n}\n\n\nclass Pass {\n\n\tconstructor() {\n\n\t\t// if set to true, the pass is processed by the composer\n\t\tthis.enabled = true;\n\n\t\t// if set to true, the pass indicates to swap read and write buffer after rendering\n\t\tthis.needsSwap = true;\n\n\t\t// if set to true, the pass clears its buffer before rendering\n\t\tthis.clear = false;\n\n\t\t// if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.\n\t\tthis.renderToScreen = false;\n\n\t}\n\n\tsetSize( /* width, height */ ) {}\n\n\trender( /* renderer, writeBuffer, readBuffer, deltaTime, maskActive */ ) {\n\n\t\tconsole.error( 'THREE.Pass: .render() must be implemented in derived pass.' );\n\n\t}\n\n}\n\n// Helper for passes that need to fill the viewport with a single quad.\n\nconst _camera = new three__WEBPACK_IMPORTED_MODULE_3__.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );\n\n// https://github.com/mrdoob/three.js/pull/21358\n\nconst _geometry = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();\n_geometry.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_3__.Float32BufferAttribute( [ - 1, 3, 0, - 1, - 1, 0, 3, - 1, 0 ], 3 ) );\n_geometry.setAttribute( 'uv', new three__WEBPACK_IMPORTED_MODULE_3__.Float32BufferAttribute( [ 0, 2, 0, 0, 2, 0 ], 2 ) );\n\nclass FullScreenQuad {\n\n\tconstructor( material ) {\n\n\t\tthis._mesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh( _geometry, material );\n\n\t}\n\n\tdispose() {\n\n\t\tthis._mesh.geometry.dispose();\n\n\t}\n\n\trender( renderer ) {\n\n\t\trenderer.render( this._mesh, _camera );\n\n\t}\n\n\tget material() {\n\n\t\treturn this._mesh.material;\n\n\t}\n\n\tset material( value ) {\n\n\t\tthis._mesh.material = value;\n\n\t}\n\n}\n\n\n\n\n//# sourceURL=webpack://node_headless/./node_modules/three/examples/jsm/postprocessing/EffectComposer.js?");

/***/ }),

/***/ "./node_modules/three/examples/jsm/postprocessing/MaskPass.js":
/*!********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/MaskPass.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MaskPass\": () => (/* binding */ MaskPass),\n/* harmony export */   \"ClearMaskPass\": () => (/* binding */ ClearMaskPass)\n/* harmony export */ });\n/* harmony import */ var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../postprocessing/Pass.js */ \"./node_modules/three/examples/jsm/postprocessing/Pass.js\");\n\n\nclass MaskPass extends _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.Pass {\n\n\tconstructor( scene, camera ) {\n\n\t\tsuper();\n\n\t\tthis.scene = scene;\n\t\tthis.camera = camera;\n\n\t\tthis.clear = true;\n\t\tthis.needsSwap = false;\n\n\t\tthis.inverse = false;\n\n\t}\n\n\trender( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {\n\n\t\tconst context = renderer.getContext();\n\t\tconst state = renderer.state;\n\n\t\t// don't update color or depth\n\n\t\tstate.buffers.color.setMask( false );\n\t\tstate.buffers.depth.setMask( false );\n\n\t\t// lock buffers\n\n\t\tstate.buffers.color.setLocked( true );\n\t\tstate.buffers.depth.setLocked( true );\n\n\t\t// set up stencil\n\n\t\tlet writeValue, clearValue;\n\n\t\tif ( this.inverse ) {\n\n\t\t\twriteValue = 0;\n\t\t\tclearValue = 1;\n\n\t\t} else {\n\n\t\t\twriteValue = 1;\n\t\t\tclearValue = 0;\n\n\t\t}\n\n\t\tstate.buffers.stencil.setTest( true );\n\t\tstate.buffers.stencil.setOp( context.REPLACE, context.REPLACE, context.REPLACE );\n\t\tstate.buffers.stencil.setFunc( context.ALWAYS, writeValue, 0xffffffff );\n\t\tstate.buffers.stencil.setClear( clearValue );\n\t\tstate.buffers.stencil.setLocked( true );\n\n\t\t// draw into the stencil buffer\n\n\t\trenderer.setRenderTarget( readBuffer );\n\t\tif ( this.clear ) renderer.clear();\n\t\trenderer.render( this.scene, this.camera );\n\n\t\trenderer.setRenderTarget( writeBuffer );\n\t\tif ( this.clear ) renderer.clear();\n\t\trenderer.render( this.scene, this.camera );\n\n\t\t// unlock color and depth buffer for subsequent rendering\n\n\t\tstate.buffers.color.setLocked( false );\n\t\tstate.buffers.depth.setLocked( false );\n\n\t\t// only render where stencil is set to 1\n\n\t\tstate.buffers.stencil.setLocked( false );\n\t\tstate.buffers.stencil.setFunc( context.EQUAL, 1, 0xffffffff ); // draw if == 1\n\t\tstate.buffers.stencil.setOp( context.KEEP, context.KEEP, context.KEEP );\n\t\tstate.buffers.stencil.setLocked( true );\n\n\t}\n\n}\n\nclass ClearMaskPass extends _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.Pass {\n\n\tconstructor() {\n\n\t\tsuper();\n\n\t\tthis.needsSwap = false;\n\n\t}\n\n\trender( renderer /*, writeBuffer, readBuffer, deltaTime, maskActive */ ) {\n\n\t\trenderer.state.buffers.stencil.setLocked( false );\n\t\trenderer.state.buffers.stencil.setTest( false );\n\n\t}\n\n}\n\n\n\n\n//# sourceURL=webpack://node_headless/./node_modules/three/examples/jsm/postprocessing/MaskPass.js?");

/***/ }),

/***/ "./node_modules/three/examples/jsm/postprocessing/Pass.js":
/*!****************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/Pass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Pass\": () => (/* binding */ Pass),\n/* harmony export */   \"FullScreenQuad\": () => (/* binding */ FullScreenQuad)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nclass Pass {\n\n\tconstructor() {\n\n\t\t// if set to true, the pass is processed by the composer\n\t\tthis.enabled = true;\n\n\t\t// if set to true, the pass indicates to swap read and write buffer after rendering\n\t\tthis.needsSwap = true;\n\n\t\t// if set to true, the pass clears its buffer before rendering\n\t\tthis.clear = false;\n\n\t\t// if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.\n\t\tthis.renderToScreen = false;\n\n\t}\n\n\tsetSize( /* width, height */ ) {}\n\n\trender( /* renderer, writeBuffer, readBuffer, deltaTime, maskActive */ ) {\n\n\t\tconsole.error( 'THREE.Pass: .render() must be implemented in derived pass.' );\n\n\t}\n\n}\n\n// Helper for passes that need to fill the viewport with a single quad.\n\nconst _camera = new three__WEBPACK_IMPORTED_MODULE_0__.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );\n\n// https://github.com/mrdoob/three.js/pull/21358\n\nconst _geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();\n_geometry.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( [ - 1, 3, 0, - 1, - 1, 0, 3, - 1, 0 ], 3 ) );\n_geometry.setAttribute( 'uv', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( [ 0, 2, 0, 0, 2, 0 ], 2 ) );\n\nclass FullScreenQuad {\n\n\tconstructor( material ) {\n\n\t\tthis._mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh( _geometry, material );\n\n\t}\n\n\tdispose() {\n\n\t\tthis._mesh.geometry.dispose();\n\n\t}\n\n\trender( renderer ) {\n\n\t\trenderer.render( this._mesh, _camera );\n\n\t}\n\n\tget material() {\n\n\t\treturn this._mesh.material;\n\n\t}\n\n\tset material( value ) {\n\n\t\tthis._mesh.material = value;\n\n\t}\n\n}\n\n\n\n\n//# sourceURL=webpack://node_headless/./node_modules/three/examples/jsm/postprocessing/Pass.js?");

/***/ }),

/***/ "./node_modules/three/examples/jsm/postprocessing/ShaderPass.js":
/*!**********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/ShaderPass.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShaderPass\": () => (/* binding */ ShaderPass)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../postprocessing/Pass.js */ \"./node_modules/three/examples/jsm/postprocessing/Pass.js\");\n\n\n\nclass ShaderPass extends _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.Pass {\n\n\tconstructor( shader, textureID ) {\n\n\t\tsuper();\n\n\t\tthis.textureID = ( textureID !== undefined ) ? textureID : 'tDiffuse';\n\n\t\tif ( shader instanceof three__WEBPACK_IMPORTED_MODULE_1__.ShaderMaterial ) {\n\n\t\t\tthis.uniforms = shader.uniforms;\n\n\t\t\tthis.material = shader;\n\n\t\t} else if ( shader ) {\n\n\t\t\tthis.uniforms = three__WEBPACK_IMPORTED_MODULE_1__.UniformsUtils.clone( shader.uniforms );\n\n\t\t\tthis.material = new three__WEBPACK_IMPORTED_MODULE_1__.ShaderMaterial( {\n\n\t\t\t\tdefines: Object.assign( {}, shader.defines ),\n\t\t\t\tuniforms: this.uniforms,\n\t\t\t\tvertexShader: shader.vertexShader,\n\t\t\t\tfragmentShader: shader.fragmentShader\n\n\t\t\t} );\n\n\t\t}\n\n\t\tthis.fsQuad = new _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_0__.FullScreenQuad( this.material );\n\n\t}\n\n\trender( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {\n\n\t\tif ( this.uniforms[ this.textureID ] ) {\n\n\t\t\tthis.uniforms[ this.textureID ].value = readBuffer.texture;\n\n\t\t}\n\n\t\tthis.fsQuad.material = this.material;\n\n\t\tif ( this.renderToScreen ) {\n\n\t\t\trenderer.setRenderTarget( null );\n\t\t\tthis.fsQuad.render( renderer );\n\n\t\t} else {\n\n\t\t\trenderer.setRenderTarget( writeBuffer );\n\t\t\t// TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600\n\t\t\tif ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );\n\t\t\tthis.fsQuad.render( renderer );\n\n\t\t}\n\n\t}\n\n}\n\n\n\n\n//# sourceURL=webpack://node_headless/./node_modules/three/examples/jsm/postprocessing/ShaderPass.js?");

/***/ }),

/***/ "./node_modules/three/examples/jsm/shaders/CopyShader.js":
/*!***************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/CopyShader.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CopyShader\": () => (/* binding */ CopyShader)\n/* harmony export */ });\n/**\n * Full-screen textured quad shader\n */\n\nvar CopyShader = {\n\n\tuniforms: {\n\n\t\t'tDiffuse': { value: null },\n\t\t'opacity': { value: 1.0 }\n\n\t},\n\n\tvertexShader: /* glsl */`\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}`,\n\n\tfragmentShader: /* glsl */`\n\n\t\tuniform float opacity;\n\n\t\tuniform sampler2D tDiffuse;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\t\t\tgl_FragColor = opacity * texel;\n\n\t\t}`\n\n};\n\n\n\n\n//# sourceURL=webpack://node_headless/./node_modules/three/examples/jsm/shaders/CopyShader.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./scene/js/scene.js");
/******/ 	
/******/ })()
;