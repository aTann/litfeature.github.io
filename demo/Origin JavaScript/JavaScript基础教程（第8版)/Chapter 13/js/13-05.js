
// 用Ajax 预览链接
window.onload = initAll;

function initAll() {
	// 为所有的<a>绑上onmouseover处理程序
	var allLinks = document.getElementsByTagName('a');

	for (var i = 0; i < allLinks.length; i++) {
		allLinks[i].onmouseover = getPreview;
		allLinks[i].onmouseout = hidePreview;
	}
}

// 实现异步操作
function getPreview(evt) {
	// 获取链接
	// 根据访问者使用的浏览器不同，URL 保存在evt.target 或window.event.srcElement 中
	/*if (evt) {
		var url = evt.target;
		// console.log(evt.target);
	}
	else {
		
		evt = window.event;
		var url = evt.srcElement;
		// console.log(evt.srcElement);
	}*/

	evt = evt || window.event;
	var url = evt.target ? evt.target : evt.srcElement;
	var url = evt.srcElement ? evt.srcElement : evt.target;

	// 设置弹出的信息框的坐标位置
	xPos = parseInt(evt.clientX);
	yPos = parseInt(evt.clientY);

	// Xhr设置
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject('Microsoft.XMLHTTP')
			} catch(e) {
				console.log(e);
			}
		}
	}

	// 检查xhr是否创建成功
	// 创建成功，进行发送和接收数据
	if (xhr) {
		xhr.onreadystatechange = showContents;
		xhr.open('GET', url, true);
		xhr.send(null);
	}
	else {
		alert("Sorry, but I couldn't create an XMLHttpRequest")
	}

}

// 不可鼠标移出元素不可见
function hidePreview() {
	document.getElementById('previewWin').style.visibility = 'hidden';
}

function showContents() {
	var preWin = document.getElementById('previewWin');

	// 回应存在，处理回应
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			preWin.innerHTML = xhr.responseText;
		}
		else {
			preWin.innerHTML = "There was a problem with the request " + xhr.status;
		}

		preWin.style.top = yPos + 2 + 'px';
		preWin.style.left = xPos + 2 + 'px';
		preWin.style.visibility = 'visible';
		
		preWin.onmouseout = hidePreview;		// 对<a>进行对该元素的隐藏，可能因此不能复制该文本内容
	}
}


















































































































































































































