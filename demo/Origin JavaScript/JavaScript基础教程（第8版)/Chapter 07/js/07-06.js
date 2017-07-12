

// 正则表达式是一种对文本字符串进行验证和格式化的极其强大的方式

// 正则表达式（regular expression，常常缩写为RegExp）是一种用特殊符号编写的模式，描述一个
// 或多个文本字符串。使用正则表达式匹配文本的模式，这样脚本就可以轻松地识别和操纵文本。


// 对字符串进行格式化和验证

// 可以使用正则表达式对所输入的值同时进行格式化和验证。

window.onload = initForms;		// .onload写成load 出错  , 绑定是用initForm，调用用initForm()，绑定使用调用格式出错


// 初始化，为每个form的onsubmit操作绑上validForm处理
function initForms() {
	for (var i = 0 ; i < document.forms.length; i++) {
		document.forms[i].onsubmit = validForm;
	}
}


// 验证Form处理
function validForm(event) {
	var allGood = true;
	var allTags = document.getElementsByTagName('*');

	for (var i = 0; i < allTags.length; i++) {
		if (!validTag(allTags[i])) {
			allGood = false;
		}
	}
	return false;
	// event.preventDefault();

	function validTag(thisTag) {
		var outClass = '';
		var allClasses = thisTag.className.split(' ');

		for (var j = 0; j < allClasses.length; j++) {
		 	outClass += validBaseOnClass (allClasses[j]) + ' ';
		}

		thisTag.className = outClass;

		if (outClass.indexOf('invalid') > -1) {
			invalidLabel(thisTag.parentNode);
			thisTag.focus();
			if (thisTag.nodeName == 'INPUT') {
				thisTag.select();
			}
		}


		// 上面函数中，.className.split('')做分解，是为了方便验证
		function validBaseOnClass(thisClass) {
			var classBack = '';

			switch (thisClass){
				case '':
					break;
				case 'phone':
					if(!validPhone(thisTag.value)) {
						classBack = 'invalid';
					};
				default:
					classBack += thisClass;
			}
			return classBack;
		}
		
		function validPhone(phoneNum) {
			var re = /^\(?(\d{3})\)?[\.\-\/ ]?(\d{3})[\.\-\/ ]?(\d{4})$/

			var phoneArr = re.exec(phoneNum);
			// console.log(Object.prototype.toString.call(phoneArr));  // [object Array]
			if (phoneArr) {
				document.getElementById("phoneField").value 
					= '(' + phoneArr[1] + ')' + phoneArr[2] + '-' + phoneArr[3];
				return true;
			}
			return false;
		}

		function invalidLabel(parentTag) {
			if (parentTag.nodeName == 'LABEL') {
				parentTag.className += ' invalid';
			}
		}

	}

}
