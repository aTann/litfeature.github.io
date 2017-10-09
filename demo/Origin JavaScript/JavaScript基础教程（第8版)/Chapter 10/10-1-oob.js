
// 用对象字面值编写代码

window.onload = initAll;

function initAll() {
	// 为什么不能直接进行
	// 原因：
	// 如果从表单直接调用chgNodes.doAction()，那么this （nodeChg.doAction()中使用了大量的this）引用的是表单对象，
	// 这不是我们想要的结果。在nodeChanger()中调用chgNodes.doAction()，就能够解决这个问题。
	
	// document.getElementsByTagName('form')[0].onsubmit = nodeChg.doAction();
	// 那要怎么才能直接调用nodeChg.doAction()呢；
	document.getElementsByTagName('form')[0].onsubmit = nodeChanger;
	nodesChg.init();
}

function nodeChanger() {
	return nodesChg.doAction();
}


// var fn = {}
// 和 
// function fn(argument) {
	// body...
// } 有什么不同

// nodesChg 对象
// 创建对象的方式与设置变量相似，但是等号后面是包围在花括号中的
// 一组语句。
var nodesChg = {


	// 获取所有的
	allGrafs: function () {
		return nodeChgArea.getElementsByTagName('p');
	},

	// 所选的段落索引
	grafChoice: function () {
		return document.getElementById('grafCount').selectedIndex;
	},

	// 获取所选的段落
	oldGraf: function () {
		
		return this.allGrafs().item(this.grafChoice());
	},

	// 获取文本值
	inText: function () {
		return document.getElementById('textArea').value;
	},

	// 创建新的文本节点
	newText: function () {
		return document.createTextNode(this.inText());
	},
	

	// 创建新的节点，并用新的文字节点填充新的节点
	newGraf: function () {
		var myNewGraf = document.createElement('p');
		myNewGraf.appendChild(this.newText());
		return myNewGraf;
	},

	// 获取在nodeChgArea区域中已有的<p>个数
	grafCount: function () {
		return this.allGrafs().length;
	},

	// 获取所表单单选按钮标记内容
	actionType: function () {
		var radioButtonSet = document.getElementsByTagName('form')[0].nodeAction;

		for (var i = radioButtonSet.length - 1; i >= 0; i--) {
			if(radioButtonSet[i].checked){
				return i;
			}
		}

		return -1;
	},

	// 实现操作，并操作之后重新绑定选择列表
	doAction: function () {

		switch (this.actionType()) {
			case 0:
				// 此处为什么不先做其他函数化处理呢？
				// 如果要做函数化处理，应该怎么做
				nodeChgArea.appendChild(this.newGraf());
				break;
			case 1:
				if (this.grafCount() > 0) {
					nodeChgArea.removeChild(this.oldGraf());
					break;
				}
			case 2:
				if (this.grafCount() > 0) {
					nodeChgArea.insertBefore(this.newGraf(), this.oldGraf());
					break;
				}
			case 3:
				if (this.grafCount() > 0) {
					nodeChgArea.replaceChild(this.newGraf(), this.oldGraf());
					break;
				}
			// case label_1:  // 将actionType外提之后，在此处出现错误：label_1 is not defined
			// 	// statements_1
			// 	break;
			default:
				alert('No valid action was chosen')
				break;
		}


		document.getElementById('grafCount').options.length = 0;

		// 添加第二个的时候，<select>在视窗会变成2，但选项还是1
		// for (var i = nodeChgArea.getElementsByTagName('p').length - 1; i >= 0; i--) {
		// 	document.getElementById('grafCount').options[i] = new Option(i + 1);
		// }

		for (var i = 0; i < nodeChgArea.getElementsByTagName('p').length; i++) {
			document.getElementById('grafCount').options[i] = new Option(i + 1);
		}

		// 不执行其他操作（包括默认事项和冒泡、捕获事件）
		return false;
	},

	// 初始化nodeChgArea内容
	
	// 最后是init()函数，它的作用只是初始化nodeChgArea 供以后使用。最重要的是，在这个例程的末尾
	// 不加逗号——除了最后一个语句之外，每个语句都应该以逗号结尾（函数本质上是一个扩展的语句）。

	init: function () {
		return nodeChgArea = document.getElementById('modifiable');
	}

}
// 频繁使用this的原因
// 在对象字面值中，只需通过引用this，就能够引用这个对象的所有属性和方法。
// 对象字面值的this 必须遵守JavaScript 对于this 的一般规定——this 引用的内容取决
// 于调用它的位置。








































































