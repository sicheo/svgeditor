import gnode from "./gnode"
import gpath from "./gpath"
//import gmenu from "./gmenu"
import { _calcDAttr } from "./gutils"

export default class ggraph {

    //graph: any = { nodes: [], paths: [], svg: '', gnodes: [], gpaths: [] }
    graph: any = { nodes: [], paths: [], gnodes: [], gpaths: [] }
    type: any = 'DAG'
    draw: any
    /*menuitems: any[] = [
        { name: 'EDIT', image: './edit.svg', item: null },
        { name: 'SGRAPH', image: './path.svg', item: null },
        { name: 'EXIT', image: './close.svg', item: null }
    ]*/

    panelcontroller:any = null

    constructor(draw:any,graph: any = null) {
        if (graph)
            this.graph = graph
        this.draw = draw
        //console.log(this.menuitems)
    }

    addNode(nodinfo: any, node: any){
        this.graph.nodes.push(nodinfo)
        this.graph.gnodes.push(node)
        //this.graph.svg = this.draw.svg()
    }

    addPath(pathinfo: any, path: any){
        this.graph.paths.push(pathinfo)
        this.graph.gpaths.push(path)
        //this.graph.svg = this.draw.svg()
    }

    removeNode(nodeid: any){
        this.graph.gnodes = this.graph.gnodes.filter((item: any) => (item.node.id() != nodeid))
        this.graph.nodes = this.graph.nodes.filter((item: any) => (item.id != nodeid))
        //this.graph.svg = this.draw.svg()
        // Chech this
        //if (this.graph.gpaths.length == 0 && this.graph.gnodes.length == 0)
            //this.graph.svg = ''
    }

    removePath(pathid: any){
        this.graph.gpaths = this.graph.gpaths.filter((item: any) => (item.path.id() != pathid))
        this.graph.paths = this.graph.paths.filter((item: any) => (item.id != pathid))
        //this.graph.svg = this.draw.svg()
        //if (this.graph.gpaths.length == 0 && this.graph.gnodes.length == 0)
            //this.graph.svg = ''
    }

    getNodenum(){
        let ret = 0
        for (let i = 0; i < this.graph.nodes.length; i++)
            if (this.graph.nodes[i].data.uid >= ret)
                ret = this.graph.nodes[i].data.uid + 1
        return ret
    }

    getPathnum(){
        let ret = 0
        for (let i = 0; i < this.graph.paths.length; i++)
            if (this.graph.paths[i].uid >= ret)
                ret = this.graph.paths[i].uid + 1
        return ret
    }

    clear() {
        if (this.graph.gnodes) {
            while (this.graph.gnodes.length > 0) {
                if (this.graph.gnodes[0].node) {
                    this.graph.gnodes[0].node.remove(false)
                }
                this.removeNode(this.graph.nodes[0].id)
            }
        }
        if (this.graph.gpaths) {
            while (this.graph.gpaths.length > 0) {
                if (this.graph.gpaths[0].path) {
                    this.graph.gpaths[0].path.remove(false)
                }
                this.removePath(this.graph.gpaths[0].id)
            }
        }
        if (this.panelcontroller) {
            this.panelcontroller("hide", null)
        }
    }

    /*setMenuitems(menuitems: any[]) {
        this.menuitems = menuitems
    }*/

    setPanelcontroller(panelcontroller: any) {
        this.panelcontroller = panelcontroller
    }

    setDraw(draw: any) {
        this.draw = draw
    }

    
    setEventListeners(node: any){
        if (node.vertical == true) {
            node.socketN.sock.on("mouseover", (ev: any) => {
                node.socketN.sock.fill(node.altcolor)
                node.socketN.scale(1.5)
                node._draw.fire("sockmouseover", { x: ev.clientX, y: ev.clientY, node: node, socket: node.socketN })
            })
            node.socketN.sock.on("mouseout", (ev: any) => {
                if (node.socketN.paths.lemgth == 0)
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
            console.log("DRAGSTART")
        })

        node.node.on('dragmove', (event: any) => {
            // mousemove
            if (node.horizontal == true) {
                let rbox = node.socketE.sock.rbox()
                for (let i = 0; i < node.socketE.paths.length; i++) {
                    const endp = node.socketE.paths[i].path.pointAt(node.socketE.paths[i].path.length())
                    const point = node._draw.point(rbox.x + rbox.w / 2, rbox.y + rbox.h / 2)
                    const start = { position: { x: point.x, y: point.y }, dir: 'right' }
                    const end = { position: { x: endp.x, y: endp.y }, dir: 'left' }
                    const d = _calcDAttr(30, start, end)
                    node.socketE.paths[i].path.plot(d)
                }

                rbox = node.socketW.sock.rbox()
                for (let i = 0; i < node.socketW.paths.length; i++) {
                    const startp = node.socketW.paths[i].path.pointAt(0)
                    const point = node._draw.point(rbox.x + rbox.w / 2, rbox.y + rbox.h / 2)
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
                    const point = node._draw.point(rbox.x + rbox.w / 2, rbox.y + rbox.h / 2)
                    const start = { position: { x: point.x, y: point.y }, dir: 'right' }
                    const end = { position: { x: endp.x, y: endp.y }, dir: 'left' }
                    const d = _calcDAttr(30, start, end)
                    node.socketS.paths[i].path.plot(d)
                }

                rbox = node.socketN.sock.rbox()
                for (let i = 0; i < node.socketN.paths.length; i++) {
                    const startp = node.socketN.paths[i].path.pointAt(0)
                    const point = node._draw.point(rbox.x + rbox.w / 2, rbox.y + rbox.h / 2)
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

        node.node.on('contextmenu', (event: any) => {
            event.stopImmediatePropagation()
        })
    }

	rebuild(graphin: any, panels:any[],opts: any=null){
		this.clear()
		let nodeoptions: any = {
			horizontal: true,
			vertical: false,
			shapetype: 'RECT',
			width: 100,
			height: 80
		}
		if (opts)
			nodeoptions = opts
		for (let i = 0; i < graphin.nodes.length; i++) {
			let node = graphin.nodes[i]
			let panelObject
			let img = panels[0].img
			let type = panels[0].type
            const pnl = panels.find((item: any) => (item.level == node.data.level))
			if (pnl) {
				img = pnl.img
				type = pnl.type
			}
			let gdata = JSON.parse(JSON.stringify(node.data))
			gdata.type = type
			const options = {
				x: node.data.x,
                y: node.data.y,
				nodeid: "NODE-" + node.data.uid,
				nodenum: node.data.uid,
				nnametext: "PHASE-" + node.data.uid,
				imagefile: img,
				ndescrtext: node.data.name,
				data: gdata,
			}
			const nopts = {
				...nodeoptions,
				...options,
			}
            let nd: any
			nd = new gnode(this.draw,this, panelObject, nopts)
			if (panelObject)
				panelObject.remove()
			nd.draw()
			// ADD EVENT LISTENERS
			this.setEventListeners(nd)
			this.addNode(nd.getNodeInfo(), nd)
		}
		// DRAW PATHS
		for (let i = 0; i < graphin.paths.length; i++) {
			let path = graphin.paths[i]
			const fromName = path.from[0]
			const toName = path.to[0]
			// GET FROM AND TO NODE
			const from = this.graph.gnodes.find((item: any) => (item.nodeid == fromName))
			const to = this.graph.gnodes.find((item: any) => (item.nodeid == toName))
			// GET THE START SOCKET
			const sockE = from.socketE
			const sockN = from.socketN
			// GET THE END SOCKETS
			const sockW = to.socketW
			const sockS = to.socketS
			if (nodeoptions.horizontal) {
				// DRAW PATH SOCKETE to SOCKETW
				let rbox = sockE.sock.rbox()
				const point = this.draw.point(rbox.x + rbox.w / 2, rbox.y + rbox.h / 2)
				let rbox1 = sockW.sock.rbox()
				const point1 = this.draw.point(rbox1.x + rbox1.w / 2, rbox1.y + rbox1.h / 2)
				const pathopts = { pathid: path.id, uid: path.uid }
				const npath = new gpath(this.draw, this, pathopts)
				const d = 'm' + point.x + ' ' + point.y + ''
				const pathn = npath.draw(d)
				pathn.path.attr('id', path.id)
				pathn.path.fill('none').move(point.x, point.y)
				pathn.path.stroke({ color: '#f06', width: 2, linecap: 'round', linejoin: 'round' })
				pathn.addFrom(from)
				const start = { position: { x: point.x, y: point.y }, dir: 'right' }
				const end = { position: { x: point1.x, y: point1.y }, dir: 'left' }
				const d1 = _calcDAttr(30, start, end)
				pathn.path.plot(d1)
				sockE.addPath(pathn)
				sockW.addPath(pathn)
				pathn.addTo(to)
				this.addPath(pathn.getPathInfo(), pathn)
			}
			if (nodeoptions.vertical) {
				// DRAW PATH SOCKETN to SOCKETS
				let rbox = sockS.sock.rbox()
				const point = this.draw.point(rbox.x + rbox.w / 2, rbox.y + rbox.h / 2)
				let rbox1 = sockN.sock.rbox()
				const point1 = this.draw.point(rbox1.x + rbox1.w / 2, rbox1.y + rbox1.h / 2)
				const pathopts = { pathid: path.id, uid: path.uid }
				const npath = new gpath(this.draw, this, pathopts)
				const d = 'm' + point.x + ' ' + point.y + ''
				const pathn = npath.draw(d)
				pathn.path.attr('id', path.id)
				pathn.path.fill('none').move(point.x, point.y)
				pathn.path.stroke({ color: '#f06', width: 2, linecap: 'round', linejoin: 'round' })
				pathn.addFrom(from)
				const start = { position: { x: point.x, y: point.y }, dir: 'right' }
				const end = { position: { x: point1.x, y: point1.y }, dir: 'left' }
				console.log(start, end)
				const d1 = _calcDAttr(30, start, end)
				pathn.path.plot(d1)
				sockS.addPath(pathn)
				sockN.addPath(pathn)
				pathn.addTo(to)
				this.addPath(pathn.getPathInfo(), pathn)

			}
		}
	}

}