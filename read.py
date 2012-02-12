import json

wordsfile = open('/usr/share/dict/words', 'r')
tripletWeights = {}
n = 0;
for word in wordsfile:
	if (len(word) < 3):
		continue
	
	word = word.lower()
	
	for i in range(len(word) - 3): #skip \n at end of each word
		trip = word[i:i+3]
		if (trip not in tripletWeights):
			tripletWeights[trip] = 1
		else:
			tripletWeights[trip] += 1

	n += 1

wordsfile.close()

weightstxt = json.dumps(tripletWeights)
weightstxt = 'tripletWeights = ' + weightstxt
weightsfile = open('weights.js', 'w')
weightsfile.write(weightstxt)
weightsfile.close();

print '{0} triplets written.'.format(len(tripletWeights))

