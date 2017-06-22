1. 在HTML selector中有着常用的#ID、.Class、Element这三个选择器，在W3C中说到`What makes attributes of type ID special is that no two such attributes can have the same value; whatever the document language, an ID attribute can be used to uniquely identify its element. `#ID是唯一无二的命名，而Class是可以多次重用;

2. 在日常的场景当中，我们习惯的使用着附带Class使用群组选择器(eg.: h1.class1/.class1 .class2)，或是子代选择器(eg.: h1 > .class1)，并且习惯于给Class定义，从而给当前的节点结构赋予一定的文档意义(eg.:.nav-hasmore .nav-out li.more:hover)。在我已有的HTML就有很多类似的应用(eg.: `.header-wrapper > .header > .header-content`, `.navbar-default .navbar-right > .active > a`)，在CSS设计模式当中有着一种叫BEM的设计模式，在命名之中都有着特定的定义。

> BEM的设计模式的核心如下：
>> Block（块）、Element（元素）、Modifier（修饰符）
> <site>[没那么难，谈CSS的设计模式-灵感小窝](http://ideazhao.com/2016/08/07/css_design_method/)</site>

> [命名规则样例：](https://en.bem.info/methodology/quick-start/)
> from：<site>BEM-Quick Start</site>
>> 
>> block__elem1__elem2 (.search-form__content__input)    
>> block-name_modifier-name (.search-form__input)    
>> block-name__element-name_modifier-name (.search-form__button_disabled)     
>> block-name_modifier-name_modifier-value (.search-form_theme_islands)     
>> block-name__element-name_modifier-name_modifier-value (.search-form__button_size_m)        
>>

3. 在类似BEM的给予.Class以特定的定义，并且有着代表节点结构的意味，对于团队协作和开发维护过程中自然有着重大的意味，毕竟对于.Class有着一目了然的命名。但是从某一种意味上，这种命名设计模式会不会破坏了.Class制作的初衷，会不会极大的破坏.Class使用的灵动性，往往使用了该类命名就拥有了特定的定义。对于给予.Class特定定义和命名之后，这个和#ID使用的唯一无二性就没有什么区别了，有的只是权重上的区别吧，而且对于使用#ID对于Origin JavaScript支持还更好一点，毕竟之前的Origin JavaScript对于.Class 直接API貌似没有，而且在W3C标准文档在[Class Selector](https://www.w3.org/TR/CSS22/selector.html#class-html)中有一个Note说到：

>Note. 
>>CSS gives so much power to the "class" attribute, that authors could conceivably design their own "document language" based on elements with almost no associated presentation (such as DIV and SPAN in HTML) and assigning style information through the "class" attribute. Authors should avoid this practice since the structural elements of a document language often have recognized and accepted meanings and author-defined classes may not.

在该Note.中提到，在使用.Class当中，滥用div和span和.Class之间的搭配，过多的给予.Class以代表HTML节点意义的命名和意义，这是不应该的。或许，要对该Note问题的解决，还需要用到HTML Semantic(HTML语义化)以及准备好在开发中使用适当的注释，从而尝试让.Class更多的回归它的本质工作，不要赋予.Class的含义和使用，因为这是懒惰和过渡使用的行为。

4. 但若无规范，一股脑的使用是.Class，项目大都是团结协作开发的，没有规范，开发和维护起来是一个大问题。

还有[没那么难，谈CSS的设计模式-灵感小窝](http://ideazhao.com/2016/08/07/css_design_method/)中提到过的CSS的设计模式，里面提高了OOCSS、SMACSS、Meta CSS、BEM