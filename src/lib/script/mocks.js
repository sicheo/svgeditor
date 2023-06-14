let attempts = 0
let logs = []

/** MASTERS */
const masters = [
    { uid: 1, description: "Master record product XXXXXX", doc: "DOC123", product: "PROD123", authdate: "2022-05-14", status: "AUTH", version:"1.1" },
    { uid: 2, description: "Master record product YYYYYY", doc: "DOC111", product: "PROD123", authdate: "", status: "NOAUTH", version: "0.2" },
    { uid: 3, description: "Master record product ZZZZZZ", doc: "DOC123", product: "PROD123", authdate: "2023-05-21", status: "AUTH", version: "1.0" }
]

/** ITEMS */
const masteritems = [{ value: 'MASTER', label: 'MASTER', image: '/MASTER.svg',level:'level0' }]

let phaseitems = [
    { value: 'DISPENSING', label: 'DISPENSING', image: '/DISPENSING.svg', level: 'level1' },
    { value: 'REACTION', label: 'REACTION', image: '/REACTION.svg', level: 'level1' },
    { value: 'WORKUP', label: 'WORKUP', image: '/WORKUP.svg', level: 'level1' },
    { value: 'ISOLATION', label: 'ISOLATION', image: '/ISOLATION.svg', level: 'level1' },
    { value: 'CLEANING', label: 'CLEANING', image: '/CLEANING.svg', level: 'level1' },
    { value: 'DRYING', label: 'DRYING', image: '/DRYING.svg', level: 'level1' },
    { value: 'MILLING', label: 'MILLING', image: '/MILLING.svg', level: 'level1' },
    { value: 'DISTILLATION', label: 'DISTILLATION', image: '/DISTILLER.svg', level: 'level1' },
    { value: 'PACKAGING', label: 'PACKAGING', image: '/PACKAGING.svg', level: 'level1' },
]

let operationitems = [
    { value: 'Dispensing', label: 'Dispensing', image: '/TASK.svg', level: 'level2' },
    { value: 'Inertization', label: 'Inertization', image: '/TASK.svg', level: 'level2' },
    { value: 'Solid Reagents Loading', label: 'Solid Reagents Loading', image: '/TASK.svg', level: 'level2' },
    { value: 'Liquids Loading', label: 'Liquids Loading', image: '/TASK.svg', level: 'level2' },
    { value: 'Thermoregulation', label: 'Thermoregulation', image: '/TASK.svg', level: 'level2' },
    { value: 'Distillation (vacuum)', label: 'Distillation (vacuum)', image: '/TASK.svg', level: 'level2' },
    { value: 'Distillation (atmospheric)', label: 'Distillation (atmospheric)', image: '/TASK.svg', level: 'level2' },
    { value: 'Vacuum', label: 'Vacuum', image: '/TASK.svg', level: 'level2' },
    { value: 'Pressuriation', label: 'Pressuriation', image: '/TASK.svg', level: 'level2' },
    { value: 'Flush', label: 'Flush', image: '/TASK.svg', level: 'level2' },
    { value: 'Degasing', label: 'Degasing', image: '/TASK.svg', level: 'level2' },
    { value: 'Stirring (multistep)', label: 'Stirring (multistep)', image: '/TASK.svg', level: 'level2' },
    { value: 'Filtration', label: 'Filtration', image: '/TASK.svg', level: 'level2' },
    { value: 'Discharge', label: 'Discharge', image: '/TASK.svg', level: 'level2' },
    { value: 'Dosing Reagents', label: 'Dosing Reagents', image: '/TASK.svg', level: 'level2' },
    { value: 'Sampling', label: 'Sampling', image: '/TASK.svg', level: 'level2' },
    { value: 'Transfer', label: 'Transfer', image: '/TASK.svg', level: 'level2' },
    { value: 'Recycle', label: 'Recycle', image: '/TASK.svg', level: 'level2' },
    { value: 'Rinse', label: 'Rinse', image: '/TASK.svg', level: 'level2' },
    { value: 'Storage', label: 'Storage', image: '/TASK.svg', level: 'level2' },

]

let isaitems = [
    { value: 'COMPANY', label: 'COMPANY', image: '/image-company.svg', level: 'level1' },
    { value: 'FACTORY', label: 'FACTORY', image: '/image-factory.svg', level: 'level2' },
    { value: 'DEPARTMENT', label: 'DEPARTMENT', image: '/image-department.svg', level: 'level3' },
    { value: 'LINE', label: 'LINE', image: '/image-line.svg', level: 'level4' },
    { value: 'EQUIPMENT', label: 'EQUIPMENT', image: '/image-equipment.svg', level: 'level5' },
    { value: 'CONTROLLER', label: 'CONTROLLER', image: '/image-controller.svg', level: 'level6' },
]


const choiceitems = [{ label: 'CHOICE', name: 'CHOICE', image: '/CHOICE.svg', level: 'level2' }]


const login = (body) => {
    if (body.options.username == "MOCKUSER" && body.options.password == "MOCKPASSWD") {
        body.data = { token: 'ABCDEFGH', role:'ADMIN'}
        body.error = null
        attempts = 0
    } else if (body.options.username == "MOCKQA" && body.options.password == "MOCKQA") {
        body.data = { token: 'ABCDEFGH', role: 'SADMIN' }
        body.error = null
        attempts = 0
    }else
    {

        body.data = null
        body.error = "ERR_BAD_PASSWD"
        attempts++
    }
    return(body)
}

const getMasters = (body) => {
    body.data = masters
    return (body)
}

const getMenuItems = (body) => {
    let menuitems = []
    switch (body.options.menu) {
        case 'context-menu-master-node':
            menuitems = masteritems
            break;
        case 'context-menu-phase-node':
            menuitems = phaseitems
            break
        case 'context-menu-operation-node':
            menuitems = operationitems
            break
        case 'context-menu-choice-node':
            menuitems = choiceitems
            break
        case 'context-menu-isa-node':
            menuitems = isaitems
            break
    }
    for (let i = 0; i < menuitems.length; i++) {
        menuitems[i].type = body.options.menu
    }
    body.data = menuitems
    return (body)
}

const getLogs = async function (body) {
    body.data = logs
    return (body)
}

const setLog = function (body) {
    const llog = body.options.log
    logs.push(llog)
    return (body)
}


const mocks = {
    login,
    getMasters,
    getMenuItems,
    getLogs,
    setLog
}

export default mocks