
// 在弹出菜单中选择一个值，然后就可以创建第二个弹出菜单的内容
window.onload = initForm;

function initForm() {
	document.getElementById('months').selectedIndex = 0;
	document.getElementById('months').onchange = populateDays;	
};


function populateDays() {
	var monthDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var monthStr = this.options[this.selectedIndex].value;

	if (monthStr != '') {

		var theMonth = parseInt(monthStr);
		
		document.getElementById('days').options.length = 0;
		for (var i = 0; i < monthDays[theMonth]; i++) {
		// for (var i = 1; i <= monthDays[theMonth]; i++) { 最前面有一个是空白的
			document.getElementById('days').options[i] = new Option(i+1);
		}
	}	
};




