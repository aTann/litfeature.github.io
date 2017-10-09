
window.onload = initAll;

var xhr = false;

function initAll() {
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXobject('Microsoft.XMLHTTP');
			} catch(e) {
				// statements
				console.log(e);
			}
		}
	}

	if (xhr) {
		xhr.onreadystatechange = showPictures;
		xhr.open('GEt', "flickrfeed.xml", true);
		xhr.send(null);
	}
	else {
		document.getElementsById('pictureBar').innerHTML = "Sorry, but I couldn't create an XMLHttpRequest";
	}
}


function showPictures() {
	var tempDiv = document.createElement('div');
	var tempText = document.createElement('div');

	if (xhr.readyState == 4 ) {
		if (xhr.status == 200) {

			var allImages = xhr.responseXML.getElementsByTagName('content');

			// 从XML获取图片缩略图
			for (var i = 0; i < allImages.length; i++) {
				tempText.innerHTML = getPixVal(allImages[i]);
				tempDiv = tempText.getElementsByTagName('p');

				// innerHTML 可以保留标签
				// 两个段落，第一个段落时标题
				// 第二个段落时图片及其链接
				var theText = tempDiv[1].innerHTML;
				// 更改图片大小
				theText = theText.replace(/240/g, '75');
				theText = theText.replace(/180/g, '75');
				theText = theText.replace(/_m/g, '_s');
				document.getElementById('pictureBar').innerHTML += theText;
			}

		}
		else {
			alert('There was a problem with the request ' + xhr.status);
		}
	}

	// 因为我们已经得到了XML 数据，所以可以使用它的textContent 属性（也可能是text 属性）获
	// 得节点的文本。我们希望找到其中的所有段落——应该有两个段落。
	function getPixVal(inVal) {
		// console.log('inVal.innerHTML: ' + inVal.innerHTML);
		// console.log('inVal.textContent: ' +inVal.textContent);		// .textContent将HTML中转义码呈现出来
		// console.log('inVal.text: ' +inVal.text);
		return (inVal.textContent) ? inVal.textContent : inVal.text;
	}


}


// Web 2.0 网站的优点之一是，它们理解人们
// 希望访问数据——不只是他们自己的数据，
// 而且包括别人的数据（如果数据的主人同意
// 将数据公开的话）。


// 脚本只能读取它所在的服务器上的文件。
// 可以让服务器上的程序定期运行，获得一个XML 文件，然后将它存储在本地。
// 在某些情况下可以使用目标服务器本身驻留的脚本，脚本可以读取自己服务器上的文件，然后把结果返回给用户
