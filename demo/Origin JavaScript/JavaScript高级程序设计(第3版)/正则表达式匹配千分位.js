
// 添加千分位
// 

var text = 123456.33;
var re = /(\d)(?=(\d{3})+\.)/g;

// console.log(text.toString().search(re));
var n = text.toString().replace(re, function ($1, $2) {
	console.log($1 + " : " + $2); // 3 : 3   
	return $2 + ','
})

console.log(n);



function checkThousandSep(inNumber) {
	if (inNumber === '' || inNumber === undefined) {
		console.log('请输入数字');
		return;
	}

	if (isNaN(inNumber)) {
		// console.log('请输入正确的数据');
		return 'NaN';
	}

	inNumber = inNumber.toString() || inNumber;

	// 是否带小数点
	if (/\./.test(inNumber)) {
		// console.log(inNumber);
		var re = /(\d)(?=(\d{3})+\.)/;
		var inNumber = inNumber.replace(re, function ($1, $2) {
			return $1 + ',';
		});
		return inNumber;
	}
	else {
		var re = /(\d)(?=(\d{3})+$)/;
		var inNumber = inNumber.replace(re, '$1,');

		return inNumber + '.00';
	}
}


console.log(checkThousandSep('123456'));

// console.log();

// 提取含有千分位的数据例如：
// 今天支出11,000元，还有2,200
// 今天支出500元，还有600元

var str = '今天支出500元，还有600元';
var pattrenNum = /(\d+)/g;

// console.log(pattrenNum.exec(str).length);

let m = true;
while (m) {
	m = pattrenNum.exec(str);
	console.log(m);
}

/*// 带g之后，使用exec是一个相对于一个迭代器了
var ms = pattrenNum.exec(str);
console.log(ms.lastIndex);
console.log(ms);
// [ '500', '500', index: 4, input: '今天支出500元，还有600元' ]


var ms2 = pattrenNum.exec(str);
console.log(ms2.lastIndex)
console.log(ms2);
// [ '600', '600', index: 11, input: '今天支出500元，还有600元' ]
*/




// var ms = str.match(pattrenNum);  // pattrenNum 带g和不带g得到结果不一样的


// var text = "cat, bat, sat, fat";
// var pattern1 = /.at/gi;
// var matches = pattern1.exec(text);
// console.log(matches);


var str = '今天支出500元，还有600元';
var pattren = /(支出(\d+)元)|(还有(\d+)元)/g;

var mx = pattren.exec(str);
console.log();
console.log(mx.lastIndex);
console.log(mx);

mx = pattren.exec(str);

console.log(mx);
