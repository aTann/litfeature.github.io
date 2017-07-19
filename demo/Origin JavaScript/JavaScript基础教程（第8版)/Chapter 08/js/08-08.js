
// 表单事件处理
// 表单事件处理主要用来验证表单。通过使用下面列出的事件，可以处理用户在表单上所做的任何操作。

// onsubmit事件
// 当用户单击Submit 按钮来提交表单时，就会触发onsubmit 处理程序
// 另外，根据浏览器的不同，当用户退出表单上的最后一个文本输入字段时，也可能会触发它。如果脚本包含
// onsubmit 处理程序，而且这个处理程序的结果是false，那么表单就不会发送回服务器。

// onreset事件
// 当用户单击表单上的Reset 按钮（如果有这个按钮的话）时，就会触发onreset 处理程序。如果
// 表单具有在加载页面时设置的默认值，这会非常方便——如果用户单击Reset 按钮，就需要用脚本动
// 态地重新设置默认值。

// onchange事件
// 当用户修改表单字段时，就会触发onchange 事件处理程序。这可以用来立即验
// 证输入的信息，或者在用户单击Submit 按钮之前对用户的选择作出响应。

// onselect事件
// 如果用户选择了一个input 或textarea 表单区域中的文本，就会触发onselect 处理程序。

// onclick事件
// 前面的代码提到了onclick 处理程序，这里再次提到它是因为在处理表单时经常会用到它。如脚本6-14
// 所示，当用户单击复选框或单选按钮时，就会触发这个事件。脚本2-10 也使用了onclick 处理程序。
// 在那个示例中，它让一个链接对支持JavaScript 的浏览器执行一种操作，而对不支持JavaScript 的浏览
// 器执行完全不同的另一种操作。

// onblur事件
// onblur可以用于浏览器窗口，也经常用于表单上，表示光标焦点离开input[text]或其他

// 如何使用onblur 处理程序迫使用户在一个字段中输入数据。
// 当用户离开一个表单字段时，可以在表单中使用onblur 处理程序触发操作
window.onload = initForm;

function initForm() {
	var allTags = document.getElementsByTagName('*');

	for (var i = 0; i < allTags.length; i++) {
		if (allTags[i].className.indexOf('reqd') > -1) {	// 为.reqd标签进行程序处理
			allTags[i].onblur = fieldCheck;
		}
	}
}

// 高亮<input[type=text]>，并且使用this.focus()强制需要填写该项才能进入下面
function fieldCheck() {
	if (this.value == '') {
		this.className += ' highlight';
		this.focus();	// 用focus()将焦点重新放回这个表单字段中。在Chrome58下，focus()会强制用户留在当前焦点处，其他项不能选择
	}
	else {
		this.className = 'reqd';	// 纠正错误之后，class重新设置为其初始值
	}
}

// 当用户在改变字段之后离开它时，会触发onblur 和onchange 两种事件。
// 如果用户在没有改变字段内容的情况下离开，就只触发onblur 处理程序。


