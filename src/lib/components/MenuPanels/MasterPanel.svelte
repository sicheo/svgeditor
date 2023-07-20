<script lang="ts">
import { onMount} from 'svelte';
import { _ } from 'svelte-i18n'
import {mock} from '../../ustore.js'
import {getMaterialCols,getPersonnelCols,getMachineCols} from '../../script/api.js'
import Up2CloneBuildParams from '../PageContents/Up2CloneBuildParams.svelte'


/*export let node:any ={
    data:{
        params:{}
    }
}*/

export let node

export let color = "Teal"

let changecolor = "#ffe6e6"

let machineCols = []
let personnelCols = []
let materialCols = []
let divParams
let paramsCols=[]
let paramName = ""
let paramType = ""
let paramRows=[]
       
onMount(async ()=>{
      const inputs = document.getElementsByClassName("panel-input-text")
      const changeListener = (ev:any)=>{
          const title = document.getElementById("property-panel-title-id")
          if(title)
            title.style.background = changecolor
      }
      for(let i=0;i<inputs.length;i++){
          inputs[i].addEventListener("change",changeListener)
      }
      divParams = document.getElementById("modal-master-params-div-id")

  });

  const onClickMaterials = async (ev:any) =>{
      const body = await getMaterialCols($mock)
      materialCols = body.data
      paramType= 'materials'
      paramName = $_('up2clone_master_panel_materials')
      paramsCols = materialCols
      const parameters = node.data.params[paramType]
      paramRows=[]
      for(let i=0;i< parameters.length;i++){
          const keys = Object.keys(parameters[i])
          const row = []
          for(let j=0;j<keys.length;j++){
              row.push(parameters[i][keys[j]])
          }
          paramRows.push(row)
      }
      if(divParams){
        divParams.style.display = 'block'
        
     }
  }

  const onClickMachines = async (ev:any) =>{
      const body = await getMachineCols($mock)
      machineCols = body.data
      paramType= 'machines'
      paramName = $_('up2clone_master_panel_machines')
      paramsCols = machineCols
      const parameters = node.data.params[paramType]
      paramRows=[]
      for(let i=0;i< parameters.length;i++){
          const keys = Object.keys(parameters[i])
          const row = []
          for(let j=0;j<keys.length;j++){
              row.push(parameters[i][keys[j]])
          }
          paramRows.push(row)
      }
      if(divParams){
        divParams.style.display = 'block'
        
     }
  }

  const onClickPersonnel = async (ev:any) =>{
      const body =  await getPersonnelCols($mock)
      personnelCols = body.data
      paramType= 'personnel'
      paramName = $_('up2clone_master_panel_personnel')
      paramsCols = personnelCols
      const parameters = node.data.params[paramType]
      paramRows=[]
      for(let i=0;i< parameters.length;i++){
          const keys = Object.keys(parameters[i])
          const row = []
          for(let j=0;j<keys.length;j++){
              row.push(parameters[i][keys[j]])
          }
          paramRows.push(row)
      }
      if(divParams){
        divParams.style.display = 'block'
        
     }
  }

</script>

<div class="class-panel-content">
    <div class = "class-parameter-list">
        <div class= "class-panel-row">
                <label class= "class-panel-cell">
                    {$_('up2clone_master_panel_description')}
	                <!--input  type="text" name="name"  bind:value="{node.data.params.description}" class="panel-input panel-input-text"-->
                    <textarea type="text" name="name"  rows="5" bind:value="{node.data.params.description}" class="panel-input panel-input-textarea"/>
                </label>
        </div>
	    <div class= "class-panel-row">
                <label class= "class-panel-cell">
                    {$_('up2clone_master_panel_doccode')}
	                <input  type="text" name="name"  bind:value="{node.data.params.doccode}" class="panel-input panel-input-text">
                </label>
        </div>
        <div class= "class-panel-row">
                <label class= "class-panel-cell">
                   {$_('up2clone_master_panel_prodcode')}
	                <input  type="text" name="name"  bind:value="{node.data.params.prodcode}"  class="panel-input panel-input-text">
                </label>
        </div>
        <div class= "class-panel-row">
                <label class= "class-panel-cell">
                    {$_('up2clone_master_panel_projcode')}
	                <input  type="text" name="name"  bind:value="{node.data.params.projcode}"  class="panel-input panel-input-text">
                </label>
        </div>
         <div class= "class-panel-row">
                <label class= "class-panel-cell">
                    {$_('up2clone_master_panel_sapcode')}
	                <input  type="text" name="name"  bind:value="{node.data.params.sapcode}"  class="panel-input panel-input-text">
                </label>
        </div>
         <div class= "class-panel-row">
                <label class= "class-panel-cell">
                    {$_('up2clone_master_panel_sapdescr')}
	                <input  type="text" name="name"  bind:value="{node.data.params.sapdesc}"  class="panel-input panel-input-text">
                </label>
        </div>
        <div class= "class-panel-row">
                <label class= "class-panel-cell">
	                <input  type="button" name="name" on:click={onClickMaterials} value="{$_('up2clone_master_panel_materials')}"  class="panel-input panel-input-button">
                </label>
        </div>
        <div class= "class-panel-row">
                <label class= "class-panel-cell">
	                <input  type="button" name="name" on:click={onClickMachines} value="{$_('up2clone_master_panel_machines')}"  class="panel-input panel-input-button">
                </label>
        </div>
        <div class= "class-panel-row">
                <label class= "class-panel-cell">
	                <input  type="button" name="name" on:click={onClickPersonnel} value="{$_('up2clone_master_panel_personnel')}"  class="panel-input panel-input-button">
                </label>
        </div>
    </div>
</div>

<div class="modal-master-params-div" id="modal-master-params-div-id" data-process=''>
		<div class="modal-editor-master-params-content">
			<Up2CloneBuildParams bind:node={node} {color} bind:paramsCols={paramsCols} bind:paramName={paramName}  bind:paramType={paramType} bind:paramRows={paramRows}/>
		</div>
</div>

<style>
.panel-input-text{
	 width: auto;
}

.panel-input-button{
	 font-weight: bold;
     font-size:larger;
}

.class-panel-cell textarea{
	 font-size:medium;
}

.panel-input{
	 max-width: 150px;
     font-size: smaller;
     color: teal;
}

.class-panel-content {
  display: flexbox;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(50px, auto);
  font-family: Arial, Helvetica, sans-serif;
  font-size: smaller;
  font-weight: bold;
  padding-top: 10px;
}

.class-parameter-list {
  overflow: auto;
 
}

.class-panel-row {
  display: flex;
  justify-content:left;
  font-size: smaller;
}


label {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: right;
  width: 250px;
  line-height: 22px;
  margin-bottom: 10px;
}

input {
  height: 20px;
  flex: 0 0 80px;
  margin-left: 5px;
}

/* The Modal (background) */
.modal-master-params-div {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-editor-master-params-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}


</style>