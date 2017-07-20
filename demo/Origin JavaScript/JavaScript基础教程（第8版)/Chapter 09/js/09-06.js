
// 处理多个cookie
// 在一个脚本中使用数组处理多个cookie

window.onload = initPage;

function initPage() {
	var now = new Date();
	var expireDate = new Date();
	expireDate.setMonth(expireDate.getMonth() + 6);

	var hitCt = parseInt(cookieVal('pageHit'));
	hitCt++;

	var lastVisit = cookieVal('pageVisit');
	if (lastVisit == 0) {
		lastVisit = '';
	}

	// 不能自动化吗
	document.cookie = 'pageHit=' + hitCt + ';expires=' + expireDate.toGMTString();
	document.cookie = 'pageVisit=' + now + ';expires=' + expireDate.toGMTString();

	var outMsg = 'You have visited this page ' + hitCt + ' times.';
	if (lastVisit != '') {
		outMsg += '<br />Your last visit was ' + lastVisit;
	}
	document.getElementById('cookieData').innerHTML = outMsg;

}

// 遍历获取cookieName相对应的值
function cookieVal(cookieName) {
	var thisCookie = document.cookie.split('; ');

	for (let icookie of thisCookie) {
		if (icookie.split('=')[0] == cookieName) {
			return icookie.split('=')[1];
		}
	}

	return 0;
}












