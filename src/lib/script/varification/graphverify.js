export const graphVerify = (graph) => {
    
    if (!graph.nodes || graph.nodes.length <= 0)
        return ("GRAPH IS EMPTY")

    if (graph.nodes[0].data.type != "MASTER")
        return ("FIRST NODE MUST BE MASTER")
   
    if (!graph.nodes[0].data.params.doccode)
        return ("MASTER MUST HAVE DOCCODE")

    return "OK"
}