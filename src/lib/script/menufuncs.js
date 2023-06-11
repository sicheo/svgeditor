import { navigate } from "svelte-routing";
import { base, user, token, role } from "../ustore.js"

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

export const LogoutClick = (e) => {
    let localbase

    clearStore()
    base.subscribe(value => {
        localbase = value;
    });
    navigate(localbase, { replaceState: true })
}