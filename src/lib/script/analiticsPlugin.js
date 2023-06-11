import { setLog,getLogs } from "../script/api.js"

async function getUser() {
    let { user } = await import("../ustore.js")
    let luser = ""
    await user.subscribe(value => {
        luser = value;
    });
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
            const log = { user: await getUser(), date: dateToISOLikeButLocal(new Date(payload.meta.ts)), action: payload.event, details: payload.properties }
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