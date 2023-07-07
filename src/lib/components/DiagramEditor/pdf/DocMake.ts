import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
//import pdfMakeUnicode from 'pdfmake-unicode';
//pdfMake.vfs = pdfMakeUnicode.pdfMake.vfs;

(pdfMake as any).vfs =
    pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : globalThis.pdfMake.vfs;

export default class DocMake {

    pdfMake: any

    constructor() {
        this.pdfMake = pdfMake
        this.pdfMake.fonts = {
            'Roboto': {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-Italic.ttf'
            },

            'OpenSans': {
                normal: 'OpenSans-Regular.ttf',
                bold: 'OpenSans-Medium.ttf',
                italics: 'OpenSans-Italic.ttf',
                bolditalics: 'OpenSans-Italic.ttf'
            }

        }
        /*this.pdfMake.fonts = {
           

            // download default Roboto font from cdnjs.com
            Roboto: {
            normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf',
            bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf',
            italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf'
            }
        }*/
        //this.pdfMake.vfs = pdfMakeUnicode.pdfMake.vfs;

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