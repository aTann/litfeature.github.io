// 从服务器获得数据

// JavaScript 文件缩短了，因为大多数工作由远程服务器完成

window.onload = initAll;
var imgDiv = '';
function initAll() {
	document.getElementById('pictureBar').innerHTML = imgDiv;
}

function jsonFlickrFeed(flickData) {
	for (var i = 0; i < flickData.items.length; i++) {
		imgDiv += '<img src = "';
		imgDiv +=  flickData.items[i].media.m.replace(/_m/g, '_s');
		imgDiv += '" alt="' + flickData.items[i].title + '">';
	}
}

// JSON 文件的片段。注意，它的大小约是XML 文件的一半，但是包含相同的数据

// JSON 格式本身是对象字面值的一个子集



































































































