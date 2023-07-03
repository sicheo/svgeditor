<script context="module">
	// retain module scoped expansion state for each tree node
	const _expansionState = {
		/* treeNodeId: expanded <boolean> */
	}
</script>
<script lang="ts">
//	import { slide } from 'svelte/transition'
	export let tree
	export let color 
	
	let manageNode = (ev:any)=>{
		
		console.log("MANAGE NODE",ev.target.getAttribute("name"))
	}

	let expanded = _expansionState[tree.label] || false
	const toggleExpansion = () => {
		expanded = _expansionState[tree.label] = !expanded
		
	}
	$: arrowDown = expanded
	
	
</script>

<ul><!-- transition:slide -->
	<li>
		{#if tree.children}
			<span>
				<span class="arrow" class:arrowDown on:click={toggleExpansion}>&#x25b6</span>
				<span class="item" name="{tree.label}" style="--color:{color};" on:click={manageNode}>{tree.label}</span>
			</span>
			{#if expanded}
				{#each tree.children as child}
					<svelte:self bind:tree={child} {color}/>
				{/each}
			{/if}
		{:else}
			<span>
				<span class="no-arrow"/>
				<span class="item" name="{tree.label}" style="--color:{color};" on:click={manageNode}>{tree.label}</span>
			</span>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 1.2rem; 
		margin-top: 10px;
		user-select: none;
	}
	.no-arrow { padding-left: 1.0rem; }
	.arrow {
		cursor: pointer;
		display: inline-block;
		/* transition: transform 200ms; */
	}
	.arrowDown { transform: rotate(90deg); }

	.item {
		cursor: pointer;
		border-radius: 5px;
		border: 1px solid;
		padding: 2px;
		font-weight: bold ;
		font-size:small;
		color: var(--color);
		/*background-color:var(--background-color);*/
	}
</style>