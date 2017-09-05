
// 新的JavaScript开源项目Sizzle。这是一个独立3的CSS选择符引擎，任何JavaScript库只要进行少量修改甚至不必修改就可以使用它。



/*

作为一个组件，Sizzle在jQuery中负责解析我们传入$()函数中的CSS选择符表达式。它决定使
用何种原生的DOM方法来构建元素集合，以便通过其他jQuery方法来操作这些元素。一方面是Sizzle
引擎，另一方面是jQuery的遍历方法，二者结合起来为我们提供了在页面上查找元素的得力工具。

*/
/*
 以不同的方式使用选择符查找和筛选数据；
 编写插件以添加新选择符和DOM遍历方法；
 优化选择符表达式，提高执行速度；
 理解Sizzle引擎的某些内部工作原理。
*/



// 深入选择与遍历
/*
这个表格包含4列，分别表示日期（Data）、标题（Headline）、作者（Author）和主题（Topic）。此外，表格中的某些行又包含年度“子标题”，而非前述这4项
*/

// 9-1
/*
$(document).ready(function () {
	$('#topics a').click(function (event) {
		event.preventDefault(); // 阻止每个链接的默认行为
		$('#topics a.selected').removeClass('selected'); // 删除所有主题的 selector 类
		$(this).addClass('selected'); // 为当前点击添加上 selector
	});
});
*/


// 9-2

// 隐藏所有不包含相关主题的表格行
/*$(document).ready(function () {
	$('#topics a').click(function (event) {
		event.preventDefault(); // 阻止每个链接的默认行为
		var topic = $(this).text(); // 获取主题相关的 关键字文本

		$('#topics a.selected').removeClass('selected'); // 删除主题处所有的 .selected 
		$(this).addClass('selected'); // 为当前点击添加 .selected

		$('#news tr').show(); // 所有 #news tr 显示 topic = All 的情况

		// topic != All, tr 有 :has(td)，在此同时，却没有 :not() 包含 :contains() 主题相关的 关键字 的项，进行隐藏处理
		if (topic != 'All') {
			$('#news tr:has(td):not(:contains("' + topic + '"))')
				.hide();
		}

	});
});
*/

// #news tr:has(td):not(:contains("topic"))
// #news tr 表示表格所有行
// :has(td) 表示在单元格中
// :not()   不包含
// :contains("topic")  某个元素文本中包含 topic，只会匹配包含文本的行
// :not(contains("topic")) 对 :contains("topic") 进行 非 操作




// 新闻标题中不能包含主题文本
// 我们必须考虑主题文本包含在某个新闻标题文本中的可能性
// 为了排除这种情况，需要针对每一行多做一些检测

$(document).ready(function () {
	$('#topics a').click(function (event) {
		
		// event.

	});
});
















