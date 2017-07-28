

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
/*
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

*/
// 继承
// 原型链

// 基本模式
// 
/*function SuperType() {
	this.property = true;
}

SuperType.prototype.getSuperValue = function () {
	return this.property;
};

function SubType() {
	this.subproperty = false;
}*/

// 继承了SuperType
/*SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
	return this.subproperty;
}

SubType.prototype.getSub = function () {
	return this.getSuperValue();
}

var instance = new SubType();
console.log(instance.getSubValue());	// false
console.log(instance.getSuperValue()); // true
console.log(instance.getSub());		// true
console.log(instance.property); // true
console.log(instance.subproperty); // false

console.log(instance.constructor)  // [Function: SuperType]  因改写过指向 SuperType
console.log();
*/

// 确定原型和实例的关系
// 1、instanceof 确认
/*
console.log(instance instanceof Object);		// true
console.log(instance instanceof SuperType);		// true
console.log(instance instanceof SubType);		// true
console.log();
*/

// 2、isPrototypeOf()
/*
console.log(Object.prototype.isPrototypeOf(instance)); 		// true
console.log(SuperType.prototype.isPrototypeOf(instance));	// true
console.log(SubType.prototype.isPrototypeOf(instance));		// true
console.log();

*/

// 谨慎地定义方法
// 给原型添加方法的代码一定要放在替换原型语句之后
/*
function SuperType() {
	this.property = true;
}

SuperType.prototype.getSuperValue = function () {
	return this.property;
};

function SubType() {
	this.subproperty = false;
}

// 继承前重写，被继承后的超类的同名方法覆盖，也会被重写后的同名方法覆盖
SubType.prototype.getSuperValue = function () {
	return 2;
}

// 继承了SuperType
SubType.prototype = new SuperType();

// 添加新方法
SubType.prototype.getSubValue = function () {
	return this.subproperty;
}

// 重写超类型中的方法
// 在子类中重写超类型中的方法
SubType.prototype.getSuperValue = function () {
	return false;
}

var instance = new SubType();
console.log(instance.getSuperValue());	// false

var supInstance = new SuperType();
console.log(supInstance.getSuperValue());	// true*/


// 使用字面量添加新方法，会导致继承失败，原型链被切开
/*
function SuperType() {
	this.property = true;
}

SuperType.prototype.getSuperValue = function () {
	return this.property;
};

function SubType() {
	this.subproperty = false;
}


// 继承了SuperType
SubType.prototype = new SuperType();

// 添加新方法
SubType.prototype = {
	getSubValue : function () {
		return this.subproperty;
	},

	someOtherMethod : function () {
		return false;
	}
}



var instance = new SubType();
// console.log(instance.getSuperValue());	// TypeError: instance.getSuperValue is not a function

*/


// 原型链的问题
/*
function SuperType() {
	this.colors = ['red', 'blue', 'green'];
}

function SubType() {
}

// 继承了SuperType
SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors);	// [ 'red', 'blue', 'green', 'black' ]

var instance2 = new SubType();
console.log(instance2.colors);	// [ 'red', 'blue', 'green', 'black' ]

console.log(SuperType.prototype.isPrototypeOf('instance1')); // false
console.log(SubType.prototype);  	// SuperType { colors: [ 'red', 'blue', 'green', 'black' ] }
*/


// 借用构造函数 --函数无法复用
// 函数不过是在特定环境中执行代码的对象
// 通过使用apply() 和 call()在新创建的对象上执行构造函数
/*function SuperType() {
	this.colors = ['red', 'blue', 'green'];
}

function SubType() {
	// 继承了SuperType，
	// 防止包含引用类型，引起的原型链实例全共享问题
	// 借用构造函数(constructor stealing)
	SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors);		// [ 'red', 'blue', 'green', 'black' ]

var instance2 = new SubType();
console.log(instance2.colors);		// [ 'red', 'blue', 'green' ]

console.log(SubType.prototype);	// SubType {}
*/

// 传递参数
/*function SuperType(name) {
	this.name = name;
}

function SubType() {
	// 继承了SuperType，同时还传递了参数(构造函数优势)
	SuperType.call(this, 'Nicholas');

	// 实例属性
	this.age = 29;
}

var instance = new SubType();
console.log(instance.name);		// Nicholas
console.log(instance.age);		// 29
*/


// 组合继承(combination inheritance)
// 原型链和构造函数技术组合
// 实现函数复用
// 保证每个实例都有它自己的属性
/*
function SuperType(name) {
	this.name = name;
	this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function () {
	console.log(this.name);
}

function SubType(name, age) {
	// 利用构造函数继承属性
	SuperType.call(this, name);

	// 实例属性
	this.age = age;
}

// 利用原型继承方法
SubType.prototype = new SuperType();
// console.log(SubType.prototype.constructor);		// [Function: SuperType]

// SubType.prototype.constructor = SubType;	// 为什么要重置构造函数呢？

SubType.prototype.sayAge = function () {
	console.log(this.age);
}

var instance1 = new SubType('Nicholas', 29);
instance1.colors.push('black');
console.log(instance1.colors);	// [ 'red', 'blue', 'green', 'black' ]
instance1.sayName();	// Nicholas
instance1.sayAge();		// 29

var instance2 = new SubType('Greg', 27);
console.log(instance2.colors);	// [ 'red', 'blue', 'green' ]
instance2.sayName();	// Greg
instance2.sayAge();		// 27

*/


// 原型式继承
// 借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。


function object(o) {
	// 创建临时性的构造函数
	function F() { }
	// 传入对象作为这个构造函数的原型
	F.prototype = o;
	// 返回这个临时类型的一个新实例
	return new F();
	// object()对传入其中的对象执行了一次浅复制
}



var person = {
	name : 'Nicholas',
	friends : ['Shelby', 'Court', 'Van']
};

/*var anotherPerson = object(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

var yetAnotherPerson = object(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Barbie');

console.log(person.friends);	// [ 'Shelby', 'Court', 'Van', 'Rob', 'Barbie' ]

*/

// ES5 Object.create()方法
/*
var anotherPerson = Object.create(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Baribie');

console.log(person.friends);	// [ 'Shelby', 'Court', 'Van', 'Rob', 'Baribie' ]
*/

// 寄生式继承
/*
function createAnother(original) {
	var clone = object(original);	// 通过调用函数创建一个新对象
	clone.sayHi = function () {		// 以某种方式来增强这个对象
		console.log('Hi');
	}
	return clone;	// 返回对象
}

var person = {
	name : 'Nicholas',
	friends : ['Shelby', 'Court', 'Van']
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi();	// Hi

// 主要考虑对象而不是自定义类型和构造函数
// 不能做到函数复用而降低效率（和构造函数模式类似）
*/

// 寄生组合式继承
// 组合继承：无论什么情况下，都会调用两次超类型构造函数，
// 一次是在创建子类原型的时候，
// 另一次是在子类型构造函数内部
/*
function SuperType(name) {
	this.name = name;
	this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function () {
	console.log(this.name);
};

function SubType(name, age) {
	// 继承属性
	SuperType.call(this, name);		// 第二次调用SuperType()

	this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();	// 第一次调用SuperType()
// console.log(SubType.prototype.constructor);		// [Function: SuperType]
SubType.prototype.constructor = SubType;	// 抛弃原型链式继承属性，但是测试有没有一个样子啊？
// console.log(SubType.prototype.constructor);		// [Function: SubType]
SubType.prototype.sayAge = function () {
	console.log(this.age);
};

var friend1 = new SubType('Nicholas', 20);
friend1.colors.push('black');
console.log(friend1.colors);	// [ 'red', 'blue', 'green', 'black' ]

var friend2 = new SubType();
console.log(friend2.colors);	// [ 'red', 'blue', 'green' ]

// console.log(SuperType.prototype.isPrototypeOf(SubType));	// false
// console.log(SubType.prototype.constructor);		// [Function: SuperType]
*/


// 所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
// 背后的基本思想：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。
// 本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。
// 寄生组合式继承的基本模式如下所示：
function inheritPrototype(subType, superType) {
	var prototype = object(superType.prototype);	// 创建对象
	prototype.constructor = subType;	// 增强对象
	subType.prototype = prototype;		// 指定对象
}

function SuperType(name) {
	this.name = name;
	this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function () {
	console.log(this.name);
};

function SubType(name, age) {
	SuperType.call(this, name);

	this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
	console.log(this.age);
}

var friend = new SubType('Nicholas', 29);
friend.colors.push('black');
friend.sayName();
friend.sayAge();
console.log(friend.colors);

var instance = new SubType('Greg', 27);
instance.sayName();
instance.sayAge();
console.log(instance.colors);

console.log(SuperType.prototype.isPrototypeOf(SubType));	// false
console.log(SubType.prototype); // SubType { constructor: [Function: SubType], sayAge: [Function] }

console.log(Object.prototype.isPrototypeOf(instance));	// true
console.log(SuperType.prototype.isPrototypeOf(instance));	// true
console.log(SubType.prototype.isPrototypeOf(instance));	// true

console.log(friend instanceof SubType);	// true
