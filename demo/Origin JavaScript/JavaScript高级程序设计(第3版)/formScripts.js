/*
本章内容
	. 理解表单
	. 文本框验证与交互
	. 使用其他表单控制
*/
// JavaScript 最初的一个应用，分担服务器处理表单的责任，打破处处依赖服务器的局面。

// 很多开发人员不仅会在验证表单时使用JavaScirpt，而且还增强了一些标准表单控件的默认行为。

// 表单的基础知识
// HTML: 表单<form>		
// JavaScript: HTMLFormElement类型，继承自HTMLElement
// HTMLFormElement独有的属性和方法：
// acceptCharset[= HTML: accept-charset]: 服务器能够处理的字符集
// action[= HTML: action]: 接受请求的URL
// elements: 表单中所有控件的集合（HTMLFormElement）。
// enctype[= HTML: enctype]: 请求的编码类型
// length: 表单中控件的数量
// method[= HTML: method]: 要发送的HTTP 请求类型，通常是"get"或"post"
// name[= HTML: name]: 表单的名称
// reset(): 将所有表单域重置为默认值。
// submit(): 提交表单
// target[= HTML: target]: 用于发送请求和接收响应的窗口名称

// 取得<form>元素
/*
// 1、与其他元素一样，添加id特性，利用getElementById()
var form = document.getElementById('form1');
console.log(form);

// 2、document.forms 取得页面中所有的表单，利用数值索引或是name值取得特定的表单

var form = document.forms[0];		// 页面中第一个<form>
console.log(form);

var form = document.forms['form1']; // 页面中form[name = 'form1']
console.log(form);

// 可以同时指定id和name，可以相同也可不同
*/


// 提交表单

// <input>或<button>都可以定义提交按钮

/*
<!-- 通用提交按钮 -->
<input type="submit" name="" value="Submit Form" />

<!-- 自定义提交按钮 -->
<button type='submit'>Submit Form</button>

<!-- 图像按钮 -->
<input type="image" name="" src="http://front.pixfs.net/images/blog/post/desktop/icon-mail.png?v=d15cd90775b255a498cb236abef61b6b">
<!-- 使用图片按钮，出现图片上的位置显示?x=2&y=4  -->
*/


// 使用EventUtil对象，以便于跨浏览器处理事件
var EventUtil = {

	/**
	 * 添加一个DOM事件处理程序
	 * @param {[type]} element 需要绑定事件处理的元素
	 * @param {[type]} type    需要绑定事件处理类型，如[on]click
	 * @param {[type]} handler 需要绑定事件处理
	 * 
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
	 * getEvent获取事件
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	getEvent: function (event) {
		return event ? event : window.event;
	},

	/**
	 * getTarget获取事件绑定元素
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	getTarget: function (event) {
		return event.target || event.srcElement;
	},


	/**
	 * getRelatedTarget相关元素获取
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
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

	/**
	 * getButton获取鼠标按钮标记
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
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


	/**
	 * getWheelDelta滚轮事件方向确定
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	getWheelDelta: function (event) {
		if (event.wheelDelta) {
			/*return (client.engine.opera && client.engine.opera < 9.5 :  // opera < 9.5 符号和上下滚相反
				-event.wheelDelta : event.wheelDelta);*/
			return event.wheelDelta;
		} else {
			return -event.detail;			// Firefox 2/-2 偶尔也会出现其他数字
		}
	},


	/**
	 * getCharCode获取字符编码
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	getCharCode: function (event) {
		if (typeof event.charCode == "number" && 
			event.charCode != '0') {	// GC59 FF IE11打出来都是0
			return event.charCode;
		} else {
			// 一般来说 event.charCode = event.keyCode
			return event.keyCode;
		}
	},


	/**
	 * preventDefault阻止默认事件
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
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


	/**
	 * 阻止事件流传播，这里是统一为冒泡事件机制
	 * @param  {String} event [description]
	 * @return {undefined}       [description]
	 */
	stopPropagation: function (event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = ture;
		}
	}
}


/*
	只要表单中存在上面列出的任何一种按钮，那么在相应表单控件拥有焦点的情况下，按回车键就可以提交该表单。（textarea 是一个例外，在文本区中回车会换行。）如果表单里没有提交按钮，按回车键不会提交表单。

	以这种方式提交表单时，浏览器会在将请求发送给服务器之前触发submit 事件。这样，我们就有机会验证表单数据，并据以决定是否允许表单提交。阻止这个事件的默认行为就可以取消表单提交

*/

var form = document.getElementById('myForm');

/*
var form = document.getElementById('myForm');

EventUtil.addHandler(form, 'submit', function (event) {
	// 取得事件对象
	event = EventUtil.getEvent(event);

	// 阻止默认事件
	EventUtil.preventDefault(event);
});
*/

/*
在JavaScript 中，以编程方式调用submit()方法也可以提交表单。而且，这种方式无需表单包含
提交按钮，任何时候都可以正常提交表单。
在以调用submit()方法的形式提交表单时，不会触发submit 事件，因此要记得在调用此方法之前先验证表单数据。*/
/*var form = document.getElementById('myForm');
// 提交表单
form.submit();		// 会触发无限重交
*/


/*	
提交表单可能出现的最大问题，就是重复提交表单。
	原因：第一次提交表单后，如果长时间没有响应
	表现：反复单击提交按钮
	影响：1）服务器要重复处理请求；2）造成错误(例如，多次下订单)
	解决：1）第一次提交表单之后禁用提交按钮
		  2）利用onsubmit事件处理取消表单提交操作
*/


// 重置表单
// type 特性值 reset <input> 或 <button>
// 在重置表单时，所有表单字段都会恢复到页面刚加载完毕时的初始值。
// 如果某个字段的初始值为空，就会恢复为空；而带有默认值的字段，也会恢复为默认值。
/*<!-- 通用重置按钮 -->
<input type="reset" name="" value="重置表单">

<!-- 自定义重置按钮 -->
<button type="reset">重置表单</button>*/

// 阻止表单重置
/*EventUtil.addHandler(form, 'reset', function (event) {
	// 取得事件对象
	event = EventUtil.getEvent(event);

	// 阻止表单重置
	EventUtil.preventDefault(event);
});*/
// 是否一个表单，只要把操作的事件绑定在form即可，不要绑定在精确的按钮？


// 重置表单
// form.reset();

/*
	在Web 表单设计中，重置表单通常意味着对已经填写的数据不满意。重置表单
	经常会导致用户摸不着头脑，如果意外地触发了表单重置事件，那么用户甚至会很恼
	火。事实上，重置表单的需求是很少见的。更常见的做法是提供一个取消按钮，让用
	户能够回到前一个页面，而不是不分青红皂白地重置表单中的所有值。

*/


// 表单字段
// 使用原生DOM方法访问表单元素
// 每个表单都有elements属性，该属性是表单中所有表单元素(字段)的集合。
// 这个elements集合是一个有序列表，其中包含着表单中所有的字段，例如<input>、<textarea>、<button>、<fieldset>.
// 每个表单字段在elements集合中的顺序，与它们出现在标记中的顺序相同，可以按照位置和name特性来访问它们。
/*
// 取得表单中第一个字段
var field = form.elements[0];

// 取得名为 textbox1 的字段
var filed2 = form.elements['textbox1'];

// 取得表单中包含的字段的数量
var fieldCount = form.elements.length;

console.log(field);		// <fieldset>我是一个表单元素</fieldset>

console.log(filed2);	// <input type="text" name="textbox1">

console.log(fieldCount);		// 6
*/

// 如果有多个表单控件都在使用一个 name (如单选按钮)，那么就会返回以该 name 命名的一个 NodeList。

/*
var colorFields = form.elements['color'];   // 不推荐
console.log(colorFields.length);	//3

var firstColorField = colorFields[0];
var firstFormField = form.elements[0];
console.log(firstColorField == firstFormField);		// true

// 通过 form.elements[0] 访问到的第一个表单字段，与包含在form.elements["color"]中的第一个元素相同。
*/

/*
	也可以通过访问表单的属性来访问元素，例如form[0]可以取得第一个表单字
	段，而form["color"]则可以取得第一个命名字段。这些属性与通过elements 集
	合访问到的元素是相同的。但是，我们应该尽可能使用elements，通过表单属性访
	问元素只是为了与旧浏览器向后兼容而保留的一种过渡方式。
*/

// 公有的表单字段属性：
/*
	disabled：布尔值，表示当前字段是否被禁用
	form：指向当前字段所属表单的指针；只读
	name：当前字段的名称
	readOnly：布尔值，表示当前字段是否只读，可以用DOM event.blur()实现
	tabIndex：表示当前字段的切换(tab)序号
	type：当前字段的类型，如“checkbox”、“radio”
	value：当前字段将被提交给服务器的值。对文件字段来说，这个属性是只读，包含着文件在计算机中的路径
*/

/*
var field = form.elements[0];

// 修改value的属性
field.value = 'pink';

// 检查 form 属性的值
console.log(field.form == form);	// true

// 把焦点设置到当前字段
field.focus();

// 禁用当前字段
field.disabled = true;

// 修改type属性(不推荐，但对<input>来说是可行的)
field.type = 'checkbox';
*/
// 能够动态修改表单字段属性，意味着我们可以在任何时候，以任何方式来动态操作表单。

// 很多用户可能会重复单击表单的提交按钮。
// 在涉及信用卡消费时，这就是个问题：因为会导致费用翻番。
// 为此，最常见的解决方案，就是在第一次单击后就禁用提交按钮。
// 只要侦听submit 事件，并在该事件发生时禁用提交按钮即可。


// 避免多次提交按钮
// 一旦提交之后就会跳转，重新进入页面，禁用是否有用呢？
EventUtil.addHandler(form, "submit", function (event) {
	
	event = EventUtil.getEvent(event);
	// event.preventDefault();
	var target = EventUtil.getTarget(event);

	// 获取提交按钮
	var btn = target.elements["submit-btn"];

	// 禁用它
	btn.disabled = true;
	// alert(btn.disabled);
});
// 最好是通过 submit 事件来禁用提交按钮。不过，这种方式不适合表单中不包含提交按钮的情况

// 注意，不能通过 onclick 事件处理程序来实现这个功能，原因是不同浏览器之间存在“时差”：有的浏览器会在触发表单的 submit 事件之前触发 click 事件，而有的浏览器则相反。


/*
	说 明 				HTML示例 							type属性的值
	单选列表 			<select>...</select> 				"select-one"
	多选列表 			<select multiple>...</select> 		"select-multiple"
	自定义按钮 			<button>...</button> 				"submit"
	自定义非提交按钮 	<button type="button">...</button> 	"button"
	自定义重置按钮 		<button type="reset">...</buton> 	"reset"
	自定义提交按钮 		<button type="submit">...</buton> 	"submit"

*/


// 公有的表单字段方法

// focus()	用于将浏览器的焦点设置到表单字段，即激活表单字段，使其可以响应键盘事件。
// 			使用 focus() 方法，可以将用户的注意力吸引到页面中的某个部位
// 			可以侦听页面的load 事件，并在该事件发生时在表单的第一个字段上调用focus()方法
// 			如第一个是 <input type="hidden">，代码会发生错误，需要代码进行过滤 input[type=hidden]
// 			HTML5 autofocus 属性，不需要 js focus

/*
EventUtil.addHandler(window, 'load', function (event) {
	var element = document.forms[0].elements[0];
	// 因为 autofocus 是一个布尔值属性，所以在支持的浏览器中它的值应该是true。
	// （在不支持的浏览器中，它的值将是空字符串）
	if (element.autofocus != true) {
		element.focus();
	}

	// 前提：tabIndex = -1; 
	// div.focus(); 确实可以聚焦
	// var div = document.getElementsByTagName('div')[1];
	// div.focus();
	// console.log(div);
});*/

/*
	在默认情况下，只有表单字段可以获得焦点。对于其他元素而言，如果先将其tabIndex 属性设置为1，然后再调用focus()方法，也可以让这些元素获得焦点。只有Opera 不支持这种技术。
	在 IE11 中，<div> 不需要设置 tabIndex = -1 也会触发 focus 样式改变
*/

// blur()
// 那时候的表单字段还没有 readonly 特性，因此就可以使用 blur() 方法来创建只读字段。
// 现在，虽然需要使用 blur() 的场合不多了，但必要时还可以使用的

// document.forms[0].elements[0].blur();

// 公有的表单字段事件
/*
除了支持鼠标、键盘、更改和 HTML 事件之外，所有表单字段都支持下列3 个事件。
. blur：当前字段失去焦点时触发。
. change：对于<input>和<textarea>元素，在它们失去焦点且value 值改变时触发；对于
<select>元素，在其选项改变时触发。
. focus：当前字段获得焦点时触发。
*/
/*
	当用户改变了当前字段的焦点，或者我们调用了 blur() 或 focus() 方法时，都可以触发 blur 和 focus 事件。这两个事件在所有表单字段中都是相同的。但是，change 事件在不同表单控件中触发的	次数会有所不同。对于 <input> 和 <textarea>元素，当它们从获得焦点到失去焦点且value 值改变时，才会触发 change 事件。对于<select>元素，只要用户选择了不同的选项，就会触发change 事件；
	换句话说，不失去焦点也会触发 change 事件。
*/
/*
	通常，可以使用 focus 和 blur 事件来以某种方式改变用户界面，要么是向用户给出视觉提示，要么是向界面中添加额外的功能（例如，为文本框显示一个下拉选项菜单）。而 change 事件则经常用于验证用户在字段中输入的数据。例如，假设有一个文本框，我们只允许用户输入数值。此时，可以利用 focus 事件修改文本框的背景颜色，以便更清楚地表明这个字段获得了焦点。可以利用 blur 事件恢复文本框的背景颜色，利用 change 事件在用户输入了非数值字符时再次修改背景颜色。*/
/*
var textbox = document.forms[0].elements[0];

// 一旦 textbox 获取焦点就会发生背景色改变
EventUtil.addHandler(textbox, 'focus', function (event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	if (target.style.backgroundColor != 'red') {
		target.style.backgroundColor = 'yellow';
	}
});

EventUtil.addHandler(textbox, 'blur', function (event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	// 检测输入的值，如果不是数字就会变红
	if (/[^\d]/.test(target.value)) {
		target.style.backgroundColor = 'red';
	} else {
		target.style.backgroundColor = '';
	}
});

// textbox 发生改变之后，如果值不是数字就会变红
EventUtil.addHandler(textbox, 'change', function (event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	// 检测输入的值，如果不是数字就会变红
	if (/[^\d]/.test(target.velue)) {
		target.style.backgroundColor = 'red';
	} else {
		target.style.backgroundColor = '';
	}
});

*/


// 使用正则作为验证

/*
	关于 blur 和 change 事件的关系，并没有严格的规定。在某些浏览器中，blur
	事件会先于 change 事件发生；而在其他浏览器中，则恰好相反。为此，不能假定这
	两个事件总会以某种顺序依次触发，这一点要特别注意。
 */



// 文本框脚本
// 有两种方式来表现文本框：
// 	一种是使用 <input> 元素的单行文本框，
// 	另一种是使用 <textarea> 的多行文本框。
/*
文本框：<input type="text">
	type：type="text"
	size：指定文本框中能够显示的字符数：size="能够显示的字符数"
	value：设置文本框的初始值
	maxlength：用于指定文本框可以接受的最大字符数
*/
// <input type="text" name="color" size="10" maxlength="15" value="initial value" class="form-control">
/*
多行文本框：textarea
	rows + cols:指定文本框大小
	rows：指定文本框的字符行数
	cols: 指定文本框的字符列数
	初始值需要放在 <textarea></textarea> 中间

	文本框都可以通过 .value 进行修改和获取值
	
	不建议使用标准的 DOM 方法，也就是不要使用 setAttribute() 设置 <input> 元素的 value 特性，也不要去修改 <textarea> 元素的第一个子节点。
	原因：对 value 属性所作的修改，不一定会反映在DOM中

*/

// 选择文本
/*
	select() 方法，这个方法用于选择文本框中的所有文本。
	在调用 select() 方法时，大多数浏览器都会将焦点设置到文本框中。
	select() 不接受参数，可以在任何时候被调用
 */
/*
var textbox = document.forms[0].elements[0]
// console.log(textbox);
textbox.select();

*/

/*// 在文本框获得焦点时选择其所有文本，这是一种非常常见的做法，特别是在文本框包含默认值的时候。因为这样做可以让用户不必一个一个字符地删除文本。

// 只有文本框获得焦点，才会选中所有的文本
var textbox = document.forms[0].elements[0];
EventUtil.addHandler(textbox, 'focus', function (event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	target.select();
});
*/

// 选择(select)事件
/*
	select()对应的是一个select事件。在选择了文本框中的文本时，就会触发 select 事件。
	到底什么时候触发 select 事件，还会因浏览器而已
	有的用户选择了文本(而且要释放鼠标)，才会触发 select 事件
	
	有的浏览器 (IE8) 只要用户选择了一个字母(不必释放鼠标)，就会触发 select 事件
	IE8 选择过程中就已经开始触发 select 事件
*/
/*
var textbox = document.forms[0].elements[0];
EventUtil.addHandler(textbox, 'select', function (event) {
	var event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	alert('Text selected ' + target.value);
});
*/

// 取得选择的文本

// selectionStart：文本选区开头
// selectionEnd：结尾的偏移量
// 这两个属性中保存的是基于 0 的数值，表示所选择文本的范围(即文本选区开头和结尾的偏移量)

// IE8：document.selection 对象，其中保存着用户在整个文档范围内选择
// 的文本信息；也就是说，无法确定用户选择的是页面中哪个部位的文本。
// 在与 select 事件一起使用的时候，可以假定是用户选择了文本框中的文本，
// 因而触发了该事件。
// 要取得选择的文本，首先必须创建一个范围，然后在将文本从其中提取出来
/*
function getSelectedText(textbox) {
	if (typeof textbox.selectionStart == 'number') {
		return textbox.value.substring(textbox.selectionStart, 
									   textbox.selectionEnd);
	} else if (document.selection) {
		// IE8情况下，一旦选择过程开始就会发生 select 事件，能够选择的字符数不多
		// 需要设置 抖动函数
		return document.selection.createRange().text;
	}
	
}

var textbox = document.forms[0].elements[0];


// 使用抖动函数，对 非IE8 浏览器有延迟
EventUtil.addHandler(textbox, 'select', debounce(function (event) {
	var event = EventUtil.getEvent(event);
	// var target = EventUtil.getTarget(event);
	alert('Text selected ' + getSelectedText(textbox));
	
}, 300));


*/
function debounce(fn, delay) {
	var timer;
	return function () {
		// 为什么这个 this/arguments 不是 闭包的？
		// DOM 事件处理程序中，this 指向当前的元素 （这里 input）
		var context = this;
		var args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args)
			// alert(context)  // [object HTMLInputElement]
			// alert(args) // [object Arguments]
		}, delay);
	}
		
}

// 选择部分文本
// HTML5 为选择文本框中的部分文本提供了解决方案，
// setSelectionRange(): 所有文本框除 select() 之外的共有函数，
// 两个参数：要选择的第一字符的索引 和  最后一个字符之后的字符的索引(类似substring(start:int, end:int)方法的两个参数)

/*
// 配置 focus() 一起使用

var textbox = document.forms[0].elements[0];
console.log(textbox.value);
textbox.value = 'Hellow world!';

textbox.focus();

// 选择所有文本
// textbox.setSelectionRange(0, textbox.value.length);

// 选择前 3 个字符
// textbox.setSelectionRange(0, 3);

// 选择前 4 到 6 个字符
textbox.setSelectionRange(4, 7);
*/

// IE8 
/*
	1、所有文本框上提供的 createTextRange() 方法创建一个范围，并将其放置恰当的位置
	2、使用collaase()将范围折叠到文本框的开始位置，moveStart() 和 moveEnd() 将范围起点和终点移动到相同的位置
	3、使用 moveStart() 和 moveEnd() 这两个范围方法将范围移动到位，只需要给 moveEnd() 传入要选择的字符总数即可
	4、使用范围的 select() 方法选择文本

*/
/*var textbox = document.forms[0].elements[0];
textbox.value = 'Hellow world!';

var range = textbox.createTextRange();

// 选择所有的文本
range.collapse(true);
range.moveStart('character', 0);
range.moveEnd('character', textbox.value.length);
range.select();

// 选择前 3 个字符
range.collapse(true);
range.moveStart('character', 0);
range.moveEnd('character', 3);
range.select();

// 选择前 4 到 6 个字符
range.collapse(true);
range.moveStart('character', 4);
range.moveEnd('character', 3);
range.select();
*/

// 可以做兼容函数
// 需要传入，要操作的文本框，选择文本起始位置索引，选择文本结束位置索引

// 过滤输入
// 用于要求用户在文本框中输入特定的数据，或者输入特定格式的数据。

// 1、屏蔽字符
// 我们需要用户输入的文本中包含或不包含某些字符
// 阻止按键的 keypress 事件的默认行为
/*var textbox = document.forms[0].elements[0];
EventUtil.addHandler(textbox, "keypress", function(event){
	event = EventUtil.getEvent(event);
	EventUtil.preventDefault(event);
});
*/

// 检测按钮进行屏蔽
// 文本框就会忽略所有输入的非数值。
var textbox = document.forms[0].elements[0];
EventUtil.addHandler(textbox, "keypress", function(event){
	event = EventUtil.getEvent(event);
	// 获取字符编码
	var charCode = EventUtil.getCharCode(event);
	// console.log(String.fromCharCode(charCode));
	// 用String.fromCharCode()将字符编码转换成字符串，再使用正则表达式 /\d/ 来测试该字符串，从而确定用户输入的是不是数值
	
	// 有些浏览器会对向上键、向下键、退格键和删除键触发keypress 事件；
	// 还要避免屏蔽这些极为常用和必要的键
	// 在Firefox 中，所有由非字符键触发的keypress 事件对应的字符编码为0，
	// 而在Safari 3 以前的版本中，对应的字符编码全部为8。
	// 为了让代码更通用，只要不屏蔽那些字符编码小于 10 的键即可。
	 
	// 还有一个问题需要处理：复制、粘贴及其他操作还要用到Ctrl 键。在除IE 之外的所有
	// 	浏览器中，前面的代码也会屏蔽Ctrl+C、Ctrl+V，以及其他使用Ctrl 的组合键。因此，最后还要添加一
	// 	个检测条件，以确保用户没有按下Ctrl 键
	if (!/\d/.test(String.fromCharCode(charCode)) && 
				  charCode > 9 && 
				  !event.ctrlKey) {
		EventUtil.preventDefault(event);
	}

	// Google chrome 未能禁止 Backspace 事件以及其他 功能按钮

	// 即使检测了所有的条件，但是使用中文(东亚)输入法时候，会导致事情失效，也就是说使用中文输入法可以绕过对 利用字符编码按键输入的禁止
	
});

// 让 type = number 的 spin 不能由 向上 和 向下键 触发
EventUtil.addHandler(textbox, 'focus', function(event) {
	event = EventUtil.getEvent(event);
	var contextEle = this;
	if (contextEle.type == 'number') {
		// 上下按键
		EventUtil.addHandler(contextEle, 'keydown', function (event) {
			var charCode = EventUtil.getCharCode(event);
			if (charCode === 38 || charCode === 40 ) {
				EventUtil.preventDefault(event);
			}
		});

		// 鼠标滑轮
		(function () {
			function handlerMouseWheel(event) {
				event = EventUtil.getEvent(event);
				EventUtil.preventDefault(event);
				console.log(event.type)
			};

			EventUtil.addHandler(contextEle, 'mousewheel', handlerMouseWheel);
			EventUtil.addHandler(contextEle, 'DOMMouseScroll', handlerMouseWheel);
		})();
		
		
	}

});

// 李大仁 - 浏览器IME输入法控制禁止输入中文
// https://www.lidaren.com/archives/1240
// 检查东亚输入法输入的字符串

// 好像对 IE11 没用
/*EventUtil.addHandler(textbox, 'compositionstart', function (event) {
	
	// 方案一：
	// 使用复合事件进行，失去焦点，再次获取焦点，
	// 以让 IME 失去作用，并利用 placeholder 发出警告

	// event = EventUtil.getEvent(event);
	var context = this;
	// context.blur();
	// setTimeout(function () {
	// 	context.focus();
	
	// }, 300);
	
	// 方案二：
	// 	  一旦发现 IME，设置 type = 'tel'
	// 	  HTML5 type = 'tel' 不能使用 IME
	context.setAttribute('type', 'number');
	context.setAttribute('style', 'ime-mode:disabled;')
	context.placeholder = '请更换输入法';

});
*/


/*
<input type="text" name="textbox" placeholder="Yellow" class="form-control" style="ime-mode:disabled" onpaste="return false" ondragenter="return false">
	简单的 
		onpaste="return false" 禁止粘贴、
		ondragenter="return false" 禁止拖放 拖放在 GC 中不起作用
		style="ime-mode:disabled"  阻止东亚输入法使用 非标准CSS 部分浏览器【Google chrome】 	1) 手机的 <input type='tel'> 2) onkeyup="this.value=this.value.replace(/[\u4e00-\u9fa5]/g,'')"
		\u4e00-\u9fa5为中文的编码范围
*/

/*
HTML 5 后来也把剪贴板事件纳入了规范。下列就是6 个剪贴板事件。
 beforecopy：在发生复制操作前触发。
 copy：在发生复制操作时触发。
 beforecut：在发生剪切操作前触发。
 cut：在发生剪切操作时触发。
 beforepaste：在发生粘贴操作前触发。
 paste：在发生粘贴操作时触发。
*/

/*
	在Safari、Chrome 和Firefox中，beforecopy、beforecut 和beforepaste 事件只会在显示针对文本框的上下文菜单（预期将发
	生剪贴板事件）的情况下触发。但是，IE 则会在触发copy、cut 和paste 事件之前先行触发这些事件。
	至于copy、cut 和paste 事件，只要是在上下文菜单中选择了相应选项，或者使用了相应的键盘组合
	键，所有浏览器都会触发它们。


	在实际的事件发生之前，通过beforecopy、beforecut 和beforepaste 事件可以在向剪贴板发
	送数据，或者从剪贴板取得数据之前修改数据。
	不过，取消这些事件并不会取消对剪贴板的操作——只有取消copy、cut 和paste 事件，才能阻止相应操作发生。
*/

// 要访问剪贴板中数据：
// clipboardData 对象
// IE   对象是window  随时访问 clipboardData
// FF 4+、Sar、GC  event    处理剪贴板事件期间 clipboardData 对象才有效

// clipboardData 对象有 3 方法：
// getData(): 用于从剪贴板中取得数据，接受一个参数，即要取得的数据的格式， IE-- "text" 和 "URL"   FF/Sar/GC -- 一种 MIME 类型，可以用 text - text/plain 
// setData(): 两个参数，第一个参数数据类型，如同 getData() 中的数据类型，但是 FF/Sar/GC 不识别 "text"，
// ，第二个参数是要放在剪贴板中的文本， 成功将文本添加，返回true，否则，返回 false
// cleardData(): 清空剪贴板


// 从剪贴板中获取 text 类型数据
EventUtil.getClipboardText = function (event) {
	var clipboardData = (event.clipboardData || window.clipboardData);
	return clipboardData.getData("text");
};

// 往剪贴板中添加 text 类型数据
// 根据不同浏览器的实现 ( clipboardData 的对象不同) 为 clipboardData.setData() 传入不同的类型
EventUtil.setClipboardText = function (event, value) {
	if (event.clipboardData) {
		return event.clipboardData.setData("text/plain", value);
	} else if (window.clipboardData) {
		return window.clipboardData.setData("text", value);
	};
};

/*
	在需要确保粘贴到文本框中的文本中包含某些字符，或者符合某种格式要求时，能够访问剪贴板是非
	常有用的。例如，如果一个文本框只接受数值，那么就必须检测粘贴过来的值，以确保有效。在paste
	事件中，可以确定剪贴板中的值是否有效，如果无效，就可以像下面示例中那样，取消默认的行为。

 */

 // onpaste 事件处理程序可以确保只有数值才会被粘贴到文本框中。
 // 如果剪贴板的值与正则表达式不匹配，则会取消粘贴操作
/*
var textbox = document.forms[0].elements[0];
EventUtil.addHandler(textbox, "paste", function (event) {
	event = EventUtil.getEvent();
	var text = EventUtil.getClipboardText(event);

	if (!/^\d*$/.test(text)) {
		EventUtil.preventDefault(event);
	}
});
*/

// 自动切换焦点
/*
最常见的一种方式就是在用户填写完当前字段时，自动将焦点切换到下一个字段。通常，在自动切换焦点之前，必须知道用户已经输入了既定长度的数据（例如电话号码）。
*/


// 美国的电话号码通常会分为三部分：区号、局号和另外4 位数字。为取得完整的电话号码，很多网页中都会提供下列3 个文本框：


/*
	为增强易用性，同时加快数据输入，可以在前一个文本框中的字符达到最大数量后，自动将焦点切
	换到下一个文本框。换句话说，用户在第一个文本框中输入了3 个数字之后，焦点就会切换到第二个文
	本框，再输入3 个数字，焦点又会切换到第三个文本框。这种“自动切换焦点”的功能，可以通过下列
	代码实现：
 */

/*
(function () {
	
	function tabForward(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		// 达到最大长度
		if (target.value.length == target.maxLength) {
			var form = target.form;
			// 循环当前 form 中元素
			for (var i = 0, len = form.elements.length; i < len; i++) {
												// error length ==> lenght
				// 找到目标元素 和 在当前 form 的索引
				if (form.elements[i] == target) {
					// 当前 from 是否还有下一个元素，有，转移焦点
					if (form.elements[i+1]) {
						form.elements[i+1].focus();
					}
					return;
				}
			}
		}
	}

	// 利用 form 事件委托，减少 事件绑定
	// 但是如果在有着许多 form 和 input[text] 情况下，会减少了 灵活性
	
	// var form1 = document.getElementById('form1');
	// EventUtil.addHandler(form1, 'keyup', tabForward);

	// 不过可以放到更外的祖先层，那么不会局限于某个 form
	
	// var box = document.getElementById('box');
	// EventUtil.addHandler(box, 'keyup', tabForward);

	// var textbox1 = document.getElementById('txtTel1');
	// var textbox2 = document.getElementById('txtTel2');
	// var textbox3 = document.getElementById('txtTel3');

	// EventUtil.addHandler(textbox1, 'keyup', tabForward);
	// EventUtil.addHandler(textbox2, 'keyup', tabForward);
	// EventUtil.addHandler(textbox3, 'keyup', tabForward);

})();
*/

// 立即函数前一个如果是 函数定义 或是 {}结尾，如果没有 分号 ; 会导致出错，
// Chrome 的出错信息如下：
// Uncaught TypeError: (intermediate value)(…) is not a function

// 这些代码只适用于前面给出的标记，而且没有考虑隐藏字段。


// HTML5 约束验证 API

// 约束指定

// 1) 必填字段 		required    表单不能空着
//		 <input type="text" name="username" requied>

/*
		在JavaScript 中，通过对应的required 属性，可以检查某个表单字段是否为必填字段。
		var isUsernameRequired = document.forms[0].elements["username"].required;
		另外，使用下面这行代码可以测试浏览器是否支持required 属性。
		var isRequiredSupported = "required" in document.createElement("input");
		以上代码通过特性检测来确定新创建的<input>元素中是否存在required 属性。
 */

// 2) 其他输入类型   email / url
// 		<input type="email" name ="email">
// 		"email"类型要求输入的文本必须符合电子邮件地址的模式，

// 		<input type="url" name="homepage">
// 		"url"类型要求输入的文本必须符合URL 的模式。
/*
		要检测浏览器是否支持这些新类型，可以在JavaScript 创建一个<input>元素，然后将type 属性设置为"email"或"url"，最后再检测这个属性的值。不支持它们的旧版本浏览器会自动将未知的值设置为"text"，而支持的浏览器则会返回正确的值。

		var input = document.createElement("input");
		input.type = "email";
		var isEmailSupported = (input.type == "email");

		要注意的是，如果不给<input>元素设置required 属性，那么空文本框也会验证通过。另一方面，设置特定的输入类型并不能阻止用户输入无效的值，只是应用某些默认的验证而已。
 */


// 
// 3) 数值范围   min[最小]/max[最大]/step[从min 到max 的两个刻度间的差值]
// 			输入 0 - 100 之间的 5 的倍数
// 			<input type="number" min="0" max="100" step="5" name="count">
// 			.stepUp([opt : int])/.stepDown([opt : int]) 默认加1/减1
// 			
// 			这几个元素都要求填写某种基于数字的值：
// 			"number"、"range"、"datetime"、"datetime-local"、"date"、
// 			"month"、"week"，还有"time"。
// 				
// 4) 输入模式  pattern
// 		<input type="text" pattern="\d+" name="count" />
// 		模式的开头和末尾不用加^和$符号（假定已经有了）。
// 		这两个符号表示输入的值必须从头到尾都与模式匹配。
// 		JS: .pattern
// 		使用以下代码可以检测浏览器是否支持pattern 属性。
// 		var isPatternSupported = "pattern" in document.createElement("input");
// 		
// 5) 检测有效性  checkValidity()方法可以检测表单中某个字段是否有效，每个字段都有该方法，有效 => true，无效 => false，判断依据 => 字段的值是否有效的判断依据是本节前面介绍过的那些约束 (必填字段、pattern 匹配)
// 		if(document.forms[0].elements[0].checkValdity()) {
// 			// 字段有效
// 		} else { // 字段无效 }
// 		可以检测整个表单是否有效
// 		document.forms[0].checkValdity()
// 		checkValidity()方法简单地告诉你字段是否有效相比，
// 		validity 属性则会告诉你为什么字段有效或无效，可以获取更加详细是否有效的信息
// 			对象中包含一系列属性，每个属性会返回一个布尔值
// 		customError: 如果设置了 setCustomValidity()，为 true，否则 false
// 		patternMismatch: 对应 pattern属性
// 		rangeOverflow：对应 数字范围中的 max 属性  val  > max  ==> true
// 		rangeUnderflow: ==  数字范围中的 min 属性，val  < min  ==> true
// 		stepMisMatch: == step，如果 min 和 max 之间的步长值不合理，返回true
// 		tooLong: == maxlength,  val.length > maxlength = true
// 		typeMismatch: val != mail / url ==> true
// 		valid: 其他属性都是 false ==> true, checkValidity() 也一样
// 		valueMissing: == required  val = (null) ==> true
/*		if (input.validity && !input.validity.valid){
			if (input.validity.valueMissing){
				alert("Please specify a value.")
			} else if (input.validity.typeMismatch){
				alert("Please enter an email address.");
			} else {
				alert("Value is invalid.");
			}
		} */
// 		
// 6) 禁用验证  novalidate，可以给 form/form HTMLCollection
// 		js: .formNoValuedate = true/false



// 选择框脚本
// 选择框是通过<select>和<option>元素创建的
// HTMLSelectElement 类型
// add(newOption, relOption): 向控件中插入新<option>元素，其位置在相关项（relOption）之前。
// multiple: 布尔值，表示是否允许多项选择；等价于HTML 中的multiple 特性。
// options: 控件中所有<option>元素的HTMLCollection。
// remove(index): 移除给定位置的选项。
// selectedIndex: 基于0 的选中项的索引，如果没有选中项，则值为-1。对于支持多选的控件，只保存选中项中第一项的索引。
// seze: 选择框中可见的行数；等价于HTML 中的size 特性。
/*
	选择框的type 属性不是"select-one"，就是"select-multiple"，这取决于HTML 代码中有
	没有multiple 特性。选择框的value 属性由当前选中项决定，相应规则如下。
 如果没有选中的项，则选择框的value 属性保存空字符串。
 如果有一个选中项，而且该项的value 特性已经在HTML 中指定，则选择框的value 属性等
	于选中项的value 特性。即使value 特性的值是空字符串，也同样遵循此条规则。
 	如果有一个选中项，但该项的value 特性在HTML 中未指定，则选择框的value 属性等于该项的文本。
 如果有多个选中项，则选择框的value 属性将依据前两条规则取得第一个选中项的值。
*/

/*
	在DOM 中，每个<option>元素都有一个HTMLOptionElement 对象表示。为便于访问数据，HTMLOptionElement 对象添加了下列属性：
	index：当前选项在options 集合中的索引。
 	label：当前选项的标签；等价于HTML 中的label 特性。
	selected：布尔值，表示当前选项是否被选中。将这个属性设置为 true 可以选中当前选项。
 	text：选项的文本。
 	value：选项的值（等价于 HTML 中的 value 特性）。
	
	我们建议最好是使用特定于选项的属性，因为所有浏览器都支持这些属性。在将表单控件作为DOM 节点的情况下，实际的交互方式则会因浏览器而异。我们不推荐使用标准DOM技术修改<option>元素的文本或者值。

	选择框的change 事件与其他表单字段的change 事件触发的条件不一样。其他表单字段的change 事件是在值被修改且焦点离开当前字段时触发，而选择框的change 事件只要选中了选项就会触发。


 */

var selectbox = document.forms[1].elements['location'];

// 不推荐
// 不推荐使用标准DOM技术修改<option>元素的文本或者值。
// var text = selectbox.options[0].firstChild.nodeValue; // 选项文本
// var value = selectbox.options[0].getAttribute('value'); // 选项值

// 推荐做法
// var text = selectbox.options[0].text; // 选项文本
// var value = selectbox.options[0].value; // 选项值
// console.log(text);
// console.log(value);


// 选择选项
/*	
	对于只允许选择一项的选择框，访问选中项的最简单方式，就是使用选择框的selectedIndex 属性

*/

/*
// 利用 selectedIndex 获取 选中项，利用 选项的属性 .text / .value 进行获取文本和值

// 获取选中的索引
var selectedIndex = selectbox.selectedIndex;

// 获取选中项
var selectedOption = selectbox.options[selectbox.selectedIndex];

console.log("Selected index: " + selectedIndex + "\nSelected text: " +
	selectedOption.text + "\nSelected value: " + selectedOption.value);

// Selected index: 0
// Selected text: Sunnyvale
// Selected value: Sunnyvale, CA

console.log(selectedOption);
// <option value="Sunnyvale, CA">Sunnyvale</option>

*/

/*
	对于多项的选择框，selectedIndex 属性就好像只允许选择一项一样。
	设置 selectedIndex 或导致取消以前的所有选项并选择指定的那一项，
	而读取 selectedIndex 则只会返回选择中项中第一项的索引值。

	selectedIndex 适用于单项选择
 */

/*
	另一种选择选项的方式，就是取得某一项的引用，然后将其 selected 属性设置为true。
	可以设置多项选项的 selected 属性为 true，而且取消对其他选中项的选择，因而可以动态选中任意多个项
	
	但是在单选选择框中，修改某个选择的 selected 属性则会取消对其他选项的选择。

	对 selected 属性设置为 false 对单选选择框没有影响

 */

// selectbox.options[0].selected = true;

// console.log(selectbox.type);	
// select-multiple
// select-one

/*
	selected 属性的作用主要是确定用户选择了选择框中的哪一项。取得所有选中的项，可以循环遍历选项集合，然后测试每个选项的selected 属性。
*/

// 创建一个数组，将被选中的项统一放进数组当中，
// 将包含选中的项的数组返回
function getSelectedOptions(selectbox) {
	var result = new Array();
	var options;
	for (var i = 0; i < selectbox.options.length; i++) {
			options = selectbox.options[i];
			if (options.selected) {
				result.push(options);
			}
		}
	return result;	
};

/*
EventUtil.addHandler(selectbox, 'click', function (event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	
	var options = selectbox.options;

	for (var i = 0; i < options.length; i++) {
		if (options[i].selected) {
			console.log(options[i].text);
		}
	}
});
*/

/*
// 选项出现改变时候，将选项内容输出
EventUtil.addHandler(selectbox, 'change', function (event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	
	var selectedOptions = getSelectedOptions(target);
	var option = null;
	var message = "";

	for (var i = 0, len = selectedOptions.length; i < len; i++) {
		option = selectedOptions[i];
		message += 'Selected Index: ' + option.index + 
					'\n Selected Text: ' + option.text + 
					'\n Selected Value: ' + option.value + '\n\n'; 
	}

	console.log(message);
});
*/


// 添加选项
// 1、DOM 方法
/*var inText = document.createTextNode('Option text');
var newOption = document.createElement('option');
newOption.setAttribute('value', 'Option value');

newOption.appendChild(inText);

selectbox.appendChild(newOption);*/

// 2、使用 Option 构造函数来创建新选项，使用 appendChild() 添加
// Option 构造函数接受两个参数：文本(text) 和值(value); 第 2 值可选。
// 虽然这个构造函数会创建一个Object 的实例，但兼容DOM 的浏览器会返回一个<option>元素。
// 换句话说，在这种情况下，我们仍然可以使用appendChild()将新选项添加到选择框中
// 
// name 需要自己加？还是同一个选项卡，使用同一个 name
// 

/*var newOpt = new Option('Opt text', 'Opt value');
selectbox.appendChild(newOpt);*/

// 3、使用 Option 构造函数创建新项，使用 选择框的 add() 添加
// add() : 接受两个参数，要添加的新选项和将位于新选项之后的选项
// 		添加到最后，第二个参数为 null/undefined  部分浏览器对第 2 个参数必选的，第 2 个参数传入 undefined

// var newOpt = new Option('Opt text', 'Opt value');
// selectbox.add(newOpt, undefined);

// selectbox.add(newOpt, selectbox.options[2]);

// 如果你想将新选项添加到其他位置（不是最后一个），就应该使用标准的DOM技术和insertBefore()方法。


// 移除选项
// 1、使用 DOM removeChild()
// 2、使用 select 的 remove(selectRemoveIndex)
// 3、相应选择设置为 null 
		// selectbox.options[0] = null;
/*
	全部删除，需要 迭代所有选项并逐个移除
 */

// 移动和重排选项

/*
	使用DOM 的appendChild()方法，就可以将第一个选择框中的选项直接移动到第二个选
	择框中。我们知道，如果为appendChild()方法传入一个文档中已有的元素，那么就会先从该元素的
	父节点中移除它，再把它添加到指定的位置

	移动选项与移除选项有一个共同之处，即会重置每一个选项的index 属性。
*/


// 将第一个选择框中的第一个选项移动到第二个选择框中的过程。
// 移动的选择，会从 第一个选项中移除
/*var selectbox2 = document.getElementById('selLocation2');
selectbox2.appendChild(selectbox.options[1]);*/

var selectbox2 = document.getElementById('selLocation2')

function moverOption (event, selectbox1, selectbox2) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	var opt; // 添加之后返回，用来做消除 selected = true
	
	// console.log(target.parentNode);
	// console.log(event.currentTarget);  //  currentTarget 当前事件处理程序所在的 元素

	// 检测父节点，
	// 1、如果父节点是 selectbox1，选项转移给 selectbox2
	// 2、如果父节点是 selectbox2，选项转移给 selectbox1
	if (target.parentNode == selectbox1) {
		opt = selectbox2.appendChild(target); // 移动项使用

	} else if (target.parentNode == selectbox2) {
		opt = selectbox.appendChild(target); // 移动项使用
	}

	opt.selected = false; // 不让被移动之后有被选中的背景色
}


// 从一个 selectbox 添加到另一个 selectbox，保留原来 selectbox 中的 option
function addOption (event, selectboxFrom, selectboxTarget) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	var optClone = null, // 克隆项
		opt, // 添加之后返回，用来做消除 selected = true
		i,
		len, // selectboxTarget.length
		flag = false; // 对比添加项和被添加项，如果没有相同项才能添加

	// console.log(target.parentNode);
	// console.log(event.currentTarget);  //  currentTarget 当前事件处理程序所在的 元素

	// 检测父节点，
	// 1、如果父节点是 selectboxFrom，选中的选项添加给 selectboxTarget
	// 2、如果父节点是 selectboxTarget，选中的选项删除掉
	if (target.parentNode == selectboxFrom) {

		// 添加到 selectboxTarget，但不删除该选项
		for (i = 0, len = selectboxTarget.length; i < len; i++) {
			if (selectboxTarget[i].value == target.value) {
				console.log('不能重复添加选项');
				flag = true;
			}
		}
		if (!flag) {
			optClone = target.cloneNode(true);
			opt = selectboxTarget.appendChild(optClone);
			// opt.selected = false; // 不让被移动之后有被选中的背景色
		}
		

	} else if (target.parentNode == selectboxTarget) {
		
		// 删除该选项
		selectboxTarget.removeChild(target);
	}

}

// 给选项框添加绑定
/*
EventUtil.addHandler(selectbox, 'dblclick',function (event) {
	moverOption(event, selectbox, selectbox2);
});

EventUtil.addHandler(selectbox2, 'dblclick', function (event) {
	moverOption(event, selectbox, selectbox2);
});
*/


// 尝试用委托
var form1 = document.getElementById('form1');
EventUtil.addHandler(form1, 'dblclick', function (event) {
	addOption(event, selectbox, selectbox2);
});


// 最好的方式仍然是使用DOM 方法。要将选择框中的某一项移动到特定位置，最合适的DOM 方法就是insertBefore()；

// 要在选择框中向前移动一个选项的位置
/*var optionToMove = selectbox.options[1];
selectbox.insertBefore(optionToMove, selectbox.options[optionToMove.index-1]);
*/

// 可以使用下列代码将选择框中的选项向后移动一个位置。
/*var optionToMove = selectbox.options[0];
selectbox.insertBefore(optionToMove, selectbox.options[optionToMove.index+2]);*/



// 表单序列化
// Ajax 的出现，表单序列化已经成为一种常见需求


// 在JavaScript 中，可以利用表单字段的type 属性，连同name 和value 属性一起实现对表单的序列化。

// 表单提交期间，浏览器是怎样将数据发送给服务器的。

// 对表单字段的名称和值进行 URL 编码，使用和号( & )分隔
// 不发送禁用的表单字段
// 只发送勾选的复选框和单选按钮
// 不发送 type 为 "reset" 和 "button" 的按钮
// 多选选择框中的每个选中的值单独一个条目
// 在单击提交按钮提交表单的情况下，也会发送提交按钮；否则，不发送提交按钮。也包括 type 为 "image" 的 <input> 元素
// <select> 元素的值，就是选中的 <option> 元素的 value 特性的值。如果 <option> 元素没有 value 特性，则是 <option> 元素的文本值

// 在表单序列化过程中，一般不包含任何按钮字段，因为结果字符串很可能是通过其他方式提交的。

// 表单序列化

function serialize (form) {
	var parts = [], // 创建一个数组，存放将要创建的字符串的各个部分
		field = null, // 暂时存放 for 迭代每个表单字段
		i, // form 循环计数
		len, // 表单元素数量
		j, // select 循环计数
		optLen,  // 选项个数
		option,  // 选项暂时存放
		optValue; // 选项值暂时存放，有的

	for (i = 0, len = form.elements.length; i < len; i++) {
		field = form.elements[i];

		switch (field.type) {  // 检测 type 属性，以便于做不同的操作
			case 'select-one': // 单项 select
			case 'select-multiple': // 多项 select
				// 每个值都有自己的 name？
				// 如果 select 有被选择
				if (field.name.length) {
					// 遍历所有选项，如果有被 selected = true 添加进数组
					for (j = 0, optLen = field.options.length; j < optLen; j++) {
						option = field.options[j];
						if (option.selected) {
							optValue = '';
							// 在找到一个选中项之后，需要确定使用什么值
							// 1、存在 value 特性  --> value
							// 2、不存在 value 特性 --> text
							// 3、存在 value 特性，但是 value = null --> text
							
							// 检查特性 
							// 		DOM 兼容浏览器：hasAttribute()
							// 		IE: attributes['value'].specified
							if (option.hasAttribute) {
								optValue = (option.hasAttribute('value') ? 
											option.value : option.text);
							} else {
								optValue = (option.attributes['value'].specified ?
											option.value : option.text);
							}
							parts.push(encodeURIComponent(field.name) + '=' + 
										encodeURIComponent(optValue));
						}
					}
				}

				break;

			case undefined: 	// 字段集，1）type 中未定义 2）<fieldset>元素
			case 'file': 		// 文件输入
			case 'submit': 		// 提交按钮
			case 'reset': 		// 重置按钮
			case 'button': 		// 自定义按钮
				break;

			case 'radio': 		// 单选按钮
			case 'checkbox':  	// 复选框
				// 对于单选框按钮和复选框，
				// 要坚持其 checked 属性是否设置为 false，如果是则退出 switch 语句
				// 如果 checked 属性为 true，则继续执行 default 语句
				if (!field.checked) {
					break;
				}
				/* 执行默认操作 */

			default:
				// 不包含没有名字的表单字段
				// 将当前字段的名称和值进行编码，然后添加到 parts 数组中
				if (field.name.length) {
					parts.push(encodeURIComponent(field.name) + '=' +
							   encodeURIComponent(field.value));
				}
		}
	}
	// 利用 join() 格式化整个字符串
	// 用和号来分隔每一个表单字段。
	return parts.join('&');

	// 以查询字符串的格式输出序列化之后的字符串
}

// 富文本编辑，又称为 WYSIWYG（What You See Is What You Get，所见即所得）。

/*
	这一技术的本质，就是在页面中嵌入一个包含空 HTML 页面的iframe。通过设置 designMode 属性，这个空白的 HTML 页面可以被编辑，而编辑对象则是该页面 <body>元素的 HTML 代码

	designMode属性两个可能的值：off(默认值) / on
	
	在设置为"on"时，整个文档都会变得可以编辑（显示插入符号），然后就可以像使用字处理软件一样，通过键盘将文本内容加粗、变成斜体，等等。

*/

// 在包含页面中，需要使用onload 事件处理程序来在恰当的时刻设置designMode，

EventUtil.addHandler(window, 'load', function (event) {
	frames['richedit'].document.designMode = 'on';
});

// GC: Error
// Uncaught DOMException: Blocked a frame with origin "null" from accessing a cross-origin frame.
// 
// 本地文件会触发GC的同源策略限制，
// 解决：创建一个快捷方式，在快捷方式的目标末添加 “ --disable--web--security”
// 

// 使用 contenteditable 属性实现富文本
/* 
	把contenteditable 属性应用给页面中的任何元素，然后用户立即就可以编辑该元素。
	不需要 iframe、空白页 和 JavaScript
	添加 contenteditable ，不能设置键值对形式，只添加一个 contenteditable 
	JS：div.contentEditable = "true";

	contenteditable 属性有三个可能的值："true"表示打开、"false"表示关闭，"inherit"表示从父元素那里继承（因为可以在contenteditable 元素中创建或删除元素）。
*/

// 操作富文本

/*
	document.execCommand()：
		要执行的命令名称：
		表示浏览器是否应该为当前命令提供用户界面的一个布尔值  --- Firefox = true 会出错，为兼容应该设置为 false
		执行命令必须的一个值(如果不需要值，则传递null)
*/
//转换粗体文本
// frames["richedit"].document.execCommand("bold", false, null);

//转换斜体文本
// frames["richedit"].document.execCommand("italic", false, null);

//创建指向www.wrox.com 的链接
// frames["richedit"].document.execCommand("createlink", false, 
// 										"http://www.wrox.com");

//格式化为1 级标题
// frames["richedit"].document.execCommand("formatblock", false, "<h1>");


// 同样的方法也适用于页面中contenteditable 属性为"true"的区块，
// 只要把对框架的引用替换成当前窗口的document 对象即可。

//转换粗体文本
document.execCommand("bold", false, null);
/*
	与命令相关的方法。第一个方法就是queryCommandEnabled()，可以用它来检
	测是否可以针对当前选择的文本，或者当前插入字符所在位置执行某个命令。这个方法接收一个参数，即要
	检测的命令。如果当前编辑区域允许执行传入的命令，这个方法返回true，否则返回false。
*/
var result = frames["richedit"].document.queryCommandEnabled("bold");

/*
	如果能够对当前选择的文本执行"bold"命令，以上代码会返回true。需要注意的是，query-
	CommandEnabled()方法返回true，并不意味着实际上就可以执行相应命令，而只能说明对当前选择
	的文本执行相应命令是否合适。例如，Firefox 在默认情况下会禁用剪切操作，但执行queryCommand-
	Enabled("cut")也可能会返回true。
	另外，queryCommandState()方法用于确定是否已将指定命令应用到了选择的文本。例如，要确
	定当前选择的文本是否已经转换成了粗体，可以使用如下代码。
	var isBold = frames["richedit"].document.queryCommandState("bold");
	如果此前已经对选择的文本执行了"bold"命令，那么上面的代码会返回true。
	一些功能全面的富文本编辑器，正是利用这个方法来更新粗体、斜体等按钮的状态的。
*/

/*
	一个方法是queryCommandValue()，用于取得执行命令时传入的值（即前面例子中传给document.execCommand()的第三个参数）。
	通过这个方法可以确定某个命令是怎样应用到选择的文本的，可以据以确定再对其应用后续命令是否合适。
*/

// 在对一段文本应用"fontsize"命令时如果传入了 7，那么下面的代码就会返回"7"：
// var fontSize = frames["richedit"].document.queryCommandValue("fontsize");


// 富文本选区

/*
	在富文本编辑器中，使用框架（iframe）的getSelection()方法，可以确定实际选择的文本。
	这个方法是window 对象和document 对象的属性，调用它会返回一个表示当前选择文本的Selection
	对象。每个Selection 对象都有下列属性。
	
	anchorNode: 选区起点所在的节点。
	anchorOffset: 在到达选区起点位置之前跳过的anchorNode 中的字符数量。
	focusNode: 选区终点所在的节点。
	focusOffset: focusNode 中包含在选区之内的字符数量。
	isCollapsed: 布尔值，表示选区的起点和终点是否重合。
	rangeCount: 选区中包含的DOM 范围的数量。
	
	addRange(range): 将指定的DOM 范围添加到选区中。
	collapse(node, offset): 将选区折叠到指定节点中的相应的文本偏移位置。
	collapseToEnd(): 将选区折叠到终点位置。
	collapseToStart(): 将选区折叠到起点位置。
	containsNode(node): 确定指定的节点是否包含在选区中。
	deleteFromDocument(): 从文档中删除选区中的文本，与document.execCommand("delete",false, null)命令的结果相同。
	extend(node, offset): 通过将focusNode 和focusOffset 移动到指定的值来扩展选区。
	getRangeAt(index): 返回索引对应的选区中的DOM范围。
	removeAllRange(): 从选区中移除所有DOM 范围。实际上，这样会移除选区，因为选区中至少要有一个范围。
	removeRange(range): 从选区中移除指定的DOM 范围。
	selectAtChildren(node): 清除选区并选择指定节点的所有子节点。
	toString(): 返回选区所包含的文本内容。
*/


/* 未测试
var selection = frames["richedit"].getSelection();
//取得选择的文本
var selectedText = selection.toString();
//取得代表选区的范围
var range = selection.getRangeAt(0);
//突出显示选择的文本
var span = frames["richedit"].document.createElement("span");
span.style.backgroundColor = "yellow";
range.surroundContents(span);
*/

// IE8
/*
	通过它支持的selection 对象操作选择的文本。
	IE 中的selection 对象是document 的属性，本章前面曾经讨论过。要取得富文本编辑器中选择的文
	本，首先必须创建一个文本范围（请参考第12 章中的相关内容），然后再像下面这样访问其text 属性。
*/

// var range = frames["richedit"].document.selection.createRange();
// var selectedText = range.text;


// 要像前面使用DOM 范围那样实现相同的文本高亮效果，可以组合使用htmlText 属性和
// pasteHTML()方法。

// var range = frames["richedit"].document.selection.createRange();
// range.pasteHTML("<span style=\"background-color:yellow\"> " + range.htmlText +"</span>");

// 以上代码通过htmlText 取得了当前选区中的HTML，然后将其放在了一对<span>标签中，最后又使用pasteHTML()将结果重新插入到了选区中。

// 表单与富文本
/*
	富文本编辑是使用 iframe 而非表单控件实现的，从技术上说，富文本编辑器并不属于表单。
	富文本编辑器中的 HTML 不会被自动提交给服务器，而需要我们手工来提取并提交 HTML
	通常可以添加一个隐藏的表单字段，让它的值等于从iframe 中提取出的HTML。具体来说，就是在提交表单之前，从iframe 中提取出HTML，并将其插入到隐藏的字段中
*/

/*
EventUtil.addHandler(form, 'submit', function (event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	target.elements['comments'].value = frames['richedit'].document.body.innerHTML;
});
*/

// 对于contenteditable元素，也可以执行类似操作。

/*
EventUtil.addHandler(form, 'submit', function (event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	target.elements['comments'].value = 
		document.getElementById('richedit').innerHTML || 
		document.getElementById('richedit').contentText;
});
*/


