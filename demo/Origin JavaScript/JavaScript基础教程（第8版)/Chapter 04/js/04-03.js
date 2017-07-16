// 三体翻转器
// 
window.onload = rolloverInit;

function rolloverInit() {
	for (var i = 0; i < document.images.length; i++) {
			if (document.images[i].parentNode.tagName == 'A') {
				setupRollover(document.images[i]);
			};
		};
};

function setupRollover(thisImage) {
	thisImage.outImage = new Image();
	thisImage.outImage.src = thisImage.src;
	thisImage.onmouseout = function () {
		this.src = this.outImage.src;	
	};

	thisImage.clickImage = new Image();
	thisImage.clickImage.src = 'images/' + thisImage.id + '_click.gif';
	thisImage.onclick = function (event) {
		event.preventDefault();
		this.src = this.clickImage.src;
		// return false;	// 不执行跳转

	};

	thisImage.overImage = new Image();
	thisImage.overImage.src = 'images/' + thisImage.id + '_on.gif';
	thisImage.onmouseover = function () {
		this.src = this.overImage.src;
	}

};















