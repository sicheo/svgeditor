<script lang="ts">
import {getControllers,getMachines,getPointsers } from '../../script/api.js'
import {mock} from '../../ustore.js'
 import {dragElement} from '../../script/utils.js'

import { _ } from 'svelte-i18n'
import { onMount} from "svelte";
import SvelteChart from '../Chart/SvelteChart.svelte'
import SvelteEChart from '../Chart/SvelteEChart.svelte'

import { BarChartSimple,LineChart,AreaChart } from "@carbon/charts-svelte";

export let color = "#000000"
export let point:any = {}
export let agent:any = {source:{}}

let controllers = []
let machines = []
let chartdata = []
let echartdata = {data:[],timestamp:[],title:''}
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
		"toolbar":{"enabled":false}
}


onMount(async ()=>{
      let  response = await getControllers(null,$mock)
       controllers = response.data
	   if(!controllers)
			controllers = []
	   response = await getMachines(null,$mock)
       machines = JSON.parse(JSON.stringify(response.data))
	   const div = document.getElementById("svelte-chart-viewer")
       if(div)
            div.addEventListener("refreshchart",refreshChartListener)
	  let dragable = document.getElementById("draggable-point-dialog-row-up-left");
	  let dragzone = document.getElementById("dragzone-point-dialog-row-up-left");
	  dragElement(dragable, dragzone);
	  dragable = document.getElementById("draggable-point-dialog-row-down-left");
	  dragzone = document.getElementById("dragzone-point-dialog-row-down-left");
	  dragElement(dragable, dragzone);
	  dragable = document.getElementById("draggable-point-dialog-row-down-right");
	  dragzone = document.getElementById("dragzone-point-dialog-row-down-right");
	  dragElement(dragable, dragzone);

    });

const refreshChartListener = async (ev:any)=>{
	component=LineChart
	chartoptions.title="Point "+ev.detail.item.tag+" Macchina: "+machines.find((item:any)=>item.uid == ev.detail.item.machine).name+ " "+ev.detail.item.description
	chartoptions.curve = "curveStepAfter"
	chartoptions.toolbar.enabled = false
	chartoptions.axes.left.title = ev.detail.item.type+" "+ev.detail.item.um
	const ret = await getPointsers(ev.detail.item,null,null,$mock)
	chartdata = []
	echartdata = {data:[],timestamp:[],title:''}
    for (let i = 0; i < ret.data.length; i++) {
		const p = ret.data[i]
        var date = new Date(p.timestamp);
        const pnt = { group: p.tag, value: p.value, date: date.toISOString() }
        chartdata.push(pnt)
		echartdata.data.push(p.value)
		echartdata.timestamp.push(date.toISOString())
		echartdata.title = "Point "+ev.detail.item.tag
    }
	chartoptions =chartoptions
}

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
	chartoptions.title="Point "+point.tag+" Macchina: "+machines.find((item:any)=>item.uid == point.machine).name+ " "+point.description
	chartoptions.axes.left.title = point.type+" "+point.um
	chartoptions.curve = "curveMonotoneX"
	switch(target.name){
		case 'chart-line':
			component=LineChart
			break
		case 'chart-area':
			component=AreaChart
			break
		case 'chart-bar':
			component=LineChart
			chartoptions.curve = "curveStepAfter"
			break
	}
	const ret = await getPointsers(point,null,null,$mock)
	chartdata = []
	echartdata = {data:[],timestamp:[]}
    for (let i = 0; i < ret.data.length; i++) {
		const point = ret.data[i]
        var date = new Date(point.timestamp);
        const pnt = { group: point.tag, value: point.value, date: date.toISOString() }
        chartdata.push(pnt)
		echartdata.data.push(point.value)
		echartdata.timestamp.push(date.toISOString())
		echartdata.title = "Point "+ev.detail.item.tag
    }
}

</script>
    <div class="up2twin-dialog-class">
		<div class="point-graph-class">
			<div class="class-panel-header set-color" style="border-bottom: 1px solid;--color:{color};">
					<p>SHOW {point.tag}</p>
					<div class="class-last-item">
						<input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
					</div>
			</div>
			<div class="class-panel-body" style="--color:{color};">
				<!-- START EDIT DEVICE INPUTS-->
				<div class="column left">
					<div class="row upleft">
						<div class="up2twin-draggable" id="draggable-point-dialog-row-up-left">
						<header id="dragzone-point-dialog-row-up-left">
						<div class="class-div-toolbar">
							<span>{$_("point-show-detail")}</span>
						</div>
						</header>
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
								<input type="text" size="20" value="{point.description}" class="class-edit-point" name="point-description" id="point-description"  disabled/>
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
					</div>
					<div class="row downleft">
						<div class="up2twin-draggable" id="draggable-point-dialog-row-down-left">
						<header id="dragzone-point-dialog-row-down-left">
						<div class="class-div-toolbar" style="width:98%;">
							<span>{$_("point-show-chart-type")}</span>
						</div>
						</header>
						<div class="class-div-body">
							<div class="labels1">
								{#if point.atype == 'ANALOG'}
									<label for="chart-line">LINE CHART </label>
									<label for="chart-area">AREA CHART </label>
								{/if}
								<label for="chart-bar">BAR CHART </label>
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
				</div>
				<div class="column right">
					<!--div class="row upright">
						<div class="class-div-toolbar">
							<span>{$_("point-show-chart-chart")}</span>
						</div>
					</!--div-->
					<div class="row downright">
						<div class="up2twin-draggable" id="draggable-point-dialog-row-down-right">
							<header id="dragzone-point-dialog-row-down-right">
							<div class="class-div-toolbar" style="width:98%;--color={color}">
								<span>{$_("point-show-chart-chart")}</span>
							</div>
							</header>
							<div class="class-div-body">
							<SvelteEChart component={component} bind:data={echartdata} bind:options={chartoptions}/>
							<!--SvelteChart component={component} bind:data={chartdata} bind:options={chartoptions}/-->
							</div>
						</div>
					</div>
				</div>
				<!-- END EDIT DEVICE INPUTS-->
			</div>
		</div>
	</div>

<style global>

.point-graph-class{
	position:absolute;
	top: 2%;
	left: 2%;
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	width: 95%;
	height: 85%;
	margin: auto;
	background-color: inherit ;
	color: inherit;
}


.up2twin-dialog-class .class-panel-body label, input {
        display: block;
 }

 .up2twin-dialog-class .class-panel-body label {
        padding: 10px 0 0;
        font-size: small;
    }

    .up2twin-dialog-class .class-panel-body input, select {
        margin: 8px 0 0;
    }

    .up2twin-dialog-class .class-panel-body span {
        color: white;
    }
	
#draggable-point-dialog-row-up-left{
	top:350px;
}

#draggable-point-dialog-row-down-left{
	top:opx;
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
	display:block;
	margin-top: 5px;
	width: 100%;
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
	margin-left: 3px;
}
</style>