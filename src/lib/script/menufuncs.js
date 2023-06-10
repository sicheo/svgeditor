import { navigate } from "svelte-routing";
import { base } from "../ustore.js"

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

    base.subscribe(value => {
        localbase = value;
    });
    navigate(localbase, { replaceState: true })
}