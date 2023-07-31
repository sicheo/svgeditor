<script lang="ts">

import { _ } from 'svelte-i18n'
import { onMount} from "svelte";
import SimpleTable from '../Tables/SimpleTable.svelte'
import TableImage from  '../Tables/TableImage.svelte'
import TableText from  '../Tables/TableText.svelte'

import {getDevices,getPoints,getAgents } from '../../script/api.js'
import {mock} from '../../ustore.js'

import { flexRender, createColumnHelper } from '@tanstack/svelte-table';

export let color:any


const columnHelper  = createColumnHelper()

let devices = []
let agents = []
let points = []
let device:any

let viewOptions = { showGotoPage:false,showPageSize:false}
let refreshDataExt:any

onMount(async ()=>{
	   const response = await getDevices(null,$mock)
       devices = response.data
	   refreshDataExt()
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
                    })
   ]

const clickDevice = async(ev:any)=>{
	device = devices.find((items:any)=> items.name == ev.target.innerHTML)
	if(device){

	}
	toggleSelection(ev.target)
	
}

const toggleSelection = (target)=>{
	const spans = document.getElementsByClassName("text-tool-component")
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
	<div class="column left">
		<div class="class-column-left-toolbar">
			<span>SELECT DEVICE</span>
		</div>
		<SimpleTable fontsize='13px' viewOptions={viewOptions} bind:data={devices} columns={devicecolumns} color={color} bind:refreshDataExt={refreshDataExt}></SimpleTable>
	</div>
	<div class="column right">
		<div class="column right up">
			<div class="class-column-left-toolbar">
				<span>SELECT AGENT</span>
			</div>
		</div>
		<div class="column right down">
			<div class="class-column-left-toolbar">
				<span>SELECT POINT</span>
			</div>
		</div>
	</div>
</div>

<style>
.monitor-body-class{
  display: flex;
  clear: both;
}

.column {
  float: left;
}

.left {
  margin-top: 10px;
  padding: 10px;
  width: 27%;
}

.right {
  display:block;
  width: 100%;
  margin-right: 5px;
  margin-top: 10px;
  height:100%;
}

.up{
	height: 50%;
}

.down{
	height: 50%;
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
</style>