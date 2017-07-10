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


// 使用jQuery UI 部件工厂创建插件
// jQueryUI库的核心包含了一个工厂方法，叫$.widget()，这个方法能帮我们做很多事情。使用这个方
// 法可以确保我们的代码达到所有jQuery UI部件用户认可的API标准。


// 使用部件工厂创建的插件具有很多不错的特性。只要编写少量代码，就可以额外获得这些功
// 能（甚至更多）：
// (1) 插件具有了“状态”，可以检测、修改甚至在应用之后完全颠覆插件的原始效果；
// (2) 自动将用户提供的选项与定制的选项合并到一起；
// (3) 多个插件方法无缝组合为一个jQuery方法，这个方法接受一个表明要调用哪个子方法的
// 字符串；
// (4) 插件触发的自定义事件处理程序可以访问部件实例的数据。
// 事实上，鉴于这些功能如此诱人，在构建任何适当的（无论与UI有关还是无关的）复杂插件
// 时，谁都希望使用部件工厂方法。

// 每次调用$.widget()都会通过部件工厂创建一个jQuery UI插件。这个函数接受部件的名称
// 和一个包含部件属性的对象作为参数。部件名称必须带命名空间，在这里我们使用ljq作为命名
// 空间，使用tooltip作为插件名称。这样，在jQuery项目中就可以通过.tooltip()调用我们这
// 个插件了。

// 创建_create属性
// 这个属性是一个函数，每当jQuery对象中每个匹配的元素调用.tooltip()时，部件工厂就
// 会调用它。
;(function ($) {
	$.widget('ljq.tooltip', {
		// 默认设置
		options: {
			offsetX: 10,
			offsetY: 10,
			content: function () {
				return $(this).data('tooltip-text');
			}
		},
		// 私有方法
		_create: function () {
			this._tooltipDiv = $('<div></div>')
				.addClass('ljq-tooltip-text ' + 
					'ui-widget ui-state-highlight ui-corner-all')
				.hide().appendTo('body');
			
			this.element
				.addClass('ljq.tooltip-trigger')
				.on('mouseenter.ljq-tooltip',
					$.proxy(this._open, this))	// 把处理程序传递给$.proxy()函数
				.on('mouseleave.ljq.tooltip', 	// $.proxy()会修改方法中this的指向，
					$.proxy(this._close, this)); // 因此才能在._open函数中引用部件的实例
		},

		// 子方法是destroy，调用.tooltip('destroy')可以从页面中删除提示条部件
		destroy: function () {
			// 撤销之前所做的修改
			this._tooltipDiv.remove();
			this.element
				.removeClass('ljq-tooltip-trigger')
				.off('.ljq-tooltip');
			// 调用保存在原型对象中的destroy自动完成清理工作
			$.Widget.prototype.destroy.apply(this, arguments);
		},
		// 私有方法
		_open: function() {
			// 通过在options传递nable和disable进行部件的禁用和启用
			// 方法是将this.options.disabled的值设置为true或false
			if (!this.options.disabled) {
				var elementOffset = this.element.offset();
				this._tooltipDiv.css({
					position: 'absolute',
					left: elementOffset.left + this.options.offsetX,
					top: elementOffset.top + this.element.height() + this.options.offsetY
				}).text(this.options.content.call(this.element[0]));

				this._tooltipDiv.show();

				// 在一个函数中调用this._trigger()可以让代码监听新的自定义事件。
				// 事件名字会加上部件名作为前缀，因而不必担心它会与其他事件冲突。因为这里在提示条的_open函数中调用了
				// this._trigger('open')，那么每次打开提示条的时候都会分派tooltipopen事件。而在这
				// 个元素上调用.on('tooltipopen')可以监听这个事件。
				this._trigger('open');
			}				
		},
		// 私有方法
		_close: function () {
			this._tooltipDiv.hide();
		},
		// 添加子方法
		// 公有方法
		// 现在就可以使用.tooltip('open')来打开
		// 提示条，使用.tooltip('close')来关闭提示条了。
		open: function () {
			this._open();
		},
		close: function () {
			this._close();

			// 在一个函数中调用this._trigger()可以让代码监听新的自定义事件。
			this._trigger('close');
		}
	});
})(jQuery);

// 

$(function () {
	$('a').tooltip();
});

// 插件设计建议

// 下面我们就列出前面介绍过的和一些未介绍过的插件设计建议。

// 为避免$别名与其他库发生冲突，可以使用jQuery，或者在立即调用的函数表达式（IIFE）
// 中传入$，使其成为一个局部变量。
//  无论是以$.myPlugin的方式扩展jQuery，还是以$.fn.myPlugin的方式扩展jQuery的原
// 型，给$命名空间添加的属性都不要超过一个。更多的公有方法和属性应该添加到插件的
// 命名空间中（例如，$.myPlugin.publicMethod或$.fn.myPlugin.plugin Property）。
//  别忘了为插件提供一个默认选项的对象： $.fn.myPlugin.defaults = {size:
// 'large'}。
//  要允许插件用户有选择地覆盖任何默认选项，包括影响后续方法的调用($.fn.myPlugin.
// defaults.size = 'medium';）和单独调用（$('div').myPlugin ({size: 'small'});）。
//  多数情况下，扩展jQuery原型时（$.fn.myPlugin）要返回this，以便插件用户通过连
// 缀语法调用其他jQuery方法（如$('div').myPlugin().find('p').addClass('foo')）。
//  在扩展jQuery原型时（$.fn.myPlugin），通过调用this.each()强制执行隐式迭代。
//  合适的时候，利用回调函数支持灵活地修改插件行为，从而不必修改插件代码。
//  如果插件是为了实现用户界面元素，或者需要跟踪元素的状态，使用jQuery UI部件工厂
// 来创建。
//  利用QUnit等测试框架为自己的插件维护一组自动的单元测试，以确保插件能够按预期工
// 作。有关QUnit的更多信息，请参考附录B。
//  使用Git或其他版本控制系统跟踪代码的版本。可以考虑把插件公开托管到Github
// （http://github.com）上，以便其他人帮你改进。
//  在把自己的插件提供给别人使用时，务必明确许可条款。建议考虑使用MIT许可，这也是
// jQuery使用的许可。


// 按照上面所述准备好插件的代码，还应该在分发插件之前，给它配上完整的文档。可以
// 选择一种恰当的文档格式，也可以利用现有的文档标准，例如JSDoc（http://www.usejsdoc.org/）。
// 另外，还有doco（http://jashkenas.github.io/docco/）和dox（https://github.com/visionmedia/dox）等
// 可以自动生成文档的工具。不过，这些工具有赖于Node.js等的安装配置，要求相对高一些。无
// 论最终采用什么格式，都要保证把与插件的方法相关的每一个参数、每一个选项都说清楚。












