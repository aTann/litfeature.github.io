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
    'MediaStream', 'MediaStreamEvent', 'MediaStreamTrack', 'MediaStreamTrackEvent', 'OverconstrainedError', 'InputDeviceInfo', 'ConstrainablePattern'
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
var IDBList = []
names = names.filter(n => {
    const isIDB = /^IDB/g.test(n)
    isIDB && IDBList.push(n)
    return !isIDB
})

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

// var names = Object.getOwnPropertyNames(window);
// names.filter(n => {
//     try{
//         const isNeed =  (window[n].prototype instanceof Screen)
//         return isNeed
//     } catch(err) {
//         return false
//     }
// })

