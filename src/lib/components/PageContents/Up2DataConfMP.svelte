<script lang="ts">

import SimpleTable from '../Tables/SimpleTable.svelte'
import TableImage from  '../Tables/TableImage.svelte'
import TableText from  '../Tables/TableText.svelte'
import { onMount} from "svelte";
import { _ } from 'svelte-i18n'

import {sleep, deleteDevice,setDevice } from '../../script/api.js'
// DIALOGS FOR EDIT,AGENT,LOCATION, SAVE, DELETE
import GenericDeleteDialog from '../Dialogs/GenericDeleteDialog.svelte'
import GenericSaveDialog from '../Dialogs/GenericSaveDialog.svelte'


import { flexRender, createColumnHelper } from '@tanstack/svelte-table';
    import AddTools from '../InnerTabs/AddTools.svelte';
   
   export let color:any
   export let data = []

   let refreshDataExt:any
   let dialog = GenericDeleteDialog
   let dialogOptions = {row:{},delete:null,save:null,dialogDelete:$_('dialog_delete_device')}
   let tablediv

   const columnHelper  = createColumnHelper()

   onMount(async ()=>{
       tablediv = document.getElementById("tanstack-table-id")
       const eventShow = new CustomEvent("refreshtable",{detail: data});
	   tablediv.dispatchEvent(eventShow)
    });


    //let promise = getDevices(null,$mock)

   const onClickLocation = (ev:any)=>{

   }
   const onClickAgent = (ev:any)=>{

   }
   const onClickSave = (ev:any)=>{
       const target = ev.target
       const uid = target.getAttribute("data-uid")
       console.log("ON CLICK DELETE",uid)
       const found = data.find((item:any)=>item.uid == uid)
       dialog = GenericSaveDialog
       dialogOptions ={row:found,delete:null,save:setDevice,dialogDelete:$_('dialog_save_device')}
       const dialogdiv = document.getElementById("build-tool-dialog")
       if(dialogdiv)
            dialogdiv.style.display = 'block'
       

   }
   const onClickEdit = (ev:any)=>{

   }
   const onClickDelete = (ev:any)=>{
       const target = ev.target
       const uid = target.getAttribute("data-uid")
       console.log("ON CLICK DELETE",uid)
       const found = data.find((item:any)=>item.uid == uid)
       dialog = GenericDeleteDialog
       dialogOptions ={row:found,delete:deleteDevice,save:null,dialogDelete:$_('dialog_delete_device'),refreshData:refreshDataExt}
       const dialogdiv = document.getElementById("build-tool-dialog")
       if(dialogdiv)
            dialogdiv.style.display = 'block'
   }

   const columns = [
                    columnHelper.accessor('type', {
                        id : 'type',
                        header: () => 'TYPE',
                        cell: (props) =>   flexRender(TableImage,{image:'/VMWARE.svg'}),
                    }),
                    columnHelper.accessor('os', {
                        id : 'os',
                        header: () => 'TYPE',
                        cell: (props) =>   flexRender(TableImage,{image:'/UBUNTU.svg'}),
                    }),
                    columnHelper.accessor('name', {
                        id : 'name',
                        header: () => 'NAME',
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),
                    columnHelper.accessor('host', {
                        id : 'host',
                        header: () => 'IP/HOST',
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),
                    columnHelper.accessor('port', {
                        id : 'port',
                        header: () => 'PORT',
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),  
                    columnHelper.accessor('description', {
                        id : 'description',
                        header: () => 'DESCRIPTION',
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'localization',
                        header: () => 'LOCALIZATION',
                        cell: (props) =>   flexRender(TableImage,{image:'/LOCATION.svg',onClick:onClickLocation}),
                    }),
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'agent',
                        header: () => 'AGENT',
                        cell: (props) =>   flexRender(TableImage,{image:'/AGENT.svg',onClick:onClickAgent,uid:props.getValue()}),
                    }),
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'save',
                        header: () => 'SAVE',
                        cell: (props) =>   flexRender(TableImage,{image:'/SAVE.svg',onClick:onClickSave,uid:props.getValue()}),
                    }),
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'edit',
                        header: () => 'EDIT',
                        cell: (props) =>   flexRender(TableImage,{image:'/edit.svg',onClick:onClickEdit,uid:props.getValue()}),
                    }),
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'delete',
                        header: () => 'DELETE',
                        cell: (props) =>   flexRender(TableImage,{image:'/DELETE.svg',onClick:onClickDelete,uid:props.getValue()}),
                    }),
   ]

   
  

</script>
    <div class= "class-panel-row" id="id-data-conf-table-div">
     
            <SimpleTable bind:data={data} columns={columns} color={color} bind:refreshDataExt={refreshDataExt}></SimpleTable>
    
    </div>

    <div id="build-tool-dialog">
        <svelte:component this={dialog} bind:data={data} bind:dialogOptions={dialogOptions} {color}/>
    </div>

<style>
.class-panel-row {
  display: block;
  justify-content:left;
  font-family: Arial, Helvetica, sans-serif;
  font-size: small;
  font-weight: bold;
}

#build-tool-dialog{
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 11; /* Sit on top */
      padding-top: 100px; /* Location of the box */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
</style>