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











