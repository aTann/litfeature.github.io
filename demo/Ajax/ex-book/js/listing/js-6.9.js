
// $.get()根据函数对象来构建查询字符串
$(function () {
	$('#letter-e a').click(function (e) {
		e.preventDefault();
		var requestData = { term : $(this).text() };
		$.get('e.php', requestData, function (data) {
			$('#dictionary-e').html(data);
		});
	});
});

// 列表中的链接无论有无代码使用它们都已经带有一个给定的地址，
// 为禁用和无法使用JavaScript的用户提供替代方法
// 渐进增强
// 本函数中使用event.preventDefault()阻止a的点击默认事件：链接跳转


// 还可以使用return false进行阻止跳转，此做法表示的是处理程序的结束，
// 同时return false意味着同时调用了event.preventDefault()和event.stopPropagation().
// 如果要想停止事件冒泡，还是要使用event.stopPropagation()


// 在加载页面或打开新页面，推荐event.preventDefault()
// 例子：如果click处理程序中包含JavaScript错误，
// 那么在第一行代码中（在碰到错误之前）阻止默认动作就能确保不会提交表单，
// 而且浏览器的错误控制台也会受到错误报告

