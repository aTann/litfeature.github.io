
$(function () {
	
	var $ajaxForm = $('#ajax-form'),
		$response = $('#response'),
		noresults = 'There were no rearch result.',
		failed = 'Sorry, but the request could not' +
				'reach its destination. Try again later.';

	// Í¼Æ¬ÏîHTML¹¹½¨
	var buildPicture = function (items) {
		
			// console.log(itemVal);
		
		// var $media_link;
		// $.each(items.media, function (argument) {
		// 	// body...
		// })



		var html = '';
		html += '<li>';
		html += '<h3>' + items.title + '</h3>';
		var pattern = /\"(.*)\"/;
		var author = items.author.match(pattern)[1];
		// var author = 'nobody@flickr.com ("纱泛读")'.match(pattern)[1];
		// console.log(author);
		
        html += 'author: <a href="https://www.flickr.com/photos/'+ items.author_id +'/">' + author + '</a>';
        html += '<div class="picture">';
        // html += '<a href="' + items.link + '"><img src="' + items.media.m + '"></a>';
        html += '<p>' + items.description + '</p>';
        html += '<strong>tags:  </strong>';
        $.each(items.tags.split(' '), function (tagIndex, tag) {
        	html += '<span>  ' + tag + ',   </span>';
        });
        
        html += '</div>';
        html += '</li>';
        console.log(items);
		
		return html;
	};

	// response¹¹½¨
	
	var response = function (data) {
		var output = '';
		output += '<ol>';
		$.each(data.items, function (itemsIndex, items) {
			output += buildPicture(items);
		});
		output += '</ol>';		
		$response.html(output);
	};

	$ajaxForm.on('submit', function (event) {
		event.preventDefault();

		$.ajax({
			url: 'http://api.flickr.com/services/feeds/photos_public.gne',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			data: {
				format: 'json', // json¸ñÊ½
				tags: $('#tags').val()	// tagsËÑË÷
				
			},
			success: response
		});

	});
	
});

// ajax灵感来源
// https://teamtreehouse.com/community/how-do-i-get-flickr-to-respond-json-that-i-can-use