
// onunload事件
/*当用户离开网页时，就会触发onunload 事件处理程序。这个事件最常见的用途是，当用户离开某
些商业站点（尤其是色情站点）时弹出广告窗口。如果你访问色情站点的话，常常会发现几乎不可能
离开——每当你试图关闭窗口或导航到别处时，都会出现一个接一个的窗口，其中重新打开同样的页
面或同类的其他页面。
因此，用户非常讨厌onunload 处理程序，所以使用它时要慎重。*/

// onresize事件


// 这个HTML 在一个多行注释中隐藏了一段JavaScript 代码，因此它会在比较老式的浏览器
// 中起作用

// 这个事件处理程序与window 对象连接在一起
window.onresize = resizeFix;

// document.layers只在Netscape 4x存在
// 记录初始进入的窗口尺寸
if (document.layers) {
	var origWidth = window.innerWidth;
	var origHeight = window.innerHeight;
}

function resizeFix() {
	if (document.layers) {
		// 窗口尺寸改变
		if (window.innerWidth != origWidth || window.innerWidth != origHeight) {
			// 重新加载页面
			window.location.reload();
		}
	}
}


// onmove事件
// 当窗口移动时，会触发onmove事件处理程序

// onabort事件
// 当用户取消网页上的图像加载时，会触发onabort事件处理程序，可能并非所有浏览器支持

// onerror事件
// 当页面发生JavaScript错误，可能会触发onerror事件处理程序

// 在Web 上的复杂页面中，设置onerror = null 会比较好。如果在页面上使用这行代码，某
// 些错误消息将不会向用户显示，这样用户就会少受干扰，但是，究竟隐藏哪些错误取决于
// 浏览器。







