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































