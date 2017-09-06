
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
/*
$(document).ready(function () {
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
			// console.log($('#news tr:has(td):not(:contains("' + topic + '"))')[0]);
			
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



// 9-3

// 新闻标题中不能包含主题文本
// 我们必须考虑主题文本包含在某个新闻标题文本中的可能性
// 为了排除这种情况，需要针对每一行多做一些检测


$(document).ready(function () {
	$('#topics a').click(function (event) {
		
		// 阻止 <a> 点击 默认事情（跳转）
		// event.

		// 获取当前 主题关键词 文本
		
		// 先删除所有 .selected，

		// 再为当前 主题 添加 .selected 样式
		
		// 所有内容行都显示，默认 topic = All

		// 如果 topic != All
		// 遍历所有的内容行，检索每一个单元格，如果不符合条件的 单元格所在行 进行隐藏处理
		// 条件：当前行中的第 4 个子元素内的文本 = topic[.selected]
	});
});


// .not() 接受一个函数，该函数将在检测每个元素的时候调用。
// 		  这个函数如果返回true，那么被检测的元素就会被排除在结果集之外



// 为表格行添加条纹效果

// :even :ood
// CSS - :nth-child()


// 9-4

// 寻找每个偶数行

// 利用 find() + :nth-child(even)，find() 检索，:nth-child(even) 选择，然后添加 .alt


// 9-5
// 每 2 行一组地应用 .alt 类

// 使用 .filter() 接受一个函数，
// 函数接受 行索引 进行条件挑选 
// index % 4 < 2 --- 2 个 一组显示， + 2 个一组不显示 = 4 个一组处理

// .filter() 筛选函数会检测（关键字this中包含的）每一个元素，决定它们是否包含在最终的结果集中。
// 使用 tr index，会将所有的 tr 一起进行排列，并不会 每一 tbody 单独开始

// 9-6
// 2 个一组显示，并且每个 <tbody> 元素中单独开始

/*
$(document).ready(function () {
	// 利用 .each() 遍历 <tbody> 进行作用
	
	// 在当前元素[<tbody>] 的子元素 [<tr>] 检索  <td> 索引是否 4%2 < 2 ，并且使用 .filter() 进行挑选 
});
*/


// 组合帅选与条纹
// 表格条纹，主题筛选 同时实现
// 每次 筛选主题之后，重新应用条纹效果


$(document).ready(function () {
	
	/**
	 * 1、删除不再需要的 [class = alt]
	 * 2、将选择的行限制在当前可见行
	 * @return {[type]} [description]
	 */
	/*function stripe() {
		// 让所有的 tr[class = alt] 除去 [class = alt]
		// 在 每个<tbody> 重新挑选 符合条件的元素 进行赋给 [class = alt]
			// 在已显示 (:visible) 的子元素 (tr) 检索，挑选符合 2 个一组显示的元素 
	}*/
	
	// stripe();

	/*
	// 主题筛选点击事件
	$('#topics a').click(function (event) {
		
		// 主题选中样式设置
		// 阻止 <a> 默认的 跳转事件

		// 提取 当前主题关键词 文本

		// 删除所有被选中元素的 [class = selected]

		// 为当前元素添加 [class = selected]
		

		// 在新闻内，筛选显示 当前被选中主题 的新闻项
		// 默认 topic = All，所有新闻项都显示 

		// topic != All 情况下，
		// 利用 .find().not(fn ()) 筛选不符合主题的内容行进行隐藏
		

		// 重新设置条纹效果

		stripe();


	});*/
	
});



// 定制与优化选择符
	// 怎么才能更加有效地查找元素

// 编写定制的选择符插件
// 提高代码可读性的一种方式是把代码片段封装为可以重用的组件。

// 最容易添加的选择符是伪类，也就是以冒号开头的选择符表达式，比如 :checked 或 :nth-child()。

/*
在使用选择符表达式查找元素的时候，jQuery会在一个内部的对象 expr 中取得JavaScript代
码。这个对象中的值与我们传入到 .filter() 或 .not() 中的筛选函数非常相似，当且仅当取得
的函数返回 true 的情况下，才会让每个元素包含在结果集中。使用 $.extend() 函数可以为这个
对象添加新的表达式

*/


// 9-8
// 构建一个名为 :group() 的伪类，用于查找表格行并为它们添加条纹效果


(function ($) {
	// $.extend() 自定义添加扩展jQuery，为对象添加新的表达式
	// $.expr[':'] 类 .filter()/.not() 筛选函数，筛选返回结果集，在此 为 $.expr[':'] 添加扩展 group()
	$.extend($.expr[':'], {
		/**
		 * 
		 * @param  {HTMLElement} element 当前考虑的 DOM 元素。这个参数对于大多数选择符都是必须，但我们这个选择符则不需要
		 * @param  {Int} index   DOM元素在结果集中的索引
		 * @param  {Array} matches 包含用于解析这个选择符的正则表达式的解析结果。
		 * @param  {HTMLCollection} set     匹配到当前元素的整个 DOM 元素集合，这个参数很少用
		 * @return {boolean}         是否符合当前条件，index % (num * 2) < num
		 */
		group: function (element, index, matches, set) {
			// 将当前的匹配转化为 10 位整数 - num
			var num = parseInt(matches[3], 10);
			// 检测输入的 num 是否符合要求，如果不符，返回 false
			if (isNaN(num)) {
				return false;
			}

			// 返回 检测条件获得的 boolean
			return index % (num * 2) < num;
		}
	})
})(jQuery);



// 9-9
// 利用 :group() 实现 3 个一组条纹
/*$(document).ready(function () {
	function stripe () {
		// 在内容行中删除所有[class = alt]

		// 在 <tbody> 遍历可见的子元素，同时子元素需要有 <td> 元素存在
		// 筛选子元素的索引是否符合 :group(3) 的条件
		// 符合添加的子元素添加 [class = alt]

	}
});
*/



// 选择符的性能问题


// 过早优化  微观优化
// 无数个小时时间投入进去，换来的往往只有 JavaScript 代码执行过程中毫秒级别的提升，这个提升很难被用户的眼睛觉察到。

// 开发人员中有一条经验法则，那就是人的时间总比机器的时间更值钱——除非应用程序确实明显反应迟钝。


// 选择符及遍历的性能问题经常是解决用户感觉网页反应迟钝的一个突破口。

/*
	针对选择符和遍历速度所作的任何决定，都有可能伴随着更新更快的浏览器发布，
	或者jQuery新版本加入巧妙的速度优化而变得毫无价值。
	为了真正提升性能，最好反复思考自己假定的条件，
	然后在使用jsPerf（http://jsperf.com/）等工具实际测量之后，
	再动手编写优化代码。
*/



// 1、Sizzle的选择符实现

/*
	在最本质的层次上，Sizzle会应用浏
	览器支持的最高效的原生DOM方法取得nodeList。
	这个节点列表是一个包含DOM元素的类似数组的对象，
	jQuery最终会将这个对象转换成真正的数组，
	并将其添加到jQuery对象中。

	1、循环测试
		原生 JavaScript 选择元素的方法不顶用时，Sizzle 循环遍历已经收到的所有元素，并且通过表达式测试每一个元素
		
		Document.getElementsByTagName('*')
	
		自定义的 jQuery 选择符 (:eq()/:odd/:even)，这个选择符没有对应的 CSS 版本。
	
	2、	.querySelectorAll()
	
	告诉大家一条通用的经验法则：要尽可能使用CSS规范中规定的选择符，除非没有可使用jQuery的自定义选择符。同样，在修改选择符之前，也要记住只在确实有必要提升性能的情况下再去提升。至于测量修改选择符之后的性能提升了多少，可以使用类似http://jsperf.com/所提供的基准测试工具。

*/





// DOM 遍历背后的秘密

/*
	每当我们从一个（组）DOM元素转移到另一个（组）DOM元素时，
	jQuery都会留意我们移动的路线并留下“面包屑”，
	以便我们在必要时能够找到“回家”的路。
	两个方法.end()和.addBack()就利用了这个记录。
	为了最大限度地利用这些方法，同时写出一般意义上的高效的jQuery代码，
	我们必须深入理解DOM遍历方法的运作机制。
*/

// jQuery对象属性

/*
	要得到一个jQuery对象的实例，需要向$()函数传入一个选择符表达式。而得到
	的对象是一个数组结构，其中包含着与该选择符匹配的每个DOM元素的引用。
	这个对象还隐藏着其他的一些属性
	
	比如.context属性中包含着一个DOM节点（通常是document）的引用，搜索就是从这个节点开始的；[ context 属性在jQuery version 1.10 中被弃用 ]
	比如.selector属性中保存着创建最终对象的选择符表达式。
	在调用.on()等事件委托方法时，这两个属性就会派上用场。

	在调用某个DOM遍历方法时，则会用上第三个属性：.prevObject
	这个属性中保存着调用遍历方法的那个jQuery对象。

*/

// 9-10

// 使用 jQuery JavaScript Library v1.9.0
/*
$(document).ready(function () {

	var $cell = $('#release');
	$cell.addClass('highlight');
	console.log($cell.context ); // #document
	console.log($cell.selector); // #release
	console.log($cell.prevObject); // undefined
});
*/


// 9-11
/*
$(document).ready(function () {
	// 代码高亮 .highlight 添加
	var $cell = $('#release').nextAll();
	$cell.addClass('highlight');
	
	console.log($cell.context ); // undefined
	console.log($cell.selector); // undefined
	// 被选中元素的前一个对象
	console.log($cell.prevObject); // [td#release]

});
*/




// DOM 元素栈


/*
每个jQuery对象都有一个.prevObject属性指向前一个对象。这样，就有了一个实现了栈的列表结构。
每个遍历方法都会找到一组新元素，然后把这组元素压入到栈中。
这个栈只有我们需要它的时候才有用，而.end()和.addBack()方法就是用来操作这个栈的。
*/


// .end() 简单地从栈中弹出一个元素，结果就是栈的最上方保存着与 .prevObject 属性中相同的引用


// .addBack() 调用.addBack()时，jQuery 会在栈中回溯一个位置，把两个位置上的元素集组合起来。
$(document).ready(function () {
	// .nextAll() 本元素之后同级元素集
	// .addBack() 包含前一个引用
	// 也就是 .nextAll() + this
	var $addBack = $('#release').nextAll().addBack();
	$addBack.addClass('highlight');
	
	// console.log($addBack.prevObject);
	// (2) [td.highlight, td.highlight, prevObject: r.fn.init(1)]

	// console.log($addBack);
	// (3) [td#release.highlight, td.highlight, td.highlight, prevObject: r.fn.init(2)]
	
});


/*
$(document).ready(function () {
	// .nextAll() 本元素之后同级元素集
	// .end() 前一个引用
	// .nextAll().end()  ==>  this
	var $end = $('#release').nextAll().end();
	$end.addClass('highlight');

	// console.log($end);
	// [td#release.highlight]
});
*/



// 编写DOM遍历方法插件

// 用来找到与给定单元格在同一列 <td> 中的所有单元格

// 我会：利用 prevObject 回溯到最上面，然后 .nextAll() 和 .addBack() -- 我理解错误了 prevObject 了，prevObject 并非是指向上一个 元素对象，而是隐式迭代中的上一个 作用域

// 这里我理解错误的 prevObject 作用和原生 JavaScript 中的 previousSiblings() 的作用
// 这里应该可以用 .prev() 不断上溯，可以这个算法效率太低了

/**
 * 遍历所有元素，逐个把单元格所在的列添加到变量 $cells 中
 * 
 */
(function ($) {
	$.fn.column = function () {
		var $cells = $();  // 创建一个空 $() 对象赋给 $cells
		this.each(function () {
			// closest() 方法获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。
			// from：http://www.w3school.com.cn/jquery/traversing_closest.asp
			
			// 在此处获得 从 this[当前元素] -回溯-> td,th 之间的所有元素 <td|th> 集合
			
			var $td = $(this).closest('td, th');

			// 如果当前 <td|th> 集合确实存在 
			if ($td.length) {
				// 当前元素 <td|th> 的第一个元素的 cellIndex + 1
				var colNum = $td[0].cellIndex + 1;

				// 当前 <td|th> 元素集合 closet() 当前元素开始 DOM 树 上溯整个 <table> 寻找所有 <td|th>， 并利用 :nth-child(colNum) 筛选元素，接而添加到 $cells 当中
				var $columnCells = $td
						.closest('table')
						.find('td, th')
						.filter(':nth-child(' + colNum + ')');
				$cells = $cells.add($columnCells);
			}
		});

		// 返回 $cells，所有符合条件的 <td|th>
		return this.pushStack($cells);
	};
})(jQuery);

/*
$(document).ready(function () {
	$(document).on('click', function (event) {
		$(event.target).column().addClass('highlight');
	});
});
*/





// DOM遍历的性能问题

// 1、使用连缀 -- 减少重复

// stripe()函数就两次使用了ID选择符#news查找元素：一次是为了从带有
// alt类的行中删除该类，另一次是为了给新选中的行添加这个类。
// 如代码所示，使用连缀可以把两次操作合二为一，避免重复查找。


// 调用.find()会把表格行压入栈中，而然后的.end()方法则把这些行弹出
// 从而让下一次调用.find()仍然是在#news表格上执行操作。

/*
$(document).ready(function () {
	function stripe() {
		$('#news')
			.find('tr.alt').removeClass('alt').end()
			.find('tbody').each(function () {
				$(this).children(':visible').has('td')
					.filter(':group(3)').addClass('alt');
			});
	}
	stripe();
});
*/

// 2、使用缓存
/*
	考虑到使用选择符和遍历方法的性能问题，缓存的目标可以确定为把jQuery对象保存在
一个变量中，以便将来使用时不再重新创建同样的对象。
*/
/*
$(document).ready(function () {
	// 利用 $news 缓存
	var $news = $('#news');

	function stripe() {
		$news.find('tr.alt').removeClass('alt');
		$news.find('tbody').each(function () {
			$(this).children(':visible').has('td')
				.filter(':group(3)').addClass('alt');
		});
	}
	stripe();
});
*/

// 在实际编码中，应该选择可读性最好、最容易维护的方式。













