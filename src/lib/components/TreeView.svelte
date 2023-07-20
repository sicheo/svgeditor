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
	export let callback = (param:any=null)=>{}
	
	let manageNode = (ev:any)=>{
		const name = ev.target.getAttribute("name")
		const type = ev.target.getAttribute("data-type")
		// TOGGLE CHECKED
		ev.target.classList.add('checked')
		callback({name:name,type:type})
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
				<span class="item" name="{tree.label}" data-type="{tree.type}" style="--color:{color};--background-color:{tree.color};" on:click={manageNode}>{tree.label}</span>
			</span>
			{#if expanded}
				{#each tree.children as child}
					<svelte:self bind:tree={child} {color} callback={callback}/>
				{/each}
			{/if}
		{:else}
			<span>
				<span class="no-arrow"/>
				<span class="item-no-arrow" name="{tree.label}" data-type="{tree.type}" style="--color:{color};--background-color:{tree.color};" >{tree.label}</span>
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
		background-color: var(--background-color);
		/*background-color:var(--background-color);*/
	}

	.item-no-arrow {
		cursor: auto;
		border-radius: 5px;
		border: 1px solid;
		padding: 2px;
		font-weight: bold ;
		font-size:small;
		color: var(--color);
		background-color: var(--background-color);
		/*background-color:var(--background-color);*/
	}
</style>