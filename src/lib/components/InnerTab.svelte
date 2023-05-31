<script lang="ts">
export let component:any
export let options:any = {}
export let color = "#007d35"
export let bgcolor = "#d5e8d4"

</script>

<div class="inner-tab-component" style="--color:{color}; --background-color:{bgcolor}">
	<svelte:component this={component} bind:options={options} {color} {bgcolor}/>
</div>

<style>
.inner-tab-component{
	color: var(--color);
	 background-color: var(--background-color);
	 border-top: 1px solid var(--color);
	 border-bottom: 1px solid var(--color);
}
</style>