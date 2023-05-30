<script lang="ts">
export let color = "#007d35"
export let bgcolor = "#d5e8d4"

</script>

<div class="inner-tab-component" style="--color:{color}; --background-color:{bgcolor}">
</div>

<style>
.inner-tab-component{
	color: var(--color);
	background-color: var(--background-color);
	min-height: 85vh; 
	min-width: 85vw;
}
</style>