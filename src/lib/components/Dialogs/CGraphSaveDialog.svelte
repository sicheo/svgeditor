<script lang="ts">

import { _ } from 'svelte-i18n'
import {setProcess } from '../../../lib/script/api.js'
import {mock,analytics} from '../../../lib/ustore.js'
import { v4 as uuidv4 } from 'uuid';



export let dialogOptions : any
export let color

let newversion = dialogOptions.data.data.authorization.version

const exitDialog = (event:any)=>{
    const dialog = document.getElementById("build-tool-dialog")
    if(dialog)
        dialog.style.display = 'none'
}



const saveProcess = async(event:any) =>{
	console.log(" SAVE PROCESS ",dialogOptions.data)
	if(newversion != dialogOptions.data.data.authorization.version){
		dialogOptions.data.data.authorization.version = newversion
		dialogOptions.data.uuid = uuidv4()
		dialogOptions.data.data.authorization.blocked = false
	}
	// CHECK PROCESS BEFORE SAVE
	const check = isProcessValid(dialogOptions.data)
	if(check != "OK"){
		alert(check)
	}else{
		// SET MODIFICATION DATE
		dialogOptions.data.lastmodified = new Date(Date.now()).toISOString()
		const old = await setProcess(dialogOptions.data,$mock)
		$analytics.track('graphSave', {
				masterdoc: dialogOptions.data.doccode
		})
		const dialog = document.getElementById("build-tool-dialog")
		if(dialog)
			dialog.style.display = 'none'
	}
}

const isProcessValid =(process:any) =>{
	// 1. Process must have valid version
	if(!process.data.authorization)
		return($_('err_process_miss-auth'))
	if(!process.data.authorization.version || process.data.authorization.version == "")
		return($_('err_process_miss-ver'))
	if(process.data.authorization.blocked)
		return($_('err_process_blocked'))
	return("OK")
}

const onRadioChange = (ev:any)=>{
	const target = ev.target
	const input = document.getElementById("save-dialog-version-input")
	switch(target.id){
		case 'rd1':
			input.disabled = true
			newversion = dialogOptions.data.data.authorization.version
			break;
		case 'rd2':
			input.disabled = false
			newversion = input.value
			break
	}
}

const onTextChange = (ev:any)=>{
	const target = ev.target
	newversion = target.value
}

</script>

<div class="load-dialog-class" >
		<div class="class-panel-header" style="border-bottom: 1px solid;">
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitDialog} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body" style="--color:{color};">
				{$_('dialog_save_process')}
				<p>{dialogOptions.data.name} {dialogOptions.data.description} v{dialogOptions.data.data.authorization.version}</p>
				<label class="container">{$_('dialog_save_keepversion')}
					<input type="radio" id="rd1" checked={true} name="radio" on:change={onRadioChange}>
					<span class="checkmark"></span>
				</label>
				<label class="container">{$_('dialog_save_changeversion')}
					<input type="radio" id="rd2"  name="radio" on:change={onRadioChange}>
					<span class="checkmark"></span>
				</label>
				<p>
				<label class="container">{$_('dialog_save_newversion')}
					<input type="text" on:change={onTextChange} id="save-dialog-version-input" value="{dialogOptions.data.data.authorization.version}" disabled>
				</label></p>
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