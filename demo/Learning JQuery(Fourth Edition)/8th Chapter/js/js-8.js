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

;(function ($) {
	$.fn.swapClass = function (class1, class2) {
		if (this.hasClasss(class1)) {
			this.removeClass(class1).addClass(class2);
		}
		else if (this.hasClasss(class2)) {
			this.removeClass(class2).addClass(class1);
		}
	}
})(jQuery);

$(document).ready(function () {
	$('table').click(function () {
		$('tr').swapClass('one', 'two');
	});
});
























































