$(function () {
	$('#letter-b a').click(function (e) {
		e.preventDefault();
		$.getJSON('b.json', function( data ) {
			var html = "";
			$.each(data, function(entryIndex, entry) {
				html += "<div class='entry'>";
				html += "<h3 class='term'>" + entry.term + "</h3>";
				html += "<div class='part'>" + entry.part + "</div>";
				html += "<div class='definition'>";
				html += entry.definition;

				// 判断该词entry.quote是否存在，
				if (entry.quote) {
					html += "<div class='quote'>";
					// 如果存在遍历写入
					$.each(entry.quote, function (lineIndex, line) {
						html += "<div class='quote-line'>" + line + "</div>";
					});

					// 判断该词entry.quote中的entry.author是否存在，如果存在则写入
					if (entry.author) {
						html += "<div class='quote-author'>" + entry.author + "</div>";
					}

					html += "</div>";
				}
				
				html += "</div>";
				html += "</div>";
			});
			$('#dictionary-b').html(html);
		});
	});
});

// 添加不确定存在内容entry.quote
// JSON简洁，但严格，不容许任何错误。所有方括号、花括号、引号和逗号都必须合理且正确地使用，否则文件不会加载。
// 在多数浏览器器中，当文件加载失败时，我们看不到任何错误信息；脚步知识静默地彻底终止运转。






