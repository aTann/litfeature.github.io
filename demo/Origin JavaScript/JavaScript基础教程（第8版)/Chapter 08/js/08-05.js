
// 处理鼠标事件
// 用户与页面的许多交互都是通过鼠标移动或鼠标单击进行的。

// 这个脚本会阻止经验不太丰富的用户在页面上打开快捷菜单
if (typeof(document.oncontextmenu) == 'object') {
	
	if (document.all) {
		document.onmousedown = captureMousedown;
	}
	else {
		document.oncontextmenu = captureMousedown;	// IE11，可能Safari也使用该种方式
	}
}
else {
	window.oncontextmenu = captureMousedown;	// 刚开始只是firefox支持，Chrome也兼容该种方式
}


// 这个函数要处理onmousedown 和oncontextmenu 事件。基于Netscape 的浏览器和Safari 在触发事件
// 时会自动地生成和传递evt 参数，这个变量包含关于事件的信息。
function captureMousedown(evt) {
	if (evt) {
		// 通过检查evt.which 来判断用户单击的是哪个按钮，现IE11同样支持
		var mouseClick = evt.which;
	}
	else {
		// 如果用户使用IE，用户操作的结果会在window.event.button 中找到。
		var mouseClick = window.event.which;
	}
	// 如果mouseClick 是1、2 或3，就弹出一个警告框
	// 向用户指出这个功能已经禁用了，并且返回false。
	if (mouseClick == 1 ||mouseClick == 2 ||  mouseClick == 3) {
		alert('Menu Disabled');
		return false;
	}
}

// 鼠标单击编码
// 编 码 		浏览器/事件
// 1 			IE/单击左键
// 				所有Mac 浏览器/按Control 键的同时单击左键
// 2 			IE/单击右键
// 3 			Firefox（Windows）（IE11）/单击右键
// 				所有Mac 浏览器/单击右键


// onmouseup 事件
// 与onmousedown 事件相似，onmouseup 事件会在用户单击鼠标然后释放按钮时触发。














