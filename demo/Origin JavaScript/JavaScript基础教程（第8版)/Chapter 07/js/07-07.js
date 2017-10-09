

// 正则表达式是一种对文本字符串进行验证和格式化的极其强大的方式

// 正则表达式（regular expression，常常缩写为RegExp）是一种用特殊符号编写的模式，描述一个
// 或多个文本字符串。使用正则表达式匹配文本的模式，这样脚本就可以轻松地识别和操纵文本。

window.onload = rolloverInit;

function rolloverInit() {
	for (var i = 0; i < document.images.length; i++) {
		setupRollover(document.images[i]);
	}
}

function setupRollover(thisImage) {
	var re = /\s*_off\s*/;

	thisImage.outImage = new Image();
	thisImage.outImage.src = thisImage.src;
	thisImage.onmouseout = function () {
		this.src = this.outImage.src;
	}

	thisImage.overImage = new Image();
	thisImage.overImage.src = thisImage.src.replace(re, "_on");
	thisImage.onmouseover = function() {
		this.src = this.overImage.src;
	}

	thisImage.clickImage = new Image();
	thisImage.clickImage.src = thisImage.src.replace(re, '_click');
	thisImage.onclick = function () {
		this.src = this.clickImage.src;
		return false;
	}

	// 防止没有直接触发图片
	thisImage.parentNode.childImg = thisImage;
	thisImage.parentNode.onblur = function () {
		this.childImg.src = this.childImg.outImage.src;
		return false;
	}
	thisImage.parentNode.onfocus = function () {
		this.childImg.src = this.childImg.overImage.src;
		return false;
	}



}















