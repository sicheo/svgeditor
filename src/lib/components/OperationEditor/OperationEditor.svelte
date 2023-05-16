<script lang="ts">
import { onMount} from "svelte";
import SvelteTable from "svelte-table";
import EditComponent from "./EditComponent.svelte";
import SelectComponent from "./SelectComponent.svelte";
import InputComponent from "./InputComponent.svelte";


export let node:any ={data:{}}

let modal:any
let opuid:any
let element:any;
let operation:any
let operationname:any
let phasename:any

/*let rows:any = [
  { id: 1, type: "Task", name: "CLOSE VALVE", tag:"VLV-002-UDC", checkType: "BOOLEAN", expected: "YES",checkMode:"MANUAL", system:"NA" },
  { id: 2, type: "Control", name : "START T", tag:"T-007-DF",checkType: "ANALOG",expected: "< 35 DEGC",checkMode:"AUTOMATIC", system:"IFIX-001" },
  { id: 3, type: "Control", name : "END T", tag:"T-007-DF",checkType: "ANALOG",expected: "< 35 DEGC",checkMode:"AUTOMATIC", system:"IFIX-001" },
];*/

let rows:any = []
let isRowsInit:boolean = false
let isEntered:boolean = false

const mutationCallback = (mutationList:any) =>{
    mutationList.forEach((mutation) => {
    switch (mutation.type) {
      case "attributes":
        switch (mutation.attributeName) {
          case "data-opuid":
            opuid = mutation.target.getAttribute("data-opuid")
            const index = findOperation(node)
            if(index > -1){
	            phasename = node.data.operations[index].name
		        operationname = node.data.operations[index].name
                if( !node.data.operations[index].tasks || node.data.operations[index].tasks.length == 0){
                    node.data.operations[index].tasks = JSON.parse(JSON.stringify(rows))
                }
                else{
                    rows = JSON.parse(JSON.stringify(node.data.operations[index].tasks))
                    isRowsInit= true
                }
            }
            break;
        }
        break;
    }
  });
}
onMount(async ()=>{
   modal = document.getElementById("modal-editor-div-id")

   const observer = new MutationObserver(mutationCallback);

   observer.observe(modal, { attributes:true,attributeFilter: ["data-opuid"]});

 });

let typeOptions = [
    {id: 1,name:"Task"},
    {id:2,name:"Control"}
]

let checkTypeOptions = [
    {id: 1,name:"BOOLEAN"},
    {id:2,name:"ANALOG"},
    {id:3,name:"STRING"}
]

let checkModeOptions = [
    {id: 1,name:"AUTOMATIC"},
    {id:2,name:"MANUAL"}
]

let optionsArray = [
    {name: "type", options: typeOptions},
    {name: "checkType", options: checkTypeOptions},
    {name: "checkMode", options: checkModeOptions}
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
    const inputExpected = document.getElementById("expected-op-input-"+row.id)
    if(inputExpected)
        inputExpected.disabled = !inputExpected.disabled
    const inputSystem = document.getElementById("system-op-input-"+row.id)
    if(inputSystem)
        inputSystem.disabled = !inputSystem.disabled
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

const exitEditor = (event:any) =>{
     rows = []
     isRowsInit=false
     console.log("***** EXIT OPTIONS *****",isRowsInit)
     modal.style.display = "none";
}

const addOption = (event:any) =>{
		const newoption = { id: rows.length+1, type: "Task", name: "", tag:"", checkType: "BOOLEAN", expected: "",checkMode:"MANUAL", system:"NA" }
        rows.push(newoption)
        rows = rows
}

const saveOption = (event:any) =>{
	const index = node.data.operations.findIndex((item:any) => { return (item.uid == opuid)})
    node.data.operations[index].tasks = JSON.parse(JSON.stringify(rows))
    rows = []
    isRowsInit=false
    console.log("***** SAVE OPTIONS *****",node.data.operations[index],isRowsInit)
    modal.style.display = "none";
}

// define column configs
const columns = [
  {
    key: "id",
    title: "ID",
    value: (v:any) => v.id,
    sortable: true,
    selectOnClick:true,
    /*filterOptions: (rows:any) => {
      // generate groupings of 0-10, 10-20 etc...
      let nums:any = {}
      rows.forEach((row:any) => {
        let num:any = Math.floor(row.id / 10)
        if (nums[num] === undefined)
          nums[num] = { name: `${num * 10} to ${(num + 1) * 10}`, value: num }
      })
      // fix order
      nums = Object.entries(nums)
        .sort()
        .reduce((o:any, [k, v]) => ((o[k] = v), o), {})
      return Object.values(nums)
    },
    filterValue: (v:any) => Math.floor(v.id / 10),*/
    headerClass: "table-header-class",
  },
  {
    key: "type",
    title: "TYPE",
    //value: (v:any) => v.type,
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
    //value: (v:any) => v.checkType,
    sortable: true,
    //renderValue: (v:any) => v.checkType.toUpperCase(),
    filterOptions: ["BOOLEAN","ANALOG","STRING"],
    renderComponent: {
        component: SelectComponent,
        props: { typeTag:"checkType",optionsArray, onSelectComponent },
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
    key: "checkMode",
    title: "CHECKMODE",
    //value: (v:any) => v.checkMode,
    sortable: true,
    //renderValue: (v:any) => v.checkMode.toUpperCase(),
    filterOptions: ["AUTOMATIC","MANUAL"],
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
	 if(currnode.data.operations)
		index = currnode.data.operations.findIndex((item:any) =>{ return  (item.uid == opuid ) })
		return index
 }


</script>
     
	<div class= "operation-editor-class" bind:this={element} >
		<div class="class-panel-header" style="border-bottom: 1px solid;">
			    <div class= "class-header-title">
					OPERATION EDITOR   - 
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
					<!--button on:click={panelcontroller('hide',currentnode)} style = '--color:white;--background-color:{color}; --width:23px; border:0'>&#9932;</button-->
                    <input type="image" src="add.svg"  on:click={addOption} alt="Submit" width="25" height="25" > 
					<input type="image" src="SAVE.svg"  on:click={saveOption} alt="Submit" width="25" height="25" > 
					<input type="image" src="EXIT.svg" on:click={exitEditor} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		
		<div class= "class-panel-row">
            TASK/CONTROL LIST
            <SvelteTable columns="{columns}" bind:rows="{rows}"></SvelteTable>
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