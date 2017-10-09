
window.onload = initAll;

function initAll() {
	// document.getElementById('Lincoln').onclick = saySomething;
	// document.getElementById('Kennedy').onclick = saySomething;
	// document.getElementById('Nixon').onclick = saySomething;

	for (var i = 0; i < document.getElementsByTagName('input').length; i++) {
		document.getElementsByTagName('input')[i].onclick = saySomething;
	}
}


function saySomething() {
	switch (this.id) {
		case 'Lincoln':
			// console.log(this); // <input type="button" id="Lincoln" value="Lincoln">
			alert('Four score and seven years ago...');
			break;
		case 'Kennedy':
			// console.log(this); // <input type="button" id="Kennedy" value="Kennedy">
			alert('Ask not what your country can do for you...');
			break;
		case 'Nixon':
			// console.log(this); // <input type="button" id="Nixon" value="Nixon">
			alert('I am not a crook!')
			break;
		default:
			// statements_def
			break;
	}
}






































