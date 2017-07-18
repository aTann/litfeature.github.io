---
layout: post
title: JavaScript Array的push/pop/unshift/shift以及一个性能简单计算方式
date: 2017-07-18 21:57:40 +0800
categories: web-frontend
pid: 20170718-215740
image: ''
tags: 
- JavaScript
- Array
---

偶然在W3Cplus看到一篇文章 [\[JavaScript学习笔记：数组的push()、pop()、shift()和unshift()\]](http://www.w3cplus.com/javascript/array-part-3.html) ，里面谈到了JavaScript的数组和堆栈以及队列的关系，深入浅出的讲解了堆栈和队列，接着一一的列举和阐释ECMSScript为数组提供的push()/pop()/unshift()/shift()方法。其中push()方法数组末尾添加(一个或多个)元素/pop()方法则将数组末尾的最末的元素删除，unshift()方法是向数组的开头添加(一个或多个)元素，返回新的长度/shift()方法为把数组的第一个元素从数组中删除，返回删除的值，数组空，不操作返回undefined。

继而，作者(大神-大漠)利用这4个方法进行构造实现类似堆栈和队列的行为：push()方法的从末尾进，和，pop()从末尾删，组合一起就是堆栈的行为方式: 先进后出，而shift()/push()尾部进头部出，组合起来就是队列的先进先出。

接着，引用另外一篇文章 [\[王叨叨 - JavaScript学习：JavaScript的数组实现队列与堆栈的方法\]](http://blog.wangdaodao.com/2016-01-20/js-study-0021.html) 进行了一下对push()和unshift()性能测试。分别对push()/unshift()进行100000次操作，得到惊人的结果数据对比，unshift()比push()
慢将近100倍，这可能是JavaScript的数据创建和存取正是利用堆栈的行为方式吧。同时，给出了一个很不错的实现类似unshift()方法的方法，使用reverse()数组取反，然后用push()进行添加，最后reverse()反转回来。文章中测试100000元素的数组进行reverse()一次只需要6ms(对于这个数据和作者所给的代码来看，这是不相符的)，这速度够快的，如果再一次push()+reverse()那么也就是19ms(6ms+7ms+6ms)，和875ms比还是有得赚啊。

对于这篇文章，我最大的感触不是JavaScript 4个方法模拟讲述堆栈和队列的实现，，不是push()、unshift()性能的相爱相杀，也不是reverse()+push()实现unshift()，而是它的性能计算方式，真是过瘾！曾经有看过[Python的性能时间计算](https://stackoverflow.com/questions/1557571/how-do-i-get-time-of-a-python-programs-execution)[内含函数timeit](https://docs.python.org/2/library/timeit.html)，那是有着系统的方法的，增加摸过的C#/Asp.net也是有着[相应的计算](https://msdn.microsoft.com/en-us/library/system.diagnostics.stopwatch.startnew(v=vs.110).aspx)的。在这里竟然看到了最原始的方式，两个时间相减，最后的结果竟然还是挺不错的，巧妙爽手啊！
```
var arr = [ ]; 
var startTime = +new Date(); //+new Date()相当于new Date().valueOf()，返回当前时间的毫秒数 
// push性能测试 
for (var i = 0; i < 100000; i++) { 　　
	arr.push(i); 
	} 
var endTime = +new Date(); 
console.log("调用push方法往数组中添加100000个元素耗时"+(endTime-startTime)+"毫秒"); 
```
写完了再去找一下其他的code timing有着相似的思路，到底时间间隔的寻找无谓endTime-startTime

文章内容著作权所有以及出处：

1. [W3CPlus - JavaScript学习笔记：数组的push()、pop()、shift()和unshift()方法](http://www.w3cplus.com/javascript/array-part-3.html)       
2. [王叨叨 - JavaScript学习：JavaScript的数组实现队列与堆栈的方法](http://blog.wangdaodao.com/2016-01-20/js-study-0021.html)     
3. [Stack Overflow - How to get time of a python program execution?](https://stackoverflow.com/questions/1557571/how-do-i-get-time-of-a-python-programs-execution)        
4. [Microsoft|Developer Network - Stopwatch.StartNew Method ()](https://msdn.microsoft.com/en-us/library/system.diagnostics.stopwatch.startnew(v=vs.110).aspx)