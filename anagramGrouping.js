const HashMap = require('./hashmap')

// input: ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
// output: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]

const groupAnagrams = function(arr) {
    let hash = new HashMap();

    for (const value of arr) {
        let stringArr = value.split('').sort().toString();
        
        let slot = hash._findSlot(stringArr);
        if (!hash._hashTable[slot]) {
            hash.set(stringArr, value);
        } else {
            let newValue = hash._hashTable[slot].value + `,${value}`;
            hash.set(stringArr, newValue)
        }
    }

    let result = [];

    for (const obj of hash._hashTable) {
        if (obj) {
            let entry = obj.value.split(',')
            result.push(entry);
        }
    }

    return result;
}

let arr = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];

console.log(groupAnagrams(arr))