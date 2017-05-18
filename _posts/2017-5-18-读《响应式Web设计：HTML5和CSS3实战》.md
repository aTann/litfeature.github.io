---
layout: post
title: 读《响应式Web设计：HTML5和CSS3实战》
---

{{ page.title }}
================
<p class="meta">{{ page.date | date_to_string }}</p>

该本书由一名具有十多年经验的网页设计师前端工程师，[Ben Frain](www.benfrain.com)，撰写，于2012年Packt Publishing出版，经由王永强翻译,2013年中文简体内容出版。书中主要提及HTML5、CSS3和响应式设计的思路想法。

第1章主要讲述HTML5/CSS3及响应式相较于以前的前端思维的不同和优异;    
第2、3章讲述响应式的实现方法以及响应式下的流式布局实现；    
第4章主要内容为HTML5新标题在响应式下的使用；    
第5、6、7章CSS3样式的惊人转变：选择器、字体和颜色模式、阴影、背景以及动画过渡内容； 
第8章将表单独自拿出来进行提要;  
第9章阐述如何进行解决跨浏览器问题的想法方向，并做相应预测（2012年的预测，现在都已经逐渐发生了）

书中内容简明易懂，语言轻快活泼，并书中技术点辅以例证，整书下来完整实现了一个分布式的网站（看起来略丑），并且书中还提供了大量的网站（2012年时候就存在），以及快捷工作的工具，而且这些网站工具现在仍在更新，技术、想法各方面都让我耳目一新。书中部分内容还引用HTML5、或是CSS3制定标准进行讲述，或给出该处出处，可以让人去更深入的了解。在我看来，给出相应CSS3新特性标准制定和相应使用文档链接，这是本书的一个亮点之一，我看过的其他前端书中（假装看过很多），或是其他相应技术介绍、大方向研究方面的书，都是极少在文中直接给出相应出处和标准制定的，或许是我基础不怎么好，不太能介绍现阶段乱看的书。

我在书中看到的，或学到的：

* 在本书中，我所能学到的响应式想法思维有，对于响应式设计原来是从小处（手机端/低像素）着手，逐步扩大（PC端/大屏幕），并在响应式开发中要遵循的精简原则，在该原则下自然而然的对一些网站判定了不能使用响应式（大型功能性的网站之类的），另外一个原则就是内容优先，内容优先是相对于其他例如图片，杂项元素（侧边栏等），接着一个突破性原则就是不一致性，不必为了一致性而实现网站所有浏览器一致性，这个倘若平常练习还是要做到，在实际当中那是未必了，毕竟一些浏览器下实现一致性花费太多了。

* 响应式中讲究弹性，将过往传统重要的1px抠，转变为0.001%，或是1pm计算，流式布局占中。

* HTML5“散漫”、简洁化，CSS3酷炫方便化，让网页设计更加自由和方便，也对响应式效果呈促进效果。

* 书中提到了跨浏览器问题解决方法论：渐进增强与优雅降级，一个冷硬拒绝旧浏览器，一个是逐步推进和淘汰不兼容浏览器，同时推荐了Modernizr进行对浏览器兼容的修补。

该本书已经出版了5年，这本书相对于现在来看，内容略流于表面，但与当时应该是一本不错的入门和了解响应式发展的书本，当然现在也是不错的了解资料

书中资源和链接贴出：

[书中实现网站-And the winner isn’t](http://www.andthewinnerisnt.com/)	

第1章：	

[响应式网站欣赏-1](http://thinkvitamin.com/)   	
[响应式网站欣赏-2-响应式设计创意收集网站](https://mediaqueri.es/)   	
[Border Radius效果演示](https://testdrive-archive.azurewebsites.net/html5/borderradius/default.html)   	
[CSS3效果欣赏-Panic Inc-已改版](https://panic.com/blog/)   	
[CSS3效果欣赏-marcofolio](http://demo.marcofolio.net/3d_animation_css3/)    
[CSS3效果欣赏-designlovr](http://designlovr.com/)   	

第2章：	

[W3C规范审批流程](http://www.w3.org/2005/10/Process-20051014/tr)  	
[CSS3 变换模块Level规范](http://www.w3.org/TR/css3-3d-transforms/)     
[viewport meta CSS引入文档 @viewport](http://dev.w3.org/csswg/css-device-adapt/)       

第3章：	

[伊桑·马科特在A List Apart 上发表的有关响应式网页设计](http://www.alistapart.com/articles/responsive-web-design/)   	
[《无懈可击的Web 设计》-Dan Cederholm-2006](https://book.douban.com/subject/1937913/)         	
		主要为提到伊桑·马科特为其撰写了一章关于流动布局的内容，内容中提供固定像素宽度转换对应百分比宽度：
				目标元素宽度÷上下文元素宽度=百分比宽度	


[Filament Group的“响应式图片”(已失效)](http://filamentgroup.com/lab/responsive_images_experi_ menting_with_context_aware_image_sizing/)     
[Matt Wilcox 的“自适应图片”](http://adaptive-images.com/)      

第四章：    
[html5shiv.js-Remy Sharp](https://remysharp.com/2009/01/07/html5-enabling-script/)     
[Modernizr](http://www.modernizr.com)      
[HTML5样板文件](http://html5boilerplate.com/)     		

>样板文件是一个预先做好的融合了“最佳实践”HTML5 文件，包含一些基本样式（如之前提到过的normalize.css）、polyfill 和一些必要的工具如Modernizr。
>它还包含一个自动合并CSS 和JS 文件、自动删除注释以生成生产环境代码的构建工具。

[W3C定义-lang](http://dev.w3.org/html5/spec/Overview.html#attr-lang)           
[完整的语言列表](http://www.iana.org/assignments/language-subtag-registry)            
[HTML 5.2草案](http://w3c.github.io/html/#non-conforming-features)       
[HTML5.2-语义化标签](http://w3c.github.io/html/sections.html#sections)       
[无障碍网页技术应用阅读](https://www.w3.org/WAI/intro/aria)    
[无障碍阅读技术2](https://www.w3.org/TR/wai-aria/roles#role_definitions)       
[非可视桌面阅读器（NVDA）免费测试网站](http://www.nvdaproject.org/)    
[离线浏览-2011年草案内容](https://www.w3.org/TR/2011/WD-html5-20110525/offline.html)			  





未完待续……




































