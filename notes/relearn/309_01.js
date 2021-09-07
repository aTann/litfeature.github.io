var names = Object.getOwnPropertyNames(window);
var filter = (...args) => names.filter(n => !args.includes(n))
console.log(names.length) // 1017
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
filter('names', 'globalOList', 'globalOListSet')

console.log(names.length) // 962

// DOM 中的元素构造器
const nodes = ['Node']
names = names.filter(n => {
    try{
        const isNode =  !(window[n].prototype instanceof Node)
        !isNode&&nodes.push(n)
        return isNode
    } catch(err) {
        return true
    }
}).filter(n => n != 'Node')

// 移除自建
filter('nodes')

console.log(names.length) // 803

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
filter('winOList', 'winOSet')

console.log(names.length) // 768

const evtList = []
// 移除事件属性
names = names.filter(n => {
    const isEvt = /^on/.test(n)
    isEvt && evtList.push(n)
    return !isEvt
})

// 移除自建
filter('evtList')

console.log(names.length) // 660

// webkit 前缀的私有属性
var wibkitList = []
// 移除事件属性
names = names.filter(n => {
    const isWebkit = /^[wW]eb[kK]it/.test(n)
    isWebkit && wibkitList.push(n)
    return !isWebkit
})

// 移除自建
filter('wibkitList')

console.log(names.length) // 647

// Audio API
const audioAPIList = ['BaseAudioContext','AudioContext','OfflineAudioContext','AudioBuffer','AudioNode','AudioParam','AudioScheduledSourceNode','AnalyserNode','AudioBufferSourceNode','AudioDestinationNode','AudioListener','AudioProcessingEvent','BiquadFilterNode','ChannelMergerNode','ChannelSplitterNode','ConstantSourceNode','ConvolverNode','DelayNode','DynamicsCompressorNode','GainNode','IIRFilterNode','MediaElementAudioSourceNode','MediaStreamAudioDestinationNode','MediaStreamAudioSourceNode','MediaStreamTrackAudioSourceNode','OscillatorNode','PannerNode','PeriodicWave','ScriptProcessorNode','StereoPannerNode','WaveShaperNode','AudioWorklet', 'OfflineAudioCompletionEvent'];

var audioAPISet = new Set(audioAPIList);

names = names.filter(n => !audioAPISet.has(n))

// 移除自建
filter('audioAPIList', 'audioAPISet')

console.log(names.length) // 615

var mediaStreamList = [
    ' MediaStream', 'MediaStreamEvent', 'MediaStreamTrack', 'MediaStreamTrackEvent', 'OverconstrainedError', 'InputDeviceInfo', 'ConstrainablePattern'
    ];

var mediaStreamSet = new Set(mediaStreamList);

names = names.filter(n => !mediaStreamSet.has(n))

// 移除自建
filter('mediaStreamList', 'mediaStreamSet')

console.log(names.length) // 608

// web RTC
var RTCList = []
names = names.filter(n => {
    const isRTC = /^RTC/g.test(n)
    isRTC && RTCList.push(n)
    return !isRTC
})

// 移除自建
filter('RTCList')

console.log(names.length) // 593

// Intl 国际化

var intlList = ['Intl']
var intlSet = new Set(intlList);

names = names.filter(n => !intlSet.has(n))

// 移除自建
filter('intlList', 'intlSet')

console.log(names.length) // 592

// CSSRule 
var CSSRuleAPIList = ['CSSRule', 'CSSRuleList']
names = names.filter(n => {
    try{
        const isCSSRule =  (window[n].prototype instanceof CSSRule)
        isCSSRule&&CSSRuleAPIList.push(n)
        return !isCSSRule
    } catch(err) {
        return true
    }
}).filter(n => n != 'CSSRule' && n != 'CSSRuleList')

// 移除自建
filter('CSSRuleAPIList')
console.log(names.length) // 580

// CSSStyleValue
var CSSStyleValueAPIListOther = ['CSSStyleValue', 'CSSNumericArray']
var CSSStyleValueAPIList = ['CSSStyleValue']
names = names.filter(n => {
    try{
        const isCSSStyleValue =  (window[n].prototype instanceof CSSStyleValue) || 
                                 (window[n].prototype && (window[n].prototype.prototype  instanceof CSSStyleValue));
        isCSSStyleValue&&CSSStyleValueAPIList.push(n)
        return !isCSSStyleValue
    } catch(err) {
        return true
    }
}).filter(n => n != 'CSSStyleValue' )

// 移除自建
filter('CSSStyleValueAPIListOther', 'CSSStyleValueAPIList')
console.log(names.length) // 564
