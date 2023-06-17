<script lang="ts">
import { navigate } from "svelte-routing";
import {role,token,base} from '../ustore.js'

export let color = "#007d35"
export let bgcolor = "#d5e8d4"
export let pages = []
export let page:any

const goToPage = (e:any)=>{
	// DISABLE BACKNAVIGATION
	if(!$token || $token == "")
		navigate($base, {replaceState:true})
	navigate(e.target.name, {replaceState:true})
}
</script>

 <div class="site-navigation-bar" style="--color:{color}; --background-color:{bgcolor}">
	<div class="site-navigation-span" style="--color:{color}; --background-color:{bgcolor}">{page}</div>
	{#each pages as Item}
		{#if Item.roles.includes($role) && Item.type == 'link'}
			<input class="nav" type="button" value="{Item.name}" name="{Item.link}" on:click={goToPage}/>
		{:else if Item.type == 'holder'}
			<input class="placeholder" type="button" value="{Item.name}"/>
			{#each Item.subnav as SubNav}
				<input class="subnav" type="button" value="{SubNav.name}" name="{SubNav.link}" on:click={goToPage}/>
			{/each}
		{/if}
	{/each}
</div> 

<style>
  .nav{
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
.nav:hover {
  background-color: #ccc;
}
.site-navigation-span {
	background-color: var(--background-color);
	color: var(--color);
	font-weight: bold ;
	min-width: 100%;
	padding-top: 4px;
	padding-bottom: 3.5px;
	text-align: center;
	border-top: 1px solid;
	border-bottom: 1px solid;
}
.subnav{
	background-color: var(--background-color);
	color: var(--color);
	display: block;
	padding: 12px;
	border: none;
    outline: none;
	cursor: pointer;
	min-width: 100%;
	text-align: left;
	margin-left: 20px;
 }
.subnav:hover {
  background-color: #ccc;
}

 .placeholder{
	background-color: var(--background-color);
	color: var(--color);
	display: block;
	padding: 12px;
	border: none;
    outline: none;
	min-width: 100%;
	text-align: left;
 }

</style>