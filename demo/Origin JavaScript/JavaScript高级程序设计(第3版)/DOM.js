

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
// 文档书 家谱
// 父子关系	childNodes/parentNode
// 同胞关系 previousSibling/nextSibling

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


// 

// console.log(someNode.childNodes);

// 		Document
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
