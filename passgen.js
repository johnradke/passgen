/*!
 * Passgen.js
 * Copyright 2012, John Radke
 */

$(document).ready(function() {
	$('a').click(function(event) {
		$('div').html(newWord(20));
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