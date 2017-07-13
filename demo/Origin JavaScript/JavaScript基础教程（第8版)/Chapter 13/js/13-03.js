
window.onload = initAll;

var xhr = false;

function initAll() {
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXobject('Microsoft XMLHTTP');
			} catch(e) {
				// statements
				console.log(e);
			}
		}
	}

	if (xhr) {
		getPix();
	}
	else {
		alert("Sorry, but I couldn't create an XMLHttpRequest");
	}
}

function getPix() {
	// 与上面两个对比，对换了.open()与onreadystatechange()的顺序
	// 以此来解决Ajax缓存的缺点问题
	// 但，好像还是每次都下载一次XML
	xhr.open('GEt', "flickrfeed.xml", true);
	xhr.onreadystatechange = showPictures;
	// xhr.open('POST', "flickrfeed.xml", true);
	xhr.send(null);
	setTimeout(getPix, 5 * 1000);	// 自动刷新
}

function showPictures() {
	var tempText = document.createElement('div');

	if (xhr.readyState == 4 ) {
		if (xhr.status == 200) {

			var allImages = xhr.responseXML.getElementsByTagName('content');
			var randomImg = Math.floor(Math.random() * allImages.length);

			tempText.innerHTML = getPixVal(allImages[randomImg]);
			var thisImg = tempText.getElementsByTagName('p')[1];
			document.getElementById('pictureBar').innerHTML = thisImg.innerHTML;
		}
		else {
			alert('There was a problem with the request ' + xhr.status);
		}
	}

	// 因为我们已经得到了XML 数据，所以可以使用它的textContent 属性（也可能是text 属性）获
	// 得节点的文本。我们希望找到其中的所有段落——应该有两个段落。
	function getPixVal(inVal) {
		return (inVal.textContent) ? inVal.textContent : inVal.text;
	}
}

// 你可能会觉得奇怪：这个脚本为什么每次都读取同一个
// XML 文件。如果这个文件没有改动，那么为什么不直接使
// 用第一次获得的变量中的数据？如果你还记得13.3 节补
// 充内容“获得数据”中提到的技术，就会意识到XML 文
// 件随时都可能发生改动。假设你的服务器端程序每几分钟
// 创建一次XML 文件的新版本，为什么用户需要等待才能
// 看到最新的照片呢？这样，用户就能及时地看到它们。
//  如果采用刚才提到的方式，就很可能遇到本章前面提到的
// Ajax 缺点：缓存。不同的浏览器（以及不同的版本和平台）
// 都有自己独特的缓存机制，通过修改前面讨论的请求首
// 部，可以解决大多数浏览器（不同版本、不同平台）的缓
// 存机制。许多人推荐的另一个解决方案是将GET 改为POST。
// 我们发现另一个方法也是有效的：像步骤1 中那样，对换
// 脚本13-9 中open()和onreadystatechange 的次序。