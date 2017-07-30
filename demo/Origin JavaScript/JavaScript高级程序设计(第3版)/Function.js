// 
// 

/*
var fac = function factorial(num) {
	if (num <= 1) {
		return 1;
	} 
	return num * factorial(num - 1);
};

var anotherFactorial = fac;
fac = null;
// 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
console.log(anotherFactorial(4));
*/

/*
// 但这是命名函数表达式，没有函数声明提升效果

var fac = function factorial(num) {
	if (num <= 1) {
		return 1;
	} 
	return num * factorial(num - 1);
};
*/

/*// 
function createComparisonFunction(propertyName) {
	return function (object1, object2) {
		var value1 = object1[propertyName];	// 访问函数外部变量propertyName
		var value2 = object2[propertyName];	// 访问函数外部变量propertyName

		if (value1 < value2) {
			return -1;
		} else if (value1 > value2) {
			return 1;
		} else {
			return 1;
		}
	}
}
*/

/*
// 创建函数
var compareName = createComparisonFunction('name');

// 调用函数
var result = compareName({name: 'Nicholas'}, {name: 'Greg'});


// 解除对匿名函数的引用(以便释放内存)
compareName = null;

*/
// 闭包只能取得包含函数中任何变量的最后一个值
/*因为每个函数的作用域链中
都保存着createFunctions() 函数的活动对象， 所以它们引用的都是同一个变量i 。当
createFunctions()函数返回后，变量i 的值是10，此时每个函数都引用着保存变量i 的同一个变量
对象，所以在每个函数内部i 的值都是10。*/

/*function createFunctions() {
	var result = new Array();

	for (var i = 0; i < 10; i++) {
		result[i] = function () {
			return i;
		}
	}

	return result;
}

var arr = createFunctions();
for (var i = 0; i < 10; i++) {
	console.log(arr[i]());	// 都是10
}
*/

/*
function createFunctions() {
	var result = new Array();

	for (var i = 0; i < 10; i++) {
		result[i] = function (num) {
			return function () {
				return num;
			};
		}(i);
	}

	return result;
}

var arr = createFunctions();
for (var i = 0; i < 10; i++) {
	console.log(arr[i]())
}
// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
*/

// 匿名函数的执行环境具有全局性，this对象指向window/global
/*
var name = 'The Window';

var object = {
	name : 'My Object',

	getNameFunc : function () {
		return function () {
			return that.name;
		};
	}
};

// 闭包之下，多个括号
console.log(object.getNameFunc()()); // (严格模式下)TypeError: Cannot read property 'name' of undefined
*/

var name = 'The Window';

var object = {
	name : 'My Object',

	getNameFunc : function () {
		
		var that = this;

		return function () {
			return that.name;
		};

	}
};

// 闭包之下，多个括号
console.log(object.getNameFunc()()); // My Object

// 内存泄露
function assignHander() {
	var element = document.getElementById('someElement');
	element.onclick = function () {		// 形成闭包
		console.log(element.id);	// 循环引用
	}
}

/*由于匿名函数保存了一个对assignHandler()的活动对象的引用（element），因此
就会导致无法减少element 的引用数。只要匿名函数存在，element 的引用数至少也是1，因此它所
占用的内存就永远不会被回收。*/

// 改写：
// 
function assignHander() {
	var element = document.getElementById('someElement');
	
	var id = element.id;	// 副本保存
	
	element.onclick = function () {		// 形成闭包
		console.log(id);	// 闭包引用副本保存的变量，消除循环引用
	};

	element = null;		// 解除对DOM对象的引用，顺利减少其引用数，确保正常回收其占用的内存
}


// 模仿块级作用域

// 块语句定义变量，实际上包含在函数中
/*function outputNumbers(count) {
	for (var i = 0; i < count; i++) {
		console.log(i);
	}
	var i;	// 尝试错误地，重新声明变量，不会改变 i 的值
	console.log(i);
};

outputNumbers(2);*/
/*0
1
2*/

/*function outputNumbers(count) {
	(function () {
		for (var i = 0; i < count; i++) {
			console.log(i);
		}
		var i;	
	})();

	console.log(i);		// i is not defined
};

outputNumbers(2);*/

/*// ES6  let：块级定义符
function outputNumbers(count) {
	for (let i = 0; i < count; i++) {
		console.log(i);
	}
	
	console.log(i);	 // i is not defined
};
outputNumbers(2);
*/

(function () {
	var now = new Date();
	if (now.getMonth() == 0 && now.getDate() == 1) {
		console.log('Happy new year!');
	}
})();



