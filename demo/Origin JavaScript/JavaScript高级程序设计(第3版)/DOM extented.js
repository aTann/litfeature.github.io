

// 11、DOM 扩展

// DOM 的两个主要的扩展是 Selectors API(选择符 API) 和 HTML5，
// 这两个扩展都源自开发社区，将某些常见做法及 API 标准化一直是众望所归。
// 另外一个不那么引人瞩目的 Element Traversal (元素遍历)


// Selectors APILevel 1 核心： querySelector() 和 querySelectorAll().

//  querySelector()
//  arguments：CSS 选择符
//  return：与该模式匹配的第一个元素，如果没有找到匹配的元素，返回 null。
// 能调用的类型：Document、DocumentFragment、Element

// querySelectotAll()
// arguments: CSS 选择符
// return: 返回一个带有 属性 和 方法 的 NodeList 实例，底层实现类似一组元素的快照，非不断对文档进行搜索的动态查询
// 			避免使用NodeList 对象通常会引起的大多数性能问题。

// 能调用的类型：Document、DocumentFragment、Element


// Selectors API Level2 新增：matchesSelector()
// matchesSelector()
// arguments: CSS 选择符
// return：boolean，匹配 --> true，不匹配 --> false

// 在取得某个元素引用的情况下，使用这个方法能够方便地检测它是否会被 querySelector() 或 querySelectorAll() 方法返回。


// 元素遍历
// 
/*
Element Traversal API 为DOM元素添加了以下 5 个属性。
 childElementCount：返回子元素（不包括文本节点和注释）的个数。
 firstElementChild：指向第一个子元素；firstChild 的元素版。
 lastElementChild：指向最后一个子元素；lastChild 的元素版。
 previousElementSibling：指向前一个同辈元素；previousSibling 的元素版。
 nextElementSibling：指向后一个同辈元素；nextSibling 的元素版。
*/


// HTML5 
// 与类相关的扩充

// getElementsByClassName()
// argument: 一个包含一或多个类名的字符串
// return: 带有指定类的所有元素的 NodeList 
// NodeList --> 性能问题

// classList 属性，所有元素都有
// 新集合类型 DOMTokenList 的实例
// classList 方法：
// 		add(value)：将给定的字符串值添加到列表中。如果值已经存在，就不添加了。
//  	contains(value)：表示列表中是否存在给定的值，如果存在则返回true，否则返回false。
//  	remove(value)：从列表中删除给定的字符串。
//  	toggle(value)：如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。


// 焦点管理
// document.acticeElement 属性
// 元素获得焦点的方式有页面加载、用户输入（通常是通过按Tab 键）和在代码中调用focus()方法。


// 默认情况下，文档刚刚加载完成时，document.activeElement 中保存的是document.body 元素的引用。文档加载期间，document.activeElement 的值为 null。

// 新增了 document.hasFocus() 确定文档是否获得了焦点
// return: true / flase

/* 

	通过检测文档是否获得了焦点，可以知道用户是不是正在与页面交互。
	查询文档获知哪个元素获得了焦点，以及确定文档是否获得了焦点，这两个功能最重要的用途是提高Web 应用的无障碍性。
	无障碍 Web 应用的一个主要标志就是恰当的焦点管理，而确切地知道哪个元素获得了焦点是一个极大的进步，至少我们不用再像过去那样靠猜测了。

*/



// HTMLDocument 的变化

// readyState 属性
// loading, 正在加载文档
// complete， 已经加载完文档
	/*
	使用document.readyState 的最恰当方式，就是通过它来实现一个指示文档已经加载完成的指示器。在这个属性得到广泛支持之前，要实现这样一个指示器，必须借助onload 事件处理程序设置一个标签，表明文档已经加载完毕。document.readyState 属性的基本用法如下。
	
	if (document.readyState == "complete"){
		//执行操作
	}
*/

// 兼容模式
// document.compatMode: 检测页面的兼容模式就成为浏览器的必要功能
// 标准模式：document.compatMode = 'CSS1Compat'
// 混杂模式: document.compatMode = 'BackCompat'
/*
if (document.compatMode == "CSS1Compat"){
	alert("Standards mode");
} else {
	alert("Quirks mode");
}
*/

// head 属性
// document.head 属性，引用文档的 <head> 元素
// 要引用文档的<head>元素，可以结合使用这个属性和另一种后备方法。
// var head = document.head || document.getElementsByTagName("head")[0];

// 字符集属性 document.charset
// charset 属性，表示文档中实际使用的字符集，也可以指定新字符集。
// 默认情况下，这些属性的值为 "UTF-16" 
// <meta> 元素、响应头部或直接设置 charset 属性修改这个值

/* 

	另一个属性是defaultCharset，表示根据默认浏览器及操作系统的设置，当前文档默认的字符集
	应该是什么。如果文档没有使用默认的字符集，那charset 和defaultCharset 属性的值可能会不一
	样，例如：
if (document.charset != document.defaultCharset){
	alert("Custom character set being used.");
}
 */


// 自定义数据属性 前缀 data-
// 目的是为元素提供与渲染无关的信息，或者提供语义信息。这些属性可以任意添加、随便命名，只要以data-开头即可
// <div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>

// dataset 访问自定义属性的值
// DOMStringMap 实例，一个名值对儿的映射
// 映射中，每个 data-name 的形式的属性都会有一个对应的属性，不过属性名没有 data- 前缀
/*

var dataDiv = document.getElementById('data');
var dataset = dataDiv.dataset;
console.log(dataset['appid']);	// 12345
console.log(dataset['appId']);	// undefined
console.log(dataset.appid);		// 12345
console.log(dataset.appId);		// undefined


console.log(dataset);			
// DOMStringMap {appid: "12345", myname: "Nicholas"}

// Map - MDN web docs
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map


"
	Note also that an HTML data-attribute and its corresponding DOM dataset.property do not share the same name, but they are always similar:

    The name of a custom data attribute in HTML begins with data-. It must contain only letters, numbers and the following characters: dash (-), dot (.), colon (:), underscore (_) -- but NOT any ASCII capital letters (A to Z).
    The name of a custom data attribute in Javascript is the name of the same HTML attribute but in camelCase and with no dashes, dots, etc.
	
	from: HTMLElement.dataset - MDN web docs
		  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
"

*/

