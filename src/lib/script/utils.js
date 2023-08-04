// https://stackoverflow.com/questions/40497262/how-to-version-control-an-object
import { v4 as uuidv4 } from 'uuid';
import Papa from 'papaparse'


export function VersionControlled(obj, changeLog = []) {
    var targets = [], version = 0, savedLength,
        hash = new Map([[obj, []]]),
        handler = {
            get: function (target, property) {
                var x = target[property];
                if (Object(x) !== x) return x;
                hash.set(x, hash.get(target).concat(property));
                return new Proxy(x, handler);
            },
            set: update,
            deleteProperty: update
        };

    function gotoVersion(newVersion) {
        newVersion = Math.max(0, Math.min(changeLog.length, newVersion));
        var chg, target, path, property,
            val = newVersion > version ? 'newValue' : 'oldValue';
        while (version !== newVersion) {
            if (version > newVersion) version--;
            chg = changeLog[version];
            path = chg.path.slice();
            property = path.pop();
            target = targets[version] ||
                (targets[version] = path.reduce((o, p) => o[p], obj));
            if (chg.hasOwnProperty(val)) {
                target[property] = chg[val];
            } else {
                delete target[property];
            }
            if (version < newVersion) version++;
        }
        return true;
    }

    function gotoLastVersion() {
        return gotoVersion(changeLog.length);
    }

    function update(target, property, value) {
        gotoLastVersion(); // only last version can be modified
        var change = { path: hash.get(target).concat([property]) };
        if (arguments.length > 2) change.newValue = value;
        // Some care concerning the length property of arrays:
        if (Array.isArray(target) && +property >= target.length) {
            savedLength = target.length;
        }
        if (property in target) {
            if (property === 'length' && savedLength !== undefined) {
                change.oldValue = savedLength;
                savedLength = undefined;
            } else {
                change.oldValue = target[property];
            }
        }
        changeLog.push(change);
        targets.push(target);
        return gotoLastVersion();
    }

    this.data = new Proxy(obj, handler);
    this.getVersion = _ => version;
    this.gotoVersion = gotoVersion;
    this.gotoLastVersion = gotoLastVersion;
    this.getChangeLog = _ => changeLog;
    // apply change log
    gotoLastVersion();
}

export function getLocalDate(t){
    const z = t.getTimezoneOffset() * 60 * 1000
    let tShift = t - z
    const tLocal = new Date(tShift)
    let iso = tLocal.toISOString()
    iso = iso.split(".")[0]

    return(iso)

}

export function findTreePath(tree, target) {
    // The value of this node
    let currentValue = tree.label;
    if (currentValue == target) return [target];
    for (let t of Object.entries(tree)) {
        // Search children
        if (t[0] == "children" && t[1]) {
            for (let child of t[1]) {
                let found = findTreePath(child, target);
                if (found) {
                    return [currentValue].concat(found);
                }
            }
        }
    }
    // Not found in this branch
    return null;
}

const deviceTypes = [
    { value: 'VM', img: '/VMWARE.svg' },
    { value: 'HW', img: '/HW.svg' },
]
const deviceOs = [
    { value: 'UBUNTU', img: '/UBUNTU.svg' },
    { value: 'RASPI', img: '/RASPBERRYPI.svg' },
    { value: 'MICROSOFT', img: '/WINDOWS.svg' },
]

export function getImage(type, value) {
    let image = ''
    let found
    switch (type) {
        case 'devicetype':
            found = deviceTypes.find((item) => (item.value == value ))
            if (found)
                image = found.img
            break
        case 'deviceos':
            found = deviceOs.find((item) => (item.value == value))
            if (found)
                image = found.img
            break
        default:
            break
    }
    return image
}

export function getImageArray(type) {
    let array = []
    switch (type) {
        case 'devicetype':
            array = deviceTypes
            break
        case 'deviceos':
            array = deviceOs
            break
        default:
            break
    }
    return array
}

const countries = [
                    { value:"AF",name:"Afghanistan"},
                    { value:"AX",name:"Aland Islands"},
                    { value:"AL",name:"Albania"},
                    { value:"DZ",name:"Algeria"},
                    { value:"AS",name:"American Samoa"},
                    { value:"AD",name:"Andorra"},
                    { value:"AO",name:"Angola"},
                    { value:"AI",name:"Anguilla"},
                    { value:"AQ",name:"Antarctica"},
                    { value:"AG",name:"Antigua and Barbuda"},
                    { value:"AR",name:"Argentina"},
                    { value:"AM",name:"Armenia"},
                    { value:"AW",name:"Aruba"},
                    { value:"AU",name:"Australia"},
                    { value:"AT",name:"Austria"},
                    { value:"AZ",name:"Azerbaijan"},
                    { value:"BS",name:"Bahamas"},
                    { value:"BH",name:"Bahrain"},
                    { value:"BD",name:"Bangladesh"},
                    { value:"BB",name:"Barbados"},
                    { value:"BY",name:"Belarus"},
                    { value:"BE",name:"Belgium"},
                    { value:"BZ",name:"Belize"},
                    { value:"BJ",name:"Benin"},
                    { value:"BM",name:"Bermuda"},
                    { value:"BT",name:"Bhutan"},
                    { value:"BO",name:"Bolivia"},
                    { value:"BQ",name:"Bonaire, Sint Eustatius and Saba"},
                    { value:"BA",name:"Bosnia and Herzegovina"},
                    { value:"BW",name:"Botswana"},
                    { value:"BV",name:"Bouvet Island"},
                    { value:"BR",name:"Brazil"},
                    { value:"IO",name:"British Indian Ocean Territory"},
                    { value:"BN",name:"Brunei Darussalam"},
                    { value:"BG",name:"Bulgaria"},
                    { value:"BF",name:"Burkina Faso"},
                    { value:"BI",name:"Burundi"},
                    { value:"KH",name:"Cambodia"},
                    { value:"CM",name:"Cameroon"},
                    { value:"CA",name:"Canada"},
                    { value:"CV",name:"Cape Verde"},
                    { value:"KY",name:"Cayman Islands"},
                    { value:"CF",name:"Central African Republic"},
                    { value:"TD",name:"Chad"},
                    { value:"CL",name:"Chile"},
                    { value:"CN",name:"China"},
                    { value:"CX",name:"Christmas Island"},
                    { value:"CC",name:"Cocos (Keeling) Islands"},
                    { value:"CO",name:"Colombia"},
                    { value:"KM",name:"Comoros"},
                    { value:"CG",name:"Congo"},
                    { value:"CD",name:"Congo, Democratic Republic of the Congo"},
                    { value:"CK",name:"Cook Islands"},
                    { value:"CR",name:"Costa Rica"},
                    { value:"CI",name:"Cote D'Ivoire"},
                    { value:"HR",name:"Croatia"},
                    { value:"CU",name:"Cuba"},
                    { value:"CW",name:"Curacao"},
                    { value:"CY",name:"Cyprus"},
                    { value:"CZ",name:"Czech Republic"},
                    { value:"DK",name:"Denmark"},
                    { value:"DJ",name:"Djibouti"},
                    { value:"DM",name:"Dominica"},
                    { value:"DO",name:"Dominican Republic"},
                    { value:"EC",name:"Ecuador"},
                    { value:"EG",name:"Egypt"},
                    { value:"SV",name:"El Salvador"},
                    { value:"GQ",name:"Equatorial Guinea"},
                    { value:"ER",name:"Eritrea"},
                    { value:"EE",name:"Estonia"},
                    { value:"ET",name:"Ethiopia"},
                    { value:"FK",name:"Falkland Islands (Malvinas)"},
                    { value:"FO",name:"Faroe Islands"},
                    { value:"FJ",name:"Fiji"},
                    { value:"FI",name:"Finland"},
                    { value:"FR",name:"France"},
                    { value:"GF",name:"French Guiana"},
                    { value:"PF",name:"French Polynesia"},
                    { value:"TF",name:"French Southern Territories"},
                    { value:"GA",name:"Gabon"},
                    { value:"GM",name:"Gambia"},
                    { value:"GE",name:"Georgia"},
                    { value:"DE",name:"Germany"},
                    { value:"GH",name:"Ghana"},
                    { value:"GI",name:"Gibraltar"},
                    { value:"GR",name:"Greece"},
                    { value:"GL",name:"Greenland"},
                    { value:"GD",name:"Grenada"},
                    { value:"GP",name:"Guadeloupe"},
                    { value:"GU",name:"Guam"},
                    { value:"GT",name:"Guatemala"},
                    { value:"GG",name:"Guernsey"},
                    { value:"GN",name:"Guinea"},
                    { value:"GW",name:"Guinea-Bissau"},
                    { value:"GY",name:"Guyana"},
                    { value:"HT",name:"Haiti"},
                    { value:"HM",name:"Heard Island and Mcdonald Islands"},
                    { value:"VA",name:"Holy See (Vatican City State)"},
                    { value:"HN",name:"Honduras"},
                    { value:"HK",name:"Hong Kong"},
                    { value:"HU",name:"Hungary"},
                    { value:"IS",name:"Iceland"},
                    { value:"IN",name:"India"},
                    { value:"ID",name:"Indonesia"},
                    { value:"IR",name:"Iran, Islamic Republic of"},
                    { value:"IQ",name:"Iraq"},
                    { value:"IE",name:"Ireland"},
                    { value:"IM",name:"Isle of Man"},
                    { value:"IL",name:"Israel"},
                    { value:"IT",name:"Italy"},
                    { value:"JM",name:"Jamaica"},
                    { value:"JP",name:"Japan"},
                    { value:"JE",name:"Jersey"},
                    { value:"JO",name:"Jordan"},
                    { value:"KZ",name:"Kazakhstan"},
                    { value:"KE",name:"Kenya"},
                    { value:"KI",name:"Kiribati"},
                    { value:"KP",name:"Korea, Democratic People's Republic of"},
                    { value:"KR",name:"Korea, Republic of"},
                    { value:"XK",name:"Kosovo"},
                    { value:"KW",name:"Kuwait"},
                    { value:"KG",name:"Kyrgyzstan"},
                    { value:"LA",name:"Lao People's Democratic Republic"},
                    { value:"LV",name:"Latvia"},
                    { value:"LB",name:"Lebanon"},
                    { value:"LS",name:"Lesotho"},
                    { value:"LR",name:"Liberia"},
                    { value:"LY",name:"Libyan Arab Jamahiriya"},
                    { value:"LI",name:"Liechtenstein"},
                    { value:"LT",name:"Lithuania"},
                    { value:"LU",name:"Luxembourg"},
                    { value:"MO",name:"Macao"},
                    { value:"MK",name:"Macedonia, the Former Yugoslav Republic of"},
                    { value:"MG",name:"Madagascar"},
                    { value:"MW",name:"Malawi"},
                    { value:"MY",name:"Malaysia"},
                    { value:"MV",name:"Maldives"},
                    { value:"ML",name:"Mali"},
                    { value:"MT",name:"Malta"},
                    { value:"MH",name:"Marshall Islands"},
                    { value:"MQ",name:"Martinique"},
                    { value:"MR",name:"Mauritania"},
                    { value:"MU",name:"Mauritius"},
                    { value:"YT",name:"Mayotte"},
                    { value:"MX",name:"Mexico"},
                    { value:"FM",name:"Micronesia, Federated States of"},
                    { value:"MD",name:"Moldova, Republic of"},
                    { value:"MC",name:"Monaco"},
                    { value:"MN",name:"Mongolia"},
                    { value:"ME",name:"Montenegro"},
                    { value:"MS",name:"Montserrat"},
                    { value:"MA",name:"Morocco"},
                    { value:"MZ",name:"Mozambique"},
                    { value:"MM",name:"Myanmar"},
                    { value:"NA",name:"Namibia"},
                    { value:"NR",name:"Nauru"},
                    { value:"NP",name:"Nepal"},
                    { value:"NL",name:"Netherlands"},
                    { value:"AN",name:"Netherlands Antilles"},
                    { value:"NC",name:"New Caledonia"},
                    { value:"NZ",name:"New Zealand"},
                    { value:"NI",name:"Nicaragua"},
                    { value:"NE",name:"Niger"},
                    { value:"NG",name:"Nigeria"},
                    { value:"NU",name:"Niue"},
                    { value:"NF",name:"Norfolk Island"},
                    { value:"MP",name:"Northern Mariana Islands"},
                    { value:"NO",name:"Norway"},
                    { value:"OM",name:"Oman"},
                    { value:"PK",name:"Pakistan"},
                    { value:"PW",name:"Palau"},
                    { value:"PS",name:"Palestinian Territory, Occupied"},
                    { value:"PA",name:"Panama"},
                    { value:"PG",name:"Papua New Guinea"},
                    { value:"PY",name:"Paraguay"},
                    { value:"PE",name:"Peru"},
                    { value:"PH",name:"Philippines"},
                    { value:"PN",name:"Pitcairn"},
                    { value:"PL",name:"Poland"},
                    { value:"PT",name:"Portugal"},
                    { value:"PR",name:"Puerto Rico"},
                    { value:"QA",name:"Qatar"},
                    { value:"RE",name:"Reunion"},
                    { value:"RO",name:"Romania"},
                    { value:"RU",name:"Russian Federation"},
                    { value:"RW",name:"Rwanda"},
                    { value:"BL",name:"Saint Barthelemy"},
                    { value:"SH",name:"Saint Helena"},
                    { value:"KN",name:"Saint Kitts and Nevis"},
                    { value:"LC",name:"Saint Lucia"},
                    { value:"MF",name:"Saint Martin"},
                    { value:"PM",name:"Saint Pierre and Miquelon"},
                    { value:"VC",name:"Saint Vincent and the Grenadines"},
                    { value:"WS",name:"Samoa"},
                    { value:"SM",name:"San Marino"},
                    { value:"ST",name:"Sao Tome and Principe"},
                    { value:"SA",name:"Saudi Arabia"},
                    { value:"SN",name:"Senegal"},
                    { value:"RS",name:"Serbia"},
                    { value:"CS",name:"Serbia and Montenegro"},
                    { value:"SC",name:"Seychelles"},
                    { value:"SL",name:"Sierra Leone"},
                    { value:"SG",name:"Singapore"},
                    { value:"SX",name:"Sint Maarten"},
                    { value:"SK",name:"Slovakia"},
                    { value:"SI",name:"Slovenia"},
                    { value:"SB",name:"Solomon Islands"},
                    { value:"SO",name:"Somalia"},
                    { value:"ZA",name:"South Africa"},
                    { value:"GS",name:"South Georgia and the South Sandwich Islands"},
                    { value:"SS",name:"South Sudan"},
                    { value:"ES",name:"Spain"},
                    { value:"LK",name:"Sri Lanka"},
                    { value:"SD",name:"Sudan"},
                    { value:"SR",name:"Suriname"},
                    { value:"SJ",name:"Svalbard and Jan Mayen"},
                    { value:"SZ",name:"Swaziland"},
                    { value:"SE",name:"Sweden"},
                    { value:"CH",name:"Switzerland"},
                    { value:"SY",name:"Syrian Arab Republic"},
                    { value:"TW",name:"Taiwan, Province of China"},
                    { value:"TJ",name:"Tajikistan"},
                    { value:"TZ",name:"Tanzania, United Republic of"},
                    { value:"TH",name:"Thailand"},
                    { value:"TL",name:"Timor-Leste"},
                    { value:"TG",name:"Togo"},
                    { value:"TK",name:"Tokelau"},
                    { value:"TO",name:"Tonga"},
                    { value:"TT",name:"Trinidad and Tobago"},
                    { value:"TN",name:"Tunisia"},
                    { value:"TR",name:"Turkey"},
                    { value:"TM",name:"Turkmenistan"},
                    { value:"TC",name:"Turks and Caicos Islands"},
                    { value:"TV",name:"Tuvalu"},
                    { value:"UG",name:"Uganda"},
                    { value:"UA",name:"Ukraine"},
                    { value:"AE",name:"United Arab Emirates"},
                    { value:"GB",name:"United Kingdom"},
                    { value:"US",name:"United States"},
                    { value:"UM",name:"United States Minor Outlying Islands"},
                    { value:"UY",name:"Uruguay"},
                    { value:"UZ",name:"Uzbekistan"},
                    { value:"VU",name:"Vanuatu"},
                    { value:"VE",name:"Venezuela"},
                    { value:"VN",name:"Viet Nam"},
                    { value:"VG",name:"Virgin Islands, British"},
                    { value:"VI",name:"Virgin Islands, U.s."},
                    { value:"WF",name:"Wallis and Futuna"},
                    { value:"EH",name:"Western Sahara"},
                    { value:"YE",name:"Yemen"},
                    { value:"ZM",name:"Zambia"},
                    { value:"ZW",name:"Zimbabwe"},
]

export function getCountries() {
    return countries
}

const agentTypes = [
    { value: "SCANNER", name: "SCANNER" },
    { value: "HISTORIAN", name: "HISTORIAN" },
    { value: "RECORDER", name: "RECORDER" },
]

export function getAgentTypes() {
    return agentTypes
}

const sourcedrivers = [
    {
        value: "s7", name: "Siemens s7", options: [
            { uid: 0, name: 'rack', type: 'number', default: 0 },
            { uid: 1, name: 'slot', type: 'number', default: 0 },
            { uid: 2, name: 'maxmv', type: 'number', default: 15 },
            { uid: 3, name: 'maxread', type: 'number', default: 15 }
        ]
    },
    { value: "modbus", name: "Modicon Modbus", options:[] },
    { value: "ip", name: "Rockwell Eth/Ip", options:[] },
    {
        value: "mqtt", name: "Mqtt", options: [
            { uid: 0, name: 'channel', type: 'text', default: '' },
            { uid: 1, name: 'mqtts', type: 'checkbox', default: true },
            { uid: 2, name: 'clean', type: 'checkbox', default: false },
            { uid: 3, name: 'qos', type: 'number', default: 1 }
        ]
    },
]

const destinationdrivers = [
    {
        value: "pirest", name: "OSI Pi REST", options: [
            { uid: 0, name: 'dbosi', type: 'text', default: '' },
            { uid: 1, name: 'machine', type: 'text', default: '' },
            { uid: 2, name: 'machineprefix', type: 'text', default: '' },
            { uid: 2, name: 'cbufsize', type: 'number', default: 1000 }
        ]
    },
    { value: "craterest", name: "CRATEDB REST", options:[] },
    {
        value: "mqtt", name: "Mqtt", options: [
            { uid: 0, name: 'channel', type: 'text', default: '' },
            { uid: 1, name: 'mqtts', type: 'checkbox', default: true },
            { uid: 2, name: 'clean', type: 'checkbox', default: false },
            { uid: 3, name: 'qos', type: 'number', default: 1 }
        ] },
]

export function getSourceDrivers() {
    return sourcedrivers
}

export function getDestinationDrivers() {
    return destinationdrivers
}

export function makePointsUid(driver,agent, device, controller, machine, db, num = 30) {
    const points = []
    for (let i = 0; i<num; i++) {
        const point = { uid: uuidv4(), tag: '', description: '', um: '', dtype: '', delta: false, bit: 0, hlim: 0.0, llim: 0.0, area: '', ack:false,numarea: 0, address: 0, amount: 1, atype: '', type:'',agent: agent, device: device, controller: controller, machine: machine, db: db }
        const [tag, desc, um, atype, bit, dtype] = randomTDUABD(5)
        point.tag = tag
        point.description = desc
        point.um = um
        point.atype = atype
        point.dtype = dtype
        point.bit = Number(bit)
        point.address = Math.floor(Math.random() * 40000)
        point.type = getPointType(tag)
        const [hlim, llim] = getPointLims(point.type)
        point.hlim = hlim
        point.llim = llim
        switch (driver) {
            case 's7':
                point.area = 'DB'
                point.numarea = Math.floor(Math.random() * 8)
                break;
            case 'modbus':
                if (point.atype == 'DIGITAL')
                    point.area = 'COIL'
                else
                    point.area = 'INPUT'
                point.numarea = 0
                break;
            case 'ip':
                point.area = 'NA'
                point.numarea = 0
                break
        }
        points.push(point)
    }
    return points
}

function randomTDUABD(length) {
    const pre = [
        'TT-',
        'PP-',
        'HH-',
        'RPM-',
        'AA-',
        'VV-',
        'NUM-',
        "FL-",
        "AL-T-",
        "AL-P-",
        "AL-H-",
        "AL-RPM-",
        "AL-A-",
        "AL-V-",
        "AL-NUM-",
        "AL-FL-",
        "EV-T-",
        "EV-P-",
        "EV-H-",
        "EV-RPM-",
        "EV-A-",
        "EV-V-",
        "EV-NUM-",
        "EV-FL-"
    ]
    const desc = [
        "Temperature measure",
        "Pressure measure",
        "Humidity measure",
        "Rotational Speed measure",
        "Current measure",
        "Voltage measure",
        "Particle num measure",
        "Flow measure",
        "Temperature alarm",
        "Pressure alarm",
        "Humidity alarm",
        "Rotational Speed alarm",
        "Current alarm",
        "Voltage alarm",
        "Particle num alarm",
        "Flow alarm",
        "Temperature event",
        "Pressure event",
        "Humidity event",
        "Rotational Speed event",
        "Current event",
        "Voltage event",
        "Particle num event",
        "Flow event"
    ]
    const um = [
        'DEGC',
        'PSIA',
        "%",
        "RPM",
        "A",
        "V",
        "#/m3",
        "m3/sec",
        '',
        '',
        "",
        "",
        "",
        "",
        "",
        "",
        '',
        '',
        "",
        "",
        "",
        "",
        "",
        ""
    ]
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charactersLength = characters.length;
    let counter = 0;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const index = Math.floor(Math.random() * pre.length)
    let bit = String(Math.floor(Math.random() * 16))
    let atype = 'ANALOG'
    let dtype = 'bool'
    if (index > 7) {
        atype = 'DIGITAL'
    } else {
        bit = "0"
        dtype = 'real'
    }
    const tag = pre[index] + result

    return[tag,desc[index],um[index],atype,bit,dtype]
}

function getPointType(tag) {
    let ret = ''
    const pre = tag.substring(0, 3)
    switch (pre) {
        case 'TT-':
            ret = 'TEMPERATURE'
            break;
        case 'PP-':
            ret = 'PRESSURE'
            break;
        case 'HH-':
            ret = 'HUMIDITY'
            break;
        case 'RPM':
            ret = 'SPEED'
            break;
        case 'AA-':
            ret = 'CURRENT'
            break;
        case 'VV-':
            ret = 'VOLTAGE'
            break;
        case 'NUM':
            ret = 'NUMBER'
            break;
        case 'FL-':
            ret = 'FLOW'
            break;
        case 'AL-':
            ret = 'ALARM'
            break;
        case 'EV-':
            ret = 'EVENT'
            break;
    }
    return(ret)
}

function getPointLims(type) {
    let hlim = 0.0
    let llim = 0.0
    switch (type) {
        case 'TEMPERATURE':
            llim = -10.0
            hlim = 200.0
            break;
        case 'PRESSURE':
            hlim = 3.0
            break;
        case 'HUMIDITY':
            hlim = 100.0
            break;
        case 'SPEED':
            hlim = 5000.0
            break;
        case 'CURRENT':
            hlim = 50.0
            break;
        case 'VOLTAGE':
            hlim = 340.0
            break;
        case 'NUMBER':
            hlim = 10
            break;
        case 'FLOW':
            hlim = 2.0
            break;
    }
    return[hlim,llim]
}

export function uploadFile(filestring,filename) {
    try {
        let textFileUrl = null;
        let fileData = new Blob([filestring], { type: 'text/plain' });
        if (textFileUrl !== null) {
            window.URL.revokeObjectURL(textFileUrl);
        }
        textFileUrl = window.URL.createObjectURL(fileData);
        var a = document.createElement("a");
        a.href = textFileUrl
        a.download = filename;
        a.click();
    } catch (error) {
        console.log(error)
    }
}

export function downloadCSV(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            worker: true, // Don't bog down the main thread if its a big file
            header: true,
            complete: function (results, file) {
                resolve(results.data)
            }
        });
    })
}


export function dragElement(elmnt,elemntheader) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elemntheader) {
        // if present, the header is where you move the DIV from:
        elemntheader.onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

export function generateTimeSeries(point, from, to, max = 800) {
    const oscillation = 0.1
    const timeseries = []
    const timestamps = generateTimestamp(from,to,max)
    switch (point.atype) {
        case 'ANALOG':
            for (let i = 0; i < timestamps.length; i++) {
                const pointvalue = { tag: point.tag, value: 0, timestamp: timestamps[i] }
                const midpoint = (point.hlim - point.llim) / 2
                pointvalue.value = midpoint * (1 + oscillation*Math.random())
                timeseries.push(pointvalue)
            }
            break;
        case 'DIGITAL':
            for (let i = 0; i < timestamps.length; i++) {
                const pointvalue = { tag: point.tag, value: 0, timestamp: timestamps[i] }
                const rand = Math.floor(Math.random() * 400)
                if (rand < 399)
                    pointvalue.value = 0
                else
                    pointvalue.value = 1
                timeseries.push(pointvalue)
            }
            break;
    }
    return (timeseries)
}

function generateTimestamp(from, to, max = 800) {
    let start
    let end
    const timestamps = []
    if(to)
        end = new Date(to).getTime()
    else
        end = new Date(Date.now()).getTime()
    if (from)
        start = new Date(from).getTime()
    else
        start = end - max * 10000
    let numticks = (end - start) / 10000
    if (numticks > max) {
        // ADJUST NUMTICKS
        //end = start + max * 10000
        numticks = max
    }
    for (let i = 0; i < numticks; i++) {
        const timestamp = start + i * 10000
        timestamps.push(timestamp)
    }
    
    return(timestamps)
}

/*
// sample data
var obj = { list: [1, { p: 'hello' }, 3] };

// Get versioning object for it
var vc = new VersionControlled(obj);
obj = vc.data; // we don't need the original anymore, this one looks the same

// Demo of actions:
console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}. Change text:`);
obj.list[1].p = 'bye';
console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}. Bookmark & add property:`);
var bookmark = vc.getVersion();
obj.list[1].q = ['added'];
console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}. Push on list, then shift:`);
obj.list.push(4); // changes both length and index '4' property => 2 version increments
obj.list.shift(); // several changes and a deletion
console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}. Go to bookmark:`);
vc.gotoVersion(bookmark);

console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}. Go to last version:`);
vc.gotoLastVersion();
console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}. Get change log:`);
var changeLog = vc.getChangeLog();
for (var chg of changeLog) {
    console.log(JSON.stringify(chg));
}

console.log('Restart from scratch, and apply the change log:');
obj = { list: [1, { p: 'hello' }, 3] };
vc = new VersionControlled(obj, changeLog);
obj = vc.data;
console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}`);
*/