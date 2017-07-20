
// JavaScript 和 cookie
// cookie 附带在http报文中，无论需不需要都会服务器/客户端来回传输（总是包含发送它的服务器的地址）
// 		  信息简单每个域4K左右，
// 		  失效事件往往手动设置，
// 		  关闭浏览器或者窗口不会过期失效，
// 		  通常是长时间到期失效或者退出登录事件，
// 		  常用于记录状态(登录状态-账号密码)，跟踪用户访问站点信息，统计用户访问次数等
// 		  
// 		  只是用户硬盘上一个简单的文本文本，可以存储一些信息而已（以书面形式存在）



// 不能做的操作：无法获得关于用户的任何真实信息，比如电子邮件地址；
// 				 无法使用cookie查看用户硬盘上的内容；
// 				 cookie也无法传输计算机病毒

// 技术本质：“识别”
// 可以把它看做Web上的Caller ID，只是在形式方面有各种变化——每个使用cookie 的Web 站点向用户的浏览器授予某
// 种形式的个性化ID，这样在用户下一次访问这个站点时就能够识别出他。当用户再次访问以前向他传
// 递过cookie 的Web 服务器时，服务器可以向浏览器进行查询，了解这个用户是否拥有它的cookie。
// 如果是，服务器就可以获取原来传递的cookie 中存储的信息。请记住，cookie 只识别使用的计算机，
// 而不识别使用这台计算机的人。



// 建立第一个cookie
// 特定格式文本字符串

// cookieName = cookieValue;		// 给cookie命名赋值，必有，其余可选
// expires = expirationDateGMT;		// 失效日期
// path = URLpath;					// cookie存储一个URL
// domain = siteDomain;				// 存储一个域值


// 设置浏览器cookie

window.onload = nameFieldInit;

function nameFieldInit() {
	var userName = '';		// userName初始化空值
	// 如果已经有cookie，直接调用cookie
	if (document.cookie != '') {
		// alert(document.cookie);	// userName=Tom
		// split("=")方法将cookie 分隔成一个数组，数组中第一个元素（cookie Field[0]）是cookie 的名称，第二个元素（cookie Field [1]）是cookie的值。
		userName = document.cookie.split('=')[1];
	}

	// 把userName放进文本字段中
	document.getElementById('nameField').value = userName;
	
	// 当用户离开这个文本字段，onblur()触发，利用setCookie进行处理
	// onsubmit提交是用到
	document.getElementById('nameField').onblur = setCookie;
	document.getElementById('cookieForm').onsubmit = setCookie;
}

function setCookie() {
	// 当前日期赋值
	var expireDate = new Date();
	// 取出月份部分，在原来基础上 +6月
	expireDate.setMonth(expireDate.getMonth() + 6);

	var userName = document.getElementById('nameField').value;
	
	// cookie设置，cookie 仅仅是一个文本字符串，所以可以使用任何文本字符串操作来建立cookie，
	document.cookie = 'userName=' + userName + ';expires=' + expireDate.toGMTString();

	// IE 使焦点离开文本字段，对其他浏览器没用，因为其他浏览器已经离开
	document.getElementById('nameField').blur();
	
	// 防止实际提交
	return false;
}

// 需要服务器支持不然无法创建cookie
// 一个页面可以设置多个cookie
// cookie1;
// cookie2
// 
// 可以利用split('; ')命令将多个cookie记录分割为数组
// 

