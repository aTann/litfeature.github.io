

window.onload = initAll;

function initAll() {
	var allLinks = document.getElementsByTagName('a');

	for (var i = 0; i < allLinks.length; i++) {
		if (allLinks[i].className.indexOf('menuLink') > -1) {
			allLinks[i].onmouseover = toggleMenu;
			allLinks[i].onclick = clickHandler;
		}
	}
}

// 对原先的函数进行改写，使之可以达到onclick和onmouseover之间同“基类”目的

// 点击事件
function clickHandler(evt) {
	// 检查是否有事件对象——也就是evt 是否存在
	if (evt) {  // 该事件也可以用enter触发
		// IE11也进入这个判断里面
		// 如果它是字符串，就把事件和它的目标传递给toggleMenu()
		if (typeof(evt.target) == 'string') {
			// console.log(evt.target);
			toggleMenu(evt, evt.target);
		
		// 如果target 属性不是字符串，就通过调用toString()方法把它转换为字符串，
		// 然后使用这个字符串（和evt）作为toggleMenu()的参数。
		}else {
			// console.log(evt.target.toString());
			toggleMenu(evt, evt.target.toString());
		}
	}else {

		toggleMenu(evt, window.event.srcElement.href);
	}

	return false;
}

function toggleMenu(evt, currMenu) {
	// 检测arguments  参数数量
	if(toggleMenu.arguments.length < 2){
		var currMenu = this.href;
	}

	var startMenu = currMenu.lastIndexOf('/') + 1;
	var stopMenu = currMenu.lastIndexOf('.');
	var thisMenuName = currMenu.substring(startMenu, stopMenu);

	var thisMenu = document.getElementById(thisMenuName);
	thisMenu.style.display = 'block';

	thisMenu.parentNode.className = thisMenuName;
	thisMenu.parentNode.onmouseout = function(){
		document.getElementById(this.className).style.display = 'none';
	}

	thisMenu.parentNode.onmouseover = function () {
		document.getElementById(this.className).style.display = 'block';
	}

}





