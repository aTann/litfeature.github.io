
// 把24小时制转换为12小时制

window.onload = showTheTime;

function showTheTime() {
	var now = new Date();

	document.getElementById('showTime').innerHTML = showTheHours(now.getHours())
		+ showZeroField(now.getMinutes()) + showZeroField(now.getSeconds()) + showAMPM();

		setTimeout(showTheTime, 1000);

		// 如果在24小时制下，返回其数字
		// 如果在12值下，<0-->13情况下，显示原来数字
		// == 0 , 12 
		// 其余 theHour - 12
		function showTheHours(theHour) {
			if (show24Hour() || (theHour > 0 && theHour < 13)) {
				return theHour;
			}

			if (theHour == 0) {
				return 12;
			}

			return theHour - 12;
		}

		// 为分钟/秒钟下进行两位数显示格式 :07/:17
		function showZeroField(inValue) {
			return (inValue > 9) ? (':' + inValue) : (':0' + inValue);
			}

		// 是否选中24小时制
		function show24Hour() {
			return document.getElementById('show24').checked;
		}

		// 如果在12小时制下，显示AMPM
		function showAMPM() {
			if (show24Hour()) {
				return '';
			}
			else {
				return (now.getHours() < 12) ? ' AM ' : ' PM ';
			}
		}
}



