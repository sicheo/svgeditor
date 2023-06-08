<script lang="ts">
// https://dev.to/alexboyko/javascript-svg-diagram-editor-39-kb-open-source-library-2eh
// https://www.sarasoueidan.com/blog/svg-coordinate-systems/
// https://icons8.com/icons/material-outlined
// 3D Graphics https://zzz.dog/getting-started

import { onMount} from "svelte";
import { SVG } from '@svgdotjs/svg.js'
import gpath from "./classes/gpath"
import {_calcDAttr} from "./classes/gutils"
import { fly } from 'svelte/transition';
import TaskEditor from "../TaskEditor/TaskEditor.svelte"
import SubGraph from "../DiagramEditor/SubGraph.svelte"
import ContextMenu from './ContextMenu/ContextMenu.svelte'
import {getMenuItems} from '../../script/api.js'
import Panel from '../../components/MenuPanels/Panel.svelte'



// EXPORTS
export let graphtype = 'DAG'
export let graph:any
export let currentnode:any ={data:{type:'MASTER',level:'level1'}}
export let draw:any
export let mainmenusave: any = (param:any)=>{}
export let mainmenuload: any = (param:any)=>{}
export let mainmenuimport: any = (param:any)=>{}
export let mainmenuexport: any = (param:any)=>{}
export let mainmenuclear: any = (param:any)=>{}
export let menubuild:any = (param:any)=>{}
export let panelcontroller:any
export let width = 1200
export let height = 600


export const  nodeoptions:any = {
				horizontal:true,
				vertical:false,
				shapetype:'RECT',
				width:120,
				height:80
			}

export let panels:any
export let color = 'Teal'
export let bgcolor = '#f9f9f9'
export let component:any = panels.find((item:any) => item.type == 'MASTER').component;
export let menuoptions:any
export let submenuoptions:any


let drawcurve = false
let path:any 
let saved:any
let contextname = "context-graph-menu"
let contextnamesub = "context-subgraph-menu"

const mainmenuitems: any[] = [
				{ name: 'SAVE', image: './edit.svg', callback: mainmenusave },
				{ name: 'LOAD', image: './edit.svg', callback: mainmenuload },
				{ name: 'IMPORT', image: './close.svg', callback: mainmenuimport },
				{ name: 'EXPORT', image: './close.svg', callback: mainmenuexport },
				{ name: 'CLEAR', image: './close.svg', callback: mainmenuclear },
			]


onMount(async () => {  
		
		let draggable = (await import("@svgdotjs/svg.draggable.js")); 
		let panzoom = (await import('@svgdotjs/svg.panzoom.js'))
		
		// LOAD MENUITEMS
		for(let i=0;i<menuoptions.length;i++){
			const body = await getMenuItems(menuoptions[i].id,true)
			menuoptions[i].items = body.data
		}
		
		let startnode:any
		let endnode:any
		let startsock:any
		let endsock:any

		saved = currentnode.data
		
		

		draw = await SVG().addTo('#div-graph-container').size(width, height).panZoom({ zoomMin: 0.2, zoomMax: 20, zoomFactor: 0.1 })
		draw.id("svg-graph-container")
		draw.viewbox(0,0,1400,600)
		
		let style = draw.style('#svg-graph-container', {border: '1px solid rgba(0, 0, 0, .2)'})

		// PAN ZOOM EVENTS

		draw.on("zoom",(event:any)=>{
			//console.log("**** ZOOM ****",event.detail)
		})

		draw.on("panEnd",(event:any)=>{
			//console.log("**** PAN ****",event.detail)
		})
		

		draw.on("startcurve", (ev:any) => {
			// When startcurve fired set drawcurve status = true and add edge to graph
			startnode = ev.detail.node
			startsock = ev.detail.socket
			let rbox = startsock.sock.rbox()
			const point = draw.point(rbox.x + rbox.w/2 ,rbox.y + rbox.h/2)
			const pathopts = {pathid:"PATH-"+graph.getPathnum(),uid:graph.getPathnum()}
			const npath = new gpath(draw,graph,pathopts)
			const d = 'm'+point.x+' '+point.y+''
			path = npath.draw(d)
			path.path.attr('id',pathopts.pathid)
			path.path.fill('none').move(point.x, point.y)
			path.path.stroke({ color: '#f06', width: 2, linecap: 'round', linejoin: 'round' })
			drawcurve=true
			path.addFrom(startnode)
			draw.on("mousemove",function (ev:any) {
				// while drawcurve modify edge following mouse movements
				const point1 = draw.point(ev.clientX,ev.clientY)
				const start ={position:{x:point.x,y:point.y},dir:'right'}
				const end ={position:{x:point1.x,y:point1.y},dir:'left'}
				const d = _calcDAttr(path.coef,start,end)
				path.path.plot(d)
			})
		})
		
		draw.on("sockmouseover", (ev:any) => {
			if(drawcurve){
				endsock = ev.detail.socket
				endnode = ev.detail.node
				switch(graphtype){
					case 'TREE':
						// IF TREE ADD ONLY ONE PATH TO ENDSOCKET && NO CYCLES
						if(endsock.paths.length == 0 && endnode.nodenum > path.from[0].nodenum){
							drawcurve=false
							draw.off('mousemove')
							startsock.addPath(path)
							endsock.addPath(path)
							path.addTo(endnode)
							graph.addPath(path.getPathInfo(),path,draw)
						}
						break;
					case 'DAG':
						// IF DAG NO CYCLES
						if(endnode.nodenum > path.from[0].nodenum){
							drawcurve=false
							draw.off('mousemove')
							startsock.addPath(path)
							endsock.addPath(path)
							path.addTo(endnode)
							graph.addPath(path.getPathInfo(),path,draw)
						}
						break;
					case "FEEDBACK":
						drawcurve=false
						draw.off('mousemove')
						startsock.addPath(path)
						endsock.addPath(path)
						path.addTo(endnode)
						graph.addPath(path.getPathInfo(),path,draw)
						break;

				}
			}
		})

		draw.on("contextmenu", async (ev:any) => {
			ev.preventDefault()
			let contextMenu = document.getElementById(contextname);
			let mouseX = ev.clientX;
			let mouseY = ev.clientY;
			let menuHeight = contextMenu.getBoundingClientRect().height;
			let menuWidth = contextMenu.getBoundingClientRect().width;
			let width = window.innerWidth;
			let height = window.innerHeight;
			if (width - mouseX <= 200) {
            contextMenu.style.borderRadius = "5px 0 5px 5px";
            contextMenu.style.left = width - menuWidth + "px";
            contextMenu.style.top = mouseY + "px";
            //right bottom
            if (height - mouseY <= 200) {
              contextMenu.style.top = mouseY - menuHeight + "px";
              contextMenu.style.borderRadius = "5px 5px 0 5px";
            }
          }
          //left
          else {
            contextMenu.style.borderRadius = "0 5px 5px 5px";
            contextMenu.style.left = mouseX + "px";
            contextMenu.style.top = mouseY + "px";
            //left bottom
            if (height - mouseY <= 200) {
              contextMenu.style.top = mouseY - menuHeight + "px";
              contextMenu.style.borderRadius = "5px 5px 5px 0";
            }
          }
          //display the menu
          contextMenu.style.visibility = "visible";
			
		})

		draw.on("click", async (ev:any) => {
			let contextMenu = document.getElementById(contextname);
			if(contextMenu){
				if (!contextMenu.contains(ev.target)) {
					contextMenu.style.visibility = "hidden";
				}
			}
		})

	});


	// ***********************
	// END DRAW GRAPH FUNCTIONS
	// ***********************

	const handleKeydown = (evt:any) =>{
		switch(evt.key){
			case 'Escape':
				if(drawcurve){
					drawcurve=false
					draw.off('mousemove')
					path.path.remove()
				}
				break;
			default:
				break
		}
	}


	

</script>
	<div class="class-div-editor-container" id="div-graph-menu" >
		<div class="class-div-graph-container" id="div-graph-container" >
		</div>
		<div class="class-div-panel-container" id="editor-panel" transition:fly={{x: 250, opacity: 1}} style="visibility:hidden; background-color: {bgcolor};">
			<Panel bind:node={currentnode} panelcontroller={panelcontroller} {component} title={currentnode.data.name}/>
		</div>
    </div>	
	<svelte:window on:keydown={handleKeydown}/>
	<div class="modal-editor-div" id="modal-editor-div-id" data-opuid='' data-optype=''>
		<div class="modal-editor-content">
			<TaskEditor node = {currentnode} />
		</div>
	</div>
	<div class="modal-subgraph-div" id="modal-subgraph-div-id">
		<div class="modal-subgraph-content" id="modal-subgraph-content-id">
			<SubGraph bind:maingraph={graph} bind:node={currentnode} contextname={contextnamesub} {submenuoptions}/>
		</div>
	</div>
	<ContextMenu {menubuild} graph={graph} {draw} contextname={contextname} menuitems={menuoptions} />
<style>


.class-div-graph-container {
  grid-area: graph;
  width: 100%;
}
.class-div-panel-container {
  display:block;
  grid-area: panel;
  max-width: 240 px;
  border: 0.5px solid;
  padding: 6px;
}


.class-div-editor-container {
  display: grid;
  grid-template-columns: 25% 25% 25% auto;
  grid-template-rows: auto;
  grid-template-areas: 
    "graph  graph graph panel";
}

label {
  display: block;
  /*flex-direction: row;
  justify-content: flex-end;*/
  text-align: left;
  width: 190px;
  margin-bottom: 5px;
  font-weight: bold;
}
 /* The Modal (background) */
.modal-editor-div {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-editor-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.modal-close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.modal-close:hover,
.modal-close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
/* SUBGRAPH*/
.modal-subgraph-div {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.1); /* Black w/ opacity */
}

/* Modal Content */
.modal-subgraph-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  height: 65%;
}
</style> 
