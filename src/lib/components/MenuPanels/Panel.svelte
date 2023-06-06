<script lang="ts">
import { onMount} from "svelte";

export let component:any
export let node:any
export let panelcontroller:any 
export let bgcolor = '#f9f9f9'
export let title = "SOME TITLE"

let saved:any

onMount(async ()=>{
	saved = node.data
 });

const panelSave = (event:any) =>{
		node.shape.attr({stroke:'#008080'})
		panelcontroller('save',node,saved)
}

const panelHide = (event:any) =>{
		node.shape.attr({stroke:'#008080'})
		panelcontroller('hide',node,saved)
}

</script>

	<div class="property-panel-main" >
		<div class="property-panel-header">
			<input type="image" src="/SAVE.svg" on:click={panelSave} alt="Submit" width="25" height="25"> 
			<input type="image" src="/EXIT.svg" on:click={panelHide} alt="Submit" width="25" height="25"> 
			<div class="property-panel-title">{title}</div>
		</div>
		<div class="property-panel-container">
			<svelte:component this={component} bind:node={node}/>
		</div>
	</div>

<style>
.property-panel-main{
	  display:block;
}
.property-panel-container{
	min-width: 300px;
}
.property-panel-title{
	text-align: center;
	background-color: #f0f0f0;
	font-weight:bold;
}
</style>