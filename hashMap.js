const LinkedList = require("./linkedList");

class HashMap {
    #defaultCapacity = 8;

    constructor(capacity = 16, loadFactor = 0.75) {
        this.loadFactor = loadFactor;
        this.data = new Array(capacity || this.#defaultCapacity);
        this.capacity = this.data.length;
        this.size = 0;
    }

    _hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.length();
    }
    _resize() {
        const newArray = new Array(this.length() * 2);
        this.data.forEach((value, index) => {
            newArray[index] = value;
        });
        this.data = newArray;
        this.capacity = this.data.length;
    }
    _isNeedToResize() {
        if (this.size > this.length() * this.loadFactor) {
            this._resize();
        }
    }
    _filledKeys() {
        return this.data.reduce((acc, value, index) => {
            if (value !== undefined) acc.push(index);
            return acc;
        }, []);
    }
    set(key, value) {
        const hashcode = this._hash(key);
        const bucket = this.data[hashcode];

        if (bucket) {
            let temp = bucket.head;
            while (temp) {
                if (key == temp.data.key) {
                    temp.data.value = value;
                    return;
                }
                temp = temp.next;
            }

            bucket.append({ key, value });
            this.size++;
        } else {
            const newLinkedList = new LinkedList();
            newLinkedList.append({ key, value });
            this.data[hashcode] = newLinkedList;
            this.size++;
        }
        this._isNeedToResize();
    }
    get(key) {
        const hashcode = this._hash(key);
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
        const hashcode = this._hash(key);
        return !!this.data[hashcode];
    }
    remove(key) {
        if (!this.has(key)) return false;

        const hashCode = this._hash(key);
        const bucket = this.data[hashCode];

        let counter = 1;
        let temp = bucket.head;

        while (temp) {
            if (key == temp.data.key) {
                bucket.removeAt(counter);
                return;
            }

            temp = temp.next;
            counter++;
        }

        this.size--;
    }
    length() {
        return this.capacity;
    }
    clear() {
        this.data = new Array(this.#defaultCapacity);
        this.size = 0;
        this.capacity = this.#defaultCapacity;
    }
    keys() {
        const keys = [];
        this._filledKeys().forEach((index) => {
            const bucket = this.data[index];
            let temp = bucket.head;

            while (temp) {
                keys.push(temp.data.key);
                temp = temp.next;
            }
        });

        return keys;
    }
    values() {
        const values = [];
        this._filledKeys().forEach((index) => {
            const bucket = this.data[index];
            let temp = bucket.head;

            while (temp) {
                values.push(temp.data.value);
                temp = temp.next;
            }
        });

        return values;
    }
    entries() {
        const entries = [];
        this._filledKeys().forEach((index) => {
            const bucket = this.data[index];
            let temp = bucket.head;

            while (temp) {
                entries.push([temp.data.key, temp.data.value]);
                temp = temp.next;
            }
        });

        return entries;
    }
}

module.exports = HashMap;
