
// 如果某一天是周末，你可能希望向用户显示不同的消息。
window.onload = initDate;

function initDate() {
	var now = new Date();

	if (now.getDay() > 0 && now.getDay() < 6) {
		var dtString = "Sorry, it's a weekday.";
	}
	else {
		var dtString = "Hooray, it's a weekend";
	}
	document.getElementById('dtField').innerHTML = dtString;
}





















