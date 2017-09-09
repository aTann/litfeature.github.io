/*
要完成以下练习，读者需要本章的index.html文件，以及complete.js中包含的已经完成的JavaScript代码。可以从Packt Publishing网站http://www.packtpub.com/support下载这些文件。

“挑战”练习有一些难度，完成这些练习的过程中可能需要参考jQuery官方文档：http://api.jquery.com/。

(1) 修改为表格行添加条纹效果的例子，第一行不添加任何类、第二行添加alt类、第三行添加alt-2类。在每个子区域中以三个表格行为一组应用上述模式。

(2) 创建一个新的选择符插件:containsExactly()，用于选择包含的文本与传入括号中的文本完全相同的元素。

(3) 使用新的:containsExactly()选择符重写代码清单9-3中的筛选代码。

(4) 创建一个新的DOM遍历插件.grandparent()，可以在DOM中移动到一个或一组元素的祖父元素。

(5) 挑战：使用http://jsperf.com/，把index.html的内容粘贴进去，比较一下使用下列方式查找与<td id="release">最接近的祖先表格元素的性能：
	. 使用.closest()方法；
	. 使用.parents()方法，将结果限制为找到的第一个表格。

(6) 挑战：使用http://jsperf.com/，把index.html的内容粘贴进去，比较一下使用下列方式查找表格中每一行的最后一个<td>元素的性能：
	. 使用:last-child伪类；
	. 使用:nth-child()伪类；
	. 在每一行中（使用.each()方法遍历每一行）使用.last()方法；
	. 在每一行中（使用.each()方法遍历每一行）使用:last()伪类。

*/

// (1) 修改为表格行添加条纹效果的例子，第一行不添加任何类、第二行添加alt类、第三行添加alt-2类。在每个子区域中以三个表格行为一组应用上述模式。


// $('#news tr.alt').removeClass('alt')
// $('#news tr.alt-2').removeClass('alt-2');

// 3 个表格行为一组 nth-child()


// 简单条纹函数
/*function stripe(tbody, colNum, classAdd) {
	// 
	tbody.children(':visible').has('td').filter(function (index) {
		return index % 3 == colNum;
	}).addClass(classAdd);
}

$('#news tbody').each(function (index) {
	var $tbody = $(this);
	stripe($tbody, 1, 'alt');
	stripe($tbody, 2, 'alt-2');
});
*/

// $('#news tr:has("td"):nth-child(3n+0)').addClass('alt');
// $('#news tr:has("td"):nth-child(3n+1)').addClass('alt-2');

// $('#news tr:visible').has('td').filter(':nth-child(3n)').addClass('alt');



/*
(2) 创建一个新的选择符插件:containsExactly()，用于选择包含的文本与传入括号中的文本完全相同的元素。
*/

/*(function ($) {
	$.extend($.expr[':'],{
		containsExactly: $.expr.createPseudo( function ( inText ) {
			return function (elem) {
				return $(elem).text().indexOf(inText) == 0;
			}
		})
	});
})(jQuery);

$(document).ready(function () {
	$('#news tr').children(':containsExactly("Miscellaneous")').css('background-color', 'red');
});
*/

// (3) 使用新的:containsExactly()选择符重写代码清单9-3中的筛选代码。
/*
(function ($) {
 	$.extend($.expr[':'], {
 		containsExactly: $.expr.createPseudo( function ( inText ) {
 			return function (elem) {

 				return !$(elem).children()
 						.toArray()
 						// some 一组数组 只要有一个为 true，返回 true
 						.some( function (item, index, array) {
 							return $(item).text().indexOf(inText) == 0; 
 						});
 			}
 		})
 	});
 })(jQuery);

$(document).ready(function () {
	$('#topics a').click(function (event) {
		
		// 阻止 <a> 点击 默认事情（跳转）
		event.preventDefault();

		// 获取当前 主题关键词 文本
		var topic = $(event.target).text();
		// console.log(topic);

		// 先删除所有 .selected，
		$('#topics a.selected').removeClass('selected')

		// 再为当前 主题 添加 .selected 样式
		$(this).addClass('selected');

		// 所有内容行都显示，默认 topic = All
		$('#news tr').show();

		// 如果 topic != All
		// 遍历所有的内容行，检索每一个单元格，如果不符合条件的 单元格所在行 进行隐藏处理
		// 条件：当前行中的第 4 个子元素内的文本 = topic[.selected]
		if (topic != 'All') {
			$('#news tr:has(td):containsExactly('+ topic +')').hide();
		}
	});
});
*/

// (4) 创建一个新的DOM遍历插件.grandparent()，可以在DOM中移动到一个或一组元素的祖父元素。
/*(function ($) {
	$.fn.grandparent = function () {
		var $parents = $();
		// console.log(this);
		this.each(function (index, item, array) {
			// 爸爸的爸爸 就是 祖父  granparent
			$parents = $parents.add($(item).parent().parent());
		});
		return this.pushStack($parents);
	}
})(jQuery);



$(document).ready(function () {
	console.log($('#release, td:contains("Spotlight")').grandparent().addClass('highlight'));
});
*/

/*
(5) 挑战：使用http://jsperf.com/，把index.html的内容粘贴进去，比较一下使用下列方式查找与<td id="release">最接近的祖先表格元素的性能：
	. 使用.closest()方法；
	. 使用.parents()方法，将结果限制为找到的第一个表格。
*/

/*
var $origin = $('#release');
console.log($origin.closest('tbody'))
console.log($origin.parents('tbody')[0]);
*/


/*Done. Ready to run again.

Run again
Testing in Chrome 60.0.3112 / Windows 10 0.0.0
Test	Ops/sec
Search by .closest()
$origin.closest('tbody');
284,193
±1.92%
fastest
Search by .parents()
$origin.parents('tbody')[0];
179,568
±2.31%
37% slower

https://jsperf.com/jquery-compare-closest-with-parents
*/

/*
(6) 挑战：使用http://jsperf.com/，把index.html的内容粘贴进去，比较一下使用下列方式查找表格中每一行的最后一个<td>元素的性能：
	. 使用:last-child伪类；
	. 使用:nth-child()伪类；
	. 在每一行中（使用.each()方法遍历每一行）使用.last()方法；
	. 在每一行中（使用.each()方法遍历每一行）使用:last()伪类。
*/

// benchmark




var suite = new Benchmark.Suite;

// add tests
suite.add('$#:last-child', function() {
        $('#news tr:has(td)').children(':last-child');
    })
    .add('$#:nth-child', function() {
        $('#news tr:has(td)').children(':nth-child(4)');
    })
    .add('$#each.last', function() {
        $('#news tr:has(td)').each(function(index, item, array) {
            $(item).children('td').last();
        });
    })
    .add('$#each:last', function() {
        $('#news tr:has(td)').each(function(index, item, array) {
            $(item).children('td:last()');
        });
    })
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ 'async': true });

