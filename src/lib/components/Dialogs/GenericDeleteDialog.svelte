<script lang="ts">

import { _ } from 'svelte-i18n'
import {mock} from '../../../lib/ustore.js'
import { onMount} from "svelte";


export let dialogOptions : any
export let color
export let data = []

let tablediv

onMount(async ()=>{
       tablediv = document.getElementById("tanstack-table-id")
    });

const exitDialog = (event:any)=>{
    const dialog = document.getElementById("build-tool-dialog")
    if(dialog)
        dialog.style.display = 'none'
}

const deleteFunc = async(event:any) =>{
	const filters = [{op:'eq',name:'uid',value:dialogOptions.row.uid}]
	const response = await dialogOptions.delete(filters,$mock)
	const dialog = document.getElementById("build-tool-dialog")
	data = response.data
	const eventShow = new CustomEvent("refreshtable",{detail: data});
	tablediv.dispatchEvent(eventShow)
    if(dialog)
        dialog.style.display = 'none'
}



</script>

<div class="load-dialog-class" >
		<div class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
				<p>{dialogOptions.dialogDelete}</p>
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitDialog} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body" style="--color:{color};">
				<p>{dialogOptions.row.name}</p>
		</div>
		<div class="class-panel-footer">
				<input type="button" on:click={deleteFunc} value="{$_('dialog_delete_button')}" width="25" height="25"> 
	    </div>
		
	</div>

<style>
.load-dialog-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 20%;
	height: 30%;
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

.class-panel-body p{
  font-weight:normal ;
}
.class-last-item {
  margin-top: 15px;
}

.class-panel-body {
  height: 60%;
}
.class-panel-footer {
  display: block;
  text-align: center;
  background-color: white ;
}

.class-panel-footer input {
	margin-bottom: 10px;
}


</style>