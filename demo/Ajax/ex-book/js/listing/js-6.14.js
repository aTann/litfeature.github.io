

// $.ajax()

$(function () {
	$.ajax({
		url: 'a.html',
		success: function (data) {
		$('#dictionary-a').html(data);
		}
	});
});