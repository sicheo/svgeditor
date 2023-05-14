<script lang="ts">
import { onMount} from "svelte";
import IntersectionObserver from "svelte-intersection-observer";
import SvelteTable from "svelte-table";

export let node:any ={data:{}}

let modal:any
let opuid:any
let element:any;
let operation:any
let operationname:any
let phasename:any

const rows = [
  { id: 1, type: "Task", name: "CLOSE VALVE", tag:"VLV-002-UDC", checkType: "BOOLEAN", expected: "YES",checkMode:"MANUAL", system:"NA" },
  { id: 2, type: "Control", name : "START T", tag:"T-007-DF",checkType: "ANALOG",expected: "< 35 DEGC",checkMode:"AUTOMATIC", system:"IFIX-001" },
  { id: 3, type: "Control", name : "END T", tag:"T-007-DF",checkType: "ANALOG",expected: "< 35 DEGC",checkMode:"AUTOMATIC", system:"IFIX-001" },
];

// define column configs
const columns = [
  {
    key: "id",
    title: "ID",
    value: (v:any) => v.id,
    sortable: true,
    selectOnClick:true,
    filterOptions: (rows:any) => {
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
    filterValue: (v:any) => Math.floor(v.id / 10),
    headerClass: "table-header-class",
  },
  {
    key: "type",
    title: "TYPE",
    value: (v:any) => v.type,
    sortable: true,
    renderValue: (v:any) => v.type.toUpperCase(),
    filterOptions: ["Task","Control"],
    headerClass: "table-header-class",
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
  },
  {
    key: "checkType",
    title: "CHECKTYPE",
    value: (v:any) => v.checkType,
    sortable: true,
    renderValue: (v:any) => v.checkType.toUpperCase(),
    filterOptions: ["BOOLEAN","ANALOG","STRING"]
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
  },
  {
    key: "checkMode",
    title: "CHECKMODE",
    value: (v:any) => v.checkMode,
    sortable: true,
    renderValue: (v:any) => v.checkMode.toUpperCase(),
    filterOptions: ["AUTOMATIC","MANUAL"]
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
  },
]

onMount(async ()=>{
   console.log("MOUNT OPERATION EDITOR",node)
   // GET MODAL
   modal = document.getElementById("modal-editor-div-id")

 });

 const findOperation = (currnode:any)=>{
	 if(currnode.data.operations)
		operation = currnode.data.operations.find((item:any) =>{ return  (item.uid == opuid ) })
		return operation
 }

 const exitEditor = (event:any) =>{
			modal.style.display = "none";
}

</script>
     <IntersectionObserver {element} on:observe={(e) => {
		    opuid = modal.getAttribute("data-opuid")
			operation = findOperation(node)
			phasename = node.data.name
			if(operation)
				operationname = operation.name
		    console.log("**** IS ITERSECTING ******* ",opuid,operation)}} >
    
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
                    <input type="image" src="edit.svg"  alt="Submit" width="25" height="25" > 
                    <input type="image" src="DELETE.svg"  alt="Submit" width="25" height="25" > 
					<input type="image" src="SAVE.svg"  alt="Submit" width="25" height="25" > 
					<input type="image" src="EXIT.svg" on:click={exitEditor} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		
		<div class= "class-panel-row">
            TASK/CONTROL LIST
            <SvelteTable columns="{columns}" rows="{rows}"></SvelteTable>
		</div>
	</div>
	</IntersectionObserver>

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