<script lang="ts">
import {onMount} from "svelte"
import { navigate } from 'svelte-routing';

export let items:any
export let modalId:any

onMount(() => {
	
  });

const exit = (e:any)=>{
	 const modal = document.getElementById(modalId)
	 if(modal)
		modal.style.display = "none";
}

const changeApp = (e:any)=>{
	const target = e.target
	navigate(target.id, {replaceState:true}) 
}
</script>


<div class="class-u2t-modal" id={modalId}>
	<div class= "modal-content" on:mouseleave={exit}>
		<div class= "class-u2t-modal-tool">
			<img src="EXIT.svg" alt="X" width="20" on:click={exit}>
		</div>
		{#each items as Item}
			<div>
				 <input type="image" id="{Item.link}" src="{Item.image}" alt="ALT IMAGE" height="{Item.height}" on:click={changeApp} />
				 <span>{Item.tag}</span>
			</div>
		{/each}
	</div>
</div>

<style>
/* The Modal (background) */
.class-u2t-modal {
  display: none;
  position: absolute; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  width: 20%; /* Full width */
  min-width: 200px; /* Full width */
  height: auto; /* Full height */
  top: -50px;
  right: 20px;
 
}
.class-u2t-modal-tool{
	display:flex;
	justify-content: right;
	cursor: pointer;
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: 0;
  padding: 20px;
  border: 1px solid #888;
  border-color:  #d5e8d4 ;
  width: 80%;
  overflow: auto; /* Enable scroll if needed */
}
  
</style>