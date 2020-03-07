const HashMap = require('./hashmap')

// input: 'google'
// output: 'gole'

// input: 'google all that you think can think of'
// output: 'gole ath yu ink c f'

const removeDuplicates = function(str) {
    let noDuplicates = new HashMap();
    let newString = '';

    for (const char of str) {
        if (char === ' ') {
            newString += char;
        } else {
            let slot = noDuplicates._findSlot(char);

            if (!noDuplicates._hashTable[slot]) {
                noDuplicates.set(char);
                newString += char;
            }
        }
    }
    
    console.log(newString)
}

let str1 = 'google';
let str2 = 'google all that you think can think of';

removeDuplicates(str1);