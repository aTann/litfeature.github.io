
// 检测主要入手：
// 1、能力检测（特性检测）：首选，检测是否有某个函数或是某些处理的能力，常用类型的检测'function'

// 能力检测两个重要概念：1、先检测最常有特性，保证代码最优性，避免测试多个条件分支；2、必须测试实际要用到的特性

// 能力检测，不是浏览器检测

// 2、怪癖检测（quirks detection）的目标是识别浏览器的特殊行为。
// 怪癖检测是想知道浏览器存在什么缺陷（‘怪癖’bug），运行一小段代码，确定某一特性不能正常工作

// 3、用户代理检测：万不得已才用，电子欺骗
// 		了解各浏览器的代理字符串的历史变化
// 		
// 		3.1 识别呈现引擎：检测顺序要正确：Opera —> WebKit -> KHTML -> Gecko -> IE
// 		3.2 识别浏览器1
// 		3.3 识别平台
// 		3.4 识别Windows操作系统
// 		3.5 识别移动设备
// 		3.6 识别游戏系统

// navigator.userAgent

// 呈现引擎

// Opera 	——>  window.opera 	Opera 5 及更高版本中都有这个对象
// 				 在Opera 7.6+，window.opera.version()返回一个表示浏览器版本的字符串。
// 				 有可能模仿其他浏览器
// 				 
// 				 Presto
				 
// WebKit: ——>	AppleWebKit 独一无二
// 				用户代理中带有Gecko/KHTML	
				
// KHTML:  ——>	Konqueror的版本号
// 				用户代理中带 Gecko

// Gecko:  ——>	rv:版本号 Gecko 	版本号位于字符串"rv:"与一个闭括号之间

// IE: 	   ——>	MSIE/				版本号位于字符串"MSIE"的后面、一个分号的前面
// 				IE11 已经没有MSIE
// 				Trident 这个或许可以作为检测对象
// 				只有IE支持创建ActiveX控件，因此她有一个其他浏览器没有的东西，就是ActiveXObject函数。

// 识别浏览器

// WebKit下：
// 	Chrome：	Chrome/版本号
// 	Safari：	Version/版本号

// Gecko：		Firefox/版本号

// Opera: 		browser 对象中的值等于engine 对象中的值
// IE：			browser 对象中的值等于engine 对象中的值/rv:11.0

// KHTML: 		browser.konq 和browser.ver 属性分别等于engine.khtml 和engine.ver 属性。





// 用户代理检测一般适用于下列情形。
/*	
	不能直接准确地使用能力检测或怪癖检测。例如，某些浏览器实现了为将来功能预留的存根
（stub）函数。在这种情况下，仅测试相应的函数是否存在还得不到足够的信息。
	
	同一款浏览器在不同平台下具备不同的能力。这时候，可能就有必要确定浏览器位于哪个平
台下。
	
	为了跟踪分析等目的需要知道确切的浏览器。*/


