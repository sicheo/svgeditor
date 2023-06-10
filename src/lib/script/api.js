import mocks from '../script/mocks.js'

const baseUrl = 'https://' + window.location.hostname + ':9001'

const customHeaders = {
    "Content-Type": "application/json",
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
 * @param {any} mock
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
 * @param {any} mock
 */
export const getMasters = async function (options, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getMasters",
            options: options
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
            resolve(mocks.getMasters(body))
        }
    })
}
/**
 * Return option items for graph nodes
 * @param {any} menu
 * @param {any} mock
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
            callFetchPost(url, body)
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
 * @param {any} mock
 */
export const getLogs = async function (mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getMenuItems",
            options: {
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
            resolve(mocks.getLogs(body))
        }
    })
}

/**
 * Set applicatiion log
 * @param {any} log
 * @param {any} mock
 */
export const setLog = async function (log, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getMenuItems",
            options: {
                log: log
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
            resolve(mocks.setLog(body))
        }
    })
}




