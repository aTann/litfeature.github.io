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






































