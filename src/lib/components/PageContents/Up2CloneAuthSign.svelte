<script lang="ts">

import TreeView from '../TreeView.svelte'
import { _ } from 'svelte-i18n'
import BreadCrumb from '../BreadCrumb.svelte'
import {findTreePath} from '../../script/utils.js'


export let tree = null
export let process = {data:{authorization:{}}}
export let color

let items = [
     "MASTER"
    
  ]

let title = ''

const exitPage = (ev:any)=>{
	const div = document.getElementById("modal-auth-sign-div-id")
    if(div)
        div.style.display = 'none'
}



let callback = (params:any)=>{
	const div = document.getElementById("sign-page-right-id")
	const children = div.childNodes
	items=findTreePath(tree,params.name)
	title = params.name
		switch(params.type){
			case "MASTER":
				break
			case "INIT":
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
			case "FINAL":
				break
			case "FINALTASK":
				break
		}
	}
const authorize = (ev:any)=>{
	const target = ev.target
	const checked = target.checked
}
</script>
    <div class="up2twin-dialog-class" style="width: 100%;min-height: 350px;margin:auto">
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
					<div class="sign-page-right-title">
						<BreadCrumb bind:items={items} bind:tree={tree}/>
					</div>
				</div>
				<div class="sign-page-right-body">
					<div class="sign-page-right-body-body">
					</div>
					<div class="sign-page-right-body-footer">
						<span>{$_("up2clone_auth_table_authorized")}</span>
						<input  type="checkbox" checked={process.data.authorization.authorized} disabled on:change={authorize}/>
						<span>{$_("up2clone_auth_table_block")}</span>
						<input  type="checkbox" checked={process.data.authorization.blocked} disabled on:change={authorize}/>
						<span>{$_("up2clone_auth_table_authdate")}</span>
						<input type="datetime-local" value={process.data.authorization.authdate} disabled on:change={authorize}/>
						<span>{$_("up2clone_auth_table_version")}</span>
						<input type="text" size="6" value={process.data.authorization.version} disabled on:change={authorize}/>
						<span>{$_("up2clone_auth_table_signature")}</span>
						<input type="text" size="10" value={process.data.authorization.signature} disabled on:change={authorize}/>
						<input type="button" size="10" value={$_("up2clone_auth_table_signature")} on:change={authorize}/>

					</div>
				</div>
			</div>
		</div>
	</div>

<style global>
/*
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
}*/

.tree-div{
	height: 300px;
	width: 300px;
	overflow-y: auto;
}
.sign-page-body{
	display: flex;
}
.sign-page-right-body{
	width:100%;
	height: 80%;
	overflow-y:auto ;
}
.sign-page-right-body-body{
	height: 80%;
}
.sign-page-right-body-footer{
	display:flex;
	justify-content: left ;
}

.sign-page-right-body-footer span{
	font-weight: bold ;
}

.sign-page-right-body-footer input[type="checkbox"]:checked{
	background-color: red;
	background: red;
}

</style>