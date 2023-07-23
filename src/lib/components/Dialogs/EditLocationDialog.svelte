<script lang="ts">

export let color
export let dialogOptions : any
export let data = []
import { _ } from 'svelte-i18n'
import { onMount} from "svelte";

import {getImageArray,getLocalDate} from '../../script/utils.js'
import {getPlants,getDepartments,getLines} from '../../script/api.js'
import {mock} from '../../ustore.js'


const osImages = getImageArray("deviceos")
const typeImages = getImageArray("devicetype")

let tablediv
let localdata
let plants = []
let departments = []
let lines = []


onMount(async ()=>{
	   let ret
	   ret = await getPlants(null,$mock)	
	   plants = ret.data
	   ret = await getDepartments(null,$mock)
	   departments = ret.data
	   ret = await getLines(null,$mock)
	   lines = ret.data
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
		case 'plant':
			found.localization.plant = ev.target.value
			break
		case 'department':
			found.localization.department = ev.target.value
			break
		case 'line':
			found.localization.line = ev.target.value
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
				<label for="plant">{$_("table-db-device-plant")}: </label>
				<label for="department">{$_("table-db-device-department")}: </label>
				<label for="line">{$_("table-db-device-line")}: </label>
			</div>

			<div class="inputs1">
				<select name="plant" id="plant" value={dialogOptions.row.localization.plant} on:change={changeValue}>
					{#each plants as Plant}
						{#if Plant.uid == dialogOptions.row.localization.plant}
							<option value={Plant.uid} selected>{Plant.name}</option>
						{:else}
							<option value={Plant.uid}>{Plant.name}</option>
						{/if}
					{/each}
				</select>
				<br>
				<select name="department" id="department" value={dialogOptions.row.localization.department} on:change={changeValue}>
					{#each departments as Dept}
						{#if Dept.uid == dialogOptions.row.localization.department}
							<option value={Dept.uid} selected>{Dept.name}</option>
						{:else}
							<option value={Dept.uid}>{Dept.name}</option>
						{/if}
					{/each}
				</select>
				<br>
				<select name="line" id="line" value={dialogOptions.row.localization.line} on:change={changeValue}>
					{#each lines as Line}
						{#if Line.uid == dialogOptions.row.localization.line}
							<option value={Line.uid} selected>{Line.name}</option>
						{:else}
							<option value={Line.uid}>{Line.name}</option>
						{/if}
					{/each}
				</select>
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

.inputs1 {
    float: left;
    width: 200px;
}



</style>