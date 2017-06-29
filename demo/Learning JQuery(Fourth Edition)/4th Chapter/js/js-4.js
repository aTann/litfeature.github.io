// 样式与动画

// 修改内联CSS
// .css() 集getter(获取方法)和setter(设置方法)于一身
// 1、获取属性值
// .css('property', ['property2', 'property3'])
// 2、设置属性值
// .css('property': 'value')
// .css({
// 		'property-1' : 'value-1',
// 		'property-2' : 'value-2'
// 		})
// 		这些键值的集合叫对象字面量，是在代码中直接创建的JavaScript对象


// 对象字面量
// 一把来说，数字值不需要加引号而字符串需要加引号。由于属性名是字符串，所以属性通常是需要加引号的。
// 但是，如果对象字面量中的属性名是有效的JavaScript标识符，比如使用驼峰大小写形式的DOM表示法是，则可以省略引号。
// 

$(document).ready(function () {
	

	// 设置计算的样式属性值
	
	var $speech = $('div.speech');

/*	$('#switcher-large').click(function () {
		// 获取div.speech的font-size数值大小
		var num = parseFloat($speech.css('fontSize'));

		// 将得到的div.speech font-size 增大1.4倍后重新设置
		num *= 1.4;
		$speech.css('fontSize', num + 'px');
		// 
		console.log(num);
	});*/

	// var defaultSize = parseFloat($speech.css('fontSize'));

	// $('#switcher button').click(function () {
	// 	var num = parseFloat($speech.css('fontSize'));
	// 	// if (this.id == 'switcher-large') {
	// 	// 	num *= 1.4;
	// 	// }else if (this.id == 'switcher-small') {
	// 	// 	num /= 1.4;
	// 	// }
		
	// 	switch (this.id) {
	// 		case 'switcher-large':
	// 			num *= 1.4;
	// 			break;
	// 		case 'switcher-small':
	// 			num /= 1.4;
	// 			break;
	// 		default:
	// 			num = defaultSize;
	// 			break;
	// 	}

	// 	$speech.css('fontSize', num + 'px');

	// 	// console.log(num);
	// 	// 6.857142857142858 （最小)
	// });

	// 隐藏和显示元素
	// .hide()/.show() 会记住变化前的属性，如果变化为display:inline/block/inline-block
	// 一般.hide()会由当前的状态变为display:none，.show()则可以变回原来的状态中

	$('p').eq(1).hide();
	// $('a.more').click(function (event) {
	// 	event.preventDefault();
		
	// 	// .show('slow')，显示
	// 	// $('p').eq(1).show('slow');	// 指定以'slow'的速度打开隐藏的<p>
		
	// 	// .fadeIn('slow')淡入
	// 	// $('p').eq(1).fadeIn('slow');
		
	// 	//.slideUp('slow')滑下
	// 	$('p').eq(1).slideUp('slow');

	// 	$(this).hide();			// 隐藏当前的<a class='more'>
	// });

	// 切换可见性
/*	$('a.more').click(function (event) {
		event.preventDefault();
		if($('p').eq(1).is(':hidden')) {
			$('p').eq(1).show('slow');
			$(this).text('read less');
		} else {
			$('p').eq(1).hide('slow');
			$(this).text('read more');
		}
	});*/

	// 按钮文字更换
	var textChange = function (text_link) {	
		if (text_link.text() == 'read more') {
			text_link.text('read less');
		} else {
			text_link.text('read more');
		}
	};
		

/*	$firstPara = $('p').eq(1);
	// 使用符合效果函数实现可见性切换
	$('a.more').click(function (event) {
		event.preventDefault();
		$($firstPara).slideToggle('slow');
		
		// 按钮文字更换
		textChange($(this));
	});*/


	// 创建自定义动画
	// .animate()
	// 形式1：4参数
	//包含样式属性及值的对象
	//可选的时长参数
	//可选的缓动(easing)类型
	//可选的回调函数
	//.animate({property1: 'value1', property2: 'value2'},
	//	duration, easing, function() {
	//		alert('The animate is finished.')}) 
	//
	//形式2：2个参数
	//.animate({propatyes}, {options})
	//第2个参数其实第一形式中其他2~4参数的封装
	//.animate({
	//	property1: 'value1',
	//	property2: 'value2'},
	//	{
	//	duration: 'value',
	//	easing: 'value',
	//	specialEasing: {
	//		property1: 'easing1',
	//		property2: 'easing2'
	//	},
	//	complete: function() {
	//		alert('The animate is finished.')
	//	},
	//	queue: true,
	//	step: callback
	//	})

/*	$firstPara = $('p').eq(1);
	$('a.more').click(function (event) {
		event.preventDefault();
		$firstPara.animate({height: 'toggle'}, 'slow');
		textChange($(this));
	});*/
	// .animate()方法针对CSS属性提供了方便简写值：'show'、'hide'
	// 和'toggle'，以便在简写方法不适用时提供另一种简化.slideToggle()等内置效果方法的方式。

	
	$firstPara = $('p').eq(1);
	$('a.more').click(function (event) {
		event.preventDefault();
		$firstPara.animate({
			opacity: 'toggle',
			height: 'toggle'
		}, 'slow');
		textChange($(this));

		// 不仅可以在简写效果方法中使用样式属性，也可以使用其他CSS属性，如：left、
		// top、fontSize、margin、padding和borderWidth

	});


	var defaultSize = parseFloat($speech.css('fontSize'));

	$('#switcher button').click(function () {
		var num = parseFloat($speech.css('fontSize'));
		
		switch (this.id) {
			case 'switcher-large':
				num *= 1.4;
				break;
			case 'switcher-small':
				num /= 1.4;
				break;
			default:
				num = defaultSize;
				break;
		}

		$speech.animate({'fontSize': num + 'px'}, 'slow');

		// console.log(num);
		// 6.857142857142858 （最小)
	});


	// 在可变宽度的布局中，需要计算盒子在与页面右侧对齐之前应该移动的距离。假设段落宽度
	// 为100%，可以从段落宽度中减去Text Size盒子的宽度。我们使用jQuery的.outWidth()方法来
	// 计算宽度，包括内边距及边框宽度。我们还使用这个方法计算转换器新的left属性。对于这个
	// 例子而言，我们打算通过单击按钮上面的Text Size文本来触发动画，

	/*$('div.label').click(function () {
		var paraWidth = $('div.speech p').outerWidth();
		var $switcher = $(this).parent();
		var switcherWidth = $switcher.outerWidth();
		$switcher.css({
			position: 'relative'  	// 没有当前的.css({position: 'relative'})，下面的left不会有动作
		})
		.animate({
			position: 'relative',
			borderWidth: '5px',
			left: paraWidth - switcherWidth,
			height: '+=20px'
		},'slow');
	});*/

	/*// 一组.animate()会逐个进行
	// 以下代码，先看到left移动，然后看到height变化，最后看到borderWidth变化
	$('div.label').click(function () {
		var paraWidth = $('div.speech p').outerWidth();
		var $switcher = $(this).parent();
		var switcherWidth = $switcher.outerWidth();

		$switcher.css({
			position: 'relative'
		}).animate({left: paraWidth - switcherWidth}, 'slow')
		  .animate({height: '+=20px'}, 'slow')
		  .animate({borderWidth: '5px'}, 'slow');
	});*/
	


	// 我们可以按照下列顺序对<div id="switcher">上的效果进行排队。
	// (1) 通过.fadeTo()将其不透明度减退为0.5。
	// (2) 通过.animate()将其移动到右侧。
	// (3) 通过.fadeTo()将其渐增回完全不透明。
	// (4) 通过.slideUp()隐藏它。
	// (5) 通过.slideDown()再将其显示出来。
	// 我们所要做的，就是在代码中按照相同的顺序连缀这些效果，
	
	// $('div.label').click(function () {
	// 	var paraWidth = $('div.speech p').outerWidth();
	// 	var $switcher = $(this).parent();
	// 	var $switcherWidth = $switcher.outerWidth();
	// 	$switcher
	// 		.css({position: 'relative'})
	// 		.fadeTo('fast', 0.5)
	// 		.animate({left: paraWidth - $switcherWidth}, 'slow')
	// 		.fadeTo('slow', 1)
	// 		.slideUp('slow')
	// 		.slideDown('slow');
	// 	// 连缀，逐层进行

	// });



	/*// 1. 越过队列
	// 不过，要是想在这个<div>不透明度减退至一半的同时，把它移动到右侧应该怎么办呢？如
	// 果两个动画以相同速度执行，则可以简单地把它们组合到一个.animate()方法中。但这个例子
	// 中的.fadeTo()使用的速度字符串是'fast'，而向右移动的动画使用的速度字符串是'slow'。
	// 在这种情况下，第二种形式的.animate()方法又可以派上用场了

	$('div.label').click(function () {
		var paraWidth = $('div.speech p').outerWidth();
		var $switcher = $(this).parent();
		var $switcherWidth = $switcher.outerWidth();
		$switcher
			.css({position: 'relative'})
			.fadeTo('fast', 0.5)
			.animate({
				left: paraWidth - $switcherWidth
			}, {
				duration: 'slow',
				queue: false 	
				// 第2种形式中参数包含了queue选项，
				// 把选项设置为false即可让当前动画与前一个动画同时开始
			})
			.fadeTo('slow', 1)
			.slideUp('slow')
			.slideDown('slow');
		// 连缀，逐层进行

	});*/

	/*// 2. 手工队列
	// 有关为一组元素应用排队效果的最后一个需要注意的问题，就是排队不能自动应用到其他的
	// 非效果方法，如.css()。下面，假设我们想在.slideUp()执行后但在.slideDown()执行前，
	// 把<div id="switcher">的背景颜色修改为红色。
	
	$('div.label').click(function () {
		var paraWidth = $('div.speech p').outerWidth();
		var $switcher = $(this).parent();
		var $switcherWidth = $switcher.outerWidth();
		$switcher
			.css({position: 'relative'})
			.fadeTo('fast', 0.5)
			.animate({
				left: paraWidth - $switcherWidth
			}, {
				duration: 'slow',
				queue: false 	
				// 第2种形式中参数包含了queue选项，
				// 把选项设置为false即可让当前动画与前一个动画同时开始
			})
			.fadeTo('slow', 1)
			.slideUp('slow')
			// .css({backgroundColor: '#f00'})	// 使用.css()方法一旦点击就会直接执行
			.queue(function (next) {
				$switcher.css({backgroundColor: '#f00'});
				next();
			})	//.queue()可以实现在.slideUp()执行后但在.slideDown()执行前，
				// 把<div id="switcher">的背景颜色修改为红色。
			.slideDown('slow');
		// 连缀，逐层进行
		
		// 传递一个回调函数，.queue()方法可以把函数添加到相应元素的效果队列中
		// 在以上代码中，把背景颜色设置为红色，然后调用next()方法，
		// 其返回的结果作为参数传给回调函数
		// 添加的next()方法可以让队列在中断的地方再接续起来，然后再与后续的.slideDown('slow')连缀在一起，
		// 如果不适用next()方法，动画就会中断。
	});*/


	/*// 代码为了证明什么同时发生？
	$('p').eq(2)
		.css({'border': '1px solid #333'})
		.click(function () {
			// $(this).slideUp('slow').next().slideDown('slow');
				// $(this).slideUp('slow').slideDown('slow');
				// $(this).slideUp('slow').next();
			
			// 等同于一下代码
			$(this).slideUp('slow');
			
			$(this).next().slideDown('slow');	
			
			// console.log($(this).next().html() == $('p').eq(3).html());
			// true
			// console.log($(this).next() == $('p').eq(3));
			// false
			
			// console.log($(this).next()); 
			// [p, prevObject: r.fn.init(1)]
			// console.log($('p').eq(3));
			// [p, prevObject: r.fn.init(4)]
		});
	$('p').eq(3).css({'backgroundColor': '#ccc'}).hide();
	// 为第三段添加click处理程序，以便单击它时会将第3段向上滑（最终滑出视图），
	// 同时将第4段向下滑（最终滑入视图）
	// .next()实现调到下一个动作，连缀的动作接驳到下一个容器
	*/


	/*// 点击让第4段落.slideDown()，之后发生第3段落.slideUp() 
	
	$('p').eq(2)
		.css('border', '1px solid #333')
		.click(function () {
			// $(this).next().slideDown('slow', function() {
			// 	$(this).slideUp('slow');
			// 	// 这里的this，因为在$(this).next().slideDown('slow', 
			// 	// function())参数func当中，已经是指向$('p').eq('2')的下一个同辈元素，即$('p').eq(3)
			// });

			// 可靠的使用$(this)，就是将$(this)放到一个变量中
			var $clickedItem = $(this);
			$clickedItem.next().slideDown('slow', function() {
				$clickedItem.slideUp('slow');
			});
		});
	$('p').eq(3).css('backgroundColor', '#ccc').hide();*/

	$('div.label').click(function () {
		var paraWidth = $('div.speech p').outerWidth();
		var $switcher = $(this).parent();
		var switcherWidth = $switcher.outerWidth();
		$switcher
			.css({position: 'relative'})
			.fadeTo('fast', .5)
			.animate({
				left: paraWidth - switcherWidth
			},{
				duration: 'slow',
				queue: false
			})
			.fadeTo('slow', 1)
			.slideUp('slow', function () {
				$switcher.css('background-color', '#f00');
			})	// 以slideUp('slow', callback)的回调函数替代.queue()，实现同样的效果
			// 在.slideDown('slow')的同时，发生.css('background-color', '#f00');
			// 不用.queue()，不必使用next()
			.slideDown('slow');
	});


// 4.5.3 简单概括
// 随着在应用效果时需要考虑的变化的增多，要记住这些效果是同时发生还是按顺序发生会变
// 得越来越困难。因此，下面简单的概括可能会对你有所帮助。
// (1) 一组元素上的效果：
//  当在一个.animate()方法中以多个属性的方式应用时，是同时发生的；
//  当以方法连缀的形式应用时，是按顺序发生的（排队效果）——除非queue选项值为false。
// (2) 多组元素上的效果：
//  默认情况下是同时发生的；
//  当在另一个效果方法或者在.queue()方法的回调函数中应用时，是按顺序发生的（排队效果）。


















});