export default class gpath {

    _draw: any
    path: any
    from: any[]
    to: any[]
    id: any = 'PRANDOM'
    graph: any
    uid = 0
    coef=30


    constructor(draw: any, graph:any,options: any = {}) {
        this._draw = draw
        this.graph = graph
        this.from = []
        this.to = []
        if (options.pathid)
            this.id = options.pathid
        if (options.uid)
            this.uid = options.uid
        if (options.coef)
            this.coef = options.coef
    }

    public draw(d:any) {
        this.path = this._draw.path(d)
        this.path.id(this.id)
        this.path.on('dblclick', (event: any) => {
            event.stopPropagation()
            this.remove()
        })
        this.path.marker('end', 5, 5, function (add:any) {
            add.circle(5).fill('#60f')
        })
        return (this)
    }

    public addFrom(from: any) {
        this.from.push(from)
    }

    public addTo(to: any) {
        this.to.push(to)
    }


    public remove(nremove=true) {
        // REMOVE NODES TO
        if (nremove) {
            for (let i = 0; i < this.to.length; i++) {
                if (this.to[i].menuForeignObject)
                    this.to[i].menuForeignObject('hide')
                this.to[i].remove()
            }
        }
        this.path.remove()
        if (nremove)
            this.graph.removePath(this.id, this._draw)
    }

    public getPathInfo() {
        let pathinfo: any = {}
        pathinfo.id = this.id
        pathinfo.uid = this.uid
        pathinfo.from = []
        pathinfo.to = []
        for (let i = 0; i < this.from.length; i++)
            pathinfo.from.push(this.from[i].nodeid)
        for (let i = 0; i < this.to.length; i++)
            pathinfo.to.push(this.to[i].nodeid)
        return(pathinfo)
        
    }

}