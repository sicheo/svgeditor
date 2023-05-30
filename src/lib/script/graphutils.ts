const getChildrens = (graph:any,id:any) => {
    let childrens: any[] = []
    const pts = graph.paths.filter((item: any) => (item.from.includes(id)))
    childrens = graph.nodes.filter((node:any) => (pts.some((item:any)=>(item.to.includes(node.id)))))

    return childrens
}

const getTreeFromGraph = (graph:any,parent: any) => {
    let nodes: any = getChildrens(graph, parent.id)
    let tree = { id: parent.id, data: parent.data, children: [] }
    for (let i = 0; i < nodes.length; i++) {
        const subtree = getTreeFromGraph(graph, nodes[i])
        tree.children.push(subtree)
    }
    return(tree)
}

const getGraphFromTree = (tree: any, graph: any,pathuid:any) => {
    let node = { id: tree.id, data: tree.data }
    graph.nodes.push(node)
    for (let i = 0; i < tree.children.length; i++) {
        pathuid +=i
        let child = tree.children[i]
        let path = { id: 'PATH' + pathuid, uid: pathuid, from: [], to: [] }
        path.from.push(node.id)
        path.to.push(child.id)
        graph.paths.push(path)
        getGraphFromTree(child, graph, pathuid + tree.children.length)
    }
}

const graphutils = { getChildrens, getTreeFromGraph, getGraphFromTree }

export default graphutils