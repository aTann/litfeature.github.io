// 开发插件


// 在jQuery命名空间中添加新的全局函数；
// 添加新的jQuery方法，以操作DOM元素；
// 使用jQuery UI插件工厂创建完善的插件；
// 对外发布完工的插件。


// 在插件中使用$别名
// $.noConflict()方法就是用于让渡这个快捷方式使用权的。
// 对于代码比较长的插件来说，很多开发人员都觉得不能使用$别名会导致代码难以理解。
// 为了解决这个问题，我们可以在插件的作用域内定义这个快捷方式，方法就是定义一个函数并马上
// 调用它。这种定义并立即调用函数的语法通常被称为立即调用的函数表达式（IIFE，Immediately
// Invoked Function Expression）：
// (function($) {
// //在这里添加代码
// })(jQuery);
// 这个包装函数只接收一个参数，我们通过这个参数传入了jQuery对象。这个参数的名字是$，
// 因此在这个函数内部，使用$别名就不会有冲突了。


// 全局函数： jQuery内置的某些功能通过全局函数提供，jQuery对象方法，jQuery命名空间函数
// 核心jQuery库提供的很多全局函数都是实用方法；所谓实用方法，就是一些常用功能的快捷
// 方式，但即使手工编写同样功能的代码也不是很难。

// 要向jQuery的命名空间中添加一个函数，只需将这个新函数指定为jQuery对象的一个属性

/*(function ($) {
	$.sum = function(array){
		var total = 0;
		$.each(array, function(index, value){
			value = $.trim(value);
			value = parseFloat(value) || 0;

			total += value;
		});

		return total;
	};

	$.average = function (array) {
		if($.isArray(array)) {
			return $.sum(array) / array.length;
		}

		return '';
	};
})(jQuery);*/


// 1、扩展全局jQuery对象
// 利用$.extend()函数，还可以通过另外一种语法来定义全局函数

/*(function ($) {
	$.extend({
		sum: function (array) {
			var total = 0;
			$.each(array, function(index, value){
				value = $.trim(value);
				value = parseFloat(value) || 0;

				total += value;
			});

			return total;	
		},

		average: function (array) {
			if($.isArray(array)) {
				return $.sum(array) / array.length;
			}

			return '';
		}

	});
})(jQuery);*/


// 2、使用命名空间隔离函数
(function ($) {
	$.mathUtils = {
		sum: function (array) {
			var total = 0;
			$.each(array, function(index, value){
				value = $.trim(value);
				value = parseFloat(value) || 0;

				total += value;
			});

			return total;
		},

		average: function (array) {
			if($.isArray(array)) {
				return $.mathUtils.sum(array) / array.length;

			}

			return '';
		}
	}
})(jQuery);

$(function () {
	/*var $quantity = $('#inventory tbody td:nth-child(2n)');
	var $quantitylist = new Array(3);
	// var $quantitylist = [];
	$.each($quantity, function (index, value) {
		$quantitylist[index] = $(value).text();
		// console.log($(value).text());
	});
	// console.log($quantitylist);
	var sum = $.sum($quantitylist);
	$('#sum td:nth-child(2)').text(sum);*/

	var $inventory = $('#inventory tbody');
	var quantities = $inventory.find('td:nth-child(2)')
		.map(function (index, qty) {
			return $(qty).text();
		}).get();
	var sum = $.mathUtils.sum(quantities);
	$('#sum').find('td:nth-child(2)').text(sum);

	var prices = $inventory.find('td:nth-child(3)')
		.map(function (index, qty) {
			return $(qty).text();
		}).get();
	var average = $.mathUtils.average(prices);
	$('#average').find('td:nth-child(3)').text(average.toFixed(2));

});



// 添加jQuery对象方法

// 对象方法的上下文

// 在任何插件方法内部，关键字this引用的都是当前的jQuery对象。因而，可以在this上面
// 调用任何内置的jQuery方法，或者提取它包含的DOM节点并操作该节点。为了确定可以怎样利用
// 对象的上下文，下面我们来编写一个小插件，用以操作匹配元素的类。

// 这个新方法接受两个类名，每次调用更换应用于每个元素的类。尽管jQuery UI有一个健壮
// 的.switchClass()方法，甚至该方法都支持以动画方式切换类，但为了演示需要，我们还是自
// 己再来写一个吧，参见代码

/*// 首先，测试每个匹配的元素是否已经应用了class1，如果是，则将该类替换成class2。然
// 后，再测试class2并在必要时替换成class1。如果两个类都不存在，则什么也不做。
;(function ($) {
	$.fn.swapClass = function (class1, class2) {
		// console.log(this);  // (6) [tr.one, tr#sum.two, tr#average, tr, tr, tr, prevObject: r.fn.init(1)]
		if (this.hasClass(class1)) {
			this.removeClass(class1).addClass(class2);
		}
		else if (this.hasClass(class2)) {
			this.removeClass(class2).addClass(class1);
		}
	}
})(jQuery);

// 表格绑定click处理程序，当单击表格时在每一行上都调用.swapClass()
// 目的：把表头行的类one切换成two，把合计行的类two切换成one
$(document).ready(function () {
	$('table').click(function () {
		$('tr').swapClass('one', 'two');
		// console.log(111);
	});
});
// 结果是每一行都应用了two类。为了纠正这个问题，需要基于多次选择的元素来正确地处理
// jQuery对象。*/


// 隐式迭代
// 要在无论匹配多个元素的情况下都保证行为正确，
// 最简单的方式就是始终在方法上下文上调用.each()方法；
// 这样就会执行隐式迭代，而执行隐式迭代对于维护插件与内置方法的一致性是至关重要的。

// 在调用的.each()方法内部，this依次引用每个DOM元素，因此可以调整代码依次检测每个匹配的元素，
// 并为他们应用相应的类

;(function ($) {
	$.fn.swapClass = function (class1, class2) {
		// 在对象方法体内，关键字this引用的是一个JQuery对象，
		// 但在每次调用的.each()，this应用的则是一个DOM元素
		// console.log(this);  // (6) [tr.one, tr#sum.two, tr#average, tr, tr, tr, prevObject: r.fn.init(1)]
		// this === $('tr')
		
		// 隐式迭代
		/*this.each(function () {
			// console.log(this);  // 其他一个<tr>元素
			var $element = $(this);
			if ($element.hasClass(class1)) {
				$element.removeClass(class1).addClass(class2);
			}
			else if ($element.hasClass(class2)) {
				$element.removeClass(class2).addClass(class1);
			}
		});*/

		// 方法连缀
		return this.each(function () {
			var $element = $(this);
			if ($element.hasClass(class1)) {
				$element.removeClass(class1).addClass(class2);
			}
			else  if ($element.hasClass(class2)) {
				 $element.removeClass(class2).addClass(class1);
			}
		});
	}
})(jQuery);

$(document).ready(function () {
	$('table').click(function () {
		$('tr').swapClass('one', 'two');
		// console.log(111);
	});
});


// 提供灵活的方法参数
// 
// 创建一些部分透明的元素，然后把它们相继排列在页面的不同位置上

/*;(function ($) {
	$.fn.shadow = function () {
		return this.each(function () {
			var $originalElement = $(this);
			for (var i = 0; i < 5; i++) {
				$originalElement
					.clone()
					.css({
						position: 'absolute',
						left: $originalElement.offset().left + i,
						top: $originalElement.offset().top + i,
						margin: 0,
						zIndex: -1,
						opacity: 0.1

					})
					.appendTo('body');

			}
		});
	}
})(jQuery);

$(document).ready(function () {
	$('h1').shadow({
		copies: 3,
		opacity: 0.25
	});
});*/


// 参数对数

// 作为一种向插件用户公开选项的方式，对象要比刚刚使用的参数列表更加友
// 好。对象会为每个参数提供一个有意义的标签，同时也会让参数次序变得无关紧要。而且，
// 只要有可能通过插件来模仿jQuery API，就应该使用对象来提高一致性和易用性

/*;(function ($) {
	$.fn.shadow = function (options) {
		return this.each(function () {
			var $originalElement = $(this);
			for (var i = 0; i < options.copies; i++) {
				$originalElement
					.clone()
					.css({
						position: 'absolute',
						left: $originalElement.offset().left + i,
						top: $originalElement.offset().top + i,
						margin: 0,
						zIndex: -1,
						opacity: options.opacity
					})
					.appendTo('body');
			}
		});
	}
})(jQuery);


$(document).ready(function () {
	$('h1').shadow({
		copies: 3,
		opacity: 0.25
	});
});*/


// 添加默认值
/*;(function ($) {
	$.fn.shadow = function (opts) {
		// 新对象 承载默认参数
		var defaults = {
			copies: 5,
			opacity: 0.1
		};
		// 实用函数$.extend()
		// 可以用接受的opts对象参数覆盖defaults中的选项，并保持选项对象中未指定的默认项
		// 不变。
		var options = $.extend(defaults, opts);

		return this.each(function () {
			var $originalElement = $(this);
			for (var i = 0; i < options.copies; i++) {
				$originalElement
					.clone()
					.css({
						position: 'absolute',
						left: $originalElement.offset().left + i,
						top: $originalElement.offset().top + i,
						margin: 0,
						zIndex: -1,
						opacity: options.opacity
					})
					.appendTo('body');
			}
		});
	}
})(jQuery);


$(document).ready(function () {
	// $('h1').shadow({
	// 	copies: 3,
	// 	opacity: 0.25
	// });
	$('h1').shadow();
});*/

// 回调函数

// 在各种jQuery API中经常可以看到另一种参数类型，即回调函数。回调函数可以极大地增加插件的灵活性，但却用不着在创
// 建插件时多编写多少代码。

// 要在方法中使用回调函数，需要接受一个函数对象作为参数，然后在方法中适当的位置上调
// 用该函数。例如，可以扩展前面定义的文本投影方法，让用户能够自定义投影相对于文本的位置

/*;(function ($) {
	$.fn.shadow = function (opts) {
		// 新对象 承载默认参数
		var defaults = {
			copies: 5,
			opacity: 0.1,
			copyOffset: function (index) {
				return {x: index, y: index}
			}
		};
		// 实用函数$.extend()
		// 可以用接受的opts对象参数覆盖defaults中的选项，并保持选项对象中未指定的默认项
		// 不变。
		var options = $.extend(defaults, opts);

		return this.each(function () {
			var $originalElement = $(this);
			for (var i = 0; i < options.copies; i++) {
				var offset = options.copyOffset(i);
				$originalElement
					.clone()
					.css({
						position: 'absolute',
						left: $originalElement.offset().left + offset.x,
						top: $originalElement.offset().top + offset.y,
						margin: 0,
						zIndex: -1,
						opacity: options.opacity
					})
					.appendTo('body');
			}
		});
	}
})(jQuery);


$(document).ready(function () {
	// $('h1').shadow({
	// 	copies: 3,
	// 	opacity: 0.25
	// });
	$('h1').shadow({
		copyOffset: function (index) {
			return {x: -index, y: -2 * index};
		}
	});
});
*/


// 可定制的默认值


;(function ($) {
	$.fn.shadow = function (opts) {
		
		// 实用函数$.extend()
		// 可以用接受的opts对象参数覆盖defaults中的选项，并保持选项对象中未指定的默认项
		// 不变。
		// 
		// 而对$.extend()的调用也必须修改，以适应这种变化。由于现在所有对.shadow()的调用都要重
		// 用defaults对象，因此不能让$.extend()修改它。我们就在此将一个空对象（{}）作为
		// $.extend()的第一个参数，让这个新对象成为被修改的目标。
		var options = $.extend({}, $.fn.shadow.defaults, opts);

		return this.each(function () {
			var $originalElement = $(this);
			for (var i = 0; i < options.copies; i++) {
				var offset = options.copyOffset(i);
				$originalElement
					.clone()
					.css({
						position: 'absolute',
						left: $originalElement.offset().left + offset.x,
						top: $originalElement.offset().top + offset.y,
						margin: 0,
						zIndex: -1,
						opacity: options.opacity
					})
					.appendTo('body');
			}
		});
	};

	// 新对象 承载默认参数
	// 默认值被放在了投影插件的命名空间里，可以通过$.fn.shadow.defaults直接引用。
	$.fn.shadow.defaults = {
		copies: 5,
		opacity: 0.1,
		copyOffset: function (index) {
			return {x: index, y: index}
		}
	};

})(jQuery);


$(document).ready(function () {
	// $('h1').shadow({
	// 	copies: 3,
	// 	opacity: 0.25
	// });
	$.fn.shadow.defaults.copies = 10;
	$('h1').shadow({
		copyOffset: function (index) {
			return {x: -index, y: index};
		}
	});
});





























