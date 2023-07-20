import { v4 as uuidv4 } from 'uuid';
import { getLocalDate } from '../script/utils.js'

let attempts = 0
let logs = []

let docker = {}

/** MASTERS */
/*const masters = [
    { uid: 1, description: "Master record product XXXXXX", doc: "DOC123", product: "PROD123", authdate: "2022-05-14", status: "AUTH", version:"1.1" },
    { uid: 2, description: "Master record product YYYYYY", doc: "DOC111", product: "PROD123", authdate: "", status: "NOAUTH", version: "0.2" },
    { uid: 3, description: "Master record product ZZZZZZ", doc: "DOC123", product: "PROD123", authdate: "2023-05-21", status: "AUTH", version: "1.0" }
]*/

/** ITEMS */
const masteritems = [
    { value: 'MASTER', label: 'MASTER', image: '/MASTER.svg', level: 'level0' },
    { value: 'FINAL', label: 'FINAL', image: '/FINAL.svg', level: 'level0' }
]

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
let devices = [
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

let agents = [
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
        status: "ACTIVE",
    },
    
]

// processes
let processes = [
    {
        uuid: uuidv4(),
        name: "MASTER",
        doccode: "DOC1234",
        uid: 0,
        description: "Master Record PROD1234",
        data: {
            doccode: "DOC1234",
            prodcode: "PRODXYX",
            projcode: "PRJ-234-XD",
            sapcode: "SAP456XX21",
            sapdesc: "Z567LP789",
            description: "Master Record PROD1234",
            lastmodified: getLocalDate(new Date(Date.now())),
            authorization: {
                authorized: false,
                blocked:false,
                authdate: '',
                version: '1.0',
                signature: null
            },
            machines: [
                {

                    DESCRIPTION: 'Autoclave Fedegari AUT304',
                    CODE: 'AUT-304-001',
                    ONLINECHK: false,
                    CLEANCHK: true,
                    PREDATE: getLocalDate(new Date(Date.now())),
                    PRESIGNATURE: "",
                    USEDCHK: false,
                    POSTDATE: getLocalDate(new Date(Date.now())),
                    POSTSIGNATURE: ""
                },
                {

                    DESCRIPTION: 'Riempitrice IMA RTGA-2',
                    CODE: 'RMP-RTGA-001',
                    ONLINECHK: false,
                    CLEANCHK: true,
                    PREDATE: getLocalDate(new Date(Date.now())),
                    PRESIGNATURE: "",
                    USEDCHK: false,
                    POSTDATE: getLocalDate(new Date(Date.now())),
                    POSTSIGNATURE: ""
                },
                {

                    DESCRIPTION: 'Liofilizzatore IMA LYOFAST25',
                    CODE: 'LYO-L25-001',
                    ONLINECHK: false,
                    CLEANCHK: true,
                    PREDATE: getLocalDate(new Date(Date.now())),
                    PRESIGNATURE: "",
                    USEDCHK: false,
                    POSTDATE: getLocalDate(new Date(Date.now())),
                    POSTSIGNATURE: ""
                }
            ],
            materials: [
                {
                    DESCRIPTION: "Prednisolone",
                    SUPPLIER: "ACME inc.",
                    SAPCODE: "C2344GTM09",
                    FORMULA: "C21H28O5",
                    PM: 360.4,
                    BP: 235,
                    DENSITY: 15,
                    INLIST: false,
                    APPEARENCE: "",
                    RISK: "",
                    CAUTION: "",
                },
                {
                    DESCRIPTION: "Acqua Iniettabili",
                    SUPPLIER: "SALF spa.",
                    SAPCODE: "C2344GTM09",
                    FORMULA: "H2O",
                    PM: 18.016,
                    BP: 100,
                    DENSITY: 0.998,
                    INLIST: false,
                    APPEARENCE: "",
                    RISK: "",
                    CAUTION: "",
                }
            ],
            personnel: [
                {
                    NAME: "PAOLO PULICANI",
                    DATE: "2023-07-04T19:15:00",
                    SIGNATURE: "",
                    ABBREVIATION: "PPUL",
                },
                {
                    NAME: "",
                    DATE: "",
                    SIGNATURE: "",
                    ABBREVIATION: "",
                }
            ],
            final: {
                analysisList: [
                    {
                        CODE: 'AC1234',
                        BATCHCODE: 'BATCH1234',
                        POINT: 'INFIALAMENTO',
                        ANALYSIS: 'ANALISI PH',
                        DATE: getLocalDate(new Date(Date.now())),
                        SIGNATURE: 'PAOLO PULICANI',
                    }
                ],
                batchYelds: {
                    INITWEIGTH: 125.8,
                    INITMOLE: 14.21,
                    FINALWEIGTH: 120.9,
                    FINALMOLE: 13.99,
                    MOLARYIELD: 0.98,
                    SIGNATURE:'PAOLO PULICANI',
                    DATE: getLocalDate(new Date(Date.now())),
                    CHECKSIGNATURE: 'SERGIO PETRONZI',
                    CHECKDATE: getLocalDate(new Date(Date.now())),
                },
                productInfo: {},
                //labelingAndStore: {},
                labeling: [],
                store:[],
                cleaningVerification: {},
                notes:[],
                parent:"NODE-1"
            }
        },
        graph: {
            id: 'NODE-0',
            level: "level0",
            type: 'MASTER',
            image: "/MASTER.svg",
            shape: "RECT",
            width: 140,
            height: 90,
            imgwidth: 30,
            imgheight: 30,
            x: 454,
            y: 253
        },
        phases: [
            {
                name: "DISPENSING",
                uid:1,
                description: "Phase description",
                parent: "NODE-0",
                data: {},
                graph: {
                    id: 'NODE-1',
                    level: "level1",
                    type: 'PHASE',
                    image: "/DISPENSING.svg",
                    shape: "RECT",
                    width: 140,
                    height: 90,
                    imgwidth: 30,
                    imgheight: 30,
                    x: 572,
                    y: 230
                },
                operations: [
                    {
                        name: "Inertization",
                        uid: 0,
                        description: "Operation description",
                        parent: null,
                        data: {},
                        graph: {
                            id: "NODE-0",
                            level: "level1",
                            type: 'TASK',
                            image: "/TASK.svg",
                            shape: "RECT",
                            width: 120,
                            height: 50,
                            imgwidth: 15,
                            imgheight: 15,
                            x: 490,
                            y: 263
                        },
                        tasks: [
                            {
                                uid: 0,
                                type: "Task",
                                name: "Task Name",
                                tag: "VAR-TAG",
                                checktype: "ANALOG",
                                op: "EQ",
                                expected: "30",
                                description: "task description",
                                checkmode: "automatic",
                                system: "IFIX",
                                result: {
                                    value: "",
                                    note:"",
                                    timestamp: null,
                                    signature: null,
                                    checksignature: null
                                },
                            }
                        ]
                    },
                    {
                        name: "Thermoregulation",
                        uid: 1,
                        description: "Operation description",
                        parent: "NODE-0",
                        data: {},
                        graph: {
                            id: "NODE-1",
                            level: "level1",
                            type: 'TASK',
                            image: "/TASK.svg",
                            shape: "RECT",
                            width: 120,
                            height: 50,
                            imgwidth: 15,
                            imgheight: 15,
                            x: 490,
                            y: 263
                        },
                        tasks: []
                    }
                ]
            }
        ]
    },
    {
        uuid: uuidv4(),
        name: "MASTER",
        doccode: "DOC5678",
        uid: 0,
        description: "Master Record PROD5678",
        data: {
            doccode: "DOC5678",
            description: "Master Record PROD5678",
            lastmodified: getLocalDate(new Date(Date.now())),
            authorization: {
                authorized: true,
                blocked: true,
                authdate: '2023-07-17T16:04:00',
                version: '1.0',
                signature: "ABCDEFGHI"
            },
            machines: [],
            materials: [],
            personnel: [],
            final: {
                analysisList: [],
                batchYelds: {},
                productInfo: {},
                labeling: [],
                store: [],
                cleaningVerification: {},
                notes: [],
                parent: "NODE-0"
            }
        },
        graph: {
            id: 'NODE-0',
            level: "level0",
            type: 'MASTER',
            image: "/MASTER.svg",
            shape: "RECT",
            width: 140,
            height: 90,
            imgwidth: 30,
            imgheight: 30,
            x: 454,
            y: 253
        },
        phases: []
    },
    {
        uuid: uuidv4(),
        name: "MASTER",
        doccode: "DOC7777",
        uid: 0,
        description: "Master Record PROD7777",
        data: {
            doccode: "DOC5678",
            description: "Master Record PROD7777",
            lastmodified: getLocalDate(new Date(Date.now())),
            authorization: {
                authorized: false,
                blocked: false,
                authdate: '',
                version: '1.0',
                signature: null
            },
            machines: [],
            materials: [],
            personnel: [],
            final: {
                analysisList: [],
                batchYelds: {},
                productInfo: {},
                labeling: [],
                store: [],
                cleaningVerification: {},
                notes: [],
                parent: "NODE-0"
            }
        },
        graph: {
            id: 'NODE-0',
            level: "level0",
            type: 'MASTER',
            image: "/MASTER.svg",
            shape: "RECT",
            width: 140,
            height: 90,
            imgwidth: 30,
            imgheight: 30,
            x: 454,
            y: 253
        },
        phases: []
    },
    {
        uuid: uuidv4(),
        name: "MASTER",
        doccode: "DOC0909",
        uid: 0,
        description: "Master Record PROD0909",
        data: {
            doccode: "DOC5678",
            description: "Master Record PROD0909",
            lastmodified: getLocalDate(new Date(Date.now())),
            authorization: {
                authorized: false,
                blocked: false,
                authdate: '',
                version: '1.0',
                signature: null
            },
            machines: [],
            materials: [],
            personnel: [],
            final: {
                analysisList: [],
                batchYelds: {},
                productInfo: {},
                labeling: [],
                store: [],
                cleaningVerification: {},
                notes: [],
                parent: "NODE-0"
            }
        },
        graph: {
            id: 'NODE-0',
            level: "level0",
            type: 'MASTER',
            image: "/MASTER.svg",
            shape: "RECT",
            width: 140,
            height: 90,
            imgwidth: 30,
            imgheight: 30,
            x: 454,
            y: 253
        },
        phases: []
    }
]

let companies = [
    {
        uid: 0,
        name: "COMPANYNAME",
        address: "Via Ragazzi del ‘99, 5 Bologna (IT)",
        x: 322,
        y: 258,
        level: 'level1',
        type:'COMPANY'
    },
]

let plants = [
    {     
        uid: 1,
        name: "PLANT1",
        description: "Stabilimento 1 ",
        nation: "IT",
        city: "Rome",
        lat: "",
        lon: "",
        company: 0,
        x: 440,
        y: 259,
        level: 'level2',
        type: 'FACTORY'
    }
]

let departments = [
    {
        uid: 6,
        name: "DEP-01",
        description: "Department 01 - injectables",
        plant: 1,
        x: 556,
        y: 369,
        level: 'level3',
        type: 'DEPARTMENT'
    },
    {
        uid: 2,
        name: "DEP-02",
        description: "Department 01 - solids",
        plant: 1,
        x: 557,
        y: 260,
        level: 'level3',
        type: 'DEPARTMENT'
    }
]

let lines = [
    {
        uid: 3,
        name: "LINE-01",
        description: "Line 01 - preparation",
        department: 2,
        x: 673,
        y: 260,
        level: 'level4',
        type: 'LINE'
    },
    {
        uid: 7,
        name: "LINE-02",
        description: "Line 01 - lyophilization",
        department: 2,
        x: 667,
        y: 370,
        level: 'level4',
        type: 'LINE'
    }
]

let machines = [
    {
        uid: 8,
        name: "AUT-01",
        description: "Autoclave Fedegari",
        line: 7,
        manufacturer: "FEDEGARI",
        model: "XFOAF7/Q253",
        room: "G041",
        x: 785,
        y: 371,
        level: 'level5',
        type: 'EQUIPMENT'
    },
    {
        uid: 4,
        name: "PRP-01",
        description: "Preparatore",
        line: 3,
        manufacturer: "Intertech",
        model: "010",
        room: "G040",
        x: 788,
        y: 259,
        level: 'level5',
        type: 'EQUIPMENT'
    }
]

let controllers = [
    {
        uid: 9,
        name: "CNTL-AUT-01",
        ctype: "",
        model: "Controller Thema4",
        machine: 8,
        manufacturer: "FEDEGARI",
        ip: "10.1.234.67",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
        x: 900,
        y: 371,
        level: 'level6',
        type: 'CONTROLLER'
    },
    {
        uid: 5,
        name: "CNTL-PRP-01",
        ctype: "",
        model: "Controller Thema4",
        machine: 4,
        manufacturer: "",
        ip: "10.1.234.69",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
        x: 900,
        y: 261,
        level: 'level6',
        type: 'CONTROLLER'
    }
]


const materialCols = [
    { name: 'DESCRIPTION', type: 'string', header: 'Descrizione' },
    { name: 'SUPPLIER', type: 'string', header: 'Fornitore' },
    { name: 'SAPCODE', type: 'string', header: 'Codice SAP' },
    { name: 'FORMULA', type: 'string', header: 'Formula' },
    { name: 'PM', type: 'number', header: 'P.M.' },
    { name: 'BP', type: 'number', header: 'P. Eb. (DEGC)' },
    { name: 'DENSITY', type: 'number', header: 'd 20 DEGC (gr/ml)' },
    { name: 'INLIST', type: 'boolean', header: 'Incluso in elenco' },
    { name: 'APPEARENCE', type: 'string', header: 'Apparenza' },
    { name: 'RISK', type: 'string', header: 'Rischi' },
    { name: 'CAUTIONS', type: 'string', header: 'Precauzioni' },
]

const personnelCols = [
    { name: 'NAME', type: 'string', header: 'Nominativo' },
    { name: 'DATE', type: 'date', header: 'Data' },
    { name: 'SIGNATURE', type: 'password', header: 'Firma operatore' },
    { name: 'ABBREVIATION', type: 'string', header: 'Sigla operatore' },
]

const machineCols = [
    { name: 'DESCRIPTION', type: 'string', header: 'Descrizione' },
    { name: 'CODE', type: 'string', header: 'Codice' },
    { name: 'ONLINECHK', type: 'boolean', header: 'Verifica stato on-line' },
    { name: 'CLEANCHK', type: 'boolean', header: 'Verifica presenza cartellino verde' },
    { name: 'PREDATE', type: 'date', header: 'Data check iniziale' },
    { name: 'PRESIGNATURE', type: 'password', header: 'Firma check iniziale' },
    { name: 'USEDCHK', type: 'boolean', header: 'Utilizzata (Si/No)' },
    { name: 'POSTDATE', type: 'date', header: 'Data check finale' },
    { name: 'POSTSIGNATURE', type: 'password', header: 'Firma check finale' },
]

const finalAnalysisCols = [
    { name: 'CODE', type: 'string', header: 'Codice Campione' },
    { name: 'BATCHCODE', type: 'string', header: 'Codice batch' },
    { name: 'POINT', type: 'string', header: 'Punto Batch Record' },
    { name: 'ANALYSIS', type: 'string', header: 'Analisi richiesta' },
    { name: 'DATE', type: 'date', header: 'Data richiesta' },
    { name: 'SIGNATURE', type: 'password', header: 'Firma' },
]

const finalYeldsCols = [
    { name: 'INITWEIGTH', type: 'number', header: 'Peso iniziale (g)' },
    { name: 'INITMOLE', type: 'number', header: 'Moli iniziali (nmol)' },
    { name: 'FINALWEIGTH', type: 'number', header: 'Peso finale (g)' },
    { name: 'FINALMOLE', type: 'number', header: 'Moli finali (nmol)' },
    { name: 'MOLARYIELD', type: 'number', header: 'Resa Molare' },
    { name: 'SIGNATURE', type: 'password', header: 'Firma' },
    { name: 'DATE', type: 'date', header: 'Data' },
    { name: 'CHECKSIGNATURE', type: 'password', header: 'Firma controllo' },
    { name: 'CHECKDATE', type: 'date', header: 'Data controllo' },
]

const finalInfoprodCols = [
    { name: 'NAME', type: 'string', header: 'Nome Prodotto' },
    { name: 'CASNUM', type: 'string', header: 'CAS Number' },
    { name: 'MW', type: 'number', header: 'Peso Molecolare' },
    { name: 'FORMULA', type: 'string', header: 'Formula Bruta' },
    { name: 'FINALQUANTITY', type: 'number', header: "Quantita' ottenuta (kg)" },
    { name: 'MOLARYELD', type: 'number', header: 'Resa Molare (%)' },
    { name: 'NCONTAINERS', type: 'number', header: 'Numero contenitori' },
    { name: 'STORAGETEMP', type: 'number', header: 'Temperatura storage (DEGC)' },
    { name: 'SIGNATURE', type: 'password', header: 'Firma' },
    { name: 'DATE', type: 'date', header: 'Data' },
]

const finalLabelingCols = [
    { name: 'NLABEL', type: 'string', header: 'Etichetta identificatrice' },
    { name: 'USAGE', type: 'string', header: 'Utilizzo' },
    { name: 'FCTUO', type: 'boolean', header: 'For Clinical Trial Use Only' },
    { name: 'SIGNATURE', type: 'password', header: 'Firma' },
    { name: 'DATE', type: 'date', header: 'Data' },
]

const finalStorageCols = [
    { name: 'ACTION', type: 'string', header: 'Azione',size:20 },
    { name: 'VALUE', type: 'boolean', header: 'Valore' },
    { name: 'NOTE', type: 'string', header: 'Nota' },
    { name: 'SIGNATURE', type: 'password', header: 'Firma' },
    { name: 'DATE', type: 'date', header: 'Data' },
    { name: 'CHECKSIGNATURE', type: 'password', header: 'Firma Controllo' },
]

const finalClearverCols = [
    { name: 'QPROD', type: 'number', header: "Quantita' prodotta (Kg)"},
    { name: 'ACCLIM', type: 'number', header: 'Limite di accettazione ricalcolato (mg)' },
    { name: 'VCLRANVER', type: 'number', header: 'Valore Cleaning Verification (mg)' },
    { name: 'CONFORITY', type: 'boolean', header: 'Risultato Conforme' },
    { name: 'DATE', type: 'date', header: 'Data' },
    { name: 'SIGNATURE', type: 'password', header: 'Firma' },
    { name: 'CHECKSIGNATURE', type: 'password', header: 'Firma Controllo' },
]


const finalNotesCols = [
    { name: 'REFERENCE', type: 'string', header: "Riferimento punto" },
    { name: 'NOTE', type: 'string', header: 'Commenti e osservazioni', size: 40 },
]

// ebrs
let ebrs = [
    {
        uuid: "BATCH-1234-0945",
        name: "MASTER",
        doccode: "DOC1234",
        prodcode: "PRODXYX",
        uid: 0,
        description: "Lotto BATCH-1234-0945 ",
        data: {
            doccode: "DOC1234",
            prodcode: "PRODXYX",
            projcode: "PRJ-234-XD",
            sapcode: "SAP456XX21",
            sapdesc: "Z567LP789",
            description: "Electronic Batch Record BATCH-1234-0945",
            lastmodified: getLocalDate(new Date(Date.now())),
            authorization: {
                authorized: true,
                blocked: true,
                authdate: '',
                version: '1.0',
                signature: ""
            },
            machines: [
                {

                    DESCRIPTION: 'Autoclave Fedegari AUT304',
                    CODE: 'AUT-304-001',
                    ONLINECHK: true,
                    CLEANCHK: true,
                    PREDATE: getLocalDate(new Date(Date.now())),
                    PRESIGNATURE: "",
                    USEDCHK: true,
                    POSTDATE: getLocalDate(new Date(Date.now())),
                    POSTSIGNATURE: ""
                },
                {

                    DESCRIPTION: 'Riempitrice IMA RTGA-2',
                    CODE: 'RMP-RTGA-001',
                    ONLINECHK: true,
                    CLEANCHK: true,
                    PREDATE: getLocalDate(new Date(Date.now())),
                    PRESIGNATURE: "",
                    USEDCHK: true,
                    POSTDATE: getLocalDate(new Date(Date.now())),
                    POSTSIGNATURE: ""
                },
                {
                    DESCRIPTION: 'Liofilizzatore IMA LYOFAST25',
                    CODE: 'LYO-L25-001',
                    ONLINECHK: true,
                    CLEANCHK: true,
                    PREDATE: getLocalDate(new Date(Date.now())),
                    PRESIGNATURE: "",
                    USEDCHK: true,
                    POSTDATE: getLocalDate(new Date(Date.now())),
                    POSTSIGNATURE: ""
                }
            ],
            materials: [
                {
                    DESCRIPTION: "Prendisolone",
                    SUPPLIER: "ACME inc.",
                    SAPCODE: "C2344GTM09",
                    FORMULA: "C21H28O5",
                    PM: 360.4,
                    BP: 235,
                    DENSITY: 15,
                    APPEARENCE: "",
                    RISK: "",
                    CAUTION: "",
                }
            ],
            personnel: [
                {
                    NAME: "PAOLO PULICANI",
                    DATE: "2023-07-04T19:15:00",
                    SIGNATURE: "",
                    ABBREVIATION: "PPUL",
                },
                {
                    NAME: "",
                    DATE: "",
                    SIGNATURE: "",
                    ABBREVIATION: "",
                }
            ],
            final: {
                analysisList: [],
                batchYelds: {},
                productInfo: {},
                labeling: [],
                store: [],
                cleaningVerification: {},
                notes: [],
                parent: "NODE-1"
            }
        },
        graph: {
            id: 'NODE-0',
            level: "level0",
            type: 'MASTER',
            image: "/MASTER.svg",
            shape: "RECT",
            width: 140,
            height: 90,
            imgwidth: 30,
            imgheight: 30,
            x: 454,
            y: 253
        },
        phases: [
            {
                name: "DISPENSING",
                uid: 1,
                description: "Phase description",
                parent: "NODE-0",
                data: {},
                graph: {
                    id: 'NODE-1',
                    level: "level1",
                    type: 'PHASE',
                    image: "/DISPENSING.svg",
                    shape: "RECT",
                    width: 140,
                    height: 90,
                    imgwidth: 30,
                    imgheight: 30,
                    x: 572,
                    y: 230
                },
                operations: [
                    {
                        name: "Inertization",
                        uid: 0,
                        description: "Operation description",
                        parent: null,
                        data: {},
                        graph: {
                            id: "NODE-0",
                            level: "level1",
                            type: 'TASK',
                            image: "/TASK.svg",
                            shape: "RECT",
                            width: 120,
                            height: 50,
                            imgwidth: 15,
                            imgheight: 15,
                            x: 490,
                            y: 263
                        },
                        tasks: [
                            {
                                uid: 0,
                                type: "Task",
                                name: "Task Name",
                                tag: "VAR-TAG",
                                checktype: "ANALOG",
                                op: "EQ",
                                expected: "30",
                                description: "task description",
                                checkmode: "automatic",
                                system: "IFIX",
                                result: {
                                    value: "",
                                    note: "",
                                    timestamp: null,
                                    signature: null,
                                    checksignature: null
                                },
                            }
                        ]
                    },
                    {
                        name: "Thermoregulation",
                        uid: 1,
                        description: "Operation description",
                        parent: "NODE-0",
                        data: {},
                        graph: {
                            id: "NODE-1",
                            level: "level1",
                            type: 'TASK',
                            image: "/TASK.svg",
                            shape: "RECT",
                            width: 120,
                            height: 50,
                            imgwidth: 15,
                            imgheight: 15,
                            x: 490,
                            y: 263
                        },
                        tasks: []
                    }
                ]
            }
        ]
    }
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
    }else if (body.options.username == "USER" && body.options.password == "USER") {
        body.data = { token: 'ABCDEFGH', role: 'USER' }
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

/*const getMasters = (body) => {
    body.data = masters
    return (body)
}*/

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

const filterArray = (array, filters, neg=false) => {
    if (filters && filters.length) {
        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i]
            switch (filter.op) {
                case "eq":
                    if(!neg)
                        array = array.filter((item) => { return item[filter.name] == filter.value })
                    else
                        array = array.filter((item) => { return item[filter.name] != filter.value })
                    break;
                case "neq":
                    if (!neg)
                        array = array.filter((item) => { return item[filter.name] != filter.value })
                    else
                        array = array.filter((item) => { return item[filter.name] == filter.value })
                    break;
                case "leq":
                    if(!neg)
                        array = array.filter((item) => { return item[filter.name] <= filter.value })
                    else
                        array = array.filter((item) => { return item[filter.name] > filter.value })
                    break;
                case "le":
                    if (!neg)
                        array = array.filter((item) => { return item[filter.name] < filter.value })
                    else
                        array = array.filter((item) => { return item[filter.name] >= filter.value })
                    break;
                case "geq":
                    if (!neg)
                        array = array.filter((item) => { return item[filter.name] >= filter.value })
                    else
                        array = array.filter((item) => { return item[filter.name] < filter.value })
                    break;
                case "gr":
                    if(!neg)
                        array = array.filter((item) => { return item[filter.name] > filter.value })
                    else
                        array = array.filter((item) => { return item[filter.name] <= filter.value })
                    break;
                case "in":
                    if (!neg)
                        array = array.filter((item) => { return item[filter.name].includes(filter.value) })
                    else
                        array = array.filter((item) => { return !item[filter.name].includes(filter.value) })
                    break;
            }
        }
    }
    return array
}

const getDevices = async function (body) {
    let retDevices = JSON.parse(JSON.stringify(devices))
    const filters = body.options.filters

    retDevices = filterArray(retDevices,filters)
    
    body.data = retDevices
    return (body)
}

const getAgents = async function (body) {
    let retAgents = JSON.parse(JSON.stringify(agents))
    const filters = body.options.filters

    retAgents = filterArray(retAgents, filters)

    body.data = retAgents
    return (body)
}

const getProcesses = async function (body) {
    let retProcesses = JSON.parse(JSON.stringify(processes))
    const filters = body.options.filters

    retProcesses = filterArray(retProcesses, filters)
    body.data = retProcesses
    return (body)
}

const getCompanies = async function (body) {
    let retCompanies = JSON.parse(JSON.stringify(companies))
    const filters = body.options.filters

    retCompanies = filterArray(retCompanies, filters)
    body.data = retCompanies
    return (body)
}

const getPlants = async function (body) {
    let retPlants = JSON.parse(JSON.stringify(plants))
    const filters = body.options.filters

    retPlants = filterArray(retPlants, filters)
    body.data = retPlants
    return (body)
}

const getDepartments = async function (body) {
    let retDepartments = JSON.parse(JSON.stringify(departments))
    const filters = body.options.filters

    retDepartments = filterArray(retDepartments, filters)
    body.data = retDepartments
    return (body)
}

const getLines = async function (body) {
    let retLines = JSON.parse(JSON.stringify(lines))
    const filters = body.options.filters

    retLines = filterArray(retLines, filters)
    body.data = retLines
    return (body)
}

const getMachines = async function (body) {
    let retMachines = JSON.parse(JSON.stringify(machines))
    const filters = body.options.filters

    retMachines = filterArray(retMachines, filters)
    body.data = retMachines
    return (body)
}

const getControllers = async function (body) {
    let retControllers = JSON.parse(JSON.stringify(controllers))
    const filters = body.options.filters

    retControllers = filterArray(retControllers, filters)
    body.data = retControllers
    return (body)
}

const setCompany = async function (body) {
    const company = body.options.company
    let old = null
    if (company) {
        const existing = companies.findIndex((item) => { return item.uid == company.uid })
        if (existing > -1) {
            old = companies[existing]
            companies[existing] = company
        } else {
            companies.push(company)
        }
    }
    return old
}

const setPlant = async function (body) {
    const plant = body.options.plant
    let old = null
    if (plant) {
        const existing = companies.findIndex((item) => { return item.uid == plant.uid })
        if (existing > -1) {
            old = plants[existing]
            plants[existing] = plant
        } else {
            plants.push(plant)
        }
    }
    return old
}

const setDepartment = async function (body) {
    const department = body.options.department
    let old = null
    if (department) {
        const existing = departments.findIndex((item) => { return item.uid == department.uid })
        if (existing > -1) {
            old = departments[existing]
            departments[existing] = department
        } else {
            departments.push(department)
        }
    }
    return old
}

const setLine = async function (body) {
    const line = body.options.line
    let old = null
    if (line) {
        const existing = lines.findIndex((item) => { return item.uid == line.uid })
        if (existing > -1) {
            old = lines[existing]
            lines[existing] = line
        } else {
            lines.push(line)
        }
    }
    return old
}

const setMachine = async function (body) {
    const machine = body.options.machine
    let old = null
    if (machine) {
        const existing = machines.findIndex((item) => { return item.uid == machine.uid })
        if (existing > -1) {
            old = machines[existing]
            machines[existing] = machine
        } else {
            machines.push(machine)
        }
    }
    return old
}

const setController = async function (body) {
    const controller = body.options.controller
    let old = null
    if (controller) {
        const existing = controllers.findIndex((item) => { return item.uid == controller.uid })
        if (existing > -1) {
            old = controllers[existing]
            controllers[existing] = controller
        } else {
            controllers.push(controller)
        }
    }
    return old
}

const deleteController = async function (body) {
    const filters = body.options.filters

    controllers = filterArray(controllers, filters, true)
    body.data = controllers
    return (body)
}

const deleteMachine = async function (body) {
    let filters = body.options.filters

    machines = filterArray(machines, filters, true)
    // DELETE CONTROLLERS
    for (let i = 0; i < machines.length; i++) {
        filters = []
        const filter = { op: 'eq', name: 'machine', value: machines[i].uid }
        filters.push(filter)
    }
    controllers = filterArray(controllers, filters, false)

    body.data = machines
    return (body)
}

const deleteLine = async function (body) {
    let filters = body.options.filters

    lines = filterArray(lines, filters, true)
    // DELETE MACHINES
    for (let i = 0; i < lines.length; i++) {
        filters = []
        const filter = { op: 'eq', name: 'line', value: lines[i].uid }
        filters.push(filter)
    }
    body.options.filters = filters
    deleteMachine(body)

    body.data = lines
    return (body)
}

const deleteDepartment = async function (body) {
    let filters = body.options.filters

    departments = filterArray(departments, filters, true)
    // DELETE LINES
    for (let i = 0; i < departments.length; i++) {
        filters = []
        const filter = { op: 'eq', name: 'department', value: departments[i].uid }
        filters.push(filter)
    }
    body.options.filters = filters
    deleteLine(body)

    body.data = departments
    return (body)
}

const deletePlant = async function (body) {
    let filters = body.options.filters

    plants = filterArray(plants, filters, true)
    // DELETE DEPARTMENTS
    for (let i = 0; i < plants.length; i++) {
        filters = []
        const filter = { op: 'eq', name: 'plant', value: plants[i].uid }
        filters.push(filter)
    }
    body.options.filters = filters
    deleteDepartment(body)

    body.data = plants
    return (body)
}

const deleteCompany = async function (body) {
    let filters = body.options.filters

    companies = filterArray(companies, filters, true)
    // DELETE DEPARTMENTS
    for (let i = 0; i < companies.length; i++) {
        filters = []
        const filter = { op: 'eq', name: 'company', value: companies[i].uid }
        filters.push(filter)
    }
    body.options.filters = filters
    deletePlant(body)

    body.data = companies
    return (body)
}



const setDevice = async function (body) {
    const device = body.options.device
    let old = null
    if (device) {
        const existing = devices.findIndex((item) => { return item.uid == device.uid })
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
        const existing = agents.findIndex((item) => { return item.uid == agent.uid })
        if (existing > -1) {
            old = agents[existing]
            agents[existing] = agent
        } else {
            agents.push(agent)
        }
    }

    return old
}

const setProcess = async function (body) {
    const process = body.options.process
    let old = null
    process.data.kastmodified = getLocalDate(new Date(Date.now()))
    if (process) {
        const existing = processes.findIndex((item) => { return item.uuid == process.uuid })
        if (existing > -1) {
            old = processes[existing]
            processes[existing] = process
        } else {
            processes.push(process)
        }
    }

    return old
}

const deleteDevice = async function (body) {
    const filters = body.options.filters

    devices = filterArray(devices, filters, true)
    body.data = devices
    return (body)
}

const deleteAgent = async function (body) {
    const filters = body.options.filters

    agents = filterArray(agents, filters, true)
    body.data = agents
    return (body)
}

const deleteProcess = async function (body) {
    const filters = body.options.filters

    processes = filterArray(processes, filters, true)
    body.data = processes
    return (body)
}

const getMaterialCols = async function (body) {
    body.data = materialCols
    return(body)
}

const getPersonnelCols = async function (body) {
    body.data = personnelCols
    return (body)
}

const getFinalAnalysisCols = async function (body) {
    body.data = finalAnalysisCols
    return (body)
}

const getMachineCols = async function (body) {
    body.data = machineCols
    return (body)
}

const getFinalYeldsCols = async function (body) {
    body.data = finalYeldsCols
    return (body)
}

const getFinalInfoprodCols = async function (body) {
    body.data = finalInfoprodCols
    return (body)
}

const getFinalLabelingCols = async function (body) {
    body.data = finalLabelingCols
    return (body)
}

const getFinalStorageCols = async function (body) {
    body.data = finalStorageCols
    return (body)
}

const getFinalClearverCols = async function (body) {
    body.data = finalClearverCols
    return (body)
}

const getFinalNotesCols = async function (body) {
    body.data = finalNotesCols
    return (body)
}

const ping = async function (body) {
    body.data = { host: body.options.hostname, isAlive: true }
    return(body) 
}

const getDeviceInfo = async function (body) {
    const infos = {
        service: 'UP2AgentRestService',
        description: 'UP2Agent Rest service endpoint',
        env: {
            VERSION: '1.1',
            CORSENABLE: 'true',
            HIDEBUG: 'true',
            SCDEBUG: 'true',
            WSDEBUG: 'false',
            MQTTDEBUG: 'false',
            WEBSOCK: 'true',
            BEACONTIMEOUT: '10000',
            BEACONENABLE: 'false',
            PORT: '3001'
        },
        auth: {
            name: 'credentials',
            options: {
                _credentials: 'credentials.json',
                defaultroot: null,
                defaultpassword: null
            }
        },
        log: {
            name: 'mqttlog',
            options: {
                channel: 'LOGGER',
                mqtts: true,
                clean: false,
                qos: 1,
                username: null,
                password: null,
                server: '127.0.0.1',
                port: 8883
            }
        },
        childrens: [
            { cname: 'scanner1', ctype: 'scanner', optype: 'fork' },
            { cname: 'hist1', ctype: 'hist', optype: 'fork' },
            { cname: 'mqtt', ctype: 'mqtt', optype: 'fork' }
        ]
    }

    body.data = infos
    return (body)
}

const setDockerEnv = async function (body) {
    docker = {}
    const keys = Object.keys(body.options.env)
    docker['env'] = {}
    for (let i = 0; i < keys.length; i++) {
        docker.env[keys[i]] = body.options.env[keys[i]]
    }
}

const dnsLookup = async function (body) {
    return body.options.hostname
}

const dockerCreate = async function (body) {
    return docker
}

const dockerInfo = async function (body) {
    const infos = {
        ID: 'B74L:44XG:GQKA:SKB4:ZUO6:XNB4:X7CR:TNPZ:GMJ5:2I3Q:657H:PAUY',
        Containers: 2,
        ContainersRunning: 2,
        ContainersPaused: 0,
        ContainersStopped: 0,
        Images: 2,
        Driver: 'overlay2',
        DriverStatus: [
            ['Backing Filesystem', 'extfs'],
            ['Supports d_type', 'true'],
            ['Native Overlay Diff', 'true']
        ],
        SystemStatus: null,
        Plugins: {
            Volume: ['local'],
            Network: ['bridge', 'host', 'macvlan', 'null', 'overlay'],
            Authorization: ['ciscoplugin'],
            Log: [
                'awslogs', 'fluentd',
                'gcplogs', 'gelf',
                'journald', 'json-file',
                'logentries', 'splunk',
                'syslog'
            ]
        },
        MemoryLimit: true,
        SwapLimit: true,
        KernelMemory: true,
        CpuCfsPeriod: true,
        CpuCfsQuota: true,
        CPUShares: true,
        CPUSet: true,
        IPv4Forwarding: true,
        BridgeNfIptables: true,
        BridgeNfIp6tables: true,
        Debug: false,
        NFd: 38,
        OomKillDisable: true,
        NGoroutines: 50,
        SystemTime: '2023-07-11T12:48:12.801784187+01:00',
        LoggingDriver: 'json-file',
        CgroupDriver: 'cgroupfs',
        NEventsListener: 0,
        KernelVersion: '5.4.147',
        OperatingSystem: 'Ubuntu',
        OSType: 'linux',
        OSVersion: '20.0',
        Architecture: 'x86_64',
        IndexServerAddress: 'https://index.docker.io/v1/',
        RegistryConfig: {
            AllowNondistributableArtifactsCIDRs: [],
            AllowNondistributableArtifactsHostnames: [],
            InsecureRegistryCIDRs: ['127.0.0.0/8'],
            IndexConfigs: { 'docker.io': [Object] },
            Mirrors: []
        },
        NCPU: 4,
        MemTotal: 8081371136,
        GenericResources: null,
        DockerRootDir: '/software/docker/1000000.1000000',
        HttpProxy: '',
        HttpsProxy: '',
        NoProxy: '',
        Name: 'ic3k',
        Labels: [],
        ExperimentalBuild: false,
        ServerVersion: '18.03.0',
        ClusterStore: '',
        ClusterAdvertise: '',
        Runtimes: { runc: { path: 'docker-runc' } },
        DefaultRuntime: 'runc',
        Swarm: {
            NodeID: '',
            NodeAddr: '',
            LocalNodeState: 'inactive',
            ControlAvailable: false,
            Error: '',
            RemoteManagers: null
        },
        LiveRestoreEnabled: false,
        Isolation: '',
        InitBinary: 'docker-init',
        ContainerdCommit: {
            ID: 'cfd04396dc68220d1cecbe686a6cc3aa5ce3667c.m',
            Expected: 'cfd04396dc68220d1cecbe686a6cc3aa5ce3667c'
        },
        RuncCommit: {
            ID: '751f18de2af90495e9c5665b95bfc7adf66ddd57-dirty',
            Expected: '4fc53a81fb7c994640722ac585fa9ca548971871'
        },
        InitCommit: { ID: 'N/A', Expected: '' },
        SecurityOptions: ['name=userns']
    }
    body.data = infos
    return (body)
}

const dockerListContainers = async function (body) {
    const containers = [
        {
            Id: "8dfafdbc3a40",
            Names:[],
            Image: "quesalid/up2agentdata:latest",
            ImageID: "d74508fb6632491cea586a1fd7d748dfc5274cd6fdfedee309ecdcbc2bf5cb82",
            Command: "echo 1",
            Created: 1367854155,
            State: "Exited",
            Status: "Exit 0",
            Ports:[],
            Labels:{},
            SizeRw: 12288,
            SizeRootFs: 0,
            HostConfig:{},
            NetworkSettings:{},
            Mounts:[]
        },
    ]
    body.data = containers
    return(body)
}

const dockerListImages = async function (body) {
    const images = [
        {
            Id: "sha256:e216a057b1cb1efc11f8a268f37ef62083e70b1b38323ba252e25ac88904a7e8",
            ParentId: "",
            RepoTags:[],
            RepoDigests:[],
            Created: 1474925151,
            Size: 103579269,
            VirtualSize: 103579269,
            SharedSize: 0,
            Labels: {},
            Containers: 2
        },
    ]
    body.data = images
    return (body)
}

const getDBArray = async function(treename) {
    let rcompany = []
    let rplants = []
    let rdepartments = []
    let rlines = []
    let rmachines = []
    let rcontrollers = []
    // Get company
    const cmp = companies.find((item) => (item.name == treename))
    if (cmp) {
        rcompany.push(cmp)
        const plts = plants.filter((item) => (item.company == cmp.uid))
        for (let i = 0; i < plts.length; i++) {
            const dpts = departments.filter((item) => (item.plant == plts[i].uid))
            for (let j = 0; j < dpts.length; j++) {
                const lns = lines.filter((item) => (item.department == dpts[j].uid))
                for (let k = 0; k < lns.length; k++) {
                    const mcns = machines.filter((item) => (item.line == lns[k].uid))
                    for (let h = 0; h < mcns.length; h++) {
                        const clts = controllers.filter((item) => (item.machine == mcns[h].uid))
                        for (let w = 0; w < clts.length; w++) {
                            rcontrollers.push(clts[w])
                        }
                        rmachines.push(mcns[h])
                    }
                    rlines.push(lns[k])
                }
                rdepartments.push(dpts[j])
            }
            rplants.push(plts[i])
        }
    }
    const result = { company: rcompany, plants: rplants, departments: rdepartments, lines: rlines, machines: rmachines, controllers: rcontrollers }
    return(result)
}

const setDBArray = async function (array) {
    const body = { options:{ } }
    const cmps = array.companies
    for (let i = 0; i < cmps.length; i++) {
        body.options.company = cmps[i]
        setCompany(body)
    }
    const plts = array.plants
    for (let i = 0; i < plts.length; i++) {
        body.options.plant = plts[i]
        setPlant(body)
    }
    const dpts = array.departments
    for (let i = 0; i < dpts.length; i++) {
        body.options.department = dpts[i]
        setDepartment(body)
    }
    const lns = array.lines
    for (let i = 0; i < lns.length; i++) {
        body.options.line = lns[i]
        setLine(body)
    }
    const mcns = array.machines
    for (let i = 0; i < mcns.length; i++) {
        body.options.machine = mcns[i]
        setMachine(body)
    }
    const cnts = array.controllers
    for (let i = 0; i < cnts.length; i++) {
        body.options.controller = cnts[i]
        setController(body)
    }
    return (array)
}

const deleteDBArray = async function (array) {
   
    let filters = []
    const body = { options: {filters:filters} }
    const cmps = array.companies
    filters= []
    for (let i = 0; i < cmps.length; i++) {
        const filter = { op: 'eq', name: 'uid', value: cmps[i].uid}
        filters.push(filter)
    }
    deleteCompany(body)
}

const mocks = {
    login,
    getMenuItems,
    getLogs,
    setLog,
    getDevices,
    setDevice,
    getAgents,
    setAgent,
    getProcesses,
    setProcess,
    deleteDevice,
    deleteProcess,
    deleteAgent,
    getCompanies,
    setCompany,
    deleteCompany,
    getPlants,
    setPlant,
    deletePlant,
    getDepartments,
    setDepartment,
    deleteDepartment,
    getLines,
    setLine,
    deleteLine,
    getMachines,
    setMachine,
    deleteMachine,
    getControllers,
    setController,
    deleteController,
    getMaterialCols,
    getPersonnelCols,
    getMachineCols,
    getFinalAnalysisCols,
    getFinalYeldsCols,
    getFinalInfoprodCols,
    getFinalLabelingCols,
    getFinalStorageCols,
    getFinalClearverCols,
    getFinalNotesCols,
    ping,
    getDeviceInfo,
    setDockerEnv,
    dockerCreate,
    dockerListContainers,
    dockerListImages,
    dnsLookup,
    dockerInfo,
    getDBArray,
    setDBArray,
    deleteDBArray
}

export default mocks