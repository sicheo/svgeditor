import { v4 as uuidv4 } from 'uuid';
import TREE from '../script/tree.js'

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

const getGraphFromTree = (tree: any, graph: any, pathuid: any) => {
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
    return graph
}

const getTreeFromDGraph = (graph: any, parentnode: any, parent: any) => {
    let nodes: any[] = getChildrens(graph, parentnode.id)
    const uid = parentnode.data.uid
    // MUST ENSURE UNIQUE DATA ID 
    let tree = {
        children: [],
        key: parentnode.id,
        parent: parent,
        value: {
            data: parentnode.data,
            edges: [],
            graph: { level: parentnode.data.level, x: parentnode.data.x, y: parentnode.data.y, uid: uid }
        }
    }
    for (let i = 0; i < nodes.length; i++) {
        // For strange reason this check is needed to avoid bad recursion from getChildrens
        if (nodes[i].id) {
            const parent = tree
            const subtree = getTreeFromDGraph(graph, nodes[i], parent)
            tree.children.push(subtree)
        }
    }
    return (tree)

}


const graphGetPathnum = (graph: any) => {
    let ret = 0
    for (let i = 0; i < graph.paths.length; i++)
        if (graph.paths[i].uid >= ret)
            ret = graph.paths[i].uid
    return ret
}
const getDDGraphFromTree = async (tree: any, graph: any, pathuid: any) => {
    const locdata = JSON.parse(JSON.stringify(tree.value.data))
    locdata.level = tree.value.graph.level
    let node = { id: tree.key, data: locdata }
    graph.nodes.push(node)
    for (let i = 0; i < tree.children.length; i++) {
        let child = tree.children[i]
        // For strange reason this check is needed to avoid bad recursion from getChildrens
        if (child.key) {
            pathuid = graphGetPathnum(graph) + i + 1
            let path = { id: 'PATH-' + pathuid, uid: pathuid, from: [], to: [] }
            path.from.push(node.id)
            path.to.push(child.key)
            graph.paths.push(path)
            await getDDGraphFromTree(child, graph, pathuid)
        }
    }
}

const getDGraphFromTree = async (tree: any, graph: any, pathuid: any) => {
    await getDDGraphFromTree(tree, graph, pathuid)
    const retgraph = graph
    return(retgraph)
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
    }
    return graph
}

const getProcessFromGraph = (graph: any) => {
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
                    node.data.params.parent =  found.from[0]
                process.data['final'] = node.data.params
            }
        }
    }
    return process
}

const  fromTreeToDb = (tree:any)=> {
    const toDb = { company: [], plants: [], departments: [], lines: [], machines: [], controllers: [] }
    if (tree && !tree.null) {
        let root = tree.root
        // GET COMPANIES
        root.value.data.x = root.value.graph.x
        root.value.data.y = root.value.graph.y
        root.value.data.uid = root.value.graph.uid
        toDb.company.push(root.value.data)
        // GET PLANTS
        for (let i = 0; i < root.children.length; i++) {
            let plant = root.children[i]
            plant.value.data.company = root.value.graph.uid
            plant.value.data.x = plant.value.graph.x
            plant.value.data.y = plant.value.graph.y
            plant.value.data.uid = plant.value.graph.uid
            toDb.plants.push(plant.value.data)
            // GET DEPARTMENTS
            for (let j = 0; j < plant.children.length; j++) {
                let department = plant.children[j]
                department.value.data.plant = plant.value.graph.uid
                department.value.data.x = department.value.graph.x
                department.value.data.y = department.value.graph.y
                department.value.data.uid = department.value.graph.uid
                toDb.departments.push(department.value.data)
                // GET LINES
                for (let k = 0; k < department.children.length; k++) {
                    let line = department.children[k]
                    line.value.data.department = department.value.graph.uid
                    line.value.data.x = line.value.graph.x
                    line.value.data.y = line.value.graph.y
                    line.value.data.uid = line.value.graph.uid
                    toDb.lines.push(line.value.data)
                    // GET MACHINES
                    for (let h = 0; h < line.children.length; h++) {
                        let machine = line.children[h]
                        machine.value.data.line = line.value.graph.uid
                        machine.value.data.x = machine.value.graph.x
                        machine.value.data.y = machine.value.graph.y
                        machine.value.data.uid = machine.value.graph.uid
                        toDb.machines.push(machine.value.data)
                        // GET CONTROLLERS
                        for (let l = 0; l < machine.children.length; l++) {
                            let controller = machine.children[l]
                            controller.value.data.machine = machine.value.graph.uid
                            controller.value.data.x = controller.value.graph.x
                            controller.value.data.y = controller.value.graph.y
                            controller.value.data.uid = controller.value.graph.uid
                            toDb.controllers.push(controller.value.data)
                        }
                    }
                }
            }
        }
    }
    return toDb
}

const fromDbToTree = (dbarray: any) => {
    let key = ""
    let levels = "level"
    let index = 0
    //let tree = { null: true}
    let tree:any
    if (dbarray && dbarray.company && dbarray.company.length > 0) {
        // COMPANY
        let value = { edges: [], graph: { x: 0, y: 0, level: "", uid: 0 }, data: null }
        levels = "level1"
        //key += index
        key = 'NODE-' + dbarray.company[0].uid
        value.graph.x = dbarray.company[0].x
        value.graph.y = dbarray.company[0].y
        value.graph.level = levels
        value.graph.uid = dbarray.company[0].uid
        value.data = dbarray.company[0]
        tree = new TREE.Tree(key, value)
        tree.setRootTag(dbarray.company[0].name)
        index++
        // PLANTS
        for (let i = 0; i < dbarray.plants.length; i++) {
            let value = { edges: [], graph: { x: 0, y: 0, level: "", uid: 0 }, data: null }
            levels = "level2"
            //let keyplants = "draggable" + index
            let keyplants = 'NODE-' + dbarray.plants[i].uid
            value.graph.x = dbarray.plants[i].x
            value.graph.y = dbarray.plants[i].y
            value.graph.level = levels
            value.graph.uid = dbarray.plants[i].uid
            value.data = dbarray.plants[i]
            tree.insert(tree.root.key, keyplants, value)
            index++
            //DEPARTMENTS
            for (let j = 0; j < dbarray.departments.length; j++) {
                let value = { edges: [], graph: { x: 0, y: 0, level: "", uid: 0 }, data: null }
                levels = "level3"
                //let keydepartments = "draggable" + index
                let keydepartments = 'NODE-' + dbarray.departments[j].uid
                if (dbarray.plants[i].uid == dbarray.departments[j].plant) {
                    value.graph.x = dbarray.departments[j].x
                    value.graph.y = dbarray.departments[j].y
                    value.graph.level = levels
                    value.graph.uid = dbarray.departments[j].uid
                    value.data = dbarray.departments[j]
                    tree.insert(keyplants, keydepartments, value)
                    index++
                }
                //LINES
                for (let k = 0; k < dbarray.lines.length; k++) {
                    let value = { edges: [], graph: { x: 0, y: 0, level: "", uid: 0 }, data: null }
                    levels = "level4"
                    //let keylines = "draggable" + index
                    let keylines = 'NODE-' + dbarray.lines[k].uid
                    if (dbarray.departments[j].uid == dbarray.lines[k].department && dbarray.plants[i].uid == dbarray.departments[j].plant) {
                        value.graph.x = dbarray.lines[k].x
                        value.graph.y = dbarray.lines[k].y
                        value.graph.level = levels
                        value.graph.uid = dbarray.lines[k].uid
                        value.data = dbarray.lines[k]
                        tree.insert(keydepartments, keylines, value)
                        index++
                    }
                    //MACHINES
                    for (let l = 0; l < dbarray.machines.length; l++) {
                        let value = { edges: [], graph: { x: 0, y: 0, level: "", uid: 0 }, data: null }
                        levels = "level5"
                        //let keymachines = "draggable" + index
                        let keymachines = 'NODE-' + dbarray.machines[l].uid
                        if (dbarray.lines[k].uid == dbarray.machines[l].line && dbarray.plants[i].uid == dbarray.departments[j].plant && dbarray.departments[j].uid == dbarray.lines[k].department) {
                            value.graph.x = dbarray.machines[l].x
                            value.graph.y = dbarray.machines[l].y
                            value.graph.level = levels
                            value.graph.uid = dbarray.machines[l].uid
                            value.data = dbarray.machines[l]
                            tree.insert(keylines, keymachines, value)
                            index++
                        }
                        //CONTROLLERS
                        for (let m = 0; m < dbarray.controllers.length; m++) {
                            let value = { edges: [], graph: { x: 0, y: 0, level: "", uid: 0 }, data: null }
                            levels = "level6"
                            //let keycontrollers = "draggable" + index
                            let keycontrollers = 'NODE-' + dbarray.controllers[m].uid
                            if (dbarray.machines[l].uid == dbarray.controllers[m].machine && dbarray.lines[k].uid == dbarray.machines[l].line && dbarray.plants[i].uid == dbarray.departments[j].plant && dbarray.departments[j].uid == dbarray.lines[k].department) {
                                value.graph.x = dbarray.controllers[m].x
                                value.graph.y = dbarray.controllers[m].y
                                value.graph.level = levels
                                value.graph.uid = dbarray.controllers[m].uid
                                value.data = dbarray.controllers[m]
                                tree.insert(keymachines, keycontrollers, value)
                                index++
                            }
                        }
                    }
                }
            }
        }
    } else {
        tree = { null: true }
    }
    // DECIRCULARIZE RESULT
    let seen = []
    const strdata = JSON.stringify(tree, function (key, val) {
        if (typeof val == "object") {
            if (seen.indexOf(val) >= 0)
                return
            seen.push(val)
        }
        return val
    });
    return (JSON.parse(strdata))
}

const graphutils = { getTreeFromDGraph, getDGraphFromTree, getChildrens, getTreeFromGraph, getGraphFromTree, getGraphFromProcess, getProcessFromGraph, fromTreeToDb, fromDbToTree }

export default graphutils