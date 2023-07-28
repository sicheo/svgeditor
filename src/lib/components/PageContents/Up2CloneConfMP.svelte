<script lang="ts">

import SimpleTable from '../Tables/SimpleTable.svelte'
import TableImage from  '../Tables/TableImage.svelte'
import TableText from  '../Tables/TableText.svelte'
import { onMount} from "svelte";
import { _ } from 'svelte-i18n'

import {deleteDevice,setDevice } from '../../script/api.js'
import {getImage} from '../../script/utils.js'

// DIALOGS FOR EDIT,AGENT,LOCATION, SAVE, DELETE
import GenericDeleteDialog from '../Dialogs/GenericDeleteDialog.svelte'
import GenericSaveDialog from '../Dialogs/GenericSaveDialog.svelte'
import EditDeviceDialog from '../Dialogs/EditDeviceDialog.svelte'


import { flexRender, createColumnHelper } from '@tanstack/svelte-table';

   
   export let color:any
   export let data = []

   let refreshDataExt:any
   let dialog = GenericDeleteDialog
   let dialogOptions = {row:{},func:null,array:[],dialogDelete:$_('dialog_delete_device'),divname:'build-tool-dialog'}
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
       const found = data.find((item:any)=>item.uid == uid)
       dialog = GenericSaveDialog
       dialogOptions ={row:found,func:setDevice,array:[],dialogDelete:$_('dialog_save_device'),divname:'build-tool-dialog'}
       const dialogdiv = document.getElementById("build-tool-dialog")
       if(dialogdiv)
            dialogdiv.style.display = 'block'
       

   }
   const onClickEdit = (ev:any)=>{
       const target = ev.target
       const uid = target.getAttribute("data-uid")
       const found = data.find((item:any)=>item.uid == uid)
       dialog = EditDeviceDialog
       dialogOptions ={row:found,func:null,array:[],dialogDelete:$_('dialog_edit_device'),divname:'build-tool-dialog'}
       const dialogdiv = document.getElementById("build-tool-dialog")
       if(dialogdiv)
            dialogdiv.style.display = 'block'

   }
   const onClickDelete = (ev:any)=>{
       const target = ev.target
       const uid = target.getAttribute("data-uid")
       const found = data.find((item:any)=>item.uid == uid)
       dialog = GenericDeleteDialog
       dialogOptions ={row:found,func:deleteDevice,array:[],dialogDelete:$_('dialog_delete_device'),divname:'build-tool-dialog'}
       const dialogdiv = document.getElementById("build-tool-dialog")
       if(dialogdiv)
            dialogdiv.style.display = 'block'
   }

   const columns = [
                    columnHelper.accessor('type', {
                        id : 'type',
                        enableColumnFilter:false,
                        header: () => $_("table-db-device-type"),
                        cell: (props) =>   flexRender(TableImage,{image:getImage('devicetype',props.getValue())}),
                    }),
                    columnHelper.accessor('os', {
                        id : 'os',
                        enableColumnFilter:false,
                        header: () => $_("table-db-device-os"),
                        cell: (props) =>   flexRender(TableImage,{image:getImage('deviceos',props.getValue())}),
                    }),
                    columnHelper.accessor('name', {
                        id : 'name',
                        header: () => $_("table-db-device-name"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),
                    columnHelper.accessor('host', {
                        id : 'host',
                        header: () => $_("table-db-device-host"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),
                    columnHelper.accessor('port', {
                        id : 'port',
                        enableColumnFilter:false,
                        header: () => $_("table-db-device-port"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),  
                    columnHelper.accessor('description', {
                        id : 'description',
                        header: () => $_("table-db-device-description"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'agent',
                        enableColumnFilter:false,
                        header: () => $_("table-db-device-agent"),
                        cell: (props) =>   flexRender(TableImage,{image:'/AGENT.svg',onClick:onClickAgent,uid:props.getValue()}),
                    }),
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'save',
                        enableColumnFilter:false,
                        header: () => $_("table-db-device-save"),
                        cell: (props) =>   flexRender(TableImage,{image:'/SAVE.svg',onClick:onClickSave,uid:props.getValue()}),
                    }),
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'edit',
                        enableColumnFilter:false,
                        header: () => $_("table-db-device-edit"),
                        cell: (props) =>   flexRender(TableImage,{image:'/edit.svg',onClick:onClickEdit,uid:props.getValue()}),
                    }),
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'delete',
                        enableColumnFilter:false,
                        header: () => $_("table-db-device-delete"),
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