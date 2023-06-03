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

export const graphmenuitems = writable([
    { uid: 1, id: 'context-menu-master-node', name: 'Add Master', value: '', items: [] },
    { uid: 2, id: 'context-menu-phase-node', name: 'Add Phase', value: '', items: [] }
])

export const submenuitems = writable([
    {uid: 1, id: 'context-menu-operation-node', name: 'Add Operation', value: '', items: []},
    {uid: 2, id: 'context-menu-choice-node', name: 'Add Choice', value: '', items: []},
])