$(function () {
	$('#letter-d a').click( function (e) {
		e.preventDefault();
		// 利用$.get(url [, callback-fun]) 取得指定URL文件
		// 然后将纯文本格式的数据提供给回调函数
		// 但是在根据服务器提供的MIME类型知道响应的是XML的情况下，提供给回调函数的将是XML DOM树

		$.get('d.xml', function (data) {
			$('#dictionary-d').empty();
			// 其他遍历方法.find()/filter()
			// $(data).find('entry').each(function () {

			// 将词条限定为必须包含嵌套的引用元素（quote）
			// $(data).find('entry:has(quote)').each(function () {	
			
			// 将词条限定为必须包含嵌套的引用元素（quote）,并且引用元素（quote）必须包含作者（author）
			$(data).find('entry:has(quote[author])').each(function () {		
				var $entry = $(this);
				var html = "<div class='entry'>";
				// 对XML的操作和对HTML有着部分相同的使用
				html += "<h3 class='term'>" + $entry.attr('term');
				html += "</h3>";
				html += "<div class='part'>" + $entry.attr('part') + "</div>";
				html += "<div class='definition>";
				html += $entry.find('definition').text();
				var $quote = $entry.find('quote');
				if ($quote.length) {
					html += "<div class='quote'>";
					$quote.find('line').each(function () {
						html += "<div class='quote-line'>";
						html += $(this).text() + "</div>";
						if ($quote.attr('author')) {
							html += "<div class='quote-author'>";
							html += $quote.attr('author') + "</div>";
						}
					html += "</div>";
					});
				}
				html += "</div>";
				html += "</div>";
				$('#dictionary-d').append($(html))
			});
		});
	});
});