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
	 * @param element {nodeElement} 需要绑定事件处理的元素
	 * @param type {String} 需要绑定事件处理类型，如[on]click
	 * @param handler {Function} 需要绑定事件处理
	 *
	 * @return {null} 绑定一个事件
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

	// 移除事件
	/**
	 * @param element {nodeElement} 需要移除的事件处理的元素
	 * @param type {String} 需要移除的事件处理类型，如[on]click
	 * @param handler {Function} 需要移除的事件处理
	 *
	 * @return {null} 移除的一个事件
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


/*
只要表单中存在上面列出的任何一种按钮，那么在相应表单控件拥有焦点的情况下，按回车键就可
以提交该表单。（textarea 是一个例外，在文本区中回车会换行。）如果表单里没有提交按钮，按回车
键不会提交表单。

以这种方式提交表单时，浏览器会在将请求发送给服务器之前触发submit 事件。这样，我们就有
机会验证表单数据，并据以决定是否允许表单提交。阻止这个事件的默认行为就可以取消表单提交

*/

var form = document.getElementById('myForm');

// P431





















