
// 密码检查示例的HTML

// 这个脚本是本章中其余所有示例的基础，可以使用这个框架添加额外的有效性检查

// 这种检查方法的基本原理如下：HTML 中的class 属性表示我们希望JavaScript 执行哪种检查。
// 如果检查失败，就在class 属性的列表中添加invalid。这样做会出现两种现象：(1) 表单提交失败；
// (2) CSS 改变这个字段在页面上的外观。

window.onload = initForm;

function initForm() {
	for (var i = 0; i < document.forms.length; i++) {
		document.forms[i].onsubmit = validForm;
	};
};


function validForm() {
	// var allGood = true;

	var allTags = document.getElementsByTagName('*');
	// 以数量作为标记，如果有一个错误就减去1，最后比较对数量和总数量是否相等，返回boolean即可
	// 实现所有的错误项都被标记
	var goodCount = allTags.length;		

	for (var i = 0; i < allTags.length; i++) {
		// 一旦有一个不能通过，后面检查还在继续，但是不能通过
		// 这样的逻辑总是有点怪，自己需要检查，但是前面的已经不通过，何必再去检查后面的呢
		if (!validTag(allTags[i])) {
			// allGood = false;
			// return allGood;		// 有一个不能通过，那么就在此处断开检查吧
			
			goodCount --;
		};
	};
	return (goodCount === allTags.length);

	// 检查每个class 属性，因为class 表示我们希望对每个表单字段进行什么处理。
	function validTag(thisTag) {
		var outClass = '';
		var allClasses = thisTag.className.split(' ');
		
		// 因为源代码是检查所有的tag的，有很多tag是没有class的，
		// 但是经过thisTag.className.split(' ')处理之后，就会有一个class就是''
		if (allClasses[0] == '' && allClasses.length == 1) {
			return true;
		}
		
		for (var j = 0; j < allClasses.length; j++) {
			outClass += validBaseOnClass(allClasses[j]) + ' ';
		}

		thisTag.className = outClass;

		if (outClass.indexOf('invalid') > -1) {
			thisTag.focus();
			if (thisTag.nodeName == 'INPUT') {
				thisTag.select();
			}
			return false;
		}
		return true;

		function validBaseOnClass(thisClass) {
			var classBack = '';
			switch (thisClass) {
				case '':
					
				case 'invalid':
					break;
				case 'reqd':
					// alert(allGood);
					// if (allGood && thisTag.value == '') {
					if (thisTag.value == '') {
						classBack = 'invalid ';
					};
					classBack += thisClass;
					break;
				default:
					classBack += thisClass;
			};
			return classBack;
		};
	};

};





















