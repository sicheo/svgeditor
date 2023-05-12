export default class sock {
    _draw: any
    radius = 10
    x = 20
    y = 20
    color = '#008080'
    altcolor = '#f06'
    background = '#fff'
    sock: any
    paths:any[]

    constructor(draw: any, options: any = {}) {
        this._draw = draw
        if (options.x)
            this.x = options.x
        if (options.y)
            this.y = options.y
        if (options.color)
            this.color = options.color
        if (options.altcolor)
            this.color = options.altcolor
        if (options.background)
            this.background = options.background
        this.paths = []
    }

    public draw() {
        this.sock = this._draw.circle(this.radius).attr({ fill: this.background }).stroke({ width: 1, color: this.color }).move(this.x, this.y)
        return(this)
    }

    public addPath(path: any) {
        this.paths.push(path)
    }

    public scale(scale:any) {
        this.sock.transform({ scale: scale })
    }

}