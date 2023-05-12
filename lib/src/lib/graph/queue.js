class EmptyQueueException extends Error {
}
export default class Queue {
    array = [];
    add(data) {
        this.array.push(data);
    }
    remove() {
        if (this.isEmpty())
            throw new EmptyQueueException();
        return this.array.shift();
    }
    peek() {
        if (this.isEmpty())
            throw new EmptyQueueException();
        return this.array[0];
    }
    isEmpty() {
        return this.array.length === 0;
    }
}
//# sourceMappingURL=queue.js.map