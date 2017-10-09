
/*

1、style="ime-mode: inactive;"   --- GChrome 不行

2、onkeyup="this.value=this.value.replace(/[\u4e00-\u9fa5]/g,'')"

3、IME / keydown 事件，setAttribute('type', 'tel');
EventUtil.addHandler(textbox, 'compositionstart', function (event) {
	
	// 方案一：
	// 使用复合事件进行，失去焦点，再次获取焦点，
	// 以让 IME 失去作用，并利用 placeholder 发出警告

	// event = EventUtil.getEvent(event);
	var context = this;
	// context.blur();
	// setTimeout(function () {
	// 	context.focus();
	
	// }, 300);
	
	// 方案二：
	// 	  一旦发现 IME，设置 type = 'tel'
	// 	  HTML5 type = 'tel' 不能使用 IME
	//   直接设置没有用的
	context.setAttribute('type', 'tel');

	context.placeholder = '请更换输入法';

});

5、使用 type = number，只能输入数字、+、-、.(小数点)，不过会有 step 工具显示，IE11 还没支持
	hidden type = number spin-button 
		input[type=number]::-webkit-inner-spin-button, 
		input[type=number]::-webkit-outer-spin-button {
		  -webkit-appearance: none;
		  margin: 0;
		}
	
		input[type="number"] {
			-moz-appearance: textfield;
		}

	阻止 上下键 step 功能
	  $(document).ready(function() {
	    $("input[type=number]").on("focus", function() {
	        $(this).on("keydown", function(event) {
	            if (event.keyCode === 38 || event.keyCode === 40) {
	                event.preventDefault();
	            }
	        });
	    });

	});

	// 让 type = number 的 spin 不能由 向上 和 向下键 触发
EventUtil.addHandler(textbox, 'focus', function(event) {
	event = EventUtil.getEvent(event);
	var contextEle = this;
	if (contextEle.type == 'number') {
		// 上下按键
		EventUtil.addHandler(contextEle, 'keydown', function (event) {
			var charCode = EventUtil.getCharCode(event);
			if (charCode === 38 || charCode === 40 ) {
				EventUtil.preventDefault(event);
			}
		});

		// 鼠标滑轮
		(function () {
			function handlerMouseWheel(event) {
				event = EventUtil.getEvent(event);
				EventUtil.preventDefault(event);
				console.log(event.type)
			};

			EventUtil.addHandler(contextEle, 'mousewheel', handlerMouseWheel);
			EventUtil.addHandler(contextEle, 'DOMMouseScroll', handlerMouseWheel);
		})();
		
		
	}

});



4、Android：type = tel 弹出数字小键盘



*/


// 建议：多种方法配合





/*
	
	1、 李大仁 - [CSS]浏览器IME输入法控制禁止输入中文
		https://www.lidaren.com/archives/1240

	2、 disable ime mode in google chrome - stackoveflow
		https://stackoverflow.com/questions/15520410/disable-ime-mode-in-google-chrome
	3、 JS how to disable the Chrome browser in textarea ime input
		http://www.programering.com/q/MDMwITNwATY.html

*/