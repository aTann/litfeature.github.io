
/*------------------------------------------------------
// 练习：
（1）页面加载后，把exercises-content.html的主体（body）内容提取到页面的内容区域。
（2）不要一次就显示整个文档，请为左侧的字母列表创建“提示条”，当用户鼠标放到字母上
时，从exercises-content.html中加载与该字母有关的内容。
（3）为页面加载添加错误处理功能，在页面的内容区显示错误消息。修改脚本，请求does-notexist.
html而不是exercises-content.html，以测试错误处理功能。
（4）挑战：页面加载后，向GitHub发送一个JSONP请求，取得某个用户代码库的列表。把每
个代码库的名称和URL插入到页面的内容区。取得jQuery项目代码库的URL是https://api.
github.com/users/jquery/repos。

--------------------------------------------------------*/

// 页面加载，exercises-content.htmlbody
// $(function () {
// 	$('body').load('exercises-content.html .letter');
// });



// 不要一次就显示整个文档，请为左侧的字母列表创建“提示条”，当用户鼠标放到字母上时，从exercises-content.html中加载与该字母有关的内容。

/*
// .load()
$(function () {
	$('body').on('click', '.letter h3', function (e) {
		e.preventDefault();
		// 获取需要加载的ID
		id_load = $(this).parent('div').attr('id');

		// $(this).siblings('div.letter')返回的是Object，无法使用if($(this).siblings('div.letter')),
		// 所以使用$(this).siblings('div.letter').length <= 0进行对$(this).siblings('div.letter')是否存在进行判断
		if ($(this).siblings('div.letter-add').length <= 0) {
			
			// 添加一个div.letter存放加载后的数据，先不显示，再利用.slideToggle()进行缓动显示
			$(this).parent('div')
				   .append("<div class='letter-add'></div>");
			

			// 利用.load()获取相应的HTML内容，利用fadeOut()先隐再用slideDown()显示
			$(this).siblings('div.letter-add')
				  .load('exercises-content.html #' + id_load, {limit: 25}, function (responseText, textStatus, XMLHttpRequest) {
				  // .load('does-notexist.html #' + id_load, {limit: 25}, function (responseText, textStatus, XMLHttpRequest) {
				  	// .load 错误处理需要在其callback进行处理，无法使用ajaxError进行统一处理
				  	// 方案来自Stack Overflow

				  	if (XMLHttpRequest.status != 200) {
				  		$(this).html('Sorry, a error occurred: ' + XMLHttpRequest.status)
				  		   	   .append(XMLHttpRequest.responseText);
				  	}
				  })	  
				  .fadeOut('slow')
				  .slideDown('slow');

		} else {

			// 再次点击关闭
			// $(this).siblings('div.letter').remove();

			// 利用alideToggle()缓动关闭，而不是直接删除，减少提交
			$(this).siblings('div.letter-add')
				   .slideToggle();
			
		}
		
		// alert($(this).siblings('div.letter').html());
		// 按需加载到相应位置，替换之前的div内容
		// $(this).get('exercises-content.html', function (data) {
		// 	$(this).siblings('div.letter').empty();
		// 	html = $(data).find(id_load);
		// 	$(this).siblings('div.letter').html(html);
		// });
		
	});
});
*/





// 不要一次就显示整个文档，请为左侧的字母列表创建“提示条”，当用户鼠标放到字母上时，从exercises-content.html中加载与该字母有关的内容。
// 鼠标放到上面，mouseover/mouseenter+mouseleave/mouseout

// :hover,包含着两个鼠标事件mouseenter + mouseleave

$(function () {

	$('body').on(
		{
		// 鼠标进入发生事件，触发Ajax请求，获取所触发首字母相关的单词
			mouseenter: function () {
			// 获取触发字母的div的Id
				id_selected ='#letter-' + $(this).html().toLowerCase();

				// 简单约束，避免碰到jQuery的链接也触发事件
				if (id_selected.length > 9) {
					return false;
				}


				$('#dictionary').load('exercises-content.html ' + id_selected, 
									  {limit: 25}, 
									  function (responseText, requestState, XMLHttpRequest) {
									  // alert("data");
									  		// 错误处理
											if (XMLHttpRequest.status != 200) {
												$('#dictionary').html("Sorry, a error occurred: " + XMLHttpRequest.status)
																.append(XMLHttpRequest.responseText);
											};
									   });
			},
		// 鼠标离开该字母，删除内容，重新留白
			mouseleave: function () {
				$('#dictionary').empty();
			}
		}, '.letter a'); // 委托.letter
});



$(function () {
	// $().append('#container');
	$.getJSON('https://api.github.com/users/jquery/repos', function (data) {
		var html = '';
		html += "<div class='letter'>";
		html += "<h3> jQuery项目代码库 </h3>";
		html += "<ul>";
		$.each(data, function (dataIndex, dataItem) {
		   
		   html += "<li>";
		   html += "<a href = '" + dataItem.html_url + "' >";
		   html += dataItem.full_name;
		   html += "</a>";
		   html += "</li>";

		});

		html += "</ul></div>"

		$('#container').append(html);
	});
});










































