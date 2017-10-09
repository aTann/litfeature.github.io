
// 序列化表单

// 通过名称属性(name)逐个获取value添加都对象中
/*
$(function () {
	$('#letter-f form').submit(function (e) {
		e.preventDefault();
		$.get('f.php', { 'term': $("input[name='term']").val() }, function (data) {
			$('#dictionary-f').html(data);
		});
	});
});
*/
// 麻烦


// .serialize()，这个方法作用于一个jQuery对象，将匹配的DOM元素转换成能够随Ajax请求传递的查询字符串。

$(function () {
	$('#letter-f form').submit(function (e) {
		e.preventDefault();
		var formValues = $(this).serialize();
		$.get('f.php', formValues, function (data) {
			$('#dictionary-f').html(data);
		})
	});
});

// 即使表单字段改变也是可以使用该段代码






























