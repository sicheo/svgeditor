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
			<div class="column left">
				<div class="row upleft">
					<div class="class-div-toolbar">
						<span>POINT DETAIL</span>
					</div>
				</div>
				<div class="row downleft">
					<div class="class-div-toolbar">
						<span>CHART TYPE</span>
					</div>
				</div>
			</div>
			<div class="column right">
				<div class="row upright">
					<div class="class-div-toolbar">
						<span>CHART TOOLBAR</span>
					</div>
				</div>
				<div class="row downright">
					<div class="class-div-toolbar">
						<span>CHART</span>
					</div>
				</div>
			</div>
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
  color: var(--color);
  font-weight:bold ;
}
.column {
  float: left;
}

.left {
  margin-top: 5px;
  padding: 10px;
  width: 30%;
}

.right {
 margin-top: 5px;
  padding: 10px;
  width: 60%;
}
.row {
  display: block;
}
.upleft{
	display:flex;
	margin-top: 5px;
	width: 90%;
}

.downleft{
	display:flex;
	margin-top: 5px;
	width: 40%;
}

.upright{
	display:flex;
	margin-top: 5px;
	width: 100%;
}

.downright{
	display:flex;
	margin-top: 5px;
	width: 100%;
}

.class-div-toolbar{
	border: 1px solid;
	padding-left: 5px;
	display:block;
	text-align: left;
	background-color: #eeeeee;
	width:100%;
}
</style>