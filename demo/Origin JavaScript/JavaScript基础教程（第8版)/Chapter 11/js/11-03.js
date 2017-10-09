
window.onload = initDate;

function initDate() {
	var now = new Date();
	// now.getHours() - 17
	document.getElementById('dtField').innerHTML = timeString(now.getHours());

	function timeString(theHour) {
		
		// if 越小越往前
		if (theHour < 5.5) {
			return 'what are you doing up so late?';
		}
		if (theHour < 9.5) {
			return 'Good Morning!';
		}
		if (theHour < 18.5) {
			return 'No surfing during working hours!';
		}
		return 'Good Evening!';
	}
}


















