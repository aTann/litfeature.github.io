---
layout: post
title: CSS reset的思考(补)
---

{{ page.title }}
================
<p class="meta">{{ page.date | date_to_string }}</p>
（2017-5-23 补 21号没有完成）
当我很low的时候，使用着`*{ margin: 0; padding: 0; }`，而且还用了很多年，直到自己看到了还有Eric Meyer的Reset，Nicolas Gallagher更加精细的normalize.css（其实我没有用过，因为我还没有了解其CSS的源码）。当初有知道使用CSS reset的原因是不同浏览器对不同标签有着不同的默认值，需要将整个浏览器空间进行基准“清零”，将浏览CSS创作空间进行白纸化，使得不同浏览基础的兼容空间。

虽然知道需要做此类的浏览器兼容性，但是一直以来都是使用着最不推荐的代码`*{ margin: 0; padding: 0; }`，据说使用`*`通配符会反而会导致破坏一些标签样式的兼容性，同时从来没有深究过哪些元素需要进行reset重置处理，后来现在也在用别人使用的reset/normalize.css，但是我们用CSS reset真的不需要考虑吗？拿来就用就可以了吗？曾经在一个网站看到了对CSS Reset使用的建议是，结合自己的业务进行精细化处理，到底是怎样的精细化处理呢？

以下是这段时间使用的CSS Reset代码，并尝试对其进行反思和查证：
```
/* Reset */

	html, body, div, span, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	abbr, address, cite, code,
	del, dfn, em, img, ins, kbd, q, samp,
	small, strong, sub, sup, var,
	b, i,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, figcaption, figure,
	footer, header, hgroup, menu, nav, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		font-size: 100%;
		vertical-align: baseline;
		background: transparent;
	}

	body {
		line-height: 1;
	}

	img {
		max-width: 100%;
	}

	article, aside, details, figcaption, figure,
	footer, header, hgroup, menu, nav, section {
		display: block;
	}

	nav ul {
		list-style: none;
	}

	blockquote, q{
		quotes: none;
	}

	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}

	a {
		margin: 0;
		padding: 0;
		font-size: 100%;
		vertical-align: baseline;
		background-color: transparent;
		color: #fff;
	}

	/* change colours to suit your needs */
	ins {
		background-color: #ff9;
		color: #000;
		text-decoration: none;
	}

	/* change colours to suit your needs */
	mark {
		align-content: #ff9;
		color: #000;
		font-style: italic;
		font-weight: bold;
	}

	del {
		text-decoration: line-through;
	}

	abbr[title], dfn[title] {
		border-bottom: 1px dotted;
		cursor: help;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	/* change border colour to suit your needs */
	hr {
		display: block;
		height: 1px;
		border: 0;
		border-top: 1px solid #ccc;
		margin: 1em 0;
		padding: 0;
	}

	input, select {
		vertical-align: middle;
	}
```

先来第一段代码的解析考察：
```
	html, body, div, span, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	abbr, address, cite, code,
	del, dfn, em, img, ins, kbd, q, samp,
	small, strong, sub, sup, var,
	b, i,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, figcaption, figure,
	footer, header, hgroup, menu, nav, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		font-size: 100%;
		vertical-align: baseline;
		background: transparent;
	}

```
只标出有差别的地方：数字或是标签正项没有()[]表示三个浏览器的表现都一样，如果存在()外套表示是Chrome测得，如果存在[]外套表示IE11测得
```
		ff51.0.1 (32 位)   (chrome58.0.3029.110 (64-bit)) [IE 11.0.42]
h1 : margin-top: 21[(21.440)]px, margin-bottom: 21[(21.440)]px; 
h2 : margin-top: 19[(19.920)]px, margin-bottom: 19[(19.920)]px; 
h3 : margin-top: 18(18.720)[18.73]px, margin-bottom: 18(18.720)[18.73]px;
h4 : margin-top: 21[(21.280)]px, margin-bottom: 21[(21.280)]px;
h5 : margin-top: 22(22.178)[22.15]px, margin-bottom: 22(22.178)[22.15]px;
h6 : margin-top: 24(24.978)[25]px, margin-bottom: 24(24.978)[25]px;
p : margin-top: 16x, margin-bottom: 16px;
blockquote : margin-top: 16x, margin-bottom: 16px; margin-left: 40px; [(margin-right:40px;)]
pre : margin-top: 13[13.33]px, margin-bottom: 13[13.33]px;

dl : margin-top: 1px, margin-bottom: 16px;
dd : margin-left: 40px;
ol : margin-top: 16px, margin-bottom: 16px; padding-left: 40px;
ul : margin-top: 16px, margin-bottom: 16px; padding-left: 40px;

fieldset : maring-left: 2px; border: 1.6(2)[1]px groove rgb(227,​ 227,​ 227); padding-top: 5(5.6)[3]px; padding-right: 10(12)[3]px; padding-bottom: 12(10)[4]px; padding-left: 10(12)[3]px;

th, td : padding: 1px;
figure : margin-top: 16px; margin-bottom: 16px; margin-left: 40px; [(margin-right: 40px;)]
menu : margin-top: 16px; margin-bottom: 16px; padding-left: 40px;

addr : (text-decoration: underline dotted;)
tt, code, kbd, samp { (font-family: monospace;) }
mark { (background-color: yellow; color: black;) }
q::before { content: open-quote; }
q::after { content: close-quote; }

[legend : padding-left: 2px, padding-right: 2px]
```
其实里面有部分是自然语义的元素，根本没有margin/padding的，而且大部分的背景都是默认的，也就是透明的，那么再加透明有何用。其他除了这个的Reset有点不够精细之外，其他的Reset还是有一定道理。在前端大牛[张鑫旭](http://www.zhangxinxu.com/wordpress/?p=758)有着比较深的研究，在里面提出有一个比较感兴趣的是使用CSS类库进行使用，有空应该去尝试下
测试使用了两个demo，[CSS Reset的思考](/demo/2017-5-21/2017-5-21-CSS-Reset的思考.html) [2017-5-21-背景透明的测试](/demo/2017-5-21/2017-5-21-背景透明的测试.html)

























