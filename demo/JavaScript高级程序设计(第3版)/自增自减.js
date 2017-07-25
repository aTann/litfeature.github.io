/*********
*
* i-- : 先输出i，在进行 i = i - 1 操作
* console.log(i); || i;
* i = i - 1;
*
* --i : i = i - 1, 输出i
* i = i - 1;
* console.log(i); || i;
*
* i++/--i : 类似以上
*
*********/
/*
var i = 10;
// console.log(--i);

var j = --i + 10;
console.log(j);
console.log(i);

j = i + 10;
console.log(j);


console.log('\n\n\n');


var m = 10;
// console.log(m--);

var n = m-- + 10;

console.log(n);
console.log(m);

n = m + 10;
console.log(n);


console.log('\n\n');
console.log(2 + 'z'); // 2z*/



var obj = new Object();
obj.i = 20;
console.log(obj.i);


function addTest(obj) {
	obj.i = obj.i + 1;
	obj.j = 3;
	return obj;
}

console.log(addTest(obj));
console.log(obj.i)

console.log(typeof(obj)); // object // 引用类型传递，引用方式传递

console.log(typeof(obj.i)); // number // 当传递这个进去时候，相对于传递一个基本类型，值复制传递


function setName(obj){
	obj.name = 'Nicholas';
}
var person = new Object();
setName(person);
console.log(person);

// 

function setName2(obj){
	obj.name = 'Nicholas';
	obj = new Object();		// 用一个新对象赋给obj，其实在函数里面再次复制，此处的obj是一个局部变量，函数结束就被销毁
	obj.name = 'Greg';	// name属性值为Greg
}

var person2 = new Object();
setName(person2);
console.log(person2);






