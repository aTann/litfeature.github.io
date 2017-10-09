
// 使用插件

/*$(document).ready(function() {
    

	// 简单调用
    // $('#books').cycle();


    // 为插件方法指定参数
    $('#books').cycle({
    	timeout: 2000,
    	speed: 200,
    	pause: true
    });

});*/

    // 修改参数默认值
    
$.fn.cycle.defaults.timeout = 10000;
$.fn.cycle.defaults.random = true;

$(document).ready(function () {
	$('#books').cycle({
		timeout: 2000,		// 优先使用函数中的设置，$.fn.cycle.defaults.timeout = 10000;设置失效
		speed: 200,
		pause: true
	});
});


$(document).ready(function () {
	var $books = $('#books');
	var $controls = $('<div id="books-controls"></div>');
	$controls.insertAfter($books);

	/*// 暂停
	$('<button>Pause</button>').click(function (event) {
		event.preventDefault();
		$books.cycle('pause');

		$.cookie('cyclePaused', 'y');  // 添加cookie

		// console.log($.cookie('cyclePaused'));
	
	}).appendTo($controls);*/

	// 恢复播放
	// $('<button>Resume</button>').click(function (event) {
	// 	event.preventDefault();
	// 	$books.cycle('resume')
	// }).appendTo($controls);

	// 多组幻灯片时候用 :paused 暂停标记
	// $('<button>Resume</button>').click(function (event) {
	// 	event.preventDefault();
	// 	$('ul:paused').cycle('resume')			

	// 	// 消除cookie
	// 	$.removeCookie('cyclePaused');
	// 	// $.cookie('cyclePaused', null);  // 消除才行

	// }).appendTo($controls);


	/*// 如果$.cookie('cyclePaused')存在，则暂停
	if ($.cookie('cyclePaused')) {
		$books.cycle('pause');
		// console.log($.cookie('cyclePaused'));

	}*/


	// 配合UI库
	// 纯JQuery库中，animate无法变换颜色background-color，color等的
	// 在文档中引用核心效果文件的情况下，扩展的.animate()方法可以接受另外一些样式属
	// 性，例如borderTopColor、backgroundColor和color。
	
	/*// 颜色动画
	$books.hover(function () {
		$books.find('.title').animate({
			'background-color': '#eee',
			'color': '#000'
		}, 'slow');
		console.log();
	}, function () {
		$books.find('.title').animate({
			'background-color': '#000',
			'color': '#fff'
		}, 'slow');
	});*/

	// 基于类的动画
	// $('h1').click(function () {
	// 	$(this).toggleClass('highlighted', 'slow');
	// });

	// 高级缓动函数
	$('h1').click(function () {
		$(this).toggleClass('highlighted', 'slow', 'easeInExpo')
	});


	/*// shake效果特别适合强调当前不能接受的动作
	$('<button>Resume</button>').click(function (event) {
		event.preventDefault();
		var $paused = $('ul:paused');
		if ($paused.length) {		// 检查:paused暂停标记，是否有可以恢复的幻灯片
			$paused.cycle('resume');	// 如果有，执行Cycle的resume操作，恢复幻灯片
		}else {		// 如果无
			$(this).effect('shake', {		// 执行shake效果，左右摆动，表示该操作无效
				distance: 10
			});
		}
		// 消除cookie
		$.removeCookie('cyclePaused');
	}).appendTo($controls);*/


	// 交互组件 需要加载jquery-ui.css
	// 未能使用
	// .resizable() 大小可调整
	// $books.find('.title').resizable();
	$books.find('.title').resizable({
		handles: 's'		// 只能拉扯下边
	});

	// 部件 需要加载jquery-ui.css
	$('button').button();


	// 暂停
	$('<button>Pause</button>').click(function (event) {
		event.preventDefault();
		$books.cycle('pause');

		$.cookie('cyclePaused', 'y');  // 添加cookie
	}).button({
		icons: {primary: 'ui-icon-pause'}
	}).appendTo($controls);


	// shake效果特别适合强调当前不能接受的动作
	$('<button>Resume</button>').click(function (event) {
		event.preventDefault();
		var $paused = $('ul:paused');
		if ($paused.length) {		// 检查:paused暂停标记，是否有可以恢复的幻灯片
			$paused.cycle('resume');	// 如果有，执行Cycle的resume操作，恢复幻灯片
		}else {		// 如果无
			$(this).effect('shake', {		// 执行shake效果，左右摆动，表示该操作无效
				distance: 10
			});
		}
		// 消除cookie
		$.removeCookie('cyclePaused');
	}).button({								// 添加部件
		icons: {primary: 'ui-icon-play'}	// 为部件添加图标
	}).appendTo($controls);

	// 如果$.cookie('cyclePaused')存在，则暂停
	if ($.cookie('cyclePaused')) {
		$books.cycle('pause');
		// console.log($.cookie('cyclePaused'));
	}

	// 滑动条
	// $('<div id="slider"></div>').slider({
	// 	min: 0,
	// 	max: $('#books li').length - 1
	// }).appendTo($controls);

	

	// 为进度条绑定一个由滑动触发的自定义事件
	$('<div id="slider"></div>').slider({
		min: 0,
		max: $('#books li').length - 1,
		slide: function (event, ui) {
			$books.cycle(ui.value);
		}
	}).appendTo($controls);

	// 幻灯片影响滑动条
	var $books = $('#books').cycle({
		timeout: 2000,
		speed: 200,
		pause: true,
		before: function () {
			$('#slider')
				.slider('value', $('#books li').index(this));
		}
	});
});













