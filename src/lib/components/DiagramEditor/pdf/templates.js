
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
                            {
                                type: "text", content: "STORIA DELLE REVISIONI", options: {
                                    font: {
                                        fontName: "times",
                                        fontStyle: "bold",
                                        fontWeight: "bold",
                                        fontSize: 12
                                    }
                                }
                            }
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
                        options: { firstrowbold: true },
                        font: {
                            fontName: "times",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: 12
                        },
                        rows: [
                            {
                                type: "text", content: "1.1 ELENCO BATCH RECORD CONNESSI", options: {
                                    font: {
                                        fontName: "times",
                                        fontStyle: "bold",
                                        fontWeight: "bold",
                                        fontSize: 12
                                    }
                                }
                            },
                            { type: "text", content: "   N.A." }
                        ]
                    },
                    {
                        position: { x: 20, y: 110 },
                        options: { firstrowbold: true },
                        font: {
                            fontName: "times",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: 12
                        },
                        rows: [
                            {
                                type: "text", content: "1.2 SCOPO", options: {
                                    font: {
                                        fontName: "times",
                                        fontStyle: "bold",
                                        fontWeight: "bold",
                                        fontSize: 12
                                    }
                                }
                            },
                            { type: "text", content: "   \u2022 Descrivere il metodo per la produzione della drug substance XXXXXXX, a partire da XXXXX e da\n XXXXXXXX" },
                            { type: "text", content: "   \u2022 Registrare le operazioni di produzione" }
                        ]
                    },
                    {
                        position: { x: 20, y: 150 },
                        options: { firstrowbold: true },
                        font: {
                            fontName: "times",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: 12
                        },
                        rows: [
                            {
                                type: "text", content: "1.3 STORIA DEL PROCESSO", options: {
                                    font: {
                                        fontName: "times",
                                        fontStyle: "bold",
                                        fontWeight: "bold",
                                        fontSize: 12
                                    }
                                } },
                            { type: "text", content: "   \u2022 Le attivit\u00E0 sperimentali relative allo sviluppo e alla definizione del metodo di sintesi svolte sono\n riportate nel quaderno elettronico XXXXXXXXXX" },
                            { type: "text", content: "   \u2022 Effettuate successive produzione e-GMP registrate sui rispettivi documenti di produzione (Batch\n Record di produzione)" }
                        ]
                    },
                    {
                        position: { x: 20, y: 190 },
                        font: {
                            fontName: "times",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: 12
                        },
                        rows: [
                            {
                                type: "text", content: "1.4 SCHEMA DI REAZIONE E DESCRIZIONE DEL PROCESSO", options: {
                                    font: {
                                        fontName: "times",
                                        fontStyle: "bold",
                                        fontWeight: "bold",
                                        fontSize: 12
                                    }
                                }
},
                            { type: "text", content: "   \u2022 Si inserisce immagine dello schema di sintesi" },
                            { type: "text", content: "   \u2022 Si inserisce testo per la descrizione del processo di sintesi" }
                        ]
                    },
                    {
                        position: { x: 20, y: 230 },
                        font: {
                            fontName: "times",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: 12
                        },
                        rows: [
                            {
                                type: "text", content: "1.5 MATERIE PRIME E REAGENTI", options: {
                                    font: {
                                        fontName: "times",
                                        fontStyle: "bold",
                                        fontWeight: "bold",
                                        fontSize: 12
                                    }
                                }
                            },
                            {
                                type: "table",
                                content: {
                                    columns: [["Descrizione", "Fornitore","Codice SAP","Fornula Bruta","P.M.","P.Eb (\u00b0C)","a (a 20 \u00b0C) (gr/ml)"]],
                                    rows: [
                                        ["MXXXXXXXX", "XXXXXXXX","CXXXXXX","XXXXXXXX","XXXXXX","NA","NA"],
                                    ]
                                }
                            },
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
