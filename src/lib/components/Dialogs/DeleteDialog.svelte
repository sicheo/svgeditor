<script lang="ts">

import { _ } from 'svelte-i18n'
import {deleteProcess } from '../../../lib/script/api.js'
import {mock,analytics} from '../../../lib/ustore.js'


export let dialogOptions : any
export let color

const exitDialog = (event:any)=>{
    const dialog = document.getElementById("build-tool-dialog")
    if(dialog)
        dialog.style.display = 'none'
}

const delProcess = async(event:any) =>{
	console.log("** SAVE DIALOGO ***", dialogOptions.data)
	const filters = [{op:'eq',name:'uuid',value:dialogOptions.data.uuid}]
	const response = await deleteProcess(filters,$mock)
    $analytics.track('graphClear', {
                masterdoc:dialogOptions.data.doccode
        })
	const dialog = document.getElementById("build-tool-dialog")
    if(dialog)
        dialog.style.display = 'none'
}



</script>

<div class="load-dialog-class" >
		<div class="class-panel-header" style="border-bottom: 1px solid;">
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitDialog} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body" style="--color:{color};">
				{$_('dialog_delete_process')}
		</div>
		<div class="class-panel-footer">
				<input type="button" on:click={delProcess} value="{$_('dialog_delete_button')}" width="25" height="25"> 
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
.class-panel-footer {
  display: block;
  text-align: center;
  background-color: white ;
}


</style>