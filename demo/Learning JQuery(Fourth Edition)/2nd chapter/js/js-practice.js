/*
	要完成以下练习，读者需要本章的index.html文件，以及complete.js中包含的已经完成的
	JavaScript代码。可以从Packt Publishing网站http://www.packtpub.com/support下载这些文件。
	“挑战”练习有一些难度，完成这些练习的过程中可能需要参考jQuery官方文档：http://api.
	jquery.com/。
	(1) 给位于嵌套列表第二个层次的所有<li>元素添加special类；
	(2) 给位于表格第三列的所有单元格添加year类；
	(3) 为表格中包含文本Tragedy的第一行添加special类；
	(4) 挑战：选择包含链接（<a>）的所有列表项（<li>元素），为每个选中的列表项的同辈列表项元素添加afterlink类；
	(5) 挑战：为与.pdf链接最接近的祖先元素<ul>添加tragedy类。
*/


// (1) 给位于嵌套列表第二个层次的所有<li>元素添加special类；
// 利用组合选择符中的子元素选择 > 一直找到第二层次的所有li元素
$(document).ready(function () {
	// $('#selected-plays > li > ul > li').children('li').addClass('special');
	$('#selected-plays > li > ul > li').addClass('special');

});

// (2) 给位于表格第三列的所有单元格添加year类；
// 利用:nth-child(3)，找到在于tr下的第三个td，然后给它添加.year
$(document).ready(function () {
	$('tr td:nth-child(3)').addClass('year');
});


// (3) 为表格中包含文本Tragedy的第一行添加special类；
// :contains('text')，某个选择器包含着text文本
$(document).ready(function () {
	$('tr td:contains("Tragedy")').addClass('special');
});


// (4) 挑战：选择包含链接（<a>）的所有列表项（<li>元素），为每个选中的列表项的同辈列表项元素添加afterlink类；
// 包含<a>的<li>说明，<li>是<a>父元素
$(document).ready(function () {
	$('#selected-plays li a').parent('li').addClass('afterlink').children('ul:not(li a)').removeClass('afterlink');
});


// (5) 挑战：为与.pdf链接最接近的祖先元素<ul>添加tragedy类。
// 因为.pdf的<a>的href属性[href='hamlet.pdf']，利用CSS选择器[href*='.pdf']，表示href属性值中字符包含'.pdf'
// 最近的<ul>也是<a>元素的祖先元素，因为<a>元素的父元素是<li>
$(document).ready(function () {
	$('a[href*=".pdf"]').parents('ul').eq(0).addClass('tragedy');
});















