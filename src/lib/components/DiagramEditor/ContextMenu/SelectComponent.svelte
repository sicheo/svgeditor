<script lang="ts">

	import Select from 'svelte-select';

	export let items:any
	export let handleChange:any
	export let itemId:any
	export let value:any
	export let name:any
	

</script>
    <div class="select-component-class">
		<Select items={items} id={itemId} bind:value={value}/>
		<div class="item" id="{itemId}" on:click={handleChange}>{name}</div>
	</div>

<style>
.select-component-class{
	display: flex;
}
.item {
 padding: 0.3em 1.2em;
}

.item:hover {
 background-color: rgba(44, 141, 247, 0.2);
 cursor: pointer;
}
</style>