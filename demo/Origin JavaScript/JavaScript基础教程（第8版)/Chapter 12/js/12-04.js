
//带说明的幻灯片

window.onload = initAll;

var currImg = 0;
var captionText = [
	'Our ship, leaving Vancouver.',
	'We took a helicopter ride at our first port, Junear.',
	'The helicopter took us to Medenhall Glacier.',
	'The happy (and chilly) couple, on the glocier.',
	'Here\'s what our second stop, Ketchikan, looked like from the ship.',
	'we got to cruise through Glacier Bay. It was absolutely breathaking!',
	'In Shagway, we took a train up into the mountains, all the way to the Canadian Border.',
	'Looking back down at Skagway from the train.',
	'On a trip this romantic, I sholdn\'t have been surprised by a proposal, but I was(obvious, I said yes).',
	'It\' nice to go on vacation, but it\' nice to be home again, too.'
];

function initAll() {
	document.getElementById('imgText').innerHTML = captionText[0];
	document.getElementById('prevLink').onclick = function () {
		newSlide(-1);
	};
	document.getElementById('nextLink').onclick = function () {
		newSlide(1);	
	};
}

// 一个调用传递1，另一个调用传递-1，
// 这个参数让newSlide()知道移动的方向。

function newSlide(direction) {
	var imgCt = captionText.length;

	currImg = currImg + direction;
	if (currImg < 0) {
		currImg = imgCt - 1;
	}

	if (currImg == imgCt) {
		currImg = 0;
	}

	document.getElementById('slideshow').src = 'images/slideImg' + currImg + '.jpg';
	document.getElementById('imgText').innerHTML = captionText[currImg];
}














