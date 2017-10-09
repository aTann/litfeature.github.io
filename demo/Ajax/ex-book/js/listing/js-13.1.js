

// http://api.jquery.com/


// http://book.learningjquery.com/api/   jsonp

/*
$(document).ready(function () {
	
	// 获取主要操作目标的节点
	var $ajaxForm = $('#ajax-form'),
		$response = $('#response');

	// 使用.load()获取页面主要内容
	$ajaxForm.on('submit', function (event) {
		event.preventDefault();
		$response.load('http://api.jquery.com/ #content', $ajaxForm.serialize());
		// 已拦截跨源请求：同源策略禁止读取位于 http://api.jquery.com/?s= 的远程资源。（原因：CORS 头缺少 'Access-Control-Allow-Origin'）。
	});
});
*/

$(function () {
	// 获取主要操作目标节点
	var $ajaxForm = $('#ajax-form'),
		$response = $('#response'),
		noresults = 'There were no rearch result.',
		failed = 'Sorry, but the request could not' +
				'reach its destination. Try again later.';

		$response.addClass('loading').empty();

	// buildItem辅助函数，创建HTML代码结构
	var buildItem = function (item) {
		var title = item.name,	// 该输出项搜索名称
		args = [], // 存放搜索项细分的jQuery版本号
		output = '<li>';	// 输出HTML代码格式

		// 该方法是method/!item.type(无登记黑户)还是selector
		if (item.type == 'method' || !item.type) {
			// 添加该函数方法的jQuery版本号
			if (item.signnatures[0].params) {
				$.each(item.signnatures[0].params, function () {
					args.push(val.name);
				});
			}

			// 验证title是否带JQuery，如不带，则添加
			title = (/^jQuery|deferrde/).test(title) ? title: '.' + title;
			title += '(' + args.join(', ') + ')';
		} else if(item.type == 'selector')
		{
			title += ' selector';
		}
		output += "<h3><a href='" + item.url + "'>" + title + "</a></h3>";
		output += "<div>" + item.desc + "</div>";
		output += "</li>";

		// 返回，构建好的HTML代码
		return output;
	};

	// 回应报文处理函数
	var response = function(json) {
		
		var output = '';

		// 分类情况输出
		// 有结果和没有结果
		if (json && json.length) {
			output += '<ol>';
			$.each(json, function(index, val){
				output += buildItem(val);
			});
			output += '</ol>';
		}else {
			output += noresults;
		}
		// 添加到相应位置
		$response.html(output);
	};

	// 单击提交
	/*
	$ajaxForm.on('submit', function (event) {
		event.preventDefault();
		$.ajax({
			url: 'http://book.learningjquery.com/api/',
			dataTypes: 'jsonp',
			crossDomain: true,
			async: true,
			data: {
				title: $('#title').val()
			},
			// 限定超时时间，表明数据可以正常加载，但是服务器回应超时了，常配合.abort()中断通信一起用
			timeout: 15000, 
			

			// 将作为$.ajax作为参数的success+error 替换为链接的函数.done() + .fail()
			//成功返回
			// success: response,	// 因为同源策略(Same-origin policy)的原因，无法直接实验该效果			
			// AJAX通信异常/错误处理
			//error: function () {
			//	$response.html($response);
			//}

		})
		// 使用链接函数（承诺函数）替换：
		// 1、可以多次调用，添加多个处理程序
		// 2、增加代码的扩展性和可读性性
		// 3、Ajax操作已完成，就会立即调用该处理程序
		.done(response)
		.fail(function () {
			$response.html($response);
		})
		.always(function () {
			$response.removeClass('loading');
			// ajax通信前添加loading，加载完成后删除loading增加用户体验
		});
	}); */

	// api变量存放创建的jqXHR对象的信息，
	// 这个变量本身是一个对象，它的键对应着执行的搜索关键词。提交表单时，检查jqXHR对象中是否有那个键。

	// 实现：如果以前没有查询过，那么可以会发送Ajax请求，执行平常的Ajax通信
	// 		 如果执行过该查询，jqXHR对象已经保存在api里面，不需要再执行新的查询
	var api = {};
	$ajaxForm.on('submit', function(event){
		event.preventDefault();

		$response.empty();

		var title = $('#title').val(),
			category = $('#categories').find('li.active').text(),
			search = category + '-' + title;

		var search = $('#title').val();
		if(search == ''){
			return;
		};

		$response.addClass('loading');

		if (!api[search]) {
			api[search] = $.ajax({
				url: 'http://book.learningjquery.com/api/',
				dataType: 'jsonp',
				data: {
					title: search,
					category: category
				},
				timeout: 15000,
				jsonp: 'callback'
			});
		}

		api[search].done(response).fail(function () {
			$response.html(failed);
		}).always(function () {
			$response.remove('loading');
		});
	});

	// 截流Ajax请求
	// 消除抖动，避免输入过快/过长导致的请求过多
	var searchTimeout,
		searchDelay = 300;

	$('#title').on('keyup', function(event) {
		
		// 消除抖动，避免输入过快/过长导致的请求过多
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(
			function () {
				// 使用.triggenrHandler()操作再触发
				$ajaxForm.triggerHandler('submit');
			}, searchDelay);
		
	});

	// 更新新的Ajax数据类型，需要设置$.ajaxSetup()传递参数：
	// accept: 添加发送到服务器的头部信息，声明我们脚步可以理解的特定的MIME类型
	// content: 处理数据交换的另一方，提供一个与响应的MIME类型进行匹配的正则表达式，以尝试自动检测这个元数据当中的数据类型
	// converters: 包含解析返回数据的函数

	// 1、利用$.ajaxSetup()重新配置$.ajax()默认配置: accept/content/converters

	$.ajaxSetup({
		accept: {
			yaml: 'application/x-yaml, text/yaml'
		},
		contents: {
			yaml: /yaml/
		},
		converters: {
			'text yaml': function (textValue) {
				// console.log(textValue); 	//控制台输出，观察是否能加载
				// return '';
				var result = YAML.eval(textValue);
				var errors = YAML.getErrors();
				if (errors.length) {
					throw errors;
				}

				return result;
			}
		}
	});

	// 3、使用$.getScript()调用第三方YAML解析库(yaml.js)，并调用其方法
	$.getScript('yaml.js').done(function() {
		// 2.$.ajax()获取*.yml文件
		$.ajax({
			url: 'categories.yml',
			dataType: 'yaml'
		}).done(function (data) {
			var cats = '';
			$.each(data, function (category, subcategories) {
				cats += '<li><a href="#">' + category + '</a></li>';
			});

			$(document).ready(function () {
				var $cats = $('#categories').removeClass('hide');
				$('<ul></ul>', {
					html: cats
				}).appendTo($cats);
			});
		});
	});
	
	// 4、处理单机类别链接操作，不必等ajax加载完才能操作
	$(document).on('click', '#categories a', function (event) {
		event.preventDefault();
		$(this).parent().toggleClass('active')
			.siblings('.active').removeClass('active');
		$('#ajax-form').triggerHandler('submit');
	});

	// Ajax预过滤
	// 使用了一个简短的正则表达式测试options.url中是否包含.yml
	// 确保交互的数据类型为yaml
	$.ajaxPrefilter(function (options) {
		if (/\.yml$/.test(options.url)) {
			return 'yaml';
		}
	});

	// jQuery适当会使用XMLHttpRequest、ActiveX或<script>处理Ajax事务
	// 扩展传输（transport）机制：依赖与一个对象来实际地负责Ajax数据的传输。
	// 新的传输对象定义为工厂函数，返回一个带有.send()/.abort()方法的对象
	// .send()方法负责发送请求、处理响应并把数据发送给回调函数
	// .abort()方法会立即停止请求

	// 自定义传输对象，使用<img>元素取得外部数据

	// 首先需要向$.ajaxTransport()传入一个数据类型。
	// 这是告诉jQuery什么时候该使用我们的传输方式，而不是使用内置的机制。
	$.ajaxTransport('img', function (settings) {
		var $img, img, prop;

		// 然后，再提供一个函数，该函数能够返回带有相应的.send()和.abort()方法的新传输对象。
		return {
			// .send()方法需要创建一个新的<img>元素，并为它设置src特性。
			// 这个特性的值来自settings.url，是由jQuery通过$.ajax()调用传入的。浏览器在创建这个
			// <img>元素时，会加载引用的图像文件，因此在这里需要检查什么时候加载完成，然后触发完成回调函数。
			
			// headers?
			// complete
			send: function (headers, complete) {
				function callback(success) {
					if (success) {
						complete(200, 'OK', {img: img});
					}else {
						$img.remove();
						complete(404, 'Not Found');  // 状态码，相配数据
					}
				}
				$img = $('<img>', {
					src: settings.url
				});
				img = $img[0];
				// 在HTML 5中，新增加了两个用来判断图片的真实宽度和真实高度的属性，
				// 分别为.naturalWidth和.naturalHeight属性
				// 必须在图片完全下载到客户端浏览器才能判断
				prop = typeof img.naturalWidth === 'undefined' ? 'width' : 'naturalWidth';
				if (img.complete) {
					callback(!!img[prop]);
				}else {
					$img.on('load error', function (event) {
						callback(event.type == 'load');
					});
				}
			},
			abort: function () {
				if ($img) {
					$img.remove();
				}
			}
		};
		
	});

	$.ajax({
		url: 'sunset.jpg',
		dataType: 'img'
	}).done(function (img) {
		$('<div></div>', {
			id: 'picture',
			html: img
		}).appendTo('body');
	}).fail(function (xhr, textStatus, msg) {
		$('<div></div>', {
			id: 'picture',
			html: textStatus + ': ' + msg
		}).appendTo('body');
	});
	
});


// 服务器返回了错误状态码，例如403 Forbidden、404 Not Found或500 Internet Server Error。
// 服务器返回了间接的状态码，例如301 Moved Permanently。状态码为304 Not Modified的异常不会触发错误，因为浏览器可以正确地处理这种情况。
// 服务器返回的数据不能按照指定方式正确解析（例如，在dataType指定为json时，返回的不是有效的JSON数据）。
// XMLHttpRequest对象调用了.abort()方法。

// jqXHR .status可以检测Ajax通信过程的异常状况
// 通过给timeout选项传递一个以毫秒表示的时间值，就相当于告诉$.ajax():如果响应在多长时间内没有返回，那么就调用它自己的.abort()方法


//13.3 jq.XHR 
// jqXHR对象提供了这种接口：在XMLHttpRequest对象可用的情况下，封装该对象的行为；
// 在XMLHttpRequest对象不可用的情况下，则尽可能模拟它。这个对象提供给我们的属性
// 和方法包括：
// . 包含返回数据的.responseText或.responseXML；
// . 包含状态码和状态描述的.status和.statusText；
// . 操作与请求一起发送的HTTP头部的.setRequestHeader()；
// . 提早中断通信的.abort()。
// jQuery的所有Ajax方法都会返回jqXHR对象，只要把这个对象保存起来，随后就可以方便地使用这些属性和方法。

// 使用承诺方法的另一个好处是可以在请求期间添加一个加载指示器，然后在请求完成时或在其他情况下隐藏它。


	// 扩展Ajax功能
	// 数据类型转换器
	// $.ajaxSetup()函数，修改$.ajax()使用的默认值，只用一条语句就可以影响后续的很多Ajax操作
	
	// YAML数据表示格式

	// 更新新的Ajax数据类型，需要设置$.ajaxSetup()传递参数：
	// accept: 添加发送到服务器的头部信息，声明我们脚步可以理解的特定的MIME类型
	// content: 处理数据交换的另一方，提供一个与响应的MIME类型进行匹配的正则表达式，以尝试自动检测这个元数据当中的数据类型
	// converters: 包含解析返回数据的函数


	// Ajax预过滤
	// $.ajaxPrefilter()函数可以添加预过滤器
	// 所谓预过滤器，就是一些回调函数，它们可以在发送请求之前对请求进行过滤。
	// 预过滤器会在$.ajax()修改或使用它的任何选项之前调用，因此通过预过滤器可以修改这些选项或基于新的、自定义选项发送请求。
	// 预过滤器通过返回要使用的数据类型，也可以操作请求的数据类型。



















