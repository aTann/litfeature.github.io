
/*----------------------------------------
 
 事件

 -----------------------------------------*/

// 页面加载后执行任务

// window.onload()：文档完全下载到浏览器中时，会触发window.onload()事件。
// 					意味着页面上的全部元素对JavaScript是可以操作，这种对编写功能性代码非常有利，，因为无需考虑加载的次序。

// $(document).ready()：注册的事件处理程序，则会在DOM完全就绪并可以使用时调用
// 					意味着所有元素对脚本而言都是可以访问，但是并不是全部的关联性的文件都已经下载完毕
// 					当HTML下载完成并解析DOM树之后，代码就可以远行了

// 加载样式与执行代码
// 为了保证JavaScript代码执行以前页面已经应用了样式，最好是在<head>
// 元素中把<link rel="stylesheet">标签和<style>标签放在<script>标
// 签前面。

// 引用函数与调用函数
// 这里在将函数指定为处理程序时，省略了后面的圆括号，只使用了函数名。
// 如果带着圆括号，函数会被立即调用；没有圆括号，函数名就只是函数的标识
// 符或函数引用，可以用于在将来再调用函数。



// 当jQuery和其他库文件发生$公用冲突时候，
// 可以使用jQuery.noConflict()；进行解除冲突，
// 冲突发生有这样的条件，其他库在jQuery前定义，
// 如果其他库在jQuery在之后定义，继续使用jQuery的$也是可以
// <script src="prototype.js"></script>
// <script src="jquery.js"></script>

// 在jQuery(document).ready(function(){})当中不会发生同用冲突
// 	或jQuery(function(){})

// HTML中事件属性onload=''，onclick=''
// 事件与形式分类，结构与数据分离

// hook(挂钩)

// 利用.on()事件绑定
// $(document).ready(function () {
	
// 	// 大号字体
// 	$('#switcher-large').on('click', function () {
// 		$('body').removeClass('narrow');
// 		$('body').addClass('large');
// 	});

// 	// 恢复正常 
// 	$('#switcher-default').on('click', function () {
// 		$('body').removeClass('narrow');
// 		$('body').removeClass('large');
// 	});

// 	// 窄边显示
// 	$('#switcher-narrow').on('click', function () {
// 		$('body').removeClass('large');
// 		$('body').addClass('narrow');
// 	});


// });


// 添加.selected()
// $(document).ready(function () {
	
// 	// 大号字体
// 	$('#switcher-large')
// 		.on('click', function () {
// 			$('body').removeClass('narrow');
// 			$('#switcher button').removeClass('selected');
// 			$(this).addClass('selected');
// 			$('body').addClass('large');
// 		}
// 	);

// 	// 恢复正常 
// 	$('#switcher-default').addClass('selected')
// 		.on('click', function () {
// 			$('body').removeClass('narrow');
// 			$('#switcher button').removeClass('selected');
// 			$(this).addClass('selected');
// 			$('body').removeClass('large');
// 		}
// 	);

// 	// 窄边显示
// 	$('#switcher-narrow').on('click', function () {
// 		$('body').removeClass('large');
// 		$('#switcher button').removeClass('selected');
// 		$(this).addClass('selected');
// 		$('body').addClass('narrow');
// 	});


// });


// 利用事件处理程序的上下文 - 重构
// $(document).ready(function () {
	
// 	// 大号字体
// 	$('#switcher-large')
// 		.on('click', function () {
// 			$('body').removeClass('narrow');
// 			$('body').addClass('large');
// 	});

// 	// 恢复正常 
// 	$('#switcher-default').addClass('selected')
// 		.on('click', function () {
// 			$('body').removeClass('narrow');
// 			$('body').removeClass('large');
// 		});

// 	// 窄边显示
// 	$('#switcher-narrow').on('click', function () {
// 		$('body').removeClass('large');
// 		$('body').addClass('narrow');
// 	});

// 	$('#switcher button').on('click', function () {
// 		$('#switcher button').removeClass('selected');
// 		$(this).addClass('selected');
// 	});
// });



// 使用事件上下文进一步减少代码 - 重构
// $(document).ready(function () {
	
// 	// 大号字体
// 	$('#switcher-large')
// 		.on('click', function () {
// 			$('body').removeClass('narrow').addClass('large');
// 	});

// 	// 恢复正常 
// 	$('#switcher-default').addClass('selected')
// 		.on('click', function () {
// 			$('body').removeClass('narrow').removeClass('large');
// 	});

// 	// 窄边显示
// 	$('#switcher-narrow').on('click', function () {
// 		$('body').removeClass('large').addClass('narrow');
// 	});

// 	$('#switcher button').on('click', function () {
// 		$('#switcher button').removeClass('selected');
// 		$(this).addClass('selected');
// 	});
// });



// 使用事件上下文进一步减少代码 - 重构
// 必须把通用的处理程序转移到特殊的处理程序上方，因为.removeClass()需要先于.addClass()执行。
// 再次利用事件的执行上下文来完全消除特殊的处理程序。
// $(document).ready(function () {
// 	$('#switcher button').on('click', function () {
// 		$('#switcher button').removeClass('selected');
// 		$(this).addClass('selected');
// 		$('body').removeClass();  // 移除body其他的样式
// 	});

// 	// 大号字体
// 	$('#switcher-large')
// 		.on('click', function () {
// 			$('body').addClass('large');
// 	});

// 	// 恢复正常 
// 	$('#switcher-default').addClass('selected');

// 	// 窄边显示
// 	$('#switcher-narrow').on('click', function () {
// 		$('body').addClass('narrow');
// 	});
// });



// $(document).ready(function () {
// 	// 恢复正常 
// 	$('#switcher-default').addClass('selected');
// 	$('#switcher button').on('click', function () {
// 		var bodyClass = this.id.split('-')[1];
// 		$('body').removeClass().addClass(bodyClass);  // 移除body其他的样式
// 		$('#switcher button').removeClass('selected');
// 		$(this).addClass('selected');
// 	});
// });


// 简写的事件
$(document).ready(function () {

	// $('#switcher-default').addClass('selected');
	// $('#switcher button').click(function () {
	// 	var bodyClass = this.id.split('-')[1];
	// 	$('body').removeClass().addClass(bodyClass);  // 移除body其他的样式
	// 	$('#switcher button').removeClass('selected');
	// 	$(this).addClass('selected');
	// });


	// 显示和隐藏高级特性
	// $('#switcher h3').click(function () {
	// 	$('#switcher button').toggleClass('hidden');
	// })

	// 时间传播
	// .hover()方法接受两个函数参数。第一个函数会在鼠标
	// 指针进入被选择的元素时执行，而第二个函数会在鼠标指针离开该元素时触发。
	// 使用.hover()也意味着可以避免JavaScript中的事件传播（event propagation）导致的
	// 头痛问题。

	// 样式转换器启用鼠标悬停效果
/*	$('#switcher h3').hover(function () {
		$(this).addClass('hover');
	}, function () {
		$(this).removeClass('hover');
	});*/

});


// 允许多个元素响应单击事件的一种策略叫做事件捕获。
// 在事情捕获的过程中，事件首先会交给最外层的元素，接着交给更具体的元素


// 另一种相反的策略叫做事件冒泡。
// 即当事件发生时，会首先发送给最具体的元素，在这个元素获得相应的机会之后，事件会向上冒泡到更一般的元素。

// 最终出台的DOM标准规定应该同时使用这两种策略：首先，事件要从一般元素到具体元素逐层捕获，然后，事件
// 再通过冒泡返回DOM树的顶层。而事件处理程序可以注册到这个过程中的任何一个阶段。

// 为了确保跨浏览器的一致性，而且也为了让人容易理解，jQuery始终会在模型的冒泡阶段注
// 册事件处理程序。因此，我们总是可以假定最具体的元素会首先获得响应事件的机会。


// 单击button也会导致折叠样式转换器
// 会导致事件冒泡，
// 事件首先被按钮处理，然后又沿着DOM树向上传递，直至到<div id="switcher">激活事件处理程序并隐藏按钮
// $(document).ready(function () {
// 	$('#switcher').click(function (event) {
// 		$('#switcher button').toggleClass('hidden');
// 	});
// });

// 解决，必须访问事件对象。事件对象是一种DOM结构，它会在元素获得处理事件的机会时传递给被调用的事件处理程序。
// 这个对象中包含着事件有关的信息（例如事件发生时的鼠标指针位置），也提供了可以用来影响事件在DOM中传递进程的一些方法。 

// $(document).ready(function () {
// 	$('#switcher').click(function (event) {
// 		if (event.target == this) { // 确保了被单击的元素是div#sitcher，而不是其他后代元素
// 			$('#switcher button').toggleClass('hidden');
// 		}
// 		// console.log(event.target);
// 		// <div id="switcher" class="switcher">…</div>
// 	});

// });


// 停止事件传播
// $(document).ready(function () {
// 	$('#switcher').click(function (event) {
// 		$('#switcher button').toggleClass('hidden');
// 	});

// 	$('#switcher-default').addClass('selected');
// 	$('#switcher button').click(function (event) {
// 		var bodyClass = this.id.split('-')[1];
// 		$('body').removeClass().addClass(bodyClass);  // 移除body其他的样式
// 		$('#switcher button').removeClass('selected');
// 		$(this).addClass('selected');
		
// 		event.stopPropagation(); // 停止事件传播
// 	});
// });




// 同以前一样，需要为用作单击处理程序的函数添加一个参数，以便访问事件对象。然后，通
// 过调用event.stopPropagation()就可以避免其他所有DOM元素响应这个事件。这样一来，
// 单击按钮的事件会被按钮处理，而且只会被按钮处理。单击样式转换器的其他地方则可以折叠和
// 扩展整个区域。

// 当用户单击链接时，浏览器会加载一个新页面。这种行为与我们讨论的事件处理
// 程序不是同一个概念，它是单击锚元素的默认操作。

// 即便在事件对象上调用.stopPropagation()方法也不能禁止这种默认操作，因为默认操
// 作不是在正常的事件传播流中发生的。在这种情况下，.preventDefault()方法则可以在触发
// 默认操作之前终止事件。

// 事件传播和默认操作是相互独立的两套机制，在二者任何一方发生时，都可以终止另一方。
// 如果想要同时停止事件传播和默认操作，可以在事件处理程序中返回false，这是对在事件对象
// 上同时调用.stopPropagation()和.preventDefault()的一种简写方式。


// 事件委托：利用事件冒泡的一向高级技术。

$(document).ready(function () {
	// $('#switcher-default').addClass('selected');

	// $('#switcher').click(function (event) {
	// 	if ($(event.target).is('button')) {
	// 		var bodyClass = event.target.id.split('-')[1];
	// 		$('body').removeClass().addClass(bodyClass);
	// 		$('#switcher button').removeClass('selected');
	// 		$(event.target).addClass('selected');
	// 		event.stopPropagation();
	// 	} else {
	// 		$('#switcher button').toggleClass('hidden');
	// 	}
	// });


	// 使用内置的事件委托功能
	// jQuery中.on()
	// $('#switcher').on('click', 'button', function () {
	// 	var bodyClass = event.target.id.split('-')[1];
	// 	$('body').removeClass().addClass(bodyClass);
	// 	$('#switcher button').removeClass('selected');
	// 	$(event.target).addClass('selected');
	// });

	// 移除事件处理程序
	// 1、停用以前注册的事件处理程序。
	// 2、页面的状态发生变化，导致相应的操作不再有必要。
	// 典型做法：在事件处理程序中使用条件语句，但更有效的是完全移除处理程序绑定显然更有效率

	// 在单击非默认样式转换按钮转换时，调用.off()方法移除折叠处理程序
	// $('#switcher').click(function (event) {
	// 	if (!$(event.target).is('button')) {
	// 		$('#switcher button').toggleClass('hidden');
	// 	}
	// });

	// 移除处理程序
	// $('#switcher-narrow, #switcher-large').click(function () {
	// 	$('#switcher').off('click');
	// });

	// 为事件处理程序添加命名空间
	// 事件命名空间：在绑定事件时引入附加信息，以便将来识别特定的处理程序。
	// 要使用命名空间，需要退一步使用绑定事件处理程序的非简写方法，即.on()方法本身
	
/*	$('#switcher').on('click.collapse', function (event) {
		if (!$(event.target).is('button')) {
			$('#switcher button').toggleClass('hidden');
		}
	});

	$('#switcher-narrow, #switcher-large').click(function () {
		$('#switcher').off('click.collapse');
	});*/
	// 对于事件处理系统而言，后缀.collapse是不可见的。其实还是与.on('click')一样，
	// 但是添加了附加的命名空间信息，则可以解除对这个特定处理程序的绑定，同时不影响为按钮注册的其他单击处理程序。
	

	// 重新绑定事件
	// 为事件处理程序起个名字，以便多次使用
	
	// 样式转换器能够扩展和折叠
/*	var toggleSwitcher = function(event){  // 将一个匿名函数表达式指定给了一个局部变量。
		if (!$(event.target).is('button')) {
			$('#switcher button').toggleClass('hidden');
		}
	};

	$('#switcher').on('click.collapse', toggleSwitcher);*/

	// 我们知道传递给.on()的第二个参数是一个函数引用。在此需要强调一点，使用命名
	// 函数时，必须省略函数名称后面的圆括号。圆括号会导致函数被调用，而非被引用。

/*	$('#switcher-narrow, #switcher-large').click(function(){
		$('#switcher')
			.off('click.collapse');
	});

	$('#switcher-default').click(function () {
		$('#switcher')
			.on('click.collapse', toggleSwitcher);
	});*/

/*	$('#switcher button').click(function () {
		$('#switcher').off('click', toggleSwitcher);
		if (this.id == 'switcher-default') {
			$('#switcher').on('click', toggleSwitcher);
		}
	});*/

	// 对于只需触发一次，随后要立即解除绑定的情况也有一种简写方法——.one()，这个简写方法的用法如下：
		// $('#switcher').one('click', toggleSwitcher);
	// 这样会使切换操作只发生一次，之后就再也不会发生。


	// 模仿用户操作
	// 通过.trigger()方法就可以完成模拟事件的操作。
	
	// 页面加载完成，模拟一次点击，样式转换器也被折叠起来
	// $('#switcher').trigger('click');
	
	// 如果我们想向禁用JavaScript的用户隐藏一些内容，以实现优雅降级，那么这就是一种非常合适的方式。
	// 就是一开始就没有这个功能

	// 响应键盘事件
	// 向样式转换器中添加键盘快捷方式。当用户输入每种显示样式
	// 的第一个字母时，可以让页面像响应按钮被单击一样作出响应。要实现这种功能，需要先了解键
	// 盘事件，键盘事件与鼠标事件稍有不同。

	// 键盘事件可以分为两类：直接对键盘按键给出响应的事件（keyup和keydown）和对文本输入给出响应的事件（keypress）
	// 对键盘按键给出响应的事件（keyup和keydown）：如果想知道用户按了哪个键，应该侦听keyup或keydown事件；
	// 对文本输入给出响应的事件（keypress）：如果想知道用户输入的是什么字符(还没有知道按哪个键)，应该侦听keypress事件。
	
	// 这种技术确实有利于消除冗余代码
	// var triggers = {
	// 	D: 'default',
	// 	N: 'narrow',
	// 	L: 'large'
	// };

	// $(document).keyup(function (event) {
	// 	var key = String.fromCharCode(event.which);
	// 	if (key in triggers) {
	// 		$('#switcher-' + triggers[key]).click();
	// 	}
	// });


});



// is()与.hasClass()
// 要测试元素是否包含某个类，也可以使用另一个简写方法.hasClass()。
// 不过，.is()方法则更灵活一些，它可以测试任何选择符表达式。


$(document).ready(function () {
	
	// 样式转换器启用鼠标悬停效果
	$('#switcher h3').hover(function () {
		$(this).addClass('hover');
	}, function () {
		$(this).removeClass('hover');
	});

	// 样式转换器能够扩展和折叠
	var toggleSwitcher = function(event){  // 将一个匿名函数表达式指定给了一个局部变量。
		if (!$(event.target).is('button')) {
			$('#switcher button').toggleClass('hidden');
		}
	};

	$('#switcher').on('click.collapse', toggleSwitcher);

	// 页面加载完成，模拟一次点击，样式转换器也被折叠起来
	$('#switcher').trigger('click');

	// 样式转换器的状态也会被更新
	var setBodyClass = function(className){
		$('body').removeClass().addClass(className);
		$('#switcher button').removeClass('selected');
		$('#switcher-' + className).addClass('selected');
		$('#switcher').off('click', toggleSwitcher);
		if(className == 'default') {
			$('#switcher').on('click', toggleSwitcher);
		}
	};

	
	// 开始时候先选择default
	$('#switcher-default').addClass('selected');
	
	// 当按键被单击时调用setBodyClass
	$('#switcher').click(function (event) {
		if ($(event.target).is('button')) {
			var bodyClass = event.target.id.split('-')[1];
			setBodyClass(bodyClass);
		}
	});

	
	// 映射键码和对应的按钮
	var triggers = {
		D: 'default',
		N: 'narrow',
		L: 'large'
	};

	// 按下相应按键时调用setBodyClass()
	$(document).keyup(function (event) {
		var key = String.fromCharCode(event.which);
		if (key in triggers) {
			setBodyClass(triggers[key]);
		}
	});

});

window.onload = function() {
	var ii = document.getElementById('header');
	console.log(ii.GetProperty);
	var d = '1234';
	console.log(typeof(d));
}








































