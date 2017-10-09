
// 隐藏和显示层

window.onload = initAdvert;

function initAdvert() {
	var adBox = 'annoyingAdvert';

	document.getElementById(adBox).style.display = 'block';
	document.getElementById('closeBox').onclick = function () {
		document.getElementById(adBox).style.display = 'none';
	}
}


// jQuery中会有状态记录，恢复状态时候可以再用




