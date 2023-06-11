import * as pdfMake from "pdfmake/build/pdfmake";
import pdfMakeUnicode from 'pdfmake-unicode';
//pdfMake.vfs = pdfMakeUnicode.pdfMake.vfs;

export default class DocMake {

    pdfMake: any

    constructor() {
        this.pdfMake = pdfMake
        /*this.pdfMake.fonts = {
           

            // download default Roboto font from cdnjs.com
            Roboto: {
            normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf',
            bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf',
            italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf'
            }
        }*/
        this.pdfMake.vfs = pdfMakeUnicode.pdfMake.vfs;

    }


    async buildDocument(docDefinition: any) {
        return new Promise((resolve: any, reject:any) => {
            const pdfDocGenerator = this.pdfMake.createPdf(docDefinition);
            pdfDocGenerator.getDataUrl((dataUrl) => {
                resolve(dataUrl)
            });
        })
    }

    
}