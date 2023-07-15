<script lang="ts">

export let image = "/BUDDY.png"
export let style  = "enabled"
export let onClick = ()=>{console.log("TST CLICK")}
export let name = 'img-generic'
export let uid = 'abcdefgh'
</script>
	
	<input type="image" id={name} data-uid={uid} style="{style}" class="image-tool-component" src="{image}" alt="ALT IMAGE" height="25" on:click={onClick}/>
	
<style>


.image-tool-component {
	margin: 2px 2px 2px 2px;
	opacity: 1.0;
}


</style>