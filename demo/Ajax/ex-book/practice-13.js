/*-----------------------------------------------------------------------------------------------------
要完成以下练习，读者需要本章的index.html文件，以及complete.js中包含的已经完成的
JavaScript代码。可以从Packt Publishing网站http://www.packtpub.com/support下载这些文件。
“挑战”练习有一些难度，完成这些练习的过程中可能需要参考jQuery官方文档：
http://api.jquery.com/。
(1) 修改buildItem()函数，以便包含它显示的每个jQuery方法的较长篇幅的说明。
(2) 挑战：在页面中添加一个表单，指向Flickr的公开图片搜索（http://www.flickr.com/search），
其中包含一个<input name="q">和一个提交按钮。基于渐进增强的原则从Flickr的
JSONP数据源服务（http://api.flickr.com/services/feeds/photos_public.gne）取得照片，然后
把照片插入到页面的内容区域。在向该服务发送data时，使用tags而不是q，把format
设置为json。还要注意的是，这个服务要求的JSONP回调函数名是jsoncallback，而
不是callback。
(3) 挑战：向Flickr请求添加错误处理程序，以防它返回parsererror。为了测试这个错误处
理程序，把JSONP回调函数名修改为callback，然后测试一下。

都实现了，但是样式比较丑

----------------------------------------------------------------------------------------------------------*/

$(function() {

	var $ajaxForm = $('#ajax-form'),
		$response = $('#response'),
		noresults = 'There were no reach result.',
		failed = 'Sorry, but the request could not' +
		' reach its destination. Try again later.';

	// 构建HTML
	var buildPicture = function(items) {

		// console.log(itemVal);

		var html = '';
		html += '<li>';
		html += '<h3>' + items.title + '</h3>';
		var pattern = /\"(.*)\"/;
		var author = items.author.match(pattern)[1];
		// var author = 'nobody@flickr.com ("纱泛读")'.match(pattern)[1];		// 测试非英文在Regex.match()得到Unicode吗
		// console.log(author);

		html += 'author: <a href="https://www.flickr.com/photos/' + items.author_id + '/">' + author + '</a>';
		html += '<div class="picture">';
		// html += '<a href="' + items.link + '"><img src="' + items.media.m + '"></a>';    // 因为得到的数据中自带描述和显示图片，以及相应的页面跳转
		html += '<p>' + items.description + '</p>';
		html += '<strong>tags:  </strong>';
		$.each(items.tags.split(' '), function(tagIndex, tag) {
			html += '<span>  ' + tag + ',   </span>';
		});
		html += '</div>';
		html += '</li>';

		return html;
	};

	// response，处理成功返回的数据

	var response = function(data) {
		var output = '';
		console.log(data)
		if (data.items && data.items.length) {
			output += '<ol>';
			$.each(data.items, function(itemsIndex, items) {
				output += buildPicture(items);
			});
			output += '</ol>';
		} else {
			output += noresults;
		};

		$response.html(output);
	};

	$ajaxForm.on('submit', function(event) {
		event.preventDefault();

		var tag_search = $('#tags').val();
		// 未输入，不提交
		if (tag_search == '') {
			return;
		}

		/*
		$.ajax({
				url: 'http://api.flickr.com/services/feeds/photos_public.gne',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				jsonpCallback: 'flickrCallback',	// 为返回的json数据项命名，如果没有的话，jQuery就会随机命名(eg. jQuery3210376468554153065_1498098544585)
				data: {
					format: 'json', // json¸格式读取标明
					tags: tag_search // tags获取

				},
				// 成功获取回应信息
				// success: response
			}).done(response) // 成功返回，response处理回应的数据，包括回应中无结果
			.fail(function() { // 错误处理
				$response.html(failed);
			});
		*/
		
		var api = {};
		if(!api[tag_search]){
			api[tag_search] = $.ajax({
				url: 'http://api.flickr.com/services/feeds/photos_public.gne',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				jsonpCallback: 'flickrCallback',
				data: {
					format: 'json', // json¸格式读取标明
					tags: tag_search, // tags获取
				},
				timeout: 15000

				// 成功获取回应信息
				// success: response
			});
		}
		api[tag_search].done(response)	// 返回处理
					   .fail(function() { // 错误处理
							$response.html(failed);
						});



	});

});


// ajax灵感来源
// https://teamtreehouse.com/community/how-do-i-get-flickr-to-respond-json-that-i-can-use
// 

