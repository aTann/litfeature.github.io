
// post和get的HTTP请求几乎是一样的，
// 视觉上最大区别就是GET请求把参数放在作为URL一部分的查询字符串中，
// 而POST请求则不是。

// 决定使用哪一种方法，需要遵照服务端代码的约定，或者是否要传输大量的数据，
// GET方法对传输的数据量有严格的限制。

/*
$(function () {
	$('#letter-e a').click(function (e) {
		e.preventDefault();
		var requestData = { term : $(this).text() };
		$.post('e.php', requestData, function (data) {
			$('#dictionary-e').html(data);
		});
	});
});
*/


// 其实可以利用$.load()进行对代码的简化，而且$.load()是通过post方法进行提交
$(function () {
	$('#letter-e a').click(function (e) {
		e.preventDefault();
		var requestData = { term : $(this).text() };
		$('#dictionary-e').load('e.php', requestData);
	});
});
















