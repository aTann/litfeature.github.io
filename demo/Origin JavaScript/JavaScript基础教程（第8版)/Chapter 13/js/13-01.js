
// Ajax
// 这个JavaScript 脚本从服务器获得文件
// Ajax调用的缺点之一是它们可能被缓存。

window.onload = initAll;

var xhr = false;

function initAll() {
	document.getElementById('makeTextRequest').onclick =  getNewFile;
	document.getElementById('makeXMLRequest').onclick = getNewFile;
}

function getNewFile() {
	makeRequest(this.href);
	return false;
}


function makeRequest(url) {
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	else {
		// IE 5.5 和IE 6 使用ActiveX 控件创建XMLHttpRequest 对象
		if (window.ActiveXobject) {}
			try {
				xhr = new ActiveXObject('Microsoft.XMLHTTP');
			} catch(e) {
				
				console.log('Failed to create xhr');
			}
			
	}

	if (xhr) {
		// 每当xhr.readystate属性发生改变就会触发该处理程序
		// 如果先检查window.ActiveXObject，那么IE 7 及以上版本也会通过这个测试，所以会进入错误的代码路径。
		xhr.onreadystatechange = showContents;
		// 3个参数：一个HTTP请求方法（例如"GET","POST"或者"HEAD"）
		// 服务器上一个文件的URL
		// 和一个布尔值，这个布尔值告诉服务器请求是否异步（我们是否会等待请求完成）
		xhr.open('GET', url, true);
		// 用send()发送创建的请求，如果发送POST，就传递这里给出的参数
		xhr.send(null);   // 需要服务器辅助，不然会出现错误 "Cross origin requests are only supported for HTTP."
	}
	// 无法创建xhr，输出错误信息
	else {
		document.getElementById('updateArea').innerHTML = "Sorry, but I couldn't create an XMLHttpRequest";
	}

}

function showContents() {
	// readyState = 4， 意义：完成，对象已经完成初始化
	if (xhr.readyState = 4) {
		// status 服务器返回的状态
		// status = 200， 表示一切正常
		// status = 404, 找不到文件
		if (xhr.status == 200) {
			// 返回的是XML，XML是否有节点内容检查
			// 如果数据是XML，responseXML 属性就包含数据。然而，responseXML 属性也包含不是XML 的数据。
			
			if (xhr.responseXML && xhr.responseXML.childNodes.length > 0) {
				var outMsg = getText(xhr.responseXML.getElementsByTagName('choices')[0]);
			}
			// 其他返回
			else {
				var outMsg = xhr.responseText;
			}
		}
		else {
			var outMsg = "There was a problem with the request " + xhr.status;
		}
		document.getElementById('updateArea').innerHTML = outMsg;
	}

	// 其作用是检查所有传入的参数是否包含textContent 属性。如果包含，就返回
	// textContent，否则返回其text 属性。
	function getText(inVal) {
		if (inVal.textContent) {
			return inVal.textContent;
		}

		return inVal.text;
	}

}

// Ajax调用的缺点之一是它们可能被缓存。也就是说，应用程序看似与服务器进行通信并且获得
// 新数据，但是它实际上只是查看以前读取的数据。如果是这种情况，设置请求首部会有帮助。
// 添加以下请求首部可以迫使服务器提供最新数据：
// xhr.setRequestHeader("If-Modified-Since", "Wed, 15 Jan 1995 01:00:00 GMT");
// xhr.setRequestHeader("Cache-Control","no-cache");
// xhr.setRequestHeader("Cache-Control","must-revalidate");
// xhr.setRequestHeader("Cache-Control","no-store");
// xhr.setRequestHeader("Pragma","no-cache");
// xhr.setRequestHeader("Expires","0");
// 

// 通过覆盖MIME类型，可以迫使调用返回XML数据：
// xhr.overrideMimeType("text/xml");
// 但是，对于某些浏览器和配置，这可能会造成问题，所以要谨慎使用



// 如果需要进一步检查实际获得的微软ActiveX对象的版本，那么可以使用下面的代码片段：
// if (window.ActiveXObject) {
// try {
// xhr = new ActiveXObject("Msxml2.XMLHTTP");
// }
// catch (e) {
// try {
// xhr = new ActiveXObject("Microsoft.XMLHTTP");
// }
// catch (e) { }
// }
// 这个方法首先尝试使用XMLHttpRequest 对象的IE 6 版本（Msxml2.XMLHTTP），如果找不到
// 这个对象版本，就尝试老版本。但是，Microsoft.XMLHTTP 应该会提供PC 上可用的最新版本，
// 所以我们只在本章中使用这样的代码——因为老代码最终会废弃的。































































































