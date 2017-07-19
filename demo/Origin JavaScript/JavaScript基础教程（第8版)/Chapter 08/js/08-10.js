
// 键事件处理

// onkeydown事件
// 用户按下适当的键时执行相应的操作

// 通过按键盘上的左右箭头键，可以查看标准的幻灯片

// 将keyHit()函数注册为onkeydown 事件处理程序。
document.onkeydown = keyHit;

// 全局变量初始化thisPic
var thisPic = 0;

// 击键事件处理
function keyHit(evt) {
	var myPix = new Array('images/callisto.jpg', 'images/europa.jpg', 'images/io.jpg', 'images/ganymede.jpg');
	var imgCt = myPix.length - 1;
	// 键值
	// 如果不知道键值，可以在声明thisKey变量之后，利用console.log()/alert()显示
	
	var ltArrow = 37;
	var rtArrow = 39;

	// 击键接口
	/*if (evt) {
		var thisKey = evt.which;
	}
	else {
		var thisKey = window.event.keyCode;
	}*/

	var thisKey = evt.which || window.event.keyCode;

	// 如果不知道键值，可以在声明thisKey变量之后，利用console.log()/alert()显示
	// alert(thisKey);

	if (thisKey == ltArrow) {
		chgSlide(-1);
		console.log(11);
	}
	else if(thisKey == rtArrow){
		chgSlide(1);
	}

	return false;

	function chgSlide(direction) {
		thisPic = thisPic + direction;
		if (thisPic > imgCt) {
			thisPic = 0;
		}

		if (thisPic < 0) {
			thisPic = imgCt;
		}

		document.getElementById('myPicture').src = myPix[thisPic];
	}

}

// onkeyup事件
// onkeyup 事件处理程序与onkeydown 处理程序相同，唯一的差异是，它是在用户已经按下键并且正在释放这个键的时候触发的。


// onkeypress事件
// 当用户按下一个键和已经释放这个键的时候，触发onkeypress 事件。


