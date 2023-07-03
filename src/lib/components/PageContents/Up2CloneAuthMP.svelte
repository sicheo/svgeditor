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
	tree['label'] = process.name
	tree['children'] = []
	if(process.phases){
		for(let i=0;i<process.phases.length;i++){
			const phase = process.phases[i]
			const node ={label:'',children:[]}
			node.label = phase.name
			if(phase.operations){
				for(let j=0;j<phase.operations.length;j++){
					const operation = phase.operations[j]
					const op= {label:'',children:[]}
					op.label = operation.name
					if(operation.tasks){
						for(let k=0;k<operation.tasks.length;k++){
							const task = operation.tasks[k]
							const ts ={label:''}
							ts.label = task.name
							op.children.push(ts)
						}
					}
					node.children.push(op)
				}
			}
			tree['children'].push(node)
		}
	}
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

 const columns = [
    {
        id : 'name',
        columns: [
                
            columnHelper.accessor('name', {
            header: () => $_('up2clone_auth_table_name'),
            cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
            })
        ]
    },
    {
        id : 'description',
        columns: [
                
            columnHelper.accessor('description', {
            header: () => $_('up2clone_auth_table_description'),
            cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
            })
        ]
    },
    {
        id : 'doccode',
        columns: [
                
            columnHelper.accessor('doccode', {
            header: () => $_('up2clone_auth_table_document'),
            cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
            })
        ]
    },
    {
        id : 'version',
        columns: [
                
           columnHelper.accessor('data', {
            header: () => $_('up2clone_auth_table_version'),
            cell: (props) =>  flexRender(TableText,{text:props.getValue().authorization.version}),
            })
        ]
    },
    {
        id : 'authorized',
        columns: [
                
           columnHelper.accessor('data', {
            header: () => $_('up2clone_auth_table_authorized'),
            cell: (props) =>  flexRender(TableText,{text:props.getValue().authorization.authorized}),
            })
        ]
    },
    {
        id : 'date',
        columns: [
                
           columnHelper.accessor('data', {
            header: () => $_('up2clone_auth_table_date'),
            cell: (props) =>  flexRender(TableText,{text:props.getValue().lastmodified}),
            })
        ]
    },
    {
        id : 'signature',
        columns: [
           columnHelper.accessor('uuid', {
            header: () => $_('up2clone_auth_table_signature'),
            cell: (props) =>  flexRender(TableImage,{image:'/SIGNATURE.svg',onClick:onSign,name:props.getValue(),text:props.getValue()}),
            })
        ]
    },
 ]

</script>
	
	<div class= "class-panel-row">
        {#await promise}
	        <p>...waiting</p>
        {:then response}
		    <SimpleTable data={response.data} columns={columns} color={color}></SimpleTable>
        {:catch error}
	            <p style="color: red">{error.message}</p>
        {/await}
	</div>
    <div class="modal-auth-sign-div" id="modal-auth-sign-div-id" data-process=''>
		<div class="modal-editor-auth-sign-content">
			<Up2CloneAuthSign bind:tree={tree} bind:process={process} {color}/>
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