<script lang="ts">

import SimpleTable from '../Tables/SimpleTable.svelte'
import TableImage from  '../Tables/TableImage.svelte'
import TableText from  '../Tables/TableText.svelte'

import { onMount} from "svelte";
import {mock} from '../../ustore.js'
import {getDevices} from '../../script/api.js'
import {ping,getDeviceInfo} from '../../script/api.js'
import Up2TwinDocker from '../PageContents/Up2TwinDocker.svelte'
import Up2TwinInstall from '../PageContents/Up2TwinInstall.svelte'
import Up2TwinDeploy from '../PageContents/Up2TwinDeploy.svelte'




import { flexRender, createColumnHelper } from '@tanstack/svelte-table';
    import App from '../../../App.svelte';
 

  
   export let color:any

    let data = []
    let divParams
    let dialog:any 
    let dialogOptions:any = {}


   const columnHelper  = createColumnHelper()

   const findDevice = (target:any) =>{
       const id = target.id.split("_")[1]
       const found = data.find((item:any)=> item.uid == id)
       console.log("** FIND DEVICE **",found)
       return(found)
   }

   onMount(async ()=>{
       const response = await getDevices(null,$mock)
       data = response.data

       divParams = document.getElementById("modal-master-params-div-id")
    });

    let promise = getDevices(null,$mock)

    const toggleConnection = (target:any) =>{
        const id = target.id
        const docker = document.getElementById("docker-img-tool_"+id)
        const install = document.getElementById("install-img-tool_"+id)
        const deploy = document.getElementById("deploy-img-tool_"+id)

        if(target.style.backgroundColor == 'lightgrey'){
            target.style.backgroundColor = 'lightgreen'
            if(docker)
                docker.setAttribute("style","opacity:0.3;cursor:default;pointer-events: none;")
            if(install)
                install.setAttribute("style","opacity:0.3;cursor:default;pointer-events: none;")
            if(deploy)
                deploy.setAttribute("style","opacity:1.0;cursor:dafult;pointer-events:auto;")
        }else{
            target.style.backgroundColor = 'lightgrey'
            if(docker)
                docker.setAttribute("style","opacity:1.0;cursor:dafult;pointer-events:auto;")
            if(install)
                install.setAttribute("style","opacity:1.0;cursor:dafult;pointer-events:auto;")
            if(deploy)
                deploy.setAttribute("style","opacity:0.3;cursor:default;pointer-events: none;")
        }
    }

   const onConnection = async(ev:any) =>{
      const target = ev.target
      const id = target.id
      // GET DATA ROW
      const found = data.find((item:any)=> item.uid == id)
      if(found){
          // CHECK PING
          const res = await ping(found.host,{ timeout: 5, min_replay: 2 }, $mock)
          if(!res.error){
              // CHECK CONNECTION
              const conn = await getDeviceInfo(found.host,found.port,'https',$mock)
               if(!conn.error){
                console.log("*** CONNECTION RESPONSE ****",conn)
                toggleConnection(target)
               }
          }
      }else{
          alert("DEVICE NOT FOUND")
      }
  }

  const onInstall = (ev:any)=>{
      dialog = Up2TwinInstall
      dialogOptions['title'] = "INSTALL"
      dialogOptions['device'] =  findDevice(ev.target)
      if(divParams){
        divParams.style.display = 'block'
        
     }
   }

   const onDeploy = (ev:any)=>{
       dialog = Up2TwinDeploy
       dialogOptions['title'] = "DEPLOY"
       dialogOptions['device'] =  findDevice(ev.target)
       if(divParams){
        divParams.style.display = 'block'
        
     }
   }

   const onDocker = (ev:any)=>{
       dialog = Up2TwinDocker
       dialogOptions['title'] = "DOCKER"
       dialogOptions['device'] =  findDevice(ev.target)
       console.log("*** ON DOCKER **",dialogOptions.device)
       if(divParams){
        divParams.style.display = 'block'
        
     }
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
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'connection',
                        header: () => 'CONNECTION',
                        cell: (props) =>   flexRender(TableImage,{image:'/CONNECTION.svg',style:"background-color: lightgrey;",name:props.getValue(), onClick:onConnection}),
                    }),
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'install',
                        header: () => 'SSH',
                        cell: (props) =>   flexRender(TableImage,{image:'/TERMINAL.svg',style:"opacity:1.0;cursor:dafult;pointer-events:auto",name:'install-img-tool_'+props.getValue(), onClick:onInstall}),
                    }),
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'docker',
                        header: () => 'DOCKER',
                        cell: (props) =>   flexRender(TableImage,{image:'/DOCKER.svg',style:"opacity:1.0;cursor:dafult;pointer-events:auto",name:'docker-img-tool_'+props.getValue(),onClick:onDocker}),
                    }),
                    columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'deploy',
                        header: () => 'DEPLOY',
                        cell: (props) =>   flexRender(TableImage,{image:'/DEPLOY.svg',style:"opacity:0.3;cursor:default;pointer-events: none;",name:'deploy-img-tool_'+props.getValue(),onClick:onDeploy}),
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

    <div class="modal-master-params-div" id="modal-master-params-div-id" data-process=''>
		<div class="modal-editor-master-params-content">
            <svelte:component this={dialog} bind:dialogOptions={dialogOptions} {color}/>
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
.modal-master-params-div {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
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
.modal-editor-master-params-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 90%;
}

</style>