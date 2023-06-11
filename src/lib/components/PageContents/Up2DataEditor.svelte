<script lang="ts">
  // https://loading.io/css/
  import DiagramEditor from '../DiagramEditor/DiagramEditor.svelte'
  import gnode from "../DiagramEditor/classes/gnode"
  import gmenu from "../DiagramEditor/classes/gmenu"
  import gpath from "../DiagramEditor/classes/gpath"
  import {_calcDAttr} from "../DiagramEditor/classes/gutils"
  import graphutils from '../../script/graphutils'
  import {up2datapanels,clonesubmenuoptions,datagraphmenuoptions} from "../../ustore.js"
  
 

   
  export let graph = {nodes:[],paths:[],svg:'',gnodes:[],gpaths:[]}
  export let menufunctions:any

  // ** NEW **//
  let graphtype = "TREE"
  let currentnode:any ={data:{type:'COMPANY',level:'level0',name:''}}
  let draw:any
  let width = 900
  let height = 500
  let  nodeoptions:any = {
				horizontal:true,
				vertical:false,
				shapetype:'RECT',
				width:100,
				height:80
			}
 
 

  const mainmenuclear = menufunctions.menuclear
  const mainmenuimport = menufunctions.menuimport
  const mainmenuexport = menufunctions.menuexport
  const mainmenusave = menufunctions.menusave
  const mainmenuload = menufunctions.menuload


 let datapanels = $up2datapanels
 let menuoptions = $datagraphmenuoptions
  let submenuoptions = $clonesubmenuoptions
  let component:any = datapanels.find((item:any) => item.type == 'COMPANY').component;

  // GRAPH MANIPULATION

	const graphAddNode = (nodinfo:any,node:any,draw:any) =>{
		graph.nodes.push(nodinfo)
		graph.gnodes.push(node)
		graph.svg = draw.svg()
	}

	const graphUpdateNode = (nodinfo:any,node:any,draw:any) =>{
		const nodeindex = graph.nodes.findIndex((item:any) => { return (item.id == nodinfo.id)})
		if(nodeindex > -1)
			graph.nodes[nodeindex] = nodinfo
		const gnodeindex = graph.gnodes.findIndex((item:any) => { return (item.id == node.id)})
		if(gnodeindex > -1)
			graph.gnodes[gnodeindex] = node
		graph.svg = draw.svg()
	}

	const graphAddPath = (pathinfo:any,path:any,draw:any) =>{
		graph.paths.push(pathinfo)
		graph.gpaths.push(path)
		graph.svg = draw.svg()
	}

	const graphRemoveNode = (nodeid:any,draw:any) => {
		graph.gnodes = graph.gnodes.filter((item: any) => (item.node.id() != nodeid))
		graph.nodes = graph.nodes.filter((item: any) => (item.id != nodeid))
        graph.svg = draw.svg()
		if(graph.gpaths.length == 0 && graph.gnodes.length == 0)
			 graph.svg = ''
	}

	const graphRemovePath = (pathid:any,draw:any) => {
		graph.gpaths = graph.gpaths.filter((item: any) => (item.path.id() != pathid))
        graph.paths = graph.paths.filter((item: any) => (item.id != pathid))
        graph.svg = draw.svg()
		if(graph.gpaths.length == 0 && graph.gnodes.length == 0)
			 graph.svg = ''
	}

	const graphGetNodenum = () =>{
		let ret = 0
		for(let i=0;i<graph.nodes.length;i++)
			if(graph.nodes[i].data.uid >= ret)
				ret = graph.nodes[i].data.uid+1
		return ret
	}

	const graphGetPathnum = () =>{
		let ret = 0
		for(let i=0;i<graph.paths.length;i++)
			if(graph.paths[i].uid >= ret)
				ret = graph.paths[i].uid
		return ret
	}

	const graphGetTreeFromGraph = () =>{
		const tree = {root:null,roottag:''}
		if(graph.nodes.length >0){
			// FIND ROOT NODE
			const rootnode = graph.nodes.find((item:any) => (item.data.level == 'level1'))
			let treeret = graphutils.getTreeFromGraph(graph,rootnode,null)
			tree.root = treeret
			tree.roottag =rootnode.data.name
		}
		return tree
	}

	const graphGetGraph = ()=>{
		return graph
	}

	const graphRebuildGraph = (graphin:any,opts:any) => {
		graphFunctions.clearGraph()
		let  nodeoptions:any = {
				horizontal:true,
				vertical:false,
				shapetype:'RECT',
				width:100,
				height:80
			}
		if(opts)
			nodeoptions = opts
		for(let i=0;i<graphin.nodes.length;i++){
			let node = graphin.nodes[i]
			let panelObject
			let img = datapanels[0].img
			let type = datapanels[0].type
			const pnl = datapanels.find((item:any)=>(item.level == node.data.level))
			if(pnl){
				if(node.data.image)
					img=node.data.image
				else
					img = pnl.img
				type = pnl.type
			}
			let gdata = JSON.parse(JSON.stringify(node.data))
			gdata.type = type
			const options = {
				x:node.data.x,
				y:node.data.y,
				nodeid:"NODE-"+node.data.uid,
				nodenum:node.data.uid,
				nnametext:"NODE-"+node.data.uid,
				imagefile:img,
				ndescrtext: node.data.name,
				data:gdata,
			}
			const nopts = {
				...nodeoptions,
				...options,
			}
			let nd:any
			nd = new gnode(draw,menubuild,graphFunctions,panelObject,nopts)
			if (panelObject)
				panelObject.remove()
			nd.draw()
			// ADD EVENT LISTENERS
			setEventListeners(nd)
			graphFunctions.addNode(nd.getNodeInfo(),nd,draw)
			//console.log("**** REBUILD GRAPH *****", nd)
		}
		// DRAW PATHS
		for(let i=0;i<graphin.paths.length;i++){
			let path = graphin.paths[i]
			const fromName = path.from[0]
			const toName = path.to[0]
			// GET FROM AND TO NODE
			const from = graph.gnodes.find((item:any)=>(item.nodeid == fromName))
			const to = graph.gnodes.find((item:any)=>(item.nodeid == toName))
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
				const npath = new gpath(draw,graph,pathopts)
				const d = 'm'+point.x+' '+point.y+''
				const pathn = npath.draw(d)
				pathn.path.attr('id',path.id)
				pathn.path.fill('none').move(point.x, point.y)
				pathn.path.stroke({ color: '#f06', width: 2, linecap: 'round', linejoin: 'round' })
				pathn.addFrom(from)
				const start ={position:{x:point.x,y:point.y},dir:'right'}
				const end ={position:{x:point1.x,y:point1.y},dir:'left'}
				//console.log(start,end)
				const d1 = _calcDAttr(pathn.coef,start,end)
				pathn.path.plot(d1)
				sockS.addPath(pathn)
				sockN.addPath(pathn)
				pathn.addTo(to)
				graphFunctions.addPath(pathn.getPathInfo(),pathn,draw)

			}
		}
	}

	const graphClearGraph = () =>{
		mainmenuclear()
		graph = {nodes:[],paths:[],svg:'',gnodes:[],gpaths:[]}
	}

	const graphExportGraph = () =>{
		mainmenuexport()
	}

	const graphImportGraph = () =>{
		mainmenuimport()
	}

	

	const graphFunctions = {
							addNode:graphAddNode,
							updateNode:graphUpdateNode,
							addPath:graphAddPath,
							removeNode:graphRemoveNode,
							removePath:graphRemovePath,
							getNodenum:graphGetNodenum,
							getPathnum:graphGetPathnum,
							getGraph:graphGetGraph,
							getTreeFromGraph:graphGetTreeFromGraph,
							//getGraphFromTree:graphGetGraphFromTree,
							rebuildGraph: graphRebuildGraph,
							clearGraph:graphClearGraph,
							exportGraph:graphExportGraph,
							importGraph:graphImportGraph,
						}

	const panelcontroller = (action:any,gnode:any)=>{
			const panel = document.querySelector('#editor-panel')
			switch(action){
				case "hide":
					panel.style.visibility = 'hidden'
					if(gnode){
						let img = 'image-company.svg'
						const pnl = datapanels.find((item:any)=>(item.type == gnode.data.type))
						if(pnl)
							img = pnl.img
						gnode.redrawtext(gnode.data.name,img)
					}
					break;
				case "show":
					currentnode = gnode
					if(gnode.data && gnode.data.type)
						component = datapanels.find((item:any) => (item.type == gnode.data.type)).component;
					else
						component = datapanels.find((item:any) => (item.type == 'COMPANY')).component; 
						panel.style.visibility = 'visible'
					break;
				case "toggle":
					panelToggle(panel,gnode)
					break
				case "visibility":
					return(panel.style.visibility)
					break;
			}
			return('OK')
		}

	const panelToggle = (panel:any,gnode:any)=>{
		switch(panel.style.visibility){
			case 'visible':
				panel.style.visibility = 'hidden'
					if(gnode){
						let img = 'image-company.svg'
						const pnl = datapanels.find((item:any)=>(item.type == gnode.data.type))
						if(pnl)
							img = pnl.img
						gnode.redrawtext(gnode.data.name,img)
					}
				break;
			case 'hidden':
				currentnode = gnode
				if(gnode.data && gnode.data.type)
					component = datapanels.find((item:any) => (item.type == gnode.data.type)).component;
				else
					component = datapanels.find((item:any) => (item.type == 'COMPANY')).component; 
					panel.style.visibility = 'visible'
				break
		}
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
					switch (menu.menuitems[i].name) {
						case 'EDIT':
							// SET STROKE ALTCOLOR
							gnode.shape.attr({stroke:'#f06'})
							panelcontroller('toggle',gnode)
							gnode.menuForeignObject = panelcontroller
							break
						case 'EXIT':
							gnode.remove()
							break
					}
				})
			}
			return(menu)
		}

	const  readFile = async function(event:any) {
		const element = event.target
		if(element){
			element.onchange = async () => {
				const file = element.files[0];
				const fileContent = await file.text();
				let graphtml = JSON.parse(fileContent)
				graphFunctions.rebuildGraph(graphtml,null)
			}
		}
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
            //console.log("DRAGSTART")
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





</script>

	<div class= "editor-container" id= "editor-container-id">
			<DiagramEditor {menuoptions} {submenuoptions} {graphtype} graph={graphFunctions} bind:draw={draw} bind:currentnode={currentnode} {nodeoptions} {panelcontroller} panels={datapanels} bind:component={component} {width} {height} {menubuild} {mainmenuclear} {mainmenusave} {mainmenuimport} {mainmenuexport} {mainmenuload}/>
			<input id="file-graph-input"name="file-graph-input" type='file' accept=".json" style="visibility:hidden;" on:click={readFile}>
	</div>

	

<style>
.editor-container{
	position:absolute;
}


</style>