
class TreeNode {
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.children = [];
    }

    get isLeaf() {
        return this.children.length === 0;
    }

    get hasChildren() {
        return !this.isLeaf;
    }

    // IN node.value.graph.uid GRAPH NODE NUMBER
    static getNodeMaxNode(node) {
        let maxnode = node.value.graph.uid
        for (let i = 0; i < node.children.length; i++) {
            const childnode = TreeNode.getNodeMaxNode(node.children[i])

            if (childnode > maxnode)
                maxnode = childnode
        }
        console.log("tree.js MAXNODE ", maxnode)
        return maxnode
    }
}

/*class TreeList {
    constructor() {
        this.treelist = []
    }

    get treeList() {
        return this.treelist
    }

    add(node) {
        this.treelist.push(node)
    }

    remove(key) {
        let index = this.treelist.findIndex((item) => item.key == key)
        if (index > -1)
            this.treelist.splice(index, 1)
    }

    getNode(key) {
        return (this.treelist.find((item) => item.key == key))
    }

    reset() {
        this.treelist = []
    }
}*/

class Tree {
    constructor(key, value = key) {
        this.root = new TreeNode(key, value);
        this.roottag = "A"
    }

    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.preOrderTraversal(child);
            }
        }
    }

    *postOrderTraversal(node = this.root) {
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.postOrderTraversal(child);
            }
        }
        yield node;
    }

    insert(parentNodeKey, key, value = key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                node.children.push(new TreeNode(key, value, node));
                return true;
            }
        }
        return false;
    }

    remove(key) {
        for (let node of this.preOrderTraversal()) {
            const filtered = node.children.filter(c => c.key !== key);
            if (filtered.length !== node.children.length) {
                node.children = filtered;
                return true;
            }
        }
        return false;
    }

    removepost(key) {
        for (let node of this.postOrderTraversal()) {
            const filtered = node.children.filter(c => c.key !== key);
            if (filtered.length !== node.children.length) {
                node.children = filtered;
                return true;
            }
        }
        return false;
    }

    find(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }

    printTree(tree, level) {
        let prnt = ""
        for (let j = 0; j < level; j++)
            prnt += "   "
        prnt += "--> " + tree.key
        console.log(prnt)
        ++level
        for (let i = 0; i < tree.children.length; i++) {
            this.printTree(tree.children[i], level)
        }
    }

    setRootTag(tag) {
        this.roottag = tag
    }

    static getTreeMaxNode(tree) {
        return TreeNode.getNodeMaxNode(tree.root)
    }

}

const TREE = {
    Tree,
    TreeNode,
}
export default TREE