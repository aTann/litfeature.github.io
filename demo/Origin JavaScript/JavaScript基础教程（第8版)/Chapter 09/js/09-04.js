
// 使用cookie作为计数器

// 使用cookie 存储特定用户访问某个页面的次数，只能记录这个用户的访问次数

window.onload = initPage;

function initPage() {
	// 失效时间设置
	var expireDate = new Date();
	expireDate.setMonth(expireDate.getMonth() + 6);

	// 浏览次数 +1
	var hitCt = parseInt(cookieVal('pageHit'));
	hitCt++;

	document.cookie = 'pageHit=' + hitCt +';expires=' + expireDate.toGMTString();
	document.getElementById('pageHits').innerHTML = 'You have visited this page ' + hitCt + ' time'
;}

function cookieVal(cookieName) {
	var thisCookie = document.cookie.split('; ');

	// 寻找cookieName
	for (let icookie of thisCookie) {
		if (icookie.split('=')[0] == cookieName) {
			return icookie.split('=')[1];
		}
	}

	return 0;
}
// 一种可能性是使用cookie 记录特定用户上一次访问你站点的时间，并且根据这个时间显示不同的页面。







