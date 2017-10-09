function slide(imgli_offset, numlist, flag_num, time, num_pic) {
	num_pic = num_pic || 5;
	
	slidetime = {
		fadeIn: 2000,
		fadeOut: 2000,
		interval: 3000
	};

	$.extend(slidetime,time);  // 利用jQuery多参数封装模式

	var time = "";
	var index = 1;
	$(function() {
		showimg(index);
		//鼠标经过
		$(numlist).hover(function() {
			clearTimeout(time);
			var eq_sel = $(this).text()
				// $('#imgShow li').removeClass("onshow").eq(eq_sel-1).addClass("onshow"); //代码少，但不能实现动画效果
			$(numlist).removeClass(flag_num).eq(eq_sel - 1).addClass(flag_num);
			// $("#imgShow li").hide().stop(true,true).eq(eq_sel-1).fadeIn(2000);
			$(imgli_offset).fadeOut(slidetime.fadeOut).eq(eq_sel - 1).fadeIn(slidetime.fadeIn); //淡出淡入，不显得耀眼

		}, function() {
			//实现自动轮转
			index = $(this).text() > num_pic-1 ? 1 : parseInt($(this).text()) + 1;
			// time = setTimeout("showimg(" + index + ")", slidetime.interval);
			time = setTimeout(function(){showimg(index)}, slidetime.interval);
		}
		)
	});

	function showimg(num) {
		//实现自动轮转
		index = num||3;
		$(numlist).removeClass(flag_num).eq(index - 1).addClass(flag_num);
		// $("#imgShow li").hide().stop(true, true).eq(index-1).fadeIn(2000);
		$(imgli_offset).fadeOut(slidetime.fadeOut).eq(index - 1).fadeIn(slidetime.fadeIn); //淡出淡入，不显得耀眼

		index = index + 1 > num_pic ? 1 : index + 1;
		// time = setTimeout("showimg(" + index + ")", slidetime.interval);
		//setTimeout 调用的是全局函数，在此调用slide，slide里面的函数非全局函数，所以无法执行
		
		time = setTimeout(function(){showimg(index)}, slidetime.interval);
		//进行自执行匿名函数包装就可以调用成功了？为什么包装成自执行匿名函数就可以了？
		//立即调用的函数表达式
		
	};
}