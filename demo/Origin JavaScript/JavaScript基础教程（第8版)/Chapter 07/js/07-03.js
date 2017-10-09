

// 正则表达式是一种对文本字符串进行验证和格式化的极其强大的方式

// 正则表达式（regular expression，常常缩写为RegExp）是一种用特殊符号编写的模式，描述一个
// 或多个文本字符串。使用正则表达式匹配文本的模式，这样脚本就可以轻松地识别和操纵文本。


// 验证提取字符串

// 我们获得一系列输入的姓名，其中名字在前，姓氏在后，然后交换名和姓的次序。

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
		var allClasses = thisTag.className.split(' ');

		for (var j = 0; j < allClasses.length; j++) {
		 	validBaseOnClass (allClasses[j]);
		}

		// 上面函数中，.className.split('')做分解，是为了方便验证
		function validBaseOnClass(thisClass) {

			switch (thisClass){
				case '':
					break;
				case 'nameList':
					thisTag.value = nameList(thisTag.value);
				default:
			}
		}
		
		function nameList(inNameList) {
			var newNames = new Array();
			var newNameField = '';

			// 每行一条
			var re = /\s*\n\s*/;
			var nameList = inNameList.split(re);

			re = /(\S+)\s(\S+)/;

			for (var k = 0; k < nameList.length; k++) {
				newNames[k] = nameList[k].replace(re, '$2, $1')
			}

			for (k = 0; k < newNames.length; k++) {
				newNameField += newNames[k] + '\n'
			}

			var nums = 123456789.22
			// re = /(?=(\d{3})+\.)/g;   //,123,456,789.22
			re = /(\d)(?=(\d{3})+\.)/g;
			var n = nums.toString().replace(re, function ($1, $2) {
				console.log($1 + " : " + $2)
				return $2 + ',';
			});

			console.log(n);

			return newNameField;


		}

	}

}
