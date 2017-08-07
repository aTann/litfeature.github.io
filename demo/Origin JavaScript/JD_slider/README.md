

偶然翻看到京东的幻灯片，突然手痒想要弄弄就查看了一下京东幻灯片，猜测了一下他们的动作以及行为样式，也在网上找了一个淡入淡出的代码，从而实现得到了这个demo：

先查看京东HTML源代码发现(部分无关内容已删)：

```
<ul class="slider_list J_slider_list">
    <li class="J_slider_item slider_item" style="opacity: 0; z-index: 0; position: absolute;"> 
        <a href="#">                        
        	<img alt="" src=".jpg" class="J_slider_item_img slider_item_img">                        
        </a>
  	</li>
  	<li class="J_slider_item slider_item slider_item_active" style="opacity: 0; z-index: 0; position: absolute;"> 
        <a href="#">                        
        	<img alt="" src=".jpg" class="J_slider_item_img slider_item_img">                        
        </a>
  	</li>
</ul>
```

在源代码当中发现了样式
```
style="opacity: 0; z-index: 0; position: absolute;"
style="opacity: 1; z-index: 1; position: absolute;"
```

大胆假设下，京东的幻灯片是利用样式中absolute进行重叠在一起，然后利用opacity: 0; z-index: 0; 进行隐藏，然后利用opacity: 1; z-index: 1;进行展示

大概的步骤如下：
  1. 搜索元素<ul.slider_list>
  2. 为<ul.slider_list>中的每一项`<li>`添加class = slider_item，并为他们添加隐藏样式 `style="opacity: 0; z-index: 0; position: absolute;"`
  3. 当某一项需要显示，为该项添加class = slider_item_active，标记该项正在显示，并为其添加显示style="opacity: 1; z-index: 1; position: absolute;"
