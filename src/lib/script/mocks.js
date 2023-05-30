let attempts = 0

const login = (body) => {
    if (body.options.username == "MOCKUSER" && body.options.password == "MOCKPASSWD") {
        body.data = { token: 'ABCDEFGH' }
        body.error = null
        attempts = 0
    } else {
        body.data = null
        body.error = "ERR_BAD_PASSWD"
        attempts++
    }
    return(body)
}

const mocks = {
    login
}

export default mocks