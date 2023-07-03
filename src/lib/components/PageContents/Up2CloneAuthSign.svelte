<script lang="ts">

import TreeView from '../TreeView.svelte'

export let tree = null
export let process = null
export let color


const exitPage = (ev:any)=>{
	const div = document.getElementById("modal-auth-sign-div-id")
    if(div)
        div.style.display = 'none'
}
</script>
    <div class="sign-dialog-class">
		<div class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
				{process.description}
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<TreeView bind:tree={tree} {color}/>
	</div>

<style>
.sign-dialog-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 100%;
	min-height: 300px;
	height: 100%;
	margin: auto;
}

.class-panel-header {
  display: flex;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
}


</style>