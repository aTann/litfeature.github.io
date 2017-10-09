
// 自动补全表单字段
// 帮助站点访问者的一种非常好的方法是，降低在字段中输入数据的复杂性。

window.onload = initAll;

var xhr = false;
var statesArray = new Array();

function initAll() {
	document.getElementById('searchField').onkeyup = searchSuggest;


	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject('Microsoft.XMLHTTP');
			} catch(e) {
				// statements
				console.log(e);
			}
		}
	}

	if (xhr) {
		xhr.onreadystatechange = setStateArray;
		xhr.open('GET', 'us-states.xml', true);
		xhr.send(null);
	}
	else {
		alert("Sorry, but I coundn't create an XMLHttpRequest");
	}

}


function setStateArray() {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			if (xhr.responseXML) {
				var allStates = xhr.responseXML.getElementsByTagName('item');
				for (var i = 0; i < allStates.length; i++) {
					statesArray[i] = allStates[i].getElementsByTagName('label')[0].firstChild;
				}
			}
		}
		else {
			alert('There was a problem with the request ' + xhr.status);
		}
	}

}


function searchSuggest() {

	var str = document.getElementById('searchField').value;
	document.getElementById('searchField').className = '';

	if (str != '') {
		document.getElementById('popups').innerHTML = '';
		
		for (var i = 0; i < statesArray.length; i++) {
			var thisState = statesArray[i].nodeValue;
			if (thisState.toLowerCase().indexOf(str.toLowerCase()) == 0) {
				// alert(thisState);
				var tempDiv = document.createElement('div');
				tempDiv.innerHTML = thisState;
				tempDiv.onclick = makeChoice;
				tempDiv.className = 'suggestions';
				document.getElementById('popups').appendChild(tempDiv);
			}
		}
		var foundCt = document.getElementById('popups').childNodes.length;
		if (foundCt == 0) {
			document.getElementById('searchField').className = 'error';
		}
		if (foundCt == 1) {
			document.getElementById('searchField').value = document.getElementById('popups').firstChild.innerHTML;
			document.getElementById('popups').innerHtml = '';
		}
	}


}


function makeChoice(evt) {
	if (evt) {
		var thisDiv = evt.target;
	}
	else {
		var thisDiv = window.event.scrElement;
	}
	document.getElementById('searchField').value = thisDiv.innerHTML;
	document.getElementById('popups').innerHtml = '';
}





















