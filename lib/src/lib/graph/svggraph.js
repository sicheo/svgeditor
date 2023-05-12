import Graph from './graph.js';
const comparator = (a, b) => {
    if (a.id < b.id)
        return -1;
    if (a.id > b.id)
        return 1;
    return 0;
};
export default class svgGraph extends Graph {
    constructor(options = {}) {
        super(comparator);
    }
}
//# sourceMappingURL=svggraph.js.map