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
	// 创建Array是有两个需要改变的：
	// 1）textImg
	// 2）linkImg
	thisLink.imgToChange = new Array();
	thisLink.outImage = new Array();
	thisLink.overImage = new Array();

	thisLink.onmouseout = rollOut;
	thisLink.onmouseover = rollOver;
	
	// 1)textImg
	thisLink.imgToChange[0] = textImage;
	thisLink.outImage[0] = new Image();
	thisLink.outImage[0].src = textImage.src;

	thisLink.overImage[0] = new Image();
	thisLink.overImage[0].src = 'images/' + thisLink.id + 'Text.gif';

	// 2) linkImg
	var rolloverObj = document.getElementById(thisLink.id + 'Img');
	if (rolloverObj) {
		thisLink.imgToChange[1] = rolloverObj;

		thisLink.outImage[1] = new Image();
		thisLink.outImage[1].src = rolloverObj.src;

		thisLink.overImage[1] = new Image();
		thisLink.overImage[1].src = 'images/' + thisLink.id + '_on.gif';
	}

};

function rollOut() {
	for (var i = 0; i < this.imgToChange.length; i++) {
		this.imgToChange[i].src = this.outImage[i].src;
	}
};


function rollOver() {
	for (var i = 0; i < this.imgToChange.length; i++) {
			this.imgToChange[i].src = this.overImage[i].src;
		}	
};

// 利用<a>做onmouseout和onmouseover操作处理，
// 利用img的alt给予说明


































