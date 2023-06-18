<script lang="ts">

import SimpleTable from '../Tables/SimpleTable.svelte'
import TableImage from  '../Tables/TableImage.svelte'
import TableText from  '../Tables/TableText.svelte'

import { flexRender, createColumnHelper } from '@tanstack/svelte-table';
 

  
   export let color:any

   const columnHelper  = createColumnHelper()

   const columns = [
       {
           id : 'type',
           header: () => 'TYPE',
           cell:  flexRender(TableImage,{image:'/VMWARE.svg'}),
       },
       {
           id : 'os',
           header: () => 'OS',
           cell:  flexRender(TableImage,{image:'/UBUNTU.svg'}),
       },
       {
          id : 'name',
           columns: [
                
                columnHelper.accessor('name', {
                header: () => 'NAME',
                cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
              })
          ]
       },
       {
           id : 'host',
           columns: [
                columnHelper.accessor('host', {
                header: () => 'IP/HOST',
                cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
              })
           ]
       },
       {
           id : 'port',
           columns: [
              columnHelper.accessor('port', {
                header: () => 'PORT',
                cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
              })
          ]
       },
       {
           id : 'description',
           columns: [
              columnHelper.accessor('description', {
                header: () => 'DESCRIPTION',
                cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
              })
          ]
       },
       {
           id : 'location',
           cell:  flexRender(TableImage,{image:'/LOCATION.svg'}),
       },
       {
           id : 'agent',
           cell:  flexRender(TableImage,{image:'/AGENT.svg'}),
       },
       {
           id : 'save',
           cell:  flexRender(TableImage,{image:'/SAVE.svg'}),   
       },
       {
          id : 'edit',
           cell:  flexRender(TableImage,{image:'/edit.svg'}),   
       },
       {
          id : 'delete',
           cell:  flexRender(TableImage,{image:'/DELETE.svg'}),
       }
   ]

  

  const data = [
    {
      name: 'Device1',
      host: 'SERV01',
      port: 3000,
      description: 'Some Description 1',
     
    },
    {
       name: 'Device2',
      host: '10.72.127.34',
      port: 3001,
      description: 'Some Description 2',
     
    },
    {
      name: 'Device3',
      host: 'CLOUD03',
      port: 3001,
      description: 'Some Description 3 a bit longer',
      
    },
  ]

</script>

    <SimpleTable data={data} columns={columns} color={color}></SimpleTable>

<style>
</style>