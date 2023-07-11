import mocks from '../script/mocks.js'
import { token } from "../ustore.js"

const baseUrl = 'https://' + window.location.hostname + ':9001'

const customHeaders = {
    "Content-Type": "application/json",
}

export const  sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getCHeader = () => {
    let tkn
    const unsubscribe = token.subscribe(value => {
        tkn = value;
    });
    const cHeaders = {
        "Content-Type": "application/json",
        "Authorization": "bearer "+tkn,
    }
    unsubscribe()
    return cHeaders
}

const callFetchPost = async function (url, data, cheaders = null) {
    let headers = {}
    if (cheaders == null)
        headers = customHeaders
    else
        headers = cheaders
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
            insecure: true,
        }).then((response) => {
            response.json()
                .then((result) => {
                    if (result.name == 'TokenExpiredError') {
                        // TOKEN EXPIRED MANAGEMDNT
                        alert('TOKEN EXPIRED - RELOGIN')
                        reject('TokenExpiredError')
                    }
                    if (response.status < 400)
                        resolve(result)
                    else
                        reject(result)
                })
                .catch((error) => {
                    console.log("FETCH ERROR1 URL", url)
                    console.log("FETCH ERROR1", error)
                    reject(error)
                })
        })
            .catch((error) => {
                reject(error)
            })
    })
}

const callFetchGet = async function (url, cheaders = null) {
    let headers = {}
    if (cheaders == null)
        headers = customHeaders
    else
        headers = cheaders
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET",
            headers: headers,
            insecure: true,
        }).then((response) => {
            response.json()
                .then((result) => {
                    if (response.status < 400)
                        resolve(result)
                    else
                        reject(result)
                })
                .catch((error) => {
                    console.log("FETCH ERROR1", error)
                    reject(error)
                })

        })
            .catch((error) => {
                reject(error)
            })
    })
}

// ********************************************************************************************
// TEST API CALLS
// ********************************************************************************************

/**
 * Logs in
 * @param {any} userid
 * @param {any} password
 * @param {any} mock use mock flag (default false)
 */
export const login = async function (userid, password, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "login",
            options: {
                username: userid,
                password: password
            }
        }
        if (!mock) {
            callFetchPost(url, body)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.login(body))
        }
    })
}
/**
 * Get master records from db
 * @param {any} options
 * @param {any} mock use mock flag (default false)
 */
/*export const getMasters = async function (options, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getMasters",
            options: options
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getMasters(body))
        }
    })
}*/
/**
 * Return option items for graph context menu
 * @param {any} menu context menu type
 * @param {any} mock use mock flag (default false)
 */
export const getMenuItems = async function (menu, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getMenuItems",
            options: {
                menu:menu
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getMenuItems(body))
        }
    })
}

/**
 * Return application logs
 * @param {any} mock use mock flag (default false)
 */
export const getLogs = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getLogs",
            options: {
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getLogs(body))
        }
    })
}

/**
 * Set applicatiion log
 * @param {any} log log to write
 * @param {any} mock use mock flag (default false)
 */
export const setLog = async function (log, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setLog",
            options: {
                log: log
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.setLog(body))
        }
    })
}

/**
 * Get devices
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getDevices = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getDevices",
            options: {
                filters: filters
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getDevices(body))
        }
    })
}

/**
 * Set Device
 * @param {any} device device to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setDevice = async function (device, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setDevices",
            options: {
                device: device
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.setDevices(body))
        }
    })
}

/**
 * Get Agents
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getAgents = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getDevices",
            options: {
                filters: filters
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getDevices(body))
        }
    })
}

/**
 * Set Agent
 * @param {any} agent agent to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setAgent = async function (agent, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setDevices",
            options: {
                agent: agent
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.setDevices(body))
        }
    })
}

/**
 * Get Processes
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getProcesses = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getProcesses",
            options: {
                filters: filters
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getProcesses(body))
        }
    })
}

/**
 * Set Process
 * @param {any} process process to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setProcess = async function (process, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setProcess",
            options: {
                process: process
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.setProcess(body))
        }
    })
}

/**
 * Delete Device
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deleteDevice = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteDevice",
            options: {
                filters: filters
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.deleteDevice(body))
        }
    })
}

/**
 * Delete Agent
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deleteAgent = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteAgent",
            options: {
                filters: filters
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.deleteAgent(body))
        }
    })
}

/**
 * Delete Process
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deleteProcess = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteProcess",
            options: {
                filters: filters
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.deleteProcess(body))
        }
    })
}

/**
 * Get Material Columns
 * @param {any} mock use mock flag (default false)
 */
export const getMaterialCols = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getMaterialCols",
            options: {
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getMaterialCols(body))
        }
    })
}

/**
 * Get Personnel Columns
 * @param {any} mock use mock flag (default false)
 */
export const getPersonnelCols = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getPersonnelCols",
            options: {
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getPersonnelCols(body))
        }
    })
}

/**
 * Get Machine Columns
 * @param {any} mock use mock flag (default false)
 */
export const getMachineCols = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getMachineCols",
            options: {
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getMachineCols(body))
        }
    })
}

/**
 * Get Final Sample Analysis Columns
 * @param {any} mock use mock flag (default false)
 */
export const getFinalAnalysisCols = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getFinalAnalysisCols",
            options: {
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getFinalAnalysisCols(body))
        }
    })
}

/**
 * Get Final Yelds Columns
 * @param {any} mock use mock flag (default false)
 */
export const getFinalYeldsCols = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getFinalYeldsCols",
            options: {
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getFinalYeldsCols(body))
        }
    })
}

/**
 * Get Final Product Info Columns
 * @param {any} mock use mock flag (default false)
 */
export const getFinalInfoprodCols = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getFinalInfoprodCols",
            options: {
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getFinalInfoprodCols(body))
        }
    })
}

/**
 * Get Final Labeling Columns
 * @param {any} mock use mock flag (default false)
 */
export const getFinalLabelingCols = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getFinalLabelingCols",
            options: {
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getFinalLabelingCols(body))
        }
    })
}

/**
 * Get Final Storage Columns
 * @param {any} mock use mock flag (default false)
 */
export const getFinalStorageCols = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getFinalStorageCols",
            options: {
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getFinalStorageCols(body))
        }
    })
}

/**
 * Get Final Clearing Verification Columns
 * @param {any} mock use mock flag (default false)
 */
export const getFinalClearverCols = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getFinalClearverCols",
            options: {
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getFinalClearverCols(body))
        }
    })
}

/**
 * Get Final Notes  Columns
 * @param {any} mock use mock flag (default false)
 */
export const getFinalNotesCols = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getFinalNotesCols",
            options: {
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getFinalNotesCols(body))
        }
    })
}

/**
 * Ping host
 * @param {any} hostname hostname or IP address
 * @param {any} cfg ping configuration (default {timeout: 5, min_replay: 2})
 * @param {any} mock use mock flag (default false)
 */
export const ping = async function (hostname, cfg = { timeout: 5, min_replay: 2 },mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "ping",
            options: {
                hostname: hostname,
                options:cfg
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.ping(body))
        }
    })
}

/**
 * Get Device Info
 * @param {any} host hostname or IP address
 * @param {any} port port
 * @param {any} prot protocol ('http','https')
 * @param {any} mock use mock flag (default false)
 */
export const getDeviceInfo = async function (host, port,prot, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getDeviceInfo",
            options: {
                host: host,
                port: port,
                prot:prot
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.getDeviceInfo(body))
        }
    })
}

/**
 * Get Docker Info
 * @param {any} durl docker daemon url
 * @param {any} ca docker daemon ca.pem
 * @param {any} cert docker daemon crt.pem
 * @param {any} key docker daemon key.pem
 * @param {any} version docker daemon version
 * @param {any} mock use mock flag (default false)
 */
export const dockerInfo = async function (durl,ca,cert,key,version,mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerInfo",
            options: {
                url: durl,
                ca: ca,
                cert: cert,
                key: key,
                version: version
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.dockerInfo(body))
        }
    })
}




