<script lang="ts">

import { _ } from 'svelte-i18n'
import { onMount} from "svelte";
import { v4 as uuidv4 } from 'uuid';
import {getPoints,getControllers, setPoint, deletePoint} from '../../script/api.js'
import {mock} from '../../ustore.js'
import TableImage from  '../Tables/TableImage.svelte'
import TableText from  '../Tables/TableText.svelte'
import SimpleTable from '../Tables/SimpleTable.svelte'
import {uploadFile,downloadCSV} from '../../script/utils.js'
import Papa from 'papaparse'



import { flexRender, createColumnHelper } from '@tanstack/svelte-table';
    import { A, Point } from '@svgdotjs/svg.js';


export let data = []
export let color 
export let dialogOptions : any 

let viewOptions = { showGotoPage:false,showPageSize:false,paginationBgColor:"#FFFFFF",paginationColor:"#777777",border:'none'}
let dbuid 
let localdb
let points = []
let currpoint = null
let controllers = []

const columnHelper  = createColumnHelper()
let refreshDataExt:any

let newdb = {
	  uid: uuidv4(),
	  name: 'newdb.csv'
}

onMount(async ()=>{
	   const  res = await getControllers(null,$mock)
       controllers = res.data
	   if(!controllers)
			controllers = []
    });

const exitDialog = (event:any)=>{
	localdb = null
	dbuid = null
	points=[]
	currpoint=null
	toggleDisable(true)
	refreshDataExt()
    const dialog = document.getElementById("agent-db-dialog")
    if(dialog)
        dialog.style.display = 'none'
}


const changeDBValue = async(ev:any)=>{
	points = []
	currpoint=null
	const target = ev.target
	localdb = data.find((item:any)=> item.uid == target.value)
	if(localdb){
		const filters = [
			{op:'eq',name:'agent',value:dialogOptions.row.uid},
			{op:'eq',name:'db',value:localdb.uid}
		]
		const res = await getPoints(filters,$mock)
		points = res.data
		points = points
	}else{
		localdb = newdb
	}
	refreshDataExt()
}

const clickEdit = ()=>{
	toggleDisable(false)
}

const clickUpload = (ev:any)=>{
	// TRASFORM points INTO CSV STRING
	if(localdb){
		const csv = Papa.unparse(points)
		const filename = localdb.name
		uploadFile(csv,filename)
	}
}

const clickDownload = ()=>{
	const element = document.getElementById("file-db-input")
		if(element)
			element.click()
}

const downloadDB = async (evt:any)=>{
	let file = evt.target.files[0];
	const filepoints = await downloadCSV(file)
	points = filepoints
	refreshDataExt()
	// UPDATE DATA
	for(let i=0;i<data.length;i++){
		if(data[i].uid == localdb.uid)
			data[i].uid=evt.target.files[0].name
	}
	localdb.name = evt.target.files[0].name
}

const clickDeleteDb = async (ev:any)=>{
	let filters = [
			{op:'eq',name:'agent',value:dialogOptions.row.uid},
			{op:'eq',name:'db',value:localdb.uid}
		]
	let ret = await deletePoint(filters,$mock)

}

const clickSave = async()=>{
	// SAVE POINTS
	let res = await setPoint(currpoint,$mock)
	// IF NEW DB SAVE NEW DB
	const dbuid = localdb.uid
	const found = data.find((item:any)=> item.uid == dbuid)
	if(!found)
		data.push(localdb)
	const filters = [
			{op:'eq',name:'agent',value:dialogOptions.row.uid},
			{op:'eq',name:'db',value:localdb.uid}
		]
	res = await getPoints(filters,$mock)
	points = res.data
	refreshDataExt()
}

const clickDelete = async ()=>{
	let filters = [
			{op:'eq',name:'uid',value:currpoint.uid}
		]
	let ret = await deletePoint(filters,$mock)
	filters = [
			{op:'eq',name:'agent',value:dialogOptions.row.uid},
			{op:'eq',name:'db',value:localdb.uid}
		]
	ret = await getPoints(filters,$mock)
	points = ret.data
	currpoint=null
	refreshDataExt()

}

const clickAdd = ()=>{
	let area = ''
	switch(dialogOptions.row.driver){
		case 's7':
			area = 'DB'
			break;
		case 'modbus':
			area= 'COIL'
			break;
	}
	const newpoint = {
		uid:uuidv4(),
		tag:'NEWPOINT',
		driver:dialogOptions.row.source.driver,
		agent:dialogOptions.row.uid,
		device:dialogOptions.row.devuid,
		controller:'',
		machine:'',
		amount:1,
		hlim:0.0,
		llim:0.0,
		delta:false,
		db: localdb.uid,
		description:"",
		address:0,
		bit:0,
		dtype:'bool',
		atype:'DIGITAL',
		type:'ALARM',
		area:area,
		numarea: 0,
		ack:false
	}
	currpoint=newpoint

}

const changeValuePoint = (ev:any)=>{
	const target = ev.target
	switch(target.id){
		case 'point-tag':
			currpoint.tag = target.value
			break;
		case 'point-address':
			currpoint.address = target.value
			break;
		case 'point-um':
			currpoint.um = target.value
			break;
		case 'point-bit':
			currpoint.bit = target.value
			break;
		case 'point-description':
			currpoint.description = target.value
			break;
		case 'point-atype':
			currpoint.atype = target.value
			break;
		case 'point-type':
			currpoint.type = target.value
			break;
		case 'point-hlim':
			currpoint.hlim = target.value
			break;
		case 'point-llim':
			currpoint.llim = target.value
			break;
	}
	currpoint=currpoint
}

const changeSelectValue = (ev:any)=>{
	const target = ev.target
	switch(target.id){
		case 'point-atype':
			currpoint.atype = target.value
			break;
		case 'point-type':
			currpoint.type = target.type
			break;
		case 'point-controller':
			currpoint.controller = controllers.find((item:any) => item.name == target.value).uid
			break;
	}
}

const toggleDisable= (disable:boolean)=>{
	const items = document.getElementsByClassName("class-edit-point")
	for(let i=0;i<items.length;i++){
		items[i].disabled = disable
	}
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
const clickTag = (ev:any)=>{
	currpoint = points.find((items:any)=> items.tag == ev.target.innerHTML)
	toggleSelection(ev.target)
	
}

const columns = [
                    columnHelper.accessor('tag', {
                        id : 'tag',
                        header: () => $_("table-db-agent-db-tag"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),onClick:clickTag,cursor:'pointer',fontsize:'12px',fontweight:'bold'}),
                    }),  
                    columnHelper.accessor('description', {
                        id : 'description',
                        header: () => $_("table-db-agent-db-description"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),fontsize:'11px'}),
                    }),
					columnHelper.accessor('address', {
                        id : 'address',
						enableColumnFilter:false,
                        header: () => $_("table-db-agent-db-address"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),fontsize:'11px'}),
                    }),
   ]

const atypes = [
	{name:'ANALOG',value:'ANALOG'},
	{name:'DIGITAL',value:'DIGITAL'},
]

const types = [
	{name:'TEMPERATURE',value:'TEMPERATURE'},
	{name:'PRESSURE',value:'PRESSURE'},
	{name:'HUMIDITY',value:'HUMIDITY'},
	{name:'SPEED',value:'SPEED'},
	{name:'CURRENT',value:'CURRENT'},
	{name:'VOLTAGE',value:'VOLTAGE'},
	{name:'NUMBER',value:'NUMBER'},
	{name:'FLOW',value:'FLOW'},
	{name:'ALARM',value:'ALARM'},
	{name:'EVENT',value:'EVENT'},
]
</script>

<div class="load-dialog-class" >
		{#if dialogOptions.row.type == 'SCANNER'}
		<div class="class-panel-header" style="border-bottom: 1px solid;">
				<p>{$_("table-db-agent-db-intro")} {dialogOptions.row.name}</p>
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitDialog} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body-toolbar" style="border-bottom: 1px solid;--color:{color};">
					<span style="margin-left:5px;margin-right:5px">{$_("table-db-agent-db-choose")}</span>
					<select name="agent" id="agent-select" value={dbuid} on:change={changeDBValue} style="margin:5px">
						<option value={null} style="font-weight:bold;font-style:italic;">{$_("table-db-agent-db-new")}</option>
						{#each data as DB}
								<option value={DB.uid}>{DB.name}</option>
						{/each}
					</select>
					<TableImage image='/DOWNARROW.svg' onClick={clickDownload}/>
					<TableImage image='/UPARROW.svg' onClick={clickUpload}/>
					<TableImage image='/DELETE.svg' onClick={clickDeleteDb}/>
		</div>
		<div class="class-panel-body-agent" style="--color:{color};">
			<div class="column left table">
				<SimpleTable title="SELECT POINT" fontsize='13px' viewOptions={viewOptions} bind:data={points} columns={columns} color={color} bind:refreshDataExt={refreshDataExt}></SimpleTable>
				</div>
			<div class="column right">
				
					<div class="class-panel-column-rigth-toolbar">
						<span>{$_("table-db-agent-db-edit-point")}</span>
						<input id="file-db-input"name="file-db-input" type='file' accept=".csv" style="visibility:hidden;"  on:change={downloadDB}>

						<div class="class-last-item">
							<TableImage image='/add.svg' onClick={clickAdd}/>
							<TableImage image='/edit.svg' onClick={clickEdit}/>
							<TableImage image='/SAVE.svg' onClick={clickSave}/>
							<TableImage image='/DELETE.svg' onClick={clickDelete}/>
						</div>
					</div>
				{#if currpoint != null}
					<div class="class-panel-column-rigth-body" >
						<div class="labels1">
							<label for="point-tag">{$_("table-db-agent-db-tag")} </label>
							<label for="point-address">{$_("table-db-agent-db-address")} </label>
							{#if currpoint.atype == 'ANALOG'}
								<label for="point-um">{$_("table-db-agent-db-um")} </label>
								<label for="point-hlim">{$_("table-db-agent-db-hlim")} </label>
								<label for="point-llim">{$_("table-db-agent-db-llim")} </label>
							{:else}
								<label for="point-bit">{$_("table-db-agent-db-bit")} </label>
							{/if}
						</div>
						<div class="inputs1">
							<input type="text" size="17" style="font-weight:bold;" value="{currpoint.tag}" class="class-edit-point" name="point-tag" id="point-tag" on:change={changeValuePoint} disabled/>
							<input type="number" value="{currpoint.address}" class="class-edit-point" name="point-address" id="point-address" on:change={changeValuePoint} disabled/>
							{#if currpoint.atype == 'ANALOG'}
								<input type="text" value="{currpoint.um}" class="class-edit-point" name="point-um" id="point-um" on:change={changeValuePoint} disabled/>
								<input type="text" value="{currpoint.hlim}" class="class-edit-point" name="point-hlim" id="point-hlim" on:change={changeValuePoint} disabled/>
								<input type="text" value="{currpoint.llim}" class="class-edit-point" name="point-llim" id="point-llim" on:change={changeValuePoint} disabled/>
							{:else}
								<input type="text" value="{currpoint.bit}" class="class-edit-point" name="point-bit" id="point-bit" on:change={changeValuePoint} disabled/>
							{/if}
						</div>
						<div class="labels2">
							<label for="point-description">{$_("table-db-agent-db-description")} </label>
							<label for="point-area">{$_("table-db-agent-db-area")} </label>
							<label for="point-atype">{$_("table-db-agent-db-atype")} </label>
							<label for="point-type">{$_("table-db-agent-db-type")} </label>
							<label for="point-controller">{$_("table-db-agent-db-controller")} </label>
						</div>
						<div class="inputs2">
							<input type="text" size="38" value="{currpoint.description}" class="class-edit-point" name="point-description" id="point-description" on:change={changeValuePoint} disabled/>
							<input type="text" value="{currpoint.area}" class="class-edit-point" name="point-area" id="point-area" on:change={changeValuePoint} disabled/>
							<select class="class-edit-point" name="point-atype" id="point-atype"  on:change={changeSelectValue} style="margin:5px" disabled>
								{#each atypes as Type}
									{#if Type.value == currpoint.atype}
										<option value={Type.value} selected>{Type.name}</option>
									{:else}
										<option value={Type.value}>{Type.name}</option>
									{/if}
								{/each}
							</select>
							<select class="class-edit-point" name="point-type" id="point-type"  on:change={changeSelectValue} style="margin:5px" disabled>
								{#each types as Type}
									{#if Type.value == currpoint.type}
										<option value={Type.value} selected>{Type.name}</option>
									{:else}
										<option value={Type.value}>{Type.name}</option>
									{/if}
								{/each}
							</select>
							<select class="class-edit-point" name="point-controller" id="point-controller"  on:change={changeSelectValue} style="margin:5px" disabled>
								{#each controllers as Controller}
									{#if Controller.uid == currpoint.controller}
										<option value={Controller.uid} selected>{Controller.name}</option>
									{:else}
										<option value={Controller.uid}>{Controller.name}</option>
									{/if}
								{/each}
							</select>
						</div>
					</div>
				{/if}
			</div>
		</div>
		{/if}
	</div>

<style>
.load-dialog-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 80%;
	height: 80%;
	margin: auto;
}

.class-panel-header {
  display: flex;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
  background-color: #eeeeee;
}
.class-panel-header p{
 margin-left: 8px;
}

.class-panel-body-agent{
  display: flex;
  clear: both;
}

.class-panel-body-toolbar {
	display:flex;
	justify-content:left;
	color: var(--color);
	font-weight:bold ;
}

.column {
  float: left;
  /*padding: 10px;*/
  /*height: 300px;  Should be removed. Only for demonstration */
}

.left {
  padding: 10px;
  width: 35%;
}

.right {
  width: 65%;
  margin-right: 5px;
  margin-top: 10px;
  height:100%;
  border: 1px solid;
}
.class-panel-column-rigth-toolbar{
	border-bottom: 1px solid;
	display:flex;
	justify-content: space-between;
	background-color: #eeeeee;
}
.class-panel-column-rigth-toolbar span{
	font-weight: bold;
	margin-left: 5px ;
	font-size: small;
}
.class-panel-column-rigth-body{
	font-size: small;
}

.class-last-item {
  display:flex;
  margin-left: auto;
}
.labels1 {
    float: left;
    width: 150px;
}
.inputs1 {
    float: left;
    width: 180px;
}
.labels2 {
    float: left;
    width: 150px;
}
.inputs2 {
    float: left;
    width: 160px;
}
label,
input {
    display: block;
}
label {
    padding: 10px 5px 0;
}
input {
    margin: 8px 5px 0;
}
.inputs2 select {
   display: inline-block;
   margin-top: 15px ;
   margin-bottom: 15px ;
}
.table {
	font-size: small;
}

</style>