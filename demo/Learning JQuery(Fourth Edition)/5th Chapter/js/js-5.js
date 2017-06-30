// web体验，Web服务器与Web浏览器之间合作的结果。



$(document).ready(function () {
	
	/*// 操作属性
	// 非类属性
	// 传入一个包含键值对的对象
	$('div.chapter a').attr({
		rel: 'external',
		title: 'Learn more at Wikipedia'
	});*/

	// 值回调：给参数传入一个函数，而不是传入具体的值
	$('div.chapter a').attr({
		rel: 'external',
		title: 'Learn more at Wikipedia',
		id: function(index, oldValue){	// 传入两个参数，第一个整数，表示迭代次数，第二个保存着修改前的属性值
			return 'wikilink-' + index;
		}
	});


























});


































































































