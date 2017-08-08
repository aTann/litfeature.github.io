

// 查看源代码发现：
/*
<ul class="slider_list J_slider_list">
    <li class="J_slider_item slider_item" style="opacity: 0; z-index: 0; position: absolute;"> 
        <a href="#" fclog="17427.110977.404390.1.571_1792_8538" clstag="h|keycount|2016|08a01" target="_blank">                        
        	<img alt="" src="//img14.360buyimg.com/da/jfs/t5776/352/9246921548/102625/2996e7ea/5984105eN48db6767.jpg" class="J_slider_item_img slider_item_img">                        
        </a>
  	</li>
  	<li class="J_slider_item slider_item slider_item_active" style="opacity: 0; z-index: 0; position: absolute;"> 
        <a href="#" fclog="17427.110977.404390.1.571_1792_8538" clstag="h|keycount|2016|08a01" target="_blank">                        
        	<img alt="" src="//img14.360buyimg.com/da/jfs/t5776/352/9246921548/102625/2996e7ea/5984105eN48db6767.jpg" class="J_slider_item_img slider_item_img">                        
        </a>
  	</li>
</ul>
*/

// 在源代码当中发现了样式
// style="opacity: 0; z-index: 0; position: absolute;"
// style="opacity: 1; z-index: 1; position: absolute;"

// 大胆假设下，京东的幻灯片是利用样式中absolute进行重叠在一起，然后利用opacity: 0; z-index: 0; 进行隐藏
// 然后利用opacity: 1; z-index: 1;进行展示

// 1、搜索元素<ul.slider_list>
// 2、为<ul>中的每一项<li>添加class = slider_item，并为他们添加隐藏style="opacity: 0; z-index: 0; position: absolute;"
// 3、当某一项需要显示，为该项添加class = slider_item_active，标记该项正在显示，并为其添加显示style="opacity: 1; z-index: 1; position: absolute;"


// 获取单个需要slider的<ul>
function getSliderList() {
	var uls = document.getElementsByTagName('ul');

	for (var i = 0, len = uls.length; i < len; i++) {
		var ul = uls[i];
		if (ul.className.indexOf('slider_list') > -1) {
			return ul;
		}
	}
}

// 为<li>添加[class=slider_item]和隐藏样式 [style="opacity: 0; z-index: 0; position: absolute;"]
function setSliderItem(ulElem) {
	var liItems = ulElem.getElementsByTagName('li');
	for (var i = 0, len = liItems.length; i < len; i++) {
		if (liItems[i].className.length > 0) {
			liItems[i].className += " slider_item";
		}
		else {
			liItems[i].className += "slider_item";
		}
		
		liItems[i].style.opacity = 0;
		liItems[i].style.zIndex  = 0;
		liItems[i].style.position = "absolute";
	}

	// 将首项设定为显示项
	
	liItems[0].className += " slider_item_active";
	liItems[0].style.zIndex  = 1;
	liItems[0].style.opacity = 1;

}


// 为需要显示的<li>添加[class=slider_item_active]
// 和显示样式[style="opacity: 1; z-index: 1; position: absolute;"]

function setSliderItemActive(direction, ulElem, timeMs) {
	
	n += direction;

	var liItems = ulElem.getElementsByTagName('li');
	// console.log(liItems);
	// console.log(n);
	if (n == liItems.length) {
		n = 0;
	}else if (n < 0) {
		n = liItems.length - 1;
	}

	for (var i = 0, len = liItems.length; i < len; i++) {
		if (liItems[i].className.indexOf('active') > -1) {

			var actived = i;
		}
		liItems[i].className = liItems[i].className.replace(/slider_item_active/g, "").trim();
	}
	// console.log(n);

	liItems[n].className += " slider_item_active";
	
	fadeOut(liItems[actived]);
	// liItems[n].style.opacity = 1;
	// liItems[n].style.zIndex  = 1;
	
	fadeIn(liItems[n]);

	
}

var n = 0;
var uls = getSliderList();
// console.log(uls);
setSliderItem(uls);

setSliderItemActive(1, uls);



// 淡入
function fadeIn(elem) {
	// 先设置为透明opacity = 0
	setOpacity(elem, 0);
	setzIndex(elem, 0);
	
	for (var i = 1; i < 21; i++) {		// 透明度改变 20 * 5 = 100
		console.log(i);
		(function () {
			var level = i * 5; // 透明度每次变化值
			setTimeout(function () {
				setzIndex(elem, level);
				setOpacity(elem, level);
				console.log(level);
			}, i*25);  // i * 25 即为每次改变透明度的时间间隔，自行设定
		})(i);		// 每次循环变化一次
	}
}




// 淡出
function fadeOut(elem) {
	// 先设置为透明opacity = 1
	setOpacity(elem, 100);
	setzIndex(elem, 100);
	for (var i = 1; i < 21; i++) {		// 透明度改变 20 * 5 = 100
// 不能使用for(var i = 19; i >= 0; i--)
// 因为i进入立即执行函数中，和setTimeout()进行作用
// i的方向是 19 - 0
// 得到的levev 大小方向是 0 - 95的，发生了堆栈收藏
// 和我们想要的不一样
		(function () {
			var level = 100 - i * 5;		// 每次改变 i * 5
			setTimeout(function () {
				setzIndex(elem, level);
				setOpacity(elem, level);
				// console.log(level);
			}, i*25);		// i*25 为每次改变透明度的时间间隔
		})(i);
	}
}



// 设置透明度
function setOpacity(elem, level) {
	// 兼容IE8-
	if (elem.filters) {
		elem.style.filter = "alpha(opacity=" + level + ")";
	}else {
		elem.style.opacity = level/100;
	}
}

function setzIndex(elem, level) {
	elem.style.zIndex = level/100;
}

// hebedich - 原生js和jquery实现图片轮播淡入淡出效果
// http://www.jb51.net/article/64676.htm

