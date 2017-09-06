
#chapter 08：JQuery 插件开发
"Learning JQuery (Fourth Edition)"

避免和其他库使用` $ `的冲突: `$.noConfict()` `$` 无冲突使用


添加全局函数 `$.addFunc/$.extend({addFunc: function () {} })`

添加 `jQuery` 对象方法：` $.fn.addFunc = function (opts) {}`

隐式迭代: `return this.each() -- 方法的连缀`

提供灵活的方法参数： ` {args1: xx, args2: oo} `

参数对数： ` options.args1 `

添加默认值：` default 对象，opts 对象，var options = $.extend(default, opts) `

回调函数：函数对象作为参数，然后在方法中适当的位置上调用该函数。

可定制的默认值: ` $.fn.shadow.defaults = {}，var options = $.extend({}, $.fn.shadow.defaults, opts); `

使用 jQuery UI 部件工厂创建插件：
```
$.widget('plug_inNameSpace.plug_inName', { 

	// 默认设置
	options:{},

	// 私有方法 -- _create/_open/_close
	_privateMethod: function () {},

	// 接口调用，指令式调用 plug_inName('publicMethod')
	// open/close/destroy
	publicMethod: function () {
		this._privateMethod();

		// 在一个函数中调用this._trigger()可以让代码监听新的自定义事件。
		// this._trigger('publicMethod2');
		
	}

	// method 环绕着生命周期和功能使用进行布置
	// 生命周期 create/destroy
	// 功能 open/close

});
```
