import { navigate } from "svelte-routing";
import { base, user, token, role } from "../ustore.js"
import analyticPlugin from "./analiticsPlugin.js"
import Analytics from 'analytics'

const an = Analytics({
    app: 'my-app-name',
    version: 100,
    plugins: [
        analyticPlugin()
    ]
})

const clearStore = function () {
    user.update(v => "")
    token.update(v => "")
    role.update(v => "")
}

export const  BuddyClick = (e) => {
    const element = e.target
    const modal = document.getElementById("u2t-tool-modal-id")
    if (modal)
        modal.style.display = "block";
}

export const  SysConfClick = (e) => {

}

export const LogoutClick = async (e) => {
    let localbase

    const unsubscribe = base.subscribe(value => {
        localbase = value;
    });

    // STORE ANALYTICS
    await an.track('logout', {
        target: localbase
    })

    // CLEAR STATE
    clearStore() 

    // NAVIGATE TO BASE LOGIN
    navigate(localbase, { replaceState: true })

    unsubscribe()
}