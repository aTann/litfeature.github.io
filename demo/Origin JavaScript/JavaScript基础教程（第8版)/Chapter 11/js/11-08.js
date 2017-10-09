
window.onload = initAdvert;

function initAdvert() {
	var adBox = 'annoyingAdvert';

	document.getElementById(adBox).style.display = 'block';
	document.getElementById(adBox).onmousemove = slide;
	document.getElementById('closeBox').onclick = function () {
		document.getElementById(adBox).style.display = 'none';
	}
}

// 从坐往右移动
function slide() {
	var adBox = 'annoyingAdvert';

	// 限制不能出屏幕宽度 - 150
	if (nextPos(adBox) <= (document.body.clientWidth - 150)) {
		document.getElementById(adBox).style.left = nextPos(adBox) + 'px';
		setTimeout(slide, 100);
	}

	// 获取当前left坐标+1
	function nextPos(elem) {
		return document.getElementById(elem).offsetLeft + 1;
	}
}

