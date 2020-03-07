const HashMap = require('./hashmap')

// input: 'acecarr'
// output: true
// number of unique letters = 4
// value total = 7 , or 8

// north
// 5, 5

const anyPermutationIsPalindrome = function(str) {
    let hash = new HashMap();

    for (const char of str) {
        let slot = hash._findSlot(char);

        if (!hash._hashTable[slot]) {
            hash.set(char, 1);
        } else {
            let count = hash._hashTable[slot].value + 1;
            hash._hashTable[slot].value = count
        }
    }
    
    const values = Object.values(hash._hashTable);
    const uniqueChars = values.length;

    let count = 0;
    values.forEach(item => count = count + item.value);

    if (count === (uniqueChars * 2) || count === ((uniqueChars * 2) - 1)) {
        return true;
    }

    return false;
}

let str1 = 'acecarr';
let str2 = 'north';

console.log(anyPermutationIsPalindrome(str1));