

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


// 默认情况下，文档刚刚加载完成时，document.activeElement 中保存的是document.body 元素的引用。文档加载期间，document.activeElement 的值为null。

