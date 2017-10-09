
// onfocus事件
// 有时候，页面上的某个表单字段包含只读数据，这一数据要在表单上显示，但是不希望用户修改它。
// 可以使用HTML 属性readonly 避免用户修改字段，但是并非所有浏览器都支持这个属性。

// 如何使用onfocus 事件迫使用户离开这个字段，从而避免用户修改他们不应该修改的字段。

// 当被选中时，触发.onfocus()事件，然后利用blur()强制当前项不可选中

window.onload = initForm;

function initForm() {
	var allTags = document.getElementsByTagName('*');

	for (var i = 0; i < allTags.length; i++) {
		if(allTags[i].readOnly) {
 			allTags[i].onfocus = function readOnlyOnFocus() {
 				this.blur();	// 使用.blur() 不可选中，不使用.blur()支持readonly属性的，可选不可以改动
 			}
		}
	}
}

// 在当前字段上调用blur()，从而使焦点转移。





















