import { _ } from 'svelte-i18n'



export const graphVerify = async (graph) => {
    let err
    let errval
   

    const unsubscribe1 = await _.subscribe(value => {
        err = value;
    });
    

    if (!graph.nodes || graph.nodes.length <= 0) {
        errval = await err('err_graph_empty')
        console.log("**** ERRVAL ****",errval)
        return (await errval)
    }

    if (graph.nodes[0].data.type != "MASTER") {
        errval = await err('err_first_node')
        return (errval)
    }
   
    if (!graph.nodes[0].data.params.doccode) {
        errval = await err('err_miss_doccode')
        return (errval)
    }

    return "OK"
}