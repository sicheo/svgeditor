export default class Node {
    data;
    adjacent;
    comparator;
    constructor(data, comparator) {
        this.data = data;
        this.adjacent = [];
        this.comparator = comparator;
    }
    addAdjacent(node) {
        this.adjacent.push(node);
    }
    removeAdjacent(data) {
        const index = this.adjacent.findIndex((node) => this.comparator(node.data, data) === 0);
        if (index > -1) {
            return this.adjacent.splice(index, 1)[0];
        }
        return null;
    }
    getAdjacent(data) {
        const index = this.adjacent.findIndex((node) => this.comparator(node.data, data) === 0);
        if (index > -1) {
            return this.adjacent;
        }
    }
}
//# sourceMappingURL=node.js.map