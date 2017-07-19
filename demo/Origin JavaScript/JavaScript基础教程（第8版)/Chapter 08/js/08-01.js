// 当浏览器探测到一个事件时，比如用鼠标单击或按键，
// 它可以触发与这个事件相关联的JavaScript 对象，这些对象称为事件处理程序（event
// handler）。

// 处理窗口事件

// 当用户执行某些会影响整个浏览器窗口的操作时，就会发生窗口事件。最常见的窗口事件是通过
// 打开某个网页来加载窗口。还有在窗口关闭、移动或转到后台时触发事件处理程序的事件。

// 常常会发现使用点号语法将事件处理程序与一个对象连接起来是有意义的
// window.onfocus
// window.onload
// document.onmousedown

// onload事件：。当用户进入页面而且所有页面元素都完成加载时，就会触发这个事件。

// 如果在加载页面时需要进行多个操作，那么应该怎么做？

// 多重onload 示例的HTML

// 使用新的addOnload()函数设置多重onload属性

addOnload(initOne);
addOnload(initTwo);
addOnload(initThree);

/*window.onload = function () {
	
	initOne();
	initTwo();
	initThree();
}*/


function addOnload(newFunction) {
	var oldOnload = window.onload;

	// 类型检查，是否window已经绑定了function
	// 如果已绑定，那么执行已经绑定的函数，然后执行插入的函数
	// 如果没有绑定，那么将插入的函数绑定到window.onload
	if (typeof(oldOnload) == 'function') {
		window.onload = function () {
			if (oldOnload) {
				oldOnload();
			}
			newFunction();
		}
			
	}
	else {
		window.onload = newFunction;	// 多加了一个括号，加括号是调用，不是绑定
	}
}

// #pageBody背景色设置为#00f
function initOne() {
	document.getElementById('pageBody').style.backgroundColor = '#00f';
}

// #pageBody { color: #f00; }
function initTwo() {
	document.getElementById('pageBody').style.color = '#f00';
}


// h1{
// 	border: 5px green solid;
// 	padding: 25px;
// 	background-color: #FFF;
// }
function initThree() {
	var allTag = document.getElementsByTagName('*');

	for (let i = 0; i < allTag.length; i++) {
		if (allTag[i].nodeName == 'H1') {
			allTag[i].style.border = '5px green solid';
			allTag[i].style.padding = '25px';
			allTag[i].style.backgroundColor = '#FFF';
		}
	}
}




// 如果想让一个onload 处理程序执行多个操作，最简单的方法是创建一个执行所有操作的函数，
// 然后让onload 处理程序调用这个函数。但是，要确保每个函数都返回。

// 如果其中一个文件
// 直接设置了window.onload，但是每次你都在此之后调用addOnload()，那么不会有问题。但是，
// 如果在设置window.onload 之后（无论是直接设置，还是通过addOnload()），再设置window.onload，
// 原来设置的函数就会丢失。

// 这个脚本在一定程度上基于Simon Willison（simonwillison.net）的一个脚本，在本书中使用它
// 已经得到了Simon 的许可。










