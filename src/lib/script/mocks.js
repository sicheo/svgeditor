let attempts = 0

const masters = [
    { uid: 1, description: "Master record product XXXXXX", doc: "DOC123", product: "PROD123", authdate: "2022-05-14", status: "AUTH", version:"1.1" },
    { uid: 2, description: "Master record product YYYYYY", doc: "DOC123", product: "PROD123", authdate: "", status: "NOAUTH", version: "0.2" },
    { uid: 3, description: "Master record product ZZZZZZ", doc: "DOC123", product: "PROD123", authdate: "2023-05-21", status: "AUTH", version: "1.0" }
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

const mocks = {
    login,
    getMasters
}

export default mocks