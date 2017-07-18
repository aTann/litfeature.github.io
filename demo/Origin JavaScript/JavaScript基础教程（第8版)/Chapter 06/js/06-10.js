
// 密码检查示例的HTML

// 这个脚本是本章中其余所有示例的基础，可以使用这个框架添加额外的有效性检查

// 这种检查方法的基本原理如下：HTML 中的class 属性表示我们希望JavaScript 执行哪种检查。
// 如果检查失败，就在class 属性的列表中添加invalid。这样做会出现两种现象：(1) 表单提交失败；
// (2) CSS 改变这个字段在页面上的外观。

// 根据另一个字段对一个字段进行检查，尤其是在要求用户设置密码时。为了确保密码正
// 确，希望用户输入密码两次，并确保两次的输入完全相同。

// 当发现错误时，这个脚本会突出显示错误的字段的标签

window.onload = initForm;

function initForm() {
	for (var i = 0; i < document.forms.length; i++) {
		document.forms[i].onsubmit = validForm;
	};

	// 当用户单击遮阳篷复选框时，将调用doorSet()函数。
	document.getElementById('sunroof').onclick = doorSet;
};


function validForm(event) {
	event.preventDefault();
	var allGood = true;
	var allTags = document.getElementsByTagName('*');

	for (var i = 0; i < allTags.length; i++) {
		// 一旦有一个不能通过，后面检查还在继续，但是不能通过
		// 这样的逻辑总是有点怪，自己需要检查，但是前面的已经不通过，何必再去检查后面的呢
		if (!validTag(allTags[i])) {
			// allGood = false;
		};
	};

	return allGood;

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

		thisTag.className = outClass.trim();

		if (outClass.indexOf('invalid') > -1) {
			
			invalidLabel(thisTag.parentNode);
			
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
					
				case 'invalid':  // 当是invalid时会进行化去处理
					break;
				case 'reqd':
					if (allGood && thisTag.value == '') {
						classBack = 'invalid ';
					};
					classBack += thisClass;
					break;
				case 'radio':
				// 只能选择一个单选按钮，而且这段JavaScript 会执行界面规则
					if (allGood && !radioPicker(thisTag.name)) {
						classBack = 'invalid ';
					}
					classBack += thisClass;
					break;
				case 'isNum':
					if (allGood && !isNum(thisTag.value)) {
						classBack = 'invalid ';
					}
					classBack += thisClass;
					break;
				case 'isZip':
					if (allGood && !isZip(thisTag.value)) {
						classBack = 'invalid ';
					}
					classBack += thisClass;
					break;;
				case 'email':
					if (allGood && !validEmail(thisTag.value)) {
						classBack = 'invalid '
					}
					classBack += thisClass;
					break;
				default:
					// 检查两个密码字段是否相同
					// thisClass = passwd1
					// .passwd1   #passwd1  
					// 使用verify的className和password的相同字符进行相互对应
					if (allGood && !crossCheck(thisTag, thisClass)) {
						classBack = 'invalid ';
					}
					classBack += thisClass;
			};
			return classBack;
		};

		// 检查两个密码字段是否相同
		function crossCheck(inTag, otherFieldID) {
			if (!document.getElementById(otherFieldID)) {
				return false;
			}
			// return (inTag.value == document.getElementById(otherFieldID).value);
			return (inTag.value != '' || document.getElementById(otherFieldID).value  != '');
		};

		function invalidLabel(parentTag) {
			if (parentTag.nodeName == 'LABEL') {
				parentTag.className += 'invalid ';
			}
		}

		// 验证单选是否已经有选项
		function radioPicker(radioName) {
			var radioSet = '';
			// 从forms里面找到所有的radio[name=radioName]
			for (var k = 0; k < document.forms.length; k++) {
				if (!radioSet) {
					radioSet = document.forms[k][radioName];
				}
			}
			// 如果没有radio[name=radioName]返回false
			if (!radioSet) {
				return false;
			}
			// 遍历所有的radio[name=radioName]，如果其中任意一个有选项了，返回true
			for (var k = 0; k < radioSet.length; k++) {
				if(radioSet[k].checked) {
					return true;
				}
			}
			return false;
		};

		function isNum(passedVal) {
			if (passedVal == '') {
				return false;
			}

			for (var m = 0; m < passedVal.length; m++) {
				if (passedVal.charAt(m) < '0') {
					return false;
				}
				if (passedVal.charAt(m) > '9') {
					return false;
				}
			}
			return true;
		}

		function isZip(inZip) {
			if (inZip == '') {
				return true;
			}
			return (isNum(inZip));
		}

		function validEmail(email) {
			var invalidChars = ' /:,;';

			if (email == '') {
				return false;
			}

			// 设置禁止填写字符
			for (var i = 0; i < invalidChars.length; i++) {
				var badChar = invalidChars.charAt(i);
				if (email.indexOf(badChar) > -1) {
					return false;
				}
			}
			// @开头的情况
			var atPos = email.indexOf('@', 1); // 如果@存在，得到atPos = 1，如果@不存在，atPos = -1
			if (atPos == -1) {
				return false;
			}
			// 避免出现同时两个@@
			if (email.indexOf('@', atPos + 1) != -1) {
				return false;
			}
			// .不能开头
			var periodPos = email.indexOf('.', atPos);
			if (periodPos == -1) {
				return false;
			}

			// .在结尾的倒数第3位
			if (periodPos + 3 > email.length) {
				return false;
			}
			return true;
		}
	};

};

// 处理用户选择的一种好方法是，根据用户做出的其他选择自动设置字段输入
// 检查是否选中了遮阳篷选项。如果是，就将twoDoor 单选按钮设置为true。如果是取
// 消选中遮阳篷复选框，那么不做任何处理
function doorSet() {
	if (this.checked) {
		document.getElementById('twoDoor').checked = true;
	}else {
		document.getElementById('fourDoor').checked = true;
	}
}

