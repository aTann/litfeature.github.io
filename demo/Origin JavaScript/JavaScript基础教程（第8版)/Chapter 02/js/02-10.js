window.onload = initAll;

function initAll() {
	var ans = prompt('Enter a number: ', '');

	try {
		if (!ans || isNaN(ans) || ans < 0 ) {
			throw new Error(': Not a valid number');
		}
		alert('The square root of ' + ans + ' is ' + Math.sqrt(ans));
	} 
	catch(errMsg) {
		// statements
		// console.log(e);
		alert(errMsg.message);
	}
	finally{
		// alert('Operation had been Finished!');
		document.write('Operation had been Finished!');
	}
}