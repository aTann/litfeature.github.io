
// 由链接触发翻转器

window.onload = rolloverInit;

function rolloverInit() {
	for (var i = 0; i < document.links.length; i++) {
		var linkObj = document.links[i];
		if (linkObj.id) {
			var imgObj = document.getElementById(linkObj.id + 'Img');
			if (imgObj) {
				setupRollover(linkObj, imgObj);
			}
		}
	}
}

function setupRollover(thisLink, thisImage) {
	thisLink.imgToChange = thisImage;
	thisLink.onmouseout = function () {
		// this是thisLink
		this.imgToChange.src = this.outImage.src;
	};

	thisLink.onmouseover = function () {
		this.imgToChange.src = this.overImage.src;
	};

	thisLink.outImage = new Image();
	thisLink.outImage.src = thisImage.src;

	thisLink.overImage = new Image();
	thisLink.overImage.src = 'images/' + thisLink.id + '_on.gif';


};



// this的作用域，以及this应该什么时候用
// 什么时候用声明，什么时候不用声明，不用声明的好处和不足？
// 在一个函数里面没有声明，表示是一个属性了？可以在该函数内，任意调用？
// 
// 函数为什么可以在使用之后再写声明：
// 
// 函数声明会在任何表达式被解析和求值之前先被解析和求值，
// 即使你的声明在代码的最后一行，
// 它也会在同作用域内第一个表达式之前被解析/求值
// 汤姆大叔 - 深入理解JavaScript系列（2）：揭秘命名函数表达式
// http://www.cnblogs.com/TomXu/archive/2011/12/29/2290308.html
// 
// 因为，根据规范函数声明是在当进入上下文时填入的； 
// 
// http://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html


// 函数声明和函数表达式：

// 在ECMAScript中，创建函数的最常用的两个方法是函数表达式和函数声明，
// 两者期间的区别是有点晕，因为ECMA规范只明确了一点：
// 函数声明必须带有标示符（Identifier）（就是大家常说的函数名称），而函数表达式则可以省略这个标示符：

// 函数声明和函数表达式：
// 　　函数声明:
// 　　function 函数名称 (参数：可选){ 函数体 }
// 　　函数表达式：
// 　　function 函数名称（可选）(参数：可选){ 函数体 }

// 所以，可以看出，如果不声明函数名称，它肯定是表达式，可如果声明了函数名称的话，
// 如何判断是函数声明还是函数表达式呢？ECMAScript是通过上下文来区分的，
// 如果function foo(){}是作为赋值表达式的一部分的话，那它就是一个函数表达式，
// 如果function foo(){}被包含在一个函数体内，或者位于程序的最顶部的话，
// 那它就是一个函数声明。
// 还有一种函数表达式不太常见，就是被括号括住的(function foo(){})，
// 他是表达式的原因是因为括号 ()是一个分组操作符，它的内部只能包含表达式，



// 函数声明会在任何表达式被解析/求值之前先被解析和求值，无论函数声明代码在哪
// 函数表达式，因为是表达式，需要在使用之前解析/求值

// 函数声明只能出现在程序或函数体内。从句法上讲，他们不能出现在Block(块)({…})中，
// 例如if，while或for语句，因为Block(块)中只能包含Statement语句，而不能包含函数声明这样的源元素。
// 另外一个方面，仔细看一看规则也会发现，唯一可能让表达式出现在Block(块)中情形，就是让它作为表达式语句的一部分。
// 但是，规范明确规定了表达式语句不能以关键字function开头。
// 而这实际上就是说，
// 函数表达式同样也不能出现在Statement语句或block(块)中(因为Block(块)就是由Statement语言构成的)



// 基于对某种特性的测试来伪装函数定义，从而达到性能优化的目的，
// 但由于这种方式都是在同一作用域内，所以基本上一定要用函数表达式：

// 提到命名函数表达式，理所当然，就是它得有名字，
// 前面的例子var bar = function foo(){};就是一个有效的命名函数表达式，但有一点需要记住：这个名字只在新定义的函数作用域内有效，
// 因为规范规定了标示符不能在外围的作用域内有效：
// 

  // var f = function foo(){
  //   return typeof foo; // foo是在内部作用域内有效
  // };
  // // foo在外部用于是不可见的
  // typeof foo; // "undefined"
  // f(); // "function"

// 那命名函数表达式到底有啥用啊？为啥要取名？

// 正如我们开头所说：给它一个名字就是可以让调试过程更方便，
// 因为在调试的时候，如果在调用栈中的每个项都有自己的名字来描述，
// 那么调试过程就太爽了，感受不一样嘛。

// 汤姆大叔 - 深入理解JavaScript系列（2）：揭秘命名函数表达式
// http://www.cnblogs.com/TomXu/archive/2011/12/29/2290308.html

// for (var i in {a : 1, b : 2}) {
// 	alert(i);
// 	// a
// 	// b
// }
// alert(i);	// b


// 汤姆大叔 - 深入理解JavaScript系列（20）：《你真懂JavaScript吗？》答案详解
// http://www.cnblogs.com/TomXu/archive/2012/02/10/2342098.html

