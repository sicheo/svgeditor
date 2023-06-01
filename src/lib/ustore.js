import { writable } from 'svelte/store';

export const role = writable("")
export const user = writable("")

export const cloneNavigation = writable([
    { name: "MONITOR", link: "/UP2CLONE/MONITOR",roles:['SADMIN','ADMIN','USER'] },
    { name: "BUILD", link: "/UP2CLONE/BUILD", roles: ['ADMIN'] },
    { name: "AUTHORIZATION", link: "/UP2CLONE/AUTH", roles: ['SADMIN'] },
])

export const dataNavigation = writable( [
    { name: "MONITOR", link: "/UP2DATA/MONITOR", roles: ['SADMIN', 'ADMIN', 'USER'] },
    { name: "BUILD", link: "/UP2DATA/BUILD", roles: ['SADMIN', 'ADMIN', 'USER'] },
])