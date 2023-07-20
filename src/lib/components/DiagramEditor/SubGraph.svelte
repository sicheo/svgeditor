<script lang="ts">

import { onMount} from "svelte";
import { SVG } from '@svgdotjs/svg.js'
import gpath from "./classes/gpath"
import gmenu from "./classes/gmenu"
 import gnode from "./classes/gnode"
import {_calcDAttr} from "./classes/gutils"
import ContextMenu from './ContextMenu/ContextMenu.svelte'
import {getMenuItems} from '../../script/api.js'
import TaskEditor from "../TaskEditor/TaskEditor.svelte"
import {mock} from '../../ustore.js'





export let node:any
export let graphtype = 'DAG'
export let bgcolor ="#d5e8d4"
export let color = "#007d35"
export let contextname = "context-subgraph-menu"
export let submenuoptions:any = []
export let maingraph:any
export let width = 800
export let height = 400


let modal:any
let taskmodal:any
let contextmenu:any
let draw:any
let rect:any
let subgraph:any = {nodes:[],paths:[],gnodes:[],gpaths:[]}
let drawcurve = false
let path:any 
let  nodeoptions:any = {
				horizontal:true,
				vertical:false,
				shapetype:'RECT',
				width:120,
				height:50
			}
let subgraphdiv:any
let graphnode:any


// MINIMUM NEEDED GRAPH FUNCTIONS
const graphAddNode = (nodinfo:any,node:any,draw:any) =>{
		subgraph.nodes.push(nodinfo)
		subgraph.gnodes.push(node)
		//subgraph.svg = draw.svg()
	}

const graphRemoveNode = (nodeid:any,draw:any) => {
		subgraph.gnodes = subgraph.gnodes.filter((item: any) => (item.node.id() != nodeid))
		subgraph.nodes = subgraph.nodes.filter((item: any) => (item.id != nodeid))
        //subgraph.svg = draw.svg()
		//if(subgraph.gpaths.length == 0 && subgraph.gnodes.length == 0)
			 //subgraph.svg = ''
	}

const graphRemovePath = (pathid:any,draw:any) => {
	subgraph.gpaths = subgraph.gpaths.filter((item: any) => (item.path.id() != pathid))
    subgraph.paths = subgraph.paths.filter((item: any) => (item.id != pathid))
    //subgraph.svg = draw.svg()
	//if(subgraph.gpaths.length == 0 && subgraph.gnodes.length == 0)
			//subgraph.svg = ''
}

const graphAddPath = (pathinfo:any,path:any,draw:any) =>{
		subgraph.paths.push(pathinfo)
		subgraph.gpaths.push(path)
		//subgraph.svg = draw.svg()
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

const graphGetGraph = ()=>{
		return subgraph
	}

const graphRebuildGraph = (graphin:any,opts:any) => {
		graphFunctions.clearGraph()
		let  nodeoptions:any = {
				horizontal:true,
				vertical:false,
				shapetype:'RECT',
				width:120,
				height:80
			}
		if(opts)
			nodeoptions = opts
		for(let i=0;i<graphin.nodes.length;i++){
			let node = graphin.nodes[i]
			let panelObject
			let type = node.data.type
			let img = node.data.image
			let gdata = JSON.parse(JSON.stringify(node.data))
			gdata.type = type
			const options = {
				x:node.data.x,
				y:node.data.y,
				nodeid:"NODE-"+node.data.uid,
				nodenum:node.data.uid,
				nnametext:"PHASE-"+node.data.uid,
				imagefile:img,
				ndescrtext: node.data.name,
				data:gdata
			}
			nodeoptions.shapetype = node.data.shape
			nodeoptions.width = node.data.width
			nodeoptions.height = node.data.height
			nodeoptions.imgwidth = node.data.imgwidth
			nodeoptions.imgheight = node.data.imgheight
			let nopts = {
				...nodeoptions,
				...options,
			}
			let nd:any
			nd = new gnode(draw,menubuild,graphFunctions,panelObject,nopts)
			if (panelObject)
				panelObject.remove()
			nd.draw()
			// ADD EVENT LISTENERS
			//setEventListeners(nd)
			graphFunctions.addNode(nd.getNodeInfo(),nd,draw)
			
		}
		// DRAW PATHS
		for(let i=0;i<graphin.paths.length;i++){
			let path = graphin.paths[i]
			const fromName = path.from[0]
			const toName = path.to[0]
			// GET FROM AND TO NODE
			const from = subgraph.gnodes.find((item:any)=>(item.nodeid == fromName))
			const to = subgraph.gnodes.find((item:any)=>(item.nodeid == toName))
			// GET THE START SOCKET
			const sockE = from.socketE
			const sockN = from.socketN
			// GET THE END SOCKETS
			const sockW = to.socketW
			const sockS = to.socketS
			if(nodeoptions.horizontal){
				// DRAW PATH SOCKETE to SOCKETW
				let rbox = sockE.sock.rbox()
				const point = draw.point(rbox.x + rbox.w/2 ,rbox.y + rbox.h/2)
				let rbox1 = sockW.sock.rbox()
				const point1 = draw.point(rbox1.x + rbox1.w/2 ,rbox1.y + rbox1.h/2)
				const pathopts = {pathid:path.id,uid:path.uid}
				const npath = new gpath(draw,graphFunctions,pathopts)
				const d = 'm'+point.x+' '+point.y+''
				const pathn = npath.draw(d)
				pathn.path.attr('id',path.id)
				pathn.path.fill('none').move(point.x, point.y)
				pathn.path.stroke({ color: '#f06', width: 2, linecap: 'round', linejoin: 'round' })
				pathn.addFrom(from)
				const start ={position:{x:point.x,y:point.y},dir:'right'}
				const end ={position:{x:point1.x,y:point1.y},dir:'left'}
				const d1 = _calcDAttr(pathn.coef,start,end)
				pathn.path.plot(d1)
				sockE.addPath(pathn)
				sockW.addPath(pathn)
				pathn.addTo(to)
				graphFunctions.addPath(pathn.getPathInfo(),pathn,draw)
			}
			if(nodeoptions.vertical){
				// DRAW PATH SOCKETN to SOCKETS
				let rbox = sockS.sock.rbox()
				const point = draw.point(rbox.x + rbox.w/2 ,rbox.y + rbox.h/2)
				let rbox1 = sockN.sock.rbox()
				const point1 = draw.point(rbox1.x + rbox1.w/2 ,rbox1.y + rbox1.h/2)
				const pathopts = {pathid:path.id,uid:path.uid}
				const npath = new gpath(draw,graphFunctions,pathopts)
				const d = 'm'+point.x+' '+point.y+''
				const pathn = npath.draw(d)
				pathn.path.attr('id',path.id)
				pathn.path.fill('none').move(point.x, point.y)
				pathn.path.stroke({ color: '#f06', width: 2, linecap: 'round', linejoin: 'round' })
				pathn.addFrom(from)
				const start ={position:{x:point.x,y:point.y},dir:'right'}
				const end ={position:{x:point1.x,y:point1.y},dir:'left'}
				const d1 = _calcDAttr(pathn.coef,start,end)
				pathn.path.plot(d1)
				sockS.addPath(pathn)
				sockN.addPath(pathn)
				pathn.addTo(to)
				graphFunctions.addPath(pathn.getPathInfo(),pathn,draw)

			}
		}
	}

const graphUpdateNode = (graph:any, nodinfo:any) =>{
		const nodeindex = graph.nodes.findIndex((item:any) => { return (item.id == nodinfo.id)})
		if(nodeindex > -1)
			graph.nodes[nodeindex] = nodinfo
	}

const graphFunctions = {
	addNode : graphAddNode,
	addPath : graphAddPath,
	removeNode : graphRemoveNode,
	removePath : graphRemovePath,
	getNodenum : graphGetNodenum,
	getPathnum : graphGetPathnum,
	clearGraph : graphClear,
	getGraph : graphGetGraph,
	rebuildGraph: graphRebuildGraph,
	updateNode: graphUpdateNode,
}

const setEventListeners = (node:any) =>{
		 if (node.vertical == true) {
            node.socketN.sock.on("mouseover", (ev: any) => {
                node.socketN.sock.fill(node.altcolor)
                node.socketN.scale(1.5)
                node._draw.fire("sockmouseover", { x: ev.clientX, y: ev.clientY, node: node, socket: node.socketN })
            })
            node.socketN.sock.on("mouseout", (ev: any) => {
                if(node.socketN.paths.lemgth == 0)
                    node.socketN.sock.fill(node.background)
                node.socketN.scale(1)
            })
            node.socketS.sock.on("mouseover", (ev: any) => {
                node.socketS.sock.fill(node.altcolor)
                node.socketS.scale(1.5)
            })
            node.socketS.sock.on("mouseout", (ev: any) => {
                if (node.socketS.paths.lemgth == 0)
                    node.socketS.sock.fill(node.background)
                node.socketS.scale(1)
            })
            node.socketS.sock.on("click", (ev: any) => {
                ev.stopPropagation()
                node.socketS.sock.fill(node.altcolor)
                node._draw.fire("startcurve", { x: ev.clientX, y: ev.clientY, node: node, socket: node.socketS })
            })
        }
        if (node.horizontal == true) {
            node.socketW.sock.on("mouseover", (ev: any) => {
                node.socketW.sock.fill(node.altcolor)
                node.socketW.scale(1.5)
                node._draw.fire("sockmouseover", { x: ev.clientX, y: ev.clientY, node: node, socket: node.socketW })
            })
            node.socketW.sock.on("mouseout", (ev: any) => {
                if (node.socketW.paths.lemgth == 0)
                    node.socketW.sock.fill(node.background)
                node.socketW.scale(1)
            })
            node.socketE.sock.on("mouseover", (ev: any) => {
                node.socketE.sock.fill(node.altcolor)
                node.socketE.scale(1.5)
            })
            node.socketE.sock.on("mouseout", (ev: any) => {
                if (node.socketE.paths.length == 0)
                    node.socketE.sock.fill(node.background)
                node.socketE.scale(1)
            })
            node.socketE.sock.on("click", (ev: any) => {
                ev.stopPropagation()
                node.socketE.sock.fill(node.altcolor)
                node._draw.fire("startcurve", { x: ev.clientX, y: ev.clientY, node: node, socket: node.socketE })
            })
        }

        if (node.image) {
            node.image.on("click", (ev: any) => {
                ev.stopPropagation()
            })
        }
        node.shape.on("click", (ev: any) => {
            ev.stopPropagation()
        })
        if (node.nname) {
            node.nname.on("click", (ev: any) => {
                ev.stopPropagation()
            })
        }
        if (node.ndescr) {
            node.ndescr.on("click", (ev: any) => {
                ev.stopPropagation()
            })
        }

        node.node.on('dragstart', (event: any) => {
            
        })

        node.node.on('dragmove', (event: any) => {
            // mousemove
            if (node.horizontal == true) {
                let rbox = node.socketE.sock.rbox()
                for (let i = 0; i < node.socketE.paths.length; i++) {
                    const endp = node.socketE.paths[i].path.pointAt(node.socketE.paths[i].path.length())
                    const point = node._draw.point(rbox.x + rbox.w/2, rbox.y + rbox.h/2)
                    const start = { position: { x: point.x, y: point.y }, dir: 'right' }
                    const end = { position: { x: endp.x, y: endp.y }, dir: 'left' }
                    const d = _calcDAttr(node.coef, start, end)
                    node.socketE.paths[i].path.plot(d)
                }

                rbox = node.socketW.sock.rbox()
                for (let i = 0; i < node.socketW.paths.length; i++) {
                    const startp = node.socketW.paths[i].path.pointAt(0)
                    const point = node._draw.point(rbox.x + rbox.w/2, rbox.y + rbox.h/2)
                    const start = { position: { x: startp.x, y: startp.y }, dir: 'rigth' }
                    const end = { position: { x: point.x, y: point.y }, dir: 'left' }

                    const d = _calcDAttr(node.coef, start, end)
                    node.socketW.paths[i].path.plot(d)
                }
            }
            if (node.vertical == true) {
                let rbox = node.socketS.sock.rbox()
                for (let i = 0; i < node.socketS.paths.length; i++) {
                    const endp = node.socketS.paths[i].path.pointAt(node.socketS.paths[i].path.length())
                    const point = node._draw.point(rbox.x + rbox.w/2, rbox.y + rbox.h/2)
                    const start = { position: { x: point.x, y: point.y }, dir: 'right' }
                    const end = { position: { x: endp.x, y: endp.y }, dir: 'left' }
                    const d = _calcDAttr(node.coef, start, end)
                    node.socketS.paths[i].path.plot(d)
                }

                rbox = node.socketN.sock.rbox()
                for (let i = 0; i < node.socketN.paths.length; i++) {
                    const startp = node.socketN.paths[i].path.pointAt(0)
                    const point = node._draw.point(rbox.x + rbox.w/2, rbox.y + rbox.h/2)
                    const start = { position: { x: startp.x, y: startp.y }, dir: 'rigth' }
                    const end = { position: { x: point.x, y: point.y }, dir: 'left' }

                    const d = _calcDAttr(node.coef, start, end)
                    node.socketN.paths[i].path.plot(d)
                }
            }

        })

        node.node.on('dragend', (event: any) => {
        })
        
        node.node.on('dblclick', (event: any) => {
            event.stopPropagation()
        })
	}



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
				const operation = {name:'',uid: null,tasks:null}
				switch (menu.menuitems[i].name) {
					case 'EDIT':
						if (taskmodal) {
							taskmodal.setAttribute("data-optype", "operations")
							taskmodal.setAttribute("data-opuid", gnode.data.uid)
							taskmodal.style.display = "block";
						}
						break
					case 'EXIT':
						gnode.remove()
						break
				}
			})
		}
		return(menu)
	}

const rebuildSubgraph = (ev:any) =>{
	graphnode = ev.detail
	if(graphnode.node.data.operations)
		graphRebuildGraph(graphnode.node.data.operations,null)
}

onMount(async ()=>{
	// LOAD MENUITEMS
		for(let i=0;i<submenuoptions.length;i++){
			const body = await getMenuItems(submenuoptions[i].id,$mock)
			submenuoptions[i].items = body.data
		}


	modal = document.getElementById("modal-subgraph-div-id")
	taskmodal = document.getElementById("modal-subeditor-div-id")
	contextmenu = document.getElementById(contextname)
	let draggable = (await import("@svgdotjs/svg.draggable.js")); 
	let panzoom = (await import('@svgdotjs/svg.panzoom.js'))
	// ADDNG LOCAL SVG 
	draw = await SVG().addTo('#modal-subgraph-content-id').size(width, height).panZoom({ zoomMin: 0.2, zoomMax: 1.5, zoomFactor: 0.1 })
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
			const pathopts = {pathid:"PATH-"+graphFunctions.getPathnum(),uid:graphFunctions.getPathnum()}
			const npath = new gpath(draw,graphFunctions,pathopts)
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
							graphFunctions.addPath(path.getPathInfo(),path,draw)
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
							graphFunctions.addPath(path.getPathInfo(),path,draw)
						}
						break;
					case "FEEDBACK":
						drawcurve=false
						draw.off('mousemove')
						startsock.addPath(path)
						endsock.addPath(path)
						path.addTo(endnode)
						graphFunctions.addPath(path.getPathInfo(),path,draw)
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

		// ADD EVENT LISTENER
		 subgraphdiv = document.getElementById("subgraph-comp-content")
		 if(subgraphdiv){
            subgraphdiv.addEventListener(
                "subgraphopen",
                rebuildSubgraph,
                false
             );
		 }

 });

const saveTasks = (e:any)=>{
	const mg = maingraph.getGraph()
	graphnode.node.data.operations = {nodes:[],paths:[]}
	graphnode.node.data.operations.nodes = JSON.parse(JSON.stringify(subgraph.nodes))
	graphnode.node.data.operations.paths = JSON.parse(JSON.stringify(subgraph.paths))
}

const exitEditor = (event:any) =>{
	graphFunctions.clearGraph()
	// CLOSE CONTEXT MENU
	contextmenu.style.visibility = "hidden"
    modal.style.display = "none";
}

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

	<div class="subgraph-comp-content" id="subgraph-comp-content">
		<span style="--color:{color};">{node.data.name} PHASE OPERATIONS EDITOR</span>
		<div class="subgraph-comp-tool">
			<input type="image" src="../SAVE.svg"  on:click={saveTasks} alt="Submit" width="25" height="25" >
			<input type="image" src="../EXIT.svg" on:click={exitEditor} alt="Submit" width="25" height="25"> 
		</div>
	</div>

	<svelte:window on:keydown={handleKeydown}/>
	<div class="modal-editor-div" id="modal-subeditor-div-id" data-opuid='' data-optype=''>
		<div class="modal-editor-content">
			<TaskEditor bind:node = {node} bind:graph={subgraph} modalname="modal-subeditor-div-id"/>
		</div>
	</div>

	<ContextMenu {menubuild} graph={graphFunctions} {draw} {contextname} menuitems={submenuoptions} />

<style>
.subgraph-comp-content span{
	font-weight: bold ;
}
.subgraph-comp-tool{
	display:flex;
	justify-content: right;
}
/* TASK MODAL */

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

</style>