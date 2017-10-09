// 未完代码
$(document).ready(function () {
	$('#letter-b a').click(function (e) {
		e.preventDefault();
		$.getJSON('b.json', function(data) {
			// 使用了匿名函数表达式作为回调函数，这在JQuery代码中很常见
			// 保持代码简洁
		});
	});
});

// 通过data变量来遍历JSON数据结构
// 迭代顶级数据，为每个项构建相应的HTML代码
// 可以使用for,$.each()
// $.each()函数不操作JQuery对象，以数据或对象作为第一个参数，以回调函数作为第二个参数
// 还需要将每次循环中数组或对象的当前索引和当前项作为回调函数的两个函数

