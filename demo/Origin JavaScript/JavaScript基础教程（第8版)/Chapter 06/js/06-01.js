
// 表单是和Web站点用户的交互的点
// 表单可以包含大多数常见的图形界面元素，包括输入字段、单选按钮、复选框、弹出菜单
// 和输入列表。另外，HTML 表单可以包含密码字段，这种控件可以避免用户的输入被别人偷看。

// 填写表单 ——> Submit按钮(提交) ——> Web服务器 ——> CGI程序(解释并操作这些数据)

// JavaScript 是检查数据的好方法，这种技术称为表单验证（form validation）。

// 将学习如何使用JavaScript 确保表单包含有效的信息，针对另一个字段中的数据检
// 查一个字段中的数据，以及突出显示错误的信息，让用户知道需要修改什么。

/*

表6-1 目前需要了解的HTML 知识——表单
标 签 	属 性 			意 义
form 					这个标签包含下面的任何标签，构成有效的HTML 表单
		action 			在Web 服务器上处理数据的服务器端CGI 的名称
input 					这个标签显示不同类型的表单字段，具体取决于type 属性的值
		class 			分配给这个元素的类名
		id 				分配给这个元素的唯一id。与其他JavaScript 对象一样，不允许有空格和标点符号，并且不能以数字开头
		name 			主要用来对单选按钮进行分组
		maxlength 		用户可以在这个字段中输入的数据的最大长度
		size 			在页面上显示的字符数量
		type 			所需的输入控件类型，有效值是button、checkbox、image、password、radio、reset、submit 和text
		value 			预先为这个表单字段设置的值
label 					用来为没有内置标签的控件指定标签，比如文本字段、复选框、单选按钮和菜单
		for 			将标签与特定元素的id 关联起来
option 					在select 标签中可用的选项
		selected 		指出这个选项是否作为默认选项
		value 			每个选项的预设值
select 					这种表单字段显示弹出菜单或滚动列表（取决于size 属性）
		class 			分配给这个元素的类
		id 				分配给这个元素的唯一id
		size 			在页面上显示的选
*/

window.onload = initForm;
// 当窗口卸载时（即关闭窗口或者浏览器转到另一个网址），我们调用一个匿名函数（anonymous
// function），即没有名称的函数。在这里设置unload()为了让back(后退)的时候，
// 页面能够触发onload操作，不然在某些浏览器(Firefox、Safari)中页面会被缓存。
// 

window.onunload = function() {};

// window.onpageshow = initForm; // 作用如上，但是在Safari不起作用

function initForm() {
	// 初始化<select> selectedIndex = 0
	document.getElementById('newLocation').selectedIndex = 0;
	// onchange绑定
	document.getElementById('newLocation').onchange = jumpPage;	
};

function jumpPage() {
	var newLoc = document.getElementById('newLocation');
	var newPage = newLoc.options[newLoc.selectedIndex].value;

	// 非空检查
	if (newPage != '') {
		window.location = newPage;
	};
};




// 如果你专门针对Firefox 设计网站，那么应该知道有两个非标准的窗口事件处理程序：
// onpageshow 和onpagehide，可以使用它们处理只希望在Firefox 中触发的事件。





















