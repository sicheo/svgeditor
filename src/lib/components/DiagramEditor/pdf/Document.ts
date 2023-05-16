import { jsPDF } from "jspdf";

export default class Document {
    name: string = ''
    graph:any

    constructor(name: string,graph:any) {
        this.name = name
        this.graph = graph
    }

    private buildHeader(level:string,batch:string='') {

    }

}