import json

wordsfile = open('/usr/share/dict/words', 'r')
tripletWeights = {}
lefties = 'qwertasdfgzxcvb12345'

def alternatesHands(trip):
	def isLeft(char):
		return char in lefties
	
	return isLeft(trip[0]) != isLeft(trip[1]) and isLeft(trip[1]) != isLeft(trip[2]);

for word in wordsfile:
	if (len(word) < 3):
		continue
	
	word = word.lower()
	
	for i in range(len(word) - 3): #skip \n at end of each word
		trip = word[i:i+3]
		if (not alternatesHands(trip)):
			continue
		
		if (trip not in tripletWeights):
			tripletWeights[trip] = 1
		else:
			tripletWeights[trip] += 1

wordsfile.close()

weightstxt = json.dumps(tripletWeights)
weightstxt = 'tripletWeights = ' + weightstxt
weightsfile = open('weights.js', 'w')
weightsfile.write(weightstxt)
weightsfile.close();

print '{0} triplets written.'.format(len(tripletWeights))

