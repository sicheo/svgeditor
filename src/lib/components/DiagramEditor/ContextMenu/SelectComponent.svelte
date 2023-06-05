<script lang="ts">

	import Select from 'svelte-select';

	export let items:any
	export let handleChange:any
	export let itemId:any
	export let value:any
	export let name:any
	

</script>
    <div class="select-component-class">
		<Select items={items} id={itemId} bind:value={value} --font-size="12px" --height="18px" placeholder={name}/>
		<input type="image" id="{itemId}" class= "item" src="/add.svg" on:click={handleChange} alt="ALT IMAGE" height="30" />
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