$(document).ready(function () {
	$('#letter-b a').click(function (e) {
		
		e.preventDefault();
		$.getJSON('b.json', function(data) {
			var htmlText = '';
			$.each(data, function (entryIndex, entry) {
				htmlText += "<div class='entry'>";
				htmlText += "<h3 class='term'>" + entry.term + "</h3>";
				htmlText += "<div class='part'>" + entry.part + "</div>";
				htmlText += "<div class='definition'>";
				htmlText += entry.definition;
				htmlText += "</div>";
				htmlText += "</div>";
			});
			$('#dictionary-b').html(htmlText);
		});
	});
});


// 安全的HTML：这种方法要求数据中包含可以直接用来构建HTML的安全内容，例如，数据中不能包含任何<字符
// 通过匿名函数作为回调函数，将回调的JSON数据部分（除引用部分）写进HTML中


