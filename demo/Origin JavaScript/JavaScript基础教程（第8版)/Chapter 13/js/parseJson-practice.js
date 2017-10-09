

// Note - JSON.parse can tie up the current thread because it is a synchronous method. 
// So if you are planning to parse big JSON objects use a streaming json parser.
// JSON.parse 是一个同步的操作，当它运行的时候会占用当前的进程，如果你想解析一个大型的JSON请使用一个流JSON解析方案

var fs = require('fs');
var data_json;
fs.readFile('../b.json', 'utf8', function (err, data) {				// 使用fs.readFile 异步操作
	if(err) throw err;

	// console.log(data[4])  // {   data是一个纯粹的字符流

	data_json = JSON.parse(data);		// 这是一个同步操作
	// // JSON建构有两种：
	// // 1、key/value 集合("键值对" {key, value}) 
	// // 2、有序序列("数组" [] )
	
	// console.log(data_json.length);
	// console.log(data_json[1].term);

	// 
	// for (var i = 0; i < data_json.length; i++) {
	// 	console.log(data_json[i].term);
	// }

	// 得到的idata是一个索引
	// for (var idata in data_json) {
	// 	console.log(data_json[idata].term);
	// }


	var term = data_json.map(function (item, index, input) {
		// item 就是一个个子项目
		// index 数组索引
		// input 就是输入的项，就是data_json
		// console.log(item.term);
	});

	var term = data_json.map(function (obj) {
		// 得到一个个子项目
		// console.log(obj.term);
	});

	var term = data_json.map(function (item, index) {
		// item 就是一个个子项目
		// index 数组索引
		if (item.term === 'BACKBITE') {
			console.log(item);
		}
		
	});



	

});



// 使用fs.readFile同步版本
// var obj = fs.readFile('../b.json', 'utf8');


// var parseJSON = require('../b.json');		// require也是一个同步的操作，同时只读取一次文件
// console.log(parseJSON);



// var json_b = JSON.parse('[1, 5, "false"]', (key, value) =>{
// 				console.log(Object.prototype.toString.call('[1, 5, "false"]'));
// 				});


// console.log(json_b);



// 循环

// JavaScript 支持不同类型的循环：

//     for - 循环代码块一定的次数
//     for/in - 循环遍历对象的属性
//     while - 当指定的条件为 true 时循环指定的代码块
//     do/while - 同样当指定的条件为 true 时循环指定的代码块


// 关于fs
// Scott Robinson - Read Files with Node.js
// http://stackabuse.com/read-files-with-node-js/

// There are two ways you can open and read a file using the fs module:
// Load all of the contents at once (buffering)
// Incrementally load contents (streaming)








