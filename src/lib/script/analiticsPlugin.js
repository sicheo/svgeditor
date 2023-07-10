import { setLog, getLogs } from "../script/api.js"
import { getLocalDate } from '../script/utils.js'

 

async function getUser() {
    let { user } = await import("../ustore.js")
    let luser = ""
    const unsubscribe = await user.subscribe(value => {
        luser = value;
    });
    unsubscribe()
    return luser
}

async function getMock() {
    let { mock } = await import("../ustore.js")
    let lmock = false
    const unsubscribe = await mock.subscribe(value => {
        lmock = value;
    });
    unsubscribe()
    return lmock
}

const config = {
    assumesPageview: true
}


/* Export the integration */
export default function analyticPlugin(userConfig) {
    // Allow for userland overides of base methods
    return {
        name: 'up2-plugin-name',
        config: {
            ...config,
            ...userConfig
        },
        initialize: ({ config }) => {
            console.log('Load browser scripts!')
        },
        /* page view */
        page: ({ payload, config }) => {
            console.log('Run pageview in browser')
        },
        /* track event */
        track: async ({ payload, config }) => {
            let details = ""
            let user = await getUser()
            switch (payload.event) {
                case 'graphSave':
                    details = "saved master " + payload.properties.masterdoc
                    break
                case 'login':
                    details = "target page " + payload.properties.target
                    break
                case 'logout':
                    details = "target page " + payload.properties.target
                    break
            }
            const log = { user: user, date: getLocalDate(new Date(payload.meta.ts)), action: payload.event, details: details }
            await setLog(log, getMock())
            const logs = await getLogs(getMock())
            //console.log(logs)
        },
        /* identify user */
        identify: ({ payload }) => {
            console.log('identify user in browser')
        },
        /* Verify script loaded */
        loaded: function () {
            //return !!window.myWindowGlobal
            return true
        }
    }
}