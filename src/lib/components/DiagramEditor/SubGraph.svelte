<script lang="ts">

import { onMount} from "svelte";
import { SVG } from '@svgdotjs/svg.js'
//import gnode from "./classes/gnode"
import gpath from "./classes/gpath"
import gmenu from "./classes/gmenu"
import {_calcDAttr} from "./classes/gutils"
import ContextMenu from './ContextMenu/ContextMenu.svelte'



export let node:any
export let graphtype = 'DAG'
export let bgcolor ="#d5e8d4"
export let color = "#007d35"
export let contextname = "context-menu"

let modal:any
let contextmenu:any
let draw:any
let rect:any
let subgraph:any = {nodes:[],paths:[],svg:'',gnodes:[],gpaths:[]}
let drawcurve = false
let path:any 
let  nodeoptions:any = {
				horizontal:true,
				vertical:false,
				shapetype:'RECT',
				width:120,
				height:50
			}

// MINIMUM NEEDED GRAPH FUNCTIONS
const graphAddNode = (nodinfo:any,node:any,draw:any) =>{
		subgraph.nodes.push(nodinfo)
		subgraph.gnodes.push(node)
		subgraph.svg = draw.svg()
	}

const graphRemoveNode = (nodeid:any,draw:any) => {
		subgraph.gnodes = subgraph.gnodes.filter((item: any) => (item.node.id() != nodeid))
		subgraph.nodes = subgraph.nodes.filter((item: any) => (item.id != nodeid))
        subgraph.svg = draw.svg()
		if(subgraph.gpaths.length == 0 && subgraph.gnodes.length == 0)
			 subgraph.svg = ''
	}

const graphRemovePath = (pathid:any,draw:any) => {
	subgraph.gpaths = subgraph.gpaths.filter((item: any) => (item.path.id() != pathid))
    subgraph.paths = subgraph.paths.filter((item: any) => (item.id != pathid))
    subgraph.svg = draw.svg()
	if(subgraph.gpaths.length == 0 && subgraph.gnodes.length == 0)
			subgraph.svg = ''
}

const graphAddPath = (pathinfo:any,path:any,draw:any) =>{
		subgraph.paths.push(pathinfo)
		subgraph.gpaths.push(path)
		subgraph.svg = draw.svg()
}

const graphGetNodenum = () =>{
		let ret = 0
		for(let i=0;i<subgraph.nodes.length;i++)
			if(subgraph.nodes[i].data.uid >= ret)
				ret = subgraph.nodes[i].data.uid+1
		return ret
}

const graphGetPathnum = () =>{
		let ret = 0
		for(let i=0;i<subgraph.paths.length;i++)
			if(subgraph.paths[i].uid >= ret)
				ret = subgraph.paths[i].uid
		return ret
	}

const graphClear = ()=>{
    if(subgraph.gnodes && subgraph.gnodes.length >0){
		if( subgraph.gnodes[0]){
			subgraph.gnodes[0].remove()
		}
	}
    const panel = document.getElementById("editor-panel")
    if(panel)
        panel.style.visibility = 'hidden'
}

subgraph.addNode = graphAddNode
subgraph.addPath = graphAddPath
subgraph.removeNode = graphRemoveNode
subgraph.removePath = graphRemovePath
subgraph.getNodenum = graphGetNodenum
subgraph.getPathnum = graphGetPathnum
subgraph.clear = graphClear





// NODE MENU BUILDER
const	menubuild = async (x:any,y:any,width:any,height:any,gnode:any) =>{
		const menuitems: any[] = [
			{ name: 'EDIT', image: '/edit.svg', item: null },
			{ name: 'EXIT', image: '/close.svg', item: null }
		]
		const mwidth = 10
		const mheigth = 10
		const mopts = {x:x+width-mwidth*menuitems.length,y:y+mheigth/2,width:mwidth,heigth:mheigth,menuitems:menuitems}
		let m = new gmenu(gnode.node,mopts)
		const menu = m.draw()
		// ADD LISTENERS
		for (let i = 0; i < menu.menuitems.length; i++) {
			menu.menuitems[i].item.on("mouseover", (ev: any) => {
				menu.scale(1.5,i)
			})
			menu.menuitems[i].item.on("mouseout", (ev: any) => {
				menu.scale(1, i)
			})
			menu.menuitems[i].item.on("click", async (ev: any) => {
				ev.stopPropagation()
				switch (menu.menuitems[i].name) {
					case 'EDIT':
						break
					case 'EXIT':
						gnode.remove()
						break
				}
			})
		}
		return(menu)
	}

onMount(async ()=>{
	modal = document.getElementById("modal-subgraph-div-id")
	contextmenu = document.getElementById(contextname)
	let draggable = (await import("@svgdotjs/svg.draggable.js")); 
	let panzoom = (await import('@svgdotjs/svg.panzoom.js'))
	// ADDNG LOCAL SVG 
	draw = await SVG().addTo('#modal-subgraph-content-id').size(800, 400).panZoom({ zoomMin: 0.2, zoomMax: 10, zoomFactor: 0.1 })
	draw.id("svg-subgraph-container")
	draw.viewbox(0,0,800,400)

	let style = draw.style('#svg-subgraph-container', {border: '1px solid rgba(0, 0, 0, .2)'})
   
	let startnode:any
	let endnode:any
	let startsock:any
	let endsock:any

	draw.on("startcurve", (ev:any) => {
			// When startcurve fired set drawcurve status = true and add edge to graph
			startnode = ev.detail.node
			startsock = ev.detail.socket
			let rbox = startsock.sock.rbox()
			const point = draw.point(rbox.x + rbox.w/2 ,rbox.y + rbox.h/2)
			const pathopts = {pathid:"PATH-"+subgraph.getPathnum(),uid:subgraph.getPathnum()}
			const npath = new gpath(draw,subgraph,pathopts)
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
							subgraph.addPath(path.getPathInfo(),path,draw)
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
							subgraph.addPath(path.getPathInfo(),path,draw)
						}
						break;
					case "FEEDBACK":
						drawcurve=false
						draw.off('mousemove')
						startsock.addPath(path)
						endsock.addPath(path)
						path.addTo(endnode)
						subgraph.addPath(path.getPathInfo(),path,draw)
						break;

				}
			}
		})

		/*draw.on("dblclick", async (ev:any) => {
			const point = draw.point(ev.clientX, ev.clientY)
			const options = {
				x:point.x,
				y:point.y,
				nodeid:"NODE-"+subgraph.getNodenum(),
				nodenum:subgraph.getNodenum(),
				nnametext:"NODE-"+subgraph.getNodenum(),
				data:{level:'level0',type:'TASK',name:''},
				imagefile:"/TASK.svg",
				imgwidth: 15,
				imgheight: 15,
				ndescrtext: 'OPERATION'
			}
			const nopts = {
				...nodeoptions,
				...options,
			}
			let nd:any
			nd = new gnode(draw,menubuild,subgraph,null,nopts)
			nd.draw()
			subgraph.addNode(nd.getNodeInfo(),nd,draw)
		})*/

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

const saveTasks = (e:any)=>{
	console.log("***** SAVE *****",subgraph)
	
	
}
const exitEditor = (event:any) =>{
	subgraph.clear()
    modal.style.display = "none";
}
</script>

	<div class="subgraph-comp-content">
		<span style="--color:{color};">{node.data.name} PHASE OPERATIONS</span>
		<!--input type="text"  value="{node.data.name}" disabled/--> 
		<div class="subgraph-comp-tool">
			<input type="image" src="../SAVE.svg"  on:click={saveTasks} alt="Submit" width="25" height="25" >
			<input type="image" src="../EXIT.svg" on:click={exitEditor} alt="Submit" width="25" height="25"> 
		</div>
	</div>

	<ContextMenu {menubuild} graph={subgraph} {draw} {contextname} />

<style>
.subgraph-comp-content span{
	font-weight: bold ;
}
.subgraph-comp-tool{
	display:flex;
	justify-content: right;
}
</style>