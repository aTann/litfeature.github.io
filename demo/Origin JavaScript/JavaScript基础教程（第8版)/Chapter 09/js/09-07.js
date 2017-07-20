
// 可以使用cookie 和JavaScript 提醒经常访问站点的用户注意他们没看到过的内容。
// 如果通过cookie 发现一些内容是在访问者上次访问之后添加的

window.onload = initPage;

function initPage() {
	
	// 为了达到给信息添加NEW!这个效果，需要进行对cookie中的PageVisit进行设置比更新时间更早之前
	// 当然也可以修改html中new-xxx，进行达到效果，但是，我这不是在学JavaScript吗
	// flag = 0，表示不需要给cookie中的PageVisit更改， 其他flag，表示更改cookie中的PageVisit
	setCookie(1);

	var now = new Date();

	var lastVisit = new Date(cookieVal('pageVisit'));
	
	var expireDate = new Date();
	expireDate.setMonth(expireDate.getMonth() + 6);

	document.cookie = 'pageVisit=' + now + ';expires=' + expireDate.toGMTString();
	var allGrafs = document.getElementsByTagName('p');

	for (var i = 0; i < allGrafs.length; i++) {
		if(allGrafs[i].id.indexOf('New-') != -1){
			newCheck(allGrafs[i], allGrafs[i].id.substring(4));
		}
	}

	function newCheck(grafElement, dtString) {
		var yyyy = parseInt(dtString.substring(0, 4), 10);  // 10 表示总是返回十进制数字
		var mm = parseInt(dtString.substring(4, 6), 10);
		var dd = parseInt(dtString.substring(6, 10), 10);
		var lastChgd = new Date(yyyy, mm -1, dd);

		// 如果上次浏览的时间比更新时间更早，那么给该条信息添加NEW!标记
		// 为了达到这个效果，需要进行对cookie中的PageVisit进行设置
		if (lastChgd.getTime() > lastVisit.getTime()) {
			grafElement.className += ' newImg';
		}
	}

}

function cookieVal(cookieName) {
	var thisCookie = document.cookie.split('; ');

	for (var i = 0; i < thisCookie.length; i++) {
		if(thisCookie[i].split('=')[0] == cookieName) {
			return thisCookie[i].split('=')[1];
		}
	}
	// 如果没有找到名字指定的cookie，它会返回“1 January 1970”，而不是零。这会简化其他地方的代码。这是JavaScript 能够识别的最早的
	// 日期，所以其他日期都应该晚于这个日期。这个日期并不向用户显示，它只是JavaScript 内部引用的日期。

	return '1 Jauary 1970';
}


function setCookie(flag) {
	if (flag == 0) {
		return;
	}
	var lastVisitDate = new Date();
	lastVisitDate.setFullYear(lastVisitDate.getFullYear() - 10);

	var expireDate = new Date();
	expireDate.setMonth(expireDate.getMonth() + 6);

	if (document.cookie != '') {
		document.cookie = 'pageVisit=' + lastVisitDate + ';expireDate=' + expireDate.toGMTString();
	}


}


// substring(to,from)命令返回一个字符串中从to 位置开始，到from 位置前面结束的字符（字符
// 从零开始编号）。所以，如果字符串包含“20060807”，而你希望获得第5 个和第6 个字符，就要
// 使用substring(4,6)，结果是字符串“08”。
// from 参数是可选的。如果省略它，就表示要获得从to 位置开始到末尾的所有字符。








