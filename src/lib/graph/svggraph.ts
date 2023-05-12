
import Graph from './graph.js'
import type NodeType from './nodetype'

const comparator = (a: NodeType, b: NodeType) => {
    if (a.id < b.id)
        return -1
    if (a.id > b.id)
        return 1
    return 0
}
export default class svgGraph extends Graph<NodeType>{
    draw: any

    constructor(draw:any,options: any = {}) {
        super(comparator)
        this.draw = draw
        this.draw.on("mousemove", this.onMouseOver)
    }

    private onMouseOver(ev:any) {
        // do something
    }

    

}

