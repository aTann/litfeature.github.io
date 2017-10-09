
/*
// 全部加载a.html页面
$(function () {
	$('#letter-a a').click(function (e) {
		e.preventDefault();
		$('#dictionary-a').load('a.html .entry');
	});
});
*/

// 部分加载内容
$(function () {
	$('#letter-a a').click(function (e) {
		e.preventDefault();
		$('#dictionary-a').load('h.html .entry');
	});
});