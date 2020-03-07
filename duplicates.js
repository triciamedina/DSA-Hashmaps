const HashMap = require('./hashmap')

// input: 'google'
// output: 'gole'

// input: 'google all that you think can think of'
// output: 'gole ath yu ink c f'

const removeDuplicates = function(str) {
    let noDuplicates = new HashMap();
    let newString = '';

    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            newString += str[i];
        } else {
            let slot = noDuplicates._findSlot(str[i]);

            if (!noDuplicates._hashTable[slot]) {
                noDuplicates.set(str[i]);
                newString += str[i];
            }
        }
    }
    
    console.log(newString)
}

let str1 = 'google';
let str2 = 'google all that you think can think of';

removeDuplicates(str1);