// alert('Welcome to my JavaScirpt page!');


// 确认用户的选择
/*if (confirm('Are you sure you want to do that?')) {
	alert('You said yes');
}
else {
	alert('You said no');
}*/


// (confirm('Are you sure you want to do that?')) ? alert('you said yes') : alert('you sai no');

// 提示用户
// 有时候，不是仅希望用户回答Yes/No，而是希望得到更特定的响应。

// 传递给prompt()方法的是由逗号分隔的两段信息（正式的术语是参数）：向用户询问的问题和默
// 认回答。这个方法返回用户的响应或null

var ans = prompt('Are you sure you want to do that?', '');

if (ans) {
	alert('You said ' + ans); 
}
else{
	alert('You refused to answer');
}

// 使用var 有如下两种作用。
//  它让JavaScript 创建一个变量（也就是在内存中为这个新对象留出一些空间）。
//  它定义变量的作用域（scope），也就是JavaScript在哪些地方需要知道这个对象的内容
// （见下面的补充内容“作用域是什么”）。如果变量是在一个函数中创建的，那么它是这
// 个函数的局部（local）变量，其他函数不能访问它。如果它是在任何函数之外创建的，
// 它就是全局的（global），脚本中的所有代码都可以访问它。在这个脚本中，我们创建
// 了ans全局变量。
//  在某些浏览器中，如果省略prompt 的第二个参数（默认响应），那么一切正常。但是在其他浏
// 览器中，出现的提示窗口中会显示默认值“undefined”。解决方案是总是包含某个默认值，即
// 使是空字符串也可以。

// 在JavaScript 代码中，要想避免与变量作用域有关的问题和混淆，最容易的方法是避免使用同
// 名的两个变量在不同的地方做不同的事。如果必须使用同名的变量，就一定要弄清变量的作用域！