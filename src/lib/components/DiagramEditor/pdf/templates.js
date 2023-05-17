
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
                        { type: "text", content: "Codice documento:  $DOCCODE  Lotto:" }
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
                            { type: "text", content: "Dipartimento DRUG SUBSTANCE DEVELOPMENT (DSD)" },
                            { type: "text", content: "BATCH RECORD DI PROCESSO" },
                            { type: "text", content: "Progetto: $PROJCODE" }
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
                            { type: "text", content: "Fase di Sintesi: Processo di Sintesi fino a Drug Substance" },
                            { type: "text", content: "Codice Prodotto:  $PRODCODE " },
                            { type: "text", content: "Codice e descrizione SAP:  $SAPCODE" },
                            { type: "text", content: "Codice Documento:  $DOCCODE" }
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
                            { type: "text", content: "CCP di produzione n.               Lotto:" },
                            { type: "text", content: "Note: _____________________________________________________" },
                            { type: "text", content: "Data:                                     Firma:" }
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
                        { type: "text", content: "Pag. 1/2" }
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
                        { type: "text", content: "Codice documento:  $DOCCODE  Lotto:" }
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
                            { type: "text", content: "STORIA DELLE REVISIONI" }
                        ]
                    },
                    {
                        position: { x: 20, y: 45 },
                        font: {
                            fontName: "times",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: 9
                        },
                        rows: [
                            {
                                type: "table",
                                content: {
                                    columns: [["Elenco delle modifiche effettuate", "Sostituisce documento"]],
                                    rows: [
                                        ["aggiornamento al template in vigore", "$DOCCODE"],
                                        ["Aggiornato il numero di paragrafi nella suddivisione dei moduli", "$DOCCODE"],
                                        ["Typo error: correzione nei punti XXX", "$DOCCODE"]
                                    ]
                                }
                            },
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
                            { type: "text", content: "1.1 ELENCO BATCH RECORD CONNESSI" },
                            { type: "text", content: "   N.A." }
                        ]
                    },
                    {
                        position: { x: 20, y: 110 },
                        font: {
                            fontName: "times",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: 12
                        },
                        rows: [
                            { type: "text", content: "1.2 SCOPO" },
                            { type: "text", content: "   \u2022 Descrivere il metodo per la produzione della drug substance XXXXXXX, a partire da XXXXX e da\n XXXXXXXX" },
                            { type: "text", content: "   \u2022 Registrare le operazioni di produzione" }
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
                        { type: "text", content: "Pag. 2/2" }
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
