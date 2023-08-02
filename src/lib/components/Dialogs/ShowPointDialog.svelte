<script lang="ts">

export let color
export let point:any = {}

import { _ } from 'svelte-i18n'
import { onMount} from "svelte";




onMount(async ()=>{
      
    });

const exitPage = (ev:any)=>{
	const div = document.getElementById("show-point-dialog")
    if(div)
        div.style.display = 'none'
}



</script>
    <div class="point-graph-class">
		<div class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
				<p>SHOW {point.tag}</p>
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body" style="--color:{color};">
			<!-- START EDIT DEVICE INPUTS-->
			
			<!-- END EDIT DEVICE INPUTS-->
		</div>
	</div>

<style>
.point-graph-class{
	position:absolute;
	top: 2%;
	left: 2%;
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 95%;
	height: 85%;
	margin: auto;
}
.class-panel-header {
  display: flex;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
  background-color: #eeeeee;
}

.class-panel-header p{
 margin-left: 8px;
}

.class-panel-body {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: var(--color);
  font-weight:bold ;
}



</style>