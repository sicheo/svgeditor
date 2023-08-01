<script lang="ts">

import { _ } from 'svelte-i18n'
import { onMount} from "svelte";
import SimpleTable from '../Tables/SimpleTable.svelte'
import TableImage from  '../Tables/TableImage.svelte'
import TableText from  '../Tables/TableText.svelte'

import {getDevices,getPoints,getAgents,getDeviceInfo, sleep } from '../../script/api.js'
import {mock} from '../../ustore.js'

import { flexRender, createColumnHelper } from '@tanstack/svelte-table';
    import AddTools from '../InnerTabs/AddTools.svelte';

export let color:any


const columnHelper  = createColumnHelper()

let devices = []
let agents = []
let points = []
let device:any
let agent:any
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
	   refreshDataExtDev()
	   await sleep(1000)
	   let src = '/GREENCIRCLE.svg'
	   for(let i=0;i<devices.length;i++){
		   const image = document.getElementById("img-generic"+devices[i].uid)
		   if(image){
				const ret = await getDeviceInfo(devices[i].host,devices[i].port,'https',$mock)
				console.log("getDeviceConnection",devices[i].name,ret.error)
				if(ret.error)
					src = '/REDCIRCLE.svg'
				else
					src = '/GREENCIRCLE.svg'
			
				image.src = src
			}
	   }
		
    });


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
                        cell: (props) =>   flexRender(TableImage,{image:'/GREENCIRCLE.svg',uid:props.getValue(),height:"18",classname:"image-tool-toggle"}),
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
                        cell: (props) =>   flexRender(TableImage,{image:'/GREENCIRCLE.svg',uid:props.getValue(),height:"18"}),
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
                    })
   ]

const clickDevice = async(ev:any)=>{
	
	device = devices.find((items:any)=> items.name == ev.target.innerHTML)
	if(device){
		agents  = allagents.filter((item:any)=>item.devuid == device.uid)
		refreshDataExtAg()
		points= []
		refreshDataExtPnt()
	}
	toggleSelection(ev.target)
}

const clickAgent = async(ev:any)=>{
	
	agent = agents.find((items:any)=> items.name == ev.target.innerHTML)
	if(agent){
		const filters = [{op:'eq',name:'agent',value:agent.uid}]
		const response  = await getPoints(filters,$mock)
		points = response.data
		refreshDataExtPnt()
	}
	
	toggleSelection(ev.target,"text-tool-component-agent")
}

const clickPoint = async(ev:any)=>{
	toggleSelection(ev.target,"text-tool-component-point")
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
  width: 25%;
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

</style>