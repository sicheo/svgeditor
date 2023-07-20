<script lang="ts">



import {navigating } from '../../ustore.js'
import { _ } from 'svelte-i18n'
import {Circle} from "svelte-loading-spinners"
import { onMount} from "svelte";
import GenericDropDown from '../GenericDropDown.svelte'



export let dialogOptions : any
export let color

let data = []


onMount(async ()=>{
	for(let i=0;i< dialogOptions.data.length;i++){
		const blocked = dialogOptions.data[i].data.authorization.blocked
		const text = dialogOptions.data[i].name +' '+ dialogOptions.data[i].data.description +' '+ dialogOptions.data[i].data.doccode+' v'+ dialogOptions.data[i].data.authorization.version + ' '+ dialogOptions.data[i].data.lastmodified
		const dt = {id:dialogOptions.data[i].uuid,blocked:blocked, text:text}
		data.push(dt)
	}
	data = data
})


const exitDialog = (event:any)=>{
    const dialog = document.getElementById("build-tool-dialog")
    if(dialog)
        dialog.style.display = 'none'
}

const loadProcess = (event:any) =>{
		const element = document.getElementById("load-graph-redraw")
		const dialog = document.getElementById("build-tool-dialog")
		const cevent = new CustomEvent("processLoaded", 
			{
				bubbles: true,
				detail: { processUid: dialogOptions.selected }
			}
		)
		element.dispatchEvent( cevent)
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
			{#if !$navigating}
			<div class="class-panel-body" >
				<span >{$_('dialog_load_process')}</span>
				<GenericDropDown bind:data={data} bind:selected={dialogOptions.selected} placeholder={$_('dialog_drop_placheholder')}></GenericDropDown>
			 </div>
			<div class="class-panel-footer">
				<input type="button" on:click={loadProcess} value="{$_('dialog_load_button')}" width="25" height="25"> 
			  </div>
			{:else}
			  <div class="spinner-class">
				<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
			  </div>
		{/if}
		
	</div>

<style>
.load-dialog-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 50%;
	height: 60%;
	margin: auto;
}

.class-panel-header {
  display: flex;
  text-align: right;
}
.class-last-item {
  margin-left: auto;
}
.class-panel-body {
  height: 75%;
}
.class-panel-body span{
  display:block;
  text-align: center;
  font-weight: bold ;
}
.spinner-class {
	display: flex;
    align-items: center;
    justify-content: center;
}
.class-panel-footer {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

</style>