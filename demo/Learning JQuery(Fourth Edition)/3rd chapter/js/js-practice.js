/*---------------------------------------------------------------------------------------------
	要完成以下练习，读者需要本章的index.html文件，以及complete.js中包含的已经完成的
	JavaScript代码。可以从Packt Publishing网站http://www.packtpub.com/support下载这些文件。
	“挑战”练习有一些难度，完成这些练习的过程中可能需要参考jQuery官方文档：http://
	api.jquery.com/。
	(1) 在Charles Dickens被单击时，给它应用selected样式。
	(2) 在双击章标题（<h3 class="chapter-title">）时，切换章文本的可见性。
	(3) 当用户按下向右方向键时，切换到下一个body类；右方向键的键码是39。
	(4) 挑战：使用console.log()函数记录在段落中移动的鼠标的坐标位置。（注意：console.log()
	可以在Firefox的firebug扩展、Safari的Web Inspector或Chrome、IE中的Developer Tools中使
	用。）
	(5) 挑战：使用.mousedown()和.mouseup()跟踪页面中的鼠标事件。如果鼠标按键在按下
	它的地方被释放，则为所有段落添加hidden类。如果是在按下它的地方之下被释放的，
	删除所有段落的hidden类。

-----------------------------------------------------------------------------------------------*/


$(document).ready(function () {
	// 为该内容添加样式，curosr:pointer;方便辨认
	$('div.author').css({cursor: 'pointer'});
	// (1) 在Charles Dickens被单击时，给它应用selected样式。
	$('div.author').click(function (event) {
		event.preventDefault();
		$('div.author').addClass('selected');
	});
});

// (2) 在双击章标题（<h3 class="chapter-title">）时，切换章文本的可见性。
// 直接使用toggle可以得到visible?hide:show双重效果
$(document).ready(function () {
	$('h3.chapter-title').css({cursor: 'pointer'});
	$('h3.chapter-title').dblclick(function (event) {
		event.preventDefault();
		$(this).siblings('p').toggle();
	});
});

// (4) 挑战：使用console.log()函数记录在段落中移动的鼠标的坐标位置。（注意：console.log()
// 可以在Firefox的firebug扩展、Safari的Web Inspector或Chrome、IE中的Developer Tools中使
// 用。）
$(document).ready(function () {
	$('.chapter').on('mousemove',function (event) {
		// 偶然发现，鼠标的位置是相对于窗口的，不是跟随页面，上下滑轮得到的鼠标位置数据不会改变
		var offsetX = event.pageX;
		var offsetY = event.pageY;
		// console.log('left: ' + offsetX, 'top: ' + offsetY);
	});
});


// (5) 挑战：使用.mousedown()和.mouseup()跟踪页面中的鼠标事件。如果鼠标按键在按下
// 它的地方被释放，则为所有段落添加hidden类。如果是在按下它的地方之下被释放的，
// 删除所有段落的hidden类。

$(document).ready(function () {
	var offsetX, offsetY;
	// 使用document能够在窗口范围进行移动鼠标进行动作，
	// 如果使用body或是.chapter则是范围缩小一旦添加hidden之后就难以继续
	$(document).mousedown(function (event) {
		event.preventDefault();	// 阻止默认事件，不然无法进行，或是有其他动作干扰实验过程
		// offsetY = event.pageX;
		offsetY = event.pageY;
		// console.log('初始开始y值：' + offsetY);
	}).mouseup(function (event) {
		event.preventDefault();
		var _y = event.pageY - offsetY;
		// console.log('移动的位置： ' + _y)
		// js不能直接使用正负来判断，需要逻辑比较
		// .mousedown()之时的鼠标位置与.mouseup()的鼠标位置相比较 
		// offset(.mouseup()) - offset(.mousedown()) = _y
		
		if (_y > 0) {

			// 因为event.pageY表示的是上下位置，越往上表示数值越小，越往下数值越大
			//  > 0 表示鼠标在初始位置下面
			// 利用hasClass('hidden')判断动作之前有没有.hidden，已有则删除，无则无动作
			if(!$('.chapter p').hasClass('hidden')){
				$('.chapter p').addClass('hidden');
				// console.log($('.chapter p').hasClass('hidden') + ' not');
			};

		} else {
			// _y < 0 表示鼠标在初始位置之上被释放，为所有段落添加.hidden
			if ($('.chapter p').hasClass('hidden')) {
				$('.chapter p').removeClass('hidden');
				// console.log($('.chapter p').hasClass('hidden') + ' if');
			};
		}
	});
});



































