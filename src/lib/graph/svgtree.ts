import Tree from './tree.js'
import type NodeType from './nodetype'

const comparator = (a: NodeType, b: NodeType) => {
    if (a.id < b.id)
        return -1
    if (a.id > b.id)
        return 1
    return 0
}

export default class svgTree extends Tree<NodeType> {
    
    constructor(root: NodeType) {
        super(comparator, root)
    }

}