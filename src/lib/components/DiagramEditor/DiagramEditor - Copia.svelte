<script lang="ts">
// https://dev.to/alexboyko/javascript-svg-diagram-editor-39-kb-open-source-library-2eh
// https://www.sarasoueidan.com/blog/svg-coordinate-systems/
// https://icons8.com/icons/material-outlined

import { onMount} from "svelte";
import { SVG } from '@svgdotjs/svg.js'
import gnode from "./classes/gnode"
import gpath from "./classes/gpath"
import {_calcDAttr} from "./classes/gutils"
import { fly } from 'svelte/transition';
    
// EXPORTS
export let graphtype = 'DAG'
export let graph:any
export let currentnode:any ={data:{type:'COMPANY',level:'level1'}}
export let draw:any
export let mainmenusave: any = (param:any)=>{}
export let mainmenuload: any = (param:any)=>{}
export let  mainmenuimport: any = (param:any)=>{}
export let  mainmenuexport: any = (param:any)=>{}
export let  mainmenuclear: any = (param:any)=>{}
//export let menubuild:any = (param:any)=>{}
export let menuenabled:boolean = true
export let panelcontroller:any
export let  nodeoptions:any = {
				horizontal:true,
				vertical:false,
				shapetype:'RECT',
				width:110,
				height:80
			}
export let panels:any
export let color = 'Teal'
export let bgcolor = '#f9f9f9'
export let component:any = panels.find((item:any) => item.type == 'ROOT').component;


let drawcurve = false
let path:any 
let mainmenu:any




const mainmenuitems: any[] = [
				{ name: 'SAVE', image: '/edit.svg', callback: mainmenusave },
				{ name: 'LOAD', image: '/edit.svg', callback: mainmenuload },
				{ name: 'IMPORT', image: '/close.svg', callback: mainmenuimport },
				{ name: 'EXPORT', image: '/close.svg', callback: mainmenuexport },
				{ name: 'CLEAR', image: '/close.svg', callback: mainmenuclear },
			]

//let menubuild:any
let panelObject:any

onMount(async () => {  
		
		let draggable = (await import("@svgdotjs/svg.draggable.js")); 
		let panzoom = (await import('@svgdotjs/svg.panzoom.js'))
		
		
		let startnode:any
		let endnode:any
		let startsock:any
		let endsock:any
		
		

		draw = await SVG().addTo('#div-graph-container').size(1400, 600).panZoom({ zoomMin: 0.2, zoomMax: 10, zoomFactor: 0.1 })
		draw.id("svg-graph-container")
		draw.viewbox(0,0,1400,600)
		
		graph.setDraw(draw)
		

		/*
		const createPanel = (x:any,y:any,gnode:any) => {
			const menubuild = (x:any,y:any,width:any,height:any,gnode:any) =>{
				const menuitems: any[] = [
					{ name: 'EDIT', image: './edit.svg', item: null },
					{ name: 'EXIT', image: './close.svg', item: null }
				]
				const mwidth = 10
				const mheigth = 10
				const mopts = {x:x+width-mwidth*menuitems.length,y:y+mheigth/2,width:mwidth,heigth:mheigth,menuitems:menuitems}
				let m = new gmenu(gnode.node,mopts)
				const menu = m.draw()
				for (let i = 0; i < menu.menuitems.length; i++) {
					menu.menuitems[i].item.on("mouseover", (ev: any) => {
						menu.scale(1.5,i)
					})
					menu.menuitems[i].item.on("mouseout", (ev: any) => {
						menu.scale(1, i)
					})
					menu.menuitems[i].item.on("click", (ev: any) => {
						ev.stopPropagation()
						switch (menu.menuitems[i].name) {
							case 'EDIT':
								break
							case 'EXIT':
								panelObject.remove()
								break
						}
					})
				}
				return(menu)
			}
			const paneloptions = {x:x,y:y}
			const panel = new gpanel(draw,menubuild,gnode,paneloptions)
			return panel
		}
		*/

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
				const d = _calcDAttr(30,start,end)
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
					default:
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

		draw.on("dblclick", async (ev:any) => {
			const point = draw.point(ev.clientX, ev.clientY)
			const options = {
				x:point.x,
				y:point.y,
				nodeid:"NODE-"+graph.getNodenum(),
				nodenum:graph.getNodenum(),
				nnametext:"NODE-"+graph.getNodenum(),
				data:{level:'level1',type:'COMPANY',name:''},
				imagefile:panels[0].img,
			}
			const nopts = {
				...nodeoptions,
				...options,
			}
			let nd:any
			nd = new gnode(draw,graph,panelObject,nopts)
			if (panelObject)
				panelObject.remove()
			nd.draw()
			graph.addNode(nd.getNodeInfo(),nd,draw)
		})

	});

	

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


	const setComponent = (event:any) =>{
		component = panels.find((item:any) => item.type == currentnode.data.type).component;
	}

</script>
	<div class="class-div-editor-container" id="div-graph-menu" >
		<div class="class-div-menu-container">
			{#if menuenabled}
				{#each mainmenuitems as item}
					<input   type="button" value="{item.name}" on:click={item.callback}>
				{/each}
			{/if}
		</div>
		<div class="class-div-graph-container" id="div-graph-container" >
		</div>
		<div class="class-div-panel-container" id="editor-panel"  transition:fly={{x: 250, opacity: 1}} style="visibility:hidden; background-color: {bgcolor};">
			<div class="class-panel-header" >
				<div class="class-last-item">
					<button on:click={panelcontroller('hide',currentnode)} style = '--color:white;--background-color:{color}; --width:23px; border:0'>&#9932;</button>
				</div>
			</div>
			<div class= "class-panel-row">
				<label class= "class-panel-cell">
					Nodeid
					<input type="text" name="name"  bind:value={currentnode.nodeid} class="panel-input panel-input-text" disabled>
				</label>
			</div>
			<div class= "class-panel-row" style="border-bottom: 1px solid;">
				<label class= "class-panel-cell">
					Type
					<select type="text" name="plant" class="panel-input" bind:value={currentnode.data.type} on:change={setComponent}>
						{#each panels as Panel}
							{#if currentnode.data.type == Panel.type}
								<option value="{Panel.type}" selected>{Panel.name}</option>
							{:else}
								<option value="{Panel.type}">{Panel.name}</option>
							{/if}
						{/each}
					</select>
				</label>
			</div>	
			
				<svelte:component this={component} bind:node={currentnode}/>
			
		</div>
    </div>	
	<svelte:window on:keydown={handleKeydown}/>
<style>

.class-div-menu-container {
  display: flex;
  grid-area: header;
}
.class-div-graph-container {
  grid-area: graph;
  width: 100%;
}
.class-div-panel-container {
  grid-area: panel;
  max-width: 200 px;
}


.class-div-editor-container {
  display: grid;
  grid-template-columns: 27% 27% 27% 200px;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "graph  graph graph panel";
}

.class-panel-row {
  display: grid;
  grid-template-columns: auto;
  grid-auto-rows: minmax(30px, auto);
  font-size: smaller;
}
.hr-solid {
    border-bottom: 1px solid ;
}
.class-last-item{
	  margin-left:180px;
  }
</style> 
