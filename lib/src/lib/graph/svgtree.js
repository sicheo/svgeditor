import Tree from './tree.js';
const comparator = (a, b) => {
    if (a.id < b.id)
        return -1;
    if (a.id > b.id)
        return 1;
    return 0;
};
export default class svgTree extends Tree {
    constructor(root) {
        super(comparator, root);
    }
}
//# sourceMappingURL=svgtree.js.map