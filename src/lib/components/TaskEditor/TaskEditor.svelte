<script lang="ts">
import { onMount} from "svelte";
import SvelteTable from "svelte-table";
import EditComponent from "./EditComponent.svelte";
import SelectComponent from "./SelectComponent.svelte";
import InputComponent from "./InputComponent.svelte";
import TextAreaComponent from "./TextAreaComponent.svelte";
import SelectInput from "./SelectInput.svelte";




export let node:any ={data:{}}
export let modalname = "modal-editor-div-id"
export let graph:any

let modal:any
let opuid:any
let optype:any
let element:any;
let operation:any
let operationname:any
let operationtype:any
let phasename:any


let rows:any = []
let component = "SVELTETABLE"
let optionInputs:any = [
    {uid:1,name:"PIPPO"},
    {uid:2,name:"PLUTO"},
]

const getSourceDestination = (id:any,paths:any,nodes:any)=>{
    const response = {source:[],destination:[]}
    for(let i=0;i<paths.length;i++){
        const path = paths[i]
        if(path.to == id){
            const found = nodes.find((item:any) =>{ return (item.id == path.from)})
            if(found)
                response.source.push(found)
        }
        if(path.from == id){
            const found = nodes.find((item:any) =>{ return (item.id == path.to)})
            if(found)
                response.destination.push(found)
        }
    }
    return response
}

const mutationCallback = (mutationList:any) =>{
    mutationList.forEach((mutation:any) => {
    switch (mutation.type) {
      case "attributes":
        switch (mutation.attributeName) {
          case "data-opuid":
            opuid = mutation.target.getAttribute("data-opuid")
            optype = mutation.target.getAttribute("data-optype")
            const index = findOperation(node)
            switch(optype){
                case "operations":
                    if(index > -1){
	                    phasename = node.data.name
		                operationname = graph.nodes[index].data.name
                        operationtype = graph.nodes[index].data.type
                        if( !graph.nodes[index].data.tasks || graph.nodes[index].data.tasks.length == 0){
                            graph.nodes[index].data.tasks = JSON.parse(JSON.stringify(rows))
                        }
                        else{
                            rows = JSON.parse(JSON.stringify(graph.nodes[index].data.tasks))
                        }
                        // IF operationname == CHOICE change accordingly
                        if(operationtype=="CHOICE"){
                            console.log("*** Operation CHOICE *******",getSourceDestination(graph.nodes[index].id,graph.paths,graph.nodes))
                        }
                    }
                    break;
            }
            break;
        }
        break;
    }
  });
}
onMount(async ()=>{
   modal = document.getElementById(modalname)

   const observer = new MutationObserver(mutationCallback);

   observer.observe(modal, { attributes:true,attributeFilter: ["data-opuid"]});

 });

let typeOptions = [
    {id: 1,name:"Task"},
    {id:2,name:"Control"},
    {id:3,name:"Static"}
]

let checkTypeOptions = [
    {id: 1,name:"BOOLEAN"},
    {id:2,name:"ANALOG"},
    {id:3,name:"STRING"}
]

let checkModeOptions = [
    {id: 1,name:"NOCHECK"},
    {id: 2,name:"AUTOMATIC"},
    {id:3,name:"MANUAL"}
]

let expOps = [
    {id: 1,name:"EQ"},
    {id: 2,name:"NEQ"},
    {id: 3,name:"GT"},
    {id: 4,name:"GTE"},
    {id: 5,name:"LT"},
    {id: 6,name:"LTE"},
    {id: 7,name:"RANGE"},
]

let optionsArray = [
    {name: "type", options: typeOptions},
    {name: "checkType", options: checkTypeOptions},
    {name: "checkMode", options: checkModeOptions},
    {name: "expOps", options: expOps}
]



function moveItem (array:any, to:any, from:any) {
    const item = array[from];
    array.splice(from, 1);
    array.splice(to, 0, item);
    return array;
};

const onEditButtonClick = (row:any) =>{
    const selectType = document.getElementById("type-op-select-"+row.id)
    if(selectType)
        selectType.disabled = !selectType.disabled
    const selectCheckType = document.getElementById("checkType-op-select-"+row.id)
    if(selectCheckType)
        selectCheckType.disabled = !selectCheckType.disabled
    const selectCheckMode = document.getElementById("checkMode-op-select-"+row.id)
    if(selectCheckMode)
        selectCheckMode.disabled = !selectCheckMode.disabled
    const inputName = document.getElementById("name-op-input-"+row.id)
    if(inputName)
        inputName.disabled = !inputName.disabled
    const inputTag = document.getElementById("tag-op-input-"+row.id)
    if(inputTag)
        inputTag.disabled = !inputTag.disabled
    const selectExpOps = document.getElementById("expOps-op-select-"+row.id)
    if(selectExpOps)
        selectExpOps.disabled = !selectExpOps.disabled
    const inputExpected = document.getElementById("expected-op-input-"+row.id)
    if(inputExpected)
        inputExpected.disabled = !inputExpected.disabled
    const inputSystem = document.getElementById("system-op-input-"+row.id)
    if(inputSystem)
        inputSystem.disabled = !inputSystem.disabled
    const textAreaDescription = document.getElementById("description-op-input-"+row.id)
    if(textAreaDescription)
        textAreaDescription.disabled = !textAreaDescription.disabled
}

const onDeleteButtonClick = (row:any) =>{
    rows = rows.filter((item:any) =>{ return (item.name != row.name)})
    for(let i=0;i<rows.length;i++)
        rows[i].id = i+1

}

const onUpButtonClick = (row:any) =>{
    const index = rows.findIndex((item:any) => { return (item.id == row.id ) })
    if(index > 0)
        rows = moveItem(rows,index-1,index)
}

const onDownButtonClick = (row:any) =>{
    const index = rows.findIndex((item:any) => { return (item.id == row.id ) })
     if(index < rows.length-1)
        rows = moveItem(rows,index+1,index)
}

const onSelectComponent = (row:any,tag:any,value:any) =>{
    const index = rows.findIndex((item:any) => { return (item.id == row.id ) })
     if(index > -1)
        rows[index][tag] = value
}

const onInputComponent = (row:any,tag:any,value:any) =>{
    const index = rows.findIndex((item:any) => { return (item.id == row.id ) })
    //console.log("*** ON INPUT COMPONENT ****", index,tag,value)
     if(index > -1)
        rows[index][tag] = value
}

const onTextAreaComponent = (row:any,tag:any,value:any) =>{
    const index = rows.findIndex((item:any) => { return (item.id == row.id ) })
     if(index > -1)
        rows[index][tag] = value
}

const exitEditor = (event:any) =>{
     rows = []
     modal.style.display = "none";
}

const addTask = (event:any) =>{
		const newtask = { id: rows.length+1, type: "Task", name: "", tag:"", checkType: "BOOLEAN", expOps:"EQ",expected: "",description:"",checkMode:"MANUAL", system:"NA" }
        rows.push(newtask)
        rows = rows
}



const onChangeSelectInput = (e:any)=>{
    const value = e.target.value
    console.log("VALUE",value)
}

const saveTask = (event:any) =>{
    let index = -1
    switch(optype){ 
        case "operations":
            index = findOperation(node)
            graph.nodes[index].data.tasks = JSON.parse(JSON.stringify(rows))
            break
    }
    rows = []
    modal.style.display = "none";
}

// define column configs
const opColumns = [
  {
    key: "id",
    title: "ID",
    value: (v:any) => v.id,
    sortable: true,
    selectOnClick:true,
    headerClass: "table-header-class",
  },
  {
    key: "type",
    title: "TYPE",
    value: (v:any) => v.type,
    sortable: true,
    //renderValue: (v:any) => v.type.toUpperCase(),
    filterOptions: ["Task","Control"],
    renderComponent: {
        component: SelectComponent,
        props: { typeTag:"type",optionsArray, onSelectComponent },
      },
  },
  {
    key: "name",
    title: "NAME",
    value: (v:any) => v.name,
    sortable: true,
    filterOptions: (rows:any) => {
      // use first letter of last_name to generate filter
      let letrs:any = {}
      rows.forEach((row:any) => {
        let letr = row.name.charAt(0)
        if (letrs[letr] === undefined)
          letrs[letr] = {
            name: `${letr.toUpperCase()}`,
            value: letr.toLowerCase(),
          }
      })
      // fix order
      letrs = Object.entries(letrs)
        .sort()
        .reduce((o:any, [k, v]) => ((o[k] = v), o), {})
      return Object.values(letrs)
    },
    filterValue: (v:any) => v.name.charAt(0).toLowerCase(),
    renderComponent: {
        component: InputComponent,
        props: { typeTag:"name",onInputComponent },
      },
  },
  {
    key: "tag",
    title: "TAG",
    value: (v:any) => v.tag,
    sortable: true,
    filterOptions: (rows:any) => {
      // use first letter of last_name to generate filter
      let letrs:any = {}
      rows.forEach((row:any) => {
        let letr = row.tag.charAt(0)
        if (letrs[letr] === undefined)
          letrs[letr] = {
            name: `${letr.toUpperCase()}`,
            value: letr.toLowerCase(),
          }
      })
      // fix order
      letrs = Object.entries(letrs)
        .sort()
        .reduce((o:any, [k, v]) => ((o[k] = v), o), {})
      return Object.values(letrs)
    },
    filterValue: (v:any) => v.tag.charAt(0).toLowerCase(),
    renderComponent: {
        component: InputComponent,
        props: { typeTag:"tag",onInputComponent },
      },
  },
  {
    key: "checkType",
    title: "CHECKTYPE",
    value: (v:any) => v.checkType,
    sortable: true,
    //renderValue: (v:any) => v.checkType.toUpperCase(),
    filterOptions: ["BOOLEAN","ANALOG","STRING"],
    renderComponent: {
        component: SelectComponent,
        props: { typeTag:"checkType",optionsArray, onSelectComponent },
      },
  },
  {
    key: "expOps",
    title: "OP",
    value: (v:any) => v.expOps,
    sortable: true,
    //renderValue: (v:any) => v.checkMode.toUpperCase(),
    filterOptions: ["EQ","NEQ","GT","GTE","LT","LTE","RANGE"],
     renderComponent: {
        component: SelectComponent,
        props: { typeTag:"expOps",optionsArray, onSelectComponent },
      },
  },
  {
    key: "expected",
    title: "EXPECTED",
    value: (v:any) => v.expected,
    sortable: true,
    filterOptions: (rows:any) => {
      // use first letter of last_name to generate filter
      let letrs:any = {}
      rows.forEach((row:any) => {
        let letr = row.expected.charAt(0)
        if (letrs[letr] === undefined)
          letrs[letr] = {
            name: `${letr.toUpperCase()}`,
            value: letr.toLowerCase(),
          }
      })
      // fix order
      letrs = Object.entries(letrs)
        .sort()
        .reduce((o:any, [k, v]) => ((o[k] = v), o), {})
      return Object.values(letrs)
    },
    filterValue: (v:any) => v.expected.charAt(0).toLowerCase(),
     renderComponent: {
        component: InputComponent,
        props: { typeTag:"expected",onInputComponent },
      },
  },
  {
    key: "description",
    title: "DESCRIPTION",
    value: (v:any) => v.description,
    sortable: false,
     renderComponent: {
        component: TextAreaComponent,
        props: { typeTag:"description",onTextAreaComponent },
      },
  },
  {
    key: "checkMode",
    title: "CHECKMODE",
    value: (v:any) => v.checkMode,
    sortable: true,
    //renderValue: (v:any) => v.checkMode.toUpperCase(),
    filterOptions: ["NOCHECK","AUTOMATIC","MANUAL"],
     renderComponent: {
        component: SelectComponent,
        props: { typeTag:"checkMode",optionsArray, onSelectComponent },
      },
  },
  {
    key: "system",
    title: "SYSTEM",
    value: (v:any) => v.system,
    sortable: true,
    filterOptions: (rows:any) => {
      // use first letter of last_name to generate filter
      let letrs:any = {}
      rows.forEach((row:any) => {
        let letr = row.system.charAt(0)
        if (letrs[letr] === undefined)
          letrs[letr] = {
            name: `${letr.toUpperCase()}`,
            value: letr.toLowerCase(),
          }
      })
      // fix order
      letrs = Object.entries(letrs)
        .sort()
        .reduce((o:any, [k, v]) => ((o[k] = v), o), {})
      return Object.values(letrs)
    },
    filterValue: (v:any) => v.system.charAt(0).toLowerCase(),
     renderComponent: {
        component: InputComponent,
        props: { typeTag:"system", onInputComponent },
      },
  },
  {
      key: "edit",
      title: "",
      sortable: false,
      renderComponent: {
        component: EditComponent,
        props: { onEditButtonClick, onDeleteButtonClick, onUpButtonClick,onDownButtonClick },
      },
    }
]



 const findOperation = (currnode:any)=>{
     let index = -1
     switch(optype){
         case "operations":
	         if(currnode.data.operations && currnode.data.operations.nodes)
		        index = currnode.data.operations.nodes.findIndex((item:any) =>{ return  (item.data.uid == opuid ) })
                break
     }
     return index
 }

 let columns = opColumns

</script>
     
	<div class= "operation-editor-class" bind:this={element} >
		<div class="class-panel-header" style="border-bottom: 1px solid;">
			    <div class= "class-header-title">
					TASK EDITOR   - 
				</div>
				<label class= "class-panel-cell" name="select">
                PHASE
	            <input type="text" value={phasename} disabled style="color:red;">
            </label>
			<label class= "class-panel-cell" name="select">
                OPERATION
	            <input type="text" value={operationname} disabled style="color:red;">
            </label>
				<div class="class-last-item">
					<input type="image" src="../add.svg"  on:click={addTask} alt="Submit" width="25" height="25" > 
					<input type="image" src="../SAVE.svg"  on:click={saveTask} alt="Submit" width="25" height="25" > 
					<input type="image" src="../EXIT.svg" on:click={exitEditor} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		
		<div class= "class-panel-row">
            TASK/CONTROL LIST
            {#if operationname != 'CHOICE'}
                <SvelteTable columns="{columns}" bind:rows="{rows}"/>
            {:else}
                <SelectInput bind:optionInputs={optionInputs} onChangeSelectInput={onChangeSelectInput}/>
            {/if}
		</div>
	</div>
	

<style>

.operation-editor-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
}

.class-panel-header {
  display: flex;
  text-align: right;
}
.class-header-title {
  font-weight: bold;
}

.class-last-item {
  margin-left: auto;
}

.class-panel-row {
  display: block;
  justify-content:left;
  font-family: Arial, Helvetica, sans-serif;
  font-size: small;
  font-weight: bold;
}

.class-panel-cell {
  display: block;
  /*flex-direction: row;
  justify-content: flex-end;*/
  text-align: left;
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: small;
  font-weight: bold;
}
.table-header-class{
     text-align: left;
     color: red;
}

</style>