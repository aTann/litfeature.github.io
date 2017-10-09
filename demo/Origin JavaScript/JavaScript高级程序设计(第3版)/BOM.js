
// 浏览器对象模型(BOM)

// Web中使用JavaScript，BOM(浏览器对象模型)是真正的核心

// W3C把浏览器JavaScript最基本的部分标准化，已经将BOM的主要方面纳入HTML5的规范中

// window对象：BOM核心，
// 浏览器中window双重角色，通过JavaScript访问浏览器窗口的一个接口，有时ECMAScript规定的Global对象


// 全局作用域
// window = Global对象的角色，全局作用域中声明的变量、函数都会变成window对象属性和方法
/*
var age = 29;
function  sayAge() {
	alert(this.age);
}

alert(window.age);	// 29
sayAge();	// 29
window.sayAge();	// 29
*/
// 全局作用域下定义了变量、函数、方法，自动归在window对象名下

// 定义全局变量与在window对象上直接定义属性差别：
// var语句添加的全局变量不能通过delete操作符删除，因为此类全局变量有一个[[Configurable]]的特性，这个特性被设置为false
// 直接在window对象上定义的属性可以，
/*
// var语句添加的全局变量不能通过delete操作符删除，
// 因为此类全局变量有一个[[Configurable]]的特性，这个特性被设置为false
var age = 29;
var delVar = delete window.age;
alert(' delVar : ' + delVar);	//  delVar : false
alert(window.age);	// 29


// 直接在window对象上定义的属性可以被delete删除值，
window.color = 'red';
var delWin = delete window.color;
alert(' delWin : ' + delWin);	//  delWin : true 
alert(window.color);	// undefined

*/

// 直接访问未声明变量会抛出错误，
// 通过查询window对象，可以知道某个可能未声明的变量是否存在

// var newValue = oldValue;
// BOM.js:49 Uncaught ReferenceError: oldValue is not defined

/*
var newValue = window.oldValue;
alert(newValue);	// undefined
*/
/*
var oldValue = 12;
var newValue = window.oldValue;
alert(newValue);	// 12

*/


// 窗口关系及框架(HTML5 已废除frameset/frame/noframe)
// 页面包含框架，每个框架有自己的window对象，保存在frames集合中。
// 在frame集合中，可以通过数值索引(0开始左到右，上到下)或者框架名称来访问相应的window对象
// 每个window对象都有一个name属性，其中包含框架的名称


// 窗口位置

// IE、Safari、Opera 和Chrome：screenleft/screenTop属性，表示窗口相对于屏幕相对于屏幕左边和上边的位置
// Firefox：screenX和screenY属性，Safari和Chrome也同时支持这两个属性
// Opera虽然也支持screenX 和screenY 属性，但与screenLeft 和screenTop 属性并不对应，建议在Opera不要使用
/*
var leftPos = (typeof window.screenLeft == 'number') ? 
				window.screenLeft : window.screenX;		// IE11，全屏0、Chrome 0

var topPos = (typeof window.screenTop == 'number') ? 
				window.screenTop : window.screenY;		// IE11，全屏 70、Chrome 0

var leftPos = window.screenLeft;		// IE11，全屏 0、FF undefined、Chrome 0

var topPos = window.screenTop;		// IE11，全屏 70、FF undefined、Chrome 0
*/

/*var leftPos = window.screenX;	// IE8- undefined，IE9+，全屏可以得到-9、FF -7 、Chrome 0

var topPos = window.screenY;	// IE8- undefined，IE9+，全屏可以得到-9、FF -7 、Chrome 0


alert(leftPos);
alert(topPos);
*/

// 在此top = window
/*alert(top.screenLeft);
alert(top.screenTop);
alert(top.screenX);
alert(top.screenY)
*/

// moveTo()：接受新位置x y 坐标值
// moveBy()：接受水平和垂直方向上移动的像素数

// 在该窗口只有单独标签时候，IE9+有效果，Firefox也有效果，多标签情况下没有效果
// 可以用在window.open()弹出中
// 移动到左上角
// window.moveTo(0,0);

// 单独窗口，单独标签有效果（IE，FF有效果，Chrome无效果）
// x轴向下移动50像素，向右移动100像素

// window.moveBy(50, 100);


// 窗口大小
// IE9+、Firefox、Safari、Opera 和Chrome
// 4个属性：
// innerWidth/innerHeight ：该容器中页面视图区的大小（减去边框宽度）
// 
// outerWidth/outerHeight ：浏览器窗口本身的尺寸。在Opera 中，这两个属性的值表示页面视图容器①的大小

// 在Chrome 中，outerWidth、outerHeight 与
// innerWidth、innerHeight 返回相同的值，即视口（viewport）大小而非浏览器窗口大小。

// document.documentElement.clientWidth 和
// document.documentElement.clientHeight 中保存了页面视口的信息

// IE6 中，这些属性必须在
// 标准模式下才有效；如果是混杂模式，就必须通过document.body.clientWidth 和document.body.
// clientHeight 取得相同信息。而对于混杂模式下的Chrome，则无论通过document.documentElement
// 还是document.body 中的clientWidth 和clientHeight 属性，都可以取得视口的大小。

// 虽然最终无法确定浏览器窗口本身的大小，但却可以取得页面视口的大小

// var pageWidth = window.innerWidth;
// var pageHeight = window.innerHeight;

// /*alert(pageWidth);
// alert(pageHeight);*/

// if (typeof pageWidth != 'number') {
// 	if (document.compatMode == 'CSS1Compat') {
// 		pageWidth = document.documentElement.clientWidth;
// 		pageHeight = document.documentElement.clientHeight;
// 	} else {
// 		pageWidth = document.body.clientWidth;
// 		pageHeight = document.body.clientHeight;
// 	}
// }



// 移动设备，window.innerWidth 和window.innerHeight 保存着可见视口，也就是屏幕上可
// 见页面区域的大小

// 移动IE 浏览器不支持这些属性，但通过document.documentElement.client-
// Width 和document.documentElement.clientHeihgt 提供了相同的信息。

// 其他移动浏览器中，document.documentElement 度量的是布局视口，即渲染后页面的实际大
// 小（与可见视口不同，可见视口只是整个页面中的一小部分）。移动IE 浏览器把布局视口的信息保存在
// document.body.clientWidth 和document.body.clientHeight 中。这些值不会随着页面缩放变化。

// 由于与桌面浏览器间存在这些差异，最好是先检测一下用户是否在使用移动设备，然后再决定使用
// 哪个属性。

// 调整浏览器窗口的大小
// resizeTo()	浏览器窗口的新宽度和新高度
// resizeBy()	接收新窗口与原窗口的宽度和高度之差。
/*
// IE、FF 单标签窗口有效，Chrome无效
// 调整到 500 * 500
window.resizeTo(500, 500);

// 调整 750 * 600
window.resizeBy(250, 100);

*/

// 导航和打开窗口
// window.open()
// 可以接收4 个参数：要加载的URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览
// 器历史记录中当前加载页面的布尔值

//等同于< a href="http://www.wrox.com" target="topFrame"></a>
// window.open("http://www.wrox.com/", "topFrame");

/*如果给window.open()传递的第二个参数并不是一个已经存在的窗口或框架，那么该方法就会根
据在第三个参数位置上传入的字符串创建一个新窗口或新标签页。如果没有传入第三个参数，那么就会
打开一个带有全部默认设置（工具栏、地址栏和状态栏等）的新浏览器窗口（或者打开一个新标签页—
—根据浏览器设置）。在不打开新窗口的情况下，会忽略第三个参数。
第三个参数是一个逗号分隔的设置字符串，表示在新窗口中都显示哪些特性。*/

// window.open()方法会返回一个指向新窗口的引用。
// 通过这个返回的对象，可以像操作其他窗口一样操作新打开的窗口


// 新创建的window 对象有一个opener 属性，其中保存着打开它的原始窗口对象。这个属性只在弹出
// 窗口中的最外层window 对象（top）中有定义，而且指向调用window.open()的窗口或框架

/*
var wroxWin = window.open("http://www.wrox.com/","wroxWindow",
	"height=400,width=400,top=10,left=10,resizable=yes");
// alert(wroxWin.opener == window); //true

//调整大小，Chrome、FF有效，IE11貌似无效
wroxWin.resizeTo(500,500);

//移动位置 -- Chrome FF有效，IE11无效
wroxWin.moveTo(500,500);
*/

// 虽然弹出窗口中有一个指针指向打开它的原始窗口，但原始窗口中并没有这样的指针指向弹出窗
// 口。窗口并不跟踪记录它们打开的弹出窗口，因此我们只能在必要的时候自己来手动实现跟踪。

/*有些浏览器（如IE8 和Chrome）会在独立的进程中运行每个标签页。当一个标签页打开另一个标
签页时，如果两个window 对象之间需要彼此通信，那么新标签页就不能运行在独立的进程中。在Chrome
中，将新创建的标签页的opener 属性设置为null，即表示在单独的进程中运行新标签页，*/


// 将opener 属性设置为null 就是告诉浏览器新创建的标签页不需要与打开它的标签页通信，因此
// 可以在独立的进程中运行。标签页之间的联系一旦切断，将没有办法恢复。



// 安全限制


// 有的浏览器只根据用户操作来创建弹出窗口。这样一来，在页面尚未加载完成时调用
// window.open()的语句根本不会执行，而且还可能会将错误消息显示给用户。换句话说，只能通过单
// 击或者击键来打开弹出窗口。

// FF、chrome给出提示，是否打开，IE打开但是不允许通信

// 弹出窗口屏蔽程序

// 如果是浏览器内置的屏蔽程序阻止的弹出窗口，那
// 么window.open()很可能会返回null。此时，只要检测这个返回的值就可以确定弹出窗口是否被屏蔽了
/*var wroxWin = window.open('http://www.wrox.com');
if (wroxWin == null) {
	alert('The popup was blocked!');
}

*/


// 如果是浏览器扩展或其他程序阻止的弹出窗口，那么window.open()通常会抛出一个错误
// 准确地检测出弹出窗口是否被屏蔽，必须在检测返回值的同时，将对window.open()的调用封装在一个try-catch 块中

/*
var blocked = false;

try {
	var wroxWin = window.open('http://www.wrox.com', '_blank');
	if (wroxWin == null) {
		blocked = true;
	}
} catch(ex) {
	blocked = true;
}

if (blocked) {
	alert('The popup was blocked!');
}

*/

// 间歇调用和超时调用
// JavaScript 单线程语言，允许通过设置超时值和间歇时间值来调度代码在特定的时刻执行

// 超时调用-setTimeout()：在指定的时间过后执行代码
// 间歇调用-setInterval()：每隔指定的时间就执行一次代码


// 超时调用-setTimeout()：在指定的时间过后执行代码
// 它接受两个参数：要执行的代码和以毫秒
// 表示的时间（即在执行代码前需要等待多少毫秒）
// 第一个参数可以是一个包含JavaScript 代码的
// 字符串（就和在eval()函数中使用的字符串一样），也可以是一个函数
// 第二个参数是一个表示等待多长时间的毫秒数，但经过该时间后指定的代码不一定会执行。

// 一秒钟后显示一个警告框。

// 不推荐传递字符串，导致性能损失,内存需求大，用时比调用方式要多，不安全
// setTimeout('alert("Hello world!")', 1000);

// 推荐的调用方式
/*setTimeout(function self_() {
	alert('Hello world');
	// setTimeout(self_, 1000);
}, 1000);
*/
// 第二个参数是一个表示等待多长时间的毫秒数，但经过该时间后指定的代码不一定会执行。
// JavaScript 是一个单线程序的解释器，因此一定时间内只能执行一段代码。为了控制要执行的代码，就
// 有一个JavaScript 任务队列。这些任务会按照将它们添加到队列的顺序执行。setTimeout()的第二个
// 参数告诉JavaScript 再过多长时间把当前任务添加到队列中。如果队列是空的，那么添加的代码会立即
// 执行；如果队列不是空的，那么它就要等前面的代码执行完了以后再执行。

// 调用setTimeout()之后，该方法会返回一个数值ID，表示超时调用。这个超时调用ID 是计划执
// 行代码的唯一标识符，可以通过它来取消超时调用。要取消尚未执行的超时调用计划，可以调用
// clearTimeout()方法并将相应的超时调用ID 作为参数传递给它

// 只要是在指定的时间尚未过去之前调用clearTimeout()，就可以完全取消超时调用。前面的代码
// 在设置超时调用之后马上又调用了clearTimeout()，结果就跟什么也没有发生一样。

// 设置超时调用
/*var timeoutId = setTimeout(function self_() {
	alert('Hello world');
}, 1000);

// 注意，把它取消
clearTimeout(timeoutId);
*/

// 间歇调用-setInterval()：每隔指定的时间就执行一次代码

// 不推荐传递字符串
// setInterval("alert('Hello world!')", 10000);

// 推荐的调用方式
/*setInterval(function () {
	alert('Hello world!');
}, 10000);
*/

// setInterval() 返回一个间歇调用ID，该ID可用于在将来某个时刻取消间歇调用s
/*var num = 0;
var max = 10;
var intervalId = null;

function incrementNumber() {
	num ++;
	console.log(num);
	// 如果执行次数达到了max设定的值，则取消后续未执行的调用
	if (num == max) {
		clearInterval(intervalId);
		alert('Done');
	}
}

intervalId = setInterval(incrementNumber, 500);

*/

// 超时调用实现以上
/*
var num = 0;
var max = 10;

function incrementNumber() {
	num ++;

	// 如果执行次数未达到max设定的值，
	// 则设置另一次超时调用
	if (num < max) {
		setTimeout(incrementNumber, 500);
	} else {
		alert('Done')
	}
}

setTimeout(incrementNumber, 500);
*/

// 10S - 倒计时
/*window.onload = function () {	// 忽略js在加载HTML前，没有做onload处理，导致element无法得到
	var sec = 10;
	var intervalId = null;

	var timeshow = document.getElementById("time");
	
	timeshow.innerHTML = sec;

	function countDown() {
		sec --;
		// var newText = document.createTextNode(sec);
		timeshow.innerHTML = sec;
		// 应该是-1的，因为一进来就触发了setInterval()，并不是经过1000ms然后触发的
		if (sec < 0) {
			clearInterval(intervalId);
			alert("Game over!");
			timeshow.innerHTML = 0;
		}
	}

	intervalId = setInterval(countDown, 1000);

}
*/
/*
window.onload = function () {	// 忽略js在加载HTML前，没有做onload处理，导致element无法得到
	var sec = 10;
	var intervalId = null;

	var flag = false;

	var timeshow = document.getElementById("time");
	console.log(timeshow.childNodes);
	
	timeshow.innerHTML = sec;

	function countDown() {
		sec --;
		(function () {
			var newText = document.createTextNode(sec);
			timeshow.removeChild(timeshow.childNodes[0]);
			timeshow.appendChild(newText);
		})(0);
		
		// 应该是-1的，因为一进来就触发了setInterval()，并不是经过1000ms然后触发的
		if (sec > 0) {
			setTimeout(countDown, 1000);
		} else {
			flag = true;
		}
	}

	setTimeout(countDown, 1000);
}
*/

// 系统对话框

/*// alert()
// 通常使用alert()生成的“警告”对话框向用户显示一些他们无法控制的消息，例如错误消息。而
// 用户只能在看完消息后关闭对话框。

alert("Hello world!");

// confirm()
// 为了确定用户是单击了OK 还是Cancel，可以检查confirm()方法返回的布尔值：true 表示单击
// 了OK，false 表示单击了Cancel 或单击了右上角的X 按钮。
if (confirm("Are you sure?")) {
	alert("I'm so glad you're sure!");
} else {
	alert("I'm sorry to hear you're not sure. ");
}

// prompt():显示一个文本输入域，以供用户在其中输入内容。
// prompt()方法接受两个参数：要显示给用户的文本提示和文本输入域的默认值（可以是一个空字符串）。
var result = prompt("What is your name?", "");
if (result !== null) {
	alert('Welcome, ' + result);
}*/


// 它们的外观由操作系统及（或）浏览器设置决定，而不是由CSS 决定。
// 打开的对话框都是同步和模态的
// 显示这些对话框的时候代码会停止执行，而关掉这些对话框后代码又会恢复执行。???

// 显示“打印”对话框
// window.print();


// location对象：最有用的BOM对象之一
// 提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能
// window.location 和document.location 引用的是同一个对象。

// location 对象的用处不只表现在它保存着当前文档的信息，还表现在它将URL 解析为独立的片段，让
// 开发人员可以通过不同的属性访问这些片段。

/*
属 性 名 	例 子 						说 明

hash 		"#contents" 				返回URL中的hash（#号后跟零或多个字符），如果URL
										中不包含散列，则返回空字符串

host 		"www.wrox.com:80" 			返回服务器名称和端口号（如果有）


hostname 	"www.wrox.com" 				返回不带端口号的服务器名称


href 		"http:/www.wrox.com" 		返回当前加载页面的完整URL。而location对象的
										toString()方法也返回这个值


pathname 	"/WileyCDA/" 				返回URL中的目录和（或）文件名


port 		"8080" 						返回URL中指定的端口号。如果URL中不包含端口号，则
										这个属性返回空字符串


protocol 	"http:" 					返回页面使用的协议。通常是http:或https:


search 		"?q=javascript" 			返回URL的查询字符串。这个字符串以问号开头

*/

// alert(location.search);


// 创建一个函数，用以解析查询字符串，然后返回包含所有参数的一个对象：

// 1、获取location.search数据字符串，并substring()去“?”
// 2、String.prototype.splite(&)分组
// 3、for循环String.prototype.splite(=)再分组
// 4、获得每一项并返回args类字典项

function getQueryStringArgs() {
	
	// 取得查询字符串并去掉开头的问号
	var qs = (location.search.length > 0 ? location.search.substring(1) : "");

	// 保存数据的对象
	args = {},

	// 取得每一项
	items = qs.length ? qs.split("&") : [],
	item = null,
		name = null,
		value = null,

	// for循环中使用
		i = 0,
		len = items.length;

	// 逐个将每一项添加到args对象中
	for (var i = 0; i < len; i++) {
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);

		if (name.length) {
			args[name] = value;
		}
	}

	return args;
}

/*var args = getQueryStringArgs();

console.log(args['a']);*/

// 位置操作
// 使用location 对象可以通过很多方式来改变浏览器的位置。首先，也是最常用的方式，就是使用
// assign()方法并为其传递一个URL

// 跳转到http://www.wrox.com
// location.assign('http://www.wrox.com');

// 立即打开新URL 并在浏览器的历史记录中生成一条记录

// 等同于以下
// window.location = "http://www.wrox.com";
// location.href = "http://www.wrox.com";	// 在这些改变浏览器位置的方法中，最常用的是设置location.href 属性。

// 这三者的操作会破坏浏览器的后退操作

// 修改location 对象的其他属性也可以改变当前加载的页面


// 通过将hash、search、hostname、pathname 和port 属性设置为新值来改变URL
/*
//	初始URL： http://localhost/JavaScript高级程序设计(第3版)/BOM.html

// 将URL修改为http://localhost/JavaScript高级程序设计(第3版)/BOM.html#section1
location.hash = "#section1";

//将URL 修改为"http://localhost/JavaScript高级程序设计(第3版)/BOM.html?q=javascript"
location.search = "?q=javascript";

//将URL 修改为"http://www.yahoo.com/JavaScript高级程序设计(第3版)/BOM.html"
location.hostname = "www.yahoo.com";

//将URL 修改为"http://localhost/mydir/"
location.pathname = "mydir";

//将URL 修改为"http://localhost:8080/JavaScript高级程序设计(第3版)/BOM.html"
location.port = 8080;
*/
// chrome/FF/IE11中，如果location属性有多个，想以上会直接执行最后一个属性location.port = 8080
// 以上location属性改变URL方法都可以生成历史记录，并可以使用前进后退键

// 如果不需要生成历史记录，而且不需要前进后退，可以使用replace()
// location.replace('http://www.wrox.com/');  // 貌似也会生成历史记录

// 还有与位置有关的方法reload()，作用重新加载当前页面
// 不传递任何参数，页面就会以最有效的方式重新加载。部分请求有可能从浏览器缓存重新加载
// 如果要强制从服务器重新加载，需要为该方法传递参数true

// location.reload(true); 	// 重新加载从服务器重新加载
// FF、Chrome、IE不断重载，每次重载都执行，哪能不不断重载呢， chrome中发生，连带浏览器插件也在重新载入

// 位于reload()调用之后的代码可能会也可能不会执行，这要取决于网络延迟或系统资源等因素。

// navigation对象

// navigator 对象，现在已经成为识别客户端浏览器的事实标准。
// 虽然其他浏览器也通过其他方式提供了相同或相似的信息（例如，IE 中的window.clientInformation
// 和Opera 中的window.opera）
// navigator 对象却是所有支持JavaScript 的浏览器所共有的。
/*
// 浏览器的名称。通常都是Mozilla，即使在非Mozilla浏览器中也是如此

// console.log(navigator.appCodeName);		// Mozilla


// 完整的浏览器名称

// console.log(navigator.appName);		// Netscape


// 次版本信息

// console.log(navigator.appMinorVersion);		// GC/FF:undefined，IE11:0


// 浏览器的版本。一般不与实际的浏览器版本对应

// console.log(navigator.appVersion);	
// GC: 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36
// IE11: 5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko
// FF: 5.0 (Windows)

// 浏览器编译版本

// console.log(navigator.buildID);	
// GC/IE11：undefined
// FF：20170125094131

// 表示cookie是否启用

// console.log(navigator.cookieEnabled);	// true


// 客户端计算机中使用的CPU类型（x86、68K、Alpha、PPC或Other）

// console.log(navigator.cpuClass);
// GC/FF: undefined
// IE11: x86



// 表示当前浏览器中是否启用了Java
console.log(navigator.javaEnabled());
// FF: false
// GC：false
// IE11：true


// 浏览器的主语言
console.log(navigator.language);
// FF: zh-CN
// GC：zh-CN
// IE11：zh-CN


// 在浏览器中注册的MIME类型数组
console.log(navigator.mimeTypes);
// FF: MimeTypeArray { 0: MimeType, 1: MimeType, 2: MimeType, 3: MimeType, 4: MimeType, 5: MimeType, 6: MimeType, 7: MimeType, 8: MimeType, 9: MimeType, 等 76 项… }
// GC：MimeTypeArray {0: MimeType, 1: MimeType, 2: MimeType, 3: MimeType, 4: MimeType, length: 5}
// IE11：[object MimeTypeArray]{0: MimeType {...}, 1: MimeType {...}, constructor: MimeTypeArray {...}, length: 2}



// 表示浏览器是否连接到了因特网
console.log(navigator.onLine);
// FF: true 	// 断开WiFi还是true
// GC：true
// IE11：true



// 客户端计算机的操作系统或使用的CPU
console.log(navigator.oscpu);
// Windows NT 10.0; WOW64
// GC：undefined
// IE11：undefined


// 浏览器所在的系统平台
console.log(navigator.platform);
// FF: Win32
// GC：Win32
// IE11：Win32


// 浏览器中安装的插件信息的数组
console.log(navigator.plugins);		// 貌似不可见
// FF: PluginArray { 0: Plugin, 1: Plugin, 2: Plugin, 3: Plugin, 4: Plugin, 5: Plugin, 6: Plugin, 7: Plugin, 8: Plugin, 9: Plugin, 等 44 项… }
// GC：PluginArray {0: Plugin, 1: Plugin, 2: Plugin, 3: Plugin, length: 4}
// IE11：[object PluginArray]{0: Plugin {...}, constructor: PluginArray {...}, length: 1}


// console.log(navigator.preference());	// 设置用户的首选项，已不可用

// 产品名称（如 Gecko）
console.log(navigator.product);
// FF: Gecko
// GC：Gecko
// IE11：Gecko


// 关于产品的次要信息（如Gecko的版本）
console.log(navigator.productSub);
// FF: 20100101
// GC：20030107
// IE11：undefined


// 针对特定的MIME类型将一个站点注册为处理程序
// console.log(navigator.registerContentHandler());	// 对象不支持“registerContentHandler”属性或方法
// 针对特定的协议将一个站点注册为处理程序
// console.log(navigator.registerProtocolHandler());	// 对象不支持“registerProtocolHandler”属性或方法

// 操作系统的语言
console.log(navigator.systemLanguage);
// FF: undefined
// GC：undefined
// IE11：zh-CN


// 浏览器的用户代理字符串
console.log(navigator.userAgent);
// FF: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0
// GC：Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36
// IE11：Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko


// 操作系统的默认语言
console.log(navigator.userLanguage);
// FF: undefined
// GC：undefined
// IE11：zh-CN


// 借以访问用户个人信息的对象
console.log(navigator.userProfile);
// FF: undefined
// GC：undefined
// IE11：undefined


// 浏览器的品牌
console.log(navigator.vendor);
// FF: (空白)
// GC：Google Inc.
// IE11：(空白)


// 有关供应商的次要信息
console.log(navigator.vendorSub);
// FF: (空白)
// GC： (空白)
// IE11：undefined

*/

// 检测插件

/*对于非IE 浏览器，可以使用
plugins 数组来达到这个目的。该数组中的每一项都包含下列属性。
 name：插件的名字。
 description：插件的描述。
 filename：插件的文件名。
 length：插件所处理的MIME 类型数量。
一般来说，name 属性中会包含检测插件必需的所有信息，但有时候也不完全如此。在检测插件时，
需要像下面这样循环迭代每个插件并将插件的name 与给定的名字进行比较。
*/

// console.log(navigator.plugins)

// 检测插件(在IE中无效)
function hasPlugin(name) {
	// 传入的名称转换为小写形式，以便于比较
	// 比较的字符串都使用小写形式可以避免因大小写不一致导致的错误。
	name = name.toLowerCase();
	
	// 迭代plugins 数组
	for (var i = 0; i < navigator.plugins.length; i++) {
		// 通过indexOf()检测每个name 属性，以确定传入的名称是否出现在字符串的某个地方
		// 比较的字符串都使用小写形式可以避免因大小写不一致导致的错误。
		if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
			return true;
		}
	}

	return false;
}

// 检测Flash
// alert(hasPlugin('Flash'));
// FF：true
// GC：false
// IE11：true

//检测QuickTime
// alert(hasPlugin("QuickTime"));
// false

// 检测IE中
function hasIEPlugin(name) {
	try {
		new ActiveXObject(name);
		return true;

	} catch(e) {
		return false;
	}
}

//检测Flash
// alert(hasIEPlugin('ShockwaveFlash.ShockwaveFlash'));
// IE11: true

//检测QuickTime
// alert(hasIEPlugin("QuickTime.QuickTime"));
// IE11: false

// 检测所有浏览器中的Flash
function hasFlash() {
	var result = hasPlugin('Flash');
	if (!result) {
		result = hasIEPlugin('ShockwaveFlash.ShockwaveFlash');
	}

	return result;
}

// alert(hasFlash());


// screen 
// JavaScript 中有几个对象在编程中用处不大，而screen 对象就是其中之一。



// history对象
// history 对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。

// 传递一个整数

// 后退一页
// history.go(-1);

// 前进一页
// history.go(1);

// 前进两页
// history.go(2);	// 未能看到效果


// 传递字符串

// 跳转到最近的wrox.com
// history.go('wrox.com');		// GC、FF不断重载

// 后退
// history.back();

// 前进
// history.forward();

// alert(history.length);
// history.length 从1开始算起
if (history.length == 0) {
	//这应该是用户打开窗口后的第一个页面 xx
	alert(true);
}
// alert(history.length);	// FF/GC/IE11 2

var isFirefox = !!(navigator.vendor && navigator.vendorSub);
alert(isFirefox)
// (navigator.vendor && navigator.vendorSub); 	// FF: (空白)
// !(navigator.vendor && navigator.vendorSub);	// FF: true
// !!(navigator.vendor && navigator.vendorSub);	// false

