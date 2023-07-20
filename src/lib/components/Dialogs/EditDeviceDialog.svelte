<script lang="ts">

export let color
export let dialogOptions : any
export let data = []
import { _ } from 'svelte-i18n'
import { onMount} from "svelte";

import {getImageArray,getLocalDate} from '../../script/utils.js'


const osImages = getImageArray("deviceos")
const typeImages = getImageArray("devicetype")

let tablediv
let localdata


onMount(async ()=>{
       tablediv = document.getElementById("tanstack-table-id")
       localdata = JSON.parse(JSON.stringify(data))
    });

const exitPage = (ev:any)=>{
	const div = document.getElementById("build-tool-dialog")
    if(div)
        div.style.display = 'none'
}

const changeValue = (ev:any)=>{
	const found = data.find((item:any)=> item.uid == dialogOptions.row.uid)
	switch(ev.target.name){
		case 'type':
			found.type = ev.target.value
			break
		case 'os':
			found.os = ev.target.value
			break
		case 'name':
			found.name = ev.target.value
			break
		case 'description':
			found.description = ev.target.value
			break
		case 'host':
			found.host = ev.target.value
			break
		case 'port':
			found.port = ev.target.value
			break
	}
	found.lastmodified = getLocalDate(new Date(Date.now()))
	// TEST TABLE UPDATE
	localdata = JSON.parse(JSON.stringify(data))
	const eventShow = new CustomEvent("refreshtable",{detail: localdata});
	tablediv.dispatchEvent(eventShow)
}

</script>
    <div class="sign-edit-class">
		<div class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
				<p>{dialogOptions.dialogDelete} {dialogOptions.row.name}</p>
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body" style="--color:{color};">
			<!-- START EDIT DEVICE INPUTS-->
			<div class="labels1">
				<label for="name">{$_("table-db-device-name")}: </label>
				<label for="host">{$_("table-db-device-host")}: </label>
				<label for="port">{$_("table-db-device-port")}: </label>
				<label for="mac">{$_("table-db-device-mac")}: </label>
				<label for="brand">{$_("table-db-device-brand")}: </label>
				<label for="model">{$_("table-db-device-model")}: </label>
			</div>

			<div class="inputs1">
				<input type="text" value="{dialogOptions.row.name}" name="name" id="name" on:change={changeValue}/>
				<input type="text" value="{dialogOptions.row.host}" name="host" id="host" on:change={changeValue}/>
				<input type="text" value="{dialogOptions.row.port}" name="port" id="port" on:change={changeValue}/>
				<input type="text" value="{dialogOptions.row.hwdetails.mac}" name="mac" id="mac" on:change={changeValue}/>
				<input type="text" value="{dialogOptions.row.hwdetails.brand}" name="brand" id="brand" on:change={changeValue}/>
				<input type="text" value="{dialogOptions.row.hwdetails.model}" name="model" id="model" on:change={changeValue}/>
			</div>

			<div class="labels2">
				<label for="type">{$_("table-db-device-type")}: </label>
				<label for="os">{$_("table-db-device-os")}: </label>
				<label for="date">{$_("up2clone_auth_table_date")}: </label>
			</div>

			<div class="inputs2">
				<select name="type" id="type" value={dialogOptions.row.type} on:change={changeValue}>
					{#each typeImages as Image}
						{#if Image.value == dialogOptions.row.type}
							<option value={Image.value} selected>{Image.value}</option>
						{:else}
							<option value={Image.value}>{Image.value}</option>
						{/if}
					{/each}
				</select>
				<!--input type="text" value="" name="type" id="type" on:change={changeValue}/>
				<input type="text" value="" name="os" id="os" on:change={changeValue}/-->
				<br>
				<select name="os" id="os" value={dialogOptions.row.os} on:change={changeValue}>
					{#each osImages as Image}
						{#if Image.value == dialogOptions.row.os}
							<option value={Image.value} selected>{Image.value}</option>
						{:else}
							<option value={Image.value}>{Image.value}</option>
						{/if}
					{/each}
				</select>
				<input type="datetime-local" value="{dialogOptions.row.lastmodified}" name="date" id="date" disabled on:change={changeValue}/>
			</div>

			<div class="labels3">
				<label for="description">{$_("table-db-device-description")}: </label>
			</div>

			<div class="inputs3">
				<input size="40" type="text" value="{dialogOptions.row.description}" name="description" id="description" on:change={changeValue}/>
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
.labels1 {
    float: left;
    width: 180px;
}
.labels2 {
    float: left;
    width: 180px;
}
.labels3 {
    float: left;
    width: 180px;
}
.inputs1 {
    float: left;
    width: 200px;
}
.inputs2 {
    float: left;
    width: 200px;
}

.inputs3 {
    float: left;
    width: 200px;
}


</style>