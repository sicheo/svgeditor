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



</style>