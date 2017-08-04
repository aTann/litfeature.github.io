

// DOM(文档对象模型) 针对 HTML XML
// 描绘了一个层次化的节点树
// 脱胎于Netscape 及微软公司创始的DHTML（动态HTML）

// 不同节点层次

// 多层次节点
// 		不同类型：文档中不同信息及(或)标记
// 			特点
// 			数据
// 			方法

// 文档节点是根节点，其子节点称之为文档元素(如<html>)
// 文档元素是文档的最外层元素，文档中其他元素包含在文档元素中
// 每个文档只能有一个文档元素，HTML中，始终都是<html>，
// XML没有预定义的元素，任何元素都可能成为文档元素


//	Node类型

// DOM1级	Node接口，将由DOM中的所有节点类型实现。作为Node类型实现，
// 所有节点类型都继承自Node类型，都共享相同的基本属性和方法
// IE8-不兼容
// 
// nodeType属性，表明节点类型，由Node类型中定义的12个数值常量表示：
// 	  Node.ELEMENT_NODE(1)；
//  Node.ATTRIBUTE_NODE(2)；
//  Node.TEXT_NODE(3)；
//  Node.CDATA_SECTION_NODE(4)；
//  Node.ENTITY_REFERENCE_NODE(5)；
//  Node.ENTITY_NODE(6)；
//  Node.PROCESSING_INSTRUCTION_NODE(7)；
//  Node.COMMENT_NODE(8)；
//    Node.DOCUMENT_NODE(9)；
//  Node.DOCUMENT_TYPE_NODE(10)；
//  Node.DOCUMENT_FRAGMENT_NODE(11)；
//  Node.NOTATION_NODE(12)。

// 可以尝试
// IE9+
var someNode = document.getElementById('somenode');
/*if (someNode.nodeType == Node.ELEMENT_NODE) {
	alert('Node is an element. ');
}*/

// 使用节点类型的数字值进行与nodeType属性比较，兼容所有的浏览器
// IE8-
/*var someNode = document.getElementById('somenode');
if (someNode.nodeType == 1) {
	alert('Node is an element. ');
}*/

// nodeName/nodeValue
// 两个值完全取决于节点类型，
// HTML中，nodeName始终是标签名，nodeValue则为null
// 在使用两个值前，最好先检测一下节点类型
/*if (someNode.nodeType == 1) {
	// let value = someNode.nodeName; 		// nodeName的值是元素的标签名,HTML中大写如 DIV
	var value = someNode.tagName;
	alert(value);	// DIV
}*/

// 闹骚，模拟命名块模式，兼容IE8-
/*(function () {
	if (someNode.nodeType == 1) {
	var value = someNode.tagName;
	alert(value);	// DIV
}
})();*/

// 节点关系
// 文档书 家谱 关系
// 父子关系	childNodes/parentNode
// 同胞关系 previousSibling/nextSibling
// 首末节点 firstChild/lastChild
// 关系指针，只读

// 每个节点 都有一个 childNodes 属性，保存一个NodeList对象
// NodeList对象，类数组对象，保存一组有序的节点，可通过位置类访问节点，不是Array实例
// 基于DOM结构动态执行查询的结果(实时查询，又一次就查询遍历一次，一旦有改变马上得到反馈)
// NodeLits 	方括号、.item()访问，还有.length(长度)

var firstChild = someNode.childNodes[0];
// console.log(firstChild);
var secondChild = someNode.childNodes.item(1);
// console.log(secondChild);
var count = someNode.childNodes.length;
// console.log(count);	// IE8 : 4	IE11/GC/FF: 7

// 对arguments对象使用Array.prototype.slice()方法可以将其转换为数组
// 将NodeList对象转换为数组
// IE8-无效
/*var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes, 0);
console.log(arrayOfNodes);	// Array.prototype.slice: 'this' 不是 JavaScript 对象*/

// 兼容所有IE
function convertToArray(nodes) {
	var array = null;
	try {
		array = Array.prototype.slice.call(nodes, 0);
	} catch(ex) {
		
		array = new Array();
		// 在IE 中将NodeList 转换为数组，必须手动枚举所有成员
		for (var i = 0, len = nodes.length; i < len; i++) {
			array.push(nodes[i]);
		}
	}

	return array;
}


// parentNode: 父节点，包含在childNodes列表中所有节点都具有相同的父节点，
// 同袍节点	用列表中每个节点的previousSibling和nextSibling 属性，可以访问同一列表中的其他节点
// 第一个节点的previousSibling 属性值为null，而列表中最后一个节点的nextSibling 属性的值同样也为null

// 检测是第一个元素，或者是最后一个元素
/*(function () {
	var nodes = someNode.childNodes;
	for (var i = 0, len = nodes.length; i < len; i++) {
		var node = nodes[i];
		if (node.nextSibling === null) {
			alert("Last node in the parent's childNodes list. " + node.nodeName);
		} else if (node.previousSibling === null) {
			alert("First node in the parent's childNode list. " + node.nodeName);
		}

	}
		
})();*/


// 父节点与其第一个和最后一个节点存在特殊关系；
// 父节点的firstChild和lastChild属性，
// someNode.parentNode.firstChild = someNode.parentNode.childNodes[0] 
// someNode.parentNode.last = someNode.parentNode.childNodes[someNode.parentNode.length - 1]
// 只有一个节点 firstChild == lastChild
// 没有字节点 firstChild = lastChild = null

// hasChildNodes()	节点是否包含一个或多个节点（返回：true/false），比.length实用简单

// 所有节点都有属性： ownerDocument，属性指向表示整个文档的文档节点，归属它所在文档，
// 节点不能同时存在于两个或更多个文档中
// 不必再节点层次通过层层回溯到达顶端，而是直接访问文档节点

// console.log(someNode.ownerDocument);	// #document(然后可以展开整个文档)

// 所有节点类型继承自Node，但并不是所有节点都有子节点

// 操作节点
// 添加：appendChild()
// 插入：beforeInsert()
// 替换：replaceChild()
// 删除：removeChild()

// 添加：appendChild()：
// childNodes末尾添加，
// 添加节点后，childNodes 的新增节点、父节点及以前的最后一个子节点的关系指针都会相应地得到更新
// 返回新增的节点

/*// 向someNode里面添加一个<p>
var newNode = document.createElement('p');
var returnedNode = someNode.appendChild(newNode);
// 返回新增的节点
console.log(returnedNode == newNode);	// true
// 父节点及以前的最后一个子节点的关系指针都会相应地得到更新
console.log(someNode.lastChild == newNode);		// true
*/
// 节点转移，关系指针也会更改

/*
var returnedNode = someNode.appendChild(someNode.firstChild);
console.log(returnedNode == someNode.firstChild);	// false
console.log(returnedNode == someNode.lastChild);	// true
*/

// 插入：beforeInsert()	
// 两个参数：要插入的节点和作为参照的节点
// 插入后，变为参照节点的前一个同胞节点(previousSibling)
// 返回插入节点
// 参照为null，insertBefore()和appendChild()执行操作相同

var newText = document.createTextNode('我是一个插入的节点');
var newNode = document.createElement('p');
newNode.appendChild(newText);

/*// 参数节点为null，插入后成为最后一个节点
var returnedNode = someNode.insertBefore(newNode, null);
console.log(returnedNode == someNode.lastChild);	// true*/

/*// 插入后成为第一个子节点
var returnedNode = someNode.insertBefore(newNode, someNode.firstChild);
console.log(returnedNode == newNode);				// true
console.log(returnedNode == someNode.firstChild);	// true
*/

/*// 插入后到最后一个子节点前
var returnedNode = someNode.insertBefore(newNode, someNode.lastChild);
console.log(returnedNode == newNode);		// true
console.log(returnedNode == someNode.childNodes[someNode.childNodes.length - 2]);	// true
*/


// 替换：replaceChild()
// 接受的两个参数是：要插入的节点和要替换的节点
// 移除要替换的节点，插入的节点占据其位置
// 返回被移除的节点
var newText = document.createTextNode('我是一个替换的节点');
var newNode = document.createElement('p');
newNode.appendChild(newText);

// 替换第一个节点
// var returnedNode = someNode.replaceChild(newNode, someNode.firstChild);
/*我是一个Element node
		*/

// 替换最后一个节点
// var returnedNode = someNode.replaceChild(newNode, someNode.lastChild);
/*
	 */
// console.log(returnedNode);


// 删除：removeChild()
// 返回被移除的节点

/*// 移除第一个节点
var formerFirstChild = someNode.removeChild(someNode.firstChild);
// console.log(formerFirstChild);*/

/*// 移除最后一个子节点
var formerLastChild = someNode.removeChild(someNode.lastChild);
// console.log(formerLastChild);
*/
// cloneNode()	
// 节点副本创建
// 接受布尔值参数，
// true-深度复制：复制节点以及整个子节点树，
// false-浅复制：只复制节点本身
// 复制节点副本属于文档所有（其ownerDocument不变），但并没有为它指定父节点，"孤儿"节点
// 需要通过appendChild()/insertBefore()/replaceChild()添加到文档中

var deepClone = someNode.cloneNode(true);
// console.log(deepClone.childNodes.length);
// GC: 5

var shallowClone = someNode.cloneNode(false);
// console.log(shallowClone.childNodes.length);
// GC: 0

// cloneNode() 只复制特性、（在true情况下）子节点，
// 其他（添加到DOM节点中的JavaScript属性，例如，事件处理程序）不会复制
// IE前期的浏览器可能会复制事件处理程序，建议，复制前移除事件处理程序

// normalize()，唯一作用，处理文档树中的文字节点。
// 由于解析器的实现或DOM操作等原因，可能会出现文本节点不包含文本，
// 或者接连出现两个文本节点的情况
// 如果找到了空文本节点，则删除它；如果找到相邻的文本节点，则将它们合并为一个文本节点

/*// 在firstChild前面插入一个textNode
someNode.insertBefore(newText, someNode.firstChild);

console.log(someNode.childNodes.length);	// 8
someNode.normalize();
console.log(someNode.childNodes.length);	// 7

// normalize()需要在连续的两个或多个textNode情况下使用，
// 并不是把一个元素内的所有的textNode集合起来
*/


// 		Document：表示文档
// 	document对象是HTMLDocument(继承自Document类型)的一个实例，代表整个HTML页面
// 	document对象的一个属性，可以将其作为全局对象来访问
// 	nodeType = 9
// 	nodeName = #document
// 	nodeValue = null
// 	parentNode = null
// 	ownerDocument = null
// 	childNodes = DocumentType(最多一个)、Element(最多一个)、ProcessingInstruction、Comment

// Document 类型可以表示HTML 页面或者其他基于XML 的文档。
// 最常见的应用还是作为HTMLDocument 实例的document 对象。
// 通过这个文档对象，不仅可以取得与页面有关的信息，而且还能操作页面的外观及其底层结构。

/*在Firefox、Safari、Chrome 和Opera 中，可以通过脚本访问Document 类型的构
造函数和原型。但在所有浏览器中都可以访问HTMLDocument 类型的构造函数和原型，
包括IE8 及后续版本。*/

// 访问document子节点，
// 1）documentElement属性，该属性始终指向HTML 页面中的<html>元素
// 2）childNodes列表
/*
var html = document.documentElement;
console.log(html)	// <html lang="en">…</html>
console.log(html === document.childNodes[0]);	// false H5中	<!DOCTYPE html>
console.log(html === document.childNodes[1]);	// true H5中
console.log(html === document.firstChild);	// false H5中
console.log(document.firstChild);	// <!DOCTYPE html>
*/
/* HTML5代码示意
<!DOCTYPE html>
<html lang="en">
<head>
	<title>DOM</title>
</head>
<body>

</body>
</html>
*/

// HTMLDocument实例，有一个body属性，直接指向<body>元素
var body = document.body;
// console.log(body);

// 可能的子节点DocumentType		<!DOCUMENT>
var doctype = document.doctype;
// console.log(doctype);	// <!DOCTYPE html>  (html5)
// 
// 浏览器对document.doctype 的支持差别很大
// IE8-：错误解释为注释当做Comment节点，document.doctype=null
// IE9+、FF：存在文档类型声明，可作为文档第一个子节点，可以通过上面两种方法访问
// Safari、GC、Opera：同上


// 文档信息 
// 取得文档标题
var originalTitle = document.title;
// console.log(originalTitle);		// DOM

// 设置文档标题
document.title = 'New page title';
// console.log(document.title);	// New page title

// 网页请求相关的属性

// 取得完整的URL
var url = document.URL;
// console.log(decodeURIComponent(url));
// http://localhost/JavaScript高级程序设计(第3版)/DOM.html

// 取得域名，只有该属性可以设置，但非可以给domain设置任何值
// 如果URL 中包含一个子域名，例如p2p.wrox.com，那么就只能将domain 设置为"wrox.com"
// （URL 中包含"www"，如www.wrox.com 时，也是如此）。不能将这个属性设置为URL 中不包含的域，
// 如下面的例子所示。
// 假设页面来自p2p.wrox.com 域
// document.domain = "wrox.com"; // 成功
// document.domain = "nczonline.net"; // 出错！

var domain = document.domain;
// console.log(domain);
// localhost

// 取得来源页面的URL
var referrer = document.referrer;
// console.log(decodeURIComponent(referrer));
// http://localhost/JavaScript高级程序设计(第3版)/DOM1.html

// 跨域安全限制， 来自不同子域的页面无法通过JavaScript 通信。而通过将每个页面的
// document.domain 设置为相同的值，这些页面就可以互相访问对方包含的JavaScript 对象了。

// 浏览器对domain 属性还有一个限制，即如果域名一开始是“松散的”（loose），那么不能将它再设
// 置为“紧绷的”（tight）。换句话说，在将document.domain 设置为"wrox.com"之后，就不能再将其
// 设置回"p2p.wrox.com"，否则将会导致错误，

// 假设页面来自于p2p.wrox.com 域
// document.domain = "wrox.com"; //松散的（成功）
// document.domain = "p2p.wrox.com"; //紧绷的（出错！）

// 查找元素

// getElementById(): 通过元素ID取得元素，不存在返回null
// getElemntsByTagName()：通过元素名获取元素集，
// 返回HTMLCollecttion对象，类数组对象
// HTMLCollection对象有namedItem()，通过元素的name特性取得集合中的项
var ps = document.getElementsByTagName('p');
// var myp = ps.namedItem('myP');
// console.log(myp);

/*<p name="myP">
			我是第一个&lt;p&gt;;
		</p>*/


// 对HTMLCollection 而言，我们可以向方括号中传入数值或字符串形式的索引值。在后台，对数
// 值索引就会调用item()，而对字符串索引就会调用namedItem()。

// HTMLCollection支持按名称（name）访问项
// var myp = ps["myP"];
// console.log(myp);
/*<p name="myP">
			我是第一个&lt;p&gt;;
		</p>*/


// 可以向getElementsByTagName()中传入"*"。在JavaScript 及CSS
// 中，星号（*）通常表示“全部”。
var allElements = document.getElementsByTagName("*");
// console.log(allElements);

// getElemntsByName() 只有HTMLDocument类型才有的方法，
// 返回带有给定name特性的所有元素
// 最常使用getElementsByName()方法的情况是取得
// 单选按钮；为了确保发送给浏览器的值正确无误，
// 所有单选按钮必须具有相同的name 特性

// 与getElementsByTagName()类似，getElementsByName()方法也会返回一个HTMLCollectioin。
// 但是，对于这里的单选按钮来说，namedItem()方法则只会取得第一项（因为每一项的name 特性都相同）。

// 特殊集合
// document.anchors：所有带有name的<a>
// document.forms：所有的<from>
// document.images：所有的<img>
// document.link：带href特性的<a>

// 一致性检测
// document.implementation
// document.implementation.hasFeature();
// 接受两个参数：要检测的DOM 功能的名称及版本号

var hasXMLDom = document.implementation.hasFeature("XML", "1.0");
// console.log(hasXMLDom);		 // gc: true

// 实现者可以自行决定是否与DOM 规范的不
// 同部分保持一致。事实上，要想让hasFearture()方法针对所有值都返回true 很容易，但返回true
// 有时候也不意味着实现与规范一致。

// 文档写入
// 下列4 个方法中：write()、writeln()、open()和close()。

// write()和writeln()
// 方法都接受一个字符串参数，即要写入到输出流中的文本。write()会原样写入，而writeln()则会
// 在字符串的末尾添加一个换行符（\n）。在页面被加载的过程中，可以使用这两个方法向页面中动态地
// 加入内容

// 还可以使用write()和writeln()方法动态地包含外部资源，例如JavaScript 文件等。

// 必须注意不能接包含字符串"</script>"，要写成<\/script>，
// 不然会导致该字符串被解释为脚本块（html中的脚本块）结束，后面的代码无法执行

// 前面的例子使用document.write()在页面被呈现的过程中直接向其中输出了内容。如果在文档
// 加载结束后再调用document.write()，那么输出的内容将会重写整个页面

// 方法open()和close()分别用于打开和关闭网页的输出流。如果是在页面加载期间使用write()
// 或writeln()方法，则不需要用到这两个方法。

// 		Element

// 		Text

// 		Comment

// 		CDATASection

// 		DocumentType

// 		DocumentFragment

// 		Attr


// DOM操作技术
// 		动态脚本
// 		动态样式
// 		操作表格
// 		使用NodeList
