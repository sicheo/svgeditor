<script lang="ts">
import { onMount} from "svelte";
//import SvelteTable from "svelte-table";
//import SelectComponent from "../TaskEditor/SelectComponent.svelte";
//import InputComponent from "../TaskEditor/InputComponent.svelte";
//import TextAreaComponent from "../TaskEditor/TextAreaComponent.svelte";
import {getProcesses} from '../../script/api.js'
import {mock} from '../../ustore.js'
import { _ } from 'svelte-i18n'

import SimpleTable from '../Tables/SimpleTable.svelte'
import TableImage from  '../Tables/TableImage.svelte'
import TableText from  '../Tables/TableText.svelte'
import TableSwitch from  '../Tables/TableSwitch.svelte'
import Up2CloneAuthSign from './Up2CloneAuthSign.svelte'


import { flexRender, createColumnHelper } from '@tanstack/svelte-table';


export let color:any

const columnHelper  = createColumnHelper()
let data = []
let process = ''
let tree: any = {}


onMount(async ()=>{
   const response = await getProcesses(null,$mock)
   data = response.data
   
 });

 let promise = getProcesses(null,$mock)

 const getTreeFromProcess =(process:any)=>{
    let tree = {}
	tree['label'] = process.name
	tree['children'] = []
    tree['color'] = '#f1c232'
    tree['type'] ='MASTER'
    const init = {label:$_('up2clone_master_panel_init'),children:[],type:"INIT",color:'#ffd966'}
    if(process.data.materials){
        const node = {label:$_('up2clone_master_panel_materials'),children:[],color:'#ffe599',type:'MATERIALS'}
        for(let i=0;i< process.data.materials.length;i++){
            node.children.push({label:process.data.materials[i].DESCRIPTION,type:"TASK"})
        }
        init['children'].push(node)
    }
    if(process.data.machines){
        const node = {label:$_('up2clone_master_panel_machines'),children:[],color:'#ffe599',type:'MACHINES'}
        for(let i=0;i< process.data.machines.length;i++){
            node.children.push({label:process.data.machines[i].DESCRIPTION,type:"TASK"})
        }
        init['children'].push(node)
    }
    if(process.data.personnel){
        const node = {label:$_('up2clone_master_panel_personnel'),children:[],color:'#ffe599',type:'PERSONNEL'}
        for(let i=0;i< process.data.personnel.length;i++){
            node.children.push({label:process.data.personnel[i].NAME,type:"TASK"})
        }
        init['children'].push(node)
    }
    tree['children'].push(init)
	if(process.phases){
        const phases = {label:$_('up2clone_master_panel_phases'),children:[],color:'#ffd966',type:'PHASES'}
		for(let i=0;i<process.phases.length;i++){
			const phase = process.phases[i]
			const node ={label:'',children:[], color:'#ffe599',type:'PHASE'}
			node.label = phase.name
			if(phase.operations){
				for(let j=0;j<phase.operations.length;j++){
					const operation = phase.operations[j]
					const op= {label:'',children:[],color:"#fff2cc",type:'OPERATION'}
					op.label = operation.name
					if(operation.tasks){
						for(let k=0;k<operation.tasks.length;k++){
							const task = operation.tasks[k]
							const ts ={label:'',type:"TASK"}
							ts.label = task.name
							op.children.push(ts)
						}
					}
					node.children.push(op)
				}
			}
			phases['children'].push(node)
		}
        tree['children'].push(phases)
	}
    const final = {label:$_('up2clone_master_panel_final'),children:[],type:"FINALTASK",color:'#ffd966'}
    if(process.data.final && process.data.final.analysisList){
        const analysisList = {label:$_('up2clone_final_panel_anlist'),children:[],type:"FINALTASK",color:'#ffe599'}
        final.children.push(analysisList)
    }
    if(process.data.final && process.data.final.batchYelds){
        const batchYelds = {label:$_('up2clone_final_panel_yelds'),children:[],type:"FINALTASK",color:'#ffe599'}
        final.children.push(batchYelds)
    }
    if(process.data.final && process.data.final.productInfo){
        const productInfo = {label:$_('up2clone_final_panel_prodinfo'),children:[],type:"FINALTASK",color:'#ffe599'}
        final.children.push(productInfo)
    }
    if(process.data.final && process.data.final.labeling){
        const labelingAndStore = {label:$_('up2clone_final_panel_labeling'),children:[],type:"FINALTASK",color:'#ffe599'}
        final.children.push(labelingAndStore)
    }
    if(process.data.final && process.data.final.store){
        const labelingAndStore = {label:$_('up2clone_final_panel_store'),children:[],type:"FINALTASK",color:'#ffe599'}
        final.children.push(labelingAndStore)
    }
    if(process.data.final && process.data.final.cleaningVerification){
        const cleaningVerification = {label:$_('up2clone_final_panel_cleanver'),children:[],type:"FINALTASK",color:'#ffe599'}
        final.children.push(cleaningVerification)
    }
    if(process.data.final && process.data.final.notes){
        const notes = {label:$_('up2clone_final_panel_notes'),children:[],type:"FINALTASK",color:'#ffe599'}
        final.children.push(notes)
    }
        
    tree['children'].push(final)
    console.log("*** GET TREE ***", tree)
	return tree
}


 const onSign= async (ev:any) =>{
     const target = ev.target
    
    
     const divSign = document.getElementById("modal-auth-sign-div-id")
     if(divSign){
        process = data.find((item:any) => {return (item.uuid == target.id)} )
        tree = await getTreeFromProcess(process)
        divSign.style.display = 'block'
        
     }

 }

 const onBlock = async (ev:any) =>{
     const target = ev.target
     console.log("*** BLOCK *****",ev.target.checked)
 }

 
 const defcolumns = [
         
        columnHelper.group({
        id:'id',
        columns: [
            columnHelper.accessor((row:any) => `${row.name}`, {
            id:'name',
            header: () => $_('up2clone_auth_table_name'),
            cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
            }),
            columnHelper.accessor((row:any) => `${row.description}`, {
            id:'description',
            header: () => $_('up2clone_auth_table_description'),
            cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
            }),
            columnHelper.accessor((row:any) => `${row.doccode}`, {
            id:'doccode',
            header: () => $_('up2clone_auth_table_document'),
            cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
            }),
            columnHelper.accessor((row:any) => `${row.data.authorization.version}`, {
            id:'version',
            header: () => $_('up2clone_auth_table_version'),
            cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
            }),
             columnHelper.accessor((row:any) => `${row.data.authorization.authorized}`, {
            id:'authorized',
            header: () => $_('up2clone_auth_table_authorized'),
            cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
            }),
            columnHelper.accessor((row:any) => `${row.data.lastmodified}`, {
            id:'lastmodified',
            header: () => $_('up2clone_auth_table_date'),
            cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
            }),
            columnHelper.accessor((row:any) => `${row.uuid}`, {
            id:'uuid',
            header: () => $_('up2clone_auth_table_signature'),
            cell: (props) =>  flexRender(TableImage,{image:'/SIGNATURE.svg',onClick:onSign,name:props.getValue(),text:props.getValue()}),
            }),
            columnHelper.accessor('data', {
            id: 'block',
            header: () => $_('up2clone_auth_table_block'),
            cell: (props) =>  flexRender(TableSwitch,{onChange:onBlock,uuid:props.getValue().uuid,checked:props.getValue().authorization.blocked}),
            })

        ]
        })
 ]

</script>
	
	<div class= "class-panel-row">
        {#await promise}
	        <p>...waiting</p>
        {:then response}
		    <SimpleTable data={response.data} columns={defcolumns} color={color}></SimpleTable>
        {:catch error}
	            <p style="color: red">{error.message}</p>
        {/await}
	</div>
    <div class="modal-auth-sign-div" id="modal-auth-sign-div-id" data-process=''>
		<div class="modal-editor-auth-sign-content">
			<Up2CloneAuthSign bind:tree={tree} bind:process={process} {color} />
		</div>
	</div>


<style>
.class-panel-row {
  display: block;
  justify-content:left;
  font-family: Arial, Helvetica, sans-serif;
  font-size: small;
  font-weight: bold;
}

/* The Modal (background) */
.modal-auth-sign-div {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-editor-auth-sign-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>