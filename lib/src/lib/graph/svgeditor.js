import { SVG } from '@svgdotjs/svg.js';
class svgEditor {
    xsize = 300;
    ysize = 300;
    graph;
    constructor(options) {
        if (options.xsize)
            this.xsize = options.xsize;
        if (options.ysize)
            this.ysize = options.ysize;
    }
}
export default svgEditor;
//# sourceMappingURL=svgeditor.js.map