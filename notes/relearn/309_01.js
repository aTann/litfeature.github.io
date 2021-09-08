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
const winOList = [
    'window', 'self', 'document', 'name', 'location', 'history', 'customElement', 'locationbar', 'menubar', 'personalbar', 'scrollbars', 'statusbar', 'toolbar', 'status', 'close', 'closed', 'stop', 'focus', 'blur', // the current browsing context
    'frames', 'length', 'top', 'opener', 'parent', 'frameElement', 'open', // other browsing contexts
    'navigator', 'clientInfomation', 'originAgentCluster', // the user agent
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
const audioAPIList = ['BaseAudioContext', 'AudioContext', 'OfflineAudioContext', 'AudioBuffer', 'AudioNode', 'AudioParam', 'AudioParamMap', 'AudioScheduledSourceNode', 'AnalyserNode', 'AudioBufferSourceNode', 'AudioDestinationNode', 'AudioListener', 'AudioProcessingEvent', 'BiquadFilterNode', 'ChannelMergerNode', 'ChannelSplitterNode', 'ConstantSourceNode', 'ConvolverNode', 'DelayNode', 'DynamicsCompressorNode', 'GainNode', 'IIRFilterNode', 'MediaElementAudioSourceNode', 'MediaStreamAudioDestinationNode', 'MediaStreamAudioSourceNode', 'MediaStreamTrackAudioSourceNode', 'OscillatorNode', 'PannerNode', 'PeriodicWave', 'ScriptProcessorNode', 'StereoPannerNode', 'WaveShaperNode', 'AudioWorklet', 'AudioWorkletNode', 'OfflineAudioCompletionEvent'];

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

var styleSheetList = ['StyleSheet', 'StyleSheetList', 'CSSStyleDeclaration', 'CSSStyleSheet',]
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
}).filter(n = n !== 'indexedDB')

// 移除自建
names = filter('IDBList')
console.log(names.length) // 

// idle Cooperative Scheduling of Background Tasks
var idleList = []
names = names.filter(n => {
    const isIdle = /^idle/g.test(n)
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
var rangesList = ['Range', 'StaticRange', ' AbstractRange']
var rangesSet = new Set(rangesList);

names = names.filter(n => !rangesSet.has(n))

// 移除自建
names = filter('rangesSet', 'rangesList')
console.log(names.length) // 

// Traversal
var traversalList = ['NodeIterator', 'TreeWalker', ' NodeFilter']
var traversalSet = new Set(traversalList);

names = names.filter(n => !traversalSet.has(n))

// 移除自建
names = filter('traversalSet', 'traversalList')
console.log(names.length) // 

// Sets
var setsList = ['NodeIterator', 'TreeWalker', ' NodeFilter']
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
var otherDomList = ['DOMImplementation', 'DOMTokenList', 'CustomEvent']
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
var HTMLCollectionList = ['HTMLCollection', 'HTMLAllCollection']
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
var canvasList = ['CanvasRenderingContext2D', 'CanvasPattern', 'CanvasGradient', 'TextMetrics', 'ImageData', 'Path2D']
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
var mediaExtList = ['MediaEncryptedEvent',   'MediaKeySession', 'MediaKeyStatusMap', 'MediaKeySystemAccess', 'MediaKeys', 'MediaKeyMessageEvent']
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
var storagetList = [
   'Storage', 'StorageEvent', 'StorageManager', 'sessionStorage', 'localStorage'
]
var storagetSet = new Set(storagetList);

names = names.filter(n => !scrollOptSet.has(n))

// 移除自建
names = filter('storagetSet', 'storagetList')
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
    'HID','HIDConnectionEvent', 'HIDDevice', 'HIDInputReportEvent',
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
 var mediacaptureSet = new Set(deviceOrientationList);
 
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









// MediaList MediaCapabilities


// var names = Object.getOwnPropertyNames(window);
// names.filter(n => {
//     try{
//         const isNeed =  (window[n].prototype instanceof Screen)
//         return isNeed
//     } catch(err) {
//         return false
//     }
// })

