export default class gmenu {
    menuitems: any[] = [
        { name: 'EDIT', image: '/edit.svg',item:null},
        { name: 'EXIT', image: '/close.svg', item:null }
    ]
    x = 0
    y = 0
    width = 10
    heigth = 10
    direction = 'horizontal'

    _draw: any 

    constructor(draw: any, options: any = {}) {
        this._draw = draw
        if (options.memuitems)
            this.menuitems = options.menuitems
        if (options.x)
            this.x = options.x
        if (options.y)
            this.y = options.y
        if (options.width)
            this.width = options.width
        if (options.heigth)
            this.heigth = options.heigth
        if (options.direction)
            this.direction = options.direction

    }

    public draw() {
        for (let i = 0; i < this.menuitems.length; i++) {
            if (this.direction == 'horizontal')
                this.menuitems[i].item = this._draw.image(this.menuitems[i].image).attr({ width: this.width, height: this.heigth }).move(this.x + this.width * i, this.y)
            else
                this.menuitems[i].item = this._draw.image(this.menuitems[i].image).attr({ width: this.width, height: this.heigth }).move(this.x, this.y + this.heigth * i)
        }
        return(this)
    }

    public scale(scale: any, index: any) {
        if(index >=0 && index < this.menuitems.length)
            this.menuitems[index].item.transform({ scale: scale })
    }
}