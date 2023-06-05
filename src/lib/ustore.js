import { writable } from 'svelte/store';
import CompanyPanel from './components/MenuPanels/CompanyPanel.svelte'
import FactoryPanel from './components/MenuPanels/FactoryPanel.svelte'
import DepartmentPanel from './components/MenuPanels/DepartmentPanel.svelte'
import LinePanel from './components/MenuPanels/LinePanel.svelte'
import EquipmentPanel from './components/MenuPanels/EquipmentPanel.svelte'
import ControllerPanel from './components/MenuPanels/ControllerPanel.svelte'
import PhasePanel from './components/MenuPanels/PhasePanel.svelte'
import MRecordPanel from './components/MenuPanels/MRecordPanel.svelte'

export const role = writable("")
export const user = writable("")

// Navigation table for CLONE
export const cloneNavigation = writable([
    { name: "MONITOR", link: "/UP2CLONE/MONITOR",roles:['SADMIN','ADMIN','USER'] },
    { name: "BUILD", link: "/UP2CLONE/BUILD", roles: ['ADMIN'] },
    { name: "AUTHORIZATION", link: "/UP2CLONE/AUTH", roles: ['SADMIN'] },
])
// Navigation table for DATA
export const dataNavigation = writable( [
    { name: "MONITOR", link: "/UP2DATA/MONITOR", roles: ['SADMIN', 'ADMIN', 'USER'] },
    { name: "BUILD", link: "/UP2DATA/BUILD", roles: ['SADMIN', 'ADMIN', 'USER'] },
])
// Menu Options for CLONE graph Context
export const clonegraphmenuoptions = writable([
    { uid: 1, id: 'context-menu-master-node', name: 'Add Master', value: '', items: [] },
    { uid: 2, id: 'context-menu-phase-node', name: 'Add Phase', value: '', items: [] }
])
// Menu Options for CLONE subgraph Context
export const clonesubmenuoptions = writable([
    {uid: 1, id: 'context-menu-operation-node', name: 'Add Operation', value: '', items: []},
    {uid: 2, id: 'context-menu-choice-node', name: 'Add Choice', value: '', items: []},
])
// Menu Options for DATA graph Context
export const datagraphmenuoptions = writable([
    { uid: 1, id: 'context-menu-isa-node', name: 'Add Node', value: '', items: [] }
])

// Panel menu for DATA
export const up2datapanels = writable([
    { type: 'COMPANY', component: CompanyPanel, name: 'Company', level: 'level1', img: '/image-company.svg', fireEvents: false },
    { type: 'FACTORY', component: FactoryPanel, name: 'Factory', level: 'level2', img: '/image-factory.svg', fireEvents: false },
    { type: 'DEPARTMENT', component: DepartmentPanel, name: 'Department', level: 'level3', img: '/image-department.svg', fireEvents: false },
    { type: 'LINE', component: LinePanel, name: 'Line', level: 'level4', img: '/image-line.svg', fireEvents: false },
    { type: 'EQUIPMENT', component: EquipmentPanel, name: 'Equipment', level: 'level5', img: '/image-equipment.svg', fireEvents: false },
    { type: 'CONTROLLER', component: ControllerPanel, name: 'Controller', level: 'level6', img: '/image-controller.svg', fireEvents: false },
])

// Panel menu for CLONE
export const  up2clonepanels = writable([
    { type: 'MASTER', component: MRecordPanel, name: 'Master Node', level: 'level0', img: '/MASTER.svg', fireEvents: true },
    { type: 'PHASE', component: PhasePanel, name: 'Phase Node', level: 'level1', img: '/DISPENSING.svg', fireEvents: true },
])