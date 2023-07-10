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

   const onConnection = (ev:any) =>{
      const target = ev.target
      const id = target.id
      const docker = document.getElementById("docker-img-tool"+id)
      const install = document.getElementById("install-img-tool"+id)
      const deploy = document.getElementById("deploy-img-tool"+id)
      if(target){
        target.style.backgroundColor = 'lightgreen'
        if(docker)
            docker.setAttribute("style","opacity:1.0;cursor:dafult;pointer-events:auto;")
        if(install)
            install.setAttribute("style","opacity:1.0;cursor:dafult;pointer-events:auto;")
        if(deploy)
            deploy.setAttribute("style","opacity:1.0;cursor:dafult;pointer-events:auto;")
      }
  }

  const onInstall = (ev:any)=>{

   }

   const onDeploy = (ev:any)=>{

   }

   const onDocker = (ev:any)=>{

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
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'connection',
                        header: () => 'CONNECTION',
                        cell: (props) =>   flexRender(TableImage,{image:'/CONNECTION.svg',style:"background-color: lightgrey;",name:props.getValue().uid, onClick:onConnection}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'install',
                        header: () => 'AGENT',
                        cell: (props) =>   flexRender(TableImage,{image:'/TERMINAL.svg',style:"opacity:0.3;cursor:default;pointer-events: none;",name:'install-img-tool'+props.getValue().uid, onClick:onInstall}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'docker',
                        header: () => 'SAVE',
                        cell: (props) =>   flexRender(TableImage,{image:'/DOCKER.svg',style:"opacity:0.3;cursor:default;pointer-events: none;",name:'docker-img-tool'+props.getValue().uid,onClick:onDocker}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'deploy',
                        header: () => 'EDIT',
                        cell: (props) =>   flexRender(TableImage,{image:'/DEPLOY.svg',style:"opacity:0.3;cursor:default;pointer-events: none;",name:'deploy-img-tool'+props.getValue().uid,onClick:onDeploy}),
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