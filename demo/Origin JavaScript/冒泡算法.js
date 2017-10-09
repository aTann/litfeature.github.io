
// 冒泡，
// 每次把最大的冒上去
// 每次在未能确定的排列中继续冒泡，需要减去已经冒出的
var BubbleSort = function (unsortarr) {
	for (var i = unsortarr.length - 1; i >= 0; i--) {
		for (var j = i - 1; j >= 0; j--) {
			if (unsortarr[j] > unsortarr[i])
			{
				var temp = unsortarr[i];
					unsortarr[i] = unsortarr[j];
					unsortarr[j] = temp;
			}
		}
	}

	return unsortarr;	// [ 1, 2, 4, 5, 6, 7, 8, 9 ]
}

/*var BubbleSort = function (unsortarr) {
	for (var i = unsortarr.length - 1; i >= 0; i--) {
		for (var j = unsortarr.length - 1; j >= 0; j--) {
			if (unsortarr[j] > unsortarr[i])
			{
				var temp = unsortarr[i];
					unsortarr[i] = unsortarr[j];
					unsortarr[j] = temp;
			}
		}
	}

	return unsortarr; //[ 9, 8, 7, 6, 5, 4, 2, 1 ]
}*/


var unsortarr = [1,9,2,7,5,6,8,4]
console.log(BubbleSort(unsortarr));



















