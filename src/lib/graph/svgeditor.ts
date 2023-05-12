import { SVG } from '@svgdotjs/svg.js'

class svgEditor {
    xsize: number = 300
    ysize: number = 300
    graph: any

    constructor(options:any) {
        if (options.xsize)
            this.xsize = options.xsize
        if (options.ysize)
            this.ysize = options.ysize
    }

    
}


export default svgEditor 