<script lang="ts">

export let text = ""
export let width = '100px'
export let onClick = ()=>{}
export let cursor = 'normal'
export let fontsize = 'inherit'
export let fontweight = 'normal'
export let classname = "text-tool-component"



</script>

	<!--input type="text" class= "text-tool-component" value="{text}"  height="25" disabled/-->
	<div class="text-tool-component-div">
		<span style="--cursor:{cursor};--width:{width};--fontsize:{fontsize};--fontweight:{fontweight}" class=" text-tool-component {classname}" role="textbox" on:click={onClick}>{text}</span> 
	</div>

<style>
.text-tool-component{
	margin: 2px 2px 2px 2px;
	border: none;
	border-color: transparent;
	font-family: inherit;
	font-size: var(--fontsize);
	font-weight: var(--fontweight) ;
	padding: 1px 6px;
	width: var(--width);
	background-color: white;
	cursor: var(--cursor);
}
</style>