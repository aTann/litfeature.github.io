

// 面向对象(Object-Oriented, OO)：

// 对象 基于一个引用类型创建

// 创建自定义对象的最简单方式就是创建一个Object 的实例，然后再为它添加
// 属性和方法
// 
// 先流行对象字面量创建对象


// 属性类型：


// 创建对象：
// 工厂模式：
/*
function createPerson(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function () {
		console.log(this.name);
	}
	return o;
}

var person1 = createPerson('Nicholas', 29, 'Software Engineer');
var person2 = createPerson('Greg', 27, 'Doctor');

console.log(person1);
person1.sayName();

*/
// 函数createPerson()能够根据接受的参数来构建一个包含所有必要信息的Person对象。
// 可以无数次调用这个函数，而每次它都会返回一个包含三个属性一个方法的对象。
// 工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎么知道一个对象的类型）。
// 随着JavaScript的发展，有一个新模式出现了


// 构造函数模式：可用来创建特定类型的对象，也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。
// 

/*
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function () {
		console.log(this.name);
	}
}

var person1 = new Person('Nicholas', 29, 'Software Engineer');
var person2 = new Person('Greg', 27, 'Doctor');

console.log(person1);
person2.sayName();

*/
// 与工厂模式中的createPerson()对比：
// 1、没有显式地创建对象；
// 2、直接将属性和方法赋给了this对象；
// 3、没有return语句。

// 要创建Person的新实例，必须使用new操作符，
// 这种方式调用构造函数实际上会经历以下4步骤：
// 1）创建一个新对象；
// 2）将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
// 3）执行构造函数中的代码（为这个新对象添加属性）
// 4）返回新对象。

// person1 和 person2分别保存这个Person的一个不同的示例。
// 这个两个对象都有一个contructor(构造函数)熟悉，该属性指向Person

/*console.log(person1.constructor == Person); // true
console.log(person2.constructor == Person); // true
console.log(person1.constructor); // [Function: Person]

console.log(person1 instanceof Object); // true
console.log(person1 instanceof Person); // true*/


// 调用构造函数
// 1、当做构造函数使用
/*var person1 = new Person('Nicholas', 29, 'Software Engineer');
var person2 = new Person('Greg', 27, 'Doctor');*/


// 2、作为普通函数调用
// 浏览器下可用，nodejs不可以
// Person('Greg', 27, 'Doctor'); // 添加在window
// global.sayName();


// 3、在另一个对象的作用域中调用

/*var o = new Object();
Person.call(o, 'Kristen', 25, 'Nurse');
o.sayName();*/


// 构造函数的主要问题：每个方法都要在每个实例上重新创建一篇。



// 原型模式：

/*function Person() {
	
}

Person.prototype.name = 'Nicholas';
Person.prototype.age = 29;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function () {
	console.log(this.name);
}


var person1 = new Person();
person1.sayName(); 

var person2 = new Person();
person2.sayName()

console.log(person1.sayName == person2.sayName); // true


// obj.prototype属性 指向函数的原型对象
// 原型对象 自动 获得 constructo(构造函数)属性 包含 指向prototype属性所在函数的指针

//  person1的[[Prototype]]属性指向  Person.prototype
console.log(Person.prototype.isPrototypeOf(person1)); // true

console.log(Object.getPrototypeOf(person1) == Person.prototype); // true
console.log(Object.getPrototypeOf(person1).name); // Nicholas


var person2 = new Person();
person2.name = 'Greg';
console.log(person2.name); // Greg —— 来自示例
console.log(person1.name); // Nicholas —— 来自原型

console.log(person2.hasOwnProperty('name')); // true
console.log('name' in person2);  // true

// 使用delete完全删除person2示例的name属性，重新访问原型的属性
delete person2.name;
console.log(person2.name); // Nicholas —— 来自原型

console.log(person2.hasOwnProperty('name'));  // false
console.log('name' in person2);  // true

var o = {
	toString : function () {
		return 'My Object';
	}
};

for (let prop in o) {
	if (prop == 'toString') {
		console.log();
		console.log(prop);
		console.log('Found toString');
	}
}


var keys = Object.keys(Person.prototype);
console.log();
console.log(keys);

var p1 = new Person();
p1.name = 'Rob';
p1.age = 31;
var p1keys = Object.keys(p1);
console.log(p1keys); // [ 'name', 'age' ]*/


// 更简单的原型语法
/*function Person() {
	// body...
}*/

/*Person.prototype = {
	name : 'Nicholas',
	age : 29,
	job : 'SoftWare',
	sayName : function () {
		console.log(this.name);
	}
}

var friend = new Person();
console.log('\nfriend: ');
console.log(friend instanceof Object);		// true
console.log(friend instanceof Person);		// true
console.log(friend.constructor == Person);	// false
console.log(friend.constructor == Object); 	// true*/

// constructor 设置回原来的值
/*Person.prototype = {
	constructor : Person,
	name : 'Nicholas',
	age : 29,
	job : 'SoftWare',
	sayName : function () {
		console.log(this.name);
	}
}
var friend = new Person();
console.log('\nfriend: ');
console.log(friend.constructor == Person);	// true



// 原型的动态性
Person.prototype.sayHi = function () {
	console.log('Hi!');
}

friend.sayHi();  // Hi!*/


// 请记住：实例中的指针仅指向原型，而不指向构造函数。
// 重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系；它
// 们引用的仍然是最初的原型。
/*function Person() {
}

var friend = new Person();

Person.prototype = {
	constructor: Person,
	name : "Nicholas",
	age : 29,
	job : "Software Engineer",
	sayName : function () {
		alert(this.name);
	}
};

// friend.sayName(); // friend.sayName is not a function


// 原生对象的原型
// 通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新方法。可以像修改自
// 定义对象的原型一样修改原生对象的原型，因此可以随时添加方法

// 下面的代码就给基本包装类型String 添加了一个名为startsWith()的方法。
String.prototype.startWith = function (text) {
	return this.indexOf(text) == 0;
}
var msg = "Hello world!";
console.log(msg.startsWith("Hello")); //true

// 原型对象的问题

function Person() {
}

Person.prototype = {
	constructor: Person,
	name : "Nicholas",
	age : 29,
	job : "Software Engineer",
	friends : ['Shelby', 'Court'],
	sayName : function () {
		alert(this.name);
	}
};


var person1 = new Person();
var person2 = new Person();

person1.friends.push('Van');

console.log(person1.friends); // [ 'Shelby', 'Court', 'Van' ]
console.log(person2.friends); // [ 'Shelby', 'Court', 'Van' ]
console.log(person1.friends == person2.friends); 	// true*/


// 组合使用构造函数模式和原型模式
// 创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。
// 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。
// 结果，每个示例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，
// 最大限度地节省了内存。
// 另外，这种混成模式还支持向构造函数传递参数；可谓是集两种模式之长。
// 
/*
function Person(name, age, job) {
	this.name = name;
	this.name = age;
	this.job = job;
	this.friends = ['Shelby', 'Court'];
}

Person.prototype = {
	constructor : Person,
	sayName : function () {
		console.log(this.name);
	}
}

var person1 = new Person('Nicholas', 29, 'Software Engineer');
var person2 = new Person('Greg', 27, 'Dortor');

person1.friends.push('Van');
console.log(person1.friends);		// [ 'Shelby', 'Court', 'Van' ]
console.log(person2.friends);		// [ 'Shelby', 'Court' ]
console.log(person1.friends === person2.friends);  	// false
console.log(person1.sayName === person2.sayName);	// true

*/
// 动态原型模式

/*function Person(name, age, job) {
	
	// 属性
	this.name = name;
	this.age = age;
	this.job = job;

	// 方法
	if (typeof this.sayName != 'function') {
		Person.prototype.sayName = function() {
			console.log(this.name);
		}
	}
}

var friend = new Person('Nicholas', 29, 'Software Engineer');
friend.sayName();

*/


// 寄生构造函数模式
// 基本思想：创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象；但
// 从表面上看，这个函数又很像是典型的构造函数。
/*
function Person(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function () {
		console.log(this.name);
	};

	return o;
}

var friend = new Person('Nicholas', 29, 'Software Engineer');
friend.sayName();	// Nicholas
// 这个模式可以在特殊的情况下用来为对象创建构造函数。

function SpecialArray() {
	
	// 创建数组
	var values = new Array();

	// 添加值
	values.push.apply(values, arguments);

	// 添加方法
	values.toPipedString = function () {
		return this.join('|');
	}

	// 返回数组
	return values;
}

var colors = new SpecialArray('red', 'blue', 'green');
console.log(colors.toPipedString());  // red|blue|green

*/



// 稳妥构造函数模式
// 稳妥对象(durable object)

function Person(name, age, job) {
	// 创建要返回的对象
	var o = new Object();

	// 可以在这里定义私有变量和函数

	// 添加方法
	o.sayName = function () {
		console.log(name);
	}

	// 返回对象
	return o;
}

var friend = Person('Nicholas', 29, 'Software Engineer');
friend.sayName(); 	// Nicholas


// 继承
// 原型链
