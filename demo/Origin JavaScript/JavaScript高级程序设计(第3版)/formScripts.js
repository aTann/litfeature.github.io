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
// elements: 表单中所有控件的集合（HTMLCollection）。
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
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
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
只要表单中存在上面列出的任何一种按钮，那么在相应表单控件拥有焦点的情况下，按回车键就可
以提交该表单。（textarea 是一个例外，在文本区中回车会换行。）如果表单里没有提交按钮，按回车
键不会提交表单。

以这种方式提交表单时，浏览器会在将请求发送给服务器之前触发submit 事件。这样，我们就有
机会验证表单数据，并据以决定是否允许表单提交。阻止这个事件的默认行为就可以取消表单提交

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
var colorFields = form.elements['color'];
console.log(colorFields.length);	//3

var firstColorField = colorFields[0];
var firstFormField = form.elements[0];
console.log(firstColorField == firstFormField);		// true

// 通过form.elements[0]访问到的第一个表单字段，与包含在form.elements["color"]中的第一个元素相同。
*/
/*
	也可以通过访问表单的属性来访问元素，例如form[0]可以取得第一个表单字
	段，而form["color"]则可以取得第一个命名字段。这些属性与通过elements 集
	合访问到的元素是相同的。但是，我们应该尽可能使用elements，通过表单属性访
	问元素只是为了与旧浏览器向后兼容而保留的一种过渡方式。
*/

// 公有的表单字段属性：
// disabled：布尔值，表示当前字段是否被禁用
// form：指向当前字段所属表单的指针；只读
// name：当前字段的名称
// readOnly：布尔值，表示当前字段是否只读，可以用DOM event.blur()实现
// tabIndex：表示当前字段的切换(tab)序号
// type：当前字段的类型，如“checkbox”、“radio”
// value：当前字段将被提交给服务器的值。对文件字段来说，这个属性是只读，包含着文件在计算机中的路径
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

// 很多用户可能会重复单击表单的提交按钮。在涉及信用卡消费时，这就是个问题：因为会导致费用翻番。为此，最常见的解决方案，就是在第一次单击后就禁用提交按钮。只要侦听submit 事件，并在该事件发生时禁用提交按钮即可。


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
// 最好是通过submit 事件来禁用提交按钮。不过，这种方式不适合表单中不包含提交按钮的情况

// 注意，不能通过onclick 事件处理程序来实现这个功能，原因是不同浏览器之间存在“时差”：有的浏览器会在触发表单的submit 事件之前触发click 事件，而有的浏览器则相反。


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
// 			使用focus()方法，可以将用户的注意力吸引到页面中的某个部位
// 			可以侦听页面的load 事件，并在该事件发生时在表单的第一个字段上调用focus()方法
// 			如第一个是<input type="hidden">，代码会发生错误，需要代码进行过滤input[type=hidden]
// 			HTML5 autofocus属性，不需要js focus

/*
EventUtil.addHandler(window, 'load', function (event) {
	var element = document.forms[0].elements[0];
	// 因为autofocus 是一个布尔值属性，所以在支持的浏览器中它的值应该是true。
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
	*/

// blur()
// 那时候的表单字段还没有readonly 特性，因此就可以使用blur()方法来创建只读字段。
// 现在，虽然需要使用blur()的场合不多了，但必要时还可以使用的

// document.forms[0].elements[0].blur();

// 公有的表单字段事件
/*
除了支持鼠标、键盘、更改和HTML 事件之外，所有表单字段都支持下列3 个事件。
. blur：当前字段失去焦点时触发。
. change：对于<input>和<textarea>元素，在它们失去焦点且value 值改变时触发；对于
<select>元素，在其选项改变时触发。
. focus：当前字段获得焦点时触发。
*/
/*
当用户改变了当前字段的焦点，或者我们调用了blur()或focus()方法时，都可以触发blur 和
focus 事件。这两个事件在所有表单字段中都是相同的。但是，change 事件在不同表单控件中触发的
次数会有所不同。对于<input>和<textarea>元素，当它们从获得焦点到失去焦点且value 值改变时，
才会触发change 事件。对于<select>元素，只要用户选择了不同的选项，就会触发change 事件；
换句话说，不失去焦点也会触发 change 事件。
*/
/*
通常，可以使用focus 和blur 事件来以某种方式改变用户界面，要么是向用户给出视觉提示，要
么是向界面中添加额外的功能（例如，为文本框显示一个下拉选项菜单）。而change 事件则经常用于
验证用户在字段中输入的数据。例如，假设有一个文本框，我们只允许用户输入数值。此时，可以利用
focus 事件修改文本框的背景颜色，以便更清楚地表明这个字段获得了焦点。可以利用blur 事件恢复
文本框的背景颜色，利用change 事件在用户输入了非数值字符时再次修改背景颜色。*/

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

// 使用正则作为验证

/*
	关于blur 和change 事件的关系，并没有严格的规定。在某些浏览器中，blur
	事件会先于change 事件发生；而在其他浏览器中，则恰好相反。为此，不能假定这
	两个事件总会以某种顺序依次触发，这一点要特别注意。
 */



// 文本框脚本
// 有两种方式来表现文本框：一种是使用<input>元素的单行文本框，另一种是使用<textarea>的多行文本框。

// 文本框：<input type="text">
// type：type="text"
// size：指定文本框中能够显示的字符数：size="能够显示的字符数"
// value：设置文本框的初始值
// maxlength：用于指定文本框可以接受的最大字符数











