// Please check https://svelvet.mintlify.app/introduction
import { _calcDAttr } from "./gutils"
import sock from "./gsocket"

export default class gnode {
    // Build parameters
    width = 100
    height = 80
    x = 20
    y = 20
    radius = 10
    rradius = 10
    color = '#008080'
    altcolor = '#f06'
    background = '#fff'
    fontsize = 10
    imgwidth = 30
    imgheight = 30
    imagefile = 'default.svg'
    nnametext = ""
    ndescrtext = "DESCRIPTION"
    vertical = false
    horizontal = true
    nodeid = "RANDOM"
    nodeuid = null
    nodenum = 0
    shapetype = "RECT"
    coef = 30
    // Build Variables
    _draw: any
    shape: any
    socketN: any
    socketS: any
    socketW: any
    socketE: any
    node: any
    image: any
    nname: any
    ndescr: any
    menu: any
    graph: any
    menucallback: any
    menuForeignObject:any
    // DATA
    data: any
    saved:any

    constructor(draw: any, menucallback: any,graph:any,menuForeignObject:any,options: any = {}) {
        this._draw = draw
        this.menucallback = menucallback
        this.menuForeignObject = menuForeignObject
        this.graph = graph
        if (options.width)
            this.width = options.width
        if (options.height)
            this.height = options.height
        if (options.x)
            this.x = options.x
        if (options.y)
            this.y = options.y
        if (options.radius)
            this.radius = options.radius
        if (options.rradius)
            this.rradius = options.rradius
        if (options.color)
            this.color = options.color
        if (options.altcolor)
            this.color = options.altcolor
        if (options.fontsize)
            this.fontsize = options.fontsize
        if (options.imgwidth)
            this.imgwidth = options.imgwidth
        if (options.imgheight)
            this.imgheight = options.imgheight
        if (options.nnametext)
            this.nnametext = options.nnametext
        if (options.nodeid)
            this.nodeid = options.nodeid
        if (options.nodeuid)
            this.nodeuid = options.nodeuid
        if (options.nodenum)
            this.nodenum = options.nodenum
        if (options.ndescrtext)
            this.ndescrtext = options.ndescrtext
        if (options.background)
            this.background = options.background
        if (options.shapetype)
            this.shapetype = options.shapetype
        if (options.imagefile)
            this.imagefile = options.imagefile
        if (options.data) {
            this.data = options.data
            this.saved = options.data
        }
        if (options.vertical != undefined)
            this.vertical = options.vertical
        if (options.horizontal != undefined)
            this.horizontal = options.horizontal
        if (options.coef)
            this.coef = options.coef
        

    }

    public draw() {
        this.node = this._draw.nested()
        this.node.id(this.nodeid)

        // BUILD SHAPE
        switch (this.shapetype) {
            case 'ELLIPSE':
                this.shape = this.node.ellipse(this.width, this.height).stroke({ width: 1, color: this.color }).fill(this.background).move(this.x, this.y)
                this.image = this.node.image(this.imagefile).attr({ width: this.imgwidth, height: this.imgheight }).move(this.x + this.width / 2 - this.imgwidth / 2, this.y + this.height / 2 - this.imgheight / 2)
                var nnmamelen = this.nnametext.length * (this.fontsize - 3) / 2
                this.nname = this.node.text(this.nnametext).font({ family: 'Helvetica', size: this.fontsize, anchor: 'middle' }).stroke({ width: 0.5, color: this.color }).fill(this.background).move(this.x + this.width / 2 - nnmamelen, this.y + this.height / 2 - this.radius * 2)
                var ndescrtextlen = this.ndescrtext.length * (this.fontsize - 3) / 2
                this.ndescr = this.node.text(this.ndescrtext).font({ family: 'Helvetica', size: this.fontsize, anchor: 'middle' }).stroke({ width: 0.5, color: this.color }).move(this.x + this.width / 2 - ndescrtextlen, this.y + this.height / 2 - this.fontsize + this.radius * 2)
                this.menu = this.menucallback(this.x, this.y, this.width, this.height, this)
                break
            case "DIAMANT":
                const x1 = this.x
                const x2 = this.x + this.width / 2
                const x3 = this.x + this.width
                const y1 = this.y
                const y2 = this.y + this.height / 2
                const y3 = this.y + this.height
                const poly = x1+','+y2+' '+x2+','+y1+' '+x3+','+y2+' '+x2+','+y3
                this.shape = this.node.polygon(poly).stroke({ width: 1, color: this.color }).fill(this.background).move(this.x, this.y)
                var nnmamelen = this.nnametext.length * (this.fontsize - 3) / 2
                this.nname = this.node.text(this.nnametext).font({ family: 'Helvetica', size: this.fontsize, anchor: 'middle' }).stroke({ width: 0.5, color: this.color }).fill(this.background).move(this.x + this.width / 2 - nnmamelen, this.y + this.height/2 - this.radius*2)
                var ndescrtextlen = this.ndescrtext.length * (this.fontsize - 3) / 2
                this.ndescr = this.node.text(this.ndescrtext).font({ family: 'Helvetica', size: this.fontsize, anchor: 'middle' }).stroke({ width: 0.5, color: this.color }).move(this.x + this.width / 2 - ndescrtextlen, this.y + this.height/3 - this.fontsize +this.radius*2)
                break
            default:
                this.shape = this.node.rect(this.width, this.height).radius(this.rradius).stroke({ width: 1, color: this.color }).fill(this.background).move(this.x, this.y)
                // ADD IMAGE
                this.image = this.node.image(this.imagefile).attr({ width: this.imgwidth, height: this.imgheight }).move(this.x + this.width / 2 - this.imgwidth / 2, this.y + this.height / 2 - this.imgheight / 2)
                // ADD TEXT
                var nnmamelen = this.nnametext.length * (this.fontsize - 3) / 2
                this.nname = this.node.text(this.nnametext).font({ family: 'Helvetica', size: this.fontsize, anchor: 'middle' }).stroke({ width: 0.5, color: this.color }).fill(this.background).move(this.x + this.width / 3 - nnmamelen, this.y + this.radius / 2)
                var ndescrtextlen = this.ndescrtext.length * (this.fontsize - 3) / 2
                this.ndescr = this.node.text(this.ndescrtext).font({ family: 'Helvetica', size: this.fontsize, anchor: 'middle' }).stroke({ width: 0.5, color: this.color }).move(this.x + this.width / 2 - ndescrtextlen/2, this.y + this.height - this.fontsize*1.5)
                this.menu = this.menucallback(this.x, this.y, this.width, this.height, this)
                break;
        }

        /*
         // FOREIGN OBJECT
        foreign.node.setAttribute("x", this.x)
        foreign.node.setAttribute("y", this.y)
        foreign.node.setAttribute("width", this.width)
        foreign.node.setAttribute("height", this.height)
        foreign.node.setAttribute("style", "z-index:10;")
        foreign.node.innerHTML = '<div xmlns="http://www.w3.org/1999/xhtml" >pippo</div>'
        */

        // ADD SOCKETS
        const options = { x: this.x + this.width / 2 - this.radius / 2, y: this.y - this.radius / 2 }

        if (this.vertical == true) {
            let sck0 = new sock(this.node, options)
            this.socketN = sck0.draw()
            options.x = this.x + this.width / 2 - this.radius / 2
            options.y = this.y - this.radius / 2 + this.height
            let sck3 = new sock(this.node, options)
            this.socketS = sck3.draw()
        }

        if (this.horizontal == true) {
            options.x = this.x - this.radius / 2
            options.y = this.y + this.height / 2 - this.radius / 2
            let sck1 = new sock(this.node, options)
            this.socketW = sck1.draw()
            options.x = this.x - this.radius / 2 + this.width
            options.y = this.y + this.height / 2 - this.radius / 2
            let sck2 = new sock(this.node, options)
            this.socketE = sck2.draw()
        }
        

        // SET NODE DRAGGABLE
        this.node.draggable()

        //
        // EVENT LISTENERS
        //
        // SOCKET EVENT LISTENER
        if (this.vertical == true) {
            this.socketN.sock.on("mouseover", (ev: any) => {
                this.socketN.sock.fill(this.altcolor)
                this.socketN.scale(1.5)
                this._draw.fire("sockmouseover", { x: ev.clientX, y: ev.clientY, node: this, socket: this.socketN })
            })
            this.socketN.sock.on("mouseout", (ev: any) => {
                if(this.socketN.paths.lemgth == 0)
                    this.socketN.sock.fill(this.background)
                this.socketN.scale(1)
            })
            this.socketS.sock.on("mouseover", (ev: any) => {
                this.socketS.sock.fill(this.altcolor)
                this.socketS.scale(1.5)
            })
            this.socketS.sock.on("mouseout", (ev: any) => {
                if (this.socketS.paths.lemgth == 0)
                    this.socketS.sock.fill(this.background)
                this.socketS.scale(1)
            })
            this.socketS.sock.on("click", (ev: any) => {
                ev.stopPropagation()
                this.socketS.sock.fill(this.altcolor)
                this._draw.fire("startcurve", { x: ev.clientX, y: ev.clientY, node: this, socket: this.socketS })
            })
        }
        if (this.horizontal == true) {
            this.socketW.sock.on("mouseover", (ev: any) => {
                this.socketW.sock.fill(this.altcolor)
                this.socketW.scale(1.5)
                this._draw.fire("sockmouseover", { x: ev.clientX, y: ev.clientY, node: this, socket: this.socketW })
            })
            this.socketW.sock.on("mouseout", (ev: any) => {
                if (this.socketW.paths.lemgth == 0)
                    this.socketW.sock.fill(this.background)
                this.socketW.scale(1)
            })
            this.socketE.sock.on("mouseover", (ev: any) => {
                this.socketE.sock.fill(this.altcolor)
                this.socketE.scale(1.5)
            })
            this.socketE.sock.on("mouseout", (ev: any) => {
                if (this.socketE.paths.length == 0)
                    this.socketE.sock.fill(this.background)
                this.socketE.scale(1)
            })
            this.socketE.sock.on("click", (ev: any) => {
                ev.stopPropagation()
                this.socketE.sock.fill(this.altcolor)
                this._draw.fire("startcurve", { x: ev.clientX, y: ev.clientY, node: this, socket: this.socketE })
            })
        }

        if (this.image) {
            this.image.on("click", (ev: any) => {
                ev.stopPropagation()
            })
        }
        this.shape.on("click", (ev: any) => {
            ev.stopPropagation()
        })
        if (this.nname) {
            this.nname.on("click", (ev: any) => {
                ev.stopPropagation()
            })
        }
        if (this.ndescr) {
            this.ndescr.on("click", (ev: any) => {
                ev.stopPropagation()
            })
        }

        this.node.on('dragstart', (event: any) => {
            
        })

        this.node.on('dragmove', (event: any) => {
            // mousemove
            if (this.horizontal == true) {
                let rbox = this.socketE.sock.rbox()
                for (let i = 0; i < this.socketE.paths.length; i++) {
                    const endp = this.socketE.paths[i].path.pointAt(this.socketE.paths[i].path.length())
                    const point = this._draw.point(rbox.x + rbox.w/2, rbox.y + rbox.h/2)
                    const start = { position: { x: point.x, y: point.y }, dir: 'right' }
                    const end = { position: { x: endp.x, y: endp.y }, dir: 'left' }
                    const d = _calcDAttr(this.coef, start, end)
                    this.socketE.paths[i].path.plot(d)
                }

                rbox = this.socketW.sock.rbox()
                for (let i = 0; i < this.socketW.paths.length; i++) {
                    const startp = this.socketW.paths[i].path.pointAt(0)
                    const point = this._draw.point(rbox.x + rbox.w/2, rbox.y + rbox.h/2)
                    const start = { position: { x: startp.x, y: startp.y }, dir: 'rigth' }
                    const end = { position: { x: point.x, y: point.y }, dir: 'left' }

                    const d = _calcDAttr(this.coef, start, end)
                    this.socketW.paths[i].path.plot(d)
                }
            }
            if (this.vertical == true) {
                let rbox = this.socketS.sock.rbox()
                for (let i = 0; i < this.socketS.paths.length; i++) {
                    const endp = this.socketS.paths[i].path.pointAt(this.socketS.paths[i].path.length())
                    const point = this._draw.point(rbox.x + rbox.w/2, rbox.y + rbox.h/2)
                    const start = { position: { x: point.x, y: point.y }, dir: 'right' }
                    const end = { position: { x: endp.x, y: endp.y }, dir: 'left' }
                    const d = _calcDAttr(this.coef, start, end)
                    this.socketS.paths[i].path.plot(d)
                }

                rbox = this.socketN.sock.rbox()
                for (let i = 0; i < this.socketN.paths.length; i++) {
                    const startp = this.socketN.paths[i].path.pointAt(0)
                    const point = this._draw.point(rbox.x + rbox.w/2, rbox.y + rbox.h/2)
                    const start = { position: { x: startp.x, y: startp.y }, dir: 'rigth' }
                    const end = { position: { x: point.x, y: point.y }, dir: 'left' }

                    const d = _calcDAttr(this.coef, start, end)
                    this.socketN.paths[i].path.plot(d)
                }
            }

        })

        this.node.on('dragend', (event: any) => {
            // ADJUST x/y coords
            const point = this.node.point(event.detail.event.clientX, event.detail.event.clientY)
            this.data.x = event.detail.event.clientX
            this.data.y = event.detail.event.clientY
        })
        
        this.node.on('dblclick', (event: any) => {
            event.stopPropagation()
        })
    }

    public remove(removepaths=true) {
        // REMOVE PATHS
        if (removepaths) {
            if (this.horizontal) {
                for (let i = 0; i < this.socketE.paths.length; i++)
                    this.socketE.paths[i].remove()
            }
            if (this.vertical) {
                for (let i = 0; i < this.socketS.paths.length; i++)
                    this.socketS.paths[i].remove()
            }
        }
        if (this.menuForeignObject)
            this.menuForeignObject('hide',this)
        this.node.remove()
        if(removepaths)
            this.graph.removeNode(this.nodeid, this._draw)
    }

    public setData(data: any) {
        this.data = data
    }

    public getData():any {
        return(this.data)
    }

    public setSaved(data: any) {
        this.saved = data
    }

    public getSaved(): any {
        return (this.saved)
    }

    public getNodeInfo():any {
        let nodeinfo: any = {}
        nodeinfo.id = this.nodeid
        nodeinfo.uuid = this.nodeuid
        nodeinfo.data = this.data
        //nodeinfo.saved = this.saved
        // THIS SHOULD BE UNIQUE
        nodeinfo.data.uid = this.nodenum
        nodeinfo.data.x = this.x
        nodeinfo.data.y = this.y
        return nodeinfo
    }

    public redrawtext(text: any, img: any = null) {
        // Remove old text
        this.ndescr.remove()
        // Draw new text
        this.ndescrtext = text
        var ndescrtextlen = this.ndescrtext.length * (this.fontsize - 3) / 2
        this.ndescr = this.node.text(this.ndescrtext).font({ family: 'Helvetica', size: this.fontsize, anchor: 'middle' }).stroke({ width: 0.5, color: this.color }).move(this.x + this.width / 2 - ndescrtextlen / 2, this.y + this.height - this.fontsize * 1.5)
        if (this.image) {
            // Remove old image
            this.image.remove()
            // Draw nww image
            this.image = this.node.image(img).attr({ width: this.imgwidth, height: this.imgheight }).move(this.x + this.width / 2 - this.imgwidth / 2, this.y + this.height / 2 - this.imgheight / 2)
        }
    }

}

