const Node = require("./node");

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    head() {
        return this.head;
    }

    tail() {
        return this.tail;
    }

    append(value) {
        if (!value) return;
        const newNode = new Node(value);
        if (this.size < 1) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    }

    prepend(value) {
        if (!value) return;
        const newNode = new Node(value);
        if (this.size < 1) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.size++;
    }

    at(index) {
        if (index > 0) {
            if (index == 1) return this.head;
            if (index > this.size) return null;
            let i = 1;
            let targetNode = this.head;
            while (i < index) {
                targetNode = targetNode.next;
                i++;
            }
            return targetNode;
        }
        return null;
    }

    pop() {
        if (this.size < 1) return;

        if (this.size == 1) {
            this.head = null;
            this.tail = null;
        } else {
            const newTail = this.at(this.size - 1);
            newTail.next = null;
            this.tail = newTail;
        }

        this.size--;
    }

    contains(value) {
        if (!value) return false;
        return !!this.find(value);
    }

    find(value) {
        if (!value) return null;
        let tempNode = this.head;
        let counter = 1;
        while (tempNode) {
            if (tempNode.data == value) {
                return counter;
            }
            tempNode = tempNode.next;
            counter++;
        }
        return null;
    }

    toString() {
        let string = "";
        let tempNode = this.head;
        while (tempNode) {
            string += `( ${tempNode.data} ) -> `;
            tempNode = tempNode.next;
        }
        string += "( null )";
        return string;
    }

    insertAt(value, index) {
        if (!value || index < 1) return;

        if (index == 0) {
            this.prepend(value);
            return;
        }

        if (index > this.size) {
            this.append(value);
            return;
        }

        if (index <= this.size) {
            const newNode = new Node(value);
            let nodeBeforeTarget = this.at(index - 1);
            const targetNode = nodeBeforeTarget.next;
            nodeBeforeTarget.next = newNode;
            newNode.next = targetNode;
            this.size++;
        }
    }

    removeAt(index) {
        if (index < 1 || index > this.size) return;

        if (index == 1) {
            const newHead = this.head.next;
            this.head.next = null;
            this.head = newHead;
            this.size--;

            return;
        }

        let nodeBeforeTarget = this.at(index - 1);
        let targetNode = nodeBeforeTarget.next;

        if (index == this.size) {
            nodeBeforeTarget.next = null;
        } else {
            const nodeAfterTarget = targetNode.next;
            nodeBeforeTarget.next = nodeAfterTarget;
            targetNode.next = null;
        }

        this.size--;
    }
}

module.exports = LinkedList;
