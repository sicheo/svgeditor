<script lang="ts">
import {getMonitorStats } from '../../script/api.js'
import {mock} from '../../ustore.js'

import { _ } from 'svelte-i18n'
import { onMount} from "svelte";
import SvelteChart from '../Chart/SvelteChart.svelte'
import { BarChartSimple,LineChart,AreaChart } from "@carbon/charts-svelte";

export let color
export let device:any = {}


let chartdata = []
let component = LineChart
let index = 0
let interval:any

onMount(async ()=>{
	   const div = document.getElementById("test-interval-span")
       if(div)
            div.addEventListener("refreshdevice",refreshChartListener)

    });

const refreshChartListener = async (ev:any)=>{
	interval = setInterval(async function() {
		const stats = await getMonitorStats(device,$mock)
		const element = document.getElementById("test-interval-span")
		if(element)
			element.innerHTML = stats.cpuUsage
	}, 3000);
}

const exitPage = (ev:any)=>{
	clearInterval(interval); 
	const div = document.getElementById("show-device-dialog")
    if(div)
        div.style.display = 'none'
}



</script>
    <div class="up2twin-dialog-class" style="top: 2%;left: 15%;width: 70%;height: 85%;margin: auto;">
		<div class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
				<p>TO BE COMPLETED</p>
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body" style="--color:{color};">
			<!-- START EDIT DEVICE INPUTS-->
			 <span id="test-interval-span"></span>
			<!-- END EDIT DEVICE INPUTS-->
		</div>
	</div>

<style global>
/*
.point-graph-class{
	position:absolute;
	top: 2%;
	left: 15%;
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 70%;
	height: 85%;
	margin: auto;
}
.class-panel-header {
  display: flex;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
  background-color: #eeeeee;
}*/

.class-panel-header p{
 margin-left: 8px;
}

/*
.class-panel-body {
  display: block;
  text-align: center;
  color: var(--color);
  font-weight:bold ;
}*/

</style>