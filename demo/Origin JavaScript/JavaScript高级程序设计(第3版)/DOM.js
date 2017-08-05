

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

// Element最常用的类型之一，用于表现XML或HTML元素，提供了对元素标签名、子节点及特性的访问

// nodeType = 1
// nodeName = TagName
// nodeValue = null
// parentValue = Document/Element
// childNodes = Element/Text/Comment/ProcessingInstruction/CDATASection
// 		/EntityReference

// 访问元素的标签名

/*console.log(someNode.nodeName);		// DIV
console.log(someNode.tagName);		// DIV

console.log(someNode.nodeName === someNode.tagName);	// true
*/

// HTML中标签名始终都以大写表示，XML标签名始终会与源代码中保持一致
// 最好是在比较之前将标签名转换为相同的大小写形式
/*
if (element.tagName.toLowerCase() == 'div') {	// 适用性更强
	// 执行操作
}
*/


// HTML元素直接或是间接由HTMLElement类型表示
// HTMLElement 类型直接继承自Element 并添加了一些属性

// 属性返回的是string类型数据，可以做String.prototype操作

/*
var element=someNode;
// element.id：元素在文档中的唯一标识符
console.log(element.id);	// somenode

// element.id = 'myDiv';
// console.log(element.id);	// myDiv

element.id += ' myDiv';
console.log(element.id);	// somenode myDiv

// element.title：元素的附加说明信息
console.log(element.title);		// 我是一个Element node
// element.title = '我是添加的Title';
// console.log(element.title);		// 我是添加的Title

element.title += '我是添加的Title';
console.log(element.title);		// 我是一个Element node我是添加的Title

// element.lang：语言代码
console.log(element.lang);	// zh-cn
element.lang = "en";
console.log(element.lang);	// en

// element.dir：语言方向，值为"ltr"（left-to-right，从左至右）或"rtl"（right-to-left，从右至左）
console.log(element.dir);	// ltr
element.dir = "rtl";
console.log(element.dir);	// rtl

// element.className，为元素的class指定CSS类，返回的是一个class的字符串
console.log(element.className);		// bd dd
// element.className = 'ft';
// console.log(element.className);		// ft

element.className += ' ft';
console.log(element.className);		// bd dd ft

*/


// 特性，给出相应元素或其内容的附加信息
// 操作DOM方法主要有3个：

var element=someNode;

/*// getAttribute()	获取属性，属性名为HTML中出现的属性名，也获取可以自定义
console.log(element.getAttribute('id'));	// somenode
console.log(element.getAttribute('class'));	// bd dd
// 获取自定义属性
console.log(element.getAttribute('data-self'));		// self_special
*/

// 只有公认的（非自定义的）特性才会以属性的形式添加到DOM对象中
// element.id/element.className/element.style/element.onclick

/*有两类特殊的特性，它们虽然有对应的属性名，但属性的值与通过getAttribute()返回的值并不
相同。第一类特性就是style，用于通过CSS 为元素指定样式。在通过getAttribute()访问时，返
回的style 特性值中包含的是CSS 文本，而通过属性来访问它则会返回一个对象。由于style 属性是
用于以编程方式访问元素样式的（本章后面讨论），因此并没有直接映射到style 特性。
第二类与众不同的特性是onclick 这样的事件处理程序。当在元素上使用时，onclick 特性中包
含的是JavaScript 代码，如果通过getAttribute()访问，则会返回相应代码的字符串。而在访问
onclick 属性时，则会返回一个JavaScript 函数（如果未在元素中指定相应特性，则返回null）。这是
因为onclick 及其他事件处理程序属性本身就应该被赋予函数值。*/


// 由于存在这些差别，在通过JavaScript 以编程方式操作DOM 时，开发人员经常不使用getAttribute()，
// 而是只使用对象的属性。只有在取得自定义特性值的情况下，才会使用getAttribute()方法


// setAttribute()	设置属性
// 接受两个参数：要设置的特性名和值
// 如果特性已经存在，setAttribute()会以指定的值替换现有的值；
// 如果特性不存在，setAttribute()则创建该属性并设置相应的值。

/*// element.setAttribute("id", "someOtherId");
// console.log(element.id);	// someOtherId
element.id = "someOtherId";
console.log(element.getAttribute('id'));	// someOtherId

element.setAttribute("data-my-special", "my-special");
console.log(element.getAttribute("data-my-special"));*/

/*// removeAttribute() 	彻底删除特性
var attrRemove = element.removeAttribute("data-self");
console.log(attrRemove);	// undefined
*/

// Element 类型是使用attributes 属性的唯一一个DOM 节点类型
// attributes属性
// 返回NameNodeMap，动态(实时)集合
// 元素的每一个特性都由一个Attr 节点表示，
// 每个节点都保存在NamedNodeMap 对象中。

// console.log(element.attributes);
// NamedNodeMap {0: id, 1: class, 2: title, 3: lang, 4: dir, 5: data-self, length: 6}

// getNamedItem(name)：返回nodeName属性等于name节点
// removeNamedItem(name)：移除nodeName属性等于name节点
// seNamedItem(node)：添加节点，以节点的nodeName属性为索引
// item(pos)：返回位于数字pos位置处的节点

// attributes 属性中包含一系列节点，每个节点的nodeName 就是特性的名称，而节点的nodeValue
// 就是特性的值。
// 其实attributes属性获取得到的就是与该Element同在的Attribute节点
/*var id = element.attributes.getNamedItem("id").nodeValue;
console.log(id);
*/

// 使用这种语法来设置特性的值，即先取得特性节点，然后再将其nodeValue 设置为新值
// element.attributes.getNamedItem('id').nodeValue = "someOtherId";
// console.log(element.attributes.getNamedItem("id").nodeValue);	// someOtherId

// removeNamedItem(name)：移除nodeName属性等于name节点
// 返回被移除的属性
// 效果 == removeAttibure()

// var removeAttr = element.attributes.removeNamedItem("id");
// console.log(removeAttr);	// id="somenode"

// setNamedItem()是一个很不常用的方法，通过这个方法可以为元素添加一个新特性，为此
// 需要为它传入一个特性节点，如下所示。
// element.attributes.setNamedItem(newAttr);

// 一般来说，由于前面介绍的attributes 的方法不够方便，因此开发人员更多的会使用
// getAttribute()、removeAttribute()和setAttribute()方法。

// 如果想要遍历元素的特性，attributes 属性倒是可以派上用场
// attributes 对象中的特性，不同浏览器返回的顺序不同
// 可能会返回HTML 元素中所有可能的特性，包括没有指定的特性

// 迭代元素的每一个特性，将它们构造成name="value" name="value"这样的名值对字符串格式。
function outputAttributes(element) {
	var pairs = new Array(),
		attrName,
		attrValue,
		i,
		len;

	for (i = 0, len = element.attributes.length; i < len; i++) {
		attrName = element.attributes[i].nodeName;
		attrValue = element.attributes[i].nodeValue;
		if (element.attributes[i].specified) {
			pairs.push(attrName + "=\"" + attrValue + "\"");
		}
		
	}
	return pairs.join(" ");
}

// console.log(outputAttributes(element));
// id="somenode" class="bd dd" title="我是一个Element node" lang="zh-cn" dir="ltr" data-self="self_special"

// 创建元素
// document.createElement()方法创建新元素，
// 方法只接受一个参数，要创建元素的标签名，HTML标签名部分大小写，XML标签名分大小写

/*var div = document.createElement('div');

// 添加元素
div.id = "someOtherId";
div.className = "box";

// 添加在文档中(.appendChild()/.insertBefore()/.replaceChild())
document.body.appendChild(div);

// 一旦将元素添加到文档树中，浏览器就会立即呈现该元素。
console.log(document.getElementById('someOtherId'));
// <div id="someOtherId" class="box"></div>

// 在IE中使用createElement()会有不一样的用法，或是bug(IE7)
// document.body.appendChild(document.createElement("<div>我是在IE里面作用的<\/div>"));
// 没起作用
*/


// 元素的子节点
// 这些子节点有可能是元素、文本节点、注释或处理指令。
// 不同浏览器在看待这些节点方面存在显著的不同
// 有的浏览器一旦有空白符/转行就会有Text节点产生，childNodes就是多很多，而IE不会
// 如果需要通过childNodes 属性遍历子节点，那么一定不要忘记浏览器间的这一差别。
// 这意味着在执行某项操作以前，通常都要先检查一下nodeTpye 属性
/*
for (var i = 0, len = element.childNodes.length ; i < len; i++) {
	// 检测得到元素节点才执行某些操作
	if (element.childNodes[i].nodeType == 1) {
		// 执行操作
	}
}
*/

// Element也支持getElementsByTagname()
// var myp = element.getElementsByTagName("p");
// console.log(myp);	// 获取element中所有的<p>

// element.getElementById is not a function
// var myP = element.getElementById("myP");
// console.log(myP);



// 		Text
// 纯文本内容
// 纯文本中可以包含转义后的HTML 字符，但不能包含HTML 代码
// nodeType = 3
// nodeName = #text
// nodeValue = 节点所包含的文本
// parentNode = Element
// 无childNodes

// nodeValue属性或data属性访问Text节点中包含的文本，得到值相同
// 对任意一个(nodeValue/data)修改，另外一个也会(data/nodeValue)反映出来

// appendData(text)：将text 添加到节点的末尾。
// deleteData(offset, count)：从offset 指定的位置开始删除count 个字符。
// insertDate(offset, text)：在offset 指定的位置插入text。
// replaceData(offset, count, text):用text 替换从offset 指定的位置开始到offset+count 为止处的文本。
// splitText(offset)：从offset 指定的位置将当前文本节点分成两个文本节点。
// substringData(offset, count)：提取从offset 指定的位置开始到offset+count 为止处的字符串。

// 在默认情况下，每个可以包含内容的元素最多只能有一个文本节点，而且必须确实有内容存在。

/*<!-- 没有内容，也就没有文本节点 -->
<div></div>
<!-- 有空格，因而有一个文本节点 -->
<div> </div>
<!-- 有内容，因而有一个文本节点 -->
<div>Hello World!</div>
*/

// var textNode = document.getElementById("myP").firstChild;
// var textNode = document.getElementById("myP").childNodes[0];
// console.log(textNode);
// /*
// 			我是第一个<p>;
// 		*/

/*document.getElementById('myP').firstChild.nodeValue = "我是文字节点修改后文字";
console.log(document.getElementById('myP').firstChild);		// 我是文字节点修改后文字
*/
/*如果这个文本节点当前存在于文档树中，那么修改文本节点的结果就会立即得到反映。另外，在修
改文本节点时还要注意，此时的字符串会经过HTML（或XML，取决于文档类型）编码。换句话说，
小于号、大于号或引号都会被转义。*/

/*document.getElementById('myP').firstChild.nodeValue = "<strong>我是文字节点修改后文字</strong>";
console.log(document.getElementById('myP').firstChild);		// &lt;strong&gt;我是文字节点修改后文字&lt;/strong&gt;
// 向DOM 文档中插入文本之前，先对其进行HTML 编码的一种有效方式。
*/

// 创建文字节点
// document.createTextNode()
// 接受一个参数——要插入节点中的文本。
// 与设置已有文本节点的值一样，作为参数的文本也将按照HTML 或XML 的格式进行编码。
// 

// 创建一个<p>元素
var element = document.createElement('p');
// 为<p>指定class=message
element.className = 'message';

// 创建一个文字节点
var textNode = document.createTextNode('Hello world!');
// 将新建的文字节点放进新建的<p>中
element.appendChild(textNode);

// 将<p>+textNode放到<div[id=somenode]>末尾中
// someNode.appendChild(element);

// 一般情况下，每个元素只有一个文字节点。
// 不过，某些情况下也可能包含多个文字节点

var anotherTextNode = document.createTextNode(' Yippee!');
element.appendChild(anotherTextNode);

// 将<p>+textNode放到<div[id=somenode]>末尾中
someNode.appendChild(element);
// 如果两个文本节点是相邻的同胞节点，那么这两个节点中的文本就会连起来显示，中间不会有空格。

// var ps = someNode.getElementsByTagName('p');
/*for (var i = 0, len = ps.length; i < len; i++) {
	let p = ps[i];
	if (p.className.indexOf("message") > -1) {
		console.log(p.childNodes);
		// (2) [text, text]length: 2
		// 0: text
		// 1: text
		// __proto__: NodeList
		console.log(p.childNodes.length);	// 2
	}
}*/


// 规范化文本节点
// normalize() 父元素上调用，对两个或多个文本节点的父元素进行子文字节点进行拼合成一个
/*for (i = 0, len = ps.length; i < len; i++) {
	let p = ps[i];
	if (p.className.indexOf("message") > -1) {
		p.normalize();
		console.log(p.childNodes);
		// [text]
		// length: 1
		// 0: text
		// __proto__: NodeList
		console.log(p.childNodes.length);	// 1
	}
}*/

// 浏览器在解析文档时永远不会创建相邻的文本节点。这种情况只会作为执行DOM操作的结果出现。


// 分割文字节点
// splitText()
// 将一个文本节点分成两个文本节点，即按照指定的位置分割nodeValue 值。
// 原来的文本节点将包含从开始到指定位置之前的内容，新文本节点将包含剩下的文本。
// 这个方法会返回一个新文本节点，该节点与原节点的parentNode 相同

/*var myp = document.getElementById("myP");
var newNode = myp.firstChild.splitText(5);
console.log(myp.firstChild.nodeValue);	// "			我"
// 新文本节点将包含剩下的文本
console.log(newNode.nodeValue);		// 是第一个<p>;
console.log(myp.childNodes.length);	// 2
*/
// 分割文本节点是从文本节点中提取数据的一种常用DOM 解析技术。

// 		Comment
// 注释
// nodeType = 8
// nodeName = #comment
// nodeVAlue = 注释内容
// parentNode = Document/ Element
// 无childNodes

// Comment 类型与Text 类型继承自相同的基类，因此它拥有除splitText()之外的所有字符串操
// 作方法。与Text 类型相似，也可以通过nodeValue 或data 属性来取得注释的内容。
// 注释节点可以通过其父节点来访问
/*var div = document.getElementById("mydiv");
var comment = div.firstChild;
console.log(comment.data);
 // 这是一个注释 */

/*// 使用document.createComment()并为其传递注释文本也可以创建注释节点
var comment = document.createComment("A comment ");
document.getElementById("mydiv").appendChild(comment);*/

// 		CDATASection
// 只针对基于XML的文档

// 		DocumentType

// 		DocumentFragment

// 		Attr


// DOM操作技术
// 		动态脚本
// 		动态样式
// 		操作表格
// 		使用NodeList
