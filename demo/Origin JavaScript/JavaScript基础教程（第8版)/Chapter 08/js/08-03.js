// onfocus 事件

// onfocus 和onblur 事件处理程序互为镜像
// 当一个页面成为最前面的活动窗口时，就会触发onfocus 处理程序。
// 

// 总显示在后面的页面
// 可以使用onfocus 处理程序控制窗口的堆放

// 也使用了窗口对象和事件处理程序对象来调用一个函数
window.onfocus = moveBack;  // 事件可以触发，但是并没什么效果

function moveBack() {
	self.blur();
	// alert(11);
}


