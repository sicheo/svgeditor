// https://ricardoborges.dev/data-structures-in-typescript-graph
import Node from "./node.js";
import Queue from "./queue.js";
export default class Graph {
    nodes = new Map();
    comparator;
    constructor(comparator) {
        this.comparator = comparator;
    }
    /**
     * Add a new node if it was not added before
     *
     * @param {T} data
     * @returns {Node<T>}
     */
    addNode(data) {
        let node = this.nodes.get(data);
        if (node)
            return node;
        node = new Node(data, this.comparator);
        this.nodes.set(data, node);
        return node;
    }
    /**
     * Remove a node, also remove it from other nodes adjacency list
     *
     * @param {T} data
     * @returns {Node<T> | null}
     */
    removeNode(data) {
        const nodeToRemove = this.nodes.get(data);
        if (!nodeToRemove)
            return null;
        this.nodes.forEach((node) => {
            node.removeAdjacent(nodeToRemove.data);
        });
        this.nodes.delete(data);
        return nodeToRemove;
    }
    /**
     * Create an edge between two nodes
     *
     * @param {T} source
     * @param {T} destination
     */
    addEdge(source, destination) {
        const sourceNode = this.addNode(source);
        const destinationNode = this.addNode(destination);
        sourceNode.addAdjacent(destinationNode);
    }
    /**
     * Remove an edge between two nodes
     *
     * @param {T} source
     * @param {T} destination
     */
    removeEdge(source, destination) {
        const sourceNode = this.nodes.get(source);
        const destinationNode = this.nodes.get(destination);
        if (sourceNode && destinationNode) {
            const removed = sourceNode.removeAdjacent(destination);
        }
    }
    /**
     * Depth-first search
     *
     * @param {T} data
     * @param {Map<T, boolean>} visited
     * @returns
     */
    depthFirstSearchAux(node, visited) {
        if (!node)
            return;
        visited.set(node.data, true);
        console.log(node.data);
        node.adjacent.forEach((item) => {
            if (!visited.has(item.data)) {
                this.depthFirstSearchAux(item, visited);
            }
        });
    }
    depthFirstSearch() {
        const visited = new Map();
        this.nodes.forEach((node) => {
            if (!visited.has(node.data)) {
                this.depthFirstSearchAux(node, visited);
            }
        });
    }
    /**
     * Breadth-first search
     *
     * @param {T} data
     * @returns
     */
    breadthFirstSearchAux(node, visited) {
        const queue = new Queue();
        if (!node)
            return;
        queue.add(node);
        visited.set(node.data, true);
        while (!queue.isEmpty()) {
            node = queue.remove();
            if (!node)
                continue;
            console.log(node.data);
            node.adjacent.forEach((item) => {
                if (!visited.has(item.data)) {
                    visited.set(item.data, true);
                    queue.add(item);
                }
            });
        }
    }
    breadthFirstSearch() {
        const visited = new Map();
        this.nodes.forEach((node) => {
            if (!visited.has(node.data)) {
                this.breadthFirstSearchAux(node, visited);
            }
        });
    }
    /**
     * Get a node,
     *
     * @param {T} data
     * @returns {Node<T> | null}
     */
    getNode(data) {
        const nodeToReturn = this.nodes.get(data);
        if (!nodeToReturn)
            return null;
        return nodeToReturn;
    }
    /**
     * Check if there is loop in the graph
     *
     * @returns {Node<T> | null}
     */
    checkCircular() {
        let retval = { circularity: false, node: null };
        this.nodes.forEach((node) => {
            try {
                const nod = JSON.stringify(node);
            }
            catch (error) {
                if (error.name == 'TypeError' && error.message.includes('circular'))
                    retval = { circularity: true, node: node.data };
            }
        });
        return retval;
    }
}
//# sourceMappingURL=graph.js.map