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

const getGraphFromProcess = (process: any) => {
    const graph = { nodes: [], paths: [] }
    if (process && process.graph) {
        const root = {
            uuid:process.uuid,
            id: process.graph.id,
            data: {
                level: process.graph.level,
                type: process.graph.type,
                name: process.name,
                image: process.graph.image,
                shape: process.graph.shape,
                width: process.graph.width,
                height: process.graph.heigth,
                imgwidth: process.graph.imgwidth,
                imgheight: process.graph.imgheight,
                params: process.data,
                uid: process.uid,
                x: process.graph.x,
                y: process.graph.y
            }
        }
        graph.nodes.push(root)
        // ADD ROOT NODE
        for (let i = 0; i < process.phases.length; i++) {
            // ADD NODES (PHASES)
            const phase = process.phases[i]
            const node = {
                id: phase.graph.id,
                data: {
                    level: phase.graph.level,
                    type: phase.graph.type,
                    name: phase.name,
                    image: phase.graph.image,
                    shape: phase.graph.shape,
                    width: phase.graph.width,
                    height: phase.graph.height,
                    imgwidth: phase.graph.imgwidth,
                    imgheight: phase.graph.imgheight,
                    params: phase.data,
                    uid: phase.uid,
                    x: phase.graph.x,
                    y: phase.graph.y,
                    operations: { nodes: [], paths: [] }
                },
            }
            if (phase.operations) {
                // ADD SUBGRAPH NODES (OPERATIONS)
                for (let j = 0; j < phase.operations.length; j++) {
                    const operation = phase.operations[j]
                    const subnode = {
                        id: operation.graph.id,
                        data: {
                            level: operation.graph.level,
                            type: operation.graph.type,
                            name: operation.name,
                            image: operation.graph.image,
                            shape: operation.graph.shape,
                            width: operation.graph.width,
                            height: operation.graph.height,
                            imgwidth: operation.graph.imgwidth,
                            imgheight: operation.graph.imgheight,
                            params: operation.data,
                            uid: operation.uid,
                            x: operation.graph.x,
                            y: operation.graph.y,
                            tasks: []
                        }
                    }
                    if (operation.tasks) {
                        // ADD TASKS
                        for (let k = 0; k < operation.tasks.length; k++) {
                            const task = operation.tasks[k]
                            subnode.data.tasks.push(task)
                        }
                    }
                    node.data.operations.nodes.push(subnode)
                    // ADD SUBGRAPH PATHS
                    if (operation.parent) {
                        const path = {
                            name: 'PATH' + j,
                            uid: j,
                            from: [operation.parent],
                            to: [operation.graph.id]
                        }
                        node.data.operations.paths.push(path)
                    }
                } 
            }
            graph.nodes.push(node)
            // ADD GRAPH PATHS
            if (phase.parent) {
                const path = {
                    name: 'PATH'+i,
                    uid: i,
                    from: [phase.parent],
                    to: [phase.graph.id]
                }
                graph.paths.push(path)
            }
        }
    }

    return graph
}

const getProcessFromGraph = (graph:any) => {
    const process = {}
    if (graph) {
        // EXTRACT ROOT
        // EXTRACT PHASE
        // EXTRACT OPERATION
        // EXTRACT TASK
    }
}

const graphutils = { getChildrens, getTreeFromGraph, getGraphFromTree, getGraphFromProcess }

export default graphutils