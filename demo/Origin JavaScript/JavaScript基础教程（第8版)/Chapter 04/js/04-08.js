// 如何将循环广告条转换为真正可单击的广告条
// 
 
window.onload = initBannerLink;

var thisAd = 0;

function initBannerLink() {
	if (document.getElementById('adBanner').parentNode.tagName == 'A') {
		document.getElementById('adBanner').parentNode.onclick = newLocation;
	};

	rotate();
};


function newLocation() {
	var adUrl = new Array('negrino.com', 'sum.com', 'microsoft.com');
	// 利用thisAd来控制href的调换
	document.location.href = 'http://www.' + adUrl[thisAd];
	return false;
};


function rotate() {
	var adImages = new Array('images/banner1.gif', 'images/banner2.gif', 'images/banner3.gif');

	thisAd++;
	if (thisAd == adImages.length) {
		thisAd = 0;
	};

	document.getElementById('adBanner').src = adImages[thisAd];

	setTimeout(rotate, 3 * 1000);
}





























