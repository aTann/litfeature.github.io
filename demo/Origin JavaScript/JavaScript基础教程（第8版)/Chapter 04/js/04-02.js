// 需要图像时候立即出现，不能有从服务器下载的延迟
// 需要JavaScript预先缓存所有的图片

window.onload = rolloverInit;

function rolloverInit() {
	for (var i = 0; i < document.images.length; i++) {
		// if (document.images[i].parentNode.nodeValue = 'A') {
		if (document.images[i].parentNode.tagName = 'A') {
			setupRollover(document.images[i]);
		}
	}
};

function setupRollover(thisImage) {
	thisImage.outImage = new Image();
	thisImage.outImage.src = thisImage.src;
	thisImage.onmouseout = function () {
		this.src = this.outImage.src;
	};

	thisImage.overImage = new Image();
	thisImage.overImage.src = 'images/' + thisImage.id + '_on.gif';
	thisImage.onmouseover = function () {
		this.src = this.overImage.src;
	}	
};


// . 在为翻转器准备图像时，要确保所有GIF 图像或者PNG 图像都是不透明的。如果它们是透明
// 的，那么会透过透明的图像看到被替换掉的图像，这不是我们需要的效果。
// . 原图像和替换图像的尺寸应该相同。否则，一些浏览器会替你重新设置尺寸，而调整后的结果
// 可能不理想。
// . 在前面的示例中，当把鼠标移动到链接上时，翻转器会发挥作用。在这里，当把鼠标移动到图
// 像上时，翻转器会发挥作用——也就是说，onmouseover 和onmouseout 现在附在图像上，而不
// 是链接。尽管这两种方法往往产生同样的效果，但是有一个大的差异：一些比较老式的浏览器
// （Netscape 4 及更早的版本，IE 3 及更早的版本）在img 标签上不支持onmouseover 和onmouseout。
// . 你可能认为，因为HTML 页面上的所有标签都是小写的，所以tagName 应该与小写的a 进行比
// 较。但是，这不行。tagName 总是返回大写的值。
































