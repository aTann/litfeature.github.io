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
	// $('a[href^="http"][href*="henry"]')
		// .addClass('henrylink');

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
	// $('tr:nth-child(odd)').addClass('alt');

	// 基于上下文内容选择元素
	// $('td:contains(Henry)').addClass('highlight');

	// 基于表单的选择符
	// 选 择 符 匹 配
	// :input 输入字段、文本区、选择列表和按钮元素
	// :button 按钮元素或type属性值为button的输入元素
	// :enabled 启用的表单元素
	// :disabled 禁用的表单元素
	// :checked 勾选的单选按钮或复选框
	// :selected 选择的选项元素


	// DOM遍历方法
	// 取得某个元素的父元素或者祖先元素都是基本操作
	// 条纹交替效果
	$('tr').filter(':odd').addClass('alt');
	// .filter()功能更强大，能接受函数参数，可以执行复杂的测试，，以决定相应元素是否应该保留在匹配的集合中。


	$('a').filter(function() {
		return this.hostname && (this.hostname.length > 0 || this.hostname != location.hostname) ;
		// 在本地实验中，只是使用this.hostname != location.hostname，无法得出结果，
		// 因为除了外链，其他都没有location.hostname，也没有this.hostname
		// 测试浏览器-Google Chrome  58.0.3029.110 (64-bit)

	}).addClass('external');

	// <a>包含的条件
	// 1、必须带有域名（this.name）的href属性，排除排除mailto及类似链接；
	// 2、链接域名（this.hostname）必须不等于（！=）页面当前域的名称（location.hostname）;

	// $('a').click(function (event) {
	// 	event.preventDefault();
	// 	// console.log(this.hostname) // (外链)www.shakespeare.co.uk,其他都是空白
	// 	// console.log(location.hostname); // (全空白)
	// })
	

	// 为特定单元格添加样式

	// 为内容中包含Henry的<td>元素的下一个元素添加.highlight
	// 与相邻选择符(+)，有异曲同工之理
	// $('td:contains(Henry)').next().addClass('highlight');
	
	// .nextAll()相邻（同辈）后面所有的元素
	// $('td:contains(Henry)').nextAll().addClass('highlight');

	// .prev()/.prevall() 与 .next()/.nextAll()前/后相同DOM层次的其余元素，不过选择相反
	// 还有.siblings() 相同层次的其余元素



	// $('td:contains(Henry)').nextAll().addBack()
	// 	.addClass('highlight');  
	// .addBack()是什么？ If the previous set of elements is desired as well, .addBack() can help.
	// $('td:contains(Henry)').nextAll() 得到的作用域是，$('td:contains(Henry)')的后面元素，
	// 以 Henry V  History 1599 做例，
	// $('td:contains(Henry)').nextAll() 得到的作用域 [History, 1599]
	// 但是添加了.addBack()之后把，$('td:contains(Henry)')本身也包括进来，得到了作用域[Henry V, History, 1599]
	
	// 上溯父辈.parent()，再通过.children()
	// $('td:contains(Henry)').parent().children()
	// 	.addClass('highlight');	


	// 不建议如此使用
	// 连缀就像是一口气说出一大段话——虽然效率很高，但对别人来说可能会难于理解。而将它
	// 分开放到多行并添加明确的注释，从长远来看则可以节省更多的时间。
	// $('td:contains(Henry)').parent().find('td:eq(1)')
	// 	.addClass('highlight').end().find('td:eq(2)')
	// 								.addClass('highlight');

	$('td:contains(Henry)')		// 取得包含Henry的所有单元格
		.parent()	// 取得父元素
			.find('td:eq(1)')	// 在父元素中查找第2个单元格
			.addClass('highlight')	// 为该单元格添加highlight类
			.end()	// 恢复到包含Henry单元格的父元素
			.find('td:eq(2)')	// 在父元素中查找第3个单元格
			.addClass('highlight');		// 为该单元格添加highlight

	// 取得#my-element的第2个
	// var myTag = $('#my-element').get(0).tagName;
	// var myTag = $('#my-element')[0].tagName;
});




// jQuery隐式迭代能力
// 几乎所有jQuery方法都会返回一个jQuery对象，因而可连缀调用多个jQuery方法。






























