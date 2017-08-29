

// encodeURI()	encodeURIComponent()  	编码
// decodeURI()	decodeURIComponent()	解析
// 

var uri = 'http://http://localhost:8085/?module=launcher &menu=config'

// http://http://localhost:8085/?module=launcher%20&menu=config
console.log(encodeURI(uri));

// http%3A%2F%2Fhttp%3A%2F%2Flocalhost%3A8085%2F%3Fmodule%3Dlauncher%20%26menu%3Dconfig
console.log(encodeURIComponent(uri))


var uri2 = 'http://http://localhost:8085/?module=launcher%20%26menu=config'

// http://http://localhost:8085/?module=launcher %26menu=config
console.log(decodeURI(uri2));

// http://http://localhost:8085/?module=launcher &menu=config
console.log(decodeURIComponent(uri2));

// encodeURI()/decodeURI() 		只针对URL，只对链接中空格处理
// eccodeURIComponent()/decodeURIComponent()	针对所有的非字符进行编码/解析

