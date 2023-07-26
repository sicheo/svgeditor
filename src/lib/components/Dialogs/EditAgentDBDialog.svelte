<script lang="ts">

import { _ } from 'svelte-i18n'
import { onMount} from "svelte";
import TableImage from '../Tables/TableImage.svelte'
import { v4 as uuidv4 } from 'uuid';


export let data = []
export let color 
export let dialogOptions : any 


let dbuid 
let localdb

let newdb = {
	  uid: uuidv4(),
	  value: ''
}

onMount(async ()=>{
       
    });

const exitDialog = (event:any)=>{
	localdb = null
	dbuid = null
    const dialog = document.getElementById("agent-db-dialog")
    if(dialog)
        dialog.style.display = 'none'
}


const changeDBValue = (ev:any)=>{
	const target = ev.target
	localdb = data.find((item:any)=> item.uid == target.value)
	console.log("CHANGE DB",data,target.value)
	if(localdb){
	}else{
		console.log("**** NEW AGENT *****")
		localdb = newdb
	}
}

const clickEdit = ()=>{

}

const clickSave = ()=>{

}

const clickDelete = ()=>{

}

</script>

<div class="load-dialog-class" >
		<div class="class-panel-header" style="border-bottom: 1px solid;">
				<p>{$_("table-db-agent-db-intro")} {dialogOptions.row.name}</p>
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitDialog} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body-toolbar" style="border-bottom: 1px solid;">
					<span>{$_("table-db-agent-db-choose")}</span>
					<select name="agent" id="agent-select" value={dbuid} on:change={changeDBValue} style="margin:5px">
						<option value="" style="font-weight:bold;font-style:italic;">{$_("table-db-agent-db-new")}</option>
						{#each data as DB}
								<option value={DB.uid}>{DB.name}</option>
						{/each}
					</select>
					<TableImage image='/edit.svg' onClick={clickEdit}/>
					<TableImage image='/SAVE.svg' onClick={clickSave}/>
					<TableImage image='/DELETE.svg' onClick={clickDelete}/>
		</div>
		<div class="class-panel-body-agent" style="--color:{color};">
			<div class="column left">
				<p>Some text..</p>
				</div>
			<div class="column right">
				<p>Some text..</p>
				</div>
		</div>
	</div>

<style>
.load-dialog-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 60%;
	height: 80%;
	margin: auto;
}

.class-panel-header {
  display: flex;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
  background-color: #eeeeee;
}
.class-panel-header p{
 margin-left: 8px;
}

.class-last-item {
  margin-top: 15px;
}
.class-panel-body-agent{
  display: flex;
  clear: both;
}

.column {
  float: left;
  padding: 10px;
  height: 300px; /* Should be removed. Only for demonstration */
}

.left {
  width: 25%;
}

.right {
  width: 75%;
}


</style>