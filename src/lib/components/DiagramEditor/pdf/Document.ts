import { jsPDF } from "jspdf";
import 'jspdf-autotable';
// https://github.com/eKoopmans/html2pdf.js


export default class Document {
    doc: any
    public currentfont: any
    data: any
    curry = 0
    currx = 0
    pageHeight = 0
   
  

    constructor(data,docoptions:any=null) {
        this.data = data
        this.doc = new jsPDF(docoptions);
        this.currentfont = {
            fontName: "times",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: 12
        }
        this.curry = 0
        this.currx = 0
        this.pageHeight = 0
    }

    replaceTags(template: any, replacement: any) {
        for (let i = 0; i < template.pages.length; i++) {
            const page = template.pages[i]
            if (page.pageheader) {
                this.replaceInHeader(page.pageheader, replacement)
            }

            if (page.pagebody) {
                this.replaceInBody(page.pagebody, replacement)
            }

            /*if (page.pagefooter) {
                this.replaceInFooter(page.pagefooter, replacement)
            }*/
        }

    }

    buildDocument(template: any) {
        for (let i = 0; i < template.pages.length; i++) {
            const pagetemplate = template.pages[i]
            this.buildPage(pagetemplate)
            if (i < template.pages.length - 1) {
                this.doc.addPage(pagetemplate.pageFormat, pagetemplate.pageOrientation)
                this.curry = 0
                this.currx = 0
                this.pageHeight = 0
            }
        }
        this.addFooters(template)
    }

    buildPage(template: any) {
        if (template.pageheader)
            this.buildPageHeader(template.pageheader)
        if (template.pagebody)
            this.buildPageBody(template.pagebody)
        //if (template.pagefooter)
            //this.buildPageFooter(template.pagefooter)
    }

    buildPageHeader(template: any) {
        if (template.font) {
            this.doc.setFont(template.font.fontName, template.font.fontStyle, template.font.fontWeigth)
            this.doc.setFontSize(template.font.fontSize)
            this.currentfont =  template.font
        }
        if (template.content) {
            for (let i = 0; i < template.content.rows.length; i++) {
                const row = template.content.rows[i]
                const linespace = this.doc.getFontSize()*i +2  
                this.drawElement(row.type,row.content, template.position.x, template.position.y+linespace,row.options)
            }
        }
    }

    buildPageFooter(template: any) {
        if (template.font) {
            this.doc.setFont(template.font.fontName, template.font.fontStyle, template.font.fontWeigth)
            this.doc.setFontSize(template.font.fontSize)
            this.currentfont = template.font
        }
        if (template.content) {
            for (let i = 0; i < template.content.rows.length; i++) {
                const row = template.content.rows[i]
                const linespace = this.doc.getFontSize() * i + 2
                this.drawElement(row.type,row.content, template.position.x, template.position.y + linespace,row.options)
            }
        }
    }

    buildPageBody(template: any) {
        for (let i = 0; i < template.paragraphs.length; i++) {
            const paragraph = template.paragraphs[i]
            if (paragraph.font) {
                this.doc.setFont(paragraph.font.fontName, paragraph.font.fontStyle, paragraph.font.fontWeigth)
                this.doc.setFontSize(paragraph.font.fontSize)
                this.currentfont = paragraph.font
            }
            for (let j = 0; j < paragraph.rows.length; j++) {
                const row = paragraph.rows[j]
                const linespace = this.doc.getFontSize() * j + 2
                this.drawElement(row.type, row.content, paragraph.position.x, paragraph.position.y + linespace, row.options)
            }
        }
    }

    async saveDoc(template: any) {
        //this.doc.save(template.docFileName)
        const datauristring = await this.doc.output('datauristring');
        return (datauristring)
    }

    private replaceInHeader(templ:any,repl:any) {
        if (templ.content) {
            for (let i = 0; i < templ.content.rows.length; i++) {
                templ.content.rows[i] = this.replaceText(templ.content.rows[i],repl)
            }
        }
    }

    private replaceInBody(templ: any, repl: any) {
        for (let i = 0; i < templ.paragraphs.length; i++) {
            const paragraph = templ.paragraphs[i]
            for (let j = 0; j < paragraph.rows.length; j++) {
                paragraph.rows[j] = this.replaceText(paragraph.rows[j], repl)
            }
        }
    }

    private replaceInFooter(templ: any, repl: any) {
        if (templ.content) {
            for (let i = 0; i < templ.content.rows.length; i++) {
                templ.content.rows[i] = this.replaceText(templ.content.rows[i], repl)
            }
        }
    }

    private replaceText(row: any, repl: any) {
        for (let i = 0; i < repl.length; i++) {
            if(row.type == 'text')
                row.content = row.content.replace(repl[i].in, repl[i].out)
            if (row.type == 'table') {
                for (let j = 0; j < row.content.rows.length; j++) {
                    for (let k = 0; k < row.content.columns[0].length; k++) {
                        row.content.rows[j][k] = row.content.rows[j][k].replace(repl[i].in, repl[i].out)
                    }
                }
            }
        }
        return row
    }

    private drawElement(type: any, element: any, x: number, y: number, options: any = null) {
        switch (type) {
            case "text":
                if (options && options.font) {
                    this.doc.setFont(options.font.fontName, options.font.fontStyle, options.font.fontWeigth)
                }
                    
                this.doc.text(element, x, y)
                this.pageHeight = this.doc.internal.pageSize.height; 
                if (y >= this.pageHeight) {
                    this.doc.addPage();
                    this.curry = 0
                }
                if (options && options.font) {
                    this.doc.setFont(this.currentfont.fontName, this.currentfont.fontStyle, this.currentfont.fontWeigth)
                }

                break
            case "table":
                this.doc.autoTable({
                    head: element.columns,
                    body: element.rows,
                    startY: y
                })
                this.pageHeight = this.doc.internal.pageSize.height;
                if (y >= this.pageHeight) {
                    this.doc.addPage();
                    this.curry = 0
                }
                break
            case "autotable":
                const from = element.from
                const type = element.type
                const rows = this.autoTableRows(element.columns,from,type)
                this.doc.autoTable({
                    head: element.columns,
                    body: rows,
                    startY: y
                })
                this.pageHeight = this.doc.internal.pageSize.height;
                if (y >= this.pageHeight) {
                    this.doc.addPage();
                    this.curry = 0
                }
                break;
            default:
                break
        }
        this.curry += this.pageHeight/10
    }

    private autotableListMaterials(columns) {
        const rows = []
        for (let i = 0; i < this.data.inputs.length; i++) {
            const row = []
            const input = this.data.inputs[i]
            // CYCLE FOR EACH TASK
            if (input.tasks) {
                for (let j = 0; j < input.tasks.length; j++) {
                    const task = input.tasks[j]
                    // CYCLE FOR EACH COLUMN
                    if (task.type == 'Static') {
                        for (let k = 0; k < columns[0].length; k++) {
                            if (task.name == columns[0][k])
                                row.push(task.tag)
                        }
                    }
                }
                rows.push(row)
            }
        }
        return rows
    }

    private autotableInitialChecks(columns) {
        const rows = []
       
        for (let i = 0; i < this.data.operations.length; i++) {
            const operation = this.data.operations[i]
            // CYCLE FOR EACH TASK
            if (operation.tasks && operation.name == 'INITIALCHECK') {
                for (let j = 0; j < operation.tasks.length; j++) {
                    const row = []
                    const task = operation.tasks[j]
                    // CYCLE FOR EACH COLUMN
                    row.push(task.description)
                    row.push('')
                    rows.push(row)
                }
            }
        }
        return rows
    }

    private autoTableRows(columns, from,type) {
        let rows = []
        switch (from) {
            case 'inputs':
                switch (type) {
                    case "LISTMATERIALS":
                        rows = this.autotableListMaterials(columns)
                        break
                }
                break;
            case 'machines':
                break;
            case 'operations':
                switch (type) {
                    case "INITIALCHECKS":
                        rows = this.autotableInitialChecks(columns)
                        break
                }
                break;
        }

        return rows
    }

    private addFooters(template){
        const pageCount = this.doc.internal.getNumberOfPages()

        if (template.docfooter) {
            if (template.docfooter.font) {
                const font = template.docfooter.font
                this.doc.setFont(font.fontName, font.fontStyle, font.fontWeigth)
                this.doc.setFontSize(font.fontSize)
                this.currentfont = font
            }
        }
        for (var i = 1; i <= pageCount; i++) {
            this.doc.setPage(i)
            this.doc.text('Page ' + String(i) + ' of ' + String(pageCount), this.doc.internal.pageSize.width / 2, 287, {
                align: 'center'
            })
        }
    }

}