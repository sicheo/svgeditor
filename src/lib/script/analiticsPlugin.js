import { setLog,getLogs } from "../script/api.js"

async function getUser() {
    let { user } = await import("../ustore.js")
    let luser = ""
    const unsubscribe = await user.subscribe(value => {
        luser = value;
    });
    unsubscribe()
    return luser
}

const config = {
    assumesPageview: true
}

function dateToISOLikeButLocal(date) {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal = date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    const isoLocal = iso.slice(0, 19);
    return isoLocal;
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
            const log = { user: user, date: dateToISOLikeButLocal(new Date(payload.meta.ts)), action: payload.event, details: details }
            await setLog(log, true)
            const logs = await getLogs(true)
            console.log(logs)
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