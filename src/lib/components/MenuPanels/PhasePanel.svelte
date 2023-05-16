<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { onMount, onDestroy } from 'svelte';

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

const opcontdiv = document.getElementById("class-operations")

const saveEventHandler = (e:any) => {
                                    //console.log("**** FIRED EVENT SAVE******")
                                    //opcontdiv.innerHTML = '';
                                }
const hideEventHandler = (e:any) => {
                                    //console.log("**** FIRED EVENT HIDE******")
                                    //opcontdiv.innerHTML = '';
                                }
const showEventHandler = (e:any) => {
                                    //console.log("**** FIRED EVENT HIDE******")
                                    setTimeout(redrawOperations,400)
                                }

onMount(async ()=>{
   //console.log("MOUNT PANEL PHASE")
   
   node.data.level = 'level1'
   const opcontdiv = document.getElementById("class-operations")
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
    //console.log("DESTROY PANEL PHASE")
   const opcontdiv = document.getElementById("class-operations")
   modal = document.getElementById("modal-editor-div-id")

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
    if(node.saved && node.saved.operations){
        //console.log("OPERATIONS LENGTH ---->",node.saved.operations.length)
        for(let i=0; i< node.saved.operations.length;i++){
            const operation = node.saved.operations[i]
            //console.log("**** FIRED EVENT SHOW******", operation)
            addOperation(operation)
        }
    }
}

function drawOperations(){
    if(node.data && node.data.operations){
        //console.log("OPERATIONS LENGTH ---->",node.data.operations.length)
        const opcontdiv = document.getElementById("class-operations")
        if(opcontdiv)
            opcontdiv.innerHTML = ''
        for(let i=0; i< node.data.operations.length;i++){
            const operation = node.data.operations[i]
            //console.log("**** FIRED EVENT SHOW******", operation)
            addOperation(operation)
        }
    }
}

function addOperationEvent(){
    const operation = {name:'',uid: null,tasks:null}
    addOperation(operation)
}

function addOperation(operation:any){
    if(operation.uid == null)
        operation.uid = uuidv4()
    if(operation.name == '')
        operation.name = operations[0].name

    const opcontdiv = document.getElementById("class-operations")
    if(!opcontdiv)
        return
    opcontdiv.style.cssText += 'display:block;';
    // OPEARATION DIV
    const opdiv = document.createElement("div");
    opdiv.classList.add("class-operation-row");
    opdiv.style.cssText += 'margin-top:4px;';
    // OPERATION DIV TOOLDIV
    const tooldiv = document.createElement("div");
    tooldiv.classList.add("class-operation-tool-row");
    tooldiv.style.cssText += 'margin-top:4px;border-top: 1px solid #4CAF50;display:block';
    
    // EDIT  IMAGE INPUT
    var editElement = document.createElement("input");
    editElement.type =  'image';
    editElement.setAttribute('src', 'edit.svg');
    editElement.setAttribute('alt', 'EDIT');
    editElement.setAttribute('width', '20');
    editElement.setAttribute('height', '20');
    editElement.id = "EDIT_"+operation.uid
    editElement.addEventListener('click',onEditOperation)
    tooldiv.appendChild(editElement);
    opdiv.appendChild(tooldiv);

    // DELETE  IMAGE INPUT
    var delElement = document.createElement("input");
    delElement.type =  'image';
    delElement.setAttribute('src', 'DELETE.svg');
    delElement.setAttribute('alt', 'DELETE');
    delElement.setAttribute('width', '20');
    delElement.setAttribute('height', '20');
    delElement.id = "DELETE_"+operation.uid
    delElement.addEventListener('click',onDeleteOperation)
    tooldiv.appendChild(delElement);
    opdiv.appendChild(tooldiv);

    // UPARROW  IMAGE INPUT
    var upArrowElement = document.createElement("input");
    upArrowElement.type =  'image';
    upArrowElement.setAttribute('src', 'UPARROW.svg');
    upArrowElement.setAttribute('alt', 'MOVEUP');
    upArrowElement.setAttribute('width', '20');
    upArrowElement.setAttribute('height', '20');
    upArrowElement.id = "MOVEUP_"+operation.uid
    upArrowElement.addEventListener('click',onMoveUpOperation)
    tooldiv.appendChild(upArrowElement);
    opdiv.appendChild(tooldiv);

    // DOWNARROW  IMAGE INPUT
    var downArrowElement = document.createElement("input");
    downArrowElement.type =  'image';
    downArrowElement.setAttribute('src', 'DOWNARROW.svg');
    downArrowElement.setAttribute('alt', 'MOVEDOWN');
    downArrowElement.setAttribute('width', '20');
    downArrowElement.setAttribute('height', '20');
    downArrowElement.id = "MOVEDOWN_"+operation.uid
    downArrowElement.addEventListener('click',onMoveDownOperation)
    tooldiv.appendChild(downArrowElement);
    opdiv.appendChild(tooldiv);

    // OPERATION TYPE LABEL
    var label = document.createElement('label');
    label.innerHTML = "OP TYPE";  
    label.style.cssText += 'padding:4px;';
    opdiv.appendChild(label);

    // OPERATION TYPE SELECT
    var selectList = document.createElement("select");
    selectList.id = operation.uid;
    if(operation.name !='')
        selectList.value = operation.name
    opdiv.appendChild(selectList);
    for (var i = 0; i < operations.length; i++) {
        var option = document.createElement("option");
        option.value = operations[i].name;
        option.text = operations[i].name;
         if(operation.name !='' && operation.name == operations[i].name)
            option.selected = true
        selectList.appendChild(option);
    }
    selectList.addEventListener('change',onChangeOperation)
   
    opcontdiv.appendChild(opdiv);
    
    onAddOperation(operation)
     //console.log("ADD OPERATION",operation)
    
}

function onAddOperation(operation:any){
    if(!node.data.operations)
        node.data.operations = []
     
     const found = node.data.operations.find((item:any)=>{return (item.uid == operation.uid)})
     if(!found)
        node.data.operations.push(operation)
}

function onChangeOperation(event:any){
    const element = event.target
    let id:any
    if(element){
        id = element.id
        const index = node.data.operations.findIndex((item:any)=>{return(item.uid == id)})
        if(index > -1)
            node.data.operations[index].name = element.value

       
    }
}

function onEditOperation(event:any){
    const element = event.target
    let id:any
    if(element){
        id = element.id.split('_')[1]
    }
    
   
    // OPEN MODAL DIV
    const modal = document.getElementById("modal-editor-div-id");
	if(modal){
        modal.setAttribute("data-opuid",id)
	    modal.style.display = "block";
    }
}

function onDeleteOperation(event:any){
    const element = event.target
   let id:any
    if(element){
        id = element.id.split('_')[1]
    
        

        const parent = element.parentElement.parentElement
        parent.innerHTML = ''

        node.data.operations = node.data.operations.filter((item:any)=> { return (item.uid != id)})
    }
}

function moveItem (array:any, to:any, from:any) {
    const item = array[from];
    array.splice(from, 1);
    array.splice(to, 0, item);
    return array;
};

function onMoveUpOperation(event:any){
   const element = event.target
   let id:any
    if(element){
        id = element.id.split('_')[1]
       
        const index = node.data.operations.findIndex((item:any) => { return (item.uid == id ) })
        if(index > 0)
            node.data.operations = moveItem(node.data.operations,index-1,index)
        drawOperations()
    }
}

function onMoveDownOperation(event:any){
   const element = event.target
   let id:any
    if(element){
        id = element.id.split('_')[1]
        
         const index = node.data.operations.findIndex((item:any) => { return (item.uid == id ) })
        if(index < node.data.operations.length-1)
            node.data.operations = moveItem(node.data.operations,index+1,index)
        drawOperations()
    }
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
  display: flex;
  justify-content:right;
  font-family: Arial, Helvetica, sans-serif;
  font-size: small;
}

label {
  display: block;
  text-align: left;
  width: 160px;
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