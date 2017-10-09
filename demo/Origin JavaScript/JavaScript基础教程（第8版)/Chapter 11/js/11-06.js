

// 创建倒数计数器

window.onload = showDays;

function showDays() {
	var allTags = document.getElementsByTagName('*');

	for (var i = 0; i < allTags.length; i++) {
		if (allTags[i].className.indexOf('daysTill') > -1) {
    		allTags[i].innerHTML = showTheDaysTill(allTags[i].id);
		}
	}

	function showTheDaysTill(thisDate) {
		var theDays;

		switch (thisDate) {
			case 'anniv':
				theDays = daysTill(5, 6);
				break;
			case 'bday':
				theDays = daysTill(8, 7);
				break;
			case 'xmas':
				theDays = daysTill(12, 25);
				break;
			default:
				// statements_def
				// break;
		}
		return theDays + ' ';
	}

	// 特殊的月日 - 现在的月日
	// 
	function daysTill(mm, dd) {
		var now = new Date();
		var inDate = new Date(now.getFullYear(), mm-1, dd); // 特殊日子的年月日

		if (inDate.getTime() < now.getTime()) {
			inDate.setYear(now.getFullYear() + 1);		// 特殊日子的年月日，为什么+1，今年过了啊
		}
		// console.log(Math.ceil(inDate - now));   // 1384665264 直接相减得到秒数
		// return (Math.ceil(dayToDays(inDate) - dayToDays(now)));
		return(Math.ceil(dayToDays((inDate - now))));
	}

	function dayToDays(inTime) {
		// return (inTime.getTime() / (1000 * 60 * 60 * 24));
		return (inTime / (1000 * 60 * 60 * 24));

		// 两者有什么区别吗？
		// 转换成年月日再相减		// 可能这个接口在其他地方还可以用，但是其他的另外一个加个.getTime()可以用啊，而且更明义呢
		// 相减后转换成日字
	}
}





