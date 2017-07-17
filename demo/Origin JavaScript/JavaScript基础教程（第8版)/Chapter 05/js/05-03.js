
// 用JavaScript 加载iframe

window.onload = initLinks;

function initLinks() {
	for (var i = 0; i < document.links.length; i++) {
		document.links[i].onclick = setContent;
	};
};


function setContent(event) {
	event.preventDefault();
	// 使用该种方式不怎么安全，而且有部分浏览器不兼容，
	// 可以使用postMessage
	// https://stackoverflow.com/questions/25098021/securityerror-blocked-a-frame-with-origin-from-accessing-a-cross-origin-frame
	// https://stackoverflow.com/questions/29983786/blocked-a-frame-of-origin-null-from-accessing-a-cross-origin-frame-chrome
	// https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage

	document.getElementById("icontent").contentWindow.document.location.href = this.href;
	return false;
};


// 在Google里面会出现saft Error，Firefox和IE11不会出现错误
// Uncaught DOMException: Blocked a frame with origin "null" from accessing a cross-origin frame. at HTMLAnchorElement.setContent




































