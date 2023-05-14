<script lang="ts">
import { onMount} from "svelte";
import IntersectionObserver from "svelte-intersection-observer";

export let node:any ={data:{}}

let modal:any
let opuid:any
let element:any;
let operation:any
let operationname:any

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

 

</script>
     <IntersectionObserver {element} on:observe={(e) => {
		    opuid = modal.getAttribute("data-opuid")
			operation = findOperation(node)
			if(operation)
				operationname = operation.name
		    console.log("**** IS ITERSECTING ******* ",opuid,operation)}} >
    
	<div class="operation-editor-class" bind:this={element}>
		<p>Some text in the Modal..with {opuid}  {operationname}</p>
	</div>
	</IntersectionObserver>

<style>
</style>