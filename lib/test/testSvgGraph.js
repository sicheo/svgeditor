import svgGraph from '../src/lib/graph/svggraph.js';
import svgTree from '../src/lib/graph/svgtree.js';
const testgraph = function () {
    const graph = new svgGraph();
    const node1 = {
        id: 'node1', count: 1, x: 12, y: 21, width: 20, height: 20, metadata: { color: 'red', shape: 'rect' }
    };
    const node2 = {
        id: 'node2', count: 2, x: 12, y: 21, width: 20, height: 20, metadata: { color: 'blue', shape: 'circle' }
    };
    const node3 = {
        id: 'node3', count: 2, x: 12, y: 21, width: 20, height: 20, metadata: { color: 'yellow', shape: 'square' }
    };
    const node4 = {
        id: 'node4', count: 2, x: 12, y: 21, width: 20, height: 20, metadata: { color: 'white', shape: 'ellipse' }
    };
    graph.addNode(node1);
    graph.addNode(node2);
    graph.addNode(node3);
    graph.addNode(node4);
    graph.addEdge(node1, node2);
    graph.addEdge(node2, node3);
    graph.addEdge(node1, node4);
    try {
        console.log(graph.checkCircular());
        console.log("*******************************************************");
        graph.addEdge(node4, node1);
        console.log(graph.checkCircular());
        console.log("*******************************************************");
        graph.removeEdge(node4, node1);
        console.log(graph.checkCircular());
    }
    catch (error) {
        console.log(error.id);
    }
    const tree = new svgTree(node1);
    tree.addEdge(node1, node2);
    tree.addEdge(node1, node3);
    try {
        tree.addEdge(node4, node3);
    }
    catch (error) {
        console.log(error);
    }
    try {
        tree.addEdge(node3, node1);
    }
    catch (error) {
        console.log(error);
    }
};
testgraph();
//# sourceMappingURL=testSvgGraph.js.map