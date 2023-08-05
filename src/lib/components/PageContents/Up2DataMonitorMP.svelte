<script lang="ts">

import { _ } from 'svelte-i18n'
import { onMount} from "svelte";
import SimpleTable from '../Tables/SimpleTable.svelte'
import TableImage from  '../Tables/TableImage.svelte'
import TableText from  '../Tables/TableText.svelte'

import {getDevices,getPoints,getAgents,getDeviceInfo, sleep, getAgentStatus, getMachines, getNackAlarms, ackAlarm } from '../../script/api.js'
import {mock} from '../../ustore.js'

import { flexRender, createColumnHelper } from '@tanstack/svelte-table';
import ShowPointDialog from '../Dialogs/ShowPointDialog.svelte'
import ShowDeviceDialog from '../Dialogs/ShowDeviceDialog.svelte'


export let color:any


const columnHelper  = createColumnHelper()

let devices = []
let agents = []
let points = []
let machines = []
let device:any
let agent:any
let point:any
let alarm: any
let item:any
let allagents = []
let nackalarms = []

let viewOptions = { showGotoPage:false,showPageSize:false,paginationBgColor:"#FFFFFF",paginationColor:"#777777",border:'none'}
let refreshDataExtDev:any
let refreshDataExtAg:any
let refreshDataExtPnt:any
let refreshDataExtAlms:any

let timeout = 800

onMount(async ()=>{
	   let response = await getDevices(null,$mock)
	   devices = JSON.parse(JSON.stringify(response.data))
	   response = await getAgents(null,$mock)
       allagents = JSON.parse(JSON.stringify(response.data))
	   response = await getMachines(null,$mock)
       machines = JSON.parse(JSON.stringify(response.data))
	   response = await getNackAlarms($mock)
	   nackalarms =  JSON.parse(JSON.stringify(response.data))
	   refreshDataExtAlms()
	   refreshDataExtDev()
	   await sleep(timeout)
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

const getDeviceName = (uid:any)=>{
	let devicename = ''
	const found = devices.find((item:any)=>item.uid == uid)
	if(found)
		devicename = found.name
	return(devicename)
}

const getAgentName = (uid:any)=>{
	let agentname = ''
	const found = allagents.find((item:any)=>item.uid == uid)
	if(found)
		agentname = found.name
	return(agentname)
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
                        id : 'connection',
                        enableColumnFilter:false,
                        header: () => $_("table-db-device-connection").toUpperCase(),
                        cell: (props) =>   flexRender(TableImage,{image:'/GREENCIRCLE.svg',uid:props.getValue(),onClick:clickDeviceShow,height:"18",classname:"image-tool-toggle",style:"cursor:pointer;"}),
                    }),
   ]

const agentcolumns = [
                    columnHelper.accessor('name', {
                        id : 'name',
                        header: () => $_("table-db-agent-name").toUpperCase(),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),onClick:clickAgent,cursor:'pointer',fontsize:'12px',fontweight:'bold',classname:"text-tool-component-agent"}),
                    }),  
					 columnHelper.accessor('type', {
                        id : 'type',
                        header: () => $_("table-db-agent-type").toUpperCase(),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),fontsize:'11px'}),
                    }),
					columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'status',
                        enableColumnFilter:false,
                        header: () => $_("table-db-agent-status").toUpperCase(),
                        cell: (props) =>   flexRender(TableImage,{image:'/GREENCIRCLE.svg',uid:props.getValue(),height:"18",classname:"image-tool-toggle",style:"cursor:default;"}),
                    }),
   ]

   const pointcolumns = [
                    columnHelper.accessor('tag', {
                        id : 'tag',
                        header: () => $_("table-db-agent-db-tag"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),onClick:clickPoint,cursor:'pointer',fontsize:'12px',fontweight:'bold',classname:"text-tool-component-point"}),
                    }),  
					 columnHelper.accessor('type', {
                        id : 'type',
                        header: () => $_("table-db-agent-db-type").toUpperCase(),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),fontsize:'11px'}),
                    }),
                    columnHelper.accessor('description', {
                        id : 'description',
                        header: () => $_("table-db-agent-db-description").toUpperCase(),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),fontsize:'11px'}),
                    }),
					columnHelper.accessor('machine', {
                        id : 'machine',
                        header: () => $_("table-db-agent-db-machine").toUpperCase(),
                        cell: (props) =>  flexRender(TableText,{text:getMachineName(props.getValue()),fontsize:'11px'}),
                    }),
					columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'chart',
                        enableColumnFilter:false,
                        header: () =>  $_("table-db-chart").toUpperCase(),
                        cell: (props) =>   flexRender(TableImage,{image:'/EYE.svg',onClick:clickPointView,uid:props.getValue(),height:"18",classname:"image-tool-toggle",style:"cursor:pointer;"}),
                    }),
   ]

   const alarmcolumns =[
					columnHelper.accessor('tag', {
                        id : 'tag',
                        header: () => $_("table-db-agent-db-tag"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),onClick:clickAlarm,cursor:'pointer',fontsize:'12px',fontweight:'bold',classname:"text-tool-component-point"}),
                    }),  
                    columnHelper.accessor('description', {
                        id : 'description',
                        header: () => $_("table-db-agent-db-description").toUpperCase(),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),fontsize:'11px'}),
                    }),
					columnHelper.accessor('device', {
                        id : 'device',
                        header: () => $_("up2data_nav_conf_device").toUpperCase(),
                        cell: (props) =>  flexRender(TableText,{text:getDeviceName(props.getValue()),onClick:clickDevice,cursor:'pointer',fontsize:'11px'}),
                    }),
					columnHelper.accessor('agent', {
                        id : 'agent',
                        header: () => $_("table-db-device-agent").toUpperCase(),
                        cell: (props) =>  flexRender(TableText,{text:getAgentName(props.getValue()),onClick:clickAgent,cursor:'pointer',fontsize:'11px'}),
                    }),
					columnHelper.accessor('machine', {
                        id : 'machine',
                        header: () => $_("table-db-agent-db-machine").toUpperCase(),
                        cell: (props) =>  flexRender(TableText,{text:getMachineName(props.getValue()),fontsize:'11px'}),
                    }),
					columnHelper.accessor('timestamp', {
                        id : 'timestamp',
                        header: () => "TIMESTAMP",
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),fontsize:'11px'}),
                    }),
					columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'chart',
                        enableColumnFilter:false,
                        header: () => $_("table-db-chart").toUpperCase(),
                        cell: (props) =>   flexRender(TableImage,{image:'/EYE.svg',onClick:clickAlarmView,uid:props.getValue(),height:"18",classname:"image-tool-toggle",style:"cursor:pointer;"}),
                    }),
					columnHelper.accessor((row:any) => `${row.uid}`, {
                        id : 'ack',
                        enableColumnFilter:false,
                        header: () => "ACK",
                        cell: (props) =>   flexRender(TableImage,{image:'/REDCIRCLE.svg',uid:props.getValue(),onClick:acknowledgeAlarm,height:"18",classname:"image-tool-toggle",style:"cursor:pointer;"}),
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
			await sleep(timeout)
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
	toggleSelection(ev.target,"text-tool-component-point")
}

const clickPointView = async(ev:any)=>{
	const uid = ev.target.getAttribute("data-uid")
	point = points.find((item:any)=>item.uid == uid)
	item = point
	const dialogdiv = document.getElementById("show-point-dialog")
	const tablediv = document.getElementById("svelte-chart-viewer")
    const eventShowChart =  new CustomEvent("refreshchart",{detail: {item:item,from:null,to:null}});
	tablediv.dispatchEvent(eventShowChart)
    if(dialogdiv)
            dialogdiv.style.display = 'block'
}

const clickAlarm = async(ev:any)=>{
	alarm = nackalarms.find((items:any)=> items.tag == ev.target.innerHTML)
	toggleSelection(ev.target,"text-tool-component-point")
}

const clickAlarmView = async(ev:any)=>{
	const uid = ev.target.getAttribute("data-uid")
	alarm = nackalarms.find((item:any)=>item.uid == uid)
	item=alarm
	agent = allagents.find((items:any)=> items.uid == item.agent)
	const dialogdiv = document.getElementById("show-point-dialog")
	const tablediv = document.getElementById("svelte-chart-viewer")
	const from = new Date(Date.now() - 100 * 1000).toISOString()
	const to = new Date(Date.now()).toISOString()
    const eventShowChart = new CustomEvent("refreshchart",{detail: {item:item,from:from,to:to}});
	tablediv.dispatchEvent(eventShowChart)
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

const acknowledgeAlarm = async (ev:any)=>{
	const uid = ev.target.getAttribute("data-uid")
	const found = nackalarms.find((item:any)=>item.uid == uid)
	if(found){
		const ret = await ackAlarm(found,$mock)
	}
	const ret = await getNackAlarms($mock)
	nackalarms = ret.data
	refreshDataExtAlms()
	
}

const clickDeviceShow = async (ev:any)=>{
	let devinfo={}
	const uid = ev.target.getAttribute("data-uid")
	const found = devices.find((item:any)=>item.uid == uid)
	if(found){
		device = found
	}
	// https://github.com/rcruzper/express-actuator
	const dialogdiv = document.getElementById("show-device-dialog")
	const spandiv = document.getElementById("test-interval-span")
	const eventShowChart = new CustomEvent("refreshdevice",{detail: {item:device}});
	spandiv.dispatchEvent(eventShowChart)
	if(dialogdiv)
		dialogdiv.style.display = 'block'
}

</script>


<div class="monitor-body-class" >
	<div class="row up">
		<SimpleTable title="{$_("monitor-page-alarms")}" fontsize='13px' pagesize="5" viewOptions={viewOptions} bind:data={nackalarms} columns={alarmcolumns} color={color} bind:refreshDataExt={refreshDataExtAlms}></SimpleTable>
	</div>
	<div class="row down">
		<div class="column left">
			<SimpleTable title="{$_("monitor-page-device")}" fontsize='13px' pagesize="5" viewOptions={viewOptions} bind:data={devices} columns={devicecolumns} color={color} bind:refreshDataExt={refreshDataExtDev}></SimpleTable>
		</div>
		<div class="column center">
			<SimpleTable title="{$_("monitor-page-agent")}" fontsize='13px' pagesize="5" viewOptions={viewOptions} bind:data={agents} columns={agentcolumns} color={color} bind:refreshDataExt={refreshDataExtAg}></SimpleTable>	
		</div>
		<div class="column right">
			<SimpleTable title="{$_("monitor-page-point")}" fontsize='13px' pagesize="5" viewOptions={viewOptions} bind:data={points} columns={pointcolumns} color={color} bind:refreshDataExt={refreshDataExtPnt}></SimpleTable>
		</div>
	</div>
</div>

<div id="show-point-dialog" class="show-dialog">
        <ShowPointDialog bind:point={item} agent={agent} {color}/>
</div>

<div id="show-device-dialog" class="show-dialog">
        <ShowDeviceDialog bind:device={device} {color}/>
</div>

<style>
.monitor-body-class{
  display: block;
  clear: both;
}

.row {
  display: block;
  font-size: small;
}

.up{
	display:block;
	margin: 10px;
	opacity: 0.8;
	height: 280px;
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
  width: 42%;
}


.show-dialog {
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