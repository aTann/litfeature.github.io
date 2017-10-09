$(function () {
	$('#letter-c a').click(function (e) {
		e.preventDefault();
		// $.getScript()全局函数，该脚步有权访问全局环境定义下的函数和变量
		$.getScript('c.js')

		return false;
	});
});

// $.getScript() 添加的JavaScript后，直接执行，执行完毕之后就删除链接标记，犹如“来无影去无踪”；
























