

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


eval('console.log("eval()")')


// 1、打乱顺序，可以将得到的序列号和随机产生的进行互换
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var indexArr = [];
for (var i = 0; i < 10; i++) {
	// console.log(Math.floor(Math.random() * 10 + 1));
	indexArr[i] = Math.floor(Math.random() * 10);
}
console.log(indexArr);

function exchangeArrIndex(arr, indexArr) {
	for (var i = 0; i < arr.length; i++) {
		let swap = arr[indexArr[i]];
		arr[indexArr[i]] = arr[i];
		arr[i] = swap;
	}
	return arr;
}


// console.log(exchangeArrIndex(arr, indexArr));
var rmIndex = [];
var ct = 0;
while (rmIndex.length < arr.length) {
	let indexRm = Math.floor(Math.random() * arr.length);
	if (rmIndex.indexOf(indexRm) == -1) {
		rmIndex.push(indexRm);
	}
	++ct;
}

console.log(ct);
console.log(rmIndex);

var newArr = new Array(arr.length);
for (var i = 0; i < arr.length; i++) {
	newArr[i] = arr[rmIndex[i]];
}
console.log(newArr);
