<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { onMount, onDestroy } from 'svelte';
import {addElement} from './lib/ElemLib'


export let node:any ={data:{}}
export let color = "Teal"
export let callback = (param:any=null)=>{}


let name = ''
let address = ''
let data: any
let modal: any


let phases:any[] = [
    {uid:1,name:'DISPENSING',image:'/DISPENSING.svg'},
    {uid:2,name:'REACTION',image:'/REACTION.svg'},
    {uid:3,name:'WORKUP',image:'/WORKUP.svg'},
    {uid:4,name:'ISOLATION',image:'/ISOLATION.svg'},
    {uid:5,name:'CLEANING',image:'/CLEANING.svg'},
    {uid:6,name:'DRYING',image:'/DRYING.svg'},
    {uid:7,name:'MILLING',image:'/MILLING.svg'},
]

let operations:any[] = [
    {uid:1,name:'Dispensing',image:'/DISPENSING.svg'},
    {uid:2,name:'Inertization',image:'/REACTION.svg'},
    {uid:3,name:'Solid Reagents Loading',image:'/WORKUP.svg'},
    {uid:4,name:'Liquids Loading',image:'/ISOLATION.svg'},
    {uid:5,name:'Thermoregulation',image:'/CLEANING.svg'},
    {uid:6,name:'Distillation (vacuum)',image:'/DRYING.svg'},
    {uid:7,name:'Distillation (atmospheric)',image:'/MILLING.svg'},
    {uid:8,name:'Vacuum',image:'/DISPENSING.svg'},
    {uid:9,name:'Pressuriation',image:'/REACTION.svg'},
    {uid:10,name:'Flush',image:'/WORKUP.svg'},
    {uid:11,name:'Degasing',image:'/ISOLATION.svg'},
    {uid:12,name:'Stirring (multistep)',image:'/CLEANING.svg'},
    {uid:13,name:'Filtration',image:'/DRYING.svg'},
    {uid:14,name:'Discharge',image:'/MILLING.svg'},
    {uid:15,name:'Dosing Reagents',image:'/REACTION.svg'},
    {uid:16,name:'Sampling ',image:'/WORKUP.svg'},
    {uid:17,name:'Transfer',image:'/ISOLATION.svg'},
    {uid:18,name:'Recycle',image:'/CLEANING.svg'},
    {uid:19,name:'Rinse',image:'/DRYING.svg'},
    {uid:20,name:'Storage',image:'/MILLING.svg'},

]

let opcontdiv:any

const saveEventHandler = (e:any) => {
                                    opcontdiv.innerHTML = '';
                                }
const hideEventHandler = (e:any) => {
                                    opcontdiv.innerHTML = '';
                                }
const showEventHandler = (e:any) => {
                                    if(e.detail.node == "PHASE")
                                        setTimeout(redrawOperations,50)
                                }

onMount(async ()=>{
   node.data.level = 'level1'
   opcontdiv = document.getElementById("class-operations")
   // GET MODAL
   modal = document.getElementById("modal-editor-div-id")
   // ENABLE ADD BUTTON
    if(node.saved && node.saved.operations){
        const element = document.getElementById("add-operation-button")
        if(element)
            element.disabled = false
    }


   if(opcontdiv){
        opcontdiv.addEventListener(
              "panelsave",
              saveEventHandler,
              false
         );

        opcontdiv.addEventListener(
          "panelhide",
          hideEventHandler,
          false
        );

        opcontdiv.addEventListener(
          "panelshow",
          showEventHandler,
          false
        );
    }

 });

 onDestroy(async ()=>{

   if(opcontdiv){
        opcontdiv.removeEventListener(
              "panelsave",
              saveEventHandler,
              false
         );

        opcontdiv.addEventListener(
          "panelhide",
          hideEventHandler,
          false
        );

        opcontdiv.addEventListener(
          "panelshow",
          showEventHandler,
          false
        );
    }

 });



function changeImage(){
    const phase = phases.find((item:any)=>{return(item.name == node.data.name)})
    if(phase)
        node.data.image = phase.image
    const element = document.getElementById("add-operation-button")
    element.disabled = false
    node.data.level = 'level1'
}

function redrawOperations(){
    opcontdiv.innerHTML = '';
    if(node.saved && node.saved.operations){
        node.data.operations = null
        for(let i=0; i< node.saved.operations.length;i++){
            const operation = node.saved.operations[i]
            addElement(operation,operations,"class-operations",node,"operations","modal-editor-div-id")
        }
    }
}

const addOperationEvent = (e:any)=>{
    const operation = {name:'',uid: null,tasks:null}
    addElement(operation,operations,"class-operations",node,"operations","modal-editor-div-id")
}



</script>

<div class="class-panel-content">
	<div class= "class-panel-row">
            <label class= "class-panel-cell" name="select">
                PHASE
	             <select type="sourcedriver" name="select" bind:value={node.data.name} on:change={changeImage}>
					{#each phases as Phase, index(Phase.uid)}
						<option value={Phase.name}>{Phase.name}</option>
					{/each}
				</select>
            </label>
    </div>
   <div class= "class-panel-row">
            <label class= "class-panel-cell" name="addtask">
                OPERATIONS
	             <input name= "addtask" id= "add-operation-button" type='image' alt='ADD TASK' src='/add.svg'  on:click={addOperationEvent} disabled/>
            </label>
    </div>
    <div class= "class-operation-row" id= "class-operations">   
        
    </div>
</div>

<style>


.class-panel-content {
  display: flexbox;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(50px, auto);
  font-family: Arial, Helvetica, sans-serif;
  font-size: smaller;
  font-weight: bold;
  padding-top: 10px;
}

.class-operation-row {
  display: block;
  justify-content:right;
  font-family: Arial, Helvetica, sans-serif;
  font-size: smaller;
  max-height: 400px;
  overflow: auto;
  
}

.class-operation-tool-row {
  display: block;
  justify-content:right;
  font-size: small;
}

.class-panel-row {
  display: block;
  justify-content:right;
  font-family: Arial, Helvetica, sans-serif;
  font-size: small;
}

label {
  display: block;
  text-align: left;
  width: 200px;
  /*line-height: 22px;*/
  margin-bottom: 10px;
  margin-left: 3px;
  font-weight: bold;
}



input {
  height: 20px;
  flex: 0 0 80px;
  margin-left: 5px;
}

</style>