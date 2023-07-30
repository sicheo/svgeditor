<script lang="ts">

import { _ } from 'svelte-i18n'
import { onMount} from "svelte";

import {getAgentTypes,getLocalDate, getSourceDrivers, getDestinationDrivers} from '../../script/utils.js'
import TableImage from '../Tables/TableImage.svelte'
import { v4 as uuidv4 } from 'uuid';
import EditAgentDBDialog from './EditAgentDBDialog.svelte'
import GenericSaveDialog from './GenericSaveDialog.svelte'
import GenericDeleteDialog from './GenericDeleteDialog.svelte'
import {setAgent,deleteAgent} from '../../script/api.js'


export let color
export let dialogOptions : any 
export let data = []

let locagent
let agentuid 
let sdropts = []
let ddropts = []
let dbs = []
let dialog:any = EditAgentDBDialog
let intDialogOptions  = {row:{},func:null,array:[],norefresh:false,dialogDelete:$_('dialog_edit_agent'),divname:'agent-db-dialog'}

let agentTypes = getAgentTypes()
let sourcedrivers = getSourceDrivers()
let destinationdrivers = getDestinationDrivers()


let newagent = {
        uid: uuidv4(),
        name: "NEWAGENT",
        type: "SCANNER",
        description: "",
        lastmodified: getLocalDate(new Date(Date.now())),
        source: {
            name: "",
            timeout: 10,
            driver: "s7",
            server: "",
            port: 0,
            username: "",
            password: "",
			options:[]
        },
        destination: {
            name: "",
            driver: "osipi",
            timeout: 10,
            server: "",
            port: 0,
            username: "",
            password: "",
			options:[]
        },
        dbs: [],
        devuid: dialogOptions.row.uid,
        status: "ACTIVE",   
    }


onMount(async ()=>{
	  // const uid = dialogOptions.row.uid
	   /*const element = document.getElementById("sign-edit-agent-id")
	   const elementheader = document.getElementById("sign-edit-agent-id-header")
	   dragElement(element,elementheader)*/
    });

const exitPage = (ev:any)=>{
	locagent = null
	agentuid = null
	toggleInputs(true)
	const div = document.getElementById("build-tool-dialog")
    if(div)
        div.style.display = 'none'
}

const changeAgentValue = (ev:any)=>{
	dbs=[]
	const target = ev.target
	const uid = target.value
	locagent = dialogOptions.array.find((item:any)=> item.uid == target.value)
	if(locagent){
		dbs = locagent.dbs
		sdropts=getSourceOptions(locagent.source.driver)
		ddropts=getDestinationOptions(locagent.destination.driver)
	}else{
		locagent = newagent
	}
	
}

const toggleInputs = (val:boolean)=>{
	const inputs = document.getElementsByClassName("class-edit-agent")
	for(let i=0; i< inputs.length; i++){
		inputs[i].disabled = val
	}
}
const changeValue = (ev:any)=>{
	const target = ev.target
	switch(target.id){
		case 'name':
			locagent.name = target.value
			break
		case 'description':
			locagent.description = target.value
			break
	}
}
const changeValueSource = (ev:any)=>{
	const target = ev.target
	switch(target.id){
		case 'sourcetimeout':
			locagent.source.timeout = target.value
			break
		case 'sourcepassword':
			locagent.source.password = target.value
			break
		case 'sourceusername':
			locagent.source.username = target.value
			break
		case 'sourcename':
			locagent.source.name = target.value
			break
		case 'sourceserver':
			locagent.source.server = target.value
			break
		case 'sourceport':
			locagent.source.port = target.value
			break
	}
}

const changeSourceDriver = (ev:any)=>{
	const target = ev.target
	locagent.source.driver = target.value
	sdropts=getSourceOptions(target.value)
}

const changeValueDestination = (ev:any)=>{
	const target = ev.target
	console.log(target.id)
	switch(target.id){
		case 'destinationtimeout':
			locagent.destination.timeout = target.value
			break
		case 'destinationpassword':
			locagent.destination.password = target.value
			break
		case 'destinationusername':
			locagent.destination.username = target.value
			break
		case 'destinationname':
			locagent.destination.name = target.value
			break
		case 'destinationserver':
			locagent.destination.server = target.value
			break
		case 'destinationport':
			locagent.destination.port = target.value
			break
	}
}

const changeDestinationDriver = (ev:any)=>{
	const target = ev.target
	locagent.destination.driver = target.value
	ddropts=getDestinationOptions(target.value)
}

const changeAgentType = (ev:any)=>{
	const target = ev.target
	const newType = target.value
	locagent.type = newType
}

const clickEdit = () =>{
	console.log("CLICK EDIT",locagent)
	toggleInputs(false)
}
const clickSave = async() =>{
	console.log("CLICK SAVE",locagent)
	//await setAgent(locagent,$mock)
	if(locagent){
		dialog = GenericSaveDialog
		intDialogOptions  = {row:locagent,func:setAgent,array:[],norefresh:true,dialogDelete:$_('dialog_save_agent'),divname:'agent-db-dialog'}
		const dialogdiv = document.getElementById("agent-db-dialog")
		console.log("SHOW DB",dialogdiv)
		if(dialogdiv)
			dialogdiv.style.display = 'block'
	}

}
const clickDelete = async() =>{
	console.log("CLICK DELETE",locagent)
	if(locagent){
		dialog = GenericDeleteDialog
		intDialogOptions  = {row:locagent,func:deleteAgent,array:[],norefresh:true,dialogDelete:$_('dialog_save_agent'),divname:'agent-db-dialog'}
		const dialogdiv = document.getElementById("agent-db-dialog")
		console.log("DELETE DB",dialogdiv)
		//toggleInputs(true)
		if(dialogdiv)
			dialogdiv.style.display = 'block'
	}
}

const getSourceOptions = (driver:any)=>{
	const drv = sourcedrivers.find((item:any)=> item.value == driver)
	if(drv)
		return drv.options
	else
		return([])
}

const getDestinationOptions = (driver:any)=>{
	const drv = destinationdrivers.find((item:any)=> item.value == driver)
	if(drv)
		return drv.options
	else
		return([])
}

const changeButtonDB = (ev:any)=>{
	 dialog = EditAgentDBDialog
	 intDialogOptions  = {row:locagent,func:null,array:[],norefresh:true,dialogDelete:$_('dialog_edit_agent'),divname:'agent-db-dialog'}
	 const dialogdiv = document.getElementById("agent-db-dialog")
       if(dialogdiv)
            dialogdiv.style.display = 'block'
}

</script>
    
		<div class="sign-edit-class" id="sign-edit-agent-id">
			<div id="sign-edit-agent-id-header" class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
					<p>{dialogOptions.dialogDelete} {dialogOptions.row.name}</p>
					<div class="class-last-item">
						<input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
					</div>
			</div>
	
			<div class="class-panel-body" style="--color:{color};">
				<!-- START EDIT DEVICE INPUTS-->
				<div class="class-panel-body-toolbar" style="border-bottom: 1px solid;--color:{color};">
					<span>{$_("table-db-agent-choose")}</span>
					<select name="agent" id="agent-select" value={agentuid} on:change={changeAgentValue} style="margin:5px">
						<option value="" style="font-weight:bold;font-style:italic;">{$_("table-db-agent-new")}</option>
						{#each dialogOptions.array as Agent}
								<option value={Agent.uid}>{Agent.name}</option>
						{/each}
					</select>
					<TableImage image='/edit.svg' onClick={clickEdit}/>
					<TableImage image='/SAVE.svg' onClick={clickSave}/>
					<TableImage image='/DELETE.svg' onClick={clickDelete}/>
				</div>
				<div class="class-panel-body-agent" style="--color:{color};">
					{#if locagent}
						<!--span>{locagent.name}</!--span-->
						<div class="agent-show">
							<label for="name">{$_("table-db-agent-name")}</label> 
							<input name="name" id="name" class="class-edit-agent" type="text" value="{locagent.name}" on:change={changeValue} disabled/>
							<label for="type">{$_("table-db-agent-type")}</label> 
							<select class="class-edit-agent" name="type" id="agent-type-select"  on:change={changeAgentType} style="margin:5px" disabled>
								{#each agentTypes as AgentType}
									{#if AgentType.value == locagent.type}
										<option value={AgentType.value} selected>{AgentType.name}</option>
									{:else}
										<option value={AgentType.value}>{AgentType.name}</option>
									{/if}
								{/each}
							</select>
							<label for="description">{$_("table-db-agent-description")}</label> 
							<input name="description" id="description" size=40 class="class-edit-agent" type="text" value="{locagent.description}" on:change={changeValue} disabled/>
							<label for="lastmodified">{$_("table-db-agent-lastmodified")}</label> 
							<input name="lastmodified" type="datetime-local" value="{locagent.lastmodified}" disabled/>
						</div>
						{#if locagent.type == 'SCANNER' || locagent.type == 'RECORDER'}
							<div class="agent-show-source">
								<span>{$_("table-db-agent-source")}</span>
								<div class="labels1">
									<label for="sourcename">{$_("table-db-agent-source-name")} </label>
									<label for="sourcetimeout">{$_("table-db-agent-source-timeout")} </label>
									<label for="sourceserver">{$_("table-db-agent-source-server")} </label>
									<label for="sourceport">{$_("table-db-agent-source-port")} </label>
								</div>
								<div class="inputs1">
									<input type="text" value="{locagent.source.name}" class="class-edit-agent" name="sourcename" id="sourcename" on:change={changeValueSource} disabled/>
									<input type="number" value="{locagent.source.timeout}" class="class-edit-agent" name="sourcetimeout" id="sourcetimeout" on:change={changeValueSource} disabled/>
									<input type="text" value="{locagent.source.server}" class="class-edit-agent" name="sourceserver" id="sourceserver" on:change={changeValueSource} disabled/>
									<input type="text" value="{locagent.source.port}" class="class-edit-agent" name="sourceport" id="sourceport" on:change={changeValueSource} disabled/>

								</div>
								<div class="labels2">
									<label for="sourcedriver">{$_("table-db-agent-source-driver")} </label>
									<label for="sourceusername">{$_("table-db-agent-source-username")} </label>
									<label for="sourcepassword">{$_("table-db-agent-source-password")} </label>
								</div>
								<div class="inputs2">
									<select class="class-edit-agent" name="sourcedriver" id="sourcedriver"  on:change={changeSourceDriver} style="margin:5px" disabled>
										{#each sourcedrivers as Driver}
											{#if Driver.value == locagent.source.driver}
												<option value={Driver.value} selected>{Driver.name}</option>
											{:else}
												<option value={Driver.value}>{Driver.name}</option>
											{/if}
										{/each}
									</select>
									<input type="text" value="{locagent.source.username}" class="class-edit-agent" name="sourceusername" id="sourceusername" on:change={changeValueSource} disabled/>
									<input type="password" value="{locagent.source.password}" class="class-edit-agent" name="sourcepassword" id="sourcepassword" on:change={changeValueSource} disabled/>

								</div>
								<div class="labels3">
									{#each sdropts as DrvOption}
										<label for="{ DrvOption.name}">{DrvOption.name} </label>
									{/each}
								</div>
								<div class="inputs3">
									{#each sdropts as DrvOption}
										<input class="class-edit-agent" type="{DrvOption.type}" name="{DrvOption.name}" id="{DrvOption.name}" value="{locagent.source.options[DrvOption.name]}" on:change={changeValueSource} disabled/>
									{/each}
								</div>
								<div class="labels4">
										<label for="dbbutton">{$_('dialog_agent_db_label')} </label>
								</div>
								<div class="inputs4">
										<input class="class-edit-agent" type="button" name="dbbutton" id="dbbutton" value="{$_('dialog_agent_db_button')}" on:click={changeButtonDB} />
								</div>
							</div>
						{/if}
						{#if locagent.type == 'HISTORIAN'}
						<div class="agent-show-source">
							  <span>{$_("table-db-agent-destination")}</span>
							  <div class="labels1">
									<label for="destinationname">{$_("table-db-agent-destination-name")} </label>
									<label for="destinationtimeout">{$_("table-db-agent-destination-timeout")} </label>
									<label for="destinationserver">{$_("table-db-agent-destination-server")} </label>
									<label for="destinationport">{$_("table-db-agent-destination-port")} </label>
								</div>
								<div class="inputs1">
									<input type="text" value="{locagent.destination.name}" class="class-edit-agent" name="destinationname" id="destinationname" on:change={changeValueDestination} disabled/>
									<input type="number" value="{locagent.destination.timeout}" class="class-edit-agent" name="destinationtimeout" id="destinationtimeout" on:change={changeValueDestination} disabled/>
									<input type="text" value="{locagent.destination.server}" class="class-edit-agent" name="destinationserver" id="destinationserver" on:change={changeValueDestination} disabled/>
									<input type="text" value="{locagent.destination.port}" class="class-edit-agent" name="destinationport" id="destinationport" on:change={changeValueDestination} disabled/>

								</div>
								<div class="labels2">
									<label for="destinationdriver">{$_("table-db-agent-destination-driver")} </label>
									<label for="destinationusername">{$_("table-db-agent-destination-username")} </label>
									<label for="destinationpassword">{$_("table-db-agent-destination-password")} </label>
								</div>
								<div class="inputs2">
									<select class="class-edit-agent" name="destinationdriver" id="destinationdriver"  on:change={changeDestinationDriver} style="margin:5px" disabled>
										{#each destinationdrivers as Driver}
											{#if Driver.value == locagent.destination.driver}
												<option value={Driver.value} selected>{Driver.name}</option>
											{:else}
												<option value={Driver.value}>{Driver.name}</option>
											{/if}
										{/each}
									</select>
									<input type="text" value="{locagent.destination.username}" class="class-edit-agent" name="destinationusername" id="destinationusername" on:change={changeValueDestination} disabled/>
									<input type="password" value="{locagent.destination.password}" class="class-edit-agent" name="destinationpassword" id="destinationpassword" on:change={changeValueDestination} disabled/>

								</div>
								<div class="labels3">
									{#each ddropts as DrvOption}
										<label for="{ DrvOption.name}">{DrvOption.name} </label>
									{/each}
								</div>
								<div class="inputs3">
									{#each ddropts as DrvOption}
										<input class="class-edit-agent" type="{DrvOption.type}" name="{DrvOption.name}" id="{DrvOption.name}" value="{locagent.destination.options[DrvOption.name]}" on:change={changeValueDestination} disabled/>
									{/each}
								</div>
						</div>
						{/if}
					{/if}
				</div>
				<div class="class-panel-body-footer" style="border-bottom: 1px solid;--color:{color};">
					<!--span>{$_("table-db-agent-choose")}</!--span-->
				</div>
				<!-- END EDIT DEVICE INPUTS-->
			</div>
	</div>
	
		<div id="agent-db-dialog">
			<!--EditAgentDBDialog dbs={dbs} /-->
			<svelte:component this={dialog} bind:data={dbs} dialogOptions={intDialogOptions} {color}/>
		</div>
	
	

<style>

#agent-db-dialog{
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 12; /* Sit on top */
      padding-top: 100px; /* Location of the box */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

.sign-edit-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 90%;
	height: 350px;
	margin: auto;
	position: relative;
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

.class-panel-body {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: var(--color);
  font-weight:bold ;
}

.class-panel-body-toolbar {
	display:flex;
	justify-content:left
}

.class-panel-body-footer {
	display:flex;
	justify-content:left;
	position: absolute;
    bottom: 0px;
	border-top: 1px solid;
	width:100%;
	background-color: #eeeeee;
}

.class-panel-body-toolbar span{
	margin-left: 5px;
}

.agent-show {
	display:flex;
	justify-content:space-between;
	margin: 2px 10px 2px 2px;
}

.agent-show label{
	margin-left: 2px;
}

.agent-show label{
	margin-left: 5px;
	margin-right: 5px;
}

.agent-show input{
	margin-bottom: 5px;
}

.agent-show input[type=check]{
	margin-bottom: 5px;
	margin-top: 5px;
}

.agent-show-source {
	display:flex;
	justify-content:left;
	margin-top: 10px;
}

.agent-show-source span{
	margin-left: 5px;
	margin-right: 1px;
}

.labels1 {
    float: left;
    width: 150px;
}
.labels2 {
    float: left;
    width: 150px;
}
.labels3 {
    float: left;
    width: 150px;
}
.labels4 {
    float: left;
    width: 150px;
}
.inputs1 {
    float: left;
    width: 150px;
}
.inputs2 {
    float: left;
    width: 150px;
}
.inputs3 {
    float: left;
    width: 150px;
}
.inputs4 {
    float: left;
    width: 150px;
}
label,
input {
    display: block;
}
label {
    padding: 10px 0 0;
}
input {
    margin: 12px 0 0;
}
select {
    margin: 12px 0 0;
}

</style>