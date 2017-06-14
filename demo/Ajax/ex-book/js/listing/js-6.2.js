$(document).ready( function () {
	$('#letter-a a').click(function (e) {
		e.preventDefault();
		$('#dictionary-a').load('a.html');
		alert('Loaded!')
	});
});