<script context="module" lang="ts">
  // ---------------- BUILD TWIN MAIN PAGE ---------------------------
  // https://svgjs.dev/docs/3.0/plugins/svg-draggable-js/
</script>
<script lang="ts">
  // https://loading.io/css/
  import { onMount} from "svelte";
  //import TwinEditor from "$lib/components/twineditor/TwinEditor.svelte"
  import DiagramEditor from '$lib/components/DiagramEditor/DiagramEditor.svelte';
  import PhasePanel from '$lib/components/MenuPanels/PhasePanel.svelte'
  import MRecordPanel from '$lib/components/MenuPanels/MRecordPanel.svelte'
  import Templates from '$lib/components/DiagramEditor/pdf/templates.js'
  import Document from '$lib/components/DiagramEditor/pdf/Document'
  import CompanyPanel from '$lib/components/MenuPanels/CompanyPanel.svelte'
  import FactoryPanel from '$lib/components/MenuPanels/FactoryPanel.svelte'
  import DepartmentPanel from '$lib/components/MenuPanels/DepartmentPanel.svelte'
  import LinePanel from '$lib/components/MenuPanels/LinePanel.svelte'
  import EquipmentPanel from '$lib/components/MenuPanels/EquipmentPanel.svelte'
  import ControllerPanel from '$lib/components/MenuPanels/ControllerPanel.svelte'
  import gnode from "$lib/components/DiagramEditor/classes/gnode"
  import gmenu from "$lib/components/DiagramEditor/classes/gmenu"
  import gpath from "$lib/components/DiagramEditor/classes/gpath"
  import {_calcDAttr} from "$lib/components/DiagramEditor/classes/gutils"
  import graphutils from '$lib/scripts/graphutils'
 

   
  
  // ** NEW **//
  let graphtype = "TREE"
  let graph = {nodes:[],paths:[],svg:'',gnodes:[],gpaths:[]}
  let currentnode:any ={data:{type:'MASTER',level:'level0',name:''}}
  let draw:any
  let callback = ()=>{}
  

  let panels:any [] = [
	    {type:'MASTER',component:MRecordPanel,name:'Master',level:'level0',img:'/MASTER.svg',fireEvents:false},
	    {type:'PHASE',component:PhasePanel,name:'Phase',level:'level1',img:'/DISPENSING.svg',fireEvents:true},
		/*{type:'COMPANY',component:CompanyPanel,name:'Company',level:'level1',img:'/image-company.svg'},
		{type:'FACTORY',component:FactoryPanel,name:'Factory',level:'level2',img:'/image-factory.svg'},
		{type:'DEPARTMENT',component:DepartmentPanel,name:'Department',level:'level3',img:'/image-department.svg'},
		{type:'LINE',component:LinePanel,name:'Line',level:'level4',img:'/image-line.svg'},
		{type:'EQUIPMENT',component:EquipmentPanel,name:'Equipment',level:'level5',img:'/image-equipment.svg'},
		{type:'CONTROLLER',component:ControllerPanel,name:'Controller',level:'level6',img:'/image-controller.svg'},*/
	]

  let component:any = panels.find((item:any) => item.type == 'MASTER').component;

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

	/*const graphGetGraphFromTree = () =>{
		graph =  {nodes:[],paths:[],svg:'',gnodes:[],gpaths:[]}
		if($currenttree)
			graphutils.getGraphFromTree($currenttree.root,graph,0)
		//return(grp)
	}*/

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
			let img = panels[0].img
			let type = panels[0].type
			const pnl = panels.find((item:any)=>(item.level == node.data.level))
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
				const d1 = _calcDAttr(30,start,end)
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
				const d1 = _calcDAttr(30,start,end)
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
		upload()
	}

	const graphImportGraph = () =>{
		mainmenuimport()
	}

	const nodePrintPdf = (gnode:any) =>{
		let template:any = {pages:[]}
		let replacement:any
		let doc:any
		switch(gnode.data.type){
			case "MASTER":
			    doc = new Document()
			    replacement = [
					{in:"$DOCCODE",out:gnode.data.doccode},
					{in:"$PRODCODE",out:gnode.data.prodcode},
					{in:"$PROJ",out:gnode.data.projcode},
					{in:"$SAPCODE",out:gnode.data.sapcode},
				]
				template = JSON.parse(JSON.stringify(Templates.MRecordTemplate))
				// FILL TEMPLATE WITH ACTUAL VALUES
				doc.replaceTags(template.pages[0],replacement)
				// BUILD PDF WITH FILLED TEMPLATE
				doc.buildPage(template.pages[0])
				doc.saveDoc(template)
				break
			case "PHASE":
				break
		}
		console.log("++++ PRINT PDF FOR NODE ****",template)
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
			const eventSave = new Event("panelsave");
			const eventHide = new Event("panelhide");
			const eventShow = new Event("panelshow");
			const panelOperation = document.getElementById("class-operations")

			const panel = document.querySelector('#editor-panel')
			let templatePanel:any
			if(gnode)
				templatePanel = panels.find((item:any) => { return (item.type == gnode.data.type) })
			let img
			switch(action){
				case "hide":
				    img = ''
					panel.style.visibility = 'hidden'
					if(panelOperation && templatePanel && templatePanel.fireEvents)
						panelOperation.dispatchEvent(eventHide);
					if(gnode){
						gnode.data = structuredClone(gnode.saved)
						//console.log("**** PANEL HIDE ****",gnode.data)
						if(!gnode.data.image || gnode.data.image == ''){
						const pnl = panels.find((item:any)=>(item.type == gnode.data.type))
						if(pnl)
							gnode.data.image = pnl.img
						}
						img = gnode.data.image
						
						gnode.redrawtext(gnode.data.name,img)
						
					}
					break;
				case "save":
				    img = ''
					panel.style.visibility = 'hidden'
					if(panelOperation && templatePanel && templatePanel.fireEvents)
						panelOperation.dispatchEvent(eventSave);
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
					break;
				case "show":
					currentnode = gnode
					if(gnode)
						gnode.data = structuredClone(gnode.saved)
					if(gnode.data && gnode.data.type)
						component = panels.find((item:any) => (item.type == gnode.data.type)).component;
					else
						component = panels.find((item:any) => (item.type == 'PHASE')).component; 
					panel.style.visibility = 'visible'
					if(panelOperation && templatePanel && templatePanel.fireEvents){
					    panelOperation.dispatchEvent(eventShow)
					}
					break;
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

	// NODE MENU BUILDER
	const	menubuild = (x:any,y:any,width:any,height:any,gnode:any) =>{
			const menuitems: any[] = [
				{ name: 'EDIT', image: '/edit.svg', item: null },
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
				menu.menuitems[i].item.on("click", (ev: any) => {
					ev.stopPropagation()
					switch (menu.menuitems[i].name) {
						case 'EDIT':
						    //console.log("*** STROKE ***",gnode.shape.attr('stroke'))
							// SET STROKE ALTCOLOR
							gnode.shape.attr({stroke:'#f06'})
						    panelcontroller("hide",gnode)
							panelcontroller("show",gnode)
							//panelObject = createPanel(ev.clientX,ev.clientY,gnode)
							gnode.menuForeignObject = panelcontroller
							//panelObject.draw()
							break
						case 'EXIT':
							gnode.remove()
							break
						case 'PDF':
							nodePrintPdf(gnode)
							break
					}
				})
			}
			return(menu)
		}

	const mainmenusave = ()=>{
		let tree = {root:null,roottag:'',scale:{value:1}}
		if(graph.nodes.length > 0){
			tree.roottag = graph.nodes[0].data.name
			tree.root = graphutils.getTreeFromGraph(graph,graph.nodes[0],null)
		}
		
		console.log(graph)
	    //console.log(tree.root)
		let backgraph = {nodes:[],paths:[],svg:'',gnodes:[],gpaths:[]}
		//console.log(graphutils.getGraphFromTree(tree.root,backgraph,0))

			
	}

	const mainmenuload = ()=>{
		//console.log("LOAD")
	}

	const mainmenuimport = ()=>{
		//console.log("IMPORT")
		const element = document.getElementById("file-graph-input")
		if(element)
			element.click()
	}

	const mainmenuexport = ()=>{
		//console.log("EXPORT")
		upload()
		
	}

	const  mainmenuclear = ()=>{
		if(graph.gnodes){
			while(graph.gnodes.length >0){
				if( graph.gnodes[0].node){
					graph.gnodes[0].node.remove(false)
				}
				graphFunctions.removeNode(graph.nodes[0].id,draw)
			}
		}
		if(graph.gpaths){
			while(graph.gpaths.length >0){
				if( graph.gpaths[0].path){
					graph.gpaths[0].path.remove(false)
				}
				graphFunctions.removePath(graph.gpaths[0].id,draw)
			}
		}
		if(panelcontroller)
			panelcontroller("hide",null)
	}

	const upload = async ()=>{
		// AVOID CYCLIC REFERENCE IN JSON OBJECT
		try{
			let textFileUrl = null;
			//const jsontree = await getTreeFile($token,$currentcompany.name)
			const graphToSave = {nodes:graph.nodes,paths:graph.paths,svg:graph.svg}
			let fileData = new Blob([JSON.stringify(graphToSave)], {type: 'text/plain'});
			    if (textFileUrl !== null) {
					window.URL.revokeObjectURL(textFile);
				}		
			textFileUrl = window.URL.createObjectURL(fileData);
			var a = document.createElement("a");
			a.href = textFileUrl
			a.download = 'TEST.json';
			a.click(); 
		}catch(error){
			console.log(error)
		}
		
   }

   const getCircularReplacer = () => {
	  const seen = new WeakSet();
	  return (key:any, value:any) => {
		if (typeof value === "object" && value !== null) {
		  if (seen.has(value)) {
			return;
		  }
		  seen.add(value);
		}
		return value;
	  };
	};

	

	const  readFile = async function(event:any) {
		//const element = document.getElementById("file-graph-input")
		const element = event.target
		if(element){
			element.onchange = async () => {
				//console.log("*** FILE ON CHANGE EVENT FIRED ****")
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
                    const d = _calcDAttr(30, start, end)
                    node.socketE.paths[i].path.plot(d)
                }

                rbox = node.socketW.sock.rbox()
                for (let i = 0; i < node.socketW.paths.length; i++) {
                    const startp = node.socketW.paths[i].path.pointAt(0)
                    const point = node._draw.point(rbox.x + rbox.w/2, rbox.y + rbox.h/2)
                    const start = { position: { x: startp.x, y: startp.y }, dir: 'rigth' }
                    const end = { position: { x: point.x, y: point.y }, dir: 'left' }

                    const d = _calcDAttr(30, start, end)
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
                    const d = _calcDAttr(30, start, end)
                    node.socketS.paths[i].path.plot(d)
                }

                rbox = node.socketN.sock.rbox()
                for (let i = 0; i < node.socketN.paths.length; i++) {
                    const startp = node.socketN.paths[i].path.pointAt(0)
                    const point = node._draw.point(rbox.x + rbox.w/2, rbox.y + rbox.h/2)
                    const start = { position: { x: startp.x, y: startp.y }, dir: 'rigth' }
                    const end = { position: { x: point.x, y: point.y }, dir: 'left' }

                    const d = _calcDAttr(30, start, end)
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

  // ** END NEW **//
  
  let title = "TWIN DIAGRAM "
  let btnlabel = "SAVE TREE "
  let btnlabeldel = "DELETE TREE "
  let defvisible = "hidden"
  


  // on mount loads information from server
 /* onMount(async ()=>{
	if($token == "")
			goto(`/data`, {replaceState:true})
	try{
		$currentcompany = $currentcompany
		$currenttree = await getTree($token,$currentcompany.name)
		$companies = await getCompanies($token)
		$companies.push({ name: '', uid:-1 })
		readFile()
		// RENDER CURRENT GRAPH
		// DELETE PREVIOUS GRAPH
		/*graph.clearGraph()
		// GET GRAPH FROM TREE
		graph.getGraphFromTree()
		// REDRAW GRAPH
		const grp = graph.getGraph()
		const graphtml = JSON.parse(JSON.stringify(grp))
		graph.rebuildGraph(graphtml,null)



	}catch(error){
		console.log(error)
	}
  });

 const callback = async(event:any)=>{
		$companies = await getCompanies($token)
		$companies.push({ name: '', uid:-1 })
		// SET CURRENT COMPANY
		if($companies.length > 0){
			let currcomp = $companies.find((item:any)=>(item.uid == $currentcompany.uid))
			if(currcomp)
				$currentcompany = currcomp
			else
				$currentcompany = { name: '', uid:-1 }
		}else{
			$currentcompany = { name: '', uid:-1 }
		}
		const sel = document.querySelector("#select-company-id")
		if(sel){
			const options = Array.from(sel.options);
			for(let i=0; i<sel.length;i++){
				const index = options.findIndex((item:any) => (item.text == $currentcompany.name));
				if(index > -1){
					sel.value = $currentcompany.name
					sel.dispatchEvent(new Event('change'));
				}
			}
		}
}
 */

let redraw:never


</script>

<div class= "editor-container" id= "editor-container-id">
			<DiagramEditor {graphtype} graph={graphFunctions} bind:draw={draw} bind:currentnode={currentnode} {panelcontroller} {panels} bind:component={component} menuenabled={true} {menubuild} {mainmenuclear} {mainmenusave} {mainmenuimport} {mainmenuexport} {mainmenuload}/>
			<input id="file-graph-input"name="file-graph-input" type='file' accept=".json" style="visibility:hidden;" on:click={readFile}>
	</div>


<style>
.editor-container{
	position:absolute;
}
</style>