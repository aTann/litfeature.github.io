
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
	 * @param element {nodeElement} 需要绑定事件处理的元素
	 *
	 *
	 * 
	 */
		

	addHandler: function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (event.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},

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
	addHandler: function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (event.attachEvent) {
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

	// 阻止默认事件
	preventDefault: function (event) {
		if (event.preventDefault) {
			event.preventDefault();	
		} else {
			event.returnValue = false;
		}
	},

	// 移除事件
	removeHandler: function (element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}		
	},

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
	  - 合成事件：电脑管家IME(Input Method Editor, 输入法编辑器)输入字符时触发
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
/*只有在设置了<script>元素的src 属性并将该元素添加到文档后，才会开始下
载JavaScript 文件。换句话说，对于<script>元素而言，指定src 属性和指定事件处理程序的先后顺
序就不重要了。*/

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
/*虽然scroll 事件是在window 对象上发生的，但它实际表示的则是页面中相应元素的变化。在混
杂模式下，可以通过<body>元素的scrollLeft 和scrollTop 来监控到这一变化；而在标准模式下，
除Safari 之外的所有浏览器都会通过<html>元素来反映这一变化（Safari 仍然基于<body>跟踪滚动位
置）
*/
/*
EventUtil.addHandler(window, "scroll", function (event) {
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
	
	blur:

	focus:

	focusin:

	focusout:

*/

// 鼠标事件和滚轮事件

/*
	
	click:

	dbclick:

	mousedown:

	mouseenter:

	mouseleave:

	mousemove:
	
	mousrout:

	mouseover:

	mouseup:
	
	MDN - 触摸事件
	https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events
	
	jack_孟 - JS移动客户端--触屏滑动事件
	http://www.cnblogs.com/mq0036/p/3934821.html

	touchstart: 手指放到屏幕上时触发

	touchmove: 手指在屏幕上滑动式触发

	touchend: 手指离开屏幕时触发

	touchcancel: 系统取消touch事件的时候触发，这个好像比较少用
	


*/

// 文本和键盘事件
/*
	keydown：

	keypress：

	keyup：

	textIput: 

*/

// 合成事件

/*
	compositionstart：在IME的文本复合系统打开时触发，表示要输入了

	compositionupdate：在向输入字段中插入新字符时触发

	compositioned：在IME的文字复合系统关闭时触发，表示返回正常键盘输入状态
 */

// 变动事件
/*

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



// HTML5事件

/*
	contextmenu：上文文菜单
	
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


// 设备事件

/*
	orientationchange：能够确定用户何时将设备由横向查看模式切换为纵向查看模式。
	
	MozOrientation：当设备的加速计检测到设备方向改变时，就会触发这个事
					件。但这个事件与iOS 中的orientationchange 事件不同，该事件只能提供一个平面的方向变化。由
					于MozOrientation 事件是在window 对象上触发的
	
	deviceorientation：在加速计检测到设备方向变化时在window 对象上触发，而且具有与MozOrientation 事件
					   相同的支持限制。不过，deviceorientation 事件的意图是告诉开发人员设备在空间中朝向哪儿，而
					   不是如何移动。
	
	devicemotion：设备什么时候移动，而不仅仅是设备方向如何改变。

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

//  事件委托

//  移除事件处理程序



// 模拟事件
// 	DOM中的时间模拟

// 	IE中的事件模拟


