
// 载入事件
window.onload = initStyle;

// 退出事件，保存设置
window.onunload = unloadStyle;	// onunload打成onload

function initStyle() {
	// 利用cookie保存的样式值，进行渲染页面
	var thisCookie = cookieVal('style');	// 如果是空白的cookie，在读取cookie也会创建一个cookie（因为onunload打成onload导致错误判断）
	if (thisCookie) {
		var title = thisCookie;
	}
	else {
		var title = getPreferredStylesheet();
	}
	setActiveStylesheet(title);

	// input[type=button] 绑定setActiveStylesheet(样式转换)
	var allButtons = document.getElementsByTagName('input');
	for (var i = 0; i < allButtons.length; i++) {
		if (allButtons[i].type == 'button') {
			allButtons[i].onclick = setActiveStylesheet;
		}
	}

}

// 退出时候，cookie保存设置
function unloadStyle() {
	var expireDate = new Date();
	expireDate.setYear(expireDate.getFullYear() + 1);
	document.cookie = 'style=' + getActiveStylesheet() + ';expires=' + expireDate.toGMTString() + ';path=/';	// .toGMTSring() ==> .toGMTString()
}

// 载入默认的link
// 返回该默认的link[title]
function getPreferredStylesheet() {
	var thisLink, relAttribute;
	var linksFound = document.getElementsByTagName('link');

	for (var i = 0; i < linksFound.length; i++) {
		thisLink = linksFound[i];
		relAttribute = thisLink.getAttribute('rel');
		if (relAttribute.indexOf('style') && relAttribute.indexOf('alt') == -1 
			&& thisLink.getAttribute('title')) {  		// .getAttibute() ==> .getAttribute()
			return thisLink.getAttribute('title');
		}
	}
	return '';
}

// 获取当前的设置 link[title]
function getActiveStylesheet() {
	var thisLink;
	var linksFound = document.getElementsByTagName('link');

	for (var i = 0; i < linksFound.length; i++) {
		thisLink = linksFound[i];
		if (thisLink.getAttribute('rel').indexOf('style') > -1 && thisLink.getAttribute('title') 
			&& !thisLink.disabled ) {
			return thisLink.getAttribute('title');
		}
	}

}

// 样式转换
function setActiveStylesheet(inVal) {
	// alert(11);
	var thisLink;
	var linksFound = document.getElementsByTagName('link');

	if (inVal) {
		if (typeof(inVal) == 'string') {
			var title = inVal;		// inval ==> inVal
		}
		else{
			var title = inVal.target.id;
		}
	}else {
		var title = window.event.srcElement.id;
	}

	for (var i = 0; i < linksFound.length; i++) {
		thisLink = linksFound[i];
		if (thisLink.getAttribute('rel').indexOf('style') > -1 && thisLink.getAttribute('title')) {
        	thisLink.disabled = true;
        	if (thisLink.getAttribute('title') == title) {
        		thisLink.disabled = false;
        	}
		}
	}
}

// 读取cookie
function cookieVal(cookieName) {
	var cookies = document.cookie.split('; ');

	for (var i = 0; i < cookies.length; i++) {
	 var icookies = cookies[i].split('=');
	 if (icookies[0] == cookieName) {
	 	return icookies[1];
	 }
	}
	return '';
}



