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
    const dialog = document.getElementById(dialogOptions.divname)
    if(dialog)
        dialog.style.display = 'none'
}

const saveFunc = async(event:any) =>{
	const response = await dialogOptions.func(dialogOptions.row,$mock)
	console.log("GENERIC SAVE",dialogOptions)
	const dialog = document.getElementById(dialogOptions.divname)
	if(!dialogOptions.norefresh){
		const eventShow = new CustomEvent("refreshtable",{detail: data});
		tablediv.dispatchEvent(eventShow)
	}
	if(dialog)
		dialog.style.display = 'none'
	
}



</script>

<div class="up2twin-dialog-class" style="width: 20%;height: 30%;margin: auto;">
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
				<input type="button" style="margin-bottom: 10px;" on:click={saveFunc} value="{$_('dialog_save_button')}" width="25" height="25"> 
	    </div>
		
	</div>

<style>

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


</style>