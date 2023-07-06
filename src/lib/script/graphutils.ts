import { v4 as uuidv4 } from 'uuid';

const getChildrens = (graph: any, id: any) => {
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
                height: process.graph.height,
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
        const finalIndex = process.phases.length+1
        const final = {
            id: "NODE-" + finalIndex,
            data: {
                level: process.graph.level,
                type: "FINAL",
                name: "FINAL",
                image: "/FINAL.svg",
                shape: process.graph.shape,
                width: process.graph.width,
                height: process.graph.height,
                imgwidth: process.graph.imgwidth,
                imgheight: process.graph.imgheight,
                params: process.data.final,
                uid: finalIndex,
                x: process.graph.x + 2 * process.graph.width,
                y: process.graph.y
            }
        }
        const path = {
            name: 'PATH' + process.phases.length,
            uid: finalIndex,
            from: [process.data.final.parent],
            to: [final.id]
        }
        graph.nodes.push(final)
        graph.paths.push(path)
        console.log("**** ADD FINAL ***", graph)
    }
    return graph
}

const getProcessFromGraph = (graph:any) => {
    const process = {
        uuid: null,
        name: '',
        uid: 0,
        description: '',
        doccode:'',
        data: {},
        graph: {
            id: '',
            level: "",
            type: '',
            image: "",
            shape: "",
            width: 140,
            height: 90,
            imgwidth: 30,
            imgheight: 30,
            x: 454,
            y: 253
        },
        phases:[]
    }
    if (graph && graph.nodes) {
        for (let i = 0; i < graph.nodes.length; i++) {
            const node = graph.nodes[i]
            if (i == 0) {
                // EXTRACT ROOT
                if (node.uuid)
                    process.uuid = node.uuid
                else
                    process.uuid = uuidv4()
                if (node.data && node.data.params) {
                    process.description = node.data.params.description
                    process.doccode = node.data.params.doccode
                }
                process.name = node.data.name
                process.uid = node.data.uid
                process.data = node.data.params
                process.graph.id = node.id
                process.graph.level = node.data.level
                process.graph.type = node.data.type
                process.graph.image = node.data.image
                process.graph.shape = node.data.shape
                process.graph.width = node.data.width
                process.graph.height = node.data.height
                process.graph.imgwidth = node.data.imgwidth
                process.graph.imgheight = node.data.imgheight
                process.graph.x = node.data.x
                process.graph.y = node.data.y
            } else if (node.data.type != 'FINAL') {
                // EXTRACT PHASE
                const phase = {
                    name: '',
                    uid: 0,
                    description: '',
                    parent: null,
                    data: {},
                    graph: {
                        id: '',
                        level: "",
                        type: '',
                        image: "",
                        shape: "",
                        width: 140,
                        height: 90,
                        imgwidth: 30,
                        imgheight: 30,
                        x: 454,
                        y: 253
                    },
                    operations: []
                }
                phase.name = node.data.name
                phase.uid = node.data.uid
                phase.data = node.data.params
                phase.graph.id = node.id
                phase.graph.level = node.data.level
                phase.graph.type = node.data.type
                phase.graph.image = node.data.image
                phase.graph.shape = node.data.shape
                phase.graph.width = node.data.width
                phase.graph.height = node.data.height
                phase.graph.imgwidth = node.data.imgwidth
                phase.graph.imgheight = node.data.imgheight
                phase.graph.x = node.data.x
                phase.graph.y = node.data.y
                // TDB ADD PARENT
                const found = graph.paths.find((item: any) => item.to.includes(phase.graph.id))
                if (found)
                    phase.parent = found.from[0]
                if (node.data.operations && node.data.operations.nodes) {
                    for (let j = 0; j < node.data.operations.nodes.length; j++) {
                        const operation = {
                            name: '',
                            uid: 0,
                            description: '',
                            parent: null,
                            data: {},
                            graph: {
                                id: '',
                                level: "",
                                type: '',
                                image: "",
                                shape: "",
                                width: 140,
                                height: 90,
                                imgwidth: 30,
                                imgheight: 30,
                                x: 454,
                                y: 253
                            },
                            tasks: []
                        }
                        const nodeoper = node.data.operations.nodes[j]
                        // EXTRACT OPERATION
                        operation.name = nodeoper.data.name
                        operation.uid = nodeoper.data.uid
                        operation.data = nodeoper.data.params
                        operation.graph.id = nodeoper.id
                        operation.graph.level = nodeoper.data.level
                        operation.graph.type = nodeoper.data.type
                        operation.graph.image = nodeoper.data.image
                        operation.graph.shape = nodeoper.data.shape
                        operation.graph.width = nodeoper.data.width
                        operation.graph.height = nodeoper.data.height
                        operation.graph.imgwidth = nodeoper.data.imgwidth
                        operation.graph.imgheight = nodeoper.data.imgheight
                        operation.graph.x = nodeoper.data.x
                        operation.graph.y = nodeoper.data.y
                        // TDB ADD PARENT
                        const found = node.data.operations.paths.find((item: any) => item.to.includes(operation.graph.id))
                        if (found)
                            operation.parent = found.from[0]
                        if (nodeoper.data.tasks) {
                            for (let k = 0; k < nodeoper.data.tasks.length; k++) {
                                const nodetask = nodeoper.data.tasks[k]
                                operation.tasks.push(nodetask)

                                // EXTRACT TASK
                            }
                        }

                        phase.operations.push(operation)
                    }
                }
                process.phases.push(phase)
            } else {
                const found = graph.paths.find((item: any) => item.to.includes(node.id))
                if (found && node.data.params.final)
                    node.data.params.final.parent =  found.from[0]
                process.data['final'] = node.data.params.final
            }
        }
    }
    return process
}

const graphutils = { getChildrens, getTreeFromGraph, getGraphFromTree, getGraphFromProcess, getProcessFromGraph }

export default graphutils