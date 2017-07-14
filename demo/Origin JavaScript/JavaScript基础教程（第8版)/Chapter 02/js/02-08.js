window.onload = initAll;

function initAll() {
	document.getElementById('redirect').onclick = initRedirect;
}

function initRedirect() {

	alert('We are not responsible for the content of pages outside our site');
	// 这一行将浏览器窗口设置为关键字this 指定的位置，this 包含这个链接。
	// this 替我们完成的工作之一是从HTML 链接获得URL（也就是a 标签的href 属性值）。
	window.location = this;
	// this  ==>   http://www.pixel.mu/
	return false;
}


// 无干扰脚本编程（unobtrusive scripting），它将代码与HTML 分隔开，从而使这两者都更加灵活。




































