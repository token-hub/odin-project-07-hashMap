const LinkedList = require("./linkedList");

class HashMap {
    constructor(capacity = 16, loadFactor = 0.75) {
        this.loadFactor = loadFactor;
        this.data = new Array(capacity);
        this.capacity = this.data.length;
    }

    _hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }
    _resize() {
        // grow the array by multiplying the size by 2
    }
    _isNeedToResize() {
        if (this.length() > this.length() * this.loadFactor) {
            this._resize();
        }
    }
    set(key, value) {
        /**
         * hashcode = this.hash(key) % this.length()
         */
        const hashcode = 11;
        // const hashcode = this._hash(key) % this.length();
        const bucket = this.data[hashcode];

        if (bucket) {
            /**
             * temp = bucket.head
             *
             * while (temp) // this is for when the bucket is already exist and you want to update the value of the key :>
             *      if (key == temp.data.key)
             *          temp.data.value = value
             *          return
             *      temp = temp.next
             * */

            let temp = bucket.head;
            while (temp) {
                if (key == temp.data.key) {
                    temp.data.value = value;
                    return;
                }
                temp = temp.next;
            }

            bucket.append({ key, value });
        } else {
            const newLinkedList = new LinkedList();
            newLinkedList.append({ key, value });
            this.data[hashcode] = newLinkedList;
        }

        /**
         * bucket = this.data[hashcode]
         *
         *
         * if bucket
         *      loop through the linkedList starting from the head...
         *          if key == currentNode.data.key
         *              currentNode.data.value = value
         *              return to exit the the function
         *
         *      append the new data at the end of the list
         *      return to exit the function
         * else
         *      const newList = new linkedList();
         *      newList.append({key, value})
         *      this.data[hashcode] = newList;
         *
         * this.entries++
         */
        /**
         * check the entries
         * if  this.length() > this.capacity * this.loadFactor
         *      _resize()
         */
        this._isNeedToResize();
    }
    get(key) {


        const hashcode = this._hash(key) % this.length();
        const bucket = this.data[hashcode];

        if (bucket) {
            let temp = bucket.head;

            while (temp) {
                if (temp.data.key == key) {
                    return temp.data.value;
                }
                temp = temp.next;
            }

        }

        return null;
        /**
         * hashcode = this._hash(key) % this.length()
         * bucket = this.data[hashcode]
         * if (bucket)
         * 
         *      loop through the linkedList to find the target node
         *          if (node.data.key == key)
         *              return node.data.value
         *      
         *  return null    
         */


        //  takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    }
    has(key) {
        // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    }
    remove(key) {
        // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    }
    length() {
        // returns the number of stored keys in the hash map.
        return this.capacity;
    }
    clear() {
        //  removes all entries in the hash map.
    }
    keys() {
        // returns an array containing all the keys inside the hash map.
    }
    values() {
        // returns an array containing all the values.
    }
    entries() {
        // returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
    }
}

module.exports = HashMap;
