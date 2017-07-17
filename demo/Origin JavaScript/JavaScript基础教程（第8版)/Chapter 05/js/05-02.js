
// 设置目标
// iframe是一种内联框架。
// 它是一种可以嵌入到常规HTML页面中的框架，并非必须置于框架集之内。




window.onload = initLinks;

function initLinks() {
	for (var i = 0; i < document.links.length; i++) {
		// console.log(document.links[i].target);	// (空白）
		document.links[i].target = "#icontent";
	}
}

// 在接下来的示例中，我们会看到一份常规的HTML页面，其中包含一小块区域，即iframe。在主
// 内容区域的链接可以通过目标区域作用于iframe。要使用HTML加载iframe，可以用<a>标签的target
// 特性。

// 不过很多网站使用的仍然是XHTML，如果开发人员要在XHTML Strict下使用iframe的话，设置
// target只能通过JavaScript。这是因为XHTML Strict不支持target特性，开发人员必须自行设置目标才
// 能更新iframe。





















