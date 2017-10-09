
// 可以调整这个脚本来显示任何时区中的时间

window.onload = initDate;

function initDate() {
	var allTags = document.getElementsByTagName('*');

	for (var i = 0; i < allTags.length; i++) {
		// className中字段暗藏时区，在此提取时区信息allTags[i].className.substring(2)
		if (allTags[i].className.indexOf('tz') == 0) {
			showTheTime(allTags[i], allTags[i].className.substring(2));
		}
	}
}

// 得到现在的时间，因为tz中的时区计算是按照UTC的，所以需要转换格式
// 利用得到的UTC时间，这个时间是中间点的时间（0时区处的时间），
// 然后利用这个时间进行±时区，得到当前时区时间

function showTheTime(currElem, tzoffset) {



	var dayName = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Tursday', 'Friday', 'Saturday');

	var thatTZ = new Date();
	// console.log(thatTZ);	// Thu Jul 20 2017 23:40:30 GMT+0800 (中国标准时间)
	
	// 将日期和时间（基于UT 形式）转换为字符串
	var dateStr = thatTZ.toUTCString();
	
	// console.log(dateStr); // Thu, 20 Jul 2017 15:38:24 GMT
	
	// 获得日期和时间的字符串版本，并且去掉最后三个字符（即UTC）。
	// 如果直接使用进行时区偏移设置时间会产生错误，JavaScript会误会我们想要的本地时间
	// Now：Thu, 20 Jul 2017 15:38:24 GMT
	// 偏移：-8 : 直接偏移设置：3:38 PM    截去UTC偏移设置：7:38 AM
	
	dateStr = dateStr.substring(0, dateStr.length - 3);
	
	// 使用parse()方法将日期转换为毫秒，利用setTime()设置为我们需要的时间
	thatTZ.setTime(Date.parse(dateStr));  // 1500536584000
	// console.log(thatTZ.setTime(Date.parse(dateStr))); // 1500536626000
	// console.log(thatTZ); // Thu Jul 20 2017 15:43:46 GMT+0800 (中国标准时间)
	
	// 添加时区偏移获得该时区的时间小时
	// 使用parseInt()将这个字符串转换为 -12～12 的一个数字，然后将它与当前UT 时间相加。
	// 结果就是我们需要的值：这个时区中的正确日期和时间。
	thatTZ.setHours(thatTZ.getHours() + parseInt(tzoffset));
	// console.log(thatTZ); // Thu Jul 20 2017 07:45:11 GMT+0800 (中国标准时间)

	// 时间各段拼接
	currElem.innerHTML = showTheHours(thatTZ.getHours()) + showZeroFilled(thatTZ.getMinutes()) + showAMPM(thatTZ.getHours()) + dayName[thatTZ.getDay()];

	// 转换成12小时制，需要和showAMPM配合使用
	function showTheHours(theHour) {
		if (theHour == 0) {
			return 12;
		}

		if (theHour < 13 ) {
			return (theHour > 9) ? theHour : ('0' + theHour.toString());
		}

		return (theHour - 12 > 9) ? (theHour - 12) : ('0' + (theHour - 12).toString());
	}

	// 格式对齐
	// 这个函数用来使输出更整齐。当分钟数或秒数小于等于9 时，它在数字前面加上一个零。
	function showZeroFilled(inValue) {
		if (inValue > 9) {
			return ':' + inValue;
		}
		return ':0' + inValue;
	}

	function showAMPM(thatTime) {
		if (thatTime < 12) {
			return ' AM ';
		}
		return ' PM ';
	}
}

// 没有处理夏令时（Daylight Saving Time）的简便方法。一些浏览器会错误地处理夏令时。而且，
// 是否能够处理夏令时还依赖于计算机用户是否知道如何设置他们的计算机。好在Windows和
// Mac OS X能够根据因特网时间服务器自动地设置时间，这会将夏令时考虑进去，所以可以缓
// 解这个问题。糟糕的是，JavaScript无法从操作系统获得关于夏令时的信息，所以它无法判断出
// 你所处的时间和地点是否应用夏令时。
//  很容易在HTML中添加另一个城市，而且不需要修改JavaScript，脚本仍然可以正常工作。




// str.substring(start: int[, end: int])
// str.substr(start: int[, length: int])

// The difference is in the second argument. 
// The second argument to substring is the index to stop at (but not include), 
// but the second argument to substr is the maximum length to return

// substr (MDN) takes parameters as (from, length).
// substring (MDN) takes parameters as (from, to).

// What is the difference between substr and substring? - stackoverflow
// https://stackoverflow.com/questions/3745515/what-is-the-difference-between-substr-and-substring


// 当str.substring(start: int)
//  str.substr(start: int)		得到的结果是一样的
//  但是添加第二个形参时候，就会产生可能的差异
//  毕竟：
// str.substring(start: int[, end: int])
// str.substr(start: int[, length: int])













