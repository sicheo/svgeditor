<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import {addElement, moveItem} from './lib/ElemLib'

export let node:any ={data:{}}
export let color = "Teal"
export let callback = (param:any=null)=>{}


let modal: any

let opcontdiv:any

let totalOperations = "0"
let totalMachines = "0"
let totalInputs = "0"

let machines:any[] = [
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

let inputs:any[] = [
    {uid:1,name:'MXXXXXXXXXA',image:'/DISPENSING.svg'},
    {uid:2,name:'MXXXXXXXXXB',image:'/DISPENSING.svg'},
    {uid:3,name:'PXXXXXXXXXX',image:'/DISPENSING.svg'}
]

const saveEventHandler = (e:any) => {
                                    //console.log("**** FIRED EVENT SAVE******")
                                    //opcontdiv.innerHTML = '';
                                }
const hideEventHandler = (e:any) => {
                                    //console.log("**** FIRED EVENT HIDE******")
                                    //opcontdiv.innerHTML = '';
                                }
const showEventHandler = (e:any) => {
                                    //console.log("**** FIRED EVENT SHOW******")
                                    setTimeout(redrawOperations,400)
                                }

onMount(async ()=>{
       node.data.level = 'level0'
       opcontdiv = document.getElementById("class-operations")
       //const opmacdiv = document.getElementById("class-machines")
       //const opinpdiv = document.getElementById("class-inputs")

       // GET MODAL
       modal = document.getElementById("modal-editor-div-id")

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
       //modal = document.getElementById("modal-editor-div-id")
       //const opcontdiv = document.getElementById("class-operations")

       if(opcontdiv){
            opcontdiv.removeEventListener(
                "panelsave",
                saveEventHandler,
                false
             );
            opcontdiv.removeEventListener(
                "panelhide",
                hideEventHandler,
                false
            );
            opcontdiv.removeEventListener(
                "panelshow",
                showEventHandler,
                false
            );
        }
  });

  function redrawOperations(){
    if(node.saved && node.saved.operations){
        //console.log("OPERATIONS LENGTH ---->",node.saved.operations.length)
        for(let i=0; i< node.saved.operations.length;i++){
            const operation = node.saved.operations[i]
            addElement(operation,operations,"class-operations",node,"operations","modal-editor-div-id")
        }
    }
    if(node.saved && node.saved.machines){
        for(let i=0; i< node.saved.machines.length;i++){
            const machine = node.saved.machines[i]
            addElement(machine,machines,"class-machines",node,"machines","modal-editor-div-id")
        }
    }
    if(node.saved && node.saved.inputs){
        for(let i=0; i< node.saved.inputs.length;i++){
            const input = node.saved.inputs[i]
            addElement(input,inputs,"class-inputs",node,"inputs","modal-editor-div-id")
        }
    }
}


function setNode(event:any){
   
    node.data.image='/MASTER.svg'
    node.data.level = 'level0'
    callback()
}

const addInputEvent = (e:any)=>{
    const input = {name:'',uid: null,tasks:null}
    addElement(input,inputs,"class-inputs",node,"inputs","modal-editor-div-id")
}

const addMachineEvent = (e:any)=>{
    const machine = {name:'',uid: null,tasks:null}
    addElement(machine,machines,"class-machines",node,"machines","modal-editor-div-id")
}

const addOperationEvent = (e:any)=>{
    const operation = {name:'',uid: null,tasks:null}
    addElement(operation,operations,"class-operations",node,"operations","modal-editor-div-id")
}



</script>

<div class="class-panel-content">
    <div class = "class-parameter-list">
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
    </div>
    <!--div class= "class-panel-row">   
            <div class= "class-panel-cell" style="--color:{color}">
                <hr class = "hr-solid" />
            </div>
    <//div>!--div-->
     <div class= "class-panel-row panel-row-tool">
            <label class= "class-panel-cell" name="addinput" style= "width: 300px">
                INPUTS
	             <input name= "addinput" id= "add-input-button" type='image' alt='ADD INPUT' src='/add.svg'  on:click={addInputEvent} />
                  <input  class= "tool-counter" type='text' id= "total-inputs" alt='ADD INPUT' src='/add.svg'  value={totalInputs} size={2} disabled/>
            </label>
    </div>
    <div class= "class-input-row" id= "class-inputs">   
        
    </div>
    <div class= "class-panel-row panel-row-tool">
            <label class= "class-panel-cell" name="addmachine" style= "width: 300px">
                EQUIPMENTS
	             <input name= "addtask" id= "add-machine-button" type='image' alt='ADD INPUT' src='/add.svg'  on:click={addMachineEvent} />
                  <input  class= "tool-counter" type='text' id= "total-machines" alt='ADD INPUT' src='/add.svg' value={totalMachines} size={2} disabled/>
            </label>
    </div>
    <div class= "class-input-row" id= "class-machines">
        
    </div>
    <div class= "class-panel-row panel-row-tool">
            <label class= "class-panel-cell" name="addtask" style= "width: 300px">
                OPERATIONS
	             <input name= "addtask" id= "add-operation-button" type='image' alt='ADD TASK' src='/add.svg'  on:click={addOperationEvent} />
                 <input class= "tool-counter"  type='text' id= "total-operations" alt='ADD INPUT' src='/add.svg'  value={totalOperations} size={2} disabled/>
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

.class-parameter-list {
  max-height: 80px;
  overflow: auto;
 
}

.class-panel-row {
  display: flex;
  justify-content:left;
  font-size: smaller;
}

.class-panel-row.panel-row-tool {
  margin-top: 10px;
  border-top: 1px solid #4CAF50;
  background-color: #DFDFDF;
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