// 1、打乱顺序，可以将得到的序列号和随机产生的进行互换

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/*
var indexArr = [];
for (var i = 0; i < 10; i++) {
	indexArr[i] = Math.floor(Math.random() * 10);
}
console.log(indexArr);

// 数组乱序，
// 利用随机产生与原数列长度相等的随机数组
// 将随机数组值作为原数组下的索引得到值 和 当前位置的数组值进行互换
// 例子：
// 		 数组：1、2、3
//   随机数组：1、0、1 
// 乱序后数组：1、3、2
// 			0) 1 2 3
// 				1）2 1 3
// 					2）1 2 3
// 						3）1 3 2
// 

function exchangeArrIndex(arr, indexArr) {
	var afterArr = arr;
	for (var i = 0, len = afterArr.length; i < len; i++) {
		let swap = afterArr[indexArr[i]];
		afterArr[indexArr[i]] = afterArr[i];
		afterArr[i] = swap;
	}
	return afterArr;
}
console.log(arr);
console.log(exchangeArrIndex(arr, indexArr));
*/


// 方案2：随机产生一组 不重复的 索引，将数组 按照 随机索引 进行重排
var rmIndex = [];
var ct = 0;
while (rmIndex.length < arr.length) {
	let indexRm = Math.floor(Math.random() * arr.length);
	// 过滤重复的 索引
	if (rmIndex.indexOf(indexRm) == -1) {
		rmIndex.push(indexRm);
	}
	ct++;
}

console.log(ct);
console.log(rmIndex);

// var newArr = [];

var newArr = new Array(arr.length);

for (var i = 0; i < arr.length; i++) {
	newArr[i] = arr[rmIndex[i]];
}

console.log(newArr);
newArr = newArr.map(function (item, index, arr) {
	return item + 1;
})
console.log(arr);
console.log(newArr);


// console.log(new Array(arr.length));
// console.log(new Array());




