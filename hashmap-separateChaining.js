class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head);
    }

    insertLast(item) {
        if (this.head === null) {
            this.insertFirst(item);
        }
        else {
            let tempNode = this.head;
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
        }
    }

    insertBefore(item, key) {

        let currNode = this.head;
        let previousNode = this.head;

        // If key points to head
        if (key === 0) {
            this.insertFirst(item)
        }
        else {
            let count = 0;
            // Count to node
            while (count < key) {
                // Return null if key isn't found
                if (currNode.next === null) {
                    return null;
                }
                else {
                    count++;
                    previousNode = currNode
                    currNode = currNode.next
                }
            }
            // Insert new node
            previousNode.next = new _Node(item, currNode);
        }
    }

    insertAfter(item, key) {

        let currNode = this.head;
        let previousNode = this.head;
        
        // Count to node
        let count = 0;

        while (count <= key) {

            // Return null if key isn't found
            if (currNode === null) {
                return null;
            }
            else {
                count++;
                previousNode = currNode
                currNode = currNode.next
            }
        }

        // If key refers to last item
        if (currNode === null) {
            // Insert new node and set next pointer to null
            previousNode.next = new _Node(item, null);
        }
        else {
            // Otherwise, insert new node and set next pointer to next node
            previousNode.next = new _Node(item, currNode);
        }
    }

    insertAt(item, key) {
        // Keep track of previous
        let previousNode = this.head; 
        // Start at head
        let currNode = this.head;
        // Keep track of next
        let nextNode = this.head;

        // If key points to head
        if (key === 0) {
            // Insert node at head and set pointer to the next node
            this.head = new _Node(item, this.head.next)
        }
        else {
            // Count to node
            let count = 0;
            
            while (count < key) {
                // Return null if key isn't found
                if (nextNode === null) {
                    return null;
                }
                else {
                    count++;
                    previousNode = currNode 
                    currNode = currNode.next 
                    nextNode = currNode.next
                }
            }

            // key points to last item
            if (nextNode === null) {
                // Insert new node and set next pointer to null
                previousNode.next = new _Node(item, null);
            }
            else {
                // Otherwise, insert new node and set next pointer to next node
                previousNode.next = new _Node(item, nextNode);
            }
        }
    }

    find(item) { 
        // Start at the head
        let currNode = this.head;
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // Check for the item 
        while (currNode.value !== item) {
            /* Return null if it's the end of the list 
               and the item is not on the list */
            if (currNode.next === null) {
                return null;
            }
            else {
                // Otherwise, keep looking 
                currNode = currNode.next;
            }
        }
        // Found it
        return currNode;
    }

    remove(item){ 
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // If the node to be removed is head, make the next node head
        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }
        // Start at the head
        let currNode = this.head;
        // Keep track of previous
        let previousNode = this.head;

        while ((currNode !== null) && (currNode.value !== item)) {
            // Save the previous node 
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        previousNode.next = currNode.next;
    }
}

class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }

    set(key, value){
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);

        if(!this._hashTable[index]){
            this.length++;

            // create new linked list
            // add obj to the head
            let newLst = new LinkedList();
            newLst.insertFirst({ key, value, DELETED: false });

            // insert list at index
            this._hashTable[index] = newLst; 
        } else {
            let previousNode = this._hashTable[index].head;
            let currNode = this._hashTable[index].head;
            
            while (currNode) {
                if (currNode.value.key === key) {
                    currNode.value.value = value;
                    return;
                }

                previousNode = currNode;
                currNode = previousNode.next;
            }

            this._hashTable[index].insertLast({ key, value, DELETED: false})
            // insert obj in linked list
        }
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const index = hash % this._capacity;
        return index;
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                let previousNode = slot.head;
                let currNode = slot.head;
                
                while (currNode) {
                    let newKey = currNode.value.key;
                    let newValue = currNode.value.value;

                    this.set(newKey, newValue)
    
                    previousNode = currNode;
                    currNode = previousNode.next;
                }
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negtive number. 
        return hash >>> 0;
    }
}

module.exports = HashMap;

HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;