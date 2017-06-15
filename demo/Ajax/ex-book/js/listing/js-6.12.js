// 关注请求

// JQuery提供了一组函数，通过他们能够为各种与Ajax相关的事件注册回调函数
// 可以利用这些函数多了解一些调用Ajax方法过程中的HTTP请求也会给我们带来方便

// .ajaxStart() .ajaxStop() 
// 全局函数 创建代码位于何处，当Ajax通信发生时都需要调用他们
// 和.ready()方法一样，只能由$(document)调用


$(function () {
	 var $loading = $("<div id='loading'>Loading…</div>").insertBefore('#dictionary-a');
	$(document).ajaxStart(function () {
		$loading.show();
	}).ajaxStop(function () {
		$loading.hide();
	});

	$('#letter-a a').click(function (e) {
		e.preventDefault();
		$('#dictionary-a').hide().load('a.html', function () {
			$(this).fadeIn();
		});
	});
});



// 全局的.ajaxError()，jQuery延迟对象系统
// 链接的.done()、.always()和.fail()方法，可以添加回调函数

/*
$(function() {
    $('#letter-e a').click(function(e) {
        e.preventDefault();
        var requestData = { term: $(this).text() };
        $.get('z.php', requestData, function(data) {
            $('#dictionary-e').html(data);
        }).fail(function(jqXHR) {
            $('#dictionary-e')
                .html('An error occurred:' + jqXHR.status)
                .append(jqXHR.responseText);
        });
    });
});
*/


// 失败后返回jqXHR的有HTTP响应码(status)/失败后的报文(responseText)

// 响应码 说 明
// 400 请求语法错误
// 401 未授权
// 403 禁止访问
// 404 未发现请求的URL
// 500 服务器内部错误


// Ajax和事件


/*
// 因为该元素是加载完成之后出现的，之后出现的需要事件重新绑定，不然无法使用
$(document).ready(function() {
    $('h3.term').click(function() {
        $(this).siblings('.definition-a').slideToggle();
    });
});
*/

// 使用事件委托，后添加元素也可以发生事件
$(document).ready(function () {
	$('body').on('click', 'h3.term', function () {
		$(this).siblings('.definition').slideToggle();
	});
});

// .on()方法告诉浏览器密切注意页面上发生的任何单击事件。当（且仅当）被单击的元素与
// h3.term选择符匹配时，才会执行事件处理程序。这样，无论单击哪个词条，都可以正常切换相
// 应的解释，即使对应的解释内容是通过Ajax后来添加到文档中的也没有问题。