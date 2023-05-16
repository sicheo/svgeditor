
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
                        { type: "text", text: "Pag. 1/2" }
                    ]
                }
            }
        },
        {
            pageFormat: "a4",
            pageOrientation: "p",
            pageheader: {
                position: { x: 20, y: 20 },
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
                        position: { x: 20, y: 40 },
                        font: {
                            fontName: "times",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: 12
                        },
                        rows: [
                            { type: "text", text: "STORIA DELLE REVISIONI" }
                        ]
                    },
                    {
                        position: { x: 20, y: 60 },
                        font: {
                            fontName: "times",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: 12
                        },
                        rows: [
                            { type: "text", text: "1.1 ELENCO BATCH RECORD CONNESSI" },
                            { type: "text", text: "   N.A." }
                        ]
                    },
                    {
                        position: { x: 20, y: 85 },
                        font: {
                            fontName: "times",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: 12
                        },
                        rows: [
                            { type: "text", text: "1.2 SCOPO" },
                            { type: "text", text: "   \u2022 Descrivere il metodo per la produzione della drug substance XXXXXXX, a partire da XXXXX e da\n XXXXXXXX" },
                            { type: "text", text: "   \u2022 Registrare le operazioni di produzione" }
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
                        { type: "text", text: "Pag. 2/2" }
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
