import Graph from './graph.js'
import type Node from "./node.js"


class TreeError extends Error {
    constructor(message:any) {
        super(message)
        this.name = "TreeError"
    }
}

export default class Tree<T> extends Graph<T> {
    root: Node<T>

    constructor(comparator: (a: T, b: T) => number, root: T) {
        super(comparator)
        this.root = this.addNode(root)
    }

    /**  
     * Create an edge between two nodes  
     *  
     * @param {T} source 
     * @param {T} destination  
     */
    addEdge(source: T, destination: T): void {
        // IF SOURCE IS NOT EXISTENT THROW EXCEPTION
        const sourceNode = this.getNode(source)
        if (sourceNode == null)
            throw new TreeError("source node not exists")
        const destinationNode = this.addNode(destination);
        sourceNode.addAdjacent(destinationNode);
        // IF LOOP THROW EXCEPTION
        const circular = this.checkCircular()
        if (circular.circularity)
            throw new TreeError("circular loop")
    }
}