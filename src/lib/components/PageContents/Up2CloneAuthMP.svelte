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


import { flexRender, createColumnHelper } from '@tanstack/svelte-table';


export let color:any

const columnHelper  = createColumnHelper()
let data = []

onMount(async ()=>{
   //const response = await getProcesses(null,$mock)
   //data = response.data
   console.log("****** Up2CloneAuthMP ******",data)
   
 });

 let promise = getProcesses(null,$mock)

 const onSign= (ev:any) =>{
     const target = ev.target
     console.log("***** SIGNATURE *****",target.id)

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


<style>
.class-panel-row {
  display: block;
  justify-content:left;
  font-family: Arial, Helvetica, sans-serif;
  font-size: small;
  font-weight: bold;
}

.table-header-class{
     text-align: left;
     color: red;
}
</style>