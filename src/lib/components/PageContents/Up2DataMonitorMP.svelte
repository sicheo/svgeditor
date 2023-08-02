<script lang="ts">

import { _ } from 'svelte-i18n'
import { onMount} from "svelte";
import SimpleTable from '../Tables/SimpleTable.svelte'
import TableImage from  '../Tables/TableImage.svelte'
import TableText from  '../Tables/TableText.svelte'

import {getDevices,getPoints,getAgents,getDeviceInfo, sleep, getAgentStatus, getMachines } from '../../script/api.js'
import {mock} from '../../ustore.js'

import { flexRender, createColumnHelper } from '@tanstack/svelte-table';
import ShowPointDialog from '../Dialogs/ShowPointDialog.svelte'

export let color:any


const columnHelper  = createColumnHelper()

let devices = []
let agents = []
let points = []
let machines = []
let device:any
let agent:any
let point:any
let allagents = []

let viewOptions = { showGotoPage:false,showPageSize:false}
let refreshDataExtDev:any
let refreshDataExtAg:any
let refreshDataExtPnt:any

onMount(async ()=>{
	   let response = await getDevices(null,$mock)
	   devices = JSON.parse(JSON.stringify(response.data))
	   response = await getAgents(null,$mock)
       allagents = JSON.parse(JSON.stringify(response.data))
	   response = await getMachines(null,$mock)
       machines = JSON.parse(JSON.stringify(response.data))
	   refreshDataExtDev()
	   await sleep(1000)
	   let src = '/GREENCIRCLE.svg'
	   for(let i=0;i<devices.length;i++){
		   const image = document.getElementById("img-generic"+devices[i].uid)
		   if(image){
				const ret = await getDeviceInfo(devices[i].host,devices[i].port,'https',$mock)
				if(ret.error)
					src = '/REDCIRCLE.svg'
				else
					src = '/GREENCIRCLE.svg'
			
				image.src = src
			}
	   }
    });

	const setAgentImage = async (agents:any,device:any) =>{
		console.log("SET AGENT IMAGE")
		 let src = '/GREENCIRCLE.svg'
		for(let j=0;j<agents.length;j++){
			const image = document.getElementById("img-generic"+agents[j].uid)
			if(image){
					const ret = await getAgentStatus(agents[j],device,$mock)
					switch(ret.data){
						case 'RUN':
							src = '/GREENCIRCLE.svg'
							break;
						case 'IDLE':
							src = '/REDCIRCLE.svg'
							break
						case 'STOP':
							src = '/YELLOWCIRCLE.svg'
							break
						default:
							break
					}
					image.src = src
				}
		}
	}

const getMachineName = (uid:any)=>{
	let machinename = ''
	const found = machines.find((item:any)=>item.uid == uid)
	if(found)
		machinename = found.name
	return(machinename)
}
const devicecolumns = [
                    columnHelper.accessor('name', {
                        id : 'name',
                        header: () => $_("table-db-agent-db-tag"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),onClick:clickDevice,cursor:'pointer',fontsize:'12px',fontweight:'bold'}),
                    }),  
                    columnHelper.accessor('description', {
                        id : 'description',
                        header: () => $_("table-db-agent-db-description"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),fontsize:'11px'}),
                    }),
					columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'edit',
                        enableColumnFilter:false,
                        header: () => "CONNECTION",
                        cell: (props) =>   flexRender(TableImage,{image:'/GREENCIRCLE.svg',uid:props.getValue(),height:"18",classname:"image-tool-toggle",style:"cursor:default;"}),
                    }),
   ]

const agentcolumns = [
                    columnHelper.accessor('name', {
                        id : 'name',
                        header: () => $_("table-db-agent-db-tag"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),onClick:clickAgent,cursor:'pointer',fontsize:'12px',fontweight:'bold',classname:"text-tool-component-agent"}),
                    }),  
					 columnHelper.accessor('type', {
                        id : 'type',
                        header: () => $_("table-db-agent-db-description"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),fontsize:'11px'}),
                    }),
					columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'edit',
                        enableColumnFilter:false,
                        header: () => "STATUS",
                        cell: (props) =>   flexRender(TableImage,{image:'/GREENCIRCLE.svg',uid:props.getValue(),height:"18",classname:"image-tool-toggle",style:"cursor:default;"}),
                    }),
   ]

   const pointcolumns = [
                    columnHelper.accessor('tag', {
                        id : 'tag',
                        header: () => $_("table-db-agent-db-tag"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),onClick:clickPoint,cursor:'pointer',fontsize:'12px',fontweight:'bold',classname:"text-tool-component-point"}),
                    }),  
                    columnHelper.accessor('description', {
                        id : 'description',
                        header: () => $_("table-db-agent-db-description"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),fontsize:'11px'}),
                    }),
					columnHelper.accessor('machine', {
                        id : 'machine',
                        header: () => $_("table-db-agent-db-description"),
                        cell: (props) =>  flexRender(TableText,{text:getMachineName(props.getValue()),fontsize:'11px'}),
                    }),
					columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'edit',
                        enableColumnFilter:false,
                        header: () => "VIEW",
                        cell: (props) =>   flexRender(TableImage,{image:'/EYE.svg',onClick:clickPointView,uid:props.getValue(),height:"18",classname:"image-tool-toggle",style:"cursor:pointer;"}),
                    }),
   ]

const clickDevice = async(ev:any)=>{
	
	device = devices.find((items:any)=> items.name == ev.target.innerHTML)
	if(device){
		const ret = await getDeviceInfo(device.host,device.port,'https',$mock)
		if(ret.error){
			alert("DEVICE NOT REACHABLE")
			agents=[]
			refreshDataExtAg()
			points= []
			refreshDataExtPnt()
		}else{
			agents  = allagents.filter((item:any)=>item.devuid == device.uid)
			refreshDataExtAg()
			await sleep(1000)
			await setAgentImage(agents,device)
			points= []
			refreshDataExtPnt()
		}
		toggleSelection(ev.target)
	}
}

const clickAgent = async(ev:any)=>{
	await setAgentImage(agents,device)
	agent = agents.find((items:any)=> items.name == ev.target.innerHTML)
	if(agent){
		const ret = await getAgentStatus(agent,device,$mock)
		switch(ret.data){
			case 'RUN':
				const filters = [{op:'eq',name:'agent',value:agent.uid}]
				const response  = await getPoints(filters,$mock)
				points = response.data
				refreshDataExtPnt()
				break;
			case 'IDLE':
				alert("AGENT NOT REACHABLE")
				points=[]
				break;
			case 'STOP':
				alert("AGENT STOPPED")
				points=[]
				break;
		}
	}
	refreshDataExtPnt()
	toggleSelection(ev.target,"text-tool-component-agent")
}

const clickPoint = async(ev:any)=>{
	point = points.find((items:any)=> items.tag == ev.target.innerHTML)
	console.log("SELECTED POINT >>>>>>",point)
	toggleSelection(ev.target,"text-tool-component-point")
}

const clickPointView = async(ev:any)=>{
	const uid = ev.target.getAttribute("data-uid")
	point = points.find((item:any)=>item.uid == uid)
	const dialogdiv = document.getElementById("show-point-dialog")
	console.log("VIEW", dialogdiv)
    if(dialogdiv)
            dialogdiv.style.display = 'block'
}

const toggleSelection = (target,classname="text-tool-component")=>{
	const spans = document.getElementsByClassName(classname)
	for(let i=0;i<spans.length;i++){
		spans[i].style.backgroundColor  = 'white'
	}
	if(target.style.backgroundColor  != 'yellow')
		target.style.backgroundColor  = 'yellow'
	else
		target.style.backgroundColor  = 'white'
}


</script>


<div class="monitor-body-class" >
	<div class="row up">
		<div class="class-row-up-toolbar">
				<span>ALARMS</span>
			</div>
	</div>
	<div class="row down">
		<div class="column left">
			<div class="class-column-left-toolbar">
				<span>SELECT DEVICE</span>
			</div>
			<SimpleTable fontsize='13px' pagesize="5" viewOptions={viewOptions} bind:data={devices} columns={devicecolumns} color={color} bind:refreshDataExt={refreshDataExtDev}></SimpleTable>
		</div>
		<div class="column center">
			<div class="class-column-left-toolbar">
				<span>SELECT AGENT</span>
			</div>
			<SimpleTable fontsize='13px' pagesize="5" viewOptions={viewOptions} bind:data={agents} columns={agentcolumns} color={color} bind:refreshDataExt={refreshDataExtAg}></SimpleTable>	
		</div>
		<div class="column right">
			<div class="class-column-left-toolbar">
				<span>SELECT POINT</span>
			</div>
			<SimpleTable fontsize='13px' pagesize="5" viewOptions={viewOptions} bind:data={points} columns={pointcolumns} color={color} bind:refreshDataExt={refreshDataExtPnt}></SimpleTable>
		</div>
	</div>
</div>

<div id="show-point-dialog">
        <ShowPointDialog bind:point={point} {color}/>
</div>

<style>
.monitor-body-class{
  display: block;
  clear: both;
}

.row {
  display: block;
}

.up{
	display:flex;
	margin-top: 10px;
    padding: 10px;
}

.down{
	display:flex;
}

.column {
  float: left;
}

.left {
  margin-top: 10px;
  padding: 10px;
  width: 30%;
}

.center {
  margin-top: 10px;
  padding: 10px;
  width: 20%;
}

.right {
 margin-top: 10px;
  padding: 10px;
  width: 35%;
}


.class-column-left-toolbar{
	border: 1px solid;
	display:block;
	justify-content: space-between;
	background-color: #eeeeee;
}


.class-column-left-toolbar span{
	font-weight: bold;
	margin-left: 5px ;
}

.class-row-up-toolbar{
	border: 1px solid;
	display:block;
	justify-content: space-between;
	background-color: #eeeeee;
	width:100%;
}

.class-row-up-toolbar span{
	font-weight: bold;
	margin-left: 5px ;
}

#show-point-dialog{
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