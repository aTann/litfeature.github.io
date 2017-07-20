
// 读取cookie

// 设置了cookie 之后，需要获得它以便做某些有意义的事情。


window.onload = nameFieldInit;

function nameFieldInit() {
	if (document.cookie != '') {
		document.getElementById('nameField').innerHTML = 'Hello,' + document.cookie.split('=')[1];
	}
}

// 不需要指定要读取cookie文件中的哪个cookie,
// 这是因为一个cookie只能由最初写它的服务器读取。浏览器内部的cookie 机制不允许你读或写别人所写的cookie。
// 你只能访问自己的cookie。














