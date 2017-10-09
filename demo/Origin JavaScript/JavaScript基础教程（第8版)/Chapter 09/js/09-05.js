
// 删除cookie
// 删除cookie 记录中的一个或多个cookie。
// 将cookie 的过期日期设置为过去的某个日期，这会让浏览器自动地删除它。

window.onload = cookieDelete;

function cookieDelete() {
	
	// 记录将要删除cookies计数器
	var cookieCt = 0;

	// 不空，同时还有确认
	if (document.cookie != '' && confirm('Do you want to delete the cookies?')) {
		var thisCookie = document.cookie.split('; ');
		cookieCt = thisCookie.length;

		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() - 1);

		for (var i = 0; i < thisCookie.length; i++) {
			let cookieName = thisCookie[i].split('=')[0];
			document.cookie = cookieName + '=;expires=' + expireDate.toGMTString();
		}

		/*for (let icookie of thisCookie) {	// IE11不支持
			let cookieName = icookie.split('=')[0];
			// console.log(cookieName);
			// userName
			// pageHit
			
			// cookies Name=;expires=失效的时间
			document.cookie = cookieName + '=;expires=' + expireDate.toGMTString();
		}*/
	}

	document.getElementById('cookieData').innerHTML = 'Number of cookies delete: ' + cookieCt;
}




