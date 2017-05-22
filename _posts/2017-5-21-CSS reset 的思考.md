---
layout: post
title: CSS reset的思考(补)
---

{{ page.title }}
================
<p class="meta">{{ page.date | date_to_string }}</p>

当我很low的时候，使用着`*{ margin: 0; padding: 0; }`，而且还用了很多年，直到自己看到了还有Eric Meyer的Reset，Nicolas Gallagher更加精细的normalize.css（其实我没有用过，因为我还没有了解其CSS的源码）。当初有知道使用CSS reset的原因是不同浏览器对不同标签有着不同的默认值，需要将整个浏览器空间进行基准“清零”，将浏览CSS创作空间进行白纸化，使得不同浏览基础的兼容空间。

虽然知道需要做此类的浏览器兼容性，但是一直以来都是使用着最不推荐的代码`*{ margin: 0; padding: 0; }`，从来没有深究过哪些元素需要进行reset重置处理，后来现在也在用别人使用的reset/normalize.css，但是我们用CSS reset真的不需要考虑吗？拿来就用就可以了吗？曾经在一个网站看到了对CSS Reset使用的建议是，结合自己的业务进行精细化处理，到底是怎样的精细化处理呢？

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




