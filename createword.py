import json
import random

weightsfile = open('weights.pck', 'r')
tripletWeights = json.load(weightsfile)
weightsfile.close()

def picktriplet(start):
	possibles = [trip for trip in tripletWeights.keys() if trip.startswith(start)]
	total = sum([tripletWeights[trip] for trip in possibles])
	rnd = random.randint(1, total)
	m = 0
	for poss in possibles:
		if (tripletWeights[poss] + m >= rnd):
			return poss
		m += tripletWeights[poss]

desiredlength = 8

firstLetter = chr(random.randint(97,122))

newword = picktriplet(firstLetter)

while (len(newword) < desiredlength):
	endpair = newword[-2:]
	newword += picktriplet(endpair)[-1:]

print newword