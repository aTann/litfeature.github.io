window.onload = initAll;

var nodeChgArea;  // 做选定的删除区域

function initAll() {
	document.getElementsByTagName('form')[0].onsubmit = nodeChager;

	// 为链接做点击事件 
	// document.getElementById('deleteNode').onclick = delNode;
	nodeChgArea = document.getElementById('modifiable');
}



// 创建文本节点、创建新元素节点并且追加子节点，以防页面无效的现象出现
// 使用innerHTML同样实现效果，但是innerHTML容易导致无效标签现象，而此处的方法不会
// 添加节点
function addNode() {
	var intext = document.getElementById('textArea').value;
	// 创建新的文本节点newText，包含在textArea中找到的文本
	var newText = document.createTextNode(intext);
	// console.log(newText);
	// 创建新的元素节点newGraf，属段落标签，也可以其他的标签（包括HTML无定义的）
	var newGraf = document.createElement('p');
	// 新的文本节点newText通过.appendChild()添加到新元素节点newGraf中
	// 为了将新文本添加到新段落中，我们必须调用appendChild()。
	newGraf.appendChild(newText);
	
	// 新节点通过.appendChild()添加到body中
	// var docBody = document.getElementsByTagName('body')[0];
	
	nodeChgArea.appendChild(newGraf);

	return false;	
};

// 删除节点
function delNode1() {
	// 获取所有的<p>元素
	var allGrafs = document.getElementsByTagName('p');
	
	// 判定nodeChgArea区域中是否有<p>元素，并获取<p>集合
	// console.log(nodeChgArea.getElementsByTagName('p'))
	// if (nodeChgArea.hasChildNodes('p')) {
	// 	allGrafs = nodeChgArea.getElementsByTagName('p');
	// }
	
	
	// 判断是有<p>，至少为1条
	// 长度是从1开始的
	if (allGrafs.length > 1) {
		// 获取最后面的标签元素
		// .item()
		var lastGrafs = allGrafs.item(allGrafs.length - 1);
		
		// 获取整个body内容
		var bodyDoc = document.getElementsByTagName('body')[0];
		// 从<body>中利用.removeChild()删除所获取的最后一个标签元素
		bodyDoc.removeChild(lastGrafs);


	}else {
		// 什么都没有删除
		alert('nothing to remove!')
	}

	return false;
};

// 删除指定的段落节点
function delNode() {
	// 利用<select id="grafCount">获取选择删除的段落
	var grafChoice = document.getElementById('grafCount').selectedIndex;
	
	// 获取nodeChgArea区域中所有的段落内容
	var allGrafs = nodeChgArea.getElementsByTagName('p');

	// 获取选择的段落内容 
	var oldGraf = allGrafs.item(grafChoice);

	// 利用.removeChild()删除选定的段落
	nodeChgArea.removeChild(oldGraf);
};


// 插入节点
function insertNode(argument) {
	// 获取段落序数作为插入的索引
	var grafChoice = document.getElementById('grafCount').selectedIndex;
	// 获取#textArea中值
	var inText = document.getElementById('textArea').value;
	// 创建新的文本节点，放置所获取的#textArea值
	var newText = document.createTextNode(inText);
	// 创建新<p>节点
	var newGraf = document.createElement('p');

	// 文字节点插入新建的<p>中
	newGraf.appendChild(newText);

	var allGrafs = nodeChgArea.getElementsByTagName('p');
	var oldGraf = allGrafs.item(grafChoice);

	// 新建<p>插入nodeChgArea
	nodeChgArea.insertBefore(newGraf, oldGraf);

};

function nodeChager() {
	// 设置选项选择标记
	var actionType = -1;
	// 获取<form>表单内name=nodeAction元素个数
	var radioButtonSet = document.getElementsByTagName('form')[0].nodeAction;

	// 标记nodeChgArea区域<p>元素个数
	var grafCount = nodeChgArea.getElementsByTagName('p').length;

	// 遍历单选项
	for (var i = radioButtonSet.length - 1; i >= 0; i--) {
			// 选择并标记当下的选项
			if (radioButtonSet[i].checked) {
				actionType = i;
			}
		}
	// 利用多条件选项进行功能选择
	switch (actionType) {
			// actionType = 0，表示选择了添加元素项
			case 0:
				addNode();
				break;
			// actionType = 1，表示选择了删除元素项，
			// 但需要判定该区域是否有需要删除的元素
			case 1:
				if (grafCount > 0) {
					delNode();
					break;
				}
			case 2:
				if (grafCount > 0) {
					insertNode();
					break;
				}
			// 误（无）操作
			default:
				alert('No valid action was chosen')
				break;
		}

	// 添加<selected>选项内容，为各段落
	document.getElementById('grafCount').options.length = 0;

	for (var i = 0; i < nodeChgArea.getElementsByTagName('p').length ; i++) {
			document.getElementById('grafCount').options[i] = new Option(i + 1);
		}
	
	return false;
};



















