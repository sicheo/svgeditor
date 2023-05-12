import Graph from './graph.js';
class TreeError extends Error {
    constructor(message) {
        super(message);
        this.name = "TreeError";
    }
}
export default class Tree extends Graph {
    root;
    constructor(comparator, root) {
        super(comparator);
        this.root = this.addNode(root);
    }
    /**
     * Create an edge between two nodes
     *
     * @param {T} source
     * @param {T} destination
     */
    addEdge(source, destination) {
        // IF SOURCE IS NOT EXISTENT THROW EXCEPTION
        const sourceNode = this.getNode(source);
        if (sourceNode == null)
            throw new TreeError("source node not exists");
        const destinationNode = this.addNode(destination);
        sourceNode.addAdjacent(destinationNode);
        // IF LOOP THROW EXCEPTION
        const circular = this.checkCircular();
        if (circular.circularity)
            throw new TreeError("circular loop");
    }
}
//# sourceMappingURL=tree.js.map