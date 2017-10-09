
// ondblclick事件 鼠标双击

window.onload = initImages;

function initImages() {
	for (var i = 0; i < document.images.length; i++) {
		document.images[i].ondblclick = newWindow;	// 双击事件绑定
	}
}

// 为图片打开一个窗口
function newWindow() {
	var imgName = 'images/' + this.id + '.jpg';
	// 打开一个窗口打开URl = imgName，window.name = 'imgWin'，其他配置为width=320,height=240,scrollbars=no 的窗口
	var imgWindow = window.open(imgName, 'imgWin', 'width=320,height=240,scrollbars=no');
}


// onclick事件
// onclick 处理程序的工作方式与ondblclick 处理程序相似，差异仅仅是由单击触发它，而不是双
// 击触发。onmouseup 处理程序也相似，差异是onclick 要求用户按下鼠标按钮并放开才能触发，而
// onmouseup 只需要后者。（那么onmousedown呢）

