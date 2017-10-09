

// 安全限制
// 跨域访问

$(function () {
			  
	var url = 'http://examples.learningjquery.com/jsonp/g.php';
			  // 'http://examples.learningjquery.com/jsonp/g.php'
	$('#letter-g a').click(function (e) {
		e.preventDefault();
		$.getJSON(url + '?callback=?', function (data) {
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
			$('#dictionary-g').html(html);
		});
	});
});




































