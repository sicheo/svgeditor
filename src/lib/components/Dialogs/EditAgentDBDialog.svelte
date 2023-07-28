<script lang="ts">

import { _ } from 'svelte-i18n'
import { onMount} from "svelte";
import { v4 as uuidv4 } from 'uuid';
import {getPoints} from '../../script/api.js'
import {mock} from '../../ustore.js'
import TableImage from  '../Tables/TableImage.svelte'
import TableText from  '../Tables/TableText.svelte'
import SimpleTable from '../Tables/SimpleTable.svelte'



import { flexRender, createColumnHelper } from '@tanstack/svelte-table';


export let data = []
export let color 
export let dialogOptions : any 

let viewOptions = { showGotoPage:false,showPageSize:false}
let dbuid 
let localdb
let points = []
let currpoint = null

const columnHelper  = createColumnHelper()
let refreshDataExt:any

let newdb = {
	  uid: uuidv4(),
	  value: ''
}

onMount(async ()=>{
       
    });

const exitDialog = (event:any)=>{
	localdb = null
	dbuid = null
	points=[]
	refreshDataExt()
    const dialog = document.getElementById("agent-db-dialog")
    if(dialog)
        dialog.style.display = 'none'
}


const changeDBValue = async(ev:any)=>{
	points = []
	currpoint=null
	const target = ev.target
	localdb = data.find((item:any)=> item.uid == target.value)
	if(localdb){
		const filters = [
			{op:'eq',name:'agent',value:dialogOptions.row.uid},
			{op:'eq',name:'db',value:localdb.uid}
		]
		const res = await getPoints(filters,$mock)
		points = res.data
		points = points
	}else{
		localdb = newdb
	}
	refreshDataExt()
}

const clickEdit = ()=>{

}

const clickSave = ()=>{

}

const clickDelete = ()=>{

}

const toggleSelection = (target)=>{
	const spans = document.getElementsByClassName("text-tool-component")
	for(let i=0;i<spans.length;i++){
		spans[i].style.backgroundColor  = 'white'
	}
	if(target.style.backgroundColor  != 'yellow')
		target.style.backgroundColor  = 'yellow'
	else
		target.style.backgroundColor  = 'white'
}
const clickTag = (ev:any)=>{
	toggleSelection(ev.target)
	currpoint = ev.target.innerHTML
}

const columns = [
                    columnHelper.accessor('tag', {
                        id : 'tag',
                        header: () => $_("table-db-agent-db-tag"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue(),onClick:clickTag,cursor:'pointer'}),
                    }),  
                    columnHelper.accessor('description', {
                        id : 'description',
                        header: () => $_("table-db-device-description"),
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),
   ]

</script>

<div class="load-dialog-class" >
		{#if dialogOptions.row.type == 'SCANNER'}
		<div class="class-panel-header" style="border-bottom: 1px solid;">
				<p>{$_("table-db-agent-db-intro")} {dialogOptions.row.name}</p>
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitDialog} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body-toolbar" style="border-bottom: 1px solid;">
					<span>{$_("table-db-agent-db-choose")}</span>
					<select name="agent" id="agent-select" value={dbuid} on:change={changeDBValue} style="margin:5px">
						<option value={null} style="font-weight:bold;font-style:italic;">{$_("table-db-agent-db-new")}</option>
						{#each data as DB}
								<option value={DB.uid}>{DB.name}</option>
						{/each}
					</select>
					<TableImage image='/DOWNARROW.svg' onClick={clickEdit}/>
					<TableImage image='/UPARROW.svg' onClick={clickSave}/>
					<TableImage image='/DELETE.svg' onClick={clickDelete}/>
		</div>
		<div class="class-panel-body-agent" style="--color:{color};">
			<div class="column left">
				<SimpleTable viewOptions={viewOptions} bind:data={points} columns={columns} color={color} bind:refreshDataExt={refreshDataExt}></SimpleTable>
				</div>
			<div class="column right">
				{#if currpoint != null}
					<div class="class-panel-column-rigth-toolbar" style="border-bottom: 1px solid;">
						<span>EDIT POINT</span>
						<div class="class-last-item">
							<TableImage image='/edit.svg' onClick={clickEdit}/>
							<TableImage image='/SAVE.svg' onClick={clickSave}/>
							<TableImage image='/DELETE.svg' onClick={clickDelete}/>
						</div>
					</div>
				{/if}
			</div>
		</div>
		{/if}
	</div>

<style>
.load-dialog-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 80%;
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
  /*padding: 10px;*/
  /*height: 300px;  Should be removed. Only for demonstration */
}

.left {
  padding: 10px;
  width: 35%;
}

.right {
  width: 65%;
  border-left: 1px solid;
  height:100%;
}
.class-panel-column-rigth-toolbar{
	display:flex;
	text-align: right;
	background-color: #eeeeee;
}
.class-panel-column-rigth-toolbar span{
	font-weight: bold;
}
.class-last-item {
  margin-left: auto;
}

</style>