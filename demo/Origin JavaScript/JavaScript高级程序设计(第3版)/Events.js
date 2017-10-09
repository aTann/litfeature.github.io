
// 事件
// 
// 理解事件流
// 使用事件处理程序
// 不同的事件类型





// 事件，就是文档或浏览器窗口中发生的一些特定的交互瞬间，
// 可以使用侦听器(或处理程序)来预订事件，以便事件发生时执行相应的代码。
// 这种在传统软件工程中被称为观察员模式的模型，支持页面的行为（JavaScript 代码）与页
// 面的外观（HTML 和CSS 代码）之间的松散耦合。


// 事件流
// 页面的哪一部分会拥有某个特定的事件？
// 要明白这个问题问的是什么，可以想象画在一张纸上的一组同心圆。
// 如果你把手指放在圆心上，那么你的手指指向的不是一个圆，而是纸上的所有圆。


// 事件流：从页面中接收事件的顺序。
// 初期IE事件流：事件冒泡流
// Netcape Communicator事件流：事件捕获流

/*
事件冒泡
 - IE 的事件流叫做事件冒泡（event bubbling），即事件开始时由最具体的元素（文档中嵌套层次最深
   的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）

	冒泡会一直冒泡到window对象

	内 ——> 外

*/

/*
事件捕获
 - 事件捕获的思想
是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用意在于在
事件到达预定目标之前捕获它。
	
	DOM2级事件 规范要求 document对象开始传播

	现代浏览器从window对象开始捕获事件
	
	外 ——> 内

 */

// 事件冒泡兼容性更好，建议优先使用事件冒泡

/*
DOM事件流
	- “DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。
		首先发生的是事件捕获，为截获事件提供了机会。
		然后是实际的目标接收到事件。
		最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应。
	

	Document  Element[html] 	Element[body]	Element[div]
	
	时间的目标在捕获阶段不会接受到事件，捕获阶段到达Element[body]就停止了，
	下一阶段是"处于目标"阶段，事件在目标<div>上发生，并在事件处理中被看成冒泡阶段的一部分。
	然后，冒泡阶段发生阶段发生了，事件又传输回文档。

	DOM2级事件 要求捕获阶段不会涉及事件目标
	现代浏览器都会在捕获阶段触发对象上的事件，结果，就是有两个机会在目标对象上面操作事件。

 */

// 事件处理程序
// 事件就是用户或浏览器自身执行的某种动作。
// 响应某个事件的函数就叫做事件处理程序(或事件侦听器)
// 事件处理程序的名字以"on"开头，click —> onclick，load —> onload




// 为事件指定处理程序方式：

// 1、HTML事件处理程序
/*
某个元素支持的每种事件，都可以使用一个与相应事件处理程序同名的HTML 特性来指定。这个
特性的值应该是能够执行的JavaScript 代码。

不能在其中使用未经转义的HTML 语法字符，如<>/""等

在HTML 中定义的事件处理程序可以包含要执行的具体动作，也可以调用在页面其他地方定义的
脚本，

事件处理程序中的代码在执行时，有权访问全局作用域中的任何代码。

这样指定事件处理程序具有一些独到之处。首先，这样会创建一个封装着元素属性值的函数。这个
函数中有一个局部变量event，也就是事件对象

通过event 变量，可以直接访问事件对象，你不用自己定义它，也不用从函数的参数列表中读取。
在这个函数内部，this 值等于事件的目标元素

关于这个动态创建的函数，另一个有意思的地方是它扩展作用域的方式。在这个函数内部，可以像
访问局部变量一样访问document 及该元素本身的成员。	这个函数使用with

使用(with) - 实际上，这样扩展作用域的方式，无非就是想让事件处理程序无需引用表单元素就能访问其他表单字段。

在HTML 中指定事件处理程序有两个缺点。首先，存在一个时差问题。因为用户可能会在
HTML 元素一出现在页面上就触发相应的事件，但当时的事件处理程序有可能尚不具备执行条件
另一个缺点是，这样扩展事件处理程序的作用域链在不同浏览器中会导致不同结果。不同JavaScript
引擎遵循的标识符解析规则略有差异，很可能会在访问非限定对象成员时出错
通过HTML 指定事件处理程序的最后一个缺点是HTML 与JavaScript 代码紧密耦合。如果要更换事
件处理程序，就要改动两个地方：HTML 代码和JavaScript 代码
*/

function showMessage(){
	alert('Hello Wolrd!');
}



// 2、DOM0 事件处理程序

/*
	通过JavaScript 指定事件处理程序的传统方式，就是将一个函数赋值给一个事件处理程序属性
	为所有现代浏览器所支持。 原因一是简单，二是具有跨浏览器的优势。

	要使用JavaScript 指定事件处理程序，首先必须取得一个要操作的对象的引用。
	每个元素（包括window 和document）都有自己的事件处理程序属性，这些属性通常全部小写，
	例如onclick。将这种属性的值设置为一个函数，就可以指定事件处理程序。

	使用DOM0 级方法指定的事件处理程序被认为是元素的方法。
	因此，这时候的事件处理程序是在元素的作用域中运行；换句话说，程序中的this 引用当前元素。

	也可以删除通过DOM0 级方法指定的事件处理程序，只要像下面这样将事件处理程序属性的值设
	置为null 即可：
	btn.onclick = null; //删除事件处理程序
	将事件处理程序设置为null 之后，再单击按钮将不会有任何动作发生
*/

/*
window.onload = function () {
	var btn = document.getElementById('myBtn');
	
	// 每个元素（包括window 和document）都有自己的事件处理程序属性，这些属性通常全部小写，
	// 例如onclick。将这种属性的值设置为一个函数，就可以指定事件处理程序
	btn.onclick = function () {
		
		// alert("Clicked");

		// 在元素的作用域里面进行
		alert(this.id);	// myBtn

		// 删除DOM0级 方法，将事件处理程序属性值设置为null即可
		btn.onclick = null;		//删除事件处理程序
	}
}
*/



// 3、DOM2 级事件处理程序

/*
	用于处理指定和删除事件处理程序的操作：addEventListener()/removeEventListener()
	所有节点都包含这两个方法，接受3个参数：
			- 要处理的事件名
			- 作为事件处理程序的函数
			- 一个布尔值：true -> 捕获阶段调用事件处理程序，false -> 冒泡阶段调用事件处理程序

	这里添加的事件处理程序也是在其依附的元素的作用域中运行

	使用DOM2 级方法添加事件处理程序的主要好处是可以添加多个事件处理程序。

	通过addEventListener()添加的事件处理程序只能使用removeEventListener()来移除；移
	除时传入的参数与添加处理程序时使用的参数相同。
	addEventListener()添加的匿名函数将无法移除。

	大多数情况下，都是将事件处理程序添加到事件流的冒泡阶段，这样可以最大限度地兼容各种浏览器。
	最好只在需要在事件到达目标之前截获它的时候将程序添加到捕获阶段。（这话很绕哦）
	如果不是特别需要，我们不建议在事件捕获阶段注册事件处理程序。
*/


/*var btn = document.getElementById('myBtn');
btn.addEventListener('click', function () {		// 为btn添加click事件
	alert(this.id);
}, false);

// 可添加多个事件处理程序
btn.addEventListener('click', function aa() {		// 为btn添加click事件
	alert("Hello Wolrd!");
}, false);

// 移除，addEventListener()只能用removeEventListener()，输入参数一样
// addEveneListener()添加的匿名函数，不能通过removeEventListener()

function handler() {		// 为btn添加click事件
	alert("Hi!");
}

btn.addEventListener('click', handler, false);
btn.removeEventListener('click', handler, false);
*/

// 4、IE事件处理程序
/*
	IE实现与DOM中类似的两个方法：attachEvent()/detachEvent()
	接受两个参数：事件处理程序名称与事件处理程序函数
	通过attachEvent()添加的事件处理程序都会被添加到冒泡阶段。
		
		attachEvent()的第一个参数是"onclick"，而非DOM 的addEventListener()方法中的"click"。
	
	在IE 中使用attachEvent()与使用DOM0 级方法的主要区别在于事件处理程序的作用域。在使
	用DOM0 级方法的情况下，事件处理程序会在其所属元素的作用域内运行；在使用attachEvent()方
	法的情况下，事件处理程序会在全局作用域中运行，因此this 等于window。
	
	DOM0/DOM2级方法 处理程序会在其所属元素的作用域内运行，this => element(当前)

	attachEventt() 事件处理程序会在全局作用域中运行，this => window
	
	为同一个按钮添加了两个不同的事件处理程序。
	不过，与DOM方法不同的是，这些事件处理程序不是以添加它们的顺序执行，而是以相反的顺序被触发

	使用attachEvent()添加的事件可以通过detachEvent()来移除，条件是必须提供相同的参数。
	与DOM 方法一样，这也意味着添加的匿名函数将不能被移除。
	不过，只要能够将对相同函数的引用传给detachEvent()，就可以移除相应的事件处理程序。

 */


/*var btn = document.getElementById('ieBtn');

// 添加事件
// IE11+ 对象不支持“attachEvent”属性或方法
// on-前缀，兼容IE8-
btn.attachEvent('onclick', function () {
	// alert('Clicked');
	// 作用域是window
	alert(this);	// [object Window]
});

// 可以添加多个事件处理程序

// detachEvent()移除程序

var handler = function () {
	alert("Hi!");
}
btn.attachEvent('onclick', handler);
btn.detachEvent('onclick', handler);   // 匿名函数不可删除
*/

// 5、跨浏览器的事件处理程序

/*
	能力检测
	只需要关注冒泡阶段
	
	addHandler()：视情况分别使用DOM0 级方法、DOM2 级方法 或 IE方法来添加事件。
				  归属EventUtil对象
				  接受3个参数：
				  	- 要操作的元素
					- 事件名称
					- 事件处理程序函数
	removeHandler(): 移除之前添加的事件处理程序，无论该事件处理程序是采取什么方式添加到元素中的，如果其他方法无效，默认采用DOM0级方法。
					 接受addHandler()相同的参数，
	
		这两个方法首先都会检测传入的元素中是否存在DOM2 级方法。如果存在DOM2 级方法，则使用
	该方法：传入事件类型、事件处理程序函数和第三个参数false（表示冒泡阶段）。如果存在的是IE 的
	方法，则采取第二种方案。注意，为了在IE8 及更早版本中运行，此时的事件类型必须加上"on"前缀。
	最后一种可能就是使用DOM0 级方法（在现代浏览器中，应该不会执行这里的代码）。此时，我们使用
	的是方括号语法来将属性名指定为事件处理程序，或者将属性设置为null。
	
	addHandler()和removeHandler()没有考虑到所有的浏览器问题，例如在IE 中的作用域问题。
	此外还要注意，DOM0 级对每个事件只支持一个事件处理程序。
 */

// EventUtil

var EventUtil = {

	/**
	 * 添加一个DOM事件处理程序
	 * @param {[type]} element 需要绑定事件处理的元素
	 * @param {[type]} type    需要绑定事件处理类型，如[on]click
	 * @param {[type]} handler 需要绑定事件处理
	 */
	addHandler: function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},

	/**
	 * EventUtil跨浏览器实现移除为DOM添加的监听事件
	 * @param  {nodeElement} element 需要移除的事件处理的元素
	 * @param  {String} type    需要移除的事件处理类型，如'on'click
	 * @param  {Function} handler 需要移除的事件处理
	 * @return {[null]}         移除事件处理
	 */
	removeHandler: function (element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}		
	}
};

var btn = document.getElementById('EUBtn');
var handler = function () {
	alert("Clicked!");
};

EventUtil.addHandler(btn, "click", handler);
EventUtil.removeHandler(btn, "click", handler);


// 事件对象
/*
	在触发DOM上的某个事件时，会产生一个事件对象event，这个对象中包含着所有与事件有关的信息。
	包括导致事件的元素、事件的类型以及其他与特定事件相关的信息。
	
	所有浏览器都支持event 对象，但支持方式不同。

 */

// 1、DOM中的事件对象
// 兼容DOM 的浏览器会将一个event 对象传入到事件处理程序中。无论指定事件处理程序时使用什
// 么方法（DOM0 级或DOM2 级），都会传入event 对象。

var btn = document.getElementById('EOBtn');
/*btn.onclick = function (event) {
	alert(event.type);	// click
};*/

/*btn.addEventListener("click", function (event) {
	alert(event.type);		// click
}, false);*/

/*
	属性/方法 						类 型 				读/写 		说 明
	bubbles 						Boolean 			只读 		表明事件是否冒泡
	cancelable 						Boolean 			只读 		表明是否可以取消事件的默认行为
	currentTarget 					Element 			只读 		其事件处理程序当前正在处理事件的那个元素
	defaultPrevented 				Boolean 			只读 		为true 表示已经调用了preventDefault()
																	（DOM3级事件中新增）
	detail 							Integer 			只读 		与事件相关的细节信息
	eventPhase 						Integer 			只读 		调用事件处理程序的阶段：1表示捕获阶段，2表
																	示“处于目标”，3表示冒泡阶段
	preventDefault() 				Function 			只读 		取消事件的默认行为。如果cancelable是
																	true，则可以使用这个方法
	stopImmediatePropagation() 		Function 			只读 		取消事件的进一步捕获或冒泡，同时阻止任何
																	事件处理程序被调用（DOM3级事件中新增）
	stopPropagation() 				Function 			只读 		取消事件的进一步捕获或冒泡。如果bubbles
																	为true，则可以使用这个方法
	target 							Element 			只读 		事件的目标
	trusted 						Boolean 			只读 		为true表示事件是浏览器生成的。为false表
																	示事件是由开发人员通过JavaScript 创建的
																	（DOM3级事件中新增）
	type 							String 				只读 		被触发的事件的类型
	view 							AbstractView 		只读 		与事件关联的抽象视图。等同于发生事件的
																	window对象
*/

/*在事件处理程序内部，对象this 始终等于currentTarget 的值，而target 则只包含事件的实
际目标。如果直接将事件处理程序指定给了目标元素，则this、currentTarget 和target 包含相同
的值。*/

/*btn.onclick = function (event) {
	alert(event.currentTarget === this);	// true
	alert(event.target === this);	// true
}*/

// 如果事件处理程序存在于按钮的父节点中（例如document.body），那么这些值是
// 不相同的。

/*document.body.onclick = function (event) {
	alert(event.currentTarget === document.body);	// true
	alert(this === document.body);	// true
	alert(event.target === document.getElementById('EOBtn'));	// true
}
*/

// 在需要通过一个函数处理多个事件时，可以使用type 属性。

var handler = function (event) {
	switch (event.type) {
		case "click":
			alert("Clicked");
			break;

		case "mouseover":
			event.target.style.backgroundColor = "red";
			break;

		case "mouseout":
			event.target.style.backgroundColor = "";
			break;

		default:
			// statements_def
			break;
	}
}

btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;

// 阻止特定事件的默认行为，可以使用preventDefualt()

var link = document.getElementById("myLink");
/*link.onclick = function (event) {
	event.preventDefault();
}*/

// 只有cancelable属性设置为true的事件，才可以使用preventDefault()来取消其默认行为。
/*link.onclick = function (event) {
	event.cancelable = false;
	event.preventDefault();
	console.log(event.cancelable);  // true
	
}*/

// stopPropagation()方法用于立即停止事件在DOM层次中的传播，即取消进一步的事件捕获或冒泡。

var div1 = document.getElementById('div_1');
var div2 = document.getElementById('div_2');
var div3 = document.getElementById('div_3');

/*div1.addEventListener('click', function (event) {
	console.log('event div1');
	// DOM先开始捕获，一旦同一个事件串里面，
	// 父层发生捕获禁止，事件就只传播到这里，
	// 其他子元素不能再接受事件
	// 如果冒泡是最后传达到父层的，禁止发生也不会影响子层事件继续，只是那还有禁止的意义吗
	event.stopPropagation();	
}, true); // 设置捕获事件

div2.addEventListener('click', function (event) {
	console.log('event div2');
}, false); // 设置捕获事件

div3.addEventListener('click', function (event) {
	console.log('event div3');
}, false); // 设置捕获事件
*/

// 能不能click1只触发div1
// click2触发div2
// click3触发div3
/*div1.addEventListener('click', function (event) {
	console.log('event div1');
	console.log(event.eventPhase);  
}, false); // 设置捕获事件

div2.addEventListener('click', function (event) {
	console.log('event div2');
	event.stopPropagation();
}, false); // 设置捕获事件

div3.addEventListener('click', function (event) {
	console.log('event div3');
	event.stopPropagation();
}, false); // 设置捕获事件*/

// eventPhase 可以用来确定事件当前正位于事件流的哪个阶段
// 捕获阶段 1
// 目标阶段 2
// 冒泡阶段 3
/*div1.addEventListener('click', function (event) {
	console.log('event div1');
	console.log(event.eventPhase);  
}, false); // 设置捕获事件

div2.addEventListener('click', function (event) {
	console.log('event div2');
	console.log(event.eventPhase);  
}, true); // 设置捕获事件

div3.addEventListener('click', function (event) {
	console.log('event div3');
	console.log(event.eventPhase);  
}, false); // 设置捕获事件

// event div2
// 1
// event div3
// 2
// event div1
// 3
*/

// 只有在事件处理程序执行期间，event 对象才会存在；一旦事件处理程序执行完
// 成，event 对象就会被销毁。

// 2、IE中的事件对象

// 要访问IE 中的event 对象有几种不同的方式，取决于指定事
// 件处理程序的方法。在使用DOM0 级方法添加事件处理程序时，event 对象作为window 对象的一个
// 属性存在

var btn = document.getElementById('ieBtn');
/*btn.onclick = function () {
	var event = window.event;
	console.log(event.type);	// click
};*/

// 可是，如果事件处理程序是使用attachEvent()添加的，那
// 么就会有一个event 对象作为参数被传入事件处理程序函数中

/*btn.attachEvent('onclick', function () {
	// IE11 对象不支持“attachEvent”属性或方法
	console.log(event.type);	// click IE10
});*/


// 如果是通过HTML特性指定的事件处理程序，那么还可以通过一个名叫event 的变量来访问event
// 对象（与DOM 中的事件模型相同）。
// <input type="button" value="Click Me" onclick="alert(event.type)">

// IE 的event 对象同样也包含与创建它的事件相关的属性和方法。
// 所有事件对象都会包含下表所列的属性和方法。
/*
	属性/方法 				类 型 		读/写 		说 明
	cancelBubble 			Boolean 	读/写 		默认值为false，但将其设置为true就可以取消事件冒泡（与DOM中
													的stopPropagation()方法的作用相同）

	returnValue 			Boolean 	读/写 		默认值为true，但将其设置为false就可以取消事件的默认行为（与
													DOM中的preventDefault()方法的作用相同）

	srcElement 				Element 	只读 		事件的目标（与DOM中的target属性相同）

	type 					String 		只读 		被触发的事件的类型
*/

// 因为事件处理程序的作用域是根据指定它的方式来确定的，所以不能认为this 会始终等于事件目
// 标。故而，最好还是使用event.srcElement 比较保险。

/*btn.onclick = function  () {
	console.log(window.event.srcElement === this); 		// true
	console.log(event.srcElement);	// <input name="" id="ieBtn" type="button" value="Click Me_IE"></input>
};

btn.attachEvent('onclick', function (event) {
	console.log(event.srcElement === this);			// false
	console.log(event.srcElement);	// <input name="" id="ieBtn" type="button" value="Click Me_IE"></input>
	console.log(this);	// [object Window]
});*/

// IE10 - 
/*link.onclick = function () {
	window.event.returnValue = false;
}*/

// cancelBubble属性与DOM中的stopPropagation()方法相同，都是用来停止事件冒泡的
/*btn.onclick = function () {
	console.log('clicked');
	window.event.cancelBubble = true;
};

document.body.onclick = function () {
	console.log('Body clicked');
};*/

// 3、跨浏览器的事件对象


var EventUtil = {
	/**
	 * 添加一个DOM事件处理程序
	 * @param {[type]} element 需要绑定事件处理的元素
	 * @param {[type]} type    需要绑定事件处理类型，如[on]click
	 * @param {[type]} handler 需要绑定事件处理
	 */
	addHandler: function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},

	// 获取事件
	getEvent: function (event) {
		return event ? event : window.event;
	},

	// 获取事件绑定元素
	getTarget: function (event) {
		return event.target || event.srcElement;
	},

	// 相关元素获取
	getRelatedTarget: function (event) {
		if (event.relatedTarget) {  // mouseover 和 mouseout事件才包含
			return event.relatedTarget;
		} else if (event.toElement) {	// IE8- mouseover  fromElement
			return event.toElement;
		} else if (event.fromElement) {		// IE8- mouseout toElement
			return event.fromElement;
		} else {
			return null;
		}
	},

	// 获取鼠标按钮标记
	getButton: function (event) {
		if (document.implementation.hasFeature("MouseEvent", "2.0")) {
			return event.button;
		} else {
			// IE8- 兼容
			switch(event.button) {
				case 0:		// IE8- 表示没有按钮按钮
				case 1:		// IE8- 表示按下了主鼠标按钮
				case 3:		// IE8- 表示按下
				case 5:		// IE8- 表示同时按下了主鼠标按钮和中间的鼠标按钮
				case 7:		// IE8- 表示同时按下了三个鼠标按钮
					return 0;
				case 2:		// IE8- 表示按下次鼠标按钮
				case 6:		// IE8- 表示同时按下了次鼠标和中间鼠标按钮
					return 2;
				case 4:		// IE8- 表示按下了中间的鼠标按钮
					return 1;
			}
		}
	},

	// 滚轮事件方向确定
	getWheelDelta: function (event) {
		if (event.wheelDelta) {
			/*return (client.engine.opera && client.engine.opera < 9.5 :  // opera < 9.5 符号和上下滚相反
				-event.wheelDelta : event.wheelDelta);*/
			return event.wheelDelta;
		} else {
			return -event.detail;			// Firefox 2/-2 偶尔也会出现其他数字
		}
	},

	// 获取字符编码
	getCharCode: function (event) {
		if (typeof event.charCode == "number" && 
			event.charCode != '0') {	// GC59 FF IE11打出来都是0
			return event.charCode;
		} else {
			// 一般来说 event.charCode = event.keyCode
			return event.keyCode;
		}
	},

	// 阻止默认事件
	preventDefault: function (event) {
		if (event.preventDefault) {
			event.preventDefault();	
		} else {
			event.returnValue = false;
		}
	},

	/**
	 * EventUtil跨浏览器实现移除为DOM添加的监听事件
	 * @param  {nodeElement} element 需要移除的事件处理的元素
	 * @param  {String} type    需要移除的事件处理类型，如'on'click
	 * @param  {Function} handler 需要移除的事件处理
	 * @return {[null]}         移除事件处理
	 */
	removeHandler: function (element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}		
	},

	// 阻止事件传播
	stopPropagation: function (event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = ture;
		}
	}
}


// 事件类型

/*
	"DOM3级事件"规定了以下几类事件：
	  - UI(User Interface)：用户与页面上的元素交互时触发
	  - 焦点时间：当元素获得或失去焦点时触发
	  - 鼠标时间：当用户通过鼠标在页面上执行操作触发
	  - 滚轮事件：当使用鼠标滚轮(或类似设备)时触发
	  - 文本事件：当在文档中输入文档时触发
	  - 键盘事件：当用户通过键盘在页面上执行操作时触发
	  - 合成事件：IME(Input Method Editor, 输入法编辑器)输入字符时触发
	  - 变动(mutarion)事件：当底层DOM结构发生变化时触发

	DOM3 级事件模块在DOM2 级事件模块基础上重新定义了这些事件，也添加了一些新事件。
 */

// UI事件
/*
	
	load: 当页面完全加载后在window 上面触发，
		  当所有框架都加载完毕时在框架集上面触发，
		  当图像加载完毕时在<img>元素上面触发，
		  或者当嵌入的内容加载完毕时在<object>元素上面触发。

	unload: 当页面完全卸载后在window 上面触发，
			当所有框架都卸载后在框架集上面触发，
			或者当嵌入的内容卸载完毕后在<object>元素上面触发。

	abort: 在用户停止下载过程时，如果嵌入的内容没有加载完，则在<object>元素上面触发。
	
	error:  当发生JavaScript 错误时在window 上面触发，
			当无法加载图像时在<img>元素上面触发，
			当无法加载嵌入内容时在<object>元素上面触发，
			或者当有一或多个框架无法加载时在框架集上面触发。

	select: 当用户选择文本框（<input>或<texterea>）中的一或多个字符时触发。

	resize: 当窗口或框架的大小变化时在window 或框架上面触发。

	scroll: 当用户滚动带滚动条的元素中的内容时，在该元素上面触发。
			<body>元素中包含所加载页面的滚动条。
	
	多数这些事件都与window 对象或表单控件相关。
	其他事件在DOM2 级事件中都归为HTML 事件（DOMActivate 在DOM2
	级中仍然属于UI 事件）。

*/
// 要确定浏览器是否支持DOM2 级事件规定的HTML 事件，可以使用如下代码：

var isSupported = document.implementation.hasFeature('HTMLEvents', '2.0');
// console.log(isSupported);	// true

// load，常用于window，保证window文档下载渲染完毕才开始操作DOM和事件处理
// 		 image，添加image前进行布置load事件

// image，一旦添加了.src就会下载图片，可以利用DOM中Image()进行先行添加图片
/*EventUtil.addHandler(window, "load", function () {
	var image = new Image();
	EventUtil.addHandler(image, "load", function(event){
		alert("Image loaded!");
	})
	image.src = "http://n1.itc.cn/img8/wb/recom/2015/12/22/145078405442878857.JPEG";
});*/

// <script>元素也会触发load事件，开发人员确定动态加载的JavaScript文件是否加载完毕
/*
	只有在设置了<script>元素的src 属性并将该元素添加到文档后，才会开始下
	载JavaScript 文件。换句话说，对于<script>元素而言，指定src 属性和指定事件处理程序的先后顺
	序就不重要了。
*/

/*EventUtil.addHandler(window, 'load', function () {
	var script = document.createElement('script');
	EventUtil.addHandler(script, 'load', function (event) {
		alert('loaded!');
	});

	script.src = "https://code.jquery.com/jquery-3.2.1.slim.min.js";
	document.body.appendChild(script);
});
*/

// unload
// 与load 事件对应的是unload 事件，这个事件在文档被完全卸载后触发。只要用户从一个页面切
// 换到另一个页面，就会发生unload 事件。而利用这个事件最多的情况是清除引用，以避免内存泄漏。
// IE11 刷新时候触发，GC59没反应
/*EventUtil.addHandler(window, 'unload', function (event) {
	alert('Unloaded!');
});*/


// resize事件
// 当浏览器窗口被调整到一个新的高度或宽度时，就会触发resize事件。
/*EventUtil.addHandler(window, 'resize', function (event) {
	alert("Resized");
});*/


// scroll事件
/*
	虽然scroll 事件是在window 对象上发生的，但它实际表示的则是页面中相应元素的变化。在混
	杂模式下，可以通过<body>元素的scrollLeft 和scrollTop 来监控到这一变化；而在标准模式下，
	除Safari 之外的所有浏览器都会通过<html>元素来反映这一变化（Safari 仍然基于<body>跟踪滚动位
	置）
*/
/*
Eve
ntUtil.addHandler(window, "scroll", function (event) {
	if (document.compatMode == "CSS1Compat") {
		alert(document.documentElement.scrollTop);
	} else {
		alert(document.body.scrollTop);		// 0
	}
});

// scroll 事件也会在文档被滚动期间重复被触发，所以有必要尽量保持事件
// 处理程序的代码简单。
*/

// 焦点事件

/*
	
	blur：在元素失去焦点时触发，这个事件不会冒泡，所有浏览器支持

	focus：在元素获得焦点时触发，这个事件不会冒泡，所有浏览器支持

	focusin:在元素获得焦点时触发。这个事件和focus等价，但它冒泡，
			支持这个事件的浏览器有IE5.5+、Safari 5.1+、Opera 11.5+和Chrome。

	focusout：在元素失去焦点时触发。这个事件是HTML 事件blur 的通用版本。
			  支持这个事件的浏览器有IE5.5+、Safari 5.1+、Opera 11.5+和Chrome。

	这一类事件中最主要的两个是focus 和blur，它们都是JavaScript 早期就得到所有浏览器支持的
	事件。这些事件的最大问题是它们不冒泡。因此，IE 的focusin 和focusout 与Opera 的DOMFocusIn
	和DOMFocusOut 才会发生重叠。IE 的方式最后被DOM3 级事件采纳为标准方式。

	当焦点从页面中的一个元素移动到另一个元素，会依次触发下列事件：
		1、focusout在失去焦点的元素上触发
		2、focusin在获得焦点的元素上触发
		3、blur在失去焦点的元素上触发；
		4、DOMFocusOut(Opera)在失去焦点的元素上触发
		5、focus在获得焦点的元素上触发
		6、DOMFocusIn在获得焦点的元素上触发
		其中，blur、DOMFocusOut 和focusout 的事件目标是失去焦点的元素；而focus、DOMFocusIn
	和focusin 的事件目标是获得焦点的元素。

*/

// 要确定浏览器是否支持这些事件，可以使用如下代码
var isSupported = document.implementation.hasFeature('FocusEvent', '3.0');




// 鼠标事件和滚轮事件

/*
	鼠标事件时Web开发中最常用的一类事件，毕竟鼠标还是最主要的定位设备。
	DOM3级事件中定义9个鼠标事件，简介如下：

	click：在用户单击鼠标按钮(般是左边的按钮)或者按下回车键时触发。
		   这一点对确保易访问性很重要，意味onclick事件处理程序既可以通过键盘也可以通过鼠标执行。

	dbclick：在用户双击鼠标按钮(一般是左边的按钮)时触发。
			 从技术上说，这个事件并不是DOM2级事件规范中规定的，但鉴于它得到了广泛支持，所以DOM3级事件将其纳入了标准。

	mousedown：在用户按下了任意鼠标按钮时触发。不能通过键盘触发这个事件。

	mouseenter：在鼠标光标从元素外部首次移动到元素范围之内时触发。
				这个事件不冒泡，而且在光标移动到后代元素上不会触发，
				DOM2级事件没有定义，DOM3级事件将它纳入规范。

	mouseleave：在位于元素上方的鼠标光标移动到元素范围之内时触发。
				这个事件不冒泡，而且在光标移动到后代元素上不会触发。
				DOM2级事件没有定义这个事件，但DOM3级事件将它纳入规范。

	mousemove：当鼠标指标在元素内部移动时重复地触发。
			   不能通过键盘触发这个事件。
	
	mousrout：在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发。
			  又移入的另一个元素可能位于前一个元素的外部，也可能是这个元素的子元素。
			  不能通过键盘触发这个事件。

	mouseover：在鼠标指标位于一个元素我不，然后用户将其首次移入另一个元素边界之内时触发。
			   不能通过键盘触发这个事件。

	mouseup：在用户释放鼠标按钮时触发。不能通过键盘触发这个事件。

	mousewheel：滚轮事件，跟踪鼠标滚轮，类似于笔记本触摸板

	页面上所有元素都支持鼠标事件。除了mouseenter和mouseleave，所有鼠标事件都会冒泡，也可以被取消，
	而取消鼠标事件将会影响浏览器的默认行为。取消鼠标事件的默认行为还会影响其他事件，因为鼠标事件和其他事件时密不可分的关系。

	只有在同一个元素上相继触发 mousedown 和 mouseup 事件，才会触发click事件；
	如果 mousedown 或 mouseup 中的一个被取消，就不会触发 click 事件。
	类似地，只有触发两次 click 事件，才会 dbclick 事件。
	如果有代码阻止了连续两次触发 click 事件(可能是直接取消click事件，也可能通过取消mousedown或mouseup间接实现)，那么就不会触发dbclick事件了。

	这4个事件触发的顺序始终如下：
		1）mousdown
		2）mouseup
		3）click
		4）mousedown
		5）mouseup
		6）click
		7）dbclick
	显然，click 和dblclick 事件都会依赖于其他先行事件的触发；而mousedown 和mouseup 则
	不受其他事件的影响。

*/

// 检测浏览器是否支持DOM2级事件(除 dbclick、mouseenter 和 mouseleave之外)
var Supported = document.implementation.hasFeature('MouseEvents', '2.0');  // MouseEvents 复数

// 要检测浏览器是否支持上面的所有事件，可以使用以下代码：
var Supported = document.implementation.hasFeature('MouseEvent', '3.0');	// MouseEvent  复数


// 客户区坐标位置
/*
	鼠标事件都是在浏览器视口中的特定位置上发生的。
	位置信息保存在事件对象的 clientX 和 clientY属性中。
	所有浏览器都支持这两个属性，它们的值表示事件发生时鼠标指针在视口中的水平和垂直坐标。
*/

// 获取鼠标事件的客户端坐标信息：
/*var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'click', function (event) {
	event = EventUtil.getEvent(event);
	console.log("Client coordinates: " + event.clientX + ", " + event.clientY);
});
// 看到事件的客户端坐标信息，不包括页面滚动的距离，这个位置不表示鼠标在页面上的位置
*/



// 页面坐标位置：事件对象的 pageX 和 pageY属性，事件在页面中的什么位置发生的。
// 页面中位置，坐标从页面本身
/*var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'click', function (event) {
	event = EventUtil.getEvent(event);
	console.log("Client coordinates: " + event.pageX + ", " + event.pageY);
});*/
// 在页面没有滚动的情况下，pageX 和pageY 的值与clientX 和clientY 的值相等。

/*
	IE8 及更早版本不支持事件对象上的页面坐标，不过使用客户区坐标和滚动信息可以计算出来。这
	时候需要用到document.body（混杂模式）或document.documentElement（标准模式）中的
	scrollLeft 和scrollTop 属性。
*/
/*var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'click', function (event) {
	event = EventUtil.getEvent(event);
	var pageX = event.pageX,
		pageY = event.pageY;

	if (pageX === undefined) {
		pageX = event.clientX + (document.body.scrollLeft ||
			document.documentElement.scrollLeft);
	}

	if (pageY === undefined) {
		pageY = event.clientY + (document.body.scrollTop ||
			document.documentElement.scrollTop);
	}

	console.log("Page coordinates: " + pageY + "," + pageY);
});
*/

// 屏幕坐标位置
// screenX 和screenY 属性就可以确定鼠标事件发生时鼠标指针相对于整个屏幕的坐标信息
/*var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'click', function (event) {
	event = EventUtil.getEvent(event);
	console.log("Screen coordinates: " + event.screenX + "," + event.screenY);
});*/

// 修改键
/*
	虽然鼠标事件主要是使用鼠标来触发的，但在按下鼠标时键盘上的某些键的状态也可以影响到所要
	采取的操作。这些修改键就是Shift、Ctrl、Alt 和Meta（在Windows 键盘中是Windows 键，在苹果机中
	是Cmd 键），它们经常被用来修改鼠标事件的行为。

	DOM 为此规定了4 个属性，表示这些修改键的状
	态：shiftKey、ctrlKey、altKey 和metaKey。这些属性中包含的都是布尔值，如果相应的键被按
	下了，则值为true，否则值为false。当某个鼠标事件发生时，通过检测这几个属性就可以确定用户
	是否同时按下了其中的键。

*/

/*var div = document.getElementById('myDiv');
EventUtil.addHandler(div, "click", function (event) {
	event = EventUtil.getEvent(event);
	// 为什么不是符合哪个条件就触发那个显示，[只能显示单个 || 多次显示操作]
	// 为何用数组呢[如果只是1个键按，会显得多余 || 多个按下，减少输出显示]
	var keys = new Array();

	if (event.shiftKey) {
		keys.push('shift');
	}

	if (event.ctrlKey) {
		keys.push('ctrl');
	}

	if (event.altKey) {
		keys.push('alt');
	}

	if (event.metaKey) {
		keys.push('meta');
	}

	console.log('Keys: ' + keys.join(','));

});*/


// 相关元素
/*在发生mouseover 和mouserout 事件时，还会涉及更多的元素。这两个事件都会涉及把鼠标指
针从一个元素的边界之内移动到另一个元素的边界之内。对mouseover 事件而言，事件的主目标是获
得光标的元素，而相关元素就是那个失去光标的元素。类似地，对mouseout 事件而言，事件的主目标
是失去光标的元素，而相关元素则是获得光标的元素。*/

/*var div = document.getElementById('myDiv');
EventUtil.addHandler(div, "mouseout", function (event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	var relateTarget = EventUtil.getRelatedTarget(event);
	console.log("Moused out of " + target.tagName + " to " + relateTarget.tagName);
});*/

// 鼠标按钮
/*只有在主鼠标按钮被单击（或键盘回车键被按下）时才会触发click 事件，因此检测按钮的信息
并不是必要的。但对于mousedown 和mouseup 事件来说，则在其event 对象存在一个button 属性，
表示按下或释放的按钮。
DOM的button 属性可能有如下3 个值：
0 表示主鼠标按钮，
1 表示中间的鼠标按钮（鼠标滚轮按钮），
2 表示次鼠标按钮。
在常规的设置中，主鼠标按钮就是鼠标左键，而次鼠标按钮就是鼠标右键。*/

/*由于单独使用能力检测无法确定差异（两种模型有同名的button 属性），因此必须另辟蹊径。我
们知道，支持DOM 版鼠标事件的浏览器可以通过hasFearture()方法来检测，所以可以再为
EventUtil 对象添加如下getButton()方法。*/

/*getButton: function (event) {
	// 通过检测"MouseEvents"这个特性，就可以确定event 对象中存在的button 属性中是否包含正
	// 确的值。如果测试失败，说明是IE，就必须对相应的值进行规范化。
	if (document.implementation.hasFeature("MouseEvent", "2.0")) {
		return event.button;
	} else {
		// IE8- 兼容
		switch(event.button) {
			case 0;		// IE8- 表示没有按钮按钮
			case 1;		// IE8- 表示按下了主鼠标按钮
			case 3;		// IE8- 表示按下
			case 5;		// IE8- 表示同时按下了主鼠标按钮和中间的鼠标按钮
			case 7;		// IE8- 表示同时按下了三个鼠标按钮
				return 0;
			case 2;		// IE8- 表示按下次鼠标按钮
			case 6;		// IE8- 表示同时按下了次鼠标和中间鼠标按钮
				return 2;
			case 4;		// IE8- 表示按下了中间的鼠标按钮
				return 1;
		}
	}
}*/


/*var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'mousedown', function(event) {
	event = EventUtil.getEvent(event);

	console.log(EventUtil.getButton(event));
});*/


// 更多的事件信息
// “DOM2 级事件”规范在event 对象中还提供了detail 属性，用于给出有关事件的更多信息。
/*对于鼠标事件来说，detail 中包含了一个数值，表示在给定位置上发生了多少次单击。在同一个元素上
相继地发生一次mousedown 和一次mouseup 事件算作一次单击。detail 属性从1 开始计数，每次单
击发生后都会递增。如果鼠标在mousedown 和mouseup 之间移动了位置，则detail 会被重置为0。
*/

/*IE 也通过下列属性为鼠标事件提供了更多信息。
. altLeft：布尔值，表示是否按下了Alt 键。如果altLeft 的值为true，则altKey 的值也为true。
. ctrlLeft：布尔值，表示是否按下了Ctrl 键。如果ctrlLeft 的值为true，则ctrlKey 的值
也为true。
. offsetX：光标相对于目标元素边界的x 坐标。
. offsetY：光标相对于目标元素边界的y 坐标。
. shiftLeft：布尔值，表示是否按下了Shift 键。如果shiftLeft 的值为true，则shiftKey
的值也为true。
这些属性的用处并不大，原因一方面是只有IE 支持它们，另一方是它们提供的信息要么没有什么
价值，要么可以通过其他方式计算得来。
*/


// 鼠标滚轮事件
// 鼠标滚轮与页面交互，在垂直方向上滚动页面时(无论向上还是向下)，
// 就会触发 mousewheel 事件。这个事件在任何元素上面触发，最终会冒泡到document(IE8)或
// window(IE9/Chrome/Opera/Safari)对象。
// 与mousewheel 事件对应的event 对象除包含鼠标事件的所有标准信息外，
// 还包含一个特殊的wheelDelta 属性。
// 当用户向前滚动鼠标滚轮时，wheelDelta 是120 的倍数； (GC测试的值 150)
// 当用户向后滚动鼠标滚轮时，wheelDelta 是120 的倍数。

// 滚轮事件

/*getWheelDelta: function (event) {
	if (event.wheelDelta) {
		return (client.engine.opera && client.engine.opera < 9.5 :  // opera < 9.5 符号和上下滚相反
			-event.wheelDelta : event.wheelDelta);
	} else {
		return -event.detail * 40;			// Firefox 3/-3 显示一致
	}
}*/

/*我们将相关代码放在了一个私有作用域中，从而不会让新定义的函数干扰全局作用域。这里定义的
handleMouseWheel()函数可以用作两个事件的处理程序（如果指定的事件不存在，则为该事件指定处
理程序的代码就会静默地失败）。由于使用了EventUtil.getWheelDelta()方法，我们定义的这个事
件处理程序函数可以适用于任何一种情况。*/

/*// 私有域，如果失败，静默的失败，新定义的函数不会影响干扰全局函数
(function () {
	function handlerMouseWheel(event) {
		event = EventUtil.getEvent(event);
		var delta = EventUtil.getWheelDelta(event);
		console.log(delta);
	}

	EventUtil.addHandler(document, "mousewheel", handlerMouseWheel);
	EventUtil.addHandler(document, "DOMMouseScroll", handlerMouseWheel);

})();*/



/*EventUtil.addHandler(div, undefined, function (event) {
	event = EventUtil.getEvent(event);
	console.log(event.type);

	// var wheelD = event.wheelDelta || event.detail;
	// console.log("mouseWheel: " + wheelD);	
	// GC 150 || -150 有时候得到300/-300
	// IE 120/-120
});*/


// 触摸设备

/*
	iOS 和Android 设备的实现非常特别，因为这些设备没有鼠标。在面向iPhone 和iPod 中的Safari
	开发时，要记住以下几点。
	. 不支持dblclick 事件。双击浏览器窗口会放大画面，而且没有办法改变该行为。
	. 轻击可单击元素会触发mousemove 事件。如果此操作会导致内容变化，将不再有其他事件发生；
	如果屏幕没有因此变化，那么会依次发生mousedown、mouseup 和click 事件。轻击不可单
	击的元素不会触发任何事件。可单击的元素是指那些单击可产生默认操作的元素（如链接），或
	者那些已经被指定了onclick 事件处理程序的元素。
	. mousemove 事件也会触发mouseover 和mouseout 事件。
	. 两个手指放在屏幕上且页面随手指移动而滚动时会触发mousewheel 和scroll 事件。
*/


// 无障碍性问题
/*
	如果你的Web 应用程序或网站要确保残疾人特别是那些使用屏幕阅读器的人都能访问，那么在使
	用鼠标事件时就要格外小心。前面提到过，可以通过键盘上的回车键来触发click 事件，但其他鼠标
	事件却无法通过键盘来触发。为此，我们不建议使用click 之外的其他鼠标事件来展示功能或引发代
	码执行。因为这样会给盲人或视障用户造成极大不便。以下是在使用鼠标事件时应当注意的几个易访问
	性问题。
	. 使用click 事件执行代码。有人指出通过onmousedown 执行代码会让人觉得速度更快，对视
	力正常的人来说这是没错的。但是，在屏幕阅读器中，由于无法触发mousedown 事件，结果就
	会造成代码无法执行。
	. 不要使用onmouseover 向用户显示新的选项。原因同上，屏幕阅读器无法触发这个事件。如果
	确实非要通过这种方式来显示新选项，可以考虑添加显示相同信息的键盘快捷方式。
	. 不要使用dblclick 执行重要的操作。键盘无法触发这个事件。
	遵照以上提示可以极大地提升残疾人在访问你的Web 应用程序或网站时的易访问性。
*/


// 文本和键盘事件
/*  
		用户在使用键盘时会触发键盘事件。“DOM2 级事件”最初规定了键盘事件，但在最终定稿之前又
	删除了相应的内容。结果，对键盘事件的支持主要遵循的是DOM0 级。
	“DOM3 级事件”为键盘事件制定了规范，IE9 率先完全实现了该规范。其他浏览器也在着手实现这
	一标准，但仍然有很多遗留的问题。

	keydown：当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。

	keypress：当用户按下键盘上的字符键盘时，而且如果按住不放的话，会重复触发此事件。
			  按下Esc键也会触发这个事件。Safari3.1之前的版本也会在用户按下非字符键时触发keypress事件。

	keyup：当用户释放键盘上的键时触发。
	虽然所有元素都支持以上3 个事件，但只有在用户通过文本框输入文本时才最常用到。

	textIput: 在文本插入文本框之前会触发textInput 事件。
			 这个事件是对keypress 的补充，用意是在将文本显示给用户之前更容易拦截文本。
	
	用户按下键盘字符  keydown -> keypress -> keyup
	keydown/keypress 在文本框发生变化之前被触发；而keyup事件则是在文本框已经发生变化之后被触发的。
	
	如果用户按下了一个字符键不放，就会重复触发 keydown/keypress 事件，直到用户松开该键为止。
	如果用户按下一个非字符键，事件发生顺序 keydown -> keyup，
	如果按住非字符键不放，那么就会重复触发keydown，直到松开这个键，触发keyup
	
	支持修改键，键盘事件的事件对象中也有shiftKey、ctrlKey、altKey 和metaKey 属性

*/

// 键码
// 在发生keydown/keyup事件，event对象的keyCode属性中会包含一个代码，与键盘上一个特定的键对应

// 对数字字母字符键，keyCode 属性的值与ASCII 码中对应小写字母或数字的编码相同
/*var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'keyup', function (event) {
	event = EventUtil.getEvent(event);
	console.log(event.keyCode);

});*/


/*

	键 键 						码 		键 键 码
	退格（Backspace）			 8 		数字小键盘1 				97
	制表（Tab） 				 9 		数字小键盘2 				98
	回车（Enter） 				13 		数字小键盘3 				99
	上档（Shift）		    	16 		数字小键盘4 				100
	控制（Ctrl） 				17 		数字小键盘5 				101
	Alt 						18 		数字小键盘6 				102
	暂停/中断（Pause/Break） 	19 		数字小键盘7 				103
	大写锁定（Caps Lock） 		20 		数字小键盘8 				104
	退出（Esc） 				27 		数字小键盘9 				105
	上翻页（Page Up） 			33 		数字小键盘+ 				107
	下翻页（Page Down） 		34 		数字小键盘及大键盘上的- 	109
	结尾（End） 				35 		数字小键盘 . 				110
	开头（Home） 				36 		数字小键盘 / 				111
	左箭头（Left Arrow） 		37 		F1 							112
	上箭头（Up Arrow） 			38 		F2 							113
	右箭头（Right Arrow） 		39 		F3 							114
	下箭头（Down Arrow） 		40 		F4 							115
	插入（Ins） 				45 		F5 							116
	删除（Del） 				46 		F6 							117
	左Windows键 				91 		F7 							118
	右Windows键 				92 		F8 							119
	上下文菜单键 				93 		F9							120
	数字小键盘0 				96 		F10 						121
	F11 						122 	正斜杠 						191
	F12 						123 	沉音符（`） 				192
	数字锁（Num Lock） 			144 	等于 						61
	滚动锁（Scroll Lock） 		145 	左方括号 					219
	分号（IE/Safari/Chrome中） 	186 	反斜杠（\） 				220
	分号（Opera/FF中） 			59 		右方括号 					221
	小于 						188 	单引号 						222
	大于 						190

 */

// 字符编码
// 发生keypress 事件意味着按下的键会影响到屏幕中文本的显示。在所有浏览器中，按下能够插入
// 或删除字符的键都会触发keypress 事件；按下其他键能否触发此事件因浏览器而异。

/*
	event 对象都支持一个charCode 属性，这个属性只有在发生
	keypress 事件时才包含值，而且这个值是按下的那个键所代表字符的ASCII 编码。此时的keyCode
	通常等于0 或者也可能等于所按键的键码*/

	// 要想以跨浏览器的方式取得字符编码，必须首先检测charCode 属性是否可用，如果不可用则使用keyCode
/* 

这个方法首先检测charCode 属性是否包含数值（在不支持这个属性的浏览器中，值为undefined），
如果是，则返回该值。否则，就返回keyCode 属性值。
var EventUtil = {
	// 获取字符编码
	getCharCode: function (event) {
		if (typeof event.charCode == "number") {
			return event.charCode;
		} else {
			// 一般来说 event.charCode = event.keyCode
			return event.keyCode;
		}
	},
}
*/

/*
var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'keyup', function (event) {
	event = EventUtil.getEvent(event);
	var charCode = EventUtil.getCharCode(event);
	console.log(charCode +" : "+ String.fromCharCode(charCode));
});*/

// DOM3级变化
// DOM3级事件中的键盘事件，不再包含charCode 属性，而是包含两个新属性：key 和char。
/*key 属性是为了取代keyCode 而新增的，它的值是一个字符串。在按下某个字符键时，key
的值就是相应的文本字符（如“k”或“M”）；在按下非字符键时， key 的值是相应键的名（如“Shift”
或“Down”）。而char 属性在按下字符键时的行为与key 相同，但在按下非字符键时值为null。*/

/*var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'keyup', function (event) {
	event = EventUtil.getEvent(event);
	var identifier = event.key || event.keyIdentifier;
	// var identifier = event.char; // 不支持
	if (identifier) {
		console.log(identifier);
	};
	// input:Backspace/a
	// print:Backspace/a
});
*/

// location，表示按下了什么位置上的键
/*
	location 的属性，这是一个数值，表示按下了什么位置上的键：
	0 表示默认键盘，
	1 表示左侧位置（例如左位的Alt 键），
	2 表示右侧位置（例如右侧的Shift 键），
	3 表示数字小键盘，
	4 表示移动设备键盘（也就是虚拟键盘），
	5 表示手柄（如任天堂Wii 控制器）
*/

// Safari 和Chrome 支持名为keyLocation 的等价属性，除非按下
// 了数字键盘（此时，值 为3）；否则，不会是1、2、4、5。
// 
/*var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'keyup', function (event) {
	event = EventUtil.getEvent(event);
	var loc = event.location || event.keyLocation;

	if (loc) {
		console.log(loc);		// GC/IE11/FF 数字键盘 3，其他无反应
	};
});*/

// getModifierState()方法，
/*

	这个方法接收一个参数，即等于Shift、Control、AltGraph 或Meta 的字符串，
	表示要检测的修改键。如果指定的修改键是活动的（也就是处于被按下的状态），
	这个方法返回true，否则返回false。

*/

/*var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'keyup', function (event) {
	event = EventUtil.getEvent(event);
	if (event.getModifierState) {
		console.log(event.getModifierState('Shift'));		// GC/IE11/FF 数字键盘 3，其他无反应
	};

	// input：同时按下 Shift + w
	// print：true
	// input：只按下Shift
	// print：false
});*/

// 实际上，通过event 对象的shiftKey、altKey、ctrlKey 和metaKey 属性已经可以取得类似的属性了
// IE9 + 


// textInput 事件
/*
	根据规范，当用户在可编辑区域中输入字符时，就会触发这个事件。
	这个用于替代keypress 的textInput 事件的行为稍有不同。
	区别之一就是任何可以获得焦点的元素都可以触发keypress 事件，但只有可编辑区域才能触发textInput事件。
	区别之二是textInput 事件只会在用户按下能够输入实际字符的键时才会被触发，而keypress事件则在按下那些能够影响文本显示的键时也会触发（例如退格键）。
*/

/*var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'textInput', function (event) {
	event = EventUtil.getEvent(event);
	console.log(event.data);
	// input：a
	// print：a
	
	// input：Shift + a
	// print：A
});*/


// event 对象上还有一个属性，叫inputMethod，表示把文本输入到文本框中的方式。
/*
	0，表示浏览器不确定是怎么输入的。
	1，表示是使用键盘输入的。
	2，表示文本是粘贴进来的。
	3，表示文本是拖放进来的。
	4，表示文本是使用IME 输入的。
	5，表示文本是通过在表单中选择某一项输入的。
	6，表示文本是通过手写输入的（比如使用手写笔）。
	7，表示文本是通过语音输入的。
	8，表示文本是通过几种方法组合输入的。
	9，表示文本是通过脚本输入的。

	使用这个属性可以确定文本是如何输入到控件中的，从而可以验证其有效性。
	兼容不怎么好
*/




// 合成事件

/*
		
	复合事件（composition event）是DOM3 级事件中新添加的一类事件，用于处理IME 的输入序列。
	IME（Input Method Editor，输入法编辑器）可以让用户输入在物理键盘上找不到的字符。例如，使用拉
	丁文键盘的用户通过IME 照样能输入日文字符。IME 通常需要同时按住多个键，但最终只输入一个字
	符。复合事件就是针对检测和处理这种输入而设计的。有以下三种复合事件。
	
	compositionstart：在IME的文本复合系统打开时触发，表示要输入了

	compositionupdate：在向输入字段中插入新字符时触发

	compositioned：在IME的文字复合系统关闭时触发，表示返回正常键盘输入状态
 */

/*
var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'compositionstart', function (event) {
	event = EventUtil.getEvent(event);
	console.log(event.data);
});

var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'compositionupdate', function (event) {
	event = EventUtil.getEvent(event);
	console.log(event.data);
});

var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'compositionend', function (event) {
	event = EventUtil.getEvent(event);
	console.log(event.data);
});
*/

// 要确定浏览器是否支持复合事件，可以使用以下代码：
var isSupported = document.implementation.hasFeature("CompositionEvent", "3.0");

// 变动事件
/*
	DOM2 级的变动（mutation）事件能在DOM 中的某一部分发生变化时给出提示。变动事件是为XML
	或HTML DOM设计的，并不特定于某种语言。

	DOMSubtreeModified：在DOM结构中发生任何变化时触发。这个事件在其他任何事件触发后都会触发。

	DOMNodeIserted：在一个节点作为子节点被插入到另一个节点中时被触发。

	DOMNodeRemoved：在节点从其父节点中被移除时触发。

	DOMNodeInsertedIntoDocument：在一个节点被直接插入文档或通过子树间接插入文档之后触发。这个事件在DOMNodeDocument之后触发。

	DOMNodeRemovedFromDocument：在一个节点被直接从文档中移除或通过子树间接从文档中移除之前触发。这个事件在DOMNodeRemoved之后触发。

	DOMAttriModified：在特性被修改之后触发。

	DOMCharacterDataModified：在文本节点的值发生变化时触发。

 */




// 使用下列代码可以检测出浏览器是否支持变动事件：

// var isSupported = document.implementation.hasFeature('MutationEvents', '2.0');

/*
	删除节点发生顺序
	使用removeChild()/replaceChild()从DOM中删除节点
	首先触发 DOMNodeRemoved
		目标(event.target):被删除的节点，event.relatedNode 属性中包含着对目标节点父节点的引用
		事件触发，节点尚未从父节点删除，parentNode属性仍然指向父节点(与event.relatedNode相同)
		事件冒泡，在DOM任何层次上面处理它。
	
	如果被移除的节点包含子节点，子节点以及这个被移除的节点会相继触发 DOMNodeRemovedFromDocument
		目标：相应的子节点或者被移除的节点，除此之外event对象中不包含其他信息

	紧随其后触发的是DOMSubtreeModified事件。
		目标：是被移除的父节点
		event对象也不会提供与事件相关的其他信息

*/

/*
EventUtil.addHandler(window, "load", function (event) {
	var list = document.getElementById('myList');

	EventUtil.addHandler(document, 'DOMSubtreeModified', function (event) {
		console.log(event.type);		// DOMSubtreeModified
		console.log(event.target);		// <body>……</body>
		console.log();
	});

	EventUtil.addHandler(document, 'DOMNodeRemoved', function (event) {
		console.log(event.type);		// DOMNodeRemoved
		console.log(event.target);		// <ul id="myList">…</ul>
		console.log(event.relatedNode);		// <body>...</body>
		console.log();
	});

	// DOMNodeRemovedFromDocument 不会冒泡，所以我们将针对它的事件处理程序直接添加给了<ul>元素的第一个子节点
	EventUtil.addHandler(list.firstChild, 'DOMNodeRemovedFromDocument', function (event) {
		console.log(event.type);		// DOMNodeRemovedFromDocument
		console.log(event.target);		// #text
		console.log();
	});

	list.parentNode.removeChild(list);

});

// DOMNodeRemoved：目标(event.target):被删除的节点
// DOMNodeRemovedFromDocument：目标：相应的子节点或者被移除的节点
// DOMSubtreeModified：目标：是被移除元素的父节点
*/

/*
	在这个例子中，我们假设要移除<ul>元素。此时，就会依次触发以下事件。
	(1) 在<ul>元素上触发DOMNodeRemoved 事件。relatedNode 属性等于document.body。
	(2) 在<ul>元素上触发DOMNodeRemovedFromDocument 事件。
	(3) 在身为<ul>元素子节点的每个<li>元素及文本节点上触发DOMNodeRemovedFromDocument事件。
	(4) 在document.body 上触发DOMSubtreeModified 事件，因为<ul>元素是document.body的直接子元素。
*/



// 插入节点
/*

	在使用appendChild()、replaceChild()或insertBefore()向DOM中插入节点时，
	首先会	触发DOMNodeInserted 事件。
		这个事件的目标是被插入的节点，而event.relatedNode 属性中包含一个对父节点的引用。
		在这个事件触发时，节点已经被插入到了新的父节点中。
		这个事件是冒泡的，因此可以在DOM 的各个层次上处理它。
	
	紧接着，会在新插入的节点上面触发DOMNodeInsertedIntoDocument 事件。
		这个事件不冒泡，因此必须在插入节点之前为它添加这个事件处理程序。
		这个事件的目标是被插入的节点，除此之外event 对象中不包含其他信息。

	最后一个触发的事件是DOMSubtreeModified，触发于新插入节点的父节点。

*/
/*
EventUtil.addHandler(window, "load", function (event) {
	var list = document.getElementById('myList');
	var item = document.createElement("li");
	item.appendChild(document.createTextNode("Item 4"));

	// 被触发两次，两次输出结果一样
	EventUtil.addHandler(document, 'DOMSubtreeModified', function (event) {
		console.log(event.type);		// DOMSubtreeModified
		console.log(event.target);		// <body>……</body>
		console.log();
	});

	EventUtil.addHandler(document, 'DOMNodeInserted', function (event) {
		console.log(event.type);			// DOMNodeInserted
		console.log(event.target);			// <li>Item 4</li>
		console.log(event.relatedNode);		// <body>...</body>
		console.log();
	});

	// DOMNodeRemovedFromDocument 不会冒泡，所以我们将针对它的事件处理程序直接添加给了<ul>元素的第一个子节点
	EventUtil.addHandler(item.firstChild, 'DOMNodeInsertedIntoDocument', function (event) {
		console.log(event.type);		// DOMNodeInsertedIntoDocument
		console.log(event.target);		// Item 4
		console.log();
	});

	list.parentNode.appendChild(item);

});

// DOMNodeInserted: 这个事件的目标是被插入的节点
// DOMNodeInsertedIntoDocument: 这个事件的目标是被插入的节点
// DOMSubtreeModified：触发于新插入节点的父节点

*/


// HTML5事件

/*
	contextmenu：上下文菜单
	
	beforeunload：为了让开发人员有可能在页面卸载前阻止这一操作
	
	DOMContentLoaded：形成完整的DOM 树之后就会触发，不理会图像、JavaScript 文件、CSS 文件或其他资源是否已经下载完毕。

	readystatechange：这个事件的目的是提供与文档或元素的加载状态有关的信息，但这个事件的行为有时候也很难预料。
	
	pageshow：在页面显示时触发，无论该页面是否来自bfcache。在重新加载的页面中，pageshow 会在load 事件触发后触发；而对于bfcache 中的页面，pageshow 会在页面状
			  态完全恢复的那一刻触发。另外要注意的是，虽然这个事件的目标是document，但必须将其事件处理
			  程序添加到window。

	pagehide：该事件会在浏览器卸载页面的时候触发，而且是在unload 事件之前触发。与pageshow 事件一样，pagehide 在document 上面触发，但其事件处理程
			  序必须要添加到window 对象。
	
	hashchange：以便在URL 的参数列表（及URL 中“#”号后面的所有字符串）发生变化时通知开发人员	
	
 */

// contextmenu：上下文菜单屏蔽、操作以及自定义 【冒泡】
// 可以为document指定一个事件处理程序，用于处理页面中发生的所有此类事件
// 事件的目标是发生用户操作的元素。
// 在所有浏览器自豪感呢哦都可以取消这个事件：event.preventDefault()/ event.returnValue = false

// contextmenu属于鼠标事件，包含光标位置有关的所有属性
// 通常使用contextmenu 事件来显示自定义的上下文菜单，而使用onclick 事件处理程序来隐藏该菜单。

/**
 * 
 *	这个事件处理程序首先会取消默认行为，以保证不显示浏览器默认的上下文菜单。
 * 然后，再根据event 对象clientX 和clientY 属性的值，来确定放置<ul>元素的位置。
 * 最后一步就是通过将visibility 属性设置为"visible"来显示自定义上下文菜单。
 * 另外，还为document 添加了一个onclick 事件处理程序，以便用户能够通过鼠标单击来隐藏菜单（单击也是隐藏系统上下文菜单的默认操作）。
 * 
 */

/*
EventUtil.addHandler(window, "load", function (event) {
	var div = document.getElementById('myDiv');

	// 给 div区域制定自定义菜单
	EventUtil.addHandler(div, 'contextmenu', function (event) {
		event = EventUtil.getEvent(event);
		// 禁止鼠标contextmenu默认的菜单事件，
		// 因为我们需要自定义
		EventUtil.preventDefault(event);

		// 获取菜单内容
		// 	可以在HTML页面先行代码隐藏起来
		var menu = document.getElementById("myMenu");
		menu.style.left = event.clientX + 'px';
		menu.style.top = event.clientY + 'px';
		menu.style.visibility = 'visible';
	});

	//左点击取消(隐藏)菜单
	//给document绑定click进行取消操作，
	//使得无论点击那个地方都可以进行取消菜单的用户体验
	EventUtil.addHandler(document, 'click', function (event) {
		document.getElementById('myMenu').style.visibility = 'hidden';
	});
});

*/


// beforeunload 事件
/*
	为了让开发人员有可能在页面卸载前
	阻止这一操作。这个事件会在浏览器卸载页面之前触发，可以通过它来取消卸载并继续使用原有页面。
	但是，不能彻底取消这个事件，因为那就相当于让用户无法离开当前页面了。为此，这个事件的意图是
	将控制权交给用户。显示的消息会告知用户页面行将被卸载（正因为如此才会显示这个消息），询问用
	户是否真的要关闭页面，还是希望继续留下来
*/

// 解释中说明，这个事件时有事件反馈的，但是我们需要改变事件反馈达到我们的效果
/*var message = EventUtil.addHandler(window, "beforeunload", function (event) {
	event = EventUtil.getEvent(event);
	var message = "I'm really going to miss you if you go.";
	event.returnValue = message;		
	return message;
});
*/
// 刷新也会执行
// GC 会有“要重新加载该网站吗”提示，但是没有的自定义的提示语内容
// FF 也出现类似“此页面想询问您是否要离开 - 您输入的数据可能不会被保存。”提示，但是没有的自定义的提示语内容
// IE11 出现“确实要离开此页吗？”提示 + 网页信息 message

// beforeunload 更像一个离开页面跳转到其他页面的挽留语
// 使用快捷键方式(例如：Alt + F4)来关闭浏览器一般不会弹出确认提示框。

// DOMContentLoaded事件
// load，页面的一切加载完毕时触发，DOM树+外部script+images+css等
// DOMContented 在形成完整的DOM书之后就会触发，不理会图像、JS文件、CSS或者其他资源是否已经完成
// DOMContented 在页面早期(比load早)添加的事件处理程序，可以让用户能够尽早地与页面进行交互

/*要处理DOMContentLoaded 事件，可以为document 或window 添加相应的事件处理程序（尽管
这个事件会冒泡到window，但它的目标实际上是document）。*/


/*EventUtil.addHandler(document, 'DOMContentLoaded', function (event) {
	console.log('Content loaded!');		// Content loaded!
});*/

// 对于不支持DOMContentLoaded 的浏览器，我们建议在页面加载期间设置一个时间为0 毫秒的超
// 时调用。

/*setTimeout(function () {
	console.log('Content loaded!');	
}, 0);*/

/*
	这段代码的实际意思就是：“在当前JavaScript 处理完成后立即运行这个函数。”
	在页面下载和构建期间，只有一个JavaScript 处理过程，因此超时调用会在该过程结束时立即触发。
	至于这个时间与DOMContentLoaded 被触发的时间能否同步，主要还是取决于用户使用的浏览器和页面中的其他代码。
	为了确保这个方法有效，必须将其作为页面中的第一个超时调用；
	即便如此，也还是无法保证在所有环境中该超时调用一定会早于load 事件被触发。
*/


// DOMContentLoaded 事件对象不会提供任何额外的信息（其target 属性是document）。

// readystatechange事件
/*
这个事件的目的是提供与文档或元素的加载状态有关的信息，但这个事件的行为有时候也很难预料。
支持readystatechange 事件的每个对象都有一个readyState 属性，可能包含下列5 个值中的一个。

	uninitialized（未初始化）：对象存在但尚未初始化。
	loading（正在加载）：对象正在加载数据。
	loaded（加载完毕）：对象加载数据完成。
	interactive（交互）：可以操作对象了，但还没有完全加载。
	complete（完成）：对象已经加载完毕。
	
	并非所有对象都会经历readyState 的这几个阶段
	readystatechange 事件经常会少于4 次，而readyState 属性的值也不总是连续的。
 */

/*
	对于document 而言，值为"interactive"的readyState 会在与DOMContentLoaded 大致相
	同的时刻触发readystatechange 事件。此时，DOM树已经加载完毕，可以安全地操作它了，因此就
	会进入交互（interactive）阶段。但与此同时，图像及其他外部文件不一定可用。下面来看一段处理
	readystatechange 事件的代码。

	交互(interactive)阶段，DOM树加载完成，与DOM进行交互，但有可能其他外部资源还没有加载完成，
	是否和DOMContentLoaded发生些什么呢？
*/

/*EventUtil.addHandler(document, 'readystatechange', function (event) {
	if(document.readyState == 'interactive') {
		console.log('Content loaded');		// Content loaded
	}
});
// 这个事件的event 对象不会提供任何信息，也没有目标对象。
*/

/*
	在与load 事件一起使用时，无法预测两个事件触发的先后顺序。在包含较多或较大的外部资源的
	页面中，会在load 事件触发之前先进入交互阶段；而在包含较少或较小的外部资源的页面中，则很难
	说readystatechange 事件会发生在load 事件前面。
	让问题变得更复杂的是，交互阶段可能会早于也可能会晚于完成阶段出现，无法确保顺序。在包含
	较多外部资源的页面中，交互阶段更有可能早于完成阶段出现；而在页面中包含较少外部资源的情况下，
	完成阶段先于交互阶段出现的可能性更大。因此，为了尽可能抢到先机，有必要同时检测交互和完成阶
	段，如下面的例子所示。
*/

/*
	当readystatechange 事件触发时，会检测document.readyState 的值，
	看当前是否已经进入交互阶段或完成阶段。如果是，则移除相应的事件处理程序以免在其他阶段再执行。
	注意，由于事件处理程序使用的是匿名函数，因此这里使用了arguments.callee 来引用该函数。然
	后，会显示一个警告框，说明内容已经加载完毕。这样编写代码可以达到与使用DOMContentLoaded
	十分相近的效果。

*/
/*EventUtil.addHandler(document, "readystatechange", function (event) {
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		EventUtil.removeHandler(document, 'readystatechange', arguments.callee);
		// console.log('Content loaded');
		alert('Content loaded');
	}
});*/

/*
	DOM树完成，HTML的渲染也完成了呢？ 没有，DOM先完成，然后才渲染的
	一般发生的过程：
	发送请求：发送GET，请求url.html
	解析HTML并发送请求：解析HTML并且构建DOM树，发送GET请求，请求style.css和main.js
	解析样式：根据style.css创建CSSOM
	解析评估：main.js评估
	布局：基于HTML中的视窗meta生成布局
	绘制：绘制页面
*/

// 部分浏览器<script><link>也会触发readystatechange事件，可以用来确定外部的JavaScript和CSS文件是否加载完成
// <script> <link>添加到页面才会开始下载外部资源
// 基于元素触发的readystatechange事件存在问题，readyState属性无论等于 “loaded” 还是 “complete”都可以表示资源已经可用。
// 有时候，readyState会停在 “loaded” 阶段而永远不会“完成”；
// 有时候“complete” 都可以表示资源已经可用 
// 于是，还需要像对待document 一样采取相同的编码方式

/*EventUtil.addHandler(window, "load", function (event) {
	var script = document.createElement('script');

	EventUtil.addHandler(script, "readystatechange, function (event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		if (target.readyState == 'loaded' || target.readyState == "complete") {
			EventUtil.removeHandler(target, "readystatechange", arguments.callee);
			alert('Script Loaded!');
		}
	});

	// 
	script.src = 'https://code.jquery.com/jquery-3.2.1.slim.min.js';
	document.body.appendChild(script);
});
	// 没反应
*/


// P410 省去
// <link>

// pageshow 和pagehide 事件（未细读）
/*Firefox 和Opera 有一个特性，名叫“往返缓存”（back-forward cache，或bfcache），可以在用户使
用浏览器的“后退”和“前进”按钮时加快页面的转换速度。这个缓存中不仅保存着页面数据，还保存
了DOM 和JavaScript 的状态；实际上是将整个页面都保存在了内存里。*/

/*(function(){
	var showCount = 0;
	EventUtil.addHandler(window, "load", function(){
		alert("Load fired");
	});
	EventUtil.addHandler(window, "pageshow", function(){
		showCount++;
		alert("Show has been fired " + showCount + " times.");		// 都是1
	});
})();*/

/*(function() {
    var showCount = 0;
    EventUtil.addHandler(window, "load", function() {
        alert("Load fired");
    });
    EventUtil.addHandler(window, "pageshow", function() {
        showCount++;
        alert("Show has been fired " + showCount +
            " times. Persisted? " + event.persisted);			// 都是1
    });
})();*/

/*EventUtil.addHandler(window, "pagehide", function(event){
	alert("Hiding. Persisted? " + event.persisted);
});*/

// haschange事件
/*
	HTML5 新增了hashchange 事件，以便在URL 的参数列表（及URL 中“#”号后面的所有字符串）
	发生变化时通知开发人员。之所以新增这个事件，是因为在Ajax 应用中，开发人员经常要利用URL 参
	数列表来保存状态或导航信息。
	必须要把hashchange 事件处理程序添加给window 对象，然后URL 参数列表只要变化就会调用
	它。此时的event 对象应该额外包含两个属性：oldURL 和newURL。这两个属性分别保存着参数列表
	变化前后的完整URL。
*/


/*EventUtil.addHandler(window, "hashchange", function(event){
	alert("Old URL: " + event.oldURL + "\nNew URL: " + event.newURL);
});*/

// 最好是使用location对象来确定当前的参数列表。
/*EventUtil.addHandler(window, "hashchange", function(event){
	alert("Current hash: " + location.hash);
});*/

// 使用以下代码可以检测浏览器是否支持hashchange 事件：
// var isSupported = ("onhashchange" in window); //这里有bug

// 如果IE8 是在IE7 文档模式下运行，即使功能无效它也会返回true。为解决这个问题，可以使用
// 以下这个更稳妥的检测方式：
var isSupported = ("onhashchange" in window) && (document.documentMode === 
					undefined || document.documentMode > 7);

// 设备事件

/*
	orientationchange：能够确定用户何时将设备由横向查看模式切换为纵向查看模式。
	所有iOS 设备都支持orientationchange 事件和window.orientation 属性。

	MozOrientation：当设备的加速计检测到设备方向改变时，就会触发这个事
					件。但这个事件与iOS 中的orientationchange 事件不同，该事件只能提供一个平面的方向变化。由
					于MozOrientation 事件是在window 对象上触发的
		只有带加速计的设备才支持MozOrientation 事件，包括Macbook、Lenovo Thinkpad、Windows
	Mobile 和Android 设备。
	

	deviceorientation：在加速计检测到设备方向变化时在window 对象上触发，而且具有与MozOrientation 事件
					   相同的支持限制。不过，deviceorientation 事件的意图是告诉开发人员设备在空间中朝向哪儿，而
					   不是如何移动。
		在加速计检测到设备方向变化时在window 对象上触发，而且具有与MozOrientation 事件
	相同的支持限制。不过，deviceorientation 事件的意图是告诉开发人员设备在空间中朝向哪儿，而
	不是如何移动。


	devicemotion：设备什么时候移动，而不仅仅是设备方向如何改变。
	
	Android 版WebKit 实现了devicemotion 事件。
	
	Tingglelaoo - 探讨判断横竖屏的最佳实现 - 凹凸实验室
	https://aotu.io/notes/2017/01/31/detect-orientation/
 */


// 触摸和手势事件
/*
	触摸事件：

	touchstart：当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
	
	touchmove：当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用preventDefault()可以阻止滚动。

	touchend：当手指从屏幕上移开时触发。

	touchcancel：当系统停止跟踪触摸时触发。关于此事件的确切触发时间，文档中没有明确说明。
		触摸事件还包含下列三个用于跟踪触摸的属性：
		 - touches：表示当前跟踪的触摸操作的Touch 对象的数组。
		 - targetTouchs：特定于事件目标的Touch 对象的数组。
		 - changeTouches：表示自上次触摸以来发生了什么改变的Touch 对象的数组。

		Touch 对象包含下列属性：
		 - clientX：触摸目标在视口中的x 坐标。
		 - clientY：触摸目标在视口中的y 坐标。
		 - identifier：标识触摸的唯一ID。
		 - pageX：触摸目标在页面中的x 坐标。
		 - pageY：触摸目标在页面中的y 坐标。
		 - screenX：触摸目标在屏幕中的x 坐标。
		 - screenY：触摸目标在屏幕中的y 坐标。
		 - target：触摸的DOM 节点目标。

		在触摸屏幕上的元素时，这些事件（包括鼠标事件）发生的顺序如下：

			(1) touchstart
			(2) mouseover
			(3) mousemove（一次）
			(4) mousedown
			(5) mouseup
			(6) click
			(7) touchend
	
	手势事件：
	gesturestart：当一个手指已经按在屏幕上而另一个手指又触摸屏幕时触发。
	gesturechange：当触摸屏幕的任何一个手指的位置发生变化时触发。
	gestureend：当任何一个手指从屏幕上面移开时触发。
		还包含两个额外的属性：rotation 和scale。其中，rotation 属性表
		示手指变化引起的旋转角度，负值表示逆时针旋转，正值表示顺时针旋转（该值从0 开始）。而scale
		属性表示两个手指间距离的变化情况（例如向内收缩会缩短距离）；这个值从1 开始，并随距离拉大而
		增长，随距离缩短而减小。
 */


// 内存和性能
// JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能
// 	原因：每个函数都是对象，都会占用内存；内存中对象越多，性能就越差。
// 		  必须实现指定事件处理程序而导致到DOM访问次数，会延迟整个页面的交互就绪时间。


//  事件委托
// 对“事件处理程序过多”的问题解决方案就是事情委托。
// 事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。
// 
// 例如，click事件会一直冒泡到 document 层次。
// 我们可以为整个页面指定一个onclick事件处理程序，
// 而不必给每个可单击的元素分别添加事件处理程序。
// 
// 传统：
/*
var item1 = document.getElementById('goSomewhere');
var item2 = document.getElementById('doSomething');
var item3 = document.getElementById('sayHi');

EventUtil.addHandler(item1, 'click', function(event) {
	location.href = "http://www.wrox.com";
});

EventUtil.addHandler(item2, 'click', function (event){
	document.title = "I changed the document's title";
});

EventUtil.addHandler(item3, 'click', function (event) {
	alert('hi');
});
*/

// 如果在一个复杂的Web 应用程序中，对所有可单击的元素都采用这种方式，那么结果就会有数不清的代码用于添加事件处理程序
// 使用事件委托，只需在DOM 树中尽量最高的层次上添加一个事件处理程序，

// 由于所有列表项都是这个元素的子节点，而且它们的事件会冒泡，所以单击事件最终会被这个函数处理。
/*
var list = document.getElementById('myLinks');

EventUtil.addHandler(list, 'click', function (event) {
	event = EventUtil.getEvent(event);

	// 提取操作目标，操作目标里面有着详细的区别信息
	var target = EventUtil.getTarget(event);

	// 利用 switch 统一分别处理
	// 事件目标是被单击的列表项，
	// 故而可以通过检测id 属性来决定采取适当的操作。
	switch (target.id) {
		case "doSomething":
			document.title = "I changed the document's title";
			break;

		case 'goSomewhere':
			location.href = "http://www.wrox.com";
			break;

		case 'sayHi':
			alert('hi!');
			break;

		default:
			
			break;
	}

});
*/

/*与前面未使用事件委
托的代码比一比，会发现这段代码的事前消耗更低，因为只取得了一个DOM 元素，只添加了一个事件
处理程序。虽然对用户来说最终的结果相同，但这种技术需要占用的内存更少。所有用到按钮的事件（多
数鼠标事件和键盘事件）都适合采用事件委托技术。
*/


// 如果可行的话，也可以考虑为document对象添加一个事件处理程序，
// 用以处理页面发生的某种特定类型的事件。

// 优点：
// 1、document 对象很快就可以访问，而且可以在页面生命周期的任何时点上为它添加事件处理程序
// （无需等待DOMContentLoaded 或load 事件）。换句话说，只要可单击的元素呈现在页面上，
// 就可以立即具备适当的功能。

// 2、在页面中设置事件处理程序所需的时间更少。只添加一个事件处理程序所需的DOM 引用更少，
// 	所花的时间也更少。

// 3、整个页面占用的内存空间更少，能够提升整体性能。

/*
最适合采用事件委托技术的事件包括click、mousedown、mouseup、keydown、keyup 和keypress。
虽然mouseover 和mouseout 事件也冒泡，但要适当处理它们并不容易，而且经常需要计算元素的位置。
（因为当鼠标从一个元素移到其子节点时，或者当鼠标移出该元素时，都会触发mouseout 事件。）
*/

// 每当将事件处理程序指定给元素时，运行中的浏览器代码与支持页面交互的JavaScript 代码之间就
// 会建立一个连接。这种连接越多，页面执行起来就越慢。

// 事件委托技术，限制建立的链接数量


//  移除事件处理程序：在不需要的时候移除事件处理程序
//  内存中留有那些过时不用的“空事件处理程序”（dangling event handler），也是造成Web 应用程序内存与性能问题的主要原因。

/*
	可能造成不需要的事件处理程序：
		1、从文档中移除带有事件处理程序的元素时，没有移除在DOM上的事件处理程序
			removeChild()/replacechild()/innerHTML()，造成原来的事件处理程序极有可能无法被当做垃圾回收。
			的浏览器（尤其是IE）在这种情况下不会作出恰当地处理，它们很有可能会将对元素和
			对事件处理程序的引用都保存在内存中。如果你知道某个元素即将被移除，那么最好手工移除事件处理程序
			
			解决方案：
			
			// 设置innerHTML属性前，先执行移除操作
			btn.onclick = null;  	// 移除事件处理程序
			document.getElementById('myDiv').innerHTML = "Processing ……";
		
		2、卸载页面的时候。。如果在页面被卸载之前没有清理干净事件处理程序，那它们就会滞留在内存中。
			每次加载完页面再卸载页面时（可能是在两个页面间来回切换，
			也可以是单击了“刷新”按钮），内存中滞留的对象数目就会增加，
			因为事件处理程序占用的内存并没有被释放
			
			解决方案：
			页面卸载之前，通过onunload事件处理程序移除所有事件处理程序。
			利用事件委托情况下，---需要跟踪的事件处理程序越少，移除透明就越容易。
			
			使用onunload 事件处理程序意味着页面不会被缓存在bfcache 中。
*/


// 模拟事件
/*
	事件经常由用户操作或通过其他浏览器功能来触发。
	但很少有人知道，也可以使用JavaScript 在任意时刻来触发特定的事件，而此时的事件就如同浏览器创
	建的事件一样。
	
	在测试Web 应用程序，模拟触发事件是一种极其有用的技术。DOM2 级规范为此
	规定了模拟特定事件的方式
*/
// 	DOM中的时间模拟
	
/*
	document对象上使用createEvent()创建event对象。
	接受一个参数——要创建的事件类型的字符串
	在DOM2 级中，所有这些字符串都使用英文复数形式，而在DOM3级中都变成了单数。
	
	UIEvents: 一般化UI事件，鼠标事件和键盘事件都继承自UI事件，DOM3级中——UIEvent
	MouseEvents：一般化的鼠标事件。DOM3级中——MouseEvent
	MutationEvents：一般化的DOM变动事件。DOM3级——MutationEvent
	HTMLEvents：一般化的HTML事件。没有对应的DOM3级事件（HTML事件被分散到其他类别中）

	模拟事件：
		1、创建对象
		2、使用与事件有关的信息对其进行初始化，取决于createEvent()中使用的参数
		3、触发事件，需要使用dispatchEvent()方法
	

	dispatchEvent()方法，所有支持事件的DOM节点都支持这个方法，
	传入一个参数，即表示要触发事件的event对象

*/		

// 模拟鼠标事件
// createEvent('MouseEvents')， 返回一个initMouseEvent()方法，用于指定与该鼠标事件有关的信息
// initMouseEvent()方法接受15个参数，分别于鼠标事件中每个典型的属性一一对应：
// 	type
// 	bubbles
// 	cancelable
// 	view
// 	detail
// 	screenX/screenY
// 	clientX/clientY
// 	crtlKey/altKey/shiftKey/metaKey
// 	button
// 	relatedTarget
/*
	显而易见，initMouseEvent()方法的这些参数是与鼠标事件的event 对象所包含的属性一一对
	应的。其中，前4 个参数对正确地激发事件至关重要，因为浏览器要用到这些参数；而剩下的所有参数
	只有在事件处理程序中才会用到。当把event 对象传给dispatchEvent()方法时，这个对象的target
	属性会自动设置
*/


/*// 模拟对按钮的单击事件
var btn = document.getElementById('myBtn');

// 预先为元素添加好事件处理程序
EventUtil.addHandler(btn, 'click', function () {
	alert(11);
});

// 创建事件对象
var event = document.createEvent('MouseEvents');

// 初始化事件对象
event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0,
						false, false, false, false, 0, null); 
// 触发事件
btn.dispatchEvent(event);
*/

// 模拟键盘事件
// DOM3级规定
// createEvent('KeyboardEvent') ——> initKeyEvent()方法
// initKeyEvent() 方法接受如下参数：
// type
// bubbles
// cancelable
// view
// key
// location
// modifiers
// repeat

// 模拟的是 Shift + A
var textbox = document.getElementById('myTextbox'),
	event;

// 显示键码
EventUtil.addHandler(textbox, 'keydown', function (event) {
	event = EventUtil.getEvent(event);
	// var key = EventUtil.getCharCode(event);
	// if (event.getModifierState) {
	// 	console.log(event.getModifierState('Shift'));		// GC/IE11/FF 数字键盘 3，其他无反应
	// };
	// alert(EventUtil.getCharCode(event));
	var key = EventUtil.getCharCode(event)
	console.log(key);
});


// 以DOM3 级方式创建事件对象
if (document.implementation.hasFeature('KeyboardEvent', '3.0')) {
	// 创建键盘事件
	event = document.createEvent('keyboardEvent');

	// 初始化事件对象
	event.initKeyboardEvent('keydown', true, true, document.defaultView, "a",
							 0, 'Shift', 0);

}

// 触发事件
textbox.dispatchEvent(event);
	// 0，但是Shift：16
	// 将Shift改换成其他也是0


// 	IE中的事件模拟


