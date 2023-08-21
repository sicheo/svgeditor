<script lang="ts">

import { _ } from 'svelte-i18n'
import {setTree } from '../../../lib/script/api.js'
import {mock,analytics} from '../../../lib/ustore.js'


export let dialogOptions : any
export let color


const exitDialog = (event:any)=>{
    const dialog = document.getElementById("build-tool-dialog")
    if(dialog)
        dialog.style.display = 'none'
}



const saveProcess = async(event:any) =>{
	console.log("SAVE",dialogOptions.data.root.value.data.name)
	// CHECK PROCESS BEFORE SAVE
	const check = isTreeValid(dialogOptions.data)
	if(check != "OK"){
		alert(check)
	}else{
		// SET MODIFICATION DATE
		const old = await setTree(dialogOptions.data,$mock)	
		const dialog = document.getElementById("build-tool-dialog")
		if(dialog)
			dialog.style.display = 'none'
	}
}

const isTreeValid =(tree:any) =>{
	// 1. TREE MUST START WITH COMPANY NODE
	// 2. LEVELS MUST BE RESPECTED
	return("OK")
}




</script>

<div class="load-dialog-class" >
		<div class="class-panel-header" style="border-bottom: 1px solid;">
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitDialog} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body" style="--color:{color};">
				{$_('dialog_save_tree')}
				<p> {dialogOptions.data.root.value.data.name} </p>
		</div>
		<div class="class-panel-footer">
				<input type="button" on:click={saveProcess} value="{$_('dialog_save_button')}" width="25" height="25"> 
	    </div>
		
	</div>

<style>
.load-dialog-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 30%;
	height: 40%;
	margin: auto;
}

.class-panel-header {
  display: block;
  text-align: right;
  background-color: #eeeeee;
}
.class-panel-body {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: var(--color);
  font-weight:bold ;
}
.class-last-item {
  margin-left: auto;
}

.class-panel-body {
  height: 60%;
}
.class-panel-body p{
  font-weight:normal ;
}
.class-panel-footer {
  display: block;
  text-align: center;
  background-color: white ;
}


</style>