var names = Object.getOwnPropertyNames(window);
var filter = (...args) => names.filter(n => !args.includes(n))
console.log(names.length) // 1028
// ES 全局对象
// [ecma262](https://tc39.es/ecma262/#sec-object-objects)
const globalOList = [
    'globalThis', 'Infinity', 'NaN', 'undefined', // 值属性
    'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', // 函数属性
    'Encode', 'Decode', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', // URL 操作
    'Array', 'ArrayBuffer', 'BigInt', 'BigInt64Array', 'BigUint64Array', 'Boolean', 'DataView', 'Date', 'Error', 'EvalError', 'FinalizationRegistry', 'Float32Array', 'Float64Array', 'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Number', 'Object', 'Promise', 'Proxy', 'RangeError', 'ReferenceError', 'RegExp', 'Set', 'SharedArrayBuffer', 'String', 'Symbol', 'SyntaxError', 'TypeError', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'URIError', 'WeakMap', 'WeakRef', 'WeakSet', // 构造函数属性
    'Atomics', 'JSON', 'Math', 'Reflect' // 其他属性
]

const globalOListSet = new Set(globalOList)

names = names.filter(n => !globalOListSet.has(n))

// 移除自建
names = filter('names', 'filter', 'globalOList', 'globalOListSet')

console.log(names.length) // 972

// DOM 中的元素构造器
const nodes = ['Node']
names = names.filter(n => {
    try {
        const isNode = (window[n].prototype instanceof Node)
        isNode && nodes.push(n)
        return !isNode
    } catch (err) {
        return true
    }
}).filter(n => n != 'Node')

// 移除自建
names = filter('nodes')

console.log(names.length) // 813

// window 上面的属性
// EventTarget
// https://html.spec.whatwg.org/multipage/window-object.html#the-window-object
const winOList = [
    'Window',
    'window', 'self', 'document', 'name', 'location', 'history', 'customElements', 'locationbar', 'menubar', 'personalbar', 'scrollbars', 'statusbar', 'toolbar', 'status', 'defaultStatus', 'defaultstatus', 'close', 'closed', 'stop', 'focus', 'blur', // the current browsing context
    'frames', 'length', 'top', 'opener', 'parent', 'frameElement', 'open', // other browsing contexts
    'navigator', 'clientInformation', 'originAgentCluster', // the user agent
    'alert', 'confirm', 'prompt', 'print', 'postMessage', // user prompts
    'captureElements', 'releaseEvents', 'External', 'external'
]
var winOSet = new Set(winOList);

names = names.filter(n => !winOSet.has(n))

// 移除自建
names = filter('winOList', 'winOSet')

console.log(names.length) // 777

const evtList = []
// 移除事件属性
names = names.filter(n => {
    const isEvt = /^on/.test(n)
    isEvt && evtList.push(n)
    return !isEvt
})

// 移除自建
names = filter('evtList')

console.log(names.length) // 669

// webkit 前缀的私有属性
var wibkitList = []
// 移除事件属性
names = names.filter(n => {
    const isWebkit = /^[wW]eb[kK]it/.test(n)
    isWebkit && wibkitList.push(n)
    return !isWebkit
})

// 移除自建
names = filter('wibkitList')

console.log(names.length) // 653

// Audio API
const audioAPIList = ['BaseAudioContext', 'AudioContext', 'OfflineAudioContext', 'AudioBuffer', 'AudioNode', 'AudioParam', 'AudioParamMap', 'AudioScheduledSourceNode', 'AnalyserNode', 'AudioBufferSourceNode', 'AudioDestinationNode', 'AudioListener', 'AudioProcessingEvent', 'BiquadFilterNode', 'ChannelMergerNode', 'ChannelSplitterNode', 'ConstantSourceNode', 'ConvolverNode', 'DelayNode', 'DynamicsCompressorNode', 'GainNode', 'IIRFilterNode', 'MediaElementAudioSourceNode', 'MediaStreamAudioDestinationNode', 'MediaStreamAudioSourceNode', 'MediaStreamTrackAudioSourceNode', 'OscillatorNode', 'PannerNode', 'PeriodicWave', 'ScriptProcessorNode', 'StereoPannerNode', 'WaveShaperNode', 'AudioWorklet', 'AudioWorkletNode', 'OfflineAudioCompletionEvent', 'MediaError'];

var audioAPISet = new Set(audioAPIList);

names = names.filter(n => !audioAPISet.has(n))

// 移除自建
names = filter('audioAPIList', 'audioAPISet')

console.log(names.length) // 620

var mediaStreamList = [
    'MediaRecorder', 'MediaStream', 'MediaStreamEvent', 'MediaStreamTrack', 'MediaStreamTrackEvent', 'OverconstrainedError', 'InputDeviceInfo', 'ConstrainablePattern'
];

var mediaStreamSet = new Set(mediaStreamList);

names = names.filter(n => !mediaStreamSet.has(n))

// 移除自建
names = filter('mediaStreamList', 'mediaStreamSet')

console.log(names.length) // 613

// web RTC
var RTCList = []
names = names.filter(n => {
    const isRTC = /^RTC/g.test(n)
    isRTC && RTCList.push(n)
    return !isRTC
})

// 移除自建
names = filter('RTCList')

console.log(names.length) // 590

// Intl 国际化

var intlList = ['Intl']
var intlSet = new Set(intlList);

names = names.filter(n => !intlSet.has(n))

// 移除自建
names = filter('intlList', 'intlSet')

console.log(names.length) // 587

// CSSRule 
var CSSRuleAPIList = ['CSSRule', 'CSSRuleList']
names = names.filter(n => {
    try {
        const isCSSRule = (window[n].prototype instanceof CSSRule)
        isCSSRule && CSSRuleAPIList.push(n)
        return !isCSSRule
    } catch (err) {
        return true
    }
}).filter(n => n != 'CSSRule' && n != 'CSSRuleList')

// 移除自建
names = filter('CSSRuleAPIList')
console.log(names.length) // 571

// CSSStyleValue
var CSSStyleValueAPIListOther = ['CSSStyleValue', 'CSSNumericArray', 'CSS', 'StylePropertyMapReadOnly', 'StylePropertyMap', 'CSSVariableReferenceValue']
var CSSStyleValueAPIList = [...CSSStyleValueAPIListOther]
names = names.filter(n => {
    try {
        const isCSSStyleValue = (window[n].prototype instanceof CSSStyleValue) ||
            (window[n].prototype && (window[n].prototype.prototype instanceof CSSStyleValue));
        isCSSStyleValue && CSSStyleValueAPIList.push(n)
        return !isCSSStyleValue
    } catch (err) {
        return true
    }
}).filter(n => !CSSStyleValueAPIListOther.includes(n))

// 移除自建
names = filter('CSSStyleValueAPIListOther', 'CSSStyleValueAPIList')
console.log(names.length) // 554

// CSSStyleDeclaration
// StyleSheet
// https://drafts.csswg.org/cssom/#dom-window-getcomputedstyle
var styleSheetList = ['MediaList', 'StyleSheet', 'StyleSheetList', 'CSSStyleDeclaration', 'CSSStyleSheet', 'getComputedStyle']
var styleSheetSet = new Set(styleSheetList);

names = names.filter(n => !styleSheetSet.has(n))

// 移除自建
names = filter('styleSheetList', 'styleSheetSet')
console.log(names.length) // 

// Animation CSSTransformComponent
var animationList = ['Animation', 'CSSAnimation', 'CSSTransition', 'CSSTransformComponent']
var animationSet = new Set(animationList)

names = names.filter(n => {
    try {
        const isAnimation = (window[n].prototype instanceof CSSTransformComponent);
        isAnimation && animationList.push(n)
        return !isAnimation
    } catch (err) {
        return true
    }
}).filter(n => !animationSet.has(n))

// 移除自建
names = filter('animationList', 'animationSet')
console.log(names.length) // 

// WebGL
var WebGLList = []
names = names.filter(n => {
    const isWebGLList = /^WebGL/g.test(n)
    isWebGLList && WebGLList.push(n)
    return !isWebGLList
})

// 移除自建
names = filter('WebGLList')
console.log(names.length) // 

// SVG 相关
var SVGList = []
names = names.filter(n => {
    const isSVG = /^SVG/g.test(n)
    isSVG && SVGList.push(n)
    return !isSVG
})

// 移除自建
names = filter('SVGList')
console.log(names.length) // 

// Presentation https 用
var presentationList = []
names = names.filter(n => {
    const isPresentation = /^Presentation/g.test(n)
    isPresentation && presentationList.push(n)
    return !isPresentation
})

// 移除自建
names = filter('presentationList')
console.log(names.length) // 

// USB
var USBList = []
names = names.filter(n => {
    const isUSB = /^USB/g.test(n)
    isUSB && USBList.push(n)
    return !isUSB
})

// 移除自建
names = filter('USBList')
console.log(names.length) // 

// Bluetooth
var BluetoothList = []
names = names.filter(n => {
    const isBluetooth = /^Bluetooth/g.test(n)
    isBluetooth && BluetoothList.push(n)
    return !isBluetooth
})

// 移除自建
names = filter('BluetoothList')
console.log(names.length) // 

// WebXR 
var XRList = []
names = names.filter(n => {
    const isXR = /^XR/g.test(n)
    isXR && XRList.push(n)
    return !isXR
})

// 移除自建
names = filter('XRList')
console.log(names.length) // 

// Performance
var performanceList = []
names = names.filter(n => {
    const isPerformance = /^Performance/ig.test(n)
    isPerformance && performanceList.push(n)
    return !isPerformance
})

// 移除自建
names = filter('performanceList')
console.log(names.length) // 

// Musical Instrument Digital Interface (MIDI) 
var MIDIList = []
names = names.filter(n => {
    const isMIDI = /^MIDI/g.test(n)
    isMIDI && MIDIList.push(n)
    return !isMIDI
})

// 移除自建
names = filter('MIDIList')
console.log(names.length) // 

// Indexed Database API
var IDBList = ['indexedDB']
names = names.filter(n => {
    const isIDB = /^IDB/g.test(n)
    isIDB && IDBList.push(n)
    return !isIDB
}).filter(n => n !== 'indexedDB')

// 移除自建
names = filter('IDBList')
console.log(names.length) // 

// idle Cooperative Scheduling of Background Tasks
// https://w3c.github.io/requestidlecallback/#the-idledeadline-interface
var idleList = []
names = names.filter(n => {
    const isIdle = /idle/ig.test(n)
    isIdle && idleList.push(n)
    return !isIdle
})

// 移除自建
names = filter('idleList')
console.log(names.length) // 

// Streams
var streamsSet = new Set(['TransformStream', 'ByteLengthQueuingStrategy', 'CountQueuingStrategy', 'ReadableByteStreamController']);
var streamsList = [...Array.from(streamsSet)]

names = names.filter(n => {
    const isStreamse = /^(Writ|Read)ableStream/g.test(n)
    isStreamse && streamsList.push(n)
    return !isStreamse
}).filter(n => !streamsSet.has(n))

// 移除自建
names = filter('streamsSet', 'streamsList')
console.log(names.length) // 

// VTT
var VTTList = ['VTTCue']
var VTTSet = new Set(VTTList);

names = names.filter(n => !VTTSet.has(n))

// 移除自建
names = filter('VTTSet', 'VTTList')
console.log(names.length) // 

// TextEncoder
var textEncoderList = ['TextEncoderStream', 'TextEncoder', 'TextDecoderStream', 'TextDecoder']
var textEncoderSet = new Set(textEncoderList);

names = names.filter(n => !textEncoderSet.has(n))

// 移除自建
names = filter('textEncoderSet', 'textEncoderList')
console.log(names.length) // 

// Resize Observer
var resizeObserverList = []

names = names.filter(n => {
    const isResizeObservere = /^ResizeObserver/g.test(n)
    isResizeObservere && resizeObserverList.push(n)
    return !isResizeObservere
})

// 移除自建
names = filter('resizeObserverList')
console.log(names.length) // 


// Drag and drop
var dragList = ['DragEvent', 'DataTransfer', 'DataTransferItem', 'DataTransferItemList']
var dragSet = new Set(dragList);

names = names.filter(n => !dragSet.has(n))

// 移除自建
names = filter('dragSet', 'dragList')
console.log(names.length) // 

// Gamepad
var gamepadList = []

names = names.filter(n => {
    const isGamepad = /^Gamepad/g.test(n)
    isGamepad && gamepadList.push(n)
    return !isGamepad
})

// 移除自建
names = filter('gamepadList')
console.log(names.length) // 

// TextTrack
var textTrackList = ['TrackEvent', 'TextTrack', 'TextTrackCue', 'TextTrackCueList', 'TextTrackList']
var textTrackSet = new Set(textTrackList);

names = names.filter(n => !textTrackSet.has(n))

// 移除自建
names = filter('textTrackSet', 'textTrackList')
console.log(names.length) // 

// 以下部分 https://dom.spec.whatwg.org/
// Ranges
var rangesList = ['Range', 'StaticRange', 'AbstractRange']
var rangesSet = new Set(rangesList);

names = names.filter(n => !rangesSet.has(n))

// 移除自建
names = filter('rangesSet', 'rangesList')
console.log(names.length) // 

// Traversal
var traversalList = ['NodeIterator', 'TreeWalker', 'NodeFilter']
var traversalSet = new Set(traversalList);

names = names.filter(n => !traversalSet.has(n))

// 移除自建
names = filter('traversalSet', 'traversalList')
console.log(names.length) // 

// Sets
var setsList = ['DOMTokenList']
var setsSet = new Set(setsList);

names = names.filter(n => !setsSet.has(n))

// 移除自建
names = filter('setsSet', 'setsList')
console.log(names.length) // 

// XPath
var xPathList = []

names = names.filter(n => {
    const isXPath = /^XPath/g.test(n)
    isXPath && xPathList.push(n)
    return !isXPath
})

// 移除自建
names = filter('xPathList')
console.log(names.length) // 

// XSLTProcessor
var XSLTProcessorList = ['XSLTProcessor']
var XSLTProcessorSet = new Set(XSLTProcessorList);

names = names.filter(n => !XSLTProcessorSet.has(n))

// 移除自建
names = filter('XSLTProcessorSet', 'XSLTProcessorList')
console.log(names.length) // 

// Aborting ongoing activities
var abortList = ['AbortController', 'AbortSignal']
var AbortSet = new Set(abortList);

names = names.filter(n => !AbortSet.has(n))

// 移除自建
names = filter('AbortSet', 'abortList')
console.log(names.length) // 

// NodeList
var nodeListList = ['NodeList', 'RadioNodeList']
var nodeListSet = new Set(nodeListList);

names = names.filter(n => !nodeListSet.has(n))

// 移除自建
names = filter('nodeListSet', 'nodeListList')
console.log(names.length) // 

// MutationObserver
var mutationObserverList = ['MutationEvent', 'MutationObserver', 'MutationRecord']
var mutationObserverSet = new Set(mutationObserverList);

names = names.filter(n => !mutationObserverSet.has(n))

// 移除自建
names = filter('mutationObserverSet', 'mutationObserverList')
console.log(names.length) // 

// DOMImplementation
// https://dom.spec.whatwg.org/#dom-window-event
var otherDomList = ['DOMImplementation', 'CustomEvent', 'event']
var otherDomSet = new Set(otherDomList);

names = names.filter(n => !otherDomSet.has(n))

// 移除自建
names = filter('otherDomSet', 'otherDomList')
console.log(names.length) // 

// Geolocation API
// https://w3c.github.io/geolocation-api/
var geolocationList = []

names = names.filter(n => {
    const isGeolocation = /^Geolocation/g.test(n)
    isGeolocation && geolocationList.push(n)
    return !isGeolocation
})

// 移除自建
names = filter('geolocationList')
console.log(names.length) // 

// 'HTMLCollection', 'HTMLAllCollection'
// https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#the-domstringlist-interface
var HTMLCollectionList = ['HTMLCollection', 'HTMLAllCollection', 'DOMStringList']
var HTMLCollectionSet = new Set(HTMLCollectionList)

names = names.filter(n => {
    try {
        const isHTMLCollection = (window[n].prototype instanceof HTMLCollection);
        isHTMLCollection && HTMLCollectionList.push(n)
        return !isHTMLCollection
    } catch (err) {
        return true
    }
}).filter(n => !HTMLCollectionSet.has(n))

// 移除自建
names = filter('HTMLCollectionSet', 'HTMLCollectionList')
console.log(names.length) // 

// Canvas
// https://html.spec.whatwg.org/multipage/canvas.html
var canvasList = ['CanvasRenderingContext2D', 'CanvasPattern', 'CanvasGradient', 'TextMetrics', 'ImageData', 'Path2D', 'ImageBitmapRenderingContext', 'OffscreenCanvas', 'OffscreenCanvasRenderingContext2D']
var canvasSet = new Set(canvasList);

names = names.filter(n => !canvasSet.has(n))

// 移除自建
names = filter('canvasSet', 'canvasList')
console.log(names.length) // 

// Trusted Types && Worker
// https://w3c.github.io/webappsec-trusted-types/dist/spec/#trusted-html
// https://html.spec.whatwg.org/multipage/workers.html
var trustedTypesSet = new Set(['DOMParser', 'Worker', 'SharedWorker', /*'ServiceWorkerContainer'*/])
var trustedTypesList = [...Array.from(trustedTypesSet)]

names = names.filter(n => {
    const isTrustedTypes = /^[Tt]rusted/g.test(n)
    isTrustedTypes && trustedTypesList.push(n)
    return !isTrustedTypes
}).filter(n => !trustedTypesSet.has(n))

// 移除自建
names = filter('trustedTypesList', 'trustedTypesSet')
console.log(names.length) // 


// ServiceWorker
// https://w3c.github.io/ServiceWorker/
var serviceWorkerSet = new Set(['NavigationPreloadManager', 'Cache', 'CacheStorage', 'caches'])
var serviceWorkerList = [...Array.from(serviceWorkerSet)]

names = names.filter(n => {
    const isServiceWorker = /^ServiceWorker/g.test(n)
    isServiceWorker && serviceWorkerList.push(n)
    return !isServiceWorker
}).filter(n => !serviceWorkerSet.has(n))

// 移除自建
names = filter('serviceWorkerSet', 'serviceWorkerList')
console.log(names.length) // 

// Encrypted Media Extensions
// https://w3c.github.io/encrypted-media/#mediakeys-interface
var mediaExtList = ['MediaEncryptedEvent', 'MediaKeySession', 'MediaKeyStatusMap', 'MediaKeySystemAccess', 'MediaKeys', 'MediaKeyMessageEvent']
var mediaExtSet = new Set(mediaExtList);

names = names.filter(n => !mediaExtSet.has(n))

// 移除自建
names = filter('mediaExtSet', 'mediaExtList')
console.log(names.length) // 

// Geometry Interfaces
// https://drafts.fxtf.org/geometry/#idl-index
var geometryList = ['DOMPointReadOnly', 'DOMPoint', 'DOMRectReadOnly', 'DOMRect', 'DOMRectList', 'DOMQuad', 'DOMMatrixReadOnly', 'DOMMatrix']
var geometrySet = new Set(geometryList);

names = names.filter(n => !geometrySet.has(n))

// 移除自建
names = filter('geometrySet', 'geometryList')
console.log(names.length) // 

// MediaSource
// https://w3c.github.io/media-source/#mediasource
var mediaSourceList = ['MediaSource', 'SourceBuffer', 'SourceBufferList']
var mediaSourceSet = new Set(mediaSourceList);

names = names.filter(n => !mediaSourceSet.has(n))

// 移除自建
names = filter('mediaSourceSet', 'mediaSourceList')
console.log(names.length) // 

// MediaSession
// https://w3c.github.io/mediasession/#idl-index
var mediaSessionList = ['MediaSession', 'MediaMetadata']
var mediaSessionSet = new Set(mediaSessionList);

names = names.filter(n => !mediaSessionSet.has(n))

// 移除自建
names = filter('mediaSessionSet', 'mediaSessionList')
console.log(names.length) // 

// cssom-view 
// https://drafts.csswg.org/cssom-view/#idl-index
// MediaQueryList
var mediaQueryListList = ['matchMedia', 'MediaQueryList', 'MediaQueryListEvent', 'styleMedia', 'Screen', 'screen']
var mediaQueryListSet = new Set(mediaQueryListList);

names = names.filter(n => !mediaQueryListSet.has(n))

// 移除自建
names = filter('mediaQueryListSet', 'mediaQueryListList')
console.log(names.length) // 

// CSSOM ScrollOptions
// https://drafts.csswg.org/cssom-view/#dom-window-scrollto
var scrollOptList = [
    'moveTo', 'moveBy', 'resizeTo', 'resizeBy', // browsing context
    'innerWidth', 'innerHeight', // viewport
    'scrollX', 'pageXOffset', 'scrollY', 'pageYOffset', 'scroll', 'scrollTo', 'scrollBy', // viewport scrolling
    'screenX', 'screenLeft', 'screenY', 'screenTop', 'outerWidth', 'outerHeight', 'devicePixelRatio', // client
]
var scrollOptSet = new Set(scrollOptList);

names = names.filter(n => !scrollOptSet.has(n))

// 移除自建
names = filter('scrollOptSet', 'scrollOptList')
console.log(names.length) // 

// Web Storage
// https://html.spec.whatwg.org/multipage/webstorage.html
var storageList = [
    'Storage', 'StorageEvent', 'StorageManager', 'sessionStorage', 'localStorage'
]
var storageSet = new Set(storageList);

names = names.filter(n => !storageSet.has(n))

// 移除自建
names = filter('storageSet', 'storageList')
console.log(names.length) // 

// CookieStore
// https://wicg.github.io/cookie-store/
var cookieStoreList = [
    'CookieStore', 'CookieStoreManager', 'CookieChangeEvent', 'cookieStore'
]
var cookieStoreSet = new Set(cookieStoreList);

names = names.filter(n => !cookieStoreSet.has(n))

// 移除自建
names = filter('cookieStoreSet', 'cookieStoreList')
console.log(names.length) // 

//  webhid
// https://wicg.github.io/webhid/
var webhidList = [
    'HID', 'HIDConnectionEvent', 'HIDDevice', 'HIDInputReportEvent',
]
var webhidSet = new Set(webhidList);

names = names.filter(n => !webhidSet.has(n))

// 移除自建
names = filter('webhidSet', 'webhidList')
console.log(names.length) // 

//  DeviceOrientation Event
// https://w3c.github.io/deviceorientation/
var deviceOrientationList = [
    'DeviceMotionEvent', 'DeviceMotionEventAcceleration', 'DeviceMotionEventRotationRate', 'DeviceOrientationEvent',
]
var deviceOrientationSet = new Set(deviceOrientationList);

names = names.filter(n => !deviceOrientationSet.has(n))

// 移除自建
names = filter('deviceOrientationSet', 'deviceOrientationList')
console.log(names.length) // 

// Media Capture and Streams
// https://w3c.github.io/mediacapture-main
var mediacaptureList = [
    'MediaDevices', 'MediaDeviceInfo'
]
var mediacaptureSet = new Set(mediacaptureList);

names = names.filter(n => !mediacaptureSet.has(n))

// 移除自建
names = filter('mediacaptureSet', 'mediacaptureList')
console.log(names.length) // 

// InputDeviceCapabilities
// https://wicg.github.io/input-device-capabilities

var inputDeviceCapabilitiesList = [
    'InputDeviceCapabilities'
]
var inputDeviceCapabilitiesSet = new Set(inputDeviceCapabilitiesList);

names = names.filter(n => !inputDeviceCapabilitiesSet.has(n))

// 移除自建
names = filter('inputDeviceCapabilitiesSet', 'inputDeviceCapabilitiesList')
console.log(names.length) // 

//  DOMStringMap 用于 dataset 
// https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes:domstringmap-3

var DOMStringMapList = [
    'DOMStringMap'
]
var DOMStringMapSet = new Set(DOMStringMapList);

names = names.filter(n => !DOMStringMapSet.has(n))

// 移除自建
names = filter('DOMStringMapSet', 'DOMStringMapList')
console.log(names.length) // 

// CustomElementRegistry
// https://html.spec.whatwg.org/multipage/custom-elements.html#dom-window-customelements

var customElementList = [
    'CustomElementRegistry',
    // 'customElements',
    'ElementInternals'
]
var customElementSet = new Set(customElementList);

names = names.filter(n => !customElementSet.has(n))

// 移除自建
names = filter('customElementSet', 'customElementList')
console.log(names.length) // 

// webappapis
// https://html.spec.whatwg.org/multipage/webappapis.html

var webappapiList = [
    'btoa', 'atob', // base64 utility methods
    'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', // timers
    'queueMicrotask', // microtask queuing
    'createImageBitmap', // ImageBitmap
    'ErrorEvent',
    'PromiseRejectionEvent',
    'crossOriginIsolated',
    'isSecureContext',
]
var webappapiSet = new Set(webappapiList);

names = names.filter(n => !webappapiSet.has(n))

// 移除自建
names = filter('webappapiSet', 'webappapiList')
console.log(names.length) // 

// origin 归属于上面
// https://stackoverflow.com/questions/55451493/what-is-window-origin
// https://developer.mozilla.org/en-US/docs/Web/API/origin
// https://html.spec.whatwg.org/multipage/webappapis.html#dom-origin-dev

var originList = ['origin']
var originSet = new Set(originList);

names = names.filter(n => !originSet.has(n))

// 移除自建
names = filter('originSet', 'originList')
console.log(names.length) // 

// openDatabase
// https://www.tutorialspoint.com/html5/html5_web_sql.htm
var openDatabaseList = [
    'openDatabase'
]
var openDatabaseSet = new Set(openDatabaseList);

names = names.filter(n => !openDatabaseSet.has(n))

// 移除自建
names = filter('openDatabaseSet', 'openDatabaseList')
console.log(names.length) // 

// PaymentRequest
// https://w3c.github.io/payment-request
var paymentRequestList = []

names = names.filter(n => {
    const isPaymentRequest = /^Payment/g.test(n)
    isPaymentRequest && paymentRequestList.push(n)
    return !isPaymentRequest
})

// 移除自建
names = filter('paymentRequestList')
console.log(names.length) // 

// XMLHttpRequest
// https://xhr.spec.whatwg.org/
var xhrList = ['XMLHttpRequestEventTarget', 'XMLHttpRequestUpload', 'XMLHttpRequest', 'FormData', 'ProgressEvent']
var xhrSet = new Set(xhrList);

names = names.filter(n => !xhrSet.has(n))

// 移除自建
names = filter('xhrSet', 'xhrList')
console.log(names.length) // 

// ImageCapture 
// https://w3c.github.io/mediacapture-image/#idl-index
var imageCaptureList = ['ImageCapture']
var imageCaptureSet = new Set(imageCaptureList);

names = names.filter(n => !imageCaptureSet.has(n))

// 移除自建
names = filter('imageCaptureSet', 'imageCaptureList')
console.log(names.length) // 

// ImageBitmap
// https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#imagebitmap
var imageBitmapList = ['ImageCapture', 'ImageBitmap']
var imageBitmapSet = new Set(imageBitmapList);

names = names.filter(n => !imageBitmapSet.has(n))

// 移除自建
names = filter('imageBitmapSet', 'imageBitmapList')
console.log(names.length) // 

// AggregateError 错误信息合并
// https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-aggregate-error-objects
var aggregateErrorList = ['AggregateError']
var aggregateErrorSet = new Set(aggregateErrorList);

names = names.filter(n => !aggregateErrorSet.has(n))

// 移除自建
names = filter('aggregateErrorSet', 'aggregateErrorList')
console.log(names.length) // 

// console 
// https://console.spec.whatwg.org/#console-namespace
var consoleList = ['console']
var consoleSet = new Set(consoleList);

names = names.filter(n => !consoleSet.has(n))

// 移除自建
names = filter('consoleSet', 'consoleList')
console.log(names.length) // 

// escape
// https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-escape-string
var escapeList = ['escape', 'unescape']
var escapeSet = new Set(escapeList);

names = names.filter(n => !escapeSet.has(n))

// 移除自建
names = filter('escapeSet', 'escapeList')
console.log(names.length) // 

// XMLSerializer 
// https://w3c.github.io/DOM-Parsing/#the-xmlserializer-interface
var XMLSerializerList = ['XMLSerializer']
var XMLSerializerSet = new Set(XMLSerializerList);

names = names.filter(n => !XMLSerializerSet.has(n))

// 移除自建
names = filter('XMLSerializerSet', 'XMLSerializerList')
console.log(names.length) // 

// UIEvent
// https://w3c.github.io/uievents/
var UIEventList = []
names = names.filter(n => {
    try{
        const isUIEvent =  (window[n].prototype instanceof UIEvent)
        isUIEvent && UIEventList.push(n)
        return !isUIEvent
    } catch(err) {
        return true
    }
}).filter(n => n !== 'UIEvent')

// 移除自建
names = filter('UIEventList')
console.log(names.length) // 

// WebSocket
https://html.spec.whatwg.org/multipage/web-sockets.html#the-websocket-interface
var webSocketList = ['WebSocket', 'CloseEvent']
var webSocketSet = new Set(webSocketList);

names = names.filter(n => !webSocketSet.has(n))

// 移除自建
names = filter('webSocketSet', 'webSocketList')
console.log(names.length) // 

// VisualViewport
// https://wicg.github.io/visual-viewport/#the-visualviewport-interface
var visualViewportList = ['VisualViewport', 'visualViewport']
var visualViewportSet = new Set(visualViewportList);

names = names.filter(n => !visualViewportSet.has(n))

// 移除自建
names = filter('visualViewportSet', 'visualViewportList')
console.log(names.length) // 

// ValidityState
// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#the-constraint-validation-api:validitystate-3

var validityStateList = ['ValidityState', 'SubmitEvent', 'FormDataEvent']
var validityStateSet = new Set(validityStateList);

names = names.filter(n => !validityStateSet.has(n))

// 移除自建
names = filter('validityStateSet', 'validityStateList')
console.log(names.length) // 


// UserActivation
// https://mustaqahmed.github.io/user-activation-v2/
var userActivationList = ['UserActivation']
var userActivationSet = new Set(userActivationList);

names = names.filter(n => !userActivationSet.has(n))

// 移除自建
names = filter('userActivationSet', 'userActivationList')
console.log(names.length) // 

// URL
// https://url.spec.whatwg.org
var URLApiList = ['URL', 'URLSearchParams']
var URLApiSet = new Set(URLApiList);

names = names.filter(n => !URLApiSet.has(n))

// 移除自建
names = filter('URLApiSet', 'URLApiList')
console.log(names.length) // 

// TransitionEvent 
// https://drafts.csswg.org/css-transitions/#idl-index
var transitionEventList = ['TransitionEvent']
var transitionEventSet = new Set(transitionEventList);

names = names.filter(n => !transitionEventSet.has(n))

// 移除自建
names = filter('transitionEventSet', 'transitionEventList')
console.log(names.length) // 

// Touch
// https://w3c.github.io/touch-events/#touchlist-interface
var touchList = ['Touch', 'TouchList' /*, 'TouchEvent'*/]
var touchSet = new Set(touchList);

names = names.filter(n => !touchSet.has(n))

// 移除自建
names = filter('touchSet', 'touchList')
console.log(names.length) // 

// media TimeRanges
// https://html.spec.whatwg.org/multipage/media.html#time-ranges
var timeRangesList = ['TimeRanges']
var timeRangesSet = new Set(timeRangesList);

names = names.filter(n => !timeRangesSet.has(n))

// 移除自建
names = filter('timeRangesSet', 'timeRangesList')
console.log(names.length) // 


// TaskAttributionTiming
// https://w3c.github.io/longtasks/#idl-index
var taskAttributionTimingList = ['TaskAttributionTiming']
var taskAttributionTimingSet = new Set(taskAttributionTimingList);

names = names.filter(n => !taskAttributionTimingSet.has(n))

// 移除自建
names = filter('taskAttributionTimingSet', 'taskAttributionTimingList')
console.log(names.length) // 


// Web Background Synchronization
// https://wicg.github.io/background-sync/spec/#idl-index
var wbsList = ['SyncManager', 'SyncEvent']
var wbsSet = new Set(wbsList);

names = names.filter(n => !wbsSet.has(n))

// 移除自建
names = filter('wbsSet', 'wbsList')
console.log(names.length) // 


// Web Periodic Background Synchronization
// https://wicg.github.io/periodic-background-sync/
var wpbsList = ['ServiceWorkerRegistration', 'PeriodicSyncManager', 'PeriodicSyncEvent']
var wpbsSet = new Set(wpbsList);

names = names.filter(n => !wpbsSet.has(n))

// 移除自建
names = filter('wpbsSet', 'wpbsList')
console.log(names.length) // 

// Selection API
var selectionList = ['Selection', 'getSelection']
var selectionSet = new Set(selectionList);

names = names.filter(n => !selectionSet.has(n))

// 移除自建
names = filter('selectionSet', 'selectionList')
console.log(names.length) // 


// SecurityPolicyViolationEvent
// https://w3c.github.io/webappsec-csp/#idl-index
var SPVEList = ['SecurityPolicyViolationEvent']
var SPVESet = new Set(SPVEList);

names = names.filter(n => !SPVESet.has(n))

// 移除自建
names = filter('SPVESet', 'SPVEList')
console.log(names.length) // 

// The Screen Orientation API
// https://w3c.github.io/screen-orientation/#screenorientation-interface
var screenOrientationList = ['ScreenOrientation']
var screenOrientationSet = new Set(screenOrientationList);

names = names.filter(n => !screenOrientationSet.has(n))

// 移除自建
names = filter('screenOrientationSet', 'screenOrientationList')
console.log(names.length) // 

// Web Authentication API
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API
// https://w3c.github.io/webauthn/
var webauthnList = ['PublicKeyCredential', 'AuthenticatorResponse', 'AuthenticatorAttestationResponse', 'AuthenticatorAssertionResponse']
var webauthnSet = new Set(webauthnList);

names = names.filter(n => !webauthnSet.has(n))

// 移除自建
names = filter('webauthnSet', 'webauthnList')
console.log(names.length) // 

// Credential Management Level 1
// https://w3c.github.io/webappsec-credential-management/#idl-index
var credentialList = ['Credential', 'CredentialsContainer', 'FederatedCredential', 'PasswordCredential']
var credentialSet = new Set(credentialList);

names = names.filter(n => !credentialSet.has(n))

// 移除自建
names = filter('credentialSet', 'credentialList')
console.log(names.length) // 

// Fetch
// https://fetch.spec.whatwg.org/
var fetchList = ['Headers', 'Request', 'Response', 'fetch']
var fetchSet = new Set(fetchList);

names = names.filter(n => !fetchSet.has(n))

// 移除自建
names = filter('fetchSet', 'fetchList')
console.log(names.length) // 


// Reporting API
// https://developer.mozilla.org/en-US/docs/Web/API/Reporting_API
// https://w3c.github.io/reporting/#intro
var reporteList = ['ReportingObserver']
var reporteSet = new Set(reporteList);

names = names.filter(n => !reporteSet.has(n))

// 移除自建
names = filter('reporteSet', 'reporteList')
console.log(names.length) // 


// History traversal & Unloading documents
// https://html.spec.whatwg.org/multipage/browsing-the-web.html#the-popstateevent-interface
var htudList = ['PopStateEvent', 'HashChangeEvent', 'PageTransitionEvent', 'BeforeUnloadEvent']
var htudSet = new Set(htudList);

names = names.filter(n => !htudSet.has(n))

// 移除自建
names = filter('htudSet', 'htudList')
console.log(names.length) // 

// History 
// https://html.spec.whatwg.org/multipage/history.html#the-history-interface
var historyList = ['History', 'Location']
var historySet = new Set(historyList);

names = names.filter(n => !historySet.has(n))

// 移除自建
names = filter('historySet', 'historyList')
console.log(names.length) // 

// PDF viewing support && Navigator 
// https://html.spec.whatwg.org/multipage/system-state.html#pdf-viewing-support
var PDFVSList = ['PluginArray', 'MimeTypeArray', 'Plugin', 'MimeType', 'Navigator']
var PDFVSSet = new Set(PDFVSList);

names = names.filter(n => !PDFVSSet.has(n))

// 移除自建
names = filter('PDFVSSet', 'PDFVSList')
console.log(names.length) // 

// Managed Configuration API
// https://wicg.github.io/WebApiDevice/managed_config/#navigatormanageddata-interface

var navigatorManagedDataList = ['NavigatorManagedData']
var navigatorManagedDataSet = new Set(navigatorManagedDataList);

names = names.filter(n => !navigatorManagedDataSet.has(n))

// 移除自建
names = filter('navigatorManagedDataSet', 'navigatorManagedDataList')
console.log(names.length) // 

// User-Agent Client Hints API
// https://wicg.github.io/ua-client-hints/#idl-index
var navigatorUADataList = ['NavigatorUAData']
var navigatorUADataSet = new Set(navigatorUADataList);

names = names.filter(n => !navigatorUADataSet.has(n))

// 移除自建
names = filter('navigatorUADataSet', 'navigatorUADataList')
console.log(names.length) // 

// Network Information API
// https://wicg.github.io/netinfo/#networkinformation-interface
var networkList = ['NetworkInformation']
var networkSet = new Set(networkList);

names = names.filter(n => !networkSet.has(n))

// 移除自建
names = filter('networkSet', 'networkList')
console.log(names.length) // 

// NamedNodeMap
// https://dom.spec.whatwg.org/#interface-namednodemap
var namedNodeMapList = ['NamedNodeMap']
var namedNodeMapSet = new Set(namedNodeMapList);

names = names.filter(n => !namedNodeMapSet.has(n))

// 移除自建
names = filter('namedNodeMapSet', 'namedNodeMapList')
console.log(names.length) // 


// Channel messaging
// https://html.spec.whatwg.org/multipage/web-messaging.html#message-channels
var channelMessagingList = ['MessageChannel', 'MessagePort', 'BroadcastChannel']
var channelMessagingSet = new Set(channelMessagingList);

names = names.filter(n => !channelMessagingSet.has(n))

// 移除自建
names = filter('channelMessagingSet', 'channelMessagingList')
console.log(names.length) // 

// Communication MessageEvent
// https://html.spec.whatwg.org/multipage/comms.html#the-messageevent-interface
var messageEventList = ['MessageEvent']
var messageEventSet = new Set(messageEventList);

names = names.filter(n => !messageEventSet.has(n))

// 移除自建
names = filter('messageEventSet', 'messageEventList')
console.log(names.length) // 


// MediaCapabilities
// https://w3c.github.io/media-capabilities/#idl-index
var mediaCapabilitiesList = ['MediaCapabilities']
var mediaCapabilitiesSet = new Set(mediaCapabilitiesList);

names = names.filter(n => !mediaCapabilitiesSet.has(n))

// 移除自建
names = filter('mediaCapabilitiesSet', 'mediaCapabilitiesList')
console.log(names.length) // 

// Layout Instability API
// https://wicg.github.io/layout-instability/#sec-layout-shift
var layoutInstabilityList = ['LayoutShift', 'LayoutShiftAttribution']
var layoutInstabilitySet = new Set(layoutInstabilityList);

names = names.filter(n => !layoutInstabilitySet.has(n))

// 移除自建
names = filter('layoutInstabilitySet', 'layoutInstabilityList')
console.log(names.length) // 


// Largest Contentful Paint
// https://wicg.github.io/largest-contentful-paint/#sec-largest-contentful-paint-interface
var largestContentfulPaintList = ['LargestContentfulPaint']
var largestContentfulPaintSet = new Set(largestContentfulPaintList);

names = names.filter(n => !largestContentfulPaintSet.has(n))

// 移除自建
names = filter('largestContentfulPaintSet', 'largestContentfulPaintList')
console.log(names.length) // 

// Web Animations
// https://drafts.csswg.org/web-animations/#the-keyframeeffect-interface
var webAnimationsList = ['AnimationTimeline','DocumentTimeline', 'Animation', 'AnimationEffect', 'KeyframeEffect', 'AnimationPlaybackEvent']
var webAnimationsSet = new Set(webAnimationsList);

names = names.filter(n => !webAnimationsSet.has(n))

// 移除自建
names = filter('webAnimationsSet', 'webAnimationsList')
console.log(names.length) // 

// CSS Animations Level 1
// AnimationEvent 
// https://drafts.csswg.org/css-animations/#interface-animationevent

var cssAnimationsList = ['AnimationEvent', 'CSSKeyframeRule', 'CSSKeyframesRule']
var cssAnimationsSet = new Set(cssAnimationsList);

names = names.filter(n => !cssAnimationsSet.has(n))

// 移除自建
names = filter('cssAnimationsSet', 'cssAnimationsList')
console.log(names.length) // 


// Intersection Observer
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// https://w3c.github.io/IntersectionObserver/
var intersectionObserverList = ['IntersectionObserverEntry', 'IntersectionObserver']
var intersectionObserverSet = new Set(intersectionObserverList);

names = names.filter(n => !intersectionObserverSet.has(n))

// 移除自建
names = filter('intersectionObserverSet', 'intersectionObserverList')
console.log(names.length) // 

// CSS Font Loading Module Level 3
// https://drafts.csswg.org/css-font-loading/#fontfacesetloadevent
var cssFontLoadingList = ['FontFace', 'FontFaceSetLoadEvent']
var cssFontLoadingSet = new Set(cssFontLoadingList);

names = names.filter(n => !cssFontLoadingSet.has(n))

// 移除自建
names = filter('cssFontLoadingSet', 'cssFontLoadingList')
console.log(names.length) // 

// File API
// https://w3c.github.io/FileAPI
var fileAPIList = ['Blob', 'File', 'FileReader', 'FileList', 'BlobEvent']
var fileAPISet = new Set(fileAPIList);

names = names.filter(n => !fileAPISet.has(n))

// 移除自建
names = filter('fileAPISet', 'fileAPIList')
console.log(names.length) // 

// Feature Policy
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy
// https://w3c.github.io/webappsec-permissions-policy/#feature-policy-http-header-field
var featurePolicyList = ['FeaturePolicy']
var featurePolicySet = new Set(featurePolicyList);

names = names.filter(n => !featurePolicySet.has(n))

// 移除自建
names = filter('featurePolicySet', 'featurePolicyList')
console.log(names.length) // 

// Permissions
var permissionsList = ['Permissions', 'PermissionStatus']
var permissionsSet = new Set(permissionsList);

names = names.filter(n => !permissionsSet.has(n))

// 移除自建
names = filter('permissionsSet', 'permissionsList')
console.log(names.length) // 


// Web Speech API
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

var speechList = ['speechSynthesis', 'SpeechSynthesisErrorEvent', 'SpeechSynthesisEvent', 'SpeechSynthesisUtterance']
var speechSet = new Set(speechList);

names = names.filter(n => !speechSet.has(n))

// 移除自建
names = filter('speechSet', 'speechList')
console.log(names.length) // 

// Background Fetch
// https://wicg.github.io/background-fetch/
var backgroundFetchList = ['BackgroundFetchManager', 'BackgroundFetchRecord', 'BackgroundFetchRegistration']
var backgroundFetchSet = new Set(backgroundFetchList);

names = names.filter(n => !backgroundFetchSet.has(n))

// 移除自建
names = filter('backgroundFetchSet', 'backgroundFetchList')
console.log(names.length) // 

// Animation frames
// https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#dom-animationframeprovider-requestanimationframe
var animationFramesList = ['requestAnimationFrame', 'cancelAnimationFrame']
var animationFramesSet = new Set(animationFramesList);

names = names.filter(n => !animationFramesSet.has(n))

// 移除自建
names = filter('animationFramesSet', 'animationFramesList')
console.log(names.length) // 

// monitor
// https://developers.google.com/web/updates/2015/05/quickly-monitor-events-from-the-console-panel
// https://stackoverflow.com/questions/50666956/whats-the-monitorevents-equivalent-for-firefox
var monitorList = ['monitor', 'unmonitor', 'monitorEvents', 'unmonitorEvents']
var monitorSet = new Set(monitorList);

names = names.filter(n => !monitorSet.has(n))

// 移除自建
names = filter('monitorSet', 'monitorList')
console.log(names.length) // 

// File System Access API
// https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
// https://wicg.github.io/file-system-access/
var fileSystemAccessList = ['FileSystemHandle', 'FileSystemDirectoryHandle', 'FileSystemFileHandle', 'FileSystemWritableFileStream', 'showDirectoryPicker', 'showOpenFilePicker', 'showSaveFilePicker']
var fileSystemAccessSet = new Set(fileSystemAccessList);

names = names.filter(n => !fileSystemAccessSet.has(n))

// 移除自建
names = filter('fileSystemAccessSet', 'fileSystemAccessList')
console.log(names.length) // 


// EventTarget
// https://dom.spec.whatwg.org/#interface-eventtarget

var eventTargetList = ['EventTarget', 'Event']
var eventTargeSet = new Set(eventTargetList);

names = names.filter(n => !eventTargeSet.has(n))

// 移除自建
names = filter('eventTargeSet', 'eventTargetList')
console.log(names.length) // 

// EventSource
// https://html.spec.whatwg.org/multipage/server-sent-events.html#the-eventsource-interface

var eventSourceList = ['EventSource']
var eventSourceSet = new Set(eventSourceList);

names = names.filter(n => !eventSourceSet.has(n))

// 移除自建
names = filter('eventSourceSet', 'eventSourceList')
console.log(names.length) // 

// DecompressionStream
// https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream/DecompressionStream
// https://wicg.github.io/compression/#dom-decompressionstream-decompressionstream
var decompressionStreamList = ['CompressionStream', 'DecompressionStream']
var decompressionStreamSet = new Set(decompressionStreamList);

names = names.filter(n => !decompressionStreamSet.has(n))

// 移除自建
names = filter('decompressionStreamSet', 'decompressionStreamList')
console.log(names.length) // 


// DOMException
// https://heycam.github.io/webidl/#idl-DOMException

var DOMExceptionList = ['DOMException']
var DOMExceptionSet = new Set(DOMExceptionList);

names = names.filter(n => !DOMExceptionSet.has(n))

// 移除自建
names = filter('DOMExceptionSet', 'DOMExceptionList')
console.log(names.length) // 


// DOMError
// https://developer.mozilla.org/zh-CN/docs/Web/API/DOMError
var DOMErrorList = ['DOMError']
var DOMErrorSet = new Set(DOMErrorList);

names = names.filter(n => !DOMErrorSet.has(n))

// 移除自建
names = filter('DOMErrorSet', 'DOMErrorList')
console.log(names.length) // 


// Web Cryptography API
// https://www.w3.org/TR/WebCryptoAPI/#crypto-interface

var cryptoList = ['Crypto', 'crypto', 'CryptoKey', 'SubtleCrypto']
var cryptoSet = new Set(cryptoList);

names = names.filter(n => !cryptoSet.has(n))

// 移除自建
names = filter('cryptoSet', 'cryptoList')
console.log(names.length) // 

// Clipboard 
// https://w3c.github.io/clipboard-apis/#idl-index
var clipboardList = ['Clipboard', 'ClipboardEvent', 'ClipboardItem']
var clipboardSet = new Set(clipboardList);

names = names.filter(n => !clipboardSet.has(n))

// 移除自建
names = filter('clipboardSet', 'clipboardList')
console.log(names.length) // 

// Media Capture from DOM Elements
// https://w3c.github.io/mediacapture-fromelement/#the-canvascapturemediastreamtrack
var mcfdeList = ['CanvasCaptureMediaStreamTrack']
var mcfdeSet = new Set(mcfdeList);

names = names.filter(n => !mcfdeSet.has(n))

// 移除自建
names = filter('mcfdeSet', 'mcfdeList')
console.log(names.length) // 


// BeforeInstallPromptEvent
// https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent

var beforeInstallPromptEventList = ['BeforeInstallPromptEvent']
var beforeInstallPromptEventSet = new Set(beforeInstallPromptEventList);

names = names.filter(n => !beforeInstallPromptEventSet.has(n))

// 移除自建
names = filter('beforeInstallPromptEventSet', 'beforeInstallPromptEventList')
console.log(names.length) // 


// BatteryManager
// https://w3c.github.io/battery/#the-batterymanager-interface

var batteryManagerList = ['BatteryManager']
var batteryManagerSet = new Set(batteryManagerList);

names = names.filter(n => !batteryManagerSet.has(n))

// 移除自建
names = filter('batteryManagerSet', 'batteryManagerList')
console.log(names.length) // 


// BarProp
// https://developer.mozilla.org/en-US/docs/Web/API/BarProp
// https://html.spec.whatwg.org/multipage/window-object.html#barprop
var barPropList = ['BarProp']
var barPropSet = new Set(barPropList);

names = names.filter(n => !barPropSet.has(n))

// 移除自建
names = filter('barPropSet', 'barPropList')
console.log(names.length) // 


// offscreenBuffering
// https://docs.microsoft.com/en-us/openspecs/ie_standards/ms-html5e/705b736b-5bf1-4e55-a02e-21cace0d968f

var offscreenBufferingList = ['offscreenBuffering']
var offscreenBufferingSet = new Set(offscreenBufferingList);

names = names.filter(n => !offscreenBufferingSet.has(n))

// 移除自建
names = filter('offscreenBufferingSet', 'offscreenBufferingList')
console.log(names.length) // 


// captureEvents
var captureEventsList = ['captureEvents']
var captureEventsSet = new Set(captureEventsList);

names = names.filter(n => !captureEventsSet.has(n))

// 移除自建
names = filter('captureEventsSet', 'captureEventsList')
console.log(names.length) // 

// find
// https://developer.mozilla.org/en-US/docs/Web/API/Window/find
var findList = ['find']
var findSet = new Set(findList);

names = names.filter(n => !findSet.has(n))

// 移除自建
names = filter('findSet', 'findList')
console.log(names.length) // 

// chrome
var chromeList = ['chrome']
var chromeSet = new Set(chromeList);

names = names.filter(n => !chromeSet.has(n))

// 移除自建
names = filter('chromeSet', 'chromeList')
console.log(names.length) // 

// profile
// https://developer.mozilla.org/en-US/docs/Web/API/console/profile
// https://developer.mozilla.org/en-US/docs/Web/API/console/profileEnd
var profileList = ['profile', 'profileEnd']
var profileSet = new Set(profileList);

names = names.filter(n => !profileSet.has(n))

// 移除自建
names = filter('profileSet', 'profileList')
console.log(names.length) // 


// WebAssembly Web API.
// https://webassembly.github.io/spec/js-api/

var webAssemblyList = ['WebAssembly', 'Module', 'Instance', 'Memory', 'Table', 'Global']
var webAssemblySet = new Set(webAssemblyList);

names = names.filter(n => !webAssemblySet.has(n))

// 移除自建
names = filter('webAssemblySet', 'webAssemblyList')
console.log(names.length) // 

// Sensor APIs
// https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs
var sensorList = [
    // https://w3c.github.io/sensors/#idl-index
    'Sensor', 'SensorErrorEvent', 
    // https://w3c.github.io/accelerometer/#idl-index
    'Accelerometer', 'LinearAccelerationSensor', 'GravitySensor',
    // https://w3c.github.io/gyroscope/
    'Gyroscope', 
    // https://w3c.github.io/orientation-sensor/
    'OrientationSensor', 'AbsoluteOrientationSensor', 'RelativeOrientationSensor'

]
var sensorSet = new Set(sensorList);

names = names.filter(n => !sensorSet.has(n))

// 移除自建
names = filter('sensorSet', 'sensorList')
console.log(names.length) // 


// Keyboard
// https://wicg.github.io/keyboard-map/#idl-index
// https://wicg.github.io/keyboard-lock/#keyboard-interface
var keyboardList = [
    'KeyboardLayoutMap', 'Keyboard'
]
var keyboardSet = new Set(keyboardList);

names = names.filter(n => !keyboardSet.has(n))

// 移除自建
names = filter('keyboardSet', 'keyboardList')
console.log(names.length) // 


// Web Locks API
// https://wicg.github.io/web-locks/#api-lock

var locksList = ['LockManager', 'Lock']
var locksSet = new Set(locksList);

names = names.filter(n => !locksSet.has(n))

// 移除自建
names = filter('locksSet', 'locksList')
console.log(names.length) // 


// Worklet
// https://developer.mozilla.org/en-US/docs/Web/API/Worklet
// https://html.spec.whatwg.org/multipage/worklets.html#worklets-worklet
var workletList = ['Worklet']
var workletSet = new Set(workletList);

names = names.filter(n => !workletSet.has(n))

// 移除自建
names = filter('workletSet', 'workletList')
console.log(names.length) // 


// BarcodeDetector 
// https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector
// https://wicg.github.io/shape-detection-api/#barcode-detection-api
var barcodeDetectorList = ['BarcodeDetector', 'FaceDetector']
var barcodeDetectorSet = new Set(barcodeDetectorList);

names = names.filter(n => !barcodeDetectorSet.has(n))

// 移除自建
names = filter('barcodeDetectorSet', 'barcodeDetectorList')
console.log(names.length) // 


// Text Fragments FragmentDirective
// https://wicg.github.io/scroll-to-text-fragment/
var fragmentDirectiveList = ['FragmentDirective', '']
var fragmentDirectiveSet = new Set(fragmentDirectiveList);

names = names.filter(n => !fragmentDirectiveSet.has(n))

// 移除自建
names = filter('fragmentDirectiveSet', 'fragmentDirectiveList')
console.log(names.length) // 

// WebOTP API
// https://wicg.github.io/web-otp/#OTPCredential

var webOTPList = ['OTPCredential']
var webOTPSet = new Set(webOTPList);

names = names.filter(n => !webOTPSet.has(n))

// 移除自建
names = filter('webOTPSet', 'webOTPList')
console.log(names.length) // 


// Scheduling API
// https://github.com/WICG/scheduling-apis
// https://github.com/WICG/is-input-pending
var schedulingList = ['Scheduling']
var schedulingSet = new Set(schedulingList);

names = names.filter(n => !schedulingSet.has(n))

// 移除自建
names = filter('schedulingSet', 'schedulingList')
console.log(names.length) // 


// Web Serial API
// https://wicg.github.io/serial/

var serialList = ['Serial', 'SerialPort']
var serialSet = new Set(serialList);

names = names.filter(n => !serialSet.has(n))

// 移除自建
names = filter('serialSet', 'serialList')
console.log(names.length) // 

// Screen Wake Lock API
// https://w3c.github.io/screen-wake-lock/
var wakeLockList = ['WakeLock', 'WakeLockSentinel']
var wakeLockSet = new Set(wakeLockList);

names = names.filter(n => !wakeLockSet.has(n))

// 移除自建
names = filter('wakeLockSet', 'wakeLockList')
console.log(names.length) // 

// Custom State Pseudo Class
// https://wicg.github.io/custom-state-pseudo-class/
// https://css-tricks.com/custom-state-pseudo-classes-in-chrome/
var customStateSetList = ['CustomStateSet']
var customStateSetSet = new Set(customStateSetList);

names = names.filter(n => !customStateSetSet.has(n))

// 移除自建
names = filter('customStateSetSet', 'customStateSetList')
console.log(names.length) // 

// Event Timing API
// https://wicg.github.io/event-timing/
var eventTimingAPIList = ['EventCounts', 'PerformanceEventTiming', 'Performance']
var eventTimingAPISet = new Set(eventTimingAPIList);

names = names.filter(n => !eventTimingAPISet.has(n))

// 移除自建
names = filter('eventTimingAPISet', 'eventTimingAPIList')
console.log(names.length) // 

// Notifications API
// https://notifications.spec.whatwg.org/#api
var notificationList = ['Notification', '']
var notificationSet = new Set(notificationList);

names = names.filter(n => !notificationSet.has(n))

// 移除自建
names = filter('notificationSet', 'notificationList')
console.log(names.length) // 

// Picture-in-Picture 
// https://w3c.github.io/picture-in-picture/#event-types
var pictureInPictureList = ['PictureInPictureWindow', 'PictureInPictureEvent']
var pictureInPictureSet = new Set(pictureInPictureList);

names = names.filter(n => !pictureInPictureSet.has(n))

// 移除自建
names = filter('pictureInPictureSet', 'pictureInPictureList')
console.log(names.length) // 


// Push API
// https://developer.mozilla.org/en-US/docs/Web/API/Push_API
var pushAPIList = ['PushManager', 'PushSubscription', 'PushSubscriptionOptions']
var pushAPISet = new Set(pushAPIList);

names = names.filter(n => !pushAPISet.has(n))

// 移除自建
names = filter('pushAPISet', 'pushAPIList')
console.log(names.length) // 


// Remote Playback API
// https://developer.mozilla.org/en-US/docs/Web/API/Remote_Playback_API
// https://w3c.github.io/remote-playback/#remoteplayback-interface
var remotePlaybackList = ['RemotePlayback']
var remotePlaybackSet = new Set(remotePlaybackList);

names = names.filter(n => !remotePlaybackSet.has(n))

// 移除自建
names = filter('remotePlaybackSet', 'remotePlaybackList')
console.log(names.length) // 

// Media Playback Quality 
// https://developer.mozilla.org/en-US/docs/Web/API/VideoPlaybackQuality
// https://w3c.github.io/media-playback-quality/#videoplaybackquality-interface
var mediaPlaybackQualityList = ['VideoPlaybackQuality']
var mediaPlaybackQualitySet = new Set(mediaPlaybackQualityList);

names = names.filter(n => !mediaPlaybackQualitySet.has(n))

// 移除自建
names = filter('mediaPlaybackQualitySet', 'mediaPlaybackQualityList')
console.log(names.length) // 

// WebUI
// https://chromium.googlesource.com/chromium/src/+/HEAD/docs/webui_explainer.md
var webUIList = ['cr']
var webUISet = new Set(webUIList);

names = names.filter(n => !webUISet.has(n))

// 移除自建
names = filter('webUISet', 'webUIList')
console.log(names.length) //








// var names = Object.getOwnPropertyNames(window);
// names.filter(n => {
//     try{
//         const isNeed =  (window[n].prototype instanceof Screen)
//         return isNeed
//     } catch(err) {
//         return false
//     }
// })

var List = ['',]
var Set = new Set(List);

names = names.filter(n => !Set.has(n))

// 移除自建
names = filter('Set', 'List')
console.log(names.length) // 

