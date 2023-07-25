<script lang="ts">

export let color
export let dialogOptions : any
export let data = []
import { _ } from 'svelte-i18n'
import { onMount} from "svelte";

import {getAgentTypes,getLocalDate, getSourceDrivers, getDestinationDrivers} from '../../script/utils.js'
import TableImage from '../Tables/TableImage.svelte'
import { v4 as uuidv4 } from 'uuid';


let locagent
let agentuid 

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
            driver: "",
            server: "",
            port: 0,
            username: "",
            password: "",
        },
        destination: {
            name: "",
            driver: "",
            timeout: 10,
            server: "",
            port: 0,
            username: "",
            password: "",
        },
        dbs: [],
        devuid: dialogOptions.row.uid,
        status: "ACTIVE",   
    }


onMount(async ()=>{
	   const uid = dialogOptions.row.uid
	   console.log("DIALOG UID", dialogOptions.row)
    });

const exitPage = (ev:any)=>{
	locagent = null
	agentuid = null
	toggleInputs(true)
	const div = document.getElementById("build-tool-dialog")
    if(div)
        div.style.display = 'none'
}

const changeValue = (ev:any)=>{
	const target = ev.target
	const uid = target.value
	locagent = dialogOptions.array.find((item:any)=> item.uid == target.value)
	if(locagent){
		console.log("**** AGENT *****",locagent,dialogOptions.row)
	}else{
		console.log("**** NEW AGENT *****")
		locagent = newagent
	}
	
}

const toggleInputs = (val:boolean)=>{
	const inputs = document.getElementsByClassName("class-edit-agent")
	for(let i=0; i< inputs.length; i++){
		inputs[i].disabled = val
	}
}

const changeValueSource = (ev:any)=>{
}

const changeSourceDriver = (ev:any)=>{
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
const clickSave = () =>{
	console.log("CLICK SAVE",locagent)
}
const clickDelete = () =>{
	console.log("CLICK DELETE",locagent)
	toggleInputs(true)
}

const getSourceOptions = (driver:any)=>{
	const drv = sourcedrivers.find((item:any)=> item.value == driver)
	console.log("GET SOURCE OPTIONS", drv)
	return drv.options
}

const getDestinationOptions = (driver:any)=>{
	const drv = destinationdrivers.find((item:any)=> item.value == driver)
	console.log("GET DESTINATION OPTIONS", driver,drv,destinationdrivers)
	return drv.options
}


</script>
    
		<div class="sign-edit-class" id="sign-edit-agent-id">
			<div class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
					<p>{dialogOptions.dialogDelete} {dialogOptions.row.name}</p>
					<div class="class-last-item">
						<input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
					</div>
			</div>
	
			<div class="class-panel-body" style="--color:{color};">
				<!-- START EDIT DEVICE INPUTS-->
				<div class="class-panel-body-toolbar" style="border-bottom: 1px solid;--color:{color};">
					<span>Choose agent</span>
					<select name="agent" id="agent-select" value={agentuid} on:change={changeValue} style="margin:5px">
						<option value="" style="font-weight:bold;font-style:italic;">NEW AGENT</option>
						{#each dialogOptions.array as Agent}
								<option value={Agent.uid}>{Agent.name}</option>
						{/each}
					</select>
					<TableImage image='/edit.svg' onClick={clickEdit}/>
					<TableImage image='/SAVE.svg' onClick={clickSave}/>
					<TableImage image='/DELETE.svg' onClick={clickDelete}/>
				</div>
				<div class="class-panel-body-agent" style="border-bottom: 1px solid;--color:{color};">
					{#if locagent}
						<!--span>{locagent.name}</!--span-->
						<div class="agent-show">
							<label for="name">Name</label> 
							<input name="name" class="class-edit-agent" type="text" value="{locagent.name}" disabled/>
							<label for="type">Type</label> 
							<select class="class-edit-agent" name="type" id="agent-type-select"  on:change={changeAgentType} style="margin:5px" disabled>
								{#each agentTypes as AgentType}
									{#if AgentType.value == locagent.type}
										<option value={AgentType.value} selected>{AgentType.name}</option>
									{:else}
										<option value={AgentType.value}>{AgentType.name}</option>
									{/if}
								{/each}
							</select>
							<label for="description">Description</label> 
							<input name="description" size=40 class="class-edit-agent" type="text" value="{locagent.description}" disabled/>
							<label for="lastmodified">Last Modified</label> 
							<input name="lastmodified" type="datetime-local" value="{locagent.lastmodified}" disabled/>
						</div>
						{#if locagent.type == 'SCANNER' || locagent.type == 'RECORDER'}
							<div class="agent-show-source">
								<span>SOURCE</span>
								<div class="labels1">
									<label for="sourcename">Name </label>
									<label for="sourcetimeout">Timeout </label>
									<label for="sourceserver">Server </label>
									<label for="sourceport">Port </label>
								</div>
								<div class="inputs1">
									<input type="text" value="{locagent.source.name}" class="class-edit-agent" name="sourcename" id="sourcename" on:change={changeValueSource} disabled/>
									<input type="number" value="{locagent.source.timeout}" class="class-edit-agent" name="sourcetimeout" id="sourcetimeout" on:change={changeValueSource} disabled/>
									<input type="text" value="{locagent.source.server}" class="class-edit-agent" name="sourceserver" id="sourceserver" on:change={changeValueSource} disabled/>
									<input type="text" value="{locagent.source.port}" class="class-edit-agent" name="sourceport" id="sourceport" on:change={changeValueSource} disabled/>

								</div>
								<div class="labels2">
									<label for="sourcedriver">Driver </label>
									<label for="sourceusername">Userid </label>
									<label for="sourcepassword">Password </label>
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
									{#each getSourceOptions(locagent.source.driver) as DrvOption}
										<label for="{ DrvOption.name}">{DrvOption.name} </label>
									{/each}
								</div>
								<div class="input3">
									{#each getSourceOptions(locagent.source.driver) as DrvOption}
										<input class="class-edit-agent" type="{DrvOption.type}" name="{DrvOption.name}" id="{DrvOption.name}" value="{locagent.source.options[DrvOption.name]}" disabled/>
									{/each}
								</div>
							</div>
						{/if}
						{#if locagent.type == 'HISTORIAN'}
						<div class="agent-show-source">
							  <span>DESTINATION</span>
							  <div class="labels1">
									<label for="destinationname">Name </label>
									<label for="destinationtimeout">Timeout </label>
									<label for="destinationserver">Server </label>
									<label for="destinationport">Port </label>
								</div>
								<div class="inputs1">
									<input type="text" value="{locagent.destination.name}" class="class-edit-agent" name="destinationname" id="destinationname" on:change={changeValueSource} disabled/>
									<input type="number" value="{locagent.destination.timeout}" class="class-edit-agent" name="destinationtimeout" id="destinationtimeout" on:change={changeValueSource} disabled/>
									<input type="text" value="{locagent.destination.server}" class="class-edit-agent" name="destinationserver" id="destinationserver" on:change={changeValueSource} disabled/>
									<input type="text" value="{locagent.destination.port}" class="class-edit-agent" name="destinationport" id="destinationport" on:change={changeValueSource} disabled/>

								</div>
								<div class="labels2">
									<label for="destinationdriver">Driver </label>
									<label for="destinationusername">Userid </label>
									<label for="destinationpassword">Password </label>
								</div>
								<div class="inputs2">
									<select class="class-edit-agent" name="destinationdriver" id="destinationdriver"  on:change={changeSourceDriver} style="margin:5px" disabled>
										{#each destinationdrivers as Driver}
											{#if Driver.value == locagent.destination.driver}
												<option value={Driver.value} selected>{Driver.name}</option>
											{:else}
												<option value={Driver.value}>{Driver.name}</option>
											{/if}
										{/each}
									</select>
									<input type="text" value="{locagent.destination.username}" class="class-edit-agent" name="destinationusername" id="destinationusername" on:change={changeValueSource} disabled/>
									<input type="password" value="{locagent.destination.password}" class="class-edit-agent" name="destinationpassword" id="destinationpassword" on:change={changeValueSource} disabled/>

								</div>
								<div class="labels3">
									{#each getDestinationOptions(locagent.destination.driver) as DrvOption}
										<label for="{ DrvOption.name}">{DrvOption.name} </label>
									{/each}
								</div>
								<div class="input3">
									{#each getDestinationOptions(locagent.destination.driver) as DrvOption}
										<input class="class-edit-agent" type="{DrvOption.type}" name="{DrvOption.name}" id="{DrvOption.name}" value="{locagent.destination.options[DrvOption.name]}" disabled/>
									{/each}
								</div>
						</div>
						{/if}
					{/if}
				</div>
				<!-- END EDIT DEVICE INPUTS-->
			</div>
	</div>
	

<style>

.sign-edit-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 90%;
	height: 350px;
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

.class-panel-body-toolbar span{
	margin-left: 5px;
}

.agent-show {
	display:flex;
	justify-content:space-between;
}

.agent-show span{
	margin-left: 5px;
}

.agent-show label{
	margin-left: 5px;
	margin-right: 5px;
}

.agent-show input{
	margin-bottom: 5px;
}

.agent-show-source {
	display:flex;
	justify-content:left;
	margin-top: 10px;
}

.agent-show-source span{
	margin-left: 5px;
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
.inputs1 {
    float: left;
    width: 150px;
}
.inputs2 {
    float: left;
    width: 180px;
}
.inputs3 {
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