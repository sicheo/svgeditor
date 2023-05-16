import { jsPDF } from "jspdf";

export default class Document {
    doc: any
   
  

    constructor(docoptions:any=null) {
        
        this.doc = new jsPDF(docoptions);
    }

    replaceTags(template: any, replacement: any) {
        if (template.pageheader) {
            this.replaceInHeader(template.pageheader, replacement)
        }

        if (template.pagebody) {
            this.replaceInBody(template.pagebody, replacement)
        }

        if (template.pagefooter) {
            this.replaceInFooter(template.pagefooter, replacement)
        }
            
    }

    buildDocument(template: any) {
        for (let i = 0; i < template.pages.length; i++) {
            const pagetemplate = template.pages[i]
            this.buildPage(pagetemplate)
            if (i < template.pages.length-1)
                this.doc.addPage(pagetemplate.pageFormat, pagetemplate.pageOrientation)
        }
    }

    buildPage(template: any) {
        if (template.pageheader)
            this.buildPageHeader(template.pageheader)
        if (template.pagebody)
            this.buildPageBody(template.pagebody)
        if (template.pagefooter)
            this.buildPageFooter(template.pagefooter)
    }

    buildPageHeader(template: any) {
        if (template.font) {
            this.doc.setFont(template.font.fontName, template.font.fontStyle, template.font.fontWeigth)
            this.doc.setFontSize(template.font.fontSize)
        }
        if (template.content) {
            for (let i = 0; i < template.content.rows.length; i++) {
                const row = template.content.rows[i]
                const linespace = this.doc.getFontSize()*i +2  
                this.doc.text(row.text, template.position.x, template.position.y+linespace)
            }
        }
    }

    buildPageFooter(template: any) {
        if (template.font) {
            this.doc.setFont(template.font.fontName, template.font.fontStyle, template.font.fontWeigth)
            this.doc.setFontSize(template.font.fontSize)
        }
        if (template.content) {
            for (let i = 0; i < template.content.rows.length; i++) {
                const row = template.content.rows[i]
                const linespace = this.doc.getFontSize() * i + 2
                this.doc.text(row.text, template.position.x, template.position.y + linespace)
            }
        }
    }

    buildPageBody(template: any) {
        for (let i = 0; i < template.paragraphs.length; i++) {
            const paragraph = template.paragraphs[i]
            if (paragraph.font) {
                this.doc.setFont(paragraph.font.fontName, paragraph.font.fontStyle, paragraph.font.fontWeigth)
                this.doc.setFontSize(paragraph.font.fontSize)
            }
            for (let j = 0; j < paragraph.rows.length; j++) {
                const row = paragraph.rows[j]
                const linespace = this.doc.getFontSize() * j + 2
                this.doc.text(row.text, paragraph.position.x, paragraph.position.y + linespace)
            }
        }
    }

    saveDoc(template: any) {
        this.doc.save(template.docFileName)
    }

    private replaceInHeader(templ:any,repl:any) {
        if (templ.content) {
            for (let i = 0; i < templ.content.rows.length; i++) {
                templ.content.rows[i] = this.replacetText(templ.content.rows[i],repl)
            }
        }
    }

    private replaceInBody(templ: any, repl: any) {
        for (let i = 0; i < templ.paragraphs.length; i++) {
            const paragraph = templ.paragraphs[i]
            for (let j = 0; j < paragraph.rows.length; j++) {
                paragraph.rows[j] = this.replacetText(paragraph.rows[j], repl)
            }
        }
    }

    private replaceInFooter(templ: any, repl: any) {
        if (templ.content) {
            for (let i = 0; i < templ.content.rows.length; i++) {
                templ.content.rows[i] = this.replacetText(templ.content.rows[i], repl)
            }
        }
    }

    private replacetText(row: any, repl: any) {
        for (let i = 0; i < repl.length; i++) {
            row.text = row.text.replace(repl[i].in, repl[i].out)
        }
        return row
    }
   
}