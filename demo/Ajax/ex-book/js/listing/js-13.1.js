

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

/*
$(function () {
	// 获取主要操作目标节点
	var $ajaxForm = $('#ajax-form'),
		$response = $('#response');

	// 单击提交
	$ajaxForm.on('submit', function (event) {
		event.preventDefault();
		$.ajax({
			url: 'https://github.com/search',
			dataTypes: 'jsonp',
			crossDomain: true,
			async: true,
			data: {
				q: $('#title').val()
			},

			success: function(data) {
				console.log(data);
			},
			error: function () {
				alert('error');
			}

		});
	});
	
});
*/

// 