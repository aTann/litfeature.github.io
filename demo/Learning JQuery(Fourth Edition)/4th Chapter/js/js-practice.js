/*---------------------------------------------------------------------------------------------

	要完成以下练习，读者需要本章的index.html文件，以及complete.js中包含的已经完成的
	JavaScript代码。可以从Packt Publishing网站http://www.packtpub.com/support下载这些文件。
	“挑战”练习有一些难度，完成这些练习的过程中可能需要参考jQuery官方文档：
	http://api.jquery.com/。
	(1) 修改样式表，一开始先隐藏页面内容，当页面加载后，慢慢地淡入内容；
	(2) 在鼠标悬停到段落上面时，给段落应用黄色背景；
	(3) 单击标题（<h2>）使其不透明度变为25%，同时添加20px的左外边距，当这两个效果完
	成后，把讲话文本变成50%的不透明度；
	(4) 挑战：按下方向键时，使样式转换器向相应的方向平滑移动20像素；四个方向键的键码
	分别是37（左）、38（上）、39（右）和40（下）。

-----------------------------------------------------------------------------------------------*/

// (1) 修改样式表，一开始先隐藏页面内容，当页面加载后，慢慢地淡入内容；
$(document).ready(function () {
	$('body').hide().fadeIn(500);
});

// (2) 在鼠标悬停到段落上面时，给段落应用黄色背景；
$(document).ready(function () {
	// 利用.on()进行mouseover和mouseout绑定，进入文段之后就发生背景变化
	$('.speech p').on({
		'mouseover': function (event) {
		$(this).css({'background-color': '#ff0'});
		// console.log('1');
		// console.log($(this).html());
		},
		'mouseout': function (event) {
			$(this).css({'background-color': 'transparent'});
		}
		
	});
});

/*$(document).ready(function () {
	// 利用.on()进行mouseover和mouseout绑定，进入文段之后就发生背景变化
	$('.speech p').on({
		'mouseover': function (event) {
			$(this).animate({
				// fontSize: "24px" ,
				backgroundColor: 'brown'  // jQuery.animate()不能改变color
			}, 500);

		// console.log($(this).html());
		},
		'mouseout': function (event) {
			$(this).animate({
				backgroundColor: 'transparent'
			}, 500);
		}
		
	});
});*/


// (3) 单击标题（<h2>）使其不透明度变为25%，同时添加20px的左外边距，当这两个效果完成后，
// 把讲话文本变成50%的不透明度；
$(document).ready(function () {
	$('#container h2').click(function (event) {
		event.preventDefault();
		$(this).animate({
			opacity: 0.25,
			marginLeft: '+20'
		}, 500, function () {
			$(this).animate({
				opacity: 0.5
			})
		});
	});
});


// (4) 挑战：按下方向键时，使样式转换器向相应的方向平滑移动20像素；
// 四个方向键的键码分别是37（左）、38（上）、39（右）和40（下）。
// switch 分支语句
// 
$(document).ready(function () {
	$(document).keyup(function (event) {
			// event.preventDefault();
			var $switcher = $('#switcher'),
				code_id = event.keyCode;
			switch (code_id) {
				case 37:
				// 刚开始利用position:absolution; left/top/right/botton，但是会导致文档流错乱
				// 再次尝试使用margin-left/margin-top/margin-right/margin-bottom  -=20px，
				// 但是margin-right没有动作表现，而且margin-botton会导致后面的文档上挪，并且效果不可恢复
				// 再次尝试，只是对margin-left/margin-top进行操作，
				// left: margin-left -= 20px
				// top: margin-top -= 20px
				// right: margin-left += 20px
				// bottom: margin-top += 20px
				// 保持了文档了稳定，而且效果可以恢复
				// 
				// 在上下左右移动时候，在移动元素不是占据整个页面时候或许不需要每个位置的属性都出现，
				// 只需要靠边的两个应该就行了，一般靠边的是左(left)/上(top)
				// from: [jQuery实现用方向键控制层的上下左右移动](http://www.jb51.net/article/33223.htm) by 脚本之家(jb51)
					$switcher.animate({'margin-left': '-=20px'}, 500);
					// 刚开始对于left实现时候，样式表示 'left': '+20'，无结果
					// 再次尝试，'left': '+20px'，还是没有效果出现
					// 最后在博文中得到，应该'left':'+=20px'
					console.log('37');
					break;
				case 38:
					$switcher.animate({'margin-top': '-=20px'}, 500);
					console.log('38');
					break;
				case 39:
					$switcher.animate({'margin-left': '+=20px'}, 500);
					console.log('39');
					break;
				case 40:
					$switcher.animate({'margin-top': '+=20px'}, 500);
					console.log('40');
					break;
				default:
					// statements_def
					break;
			}
		});
});
















