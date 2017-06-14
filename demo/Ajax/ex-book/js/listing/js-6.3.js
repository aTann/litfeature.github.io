// 未完代码
$(document).ready(function () {
	$('#letter-b a').click(function (e) {
		e.preventDefault();
		$.getJSON('b.json'); // $.getJSON()函数可以接受第2个参数，这个参数是当加载完成是调用的函数
	});
});

// Ajax请求都是异步的，回调函数提供一种等待数据返回的方式，而不是立即执行代码。
// 回调函数也需要一个参数，该参数中保存着返回的数据
