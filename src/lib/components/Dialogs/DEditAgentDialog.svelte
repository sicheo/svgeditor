<script lang="ts">

export let color
export let dialogOptions : any
export let data = []
import { _ } from 'svelte-i18n'
import { onMount} from "svelte";

import {getImageArray,getLocalDate} from '../../script/utils.js'
import {getAgents} from '../../script/api.js'
import {mock} from '../../ustore.js'
import TableImage from '../Tables/TableImage.svelte'


const osImages = getImageArray("deviceos")
const typeImages = getImageArray("devicetype")

let tablediv
let localdata




onMount(async ()=>{
	   const uid = dialogOptions.row.uid
	   console.log("DIALOG UID", uid)
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
				<TableImage image='/add.svg'/>
				<TableImage image='/edit.svg'/>
				<TableImage image='/SAVE.svg'/>
				<TableImage image='/DELETE.svg'/>
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