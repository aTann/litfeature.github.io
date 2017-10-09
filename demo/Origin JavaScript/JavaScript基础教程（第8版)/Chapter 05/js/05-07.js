
// 打开新窗口
// 开发人员可能希望在不干扰用户正在访问的页面的前提下，通过打开一个新窗口来为用户显示一
// 些附加的信息。

window.onload = newWinLinks;

function newWinLinks() {
	for (var i = 0; i < document.links.length; i++) {
		if (document.links[i].className == 'newWin') {
			document.links[i].onclick = newWindow;
		}
	}
}

function newWindow() {
	var catWindow = window.open('images/pixel1.jpg', 'catWin', 'resizable=no,width=350,height=260');
	return false;
}






























