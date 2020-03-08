const HashMap = require('./hashmap');

const main = function() {
    let lotr = new HashMap();

    lotr.set('Hobbit', 'Bilbo');
    lotr.set('Hobbit', 'Frodo');
    lotr.set('Wizard', 'Gandolf');
    lotr.set('Human', 'Aragorn');
    lotr.set('Elf', 'Legolas');
    lotr.set('Maiar', 'The Necromancer');
    lotr.set('Maiar', 'Sauron');
    lotr.set('RingBearer', 'Gollum');
    lotr.set('LadyOfLight', 'Galadriel');
    lotr.set('HalfElven', 'Arwen');
    lotr.set('Ent', 'Treebeard');

    console.log(lotr)
    let index = lotr._findSlot('Maiar')
    console.log(lotr._hashTable[index].value)
    index = lotr._findSlot('Hobbit')
    console.log(lotr._hashTable[index].value)
    console.log(lotr._capacity)
    
}

// main()

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    // console.log(map1.get(str1));
    // console.log(map2.get(str3));

    console.log(map1._hashTable[map1._findSlot(str1)].value)
    // console.log(map2)
}

// WhatDoesThisDo()

// 1) Show your hash map after the insertion of keys 
// 10, 22, 31, 4, 15, 28, 17, 88, 59 into a hash map 
// of length 11 using open addressing and a hash 
// function k mod m, where k is the key and m is the length.


// 10 => 10
// 22 => 0
// 31 => 9
// 4 => 4
// 15 => 4
// 28 => 6
// 17 => 6
// 88 => 0
// 59 => 4

[
    {22: null},
    {88: null},
    null,
    null,
    {4: null},
    {15: null},
    {28: null},
    {17: null},
    {59: null},
    {31: null},
    {10: null}
]

// 2) Show your hash map after the insertion of the keys
//  5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map 
//  with collisions resolved by separate chaining. 
//  Let the hash table have a length m = 9, and l
//  et the hash function be k mod m.

// 5 => 5
// 28 => 1
// 19 => 1
// 15 => 6
// 20 => 2
// 33 => 6
// 12 => 3
// 17 => 8
// 10 => 1

[
    null,
    [{28: null}, {19: null}, {10: null}],
    {20: null},
    {12: null},
    null,
    {5: null},
    [{15: null}, {33: null}],
    null,
    {17: null}
]