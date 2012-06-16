/*!
 * Passgen.js
 * Copyright 2012, John Radke
 */

$(document).ready(function() {
	$('#go').click(function(event) {
		var passdiv = $('#passwords');
		passdiv.empty();
		
		var count = $('#count').val();
		var length = $('#length').val();
		for(var i = 0; i < count; i++)
		{
			passdiv.append($('<div>').addClass('password').text(newWord(length)));
		}
	});
	
	var countselect = $('#count');
	for (var i = 1; i <= 24; i++)
	{
		countselect.append($('<option>', {value: i}).text(i));
	}
	
	countselect.change(function() {
		if (this.value === '1') {
			$('#passwordtext').text('password');
			$('#isaretext').text('is');
		}
		else {
			$('#passwordtext').text('passwords');
			$('#isaretext').text('are');
		}
	});

	var lengthselect = $('#length');
	for (var i = 6; i <= 24; i++)
	{
		lengthselect.append($('<option>', {value: i}).text(i));
	}
	
	alert($.cookie('gimmepasscookie'));
	
	$('select').change(function() {
		$.cookie('gimmepasscookie', countselect.val() + '*' + lengthselect.val());
	});
});

function pickTriplet(start) {
	var possibles = Object.keys(tripletWeights).filter(function(key) { return key.substring(0, start.length) === start });
	var total = possibles.map(function(poss) { return tripletWeights[poss]}).reduce(function(a, b) { return a + b });
	var rnd = randInt(1, total);
	var m = 0;
	var retval;
	$.each(possibles, function(index, poss) {
		if (tripletWeights[poss] + m >= rnd) {
			retval = poss;
			return false; // exits $.each()
		}
		m += tripletWeights[poss];
	})
	return retval;
}

function newWord(desiredLength) {
	var firstLetter = String.fromCharCode(randInt(97,122));
	var newWord = pickTriplet(firstLetter);
	while (newWord.length < desiredLength) {
		var endPair = newWord.slice(-2);
		newWord += pickTriplet(endPair).slice(-1);
	}
	return newWord;
}

// with one parameter, returns integer between 0 and parameter
// with two parameters, returns integer between one and the other
function randInt() {
	if (arguments.length == 1) {
		var start = 0;
		var end = arguments[0];
	}
	else {
		var start = Math.min(arguments[0], arguments[1]);
		var end = Math.max(arguments[0], arguments[1]);
	}
	
	return Math.floor(Math.random() * (end - start + 1)) + start
}