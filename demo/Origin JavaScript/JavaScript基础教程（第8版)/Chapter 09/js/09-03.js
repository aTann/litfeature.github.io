
// 显示cookie


// 我们看看如何编写一个脚本，让它读取来自你的服务器的所有cookie，并且显示它们的名称和值。
// 如果没有cookie，脚本就显示Thereare no cookies here。如果有cookie，就将每个cookie 的内容显示在单独的行上。

window.onload = showCookies;

function showCookies() {
	var outMsg = '';

	if (document.cookie == '') {
		outMsg = 'There are no cookie here';
	}
	else {
		// cookie在浏览器以字符串形式存储，可以通过split进行分割
		var thisCookie = document.cookie.split('; ');

		// 逐项读取
		/*for (var i = 0; i < thisCookie.length; i++) {
			outMsg += 'Cookie name is "' + thisCookie[i].split('=')[0];
			outMsg += '", and the value is "' + thisCookie[i].split('=')[1] +'"<br />';
		}*/
		
		for (let icookie of thisCookie) {
			outMsg += 'Cookie name is "' + icookie.split('=')[0];
			outMsg += '", and the value is "' + icookie.split('=')[1] +'"<br />';
		}

		// document.getElementById('cookieData').innerHTML = outMsg;
	}
}


/*function showCookies() {
	if (document.cookie == '') {
		console.log('There are no cookie here');
	}
	else {
		// cookie在浏览器以字符串形式存储，可以通过split进行分割
		var thisCookie = document.cookie.split('; ');
		
		for (let icookie of thisCookie) {
			console.log(icookie);
		}

	}
}*/



