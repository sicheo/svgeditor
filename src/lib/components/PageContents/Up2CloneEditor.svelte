<script lang="ts">
  // https://loading.io/css/
  import DiagramEditor from '../DiagramEditor/DiagramEditor.svelte'
  import DocMake from '../DiagramEditor/pdf/DocMake'
  import docDefinition from '../DiagramEditor/pdf/docdefinition.js'
  import PdfViewer from '../DiagramEditor/pdf/PdfViewer.svelte'
  import gnode from "../DiagramEditor/classes/gnode"
  import gmenu from "../DiagramEditor/classes/gmenu"
  import gpath from "../DiagramEditor/classes/gpath"
  import {_calcDAttr} from "../DiagramEditor/classes/gutils"
  import graphutils from '../../script/graphutils'
  import {up2clonepanels,clonesubmenuoptions,clonegraphmenuoptions} from '../../ustore.js'
 

   
  export let graph = {nodes:[],paths:[],svg:'',gnodes:[],gpaths:[]}
  export let menufunctions:any

  // ** NEW **//
  let graphtype = "TREE"
  let currentnode:any ={data:{type:'MASTER',level:'level0',name:'',params:{},tasks:[]}}
  let draw:any
  let width = 950
  let height = 600
 
  let pdfUrl:any =''

  const mainmenuclear = menufunctions.menuclear
  const mainmenuimport = menufunctions.menuimport
  const mainmenuexport = menufunctions.menuexport
  const mainmenusave = menufunctions.menusave
  const mainmenuload = menufunctions.menuload


  let panels = $up2clonepanels
  let menuoptions = $clonegraphmenuoptions
  let submenuoptions = $clonesubmenuoptions
  let component:any = panels.find((item:any) => item.type == 'MASTER').component;

  // GRAPH MANIPULATION

	const graphAddNode = (nodinfo:any,node:any,draw:any) =>{
		graph.nodes.push(nodinfo)
		graph.gnodes.push(node)
		//graph.svg = draw.svg()
	}

	const graphUpdateNode = (nodinfo:any,node:any,draw:any) =>{
		const nodeindex = graph.nodes.findIndex((item:any) => { return (item.id == nodinfo.id)})
		if(nodeindex > -1)
			graph.nodes[nodeindex] = nodinfo
		const gnodeindex = graph.gnodes.findIndex((item:any) => { return (item.id == node.id)})
		if(gnodeindex > -1)
			graph.gnodes[gnodeindex] = node
		//graph.svg = draw.svg()
	}

	const graphAddPath = (pathinfo:any,path:any,draw:any) =>{
		graph.paths.push(pathinfo)
		graph.gpaths.push(path)
		//graph.svg = draw.svg()
	}

	const graphRemoveNode = (nodeid:any,draw:any) => {
		graph.gnodes = graph.gnodes.filter((item: any) => (item.node.id() != nodeid))
		graph.nodes = graph.nodes.filter((item: any) => (item.id != nodeid))
	}

	const graphRemovePath = (pathid:any,draw:any) => {
		graph.gpaths = graph.gpaths.filter((item: any) => (item.path.id() != pathid))
        graph.paths = graph.paths.filter((item: any) => (item.id != pathid))
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

	const graphRebuildGraph = (graphin:any,opts:any=null) => {
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
			let img = panels[0].img
			let type = panels[0].type
			//const pnl = panels.find((item:any)=>(item.level == node.data.level))
			const pnl = panels.find((item:any)=>(item.type == node.data.type))
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
				nodeuid: node.uuid,
				nodenum:node.data.uid,
				nnametext:"PHASE-"+node.data.uid,
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
			//setEventListeners(nd)
			graphFunctions.addNode(nd.getNodeInfo(),nd,draw)
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

	

	const nodePrintPdf = async (gnode:any) =>{
		const iframe = document.getElementById("pdf-div-id")
		let doc:any
	    doc = new DocMake()
		const docDef = docDefinition[gnode.data.name](gnode)
		switch(gnode.data.type){
			case "MASTER":
			case "PHASE":
				if(docDef){
					doc.buildDocument(docDef)
					.then((dataUrl:any)=>{
						pdfUrl = dataUrl
						iframe.style.display = 'flex'
					})
				}
				break
		}
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
		    // ADD EVENT TO PANEL ELEMENT
			let eventSave:any
			let eventHide:any
			let eventShow:any
			//let panelOperation = document.getElementById("class-operations")
			let panelOperation = document.getElementById("property-panel-main-id")
			

			const panel = document.querySelector('#editor-panel')
			let templatePanel:any
			if(gnode){
				templatePanel = panels.find((item:any) => { return (item.type == gnode.data.type) })
				eventSave = new CustomEvent("panelsave",{detail: {node: gnode.data.type}})
				eventHide = new CustomEvent("panelhide",{detail: {node: gnode.data.type}});
				eventShow = new CustomEvent("panelshow",{detail: {node: gnode.data.type}});
			}
			let img
			switch(action){
				case "hide":
				    img = ''
					if(gnode){
						gnode.data = structuredClone(gnode.saved)
						if(!gnode.data.image || gnode.data.image == ''){
						const pnl = panels.find((item:any)=>(item.type == gnode.data.type))
						if(pnl)
							gnode.data.image = pnl.img
						}
						img = gnode.data.image
						
						gnode.redrawtext(gnode.data.name,img)
						
					}
					if(panelOperation && templatePanel && templatePanel.fireEvents)
						panelOperation.dispatchEvent(eventHide);
					panel.style.visibility = 'hidden'
					break;
				case "save":
				    img = ''
					if(gnode){
						gnode.saved = structuredClone(gnode.data)
						if(!gnode.data.image || gnode.data.image == ''){
						const pnl = panels.find((item:any)=>(item.type == gnode.data.type))
						if(pnl)
							gnode.data.image = pnl.img
						}
						img = gnode.data.image
						
						gnode.redrawtext(gnode.data.name,img)
						graphFunctions.updateNode(gnode.getNodeInfo(),gnode,draw)
					}
					if(panelOperation && templatePanel && templatePanel.fireEvents)
						panelOperation.dispatchEvent(eventSave);
					panel.style.visibility = 'hidden'
					break;
				case "show":
					if(gnode)
						gnode.data = structuredClone(gnode.saved)
					currentnode = gnode
					if(gnode.data && gnode.data.type)
						component = panels.find((item:any) => (item.type == gnode.data.type)).component;
					else
						component = panels.find((item:any) => (item.type == 'MASTER')).component; 
					if(panelOperation && templatePanel && templatePanel.fireEvents){
					    panelOperation.dispatchEvent(eventShow)
					}
					panel.style.visibility = 'visible'
					break;
				case 'toggle':
					panelToggle(panel,gnode,panelOperation,templatePanel,eventHide,eventShow)
					break
				case "visibility":
					return(panel.style.visibility)
					break;
			}
			// CANCEL OPERATIONS IF PRESENT
			const operationElement = document.getElementById("class-operations")
			if(operationElement)
				operationElement.innerHTML= ''
			return('OK')
		}

	const panelToggle = (panel:any,gnode:any, panelOperation:any,templatePanel:any,eventHide:any,eventShow:any)=>{
		let img
		switch(panel.style.visibility){
			case 'visible':
				img = ''
					if(gnode){
						gnode.data = structuredClone(gnode.saved)
						if(!gnode.data.image || gnode.data.image == ''){
						const pnl = panels.find((item:any)=>(item.type == gnode.data.type))
						if(pnl)
							gnode.data.image = pnl.img
						}
						img = gnode.data.image	
						gnode.redrawtext(gnode.data.name,img)
						
					}
					if(panelOperation && templatePanel && templatePanel.fireEvents)
						panelOperation.dispatchEvent(eventHide);
					panel.style.visibility = 'hidden'
				break;
			case 'hidden':
					if(gnode)
						gnode.data = structuredClone(gnode.saved)
					currentnode = gnode
					if(gnode.data && gnode.data.type)
						component = panels.find((item:any) => (item.type == gnode.data.type)).component;
					else
						component = panels.find((item:any) => (item.type == 'MASTER')).component; 
					if(panelOperation && templatePanel && templatePanel.fireEvents){
					    panelOperation.dispatchEvent(eventShow)
					}
					panel.style.visibility = 'visible'
				break
		}
	}

	// NODE MENU BUILDER
	const	menubuild = async (x:any,y:any,width:any,height:any,gnode:any) =>{
			const menuitems: any[] = [
				{ name: 'EDIT', image: '/edit.svg', item: null },
				{ name: 'SUBGRAPH', image: '/SUBGRAPH.svg', item: null },
				{ name: 'PDF', image: '/PDF2.svg', item: null },
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
							panelcontroller("toggle",gnode)
							gnode.menuForeignObject = panelcontroller
							break
						case 'EXIT':
							gnode.remove()
							break
						case 'PDF':
							await nodePrintPdf(gnode)
							break
						case 'SUBGRAPH':
							const subgraphdiv = document.getElementById("modal-subgraph-div-id")
							currentnode=gnode
							if(subgraphdiv)
								subgraphdiv.style.display = 'block'
							const subdiv = document.getElementById("subgraph-comp-content")
							const eventSubgraph = new CustomEvent("subgraphopen",{detail: {node: gnode}});
							if(subdiv)
								 subdiv.dispatchEvent(eventSubgraph)
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

	const  redrawGraph = async function(event:any) {
		const element = event.target
		if(element){
			const graph = JSON.parse(element.getAttribute("data-graph"))
			graphRebuildGraph(graph)
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


const onHidePdf = (e:any)=>{
	const iframe = document.getElementById("pdf-div-id")
	iframe.style.display = 'none'
}



</script>

	<div class= "editor-container" id= "editor-container-id">
			<DiagramEditor {menuoptions} {submenuoptions} {graphtype} graph={graphFunctions} bind:draw={draw} bind:currentnode={currentnode} {panelcontroller} {panels} bind:component={component}  {width} {height} {menubuild}/>
			<input id="file-graph-input"name="file-graph-input" type='file' accept=".json" style="visibility:hidden;" on:click={readFile}>
			<input id="load-graph-redraw"name="load-graph-redraw" type='button' accept=".json" style="visibility:hidden;" on:click={redrawGraph}>
	</div>

	<div class="pdf-div" id="pdf-div-id">
		 <input type="image" class= "image-tool-component" src="/EXIT.svg" on:click={onHidePdf} alt="ALT IMAGE" height="30" />

		 <PdfViewer bind:url={pdfUrl} />
	</div>

<style>
.editor-container{
	position:absolute;
}
.pdf-div{
	position:relative;
	display:none;
	justify-content: center;
	text-align: right ;
	max-width:100vw;
	max-height:30vh;
	background-color: #ffffff;
	/*z-index: 100;*/
}

.pdf-div input{
	margin-bottom:20px;
}

</style>