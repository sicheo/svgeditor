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

let callback = (params:any)=>{
	const div = document.getElementById("sign-page-right-id")
	const children = div.childNodes
	console.log("** CHILDREN NODE **", children)
		switch(params.type){
			case "MASTER":
				break
			case "MATERIALS":
				break
			case "MACHINES":
				break
			case "PERSONNEL":
				break
			case "PHASES":
				break
			case "PHASE":
				break
			case "OPERATION":
				break
			case "TASK":
				break
		}
	}
</script>
    <div class="sign-dialog-class">
		<div class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
				{process.description}
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="sign-page-body">
			<div class="tree-div">
				<TreeView bind:tree={tree} {color} callback={callback}/>
			</div>
			<div class="sign-page-right" id="sign-page-right-id">
				<div class="sign-page-rigth-title">
				</div>
			</div>
		</div>
	</div>

<style>
.sign-dialog-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 100%;
	height: 350px;
	margin: auto;
}

.class-panel-header {
  display: flex;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
}

.tree-div{
	height: 300px;
	width: 300px;
	overflow-y: auto;
}
.sign-page-body{
	display: flex;
}

</style>