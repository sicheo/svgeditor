<script lang="ts">
import {getControllers,getMachines,getPointsers } from '../../script/api.js'
import {mock} from '../../ustore.js'

import { _ } from 'svelte-i18n'
import { onMount} from "svelte";
import SvelteChart from '../Chart/SvelteChart.svelte'
import { BarChartSimple,LineChart,AreaChart } from "@carbon/charts-svelte";

export let color
export let point:any = {}
export let agent:any = {source:{}}

let controllers = []
let machines = []
let chartdata = []
let component = LineChart
let chartoptions = {
		"title": "Point "+point.tag+" Macchina: "+point.machine+ " "+point.description,
        "axes": {
            "bottom": {
                "title": "Sampling time ",
                "mapsTo": "date",
                "scaleType": "time"
            },
            "left": {
                "mapsTo": "value",
                "title": "UM "+point.um,
                "scaleType": "linear"
            }
        },
        "curve": "curveMonotoneX",
        "height": "400px",
        "width": "800px",
        "experimental": true,
        "zoomBar": {
            "top": {
                "enabled": true
            }
        },
}


onMount(async ()=>{
      let  response = await getControllers(null,$mock)
       controllers = response.data
	   if(!controllers)
			controllers = []
	   response = await getMachines(null,$mock)
       machines = JSON.parse(JSON.stringify(response.data))
    });

const exitPage = (ev:any)=>{
	const div = document.getElementById("show-point-dialog")
    if(div)
        div.style.display = 'none'
}

const getMachineName = (uid:any)=>{
	let machinename = ''
	const found = machines.find((item:any)=>item.uid == uid)
	if(found)
		machinename = found.name
	return(machinename)
}

const setGraph = async (ev:any)=>{
	const target = ev.target
	console.log(">>>> CHART TYPE", target.name)
	chartoptions.title="Point "+point.tag+" Macchina: "+machines.find((item:any)=>item.uid == point.machine).name+ " "+point.description
	chartoptions.axes.left.title = point.type+" "+point.um
	switch(target.name){
		case 'chart-line':
			component=LineChart
			break
		case 'chart-bar':
			component=BarChartSimple
			break
		case 'chart-area':
			component=AreaChart
			break
	}
	const ret = await getPointsers(point,null,null,$mock)
	chartdata = []
    for (let i = 0; i < ret.data.length; i++) {
		const point = ret.data[i]
        var date = new Date(point.timestamp);
        const pnt = { group: point.tag, value: point.value, date: date.toISOString() }
        chartdata.push(pnt)
    }
	console.log(">>>> POINTSERS", chartdata)
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
					<div class="class-div-body">
						<div class="labels1">
							<label for="tag">{$_("table-db-agent-db-tag")}: </label>
							<label for="point-description">{$_("table-db-agent-db-description")} </label>
							<label for="atype">{$_("table-db-agent-db-atype")}: </label>
							<label for="type">{$_("table-db-agent-db-type")}: </label>
							{#if point.atype == 'ANALOG'}
								<label for="point-um">{$_("table-db-agent-db-um")} </label>
								<label for="hlim">{$_("table-db-agent-db-hlim")}: </label>
								<label for="llim">{$_("table-db-agent-db-llim")}: </label>
							{/if}
							<label for="point-area">{$_("table-db-agent-db-area")} </label>
							<label for="host">{$_("table-db-agent-db-address")}: </label>
							{#if point.atype !== 'ANALOG'}
									<label for="point-bit">{$_("table-db-agent-db-bit")} </label>
							{/if}
							<label for="point-controller">{$_("table-db-agent-db-controller")} </label>
							<label for="point-machine">{$_("table-db-agent-db-machine")} </label>
							<label for="point-driver">{$_("table-db-agent-source-driver").toUpperCase()} </label>
						</div>
						<div class="inputs1">
							<input type="text" size="17" style="font-weight:bold;" value="{point.tag}" class="class-edit-point" name="point-tag" id="point-tag"  disabled/>
							<input type="text" size="38" value="{point.description}" class="class-edit-point" name="point-description" id="point-description"  disabled/>
							<input type="text" value="{point.atype}" class="class-edit-point" name="atype" id="atype"  disabled/>
							<input type="text" value="{point.type}" class="class-edit-point" name="type" id="type"  disabled/>
							{#if point.atype == 'ANALOG'}
								<input type="text" value="{point.um}" class="class-edit-point" name="point-um" id="point-um"  disabled/>
								<input type="text" value="{point.hlim}" class="class-edit-point" name="point-hlim" id="point-hlim"  disabled/>
								<input type="text" value="{point.llim}" class="class-edit-point" name="point-llim" id="point-hlim"  disabled/>
							{/if}
							<input type="text" value="{point.area}" class="class-edit-point" name="point-area" id="point-area"  disabled/>
							<input type="number" value="{point.address}" class="class-edit-point" name="point-address" id="point-address"  disabled/>
							{#if point.atype !== 'ANALOG'}
								<input type="text" value="{point.bit}" class="class-edit-point" name="point-bit" id="point-bit"  disabled/>
							{/if}
							<select class="class-edit-point" name="point-controller" id="point-controller"  style="align-items:left;" disabled>
								{#each controllers as Controller}
									{#if Controller.uid == point.controller}
										<option value={Controller.uid} selected>{Controller.name}</option>
									{:else}
										<option value={Controller.uid}>{Controller.name}</option>
									{/if}
								{/each}
							</select>
							<input type="text" value="{getMachineName(point.machine)}" class="class-edit-point" name="point-machine" id="point-machine"  disabled/>
							<input type="text" value="{agent.source.driver}" class="class-edit-point" name="point-driver" id="point-driver"  disabled/>
						</div>
					</div>
				</div>
				<div class="row downleft">
					<div class="class-div-toolbar" style="width:98%;">
						<span>CHART TYPE</span>
					</div>
					<div class="class-div-body">
						<div class="labels1">
							{#if point.atype == 'ANALOG'}
								<label for="chart-line">LINE CHART </label>
								<label for="chart-area">AREA CHART </label>
							{/if}
							<label for="chart-bar">BARCHART </label>
						</div>
						<div class="inputss1">
							{#if point.atype == 'ANALOG'}
								<input type="image" name="chart-line"  src="/LINECHART.svg" alt="ALT IMAGE" height="20" on:click={setGraph}/>
								<input type="image" name="chart-area"  src="/AREACHART.svg" alt="ALT IMAGE" height="20" on:click={setGraph}/>
							{/if}
							<input type="image" name="chart-bar"  src="/BARCHART.svg" alt="ALT IMAGE" height="20" on:click={setGraph}/>
						</div>
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
					<SvelteChart component={component} data={chartdata} options={chartoptions}/>
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
  width: 38%;
}

.right {
 margin-top: 5px;
  padding: 10px;
  width: 57%;
}
.row {
  display: block;
}
.upleft{
	display:block;
	margin-top: 5px;
	width: 90%;
	
}

.downleft{
	display:block;
	margin-top: 15px;
	width: 43%;
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
	background-color: #c0c0c0;
	width:99%;
}
.class-div-body{
	width: 100%;
	display:flex;
	border-right: 1px solid;
	border-bottom: 1px solid;
	border-left: 1px solid;
	background-color: #f9f9f9f9;
}
label,
input {
    display: block;
}
label {
    padding: 10px 0 0;
	font-size: small;
}
input {
    margin: 8px 0 0;
}
select {
    margin: 8px 0 0;
}
span {
	color:white;
}
.labels1 {
    float: left;
    width: 180px;
	text-align: left;
	margin-left: 5px;
}
.inputs1 {
    float: left;
    width: 200px;
}
.inputs1 select{
    display: flex;
}
</style>