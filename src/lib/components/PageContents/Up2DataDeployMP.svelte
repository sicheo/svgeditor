<script lang="ts">

import SimpleTable from '../Tables/SimpleTable.svelte'
import TableImage from  '../Tables/TableImage.svelte'
import { flexRender } from '@tanstack/svelte-table';

   const columns = [
       {
           header : 'TYPE',
           columns: [
          { 
            id: "type",
            cell:  flexRender(TableImage,{image:'/VMWARE.svg'})
          }]
       },
       {
           header : 'OS',
           columns: [
          { 
            id: "type",
            cell:  flexRender(TableImage,{image:'/UBUNTU.svg'})
          }]
       },
       {
           header : 'NAME',
           columns: [
          { 
            accessorKey: 'name',
          }]
       },
       {
           header : 'IP/HOST',
           columns: [
          { 
            accessorKey: 'host',
          }]
       },
       {
           header : 'PORT',
           columns: [
          { 
            accessorKey: 'port',
          }]
       },
       {
           header : 'DESCRIPTION',
           columns: [
          { 
            accessorKey: 'description',
          }]
       },
       {
          id: 'LOCATION',
           columns: [
          { 
            id: "location",
            cell:  flexRender(TableImage,{image:'/LOCATION.svg'})
          }]
       },
       {
          id: 'AGENT',
           columns: [
          { 
            id: "agent",
            cell:  flexRender(TableImage,{image:'/AGENT.svg'})
          }]
       },
       {
          id: 'SAVE',
           columns: [
          { 
            id: "save",
            cell:  flexRender(TableImage,{image:'/SAVE.svg'})
          }]
       },
       {
          id: 'EDIT',
           columns: [
          { 
            id: "edit",
            cell:  flexRender(TableImage,{image:'/edit.svg'})
          }]
       },
       {
          id: 'DELETE',
           columns: [
          { 
            id: "delete",
            cell:  flexRender(TableImage,{image:'/DELETE.svg'})
          }]
       }
   ]

  /*const columns = [
    {
      //header: 'Name' ,
      //footer: props => props.column.id,
      columns: [
          { 
            id: "type",
            cell:  flexRender(TableImage,{image:'/VMWARE.svg'})
          },
          { 
            id: "os",
            cell:  flexRender(TableImage,{image:'/UBUNTU.svg'})
          },

        {
          accessorKey: 'firstName',
          cell: info => info.getValue(),
          footer: props => props.column.id,
        },
         {
          accessorFn: row => row.lastName,
          id: 'lastName',
          cell: info => info.getValue(),
          header: () => 'Last Name',
          footer: props => props.column.id,
        },
      ],
    //},
    {
      header: 'Info',
      footer: props => props.column.id,
      columns: [
        {
          accessorKey: 'age',
          header: () => 'Age',
          footer: props => props.column.id,
        },
        {
          header: 'More Info',
          columns: [
            {
              accessorKey: 'visits',
              header: () => 'Visits',
              footer: props => props.column.id,
            },
            {
              accessorKey: 'status',
              header: 'Status',
              footer: props => props.column.id,
            },
            {
              accessorKey: 'progress',
              header: 'Profile Progress',
              footer: props => props.column.id,
            },
          ],
        },
      ],
    },
  ]*/

  const data = [
    {
      name: 'Device1',
      host: 'SERV01',
      port: 3000,
      description: 'Some Description 1',
      progress: 50,
    },
    {
       name: 'Device2',
      host: '10.72.127.34',
      port: 3001,
      description: 'Some Description 2',
      progress: 80,
    },
    {
       name: 'Device3',
      host: 'CLOUD03',
      port: 3001,
      description: 'Some Description 3 a bit longer',
      progress: 10,
    },
  ]

</script>

    <SimpleTable data={data} columns={columns}></SimpleTable>

<style>
</style>