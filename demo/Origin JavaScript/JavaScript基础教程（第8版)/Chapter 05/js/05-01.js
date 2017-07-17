
// JavaScript可以迫使页面总是单独显示

if (top.location != self.location) {
	top.location.replace(self.location);	
} 

// console.log(top.location);
// console.log(self.location);
// Location {href: "file:///D:/Web-Frontend/JavaScript/Origin%20JavaSc…88%E7%AC%AC8%E7%89%88)/Chapter%2005/script01.html", 
// ancestorOrigins: DOMStringList, origin: "file://", replace: function, assign: function…}

// 直接使用top.location设置为self.location，会有副作用：用户无法用浏览器的back按钮。
// 如果他们尝试单击back按钮返回前一个页面。就会自动跳到当前页面。
// 使用replace()方法会替换浏览器历史中的当前页面，这使back按钮能够显示前一个页面。


