// Iframe 的使用

window.onload = initLinks;

function initLinks() {
	for (var i = 0; i < document.links.length; i++) {
		document.links[i].onclick = writeContent;
		document.links[i].thisPage = i + 1;
	}
}


function writeContent() {
	var newText = '<h1> You are now looking at Example ' + this.thisPage + '.<\/h1>'
	document.getElementById('icontent').contentWindow.document.body.innerHTML = newText;
	return false;
}
// 为什么第2 步中斜杠（“/”）前面会有反斜杠（“\”）？根据标准，浏览器可能会把结束标签的
// 起始字符（“</”）解析为一行的结束。反斜杠的作用就是跳过斜杠，让我们在编写HTML 的
// 时候不会报错。

