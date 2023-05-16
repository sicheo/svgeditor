
const MRecordTemplate = {
    docFileName: "document.pdf",
    docTitle: "DOCUMENT TITLE",
    docAuthor: "DOCUMENT AUTHOR",
    docRevision: "DOCUMENT REVISION",
    docDate: "DOCUMENT DATE",
    pages: [
        {
            pageFormat: "a4",
            pageOrientation: "p",
            pageheader: {
                position: {x:20,y:20},
                font: {
                    fontName: "times",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: 10
                },
                content: {
                    rows: [
                        { type: "text", text: "Codice documento:  $DOCCODE  Lotto:" }
                    ]
                }
            },
            pagebody: {
                paragraphs: [
                    {
                        position: { x: 20, y: 60 },
                        font: {
                            fontName: "times",
                            fontStyle: "bold",
                            fontWeight: "bold",
                            fontSize: 14
                        },
                        rows: [
                            { type: "text", text: "Dipartimento DRUG SUBSTANCE DEVELOPMENT (DSD)" },
                            { type: "text", text: "BATCH RECORD DI PROCESSO" },
                            { type: "text", text: "Progetto: $PROJCODE" }
                        ]
                    },
                    {
                        position: { x: 20, y: 120 },
                        font: {
                            fontName: "times",
                            fontStyle: "normal",
                            fontWeight: "normal",
                            fontSize: 10
                        },
                        rows: [
                            { type: "text", text: "Fase di Sintesi: Processo di Sintesi fino a Drug Substance" },
                            { type: "text", text: "Codice Prodotto:  $PRODCODE " },
                            { type: "text", text: "Codice e descrizione SAP:  $SAPCODE" },
                            { type: "text", text: "Codice Documento:  $DOCCODE" }
                        ]
                    },
                    {
                        position: { x: 20, y: 210 },
                        font: {
                            fontName: "times",
                            fontStyle: "normal",
                            fontWeight: "normal",
                            fontSize: 10
                        },
                        rows: [
                            { type: "text", text: "CCP di produzione n.               Lotto:" },
                            { type: "text", text: "Note: _____________________________________________________" },
                            { type: "text", text: "Data:                                     Firma:" }
                        ]
                    }
                ]
            },
            pagefooter: {
                position: { x: 20, y: 280 },
                font: {
                    fontName: "times",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: 10
                },
                content: {
                    rows: [
                        { type: "text", text: "Footer example" }
                    ]
                }
            }
        }
  ]
}

const Templates = {
    MRecordTemplate
}

export default Templates
