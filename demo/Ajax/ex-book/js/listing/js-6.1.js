// 将另外一个HTML的HTML片段内容植入另外一个HTML容器中
// $().load('x.html')
$(document).ready( function () {
	// body...
	$('#letter-a a').click(function (e) {
		// body...
		e.preventDefault();
		$('#dictionary-a').load('a.html')

	});
});