---
layout: post
title: 原生JavaScript提取样式和类操作
---

{{ page.title }}
================
<p class="meta">{{ page.date | date_to_string }}</p>
_dom = document.getElementById("id")

平时常用的JavaScript操作DOM都是使用JQuery库，毕竟JQuery简单易用，操作简单，但是今天的dome只是做一个简单的隐藏显示按钮，同时也不行上传过多的文件，另外一个方面前端DOM操作是绕不开的，如有可能使用原生的JavaScript进行操作使用是很有必要的，所以就尝试了原生JavaScript进行操作。     

刚开始进行JavaScript编码，使用的还是JQuery的思维，想的是JavaScript应该和JQuery相差不大:
```
	id_dom = document.getElementById("id");
	isshow = id_dom.style('display');

```
后来，发现不能如此，继而Google查找了一个博客，得到了`isshow = id_dom.style.display;`，但是尴尬的是，所做的demo是响应式，并且是768px以下显示的菜单按钮，拉伸到一定宽度，原本的内容不见了。转变想法在该媒体查询之下增加了个`.show{ display: block !important; }`类样式进行对内容进行隐现，在JavaScript中进行：
```
	if(_dom.classList.container("show")) {
		_dom.classList.remove(_class_name);
	}else { _dom.classList.add(_class_name); }
```
由此达到了目的，但是后来感觉`_dom.classList.toggle(_class_name);`，更加简便和简单，就注释if-else操作更改为`_dom.classList.toggle(_class_name);`，稍后就查询了一下JavaScript对样式操作和类操作接口和利用，如下：

1、offsetHeight/offsetWidth 取高度/宽度

	```
		document.getElementById("id").offsetHeight; //取元素高度
		document.getElementById("id").offsetWidth;  //取宽度
	```

2、.style.Property()

	```
		_dom = document.getElementById("id")
	```


	```
		_dom.style.borderLeftColor = "";
		_dom.style.borderLeftColor()
		// 诸如此类，只能提取行内样式style属性里面的，不能去内联和外联样式表中元素
		// .style 能读能写
	```

3、Element.getBoundingClientRect()

	```
		var style = window.getComputedStyle("元素", "伪类");
			style = window.getComputedStyle(_dom,':after')
		// .getComputedStyle只能读
		// getComputedStyle方法返回对象中length属性值
		// length：190+
	```

4、currentStyle()

	```
		_dom.currentStyle()
		// 返回的是元素当前应用的最终CSS属性值（包括外链CSS文件，页面中嵌入的<style>属性等）。
		// currentStyle不支持伪类，IE7/8时候用
		// 我们要获取一个元素的高度，可以类似下面的代码：
		alert((element.currentStyle? element.currentStyle : window.getComputedStyle(element, null)).height);
	```

5、getPropertyValue()

	```
		// getPropertyValue方法可以获取CSS样式申明对象上的属性值（直接属性名称）
		window.getComputedStyle(element, null).getPropertyValue("float");

		// 直接使用键值访问
		getComputedStyle(element, null).cssFloat	//IE9+
		getComputedStyle(element, null).styleFloat	//IE7/8
	```

6、getAttribute()

	```
		style.getAttribute('float')
		// 就是属性名需要驼峰写法
		style.getAttribute("backgroundColor");
		// 不考虑IE6
		style.getAttribute("background-color");
	```

前面2-6from(张鑫旭-[获取元素CSS值之getComputedStyle方法熟悉](http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/))
后来查看了一下张鑫旭的博文，真心惊叹张鑫旭的技术和探索精神，同时，更令人惊叹的是他对国外技术的关注和他的目光。2012年就已经看到了响应式的发展，同时开始有相应的关注，而且所做的试验和探索于现在国内情况来说，都还是较为成熟和有可用性。   

7、[Element.getBoundingClientRect()](MDN-https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)    

	```
		Element.getBoundingClientRect()
		//Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。	
	```

8、classList API 对 Class操作

	```
		_dom.classList.add(_class_name) 	//添加
		_dom.classList.remove(_class_name)	//删
		_dom.classList.toggle(_class_name)	//开关
		_dom.classList.container(_class_name) 	//判断有没有该class
	```

以上今日所获部分。












































