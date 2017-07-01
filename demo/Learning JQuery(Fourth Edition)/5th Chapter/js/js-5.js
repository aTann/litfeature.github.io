// web体验，Web服务器与Web浏览器之间合作的结果。



$(document).ready(function () {
	
	/*// 操作属性
	// 非类属性
	// 传入一个包含键值对的对象
	$('div.chapter a').attr({
		rel: 'external',
		title: 'Learn more at Wikipedia'
	});*/

/*	// 值回调：给参数传入一个函数，而不是传入具体的值
	$('div.chapter a').attr({
		rel: 'external',
		title: 'Learn more at Wikipedia',
		id: function(index, oldValue){	// 传入两个参数，第一个整数，表示迭代次数，第二个保存着修改前的属性值
			return 'wikilink-' + index;
		}
	});
*/
	// 利用了值回调上下文
	$('div.chapter a').attr({
		rel: 'external',
		title: function () {
			return 'Learn more about ' + $(this).text()
				+ ' at Wikipedia';
		},
		id: function(index, oldValue){	// 传入两个参数，第一个整数，表示迭代次数，第二个保存着修改前的属性值
			return 'wikilink-' + index;
		}
	});


// HTML属性，DOM属性有一点区别
// HTML属性是指页面标记中放在引号中的值，而DOM属性则是指通过JavaScript能够存取的值
// 大部分HTML属性与DOM属性相对应，如，HTML：Calss，DOM中ClassName
// Dom中nodeName、nodeType、selectedIndex和childNode，在HTML中没有对应的属性
// HTML的checked是一个字符串，DOM中checked是一个布尔值




















});


// document.write(document.compatMode);
// 模式检测
// 标准或接近标准：CSS1Compat
// 怪异：backCopat































































































