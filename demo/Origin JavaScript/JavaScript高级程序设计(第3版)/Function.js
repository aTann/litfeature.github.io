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

// 私有变量：函数的参数、局部变量和函数内部定义的其他函数
// 任何在函数中定义的变量
/*
function add(num1, num2) {
	var sum = num1 + num2;
	return sum;
}

// add()：私有变量 num1, num2, sum
*/
// 闭包，特权方法，访问私有变量的共有方法

// 在构造函数中定义特权方法
/*function MyObject() {
	// 私有变量和私有函数
	var privateVariable = 10;

	function privateFunction() {
		return false;
	}

	// 特权方法
	this.publicMethod = function () {
		privateVariable ++;
		return privateFunction();
	}
}

var obj = new MyObject();
console.log(obj.publicMethod());
// console.log(obj.privateVariable);	// undefined
*/

// 利用私有和特权成员，可以隐藏那些不应该被直接修改的数据
/*function Person(name) {
	this.getName = function () {
		return name;
	};

	this.setName = function (value) {
		name = value;
	}


}

var person = new Person('Nicholas');
console.log(person.getName());
person.setName('Greg');
console.log(person.getName());
*/

// 静态私有变量
/*// 
var MyObject;		// 事先创建全局变量
(function () {
	
	// 私有变量和私有函数
	var privateVariable = 10;

	function privateFunction() {
		return false;
	};

	// 构造函数，未用var声明，初始化未经声明的变量，总会创建一个全局变量，
	// 在严格模式会出错
	MyObject = function () {
		
	};

	// 原型上定义方法，所有实例可共享
	MyObject.prototype.publicMethod = function () {
		privateVariable ++;
		return privateFunction();
	}

})();

var myobj = new MyObject();
console.log(myobj.publicMethod());
*/

/*
(function () {
	var name = '';

	Person = function (value) {
		name = value;
	};
	// 因为使用原型而增进代码复用
	Person.prototype.getName = function () {
		return name;
	};

	Person.prototype.setName = function (value) {
		name = value;
	};
})();

var Person;	// Person is not defined

var person1 = new Person('Nicholas');
console.log(person1.getName()); 	// Nicholas
person1.setName('Greg');
console.log(person1.getName());		// Greg

var person2 = new Person('Michael');
// 但每个实例都没有自己的私有变量
console.log(person1.getName());		// Michael
console.log(person2.getName());		// Michael
*/


// 模块模式：为单例创建私有变量和特权方法
// 单例：只有一个实例的对象
// 惯例：以对象字面量的方式来创建单例对象
/*
var singleton = {
	name : value,
	method : function () {
		// 这个是方法的代码
	}
}
*/

// 为单例添加私有变量和特权方法
/*var singleton = function () {
	
	// 私有变量和私有函数
	var privateVariable = 10;

	function privateFunction() {
		return false;
	}

	// 特权/公有方法和属性
	return {
		publicProperty : true,

		publicMethod : function () {
			privateVariable ++;
			return privateFunction();		
		}
	};
}();

console.log(singleton.publicProperty);
console.log(singleton.publicMethod());
*/

// 对单例进行某些初始化，同时又需要维护其私有变量时非常有用的。
/*
var application = function () {
	
	// 私有变量和函数
	var components = new Array();

	// 初始化
	components.push(new BaseComponent());

	// 公共
	return {
		getComponentsCount : function () {
			return components.length;	
		},

		registerComponents : function (components) {
			if (typeof components == 'object') {
				components.push(components);
			}
		}
	};

}();
*/

// 增强的模块模式
// 
var singleton = function () {
	
	// 私有变量和私有函数
	var privateVariable = 10;

	function privateFunction() {
		return false;
	}

	// 创建对象
	var object = new CustomType();

	// 添加特权/公有属性和方法
	object.publicProperty = true;
	object.publicMethod = function () {
		privateVariable ++;
		return privateFunction();	
	};

	// 返回这个对象
	return object;
}

// 如果前面演示模块模式的例子中的application 对象必须是BaseComponent 的实例，那么就可
// 以使用以下代码。

var application = function () {
	
	// 私有变量和函数
	var components = new Array();

	// 初始化
	components.push(new BaseComponent());

	// 创建application的一个局部副本
	var app = new BaseComponent();

	// 公共接口
	app.getComponentsCount = function () {
		return components.length;
	};

	app.registerComponents = function (components) {
		if (typeof components == 'object') {
			components.push(components);
		}
	};

	// 返回这个副本
	return app;

}();


