// 还可以让几个不同的图像触发同一个翻转器
// 将鼠标移动到其中一个图像上时，就会显示对这个图像的描述。

window.onload = rolloverInit;

// <a>做处理
function rolloverInit() {
	for (var i = 0; i < document.links.length; i++) {
		var linkObj = document.links[i];
		if (linkObj.className) {
			var imgObj = document.getElementById(linkObj.className);
			if (imgObj) {
				setupRollover(linkObj, imgObj);
			}
		}
	}
};



function setupRollover(thisLink, textImage) {
	
	thisLink.imgToChange = textImage;
	thisLink.onmouseout = function () {
		this.imgToChange.src = this.outImage.src;
	};
	thisLink.onmouseover = function () {
		this.imgToChange.src = this.overImage.src;	
	};

	thisLink.outImage = new Image();
	thisLink.outImage.src = textImage.src;

	thisLink.overImage = new Image();
	thisLink.overImage.src = 'images/' + thisLink.id + 'Text.gif';

};



































