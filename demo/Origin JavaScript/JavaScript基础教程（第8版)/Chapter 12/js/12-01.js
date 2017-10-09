
window.onload = initAll;

function initAll() {
	var allLinks = document.getElementsByTagName('a');
	
	for (var i = 0; i < allLinks.length; i++) {
		if (allLinks[i].className.indexOf('menuLink') > -1) {
			allLinks[i].onclick = toggleMenu;
		}
	}
}


function toggleMenu(evt) {

	evt.preventDefault();
	
	// file:///D:/Web-Frontend/JavaScript/Origin%20JavaScript/JavaScript%E5%9F%BA%…%80%E6%95%99%E7%A8%8B%EF%BC%88%E7%AC%AC8%E7%89%88)/Chapter%2012/menu1.html
	// 我们需要menu1部分内容
	console.log(this.href);
	var startMenu = this.href.lastIndexOf('/') + 1;
	var stopMenu = this.href.lastIndexOf('.');

	var thisMenuName = this.href.substring(startMenu, stopMenu);
	var thisMenu = document.getElementById(thisMenuName).style;

	if (thisMenu.display == 'block') {
		thisMenu.display = 'none';
	}else {
		thisMenu.display = 'block';
	}
	
	// console.log(window.getComputedStyle(document.getElementById(thisMenuName),null));
	// 原生js获取元素样式 - http://www.cnblogs.com/xiyangbaixue/p/4001531.html - 夕阳白雪
	return false;
}

