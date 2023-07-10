<script lang="ts">

import SimpleTable from '../Tables/SimpleTable.svelte'
import TableImage from  '../Tables/TableImage.svelte'
import TableText from  '../Tables/TableText.svelte'
import { onMount} from "svelte";
import {mock} from '../../ustore.js'
import {getDevices} from '../../script/api.js'


import { flexRender, createColumnHelper } from '@tanstack/svelte-table';
 


  
   export let color:any
   let data = []

   const columnHelper  = createColumnHelper()

   onMount(async ()=>{
       const response = await getDevices(null,$mock)
       data = response.data
   
    });

    let promise = getDevices(null,$mock)

   const onClickLocation = (ev:any)=>{

   }
   const onClickAgent = (ev:any)=>{

   }
   const onClickSave = (ev:any)=>{

   }
   const onClickEdit = (ev:any)=>{

   }
   const onClickDelete = (ev:any)=>{

   }

   const columns = [
        columnHelper.group({
            id:'id',
            columns:[
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
                    columnHelper.accessor('localization', {
                        id : 'localization',
                        header: () => 'LOCALIZATION',
                        cell: (props) =>   flexRender(TableImage,{image:'/LOCATION.svg',onClick:onClickLocation}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'agent',
                        header: () => 'AGENT',
                        cell: (props) =>   flexRender(TableImage,{image:'/AGENT.svg',onClick:onClickAgent}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'save',
                        header: () => 'SAVE',
                        cell: (props) =>   flexRender(TableImage,{image:'/SAVE.svg',onClick:onClickSave}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'edit',
                        header: () => 'EDIT',
                        cell: (props) =>   flexRender(TableImage,{image:'/edit.svg',onClick:onClickEdit}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'delete',
                        header: () => 'DELETE',
                        cell: (props) =>   flexRender(TableImage,{image:'/DELETE.svg',onClick:onClickDelete}),
                    }),
             ]
        })
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
</style>