
// 出色的网页是许多不同因素的综合结果，包括引人注目的内容、良好的设计和对细节的关注，
// 比如记载页面的速度有多快。加快页面加载(同时仍然向用户提供有趣的交互式体验)的
// 方法之一，是在用户的浏览器中使用JavaScript对单独的页面元素进行更新。换句话说，
// Web服务器并不直接向用户提供页面体验，而是通过因特网发送脚本。然后，脚本利用用户计算机的能力
// 构造出页面。带有这种脚本的页面可以称为动态页面(dynamic page).

// 通过将处理过程从服务器端转移到客户(用户)端，就可以获得更好的性能并且提供某种程度的个性化用户体验。

// 在网页上显示本地日期和时间，用用户所在地的时间对问候语进行定制，在不同的时间格式间转换，以及在脚本控制下跨用户的页面移动对象

// 在网页上显示当前日期

// JavaScript 可以判断出计算机上的当前日期和时间（以数字形式），然后以许多方式操作这个数字。

// 但是，脚本必须处理从数字到文本型日期的转换。


window.onload = initDate;

function initDate() {
	var dayName = new Array('Sunday', 'Monday', 'Tuesday', 'Webnesday', 'Thursday', 'Friday', 'Saturday');
	var monName = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 
							'August', 'September', 'October', 'Noverber', 'December');
	var now = new Date();  //	Thu Jul 20 2017 16:57:44 GMT+0800 (中国标准时间)

	// now.getDay() - 4	=> 星期是0-6的编号，对应星期日 —— 星期六
	// now.getMonth() - 6  =>月份是0-11进行编号的
	// now.getDate() - 20	=> 日期是从1开始编号的
	// 小时0 - 23 
	var dtString = dayName[now.getDay()] + ', ' + monName[now.getMonth()] + ' ' + now.getDate();

	document.getElementById('dtField').innerHTML = dtString;	// Thursday, July 20
}





