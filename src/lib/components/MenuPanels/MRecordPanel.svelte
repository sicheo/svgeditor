<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import {addElement, moveItem} from './lib/ElemLib'

export let node:any ={data:{}}
export let color = "Teal"
export let callback = (param:any=null)=>{}


let name = ''
let address = ''
let data = {name:'',address:'',type:'MASTER',level:'level0'}

let equipments:any[] = [
    {uid:1,name:'REATTORE-XX-XX',type:"REACTOR",image:'/DISPENSING.svg'},
    {uid:2,name:'SERBATOIO-XX-XX',type:"TANK",image:'/REACTION.svg'},
    {uid:3,name:'MIXER-XX-XX',type:"MIXER",image:'/WORKUP.svg'},
    {uid:4,name:'BUCHNER-XX-XX',type:"BUCHNER",image:'/ISOLATION.svg'},
    {uid:5,name:'STUFA-XX-XX',type:"DRYER",image:'/CLEANING.svg'},
    {uid:6,name:'MULINO-XX-XX',type:"MILL",image:'/DRYING.svg'},
    {uid:7,name:'BILANCIA-XX-XX',type:"BALANCE",image:'/MILLING.svg'},
    {uid:8,name:'FRIGORIFERO-XX-XX',type:"FRIDGE",image:'/DISPENSING.svg'}
]

let operations:any[] = [
    {uid:1,name:'Initial Check',image:'/DISPENSING.svg'}
]


onMount(async ()=>{
    //console.log("MOUNT PANEL RECORD")
    
  });

  onDestroy(async ()=>{
    //console.log("DESTROY PANEL RECORD")
    
  });

function setNode(event:any){
   
    node.data.image='/MASTER.svg'
    node.data.level = 'level0'
    callback()
}

const addInputEvent = (e:any)=>{
}

const addMachineEvent = (e:any)=>{
    const equipment = {name:'',uid: null,machines:null}
    addElement(equipment,equipments,"class-machines",node,"machines","modal-editor-div-id")
}

const addOperationEvent = (e:any)=>{
    const operation = {name:'',uid: null,operations:null}
    addElement(operation,operations,"class-operations",node,"operations","modal-editor-div-id")
}


</script>

<div class="class-panel-content">
	<div class= "class-panel-row">
            <label class= "class-panel-cell">
                Doc Code
	            <input type="text" name="name"  bind:value="{node.data.doccode}" on:change={setNode} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                Product Code
	            <input type="text" name="name"  bind:value="{node.data.prodcode}" on:change={setNode} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                Project Code
	            <input type="text" name="name"  bind:value="{node.data.projcode}" on:change={setNode} class="panel-input panel-input-text">
            </label>
    </div>
     <div class= "class-panel-row">
            <label class= "class-panel-cell">
                SAP Code
	            <input type="text" name="name"  bind:value="{node.data.sapcode}" on:change={setNode} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">   
            <div class= "class-panel-cell" style="--color:{color}">
                <hr class = "hr-solid" />
            </div>
    </div>
     <div class= "class-panel-row">
            <label class= "class-panel-cell" name="addinput">
                INPUTS
	             <input name= "addinput" id= "add-input-button" type='image' alt='ADD INPUT' src='/add.svg'  on:click={addInputEvent} />
            </label>
    </div>
    <div class= "class-input-row" id= "class-inputs">   
        
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell" name="addmachine">
                EQUIPMENTS
	             <input name= "addtask" id= "add-machine-button" type='image' alt='ADD INPUT' src='/add.svg'  on:click={addMachineEvent} />
            </label>
    </div>
    <div class= "class-input-row" id= "class-machines">
        
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell" name="addtask">
                OPERATIONS
	             <input name= "addtask" id= "add-operation-button" type='image' alt='ADD TASK' src='/add.svg'  on:click={addOperationEvent} />
            </label>
    </div>
    <div class= "class-input-row" id= "class-operations">   
        
    </div>
</div>

<style>
.panel-input-text{
	 width: auto;
}

.panel-input{
	 max-width: 100px;
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
  width: 200px;
  line-height: 22px;
  margin-bottom: 10px;
}

input {
  height: 20px;
  flex: 0 0 80px;
  margin-left: 5px;
}
.hr-solid {
    border-bottom: 1px solid var(--color);
}

.class-input-row {
  display: block;
  justify-content:right;
  font-family: Arial, Helvetica, sans-serif;
  font-size: smaller;
  max-height: 120px;
  overflow: auto;
  
}
</style>