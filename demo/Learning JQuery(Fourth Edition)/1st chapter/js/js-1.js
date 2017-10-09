
// 高亮poem内容
// $('div.poem-stanza')获取div.poem-stanza选择器的内容
// .addClass('highlight') 为所选内容添加CSS样式类highlight
// $(document).ready(function()) document加载完成后执行function匿名函数内容
// 
/*$(document).ready(function () {
	$('div.poem-stanza').addClass('highlight');
});*/


// 匿名函数特别适用于那些不会被重用的函数
//

// 原生JavaScript实现同样效果
// 
window.onload = function(){
	var div_poem = document.getElementsByTagName('div');
	// 检查所用的有关的div，找出相关poem-stanza，但同时还没有highlight的div
	for (var i = div_poem.length - 1; i >= 0; i--) {
		if (hasClass(div_poem[i], 'poem-stanza')
			&& !hasClass(div_poem[i], 'highlight')) {
			div_poem[i].className += ' highlight';

		}
	}

	//利用正则表达式对HTML标签元素的类名的检查

	function hasClass(elem, cls) {	
		var reClass = new RegExp(' ' + cls + ' ');
		return reClass.test(' ' + elem.className + ' ');
	}
}





// jQuery优势：
// 利用CSS的优势：查找元素构建与CSS选择符之上
// 支持扩展：避免特性蠕变(feature creep)
// 抽象浏览器不一致性：浏览器兼容性
// 总是面向集合：隐式迭代(implication iteration)
// 将多重操作基于一行：连缀(chaining)











