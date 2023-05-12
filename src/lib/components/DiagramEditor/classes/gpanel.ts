export default class gpanel {

    width = 100
    height = 80
    x = 20
    y = 20
    background = '#eee'
    color = '#008080'
    pname = "NODEPANEL"

    // Build Variables
    _draw: any
    //menu: any
    panel: any
    node: any
    extnode:any
    //foreignObject: any
    menucallback: any


    constructor(draw: any, extnode:any, options: any = {}) {
        this._draw = draw
        //this.menucallback = menucallback
        this.extnode = extnode
        
        if (options.width)
            this.width = options.width
        if (options.height)
            this.height = options.height
        if (options.x)
            this.x = options.x
        if (options.y)
            this.y = options.y
        if (options.color)
            this.color = options.color
    }

    public draw() {

        this.node = this._draw.nested()

        this.node.id(this.pname)

        const point = this._draw.point(this.x,this.y)
        // BUILD PANEL
        this.panel = this.node.rect(this.width, this.height).stroke({ width: 1, color: this.color }).fill(this.background).move(point.x, point.y)

        // DRAW MENU
        //this.menu = this.menucallback(point.x, point.y, this.width, this.height, this)

        // SET NODE DRAGGABLE
        this.node.draggable()

    }

    public remove() {
        this.node.remove()
    }
}