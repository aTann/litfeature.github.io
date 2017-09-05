
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
$(document).ready(function (argument) {
	$('#topics a').click(function (event) {
		event.preventDefault(); // 阻止每个链接的默认行为
		$('#topics a.selected').removeClass('selected'); // 
		$(this).addClass('selected');
	});
});























