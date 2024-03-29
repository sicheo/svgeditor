import mocks from '../script/mocks.js'
import { token } from "../ustore.js"
import graphutils from '../script/graphutils'

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
            command: "setDevice",
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
            resolve(mocks.setDevice(body))
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
            resolve(mocks.getAgents(body))
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
            resolve(mocks.setAgent(body))
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
 * Get Agent Status
 * @param {any} agent 
 * @param {any} device
 * @param {any} mock use mock flag (default false)
 */
export const getAgentStatus = async function (agent, device, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getAgentStatus",
            options: {
                agent: agent,
                device: device,
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
            resolve(mocks.getAgentStatus(body))
        }
    })
}

/**
 * Get Docker Info
 * 
 * @param {any} durl docker daemon url
 * @param {any} ca docker daemon ca.pem
 * @param {any} cert docker daemon crt.pem
 * @param {any} key docker daemon key.pem
 * @param {any} version docker daemon version
 * @param {any} mock use mock flag (default false)
 */
export const dockerInfo = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerInfo",
            options: {
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

/**
 * Set docker Environment
 * 
 * @param {any} env doker env variable to set
 * @param {any} mock use mock flag (default false)
 */
export const setDockerEnv = async function (env, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setDockerEnv",
            options: {
                env: env
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
            resolve(mocks.setDockerEnv(body))
        }
    })
}

/**
 * Create docker client instance
 * 
 * @param {any} ca docker daemon ca file
 * @param {any} cert docker daemon cert file
 * @param {any} key docker daemon key file
 * @param {any} mock use mock flag (default false)
 */
export const dockerCreate = async function (ca,cert,key, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerCreate",
            options: {
                ca: ca,
                cert: cert,
                key:key
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
            resolve(mocks.dockerCreate(body))
        }
    })
}

/**
 * List docker containers
 * 
 * @param {any} opts list container option (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerListContainers = async function (opts, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerListContainers",
            options: opts
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
            resolve(mocks.dockerListContainers(body))
        }
    })
}

/**
 * List docker images
 * 
 * @param {any} opts list container option (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerListImages = async function (opts,mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerListImages",
            options: opts
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
            resolve(mocks.dockerListImages(body))
        }
    })
}

/**
 * Translates host name to IP address
 * 
 * @param {any} hostname host name to translate into IP
 * @param {any} mock use mock flag (default false)
 */
export const dnsLookup = async function (hostname, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dnsLookup",
            options: {
                hostname: hostname
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
            resolve(mocks.dnsLookup(body))
        }
    })
}

/**
 * Remove docker container
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerRemoveContainer = async function (opts, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerRemoveContainer",
            options: opts
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            resolve(mocks.dockerRemoveContainer(body))
        }
    })
}

/**
 * Remove docker image
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerRemoveImage = async function (opts, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerRemoveImage",
            options: opts
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            resolve(mocks.dockerRemoveImage(body))
        }
    })
}

/**
 * Build docker image
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerBuildImage = async function (opts, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerBuildImage",
            options: opts
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            resolve(mocks.dockerBuildImage(body))
        }
    })
}

/**
 * Pull docker image
 * @param {any} repoTag dockerhub image tag
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerPullImage = async function (repoTag, opts, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerPullImage",
            options: {
                repoTag: repoTag,
                opts: opts
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            resolve(mocks.dockerPullImage(body))
        }
    })
}

/**
 * Start docker container
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerStartContainer = async function (opts, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerPullImage",
            options: opts
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            resolve(mocks.dockerStartContainer(body))
        }
    })
}

/**
 * Stop docker container
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerStopContainer = async function (opts, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerStopContainer",
            options: opts
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            resolve(mocks.dockerStopContainer(body))
        }
    })
}

/**
 * Restart docker container
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerRestartContainer = async function (opts, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerRestartContainer",
            opts: opts
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            resolve(mocks.dockerRestartContainer(body))
        }
    })
}

/**
 * Create docker container
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerCreateContainer = async function (opts, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerCreateContainer",
            opts: opts
        };
        if (!mock) {
        callFetchPost(url, body, getCHeader())
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        } else {
            resolve(mocks.dockerCreateContainer(body))
        }
    })
}

/**
 * Get Companies
 * 
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getCompanies = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getCompanies",
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
            resolve(mocks.getCompanies(body))
        }
    })
}

/**
 * Get Plants
 * 
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getPlants = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getPlants",
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
            resolve(mocks.getPlants(body))
        }
    })
}

/**
 * Get Departments
 * 
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getDepartments = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getDepartments",
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
            resolve(mocks.getDepartments(body))
        }
    })
}

/**
 * Get Lines
 * 
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getLines = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getLines",
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
            resolve(mocks.getLines(body))
        }
    })
}

/**
 * Get Machines
 * 
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getMachines = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getMachines",
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
            resolve(mocks.getMachines(body))
        }
    })
}

/**
 * Get Controllers
 * 
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getControllers = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getControllers",
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
            resolve(mocks.getControllers(body))
        }
    })
}

/**
 * Get Itsystems
 * 
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getItsystems = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getItsystems",
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
            resolve(mocks.getItsystems(body))
        }
    })
}

/**
 * Get Points
 * 
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getPoints = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getPoints",
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
            resolve(mocks.getPoints(body))
        }
    })
}

/**
 * Set Company
 * @param {any} company company to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setCompany = async function (company, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setCompany",
            options: {
                company: company
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
            resolve(mocks.setCompany(body))
        }
    })
}

/**
 * Set Plant
 * @param {any} plant plant to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setPlant = async function (plant, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setPlant",
            options: {
                plant: plant
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
            resolve(mocks.setPlant(body))
        }
    })
}

/**
 * Set Department
 * @param {any} department department to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setDepartment = async function (department, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setDepartment",
            options: {
                department: department
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
            resolve(mocks.setDepartment(body))
        }
    })
}

/**
 * Set Line
 * @param {any} line line to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setLine = async function (line, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setLine",
            options: {
                line: line
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
            resolve(mocks.setLine(body))
        }
    })
}

/**
 * Set Machine
 * @param {any} machine machine to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setMachine = async function (machine, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setMachine",
            options: {
                machine: machine
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
            resolve(mocks.setMachine(body))
        }
    })
}

/**
 * Set Controller
 * @param {any} controller controller to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setController = async function (controller, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setController",
            options: {
                controller: controller
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
            resolve(mocks.setController(body))
        }
    })
}

/**
 * Set Itsystem
 * @param {any} plant plant to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setItsystem = async function (itsystem, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setItsystem",
            options: {
                itsystem: itsystem
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
            resolve(mocks.setItsystem(body))
        }
    })
}

/**
 * Set Point
 * @param {any} plant plant to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setPoint = async function (point, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setPoint",
            options: {
                point: point
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
            resolve(mocks.setPoint(body))
        }
    })
}

/**
 * Delete Company
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deleteCompany = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteCompany",
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
            resolve(mocks.deleteCompany(body))
        }
    })
}

/**
 * Delete Plant
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deletePlant = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deletePlant",
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
            resolve(mocks.deletePlant(body))
        }
    })
}

/**
 * Delete Department
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deleteDepartment = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteDepartment",
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
            resolve(mocks.deleteDepartment(body))
        }
    })
}

/**
 * Delete Line
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deleteLine = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteLine",
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
            resolve(mocks.deleteLine(body))
        }
    })
}

/**
 * Delete Machine
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deleteMachine = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteMachine",
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
            resolve(mocks.deleteMachine(body))
        }
    })
}

/**
 * Delete Controller
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deleteController = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteController",
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
            resolve(mocks.deleteController(body))
        }
    })
}

/**
 * Delete Itsystem
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deleteItsystem = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteItsystem",
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
            resolve(mocks.deleteItsystem(body))
        }
    })
}

/**
 * Delete Point
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deletePoint = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deletePoint",
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
            resolve(mocks.deletePoint(body))
        }
    })
}

/**
 * Get Tree
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getTrees = async function (filters, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getTrees",
            options: {
                filters: filters
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    // FOR EACH FILTER GET DB ARRAY
                    // FROM DB ARRAY TO TREE
                    // BUILD TREE ARRAY
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            // FOR EACH FILTER GET DB ARRAY
            const trees = []
            const rescomp = await mocks.getCompanies(body)
            for (let i = 0; i < rescomp.data.length; i++) {
                const dbarray = await mocks.getDBArray(rescomp.data[i].name)
                // FROM DB ARRAY TO TREE
                const tree = graphutils.fromDbToTree(dbarray)
                // BUILD TREE ARRAY
                trees.push(tree)   
            }
            body.data = trees
            resolve(body)
        }
    })
}

/**
 * Set Tree
 * @param {any} tree tree to set
 * @param {any} mock use mock flag (default false)
 */
export const setTree = async function (tree, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setTree",
            options: {
                tree: tree
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    // FOR EACH FILTER GET DB ARRAY
                    // FROM DB ARRAY TO TREE
                    // BUILD TREE ARRAY
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            // FROM TREE TO DB ARRAY
            const dbarray = graphutils.fromTreeToDb(tree)
            // SAVE DBARRAY
            const ret = await mocks.setDBArray(dbarray)
            body.data = ret
            resolve(body)
        }
    })
}

/**
 * Delete Tree
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deleteTree = async function (filters, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteTree",
            options: {
                filters: filters
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    // FOR EACH FILTER GET DB ARRAY
                    // FROM DB ARRAY TO TREE
                    // BUILD TREE ARRAY
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            // FOR EACH FILTER GET DB ARRAY
            let trees = []
            let resp
            resp = await getTrees(filters, mock)
            trees = resp.data
            for (let i = 0; i < trees.length; i++) {
                
                const dbarray = graphutils.fromTreeToDb(trees[i])
                await mocks.deleteDBArray(dbarray)
            }
            resp = await getTrees(null, mock)
            trees = resp.data
            body.data = trees
            resolve(body)
        }
    })
}

/**
 * Get Point Time Series
 * @param {any} point point object
 * @param {any} from TS start date
 * @param {any} to TS end date
  * @param {any} mock use mock flag (default false)
 */
export const getPointsers = async function (point, from, to, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getPointsers",
            options: {
                point: point,
                from: from,
                to:to
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
            resolve(mocks.getPointsers(body))
        }
    })
}

/**
 * Get Alarms not acnowledged
 * @param {any} mock
 */
export const getNackAlarms = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getNackAlarms",
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
            resolve(mocks.getNackAlarms(body))
        }
    })
}

/**
 * Acknowledge alarm
 * @param {any} alarm
 * @param {any} mock
 */
export const ackAlarm = async function (alarm, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "ackAlarm",
            options: {
                alarm: alarm
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
            resolve(mocks.ackAlarm(body))
        }
    })
}

/**
 * Get Monitoring Statistics
 * @param {any} device
 * @param {any} mock
 */
export const getMonitorStats = async function (device, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getMonitorStats",
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
            resolve(mocks.getMonitorStats(body))
        }
    })
}

/*
export const getTree = async function (treename, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/gettree'
        const body = {
            type: "api",
            version: 1.0,
            command: "getMonitorStats",
            options: {
                treename: treename
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    let restored = restoreTree(response.root, null, response.roottag)
                    resolve(restored)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            resolve(mocks.getTree(body))
        }
    })
}*/







