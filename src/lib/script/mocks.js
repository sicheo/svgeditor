let attempts = 0

const masters = [
    { uid: 1, description: "Master record product XXXXXX", doc: "DOC123", product: "PROD123", authdate: "2022-05-14", status: "AUTH", version:"1.1" },
    { uid: 2, description: "Master record product YYYYYY", doc: "DOC123", product: "PROD123", authdate: "", status: "NOAUTH", version: "0.2" },
    { uid: 3, description: "Master record product ZZZZZZ", doc: "DOC123", product: "PROD123", authdate: "2023-05-21", status: "AUTH", version: "1.0" }
]

const masteritems = [{ value: 'MASTER', label: 'MASTER', image: '/MASTER.svg' }]


let phaseitems = [
    { value: 'DISPENSING', label: 'DISPENSING', image: '/DISPENSING.svg' },
    { value: 'REACTION', label: 'REACTION', image: '/REACTION.svg' },
    { value: 'WORKUP', label: 'WORKUP', image: '/WORKUP.svg' },
    { value: 'ISOLATION', label: 'ISOLATION', image: '/ISOLATION.svg' },
    { value: 'CLEANING', label: 'CLEANING', image: '/CLEANING.svg' },
    { value: 'DRYING', label: 'DRYING', image: '/DRYING.svg' },
    { value: 'MILLING', label: 'MILLING', image: '/MILLING.svg' },
]

let operationitems = [
    { value: 'Dispensing', label: 'Dispensing', image: '/TASK.svg' },
    { value: 'Inertization', label: 'Inertization', image: '/TASK.svg' },
    { value: 'Solid Reagents Loading', label: 'Solid Reagents Loading', image: '/TASK.svg' },
    { value: 'Liquids Loading', label: 'Liquids Loading', image: '/TASK.svg' },
    { value: 'Thermoregulation', label: 'Thermoregulation', image: '/TASK.svg' },
    { value: 'Distillation (vacuum)', label: 'Distillation (vacuum)', image: '/TASK.svg' },
    { value: 'Distillation (atmospheric)', label: 'Distillation (atmospheric)', image: '/TASK.svg' },
    { value: 'Vacuum', label: 'Vacuum', image: '/TASK.svg' },
    { value: 'Pressuriation', label: 'Pressuriation', image: '/TASK.svg' },
    { value: 'Flush', label: 'Flush', image: '/TASK.svg' },
    { value: 'Degasing', label: 'Degasing', image: '/TASK.svg' },
    { value: 'Stirring (multistep)', label: 'Stirring (multistep)', image: '/TASK.svg' },
    { value: 'Filtration', label: 'Filtration', image: '/TASK.svg' },
    { value: 'Discharge', label: 'Discharge', image: '/TASK.svg' },
    { value: 'Dosing Reagents', label: 'Dosing Reagents', image: '/TASK.svg' },
    { value: 'Sampling', label: 'Sampling', image: '/TASK.svg' },
    { value: 'Transfer', label: 'Transfer', image: '/TASK.svg' },
    { value: 'Recycle', label: 'Recycle', image: '/TASK.svg' },
    { value: 'Rinse', label: 'Rinse', image: '/TASK.svg' },
    { value: 'Storage', label: 'Storage', image: '/TASK.svg' },

]


const choiceitems = [{ label: 'CHOICE', name: 'CHOICE', image: '/CHOICE.svg' }]

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
    }
    for (let i = 0; i < menuitems.length; i++) {
        menuitems[i].type = body.options.menu
    }
    body.data = menuitems
    return (body)
}

const mocks = {
    login,
    getMasters,
    getMenuItems
}

export default mocks