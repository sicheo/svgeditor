<script lang="ts">
import { navigate } from "svelte-routing";

export let color = "#007d35"
export let bgcolor = "#d5e8d4"
export let pages = []
export let page:any

const goToPage = (e:any)=>{
	navigate(e.target.name, {replaceState:true})
}
</script>

 <div class="site-navigation-bar" style="--color:{color}; --background-color:{bgcolor}">
	<div class="site-navigation-span" style="--color:{color}; --background-color:{bgcolor}">{page}</div>
	{#each pages as Item}
		<input type="button" value="{Item.name}" name="{Item.link}" on:click={goToPage}/>
	{/each}
</div> 

<style>
  .site-navigation-bar input[type='button']{
	background-color: var(--background-color);
	color: var(--color);
	display: block;
	padding: 12px;
	border: none;
    outline: none;
	cursor: pointer;
	min-width: 100%;
	text-align: left;
 }
.site-navigation-bar input:hover {
  background-color: #ccc;
}
.site-navigation-span {
	background-color: var(--background-color);
	min-width: 100%;
	padding-top: 4px;
	padding-bottom: 3.5px;
	text-align: center;
	border-top: 1px solid;
	border-bottom: 1px solid;
}

</style>