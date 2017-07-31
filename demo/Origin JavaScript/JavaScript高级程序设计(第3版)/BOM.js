
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

var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;

/*alert(pageWidth);
alert(pageHeight);*/

if (typeof pageWidth != 'number') {
	if (document.compatMode == 'CSS1Compat') {
		pageWidth = document.documentElement.clientWidth;
		pageHeight = document.documentElement.clientHeight;
	} else {
		pageWidth = document.body.clientWidth;
		pageHeight = document.body.clientHeight;
	}
}



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


