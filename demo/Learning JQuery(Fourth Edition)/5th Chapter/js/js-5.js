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
	// 
	// 对于布尔值属性，最后是测试DOM属性而不是HTML属性，以确保跨浏览器的一致行为：
	// 
	// 取得'checked'属性的当前值
	// var currentlyChecked = $('.my-checkbox').prop('checked')
	// 设置'checked'属性的值
	// $('.my-checkbox').prop('checked', false);

	// .prop() 与 .attr()方法没有什么不同


	// 表单控件的值
	// HTML属性与DOM属性差别最大的地方：表单控件的值

	// 建议使用jQuery中的.val()

	// 取得文本输入框的当前值
	// var inputValue = $('#my-input').val();

	// 取得选项列表的当前值
	// var selecValue = $('#my-select').val();

	// 设置单选列表的值
	// $('#my-single-select').val('value3');

	// 设置多选列表的值
	// $('#my-multi-select').val(['value2', 'value2'])



	// DOM树操作

	// 重新认识$()函数：$()不止能访问文档中的元素，还能改变页面的视觉外观和改变页面中实际的内容。

	// 插入所创建的a[href=#top]和a#top元素

	// a[href=#top]插入到每段落之后
	$('<a href="#top">back to top</a>').insertAfter('div.chapter p');

	// a#top插入到<body>中的靠前部
	$('<a id="top"></a>').prependTo('body');

	// .insertBefore()在现有元素外部、之前添加内容
	// .prependTo()在现有元素内部、之前添加内容
	// .appendTo()在现有元素内部、之后添加内容
	// .insertAfter()在现有元素外部、之后添加内容

	// 移动元素

	// $('span.footnote').insertBefore('#footer');

	// 围绕着这些脚注还有很多后续工作要做：
	// 更加健壮的一种脚注方案应该是：
	// 1、为每个标注编号；
	// 2、在正文中标出提取脚注的位置，使用脚注的编号
	// 3、在文本中的位置上创建一个指向对应脚注的链接，在脚注中创建返回文本位置的链接。


	// 包装元素
	// $('span.footnote')
	// 	.insertBefore('#footer')
	// 	.wrapAll('<ol id="notes"></ol>')	// 最外面包围(All)
	// 	.wrap('<li></li>');					//	外面包围


	// 显式迭代：.each()
	// 反向插入法
	/*var $notes = $('<ol id="notes"></ol>').insertBefore('#footer');		// 在#footer前面添加<ol id="notes"></ol>
	$('span.footnote').each(function (index){ // index迭代次数，自增
		$('<sup>' + (index + 1) + '</sup>').insertBefore(this); // 为文中引用内容添加脚注编号
		$(this).appendTo($notes).wrap('<li></li>');	// 每一个span.footnote添加到<ol>元素内，并将环绕套上<li>
	});*/


	/*// 正向插入重构
	var $notes = $('<ol id="notes"></ol>').insertBefore('#footer');	
	$('span.footnote').each(function (index){ 
		$(this).before('<sup>' + (index + 1) + '</sup>').appendTo($notes).wrap('<li></li>');	
	});*/

	// '+' 字符串链接符，与.join()连接符，效果一样
	// .join()使用更有条理性
	var $notes = $('<ol id="notes"></ol>').insertBefore('#footer');	
	$('span.footnote').each(function (index){ 
		$(this).before(		// 添加脚注编号，并加以链接到达脚注
			[ '<a href="#footnote-'
			, index + 1
			, '" id="context-'		// 脚注返回寻址需要
			, index + 1
			, '" class="context">'
			, '<sup>'
			, index + 1
			, '</sup></a>'
			].join(''))			// 利用.join()能够更好的组织字符串
			.appendTo($notes)	// 将上述的DOM添加到已创建好的ol中
			.append([			// 为脚注添加本文内容引用链接，到达文中引用处
				'&nbsp;(<a href="#context-',
				index + 1,
				'">context</a>)'
				].join(''))
			.wrap('<li id="footnote-' + (index + 1) + '"></li>');// 利用<li>环绕脚注，并添加id属性，以达到可连接到达的目的
	});


	// 正向插入			反向插入
	
	// 在相匹配的元素相邻插入新元素或插入新元素到匹配元素的相邻出
	// .before()		.insertBefore()
	// .after()			.insertAfter()
	
	// 在每个匹配的元素中插入或插入到相匹配的元素中
	// .append() 		.appendTo()
	// .prepend()		.prependTo()


	// 复制元素

	// 默认情况下，复制元素不会复制事件
	// 
	$('div.chapter p:eq(0)').clone().insertBefore('div.chapter');

	// 连同事件一起复制，为.clone()添加布尔值:true，即.clone(true)

	// 很多网站都和它们的印刷版一样，使用了突出引用（pull quote）来强调小块的文本并吸引读
	// 者的眼球。所谓突出引用，就是从正文中提取一部分文本，然后为这段文本应用特殊的图形样式。

	$('span.pull-quote').each(function (index) {
		var $parentParagraph = $(this).parent('p');		// 设置父元素相对定位，为需要漂动的元素做准备
		$parentParagraph.css('position', 'relative');	
		
		var $clonedCopy = $(this).clone();		// 克隆需要突出的元素

		// $clonedCopy								// 为克隆得到的内容添加.pulled，添加到本段落中，做突出内容
		// 	.addClass('pulled')
		// 	.prependTo($parentParagraph);
		
		// 如果能够对突出引用稍作修改，去掉一些文本并代之以省略号，那么效果会更好。为此，我
		// 们在例子文本中已经将某些文本包装在了<span class="drop">元素中。
		$clonedCopy
			.addClass('pulled')
			.find('span.drop')			// 将span.drop内容利用.html()替换成省略号
				.html('&hellip;')
			.end()						// 将操作返回原来的操作集合span.dorp中
			.text($clonedCopy.text())	// 利用.text()获取纯文本，然后再次放入，消除HTML标签样式
			.prependTo($parentParagraph);



	});

	// .html()
	// .text() 取得文本，无HTML标签



});


// document.write(document.compatMode);
// 模式检测
// 标准或接近标准：CSS1Compat
// 怪异：backCopat

// 正向插入			反向插入

// 在相匹配的元素相邻插入新元素或插入新元素到匹配元素的相邻出
// .before()		.insertBefore()
// .after()			.insertAfter()

// 在每个匹配的元素中插入或插入到相匹配的元素中
// .append() 		.appendTo()
// .prepend()		.prependTo()


// 环绕元素插入(三者有什么不同)
// .wrap()
// .wrapAll()
// .wrapInner()

// 用新元素或文本替换每个匹配的元素
// .html()
// .text()
// .replaceall()
// .replaceWith()


// 移除每个匹配元素中的元素
// .empty()

//移除文档中匹配的元素及其后代元素，但不实际删除它们
//.remove()
//.detach()

























































































