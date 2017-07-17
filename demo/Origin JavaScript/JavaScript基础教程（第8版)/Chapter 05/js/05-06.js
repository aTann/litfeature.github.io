
// 在文档之间共享函数
// 只要主窗口和iframe都来自同样的域，那么它们共享单个外部JavaScript文件是非常方便的。
// 我们将通过iframe加载外部JavaScript文件来演示它如何被主窗口调用


var bannerArray = new Array('images/redBanner.gif', 'images/greenBanner.gif', 'images/blueBanner.gif')

window.onload = initLinks;

function initLinks() {
	for (var i = 0; i < parent.document.links.length; i++) {
		parent.document.links[i].onclick = setBanner;
	}
	setBanner();
};


function setBanner() {
	var randomNum = Math.floor(Math.random() * bannerArray.length);

	parent.document.getElementById('adBanner').src = bannerArray[randomNum];
	return false;	
};











