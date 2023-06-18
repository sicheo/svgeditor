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

// DEVICES
const devices = [
    { 
        uid: 'abc-1',
        name: 'DEV1-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Virtual Machine Line XY Plant Z",
        localization: {
            plant: 0,
            department: 0,
            line: 0,
        },
        host: "SRV01-01",
        port: 3001,
        type: "VM",
        os: "MICROSOFT",
        userid: "amdin",
        password: "",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "BRAINBOXES",
            model: "BB-400",
        },
    },
    {
        uid: 'bca-2',
        name: 'DEV2-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Edge Computer Line XY Plant Z",
        localization: {
            plant: 0,
            department: 0,
            line: 0,
        },
        host: "192.164.0.23",
        port: 3000,
        type: "HW",
        os: "RASPI",
        userid: "",
        password: "admin",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "BRAINBOXES",
            model: "BB-400",
        },
    },
    {
        uid: 'abc-2-2',
        name: 'DEV2-002',
        lastmodified: "2023-05-30T10:00:00",
        description: "Edge Computer Line WY Plant Z",
        localization: {
            plant: 0,
            department: 0,
            line: 0,
        },
        host: "10.112.1.71",
        port: 3000,
        type: "HW",
        os: "UBUNTU",
        userid: "admin",
        password: "",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "CISCO",
            model: "IC3000",
        },
    }
]

// AGENTS

const agents = [
    {
        uid: 'ag-234-abc-1',
        name: "SCANNER1",
        type: "SCANNER",
        description: "Scanner agent for device DEV1-001",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "S7 driver test client.",
            timeout: 10,
            driver: "s7",
            server: "192.168.1.31",
            port: 102,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        destination: {
            name: "MQTT SCANNER1.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        dbs: [{
            uid: 0,
            name: "s7.csv",
        }],
        devuid: 'abc-1',
        status: "ACTIVE",   
    },
    {
        uid: 'ag-234-abc-11',
        name: "SCANNER11",
        type: "SCANNER",
        description: "Scanner agent for device DEV1-001",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "S7 driver test client.",
            timeout: 10,
            driver: "s7",
            server: "192.168.1.31",
            port: 102,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        destination: {
            name: "MQTT SCANNER1.",
            timeout: 10,
            driver: "mqtt",
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        dbs: [{
            uid: 0,
            name: "s7-1.csv"
        }],
        devuid: 'abc-1',
        status: "INACTIVE",
    },
    { 
        uid: 'ag-234-hst-1',
        name: "HIST1",
        type: "HISTORIAN",
        description: "Historian agent for device DEV1-001",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "MQTT SCANNER1.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        destination: {
            name: "CRATEDB SERVER.",
            driver: "crate",
            timeout: 10,
            server: "192.168.1.31",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        devuid: 'abc-1',
        status: "ACTIVE",
    },
    {
        uid: 'ag-234-abc-2',
        name: "SCANNER2",
        type: "SCANNER",
        description: "Scanner agent for device DEV2-001",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "MODBUS driver test client.",
            timeout: 10,
            driver: "modbus",
            server: "192.168.1.31",
            port: 502,
            username: "aiqadmin",
            password: "aiqadmin",

        },
        destination: {
            name: "MQTT SCANNER2.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        dbs: [{ uid: 0, name: "modbus.csv" }],
        uid: 'bca-2',
        status: "INACTIVE",
    },
    {
        uid: 'ag-234-hst-2',
        name: "HIST2",
        type: "HISTORIAN",
        description: "Historian agent for device DEV2-001",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "MQTT SCANNER2.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        destination: {
            name: "CRATEDB SERVER.",
            driver: "pirest",
            timeout: 10,
            server: "192.168.1.31",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        uid: 'bca-2',
        status: "INACTIVE",
    },
    { 
        uid: 'ag-234-abc-4',
        name: "SCANNER3",
        type: "SCANNER",
        description: "Scanner agent for device DEV2-002",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "MODBUS driver test client.",
            timeout: 10,
            driver: "modbus",
            server: "192.168.1.31",
            port: 502,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        destination: {
            name: "MQTT SCANNER3.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        dbs: [{ uid: 0, name: "modbus1.csv" }],
        uid: 'abc-2-2',
        status: "ACTIVE",
    },
    {
        uid: 'ag-234-hst-3',
        name: "HIST3",
        type: "HISTORIAN",
        description: "Historian agent for device DEV2-002",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "MQTT SCANNER3.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        destination: {
            name: "CRATEDB SERVER.",
            driver: "mssql",
            timeout: 10,
            server: "192.168.1.31",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
        },
        uid: 'abc-2-2',
        status: "ACTIVE",
    },
    
]

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

const filterArray = (array, filters) => {
    if (filters.length) {
        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i]
            switch (filter.op) {
                case "eq":
                    array = array.filter((item) => { return item[filter.name] == filter.value })
                    break;
                case "neq":
                    array = array.filter((item) => { return item[filter.name] != filter.value })
                    break;
                case "leq":
                    array = array.filter((item) => { return item[filter.name] <= filter.value })
                    break;
                case "le":
                    array = array.filter((item) => { return item[filter.name] < filter.value })
                    break;
                case "geq":
                    array = array.filter((item) => { return item[filter.name] >= filter.value })
                    break;
                case "gr":
                    array = array.filter((item) => { return item[filter.name] > filter.value })
                    break;
                case "in":
                    array = array.filter((item) => { return item[filter.name].includes(filter.value) })
                    break;
            }
        }
    }
    return array
}

const getDevices = async function (body) {
    let retDevices = JSON.parse(JSON.stringify(devices))
    const filters = body.option.filters

    retDevices = filterArray(retDevices,filters)
    
    body.data = retDevices
    return (body)
}

const getAgents = async function (body) {
    let retAgents = JSON.parse(JSON.stringify(agents))
    const filters = body.option.filters

    retAgents = filterArray(retAgents, filters)

    body.data = retAgents
    return (body)
}

const setDevice = async function (body) {
    const device = body.options.device
    let old = null
    if (device) {
        const existing = devices.findIndex((item) => { return item.id == device.id })
        if (existing > -1) {
            old = devices[existing]
            devices[existing] = device
        } else {
            devices.push(device)
        }
    }

    return old
}

const setAgent = async function (body) {
    const agent = body.options.agent
    let old = null
    if (agent) {
        const existing = agents.findIndex((item) => { return item.id == agent.id })
        if (existing > -1) {
            old = agents[existing]
            agents[existing] = agent
        } else {
            agents.push(agent)
        }
    }

    return old
}


const mocks = {
    login,
    getMasters,
    getMenuItems,
    getLogs,
    setLog,
    getDevices,
    setDevice,
    getAgents,
    setAgent
}

export default mocks