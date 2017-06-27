/*
网页中元素的结构
如何通过CSS选择符在页面中查找元素
扩展jQuery标准的CSS选择符
让选择页面元素更灵活的DOM遍历方法
 */


// 祖先元素、后代元素、子元素、父元素、同辈元素

// 渐进增强（progressive enhancement）
// 平稳退化（graceful degradation）



$(document).ready(function () {
	// 列表嵌套，让最顶级的li进行水平展开
	// 直接找到最外面ul(祖先)，让其他子元素添加相应样式的Class即可，元素组合选择符 > 
	$('#selected-plays > li').addClass('horizontal');

	// 否定式伪类选择符
	// 将所有非顶级列表项添加sub-level样式
	$('#selected-plays li:not(.horizontal)').addClass('sub-level');

});


// 属性选择符:CSS选择符中特别有用的一类选择符。顾名思义，属性选择符通过HTML元素
// 的属性选择元素，例如链接的title属性或图像的alt属性。例如，要选择带有alt属性的所有
// 图像元素，可以使用以下代码：
// $('img[alt]')

$(function () {
	// [^="mailto:"]以mailto:开头
	$('a[href^="mailto:"]').addClass('mailto'); 
	// [$=".pdf"]以.pdf结尾
	$('a[href$=".pdf"]').addClass('pdflink');
	// [*="henry"] 包含着henry的<a>
	$('a[href^="http"][href*="henry"]')
		.addClass('henrylink');
	// 选中有horizontal类的顺数第二个<div>
	// $('div.horizontal:eq(1)')

	// <tr>奇数列改变，:nth-child()jQuery中唯一从1开始计数的选择符
	// $('tr:even').addClass('alt');
	// <tr>偶数列改变
	// $('tr:odd').addClass('alt');

	// 效果同:even
	// $('tr:nth-child(2n)').addClass('alt');
	// 同:odd
	// $('tr:nth-child(2n+1)').addClass('alt');

	// 每一个表格都是单独的开始
	// 要实现相同的条纹交替效果，并且确保同一文档中的多个表格的效果一致，需要使用nth-child和odd/even参数的配合
	$('tr:nth-child(odd)').addClass('alt');

	// 基于上下文内容选择元素
	$('td:contains(Henry)').addClass('highlight');

	// 基于表单的选择符
	// 选 择 符 匹 配
	// :input 输入字段、文本区、选择列表和按钮元素
	// :button 按钮元素或type属性值为button的输入元素
	// :enabled 启用的表单元素
	// :disabled 禁用的表单元素
	// :checked 勾选的单选按钮或复选框
	// :selected 选择的选项元素

	


});



































