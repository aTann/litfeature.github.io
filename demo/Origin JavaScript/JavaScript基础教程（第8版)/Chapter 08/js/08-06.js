
// onmousemove事件
// 当页面的访问者移动鼠标时，就会触发onmousemove 事件。

// 这个脚本让眼睛一直盯着用户的鼠标指针

document.onmousemove = moveHandler;

function moveHandler(evt) {
	// if (!evt) {
	// 	evt = window.event;
	// }

	evt = evt || window.event;
	evt.preventDefault();
	animationEyes(evt.clientX, evt.clientY);
}
// 这个函数根据传递给它的X 和Y 坐标转动眼睛。
function animationEyes(xPos, yPos) {
	var rightEye = document.getElementById('rEye');
	var leftEye = document.getElementById('lEye');
	var rightEyeball = document.getElementById('rDot').style;
	var leftEyeball = document.getElementById('lDot').style;

	// 根据眼球和眼眶位置摆动眼球
	leftEyeball.left = newEyeBallPos(xPos, leftEye.offsetLeft);
	leftEyeball.right = newEyeBallPos(yPos, leftEye.offsetTop);
	rightEyeball.left = newEyeBallPos(xPos, rightEye.offsetLeft);
	rightEyeball.right = newEyeBallPos(yPos, rightEye.offsetRight);

	// 保证眼球左右摆动不会外出眼眶
	function newEyeBallPos(currentPos, eyePos) {
		return Math.min(Math.max(currentPos, eyePos+3), eyePos+17) + 'px';
	}
}
// 页面上有许多点（或者设计者希望的其他东西）一直跟
// 随着鼠标指针的移动。我们不想重复已经存在的效果，所以设计了转动的眼睛。但是，如果你
// 希望在页面上显示尾随鼠标指针的点，那么你应该能够通过修改这个脚本来实现。

// onmouseover事件  当鼠标移动进任何注册了onmouseover 事件处理程序的区域时，就会触发这个事件。
// onmouseout事件  当鼠标离开一个注册了此事件的区域时，就会触发这个事件

