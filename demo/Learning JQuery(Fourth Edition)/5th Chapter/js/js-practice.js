/*---------------------------------------------------------------------------------------------

	要完成以下练习，读者需要本章的index.html文件，以及complete.js中包含的已经完成的
	JavaScript代码。可以从Packt Publishing网站http://www.packtpub.com/support下载这些文件。
	“挑战”练习有一些难度，完成这些练习的过程中可能需要参考jQuery官方文档：http://api.
	jquery.com/。
	(1) 修改添加back to top链接的代码，以便这些链接只从第四段后面才开始出现。
	(2) 在单击back to top链接时，为每个链接后面添加一个新段落，其中包含You were here字样。
	确保链接仍然有效。
	(3) 在单击作者名字时，把文本改为粗体（通过添加一个标签，而不是操作类或CSS属性）。
	(4) 挑战：在随后单击粗体作者名字时，删除之前添加的<b>元素（也就是在粗体文本与正常
	文本之间切换）。
	(5) 挑战：为正文中的每个段落添加一个inhabitants类，但不能调用.addClass()方法。
	确保不影响现有的类。

-----------------------------------------------------------------------------------------------*/


// (1) 修改添加back to top链接的代码，以便这些链接只从第四段后面才开始出现。
$(document).ready(function () {
// 在body的首部，放置#top，然后使用a[href=#top]点击链接到#top
// 要使链接从第四段才开始出现，使得p:gt(4)，表示选择<p>第四个之后才发生效用
	$('<a href="#top">back to top</a>').insertAfter('.chapter p:gt(4)');
	$('<a id="top"></a>').prependTo('body'); 
});

// (2) 在单击back to top链接时，为每个链接后面添加一个新段落，其中包含You were here字样。
// 确保链接仍然有效。
$(document).ready(function () {
	$('a[href="#top"]').after('<p>You were here</p>');
});


// (3) 在单击作者名字时，把文本改为粗体（通过添加一个标签，而不是操作类或CSS属性）。
// (4) 挑战：在随后单击粗体作者名字时，删除之前添加的<b>元素（也就是在粗体文本与正常
// 文本之间切换）。

$(document).ready(function () {
	$('#f-author').click(function (event) {
		event.preventDefault();
		if($('#f-author').children('b').length <= 0) {
			// $(this).wrap('<b></b>');  // <b>在this外面
			// $('#f-author').wrapAll('<b></b>');
			// <b><div id="f-author">by Edwin A. Abbott</div></b>
			
			$('#f-author').wrapInner('<b></b>');
			// <div id="f-author"><b>by Edwin A. Abbott</b></div>
		}else {
			var html = $(this).children('b').html();
			$(this).children('b').detach();
			$(this).html(html);
		}
	});
});


// (5) 挑战：为正文中的每个段落添加一个inhabitants类，但不能调用.addClass()方法。
// 确保不影响现有的类。

$(document).ready(function () {
	var html = $('p').html();
	 
	$.each($('.chapter p'), function (pIndex, pVal) {
		var html = $(pVal).html();
	// console.log(html);
		$(pVal).replaceWith('<p class="inhabitants">'+ html +'</p>');
		
	//$('.inhabitants')已插入，可以在此进行操作，但是有多个该对象，需要使用eq(index)进行区分
		$('.inhabitants').eq(pIndex).html(html); 
		// console.log($(dd).html())
	});


	// 利用attr添加
	// $('p').attr({'class': 'inhabitants'});

});


















































