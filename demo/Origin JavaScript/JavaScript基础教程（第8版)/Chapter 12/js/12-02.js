
// 1、遍历
// 2、寻找标记（标记自己在HTML属性中标记 || 利用其它标记组合或抽取获取标记，现在流行data-）
// 3、为标记内容添加绑定

// 添加下拉菜单

window.onload = initAll;

function initAll() {
	var allLinks = document.getElementsByTagName('a');

	for (var i = 0; i < allLinks.length; i++) {
		if (allLinks[i].className.indexOf('menuLink') > -1) {
			allLinks[i].onmouseover = toggleMenu;
			allLinks[i].onclick = function () {
				return false;
			}
		}
	}
}


function toggleMenu() {

	var startMenu = this.href.lastIndexOf('/') + 1;
	var stopMenu = this.href.lastIndexOf('.');

	var thisMenuName = this.href.substring(startMenu, stopMenu);

	// 指定id元素打开
	document.getElementById(thisMenuName).style.display = 'block';

	// a.menuLink 点过之后，为父元素添加thisMenuName作为className，
	// 只要在父元素中就会触发提取parent.className作为标记打开指定的id元素
	// 因为父元素包含着这些元素，只要在父元素中，就可以保证函数的触发
	this.parentNode.className = thisMenuName;
	this.parentNode.onmouseout = function () {
		document.getElementById(this.className).style.display = 'none';
	}

	this.parentNode.onmouseover = function () {
		document.getElementById(this.className).style.display = 'block';
	}

}





// 每个隐藏单位都是以下


/*
|------<div>
|	|
|	|---标题<a>
|	|
|	|---列表内容<ul>
			|-内容1<li>
			|-内容2<li>
			|-内容3<li>

*/