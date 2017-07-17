
// 创建动态iframe

// 当用户单击任意一个链接时，JavaScript向iframe写入新的代码。在这个示例中，显示的是页面的名称
// 以及当前session中用户访问页面的次数。

// 为了显示加载页面的次数，我们需要一种记录该信息的方法。在这里我们将会使用pageCount。
var pageCount = new Array(0, 0, 0, 0);

window.onload = initLinks;

function initLinks() {
	for (var i = 0; i < document.links.length; i++) {
		document.links[i].onclick = writeContent;
		document.links[i].thisPage = i + 1;
	}
}


function writeContent() {
	// 这行代码自增pageCount 数组，这样我们就可以跟踪到访问特定页面的次数了。
	pageCount[this.thisPage] ++;

	var newText = '<h1>You are now looking at Example ' + this.thisPage;
	newText += '.<br \/>You have been to this page ';
	newText += pageCount[this.thisPage] + ' times.<\/h1>';

	document.getElementById('icontent').contentWindow.document.body.innerHTML = newText;
	
	console.log(pageCount);

	return false;


}




















